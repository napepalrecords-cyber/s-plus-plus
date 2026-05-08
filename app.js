// ── Navigation ──────────────────────────────────────────────────
function openFxCalc() { window.open('https://fx-lot-calculator-xi.vercel.app', '_blank'); }

function openIndicators() {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, '0');
  const d = String(n.getDate()).padStart(2, '0');
  window.open(`https://kissfx.com/article/fxdays${y}${m}${d}.html`, '_blank');
}

function openChat()       { window.open('chat.html', '_blank'); }
function openWip(module)  { window.open(`wip.html?module=${module}`, '_blank'); }

// ── Clock ────────────────────────────────────────────────────────
function initClock() {
  const el = document.getElementById('clock');
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const n = new Date();
    el.textContent = `${n.getFullYear()}.${pad(n.getMonth()+1)}.${pad(n.getDate())}  ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}  JST`;
  };
  tick();
  setInterval(tick, 1000);
}

// ── FX Data Cache ────────────────────────────────────────────────
let _fxCache    = null;
let _fxCacheTs  = 0;
let _btcCache   = null;
let _btcCacheTs = 0;

// Primary: @fawazahmed0/currency-api (has fiat + XAU + XAG)
// Fallback: open.er-api.com (fiat only)
async function getFXRates(force = false) {
  const now = Date.now();
  if (!force && _fxCache && now - _fxCacheTs < 55 * 60 * 1000) return _fxCache;

  const PRIMARY  = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
  const FALLBACK = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json';

  const tryFetch = async url => {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error();
      return await res.json();
    } finally { clearTimeout(tid); }
  };

  let raw = null;
  try       { raw = await tryFetch(PRIMARY);  }
  catch (_) { raw = await tryFetch(FALLBACK); }

  // Normalise: { usd: { eur: 0.85, ... } }
  const usdRates = raw.usd;
  if (!usdRates) throw new Error('FX rates parse error');

  _fxCache   = usdRates;    // already lowercase-keyed
  _fxCacheTs = now;
  return _fxCache;
}

async function getBTCRate(force = false) {
  const now = Date.now();
  if (!force && _btcCache && now - _btcCacheTs < 5 * 60 * 1000) return _btcCache;
  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 6000);
    const res  = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      { signal: ctrl.signal }
    );
    clearTimeout(tid);
    if (!res.ok) throw new Error();
    const data  = await res.json();
    _btcCache   = data.bitcoin.usd;
    _btcCacheTs = now;
    return _btcCache;
  } catch {
    return _btcCache || null;
  }
}

// ── CS History (localStorage) ────────────────────────────────────
const CS_HIST_KEY = 'spp_cs_hist_v2';  // v2 = two-group format

function csHistLoad() {
  try { return JSON.parse(localStorage.getItem(CS_HIST_KEY) || '[]'); }
  catch { return []; }
}

function csHistSave(fiatScores, altScores) {
  const h = csHistLoad();
  const now = Date.now();
  const entry = { ts: now, fiat: fiatScores, alt: altScores };
  if (h.length && now - h[h.length - 1].ts < 45 * 60 * 1000) {
    h[h.length - 1] = entry;
  } else {
    h.push(entry);
  }
  while (h.length > 25) h.shift();
  localStorage.setItem(CS_HIST_KEY, JSON.stringify(h));
}

function csHistAt(hoursAgo) {
  if (!hoursAgo) return null;
  const h = csHistLoad();
  if (!h.length) return null;
  const target = Date.now() - hoursAgo * 3600000;
  let best = null, bestDiff = Infinity;
  for (const e of h) {
    const d = Math.abs(e.ts - target);
    if (d < bestDiff) { bestDiff = d; best = e; }
  }
  return bestDiff < (hoursAgo * 0.6 + 0.5) * 3600000 ? best : null;
}

// ── Currency Strength ────────────────────────────────────────────
let _csCmpHours      = 0;
let _csLastFiatScores = null;
let _csLastAltScores  = null;
let _csLastFiatCurs   = null;
let _csLastAltCurs    = null;

// Geometric-mean strength index within a group, normalised 0-100
function geomStrength(ratesMap) {
  const curs = Object.keys(ratesMap);
  if (curs.length === 0) return {};
  const strength = {};
  for (const base of curs) {
    let s = 0;
    for (const q of curs) { if (q !== base) s += Math.log(ratesMap[q] / ratesMap[base]); }
    strength[base] = Math.exp(s / (curs.length - 1));
  }
  const vals = Object.values(strength);
  const mn = Math.min(...vals), mx = Math.max(...vals);
  const range = mx - mn;
  const scores = {};
  // If all equal (range ≈ 0), assign 50 to everyone
  curs.forEach(c => { scores[c] = range > 1e-10 ? ((strength[c] - mn) / range) * 100 : 50; });
  return scores;
}

async function loadCurrencyStrength(force = false) {
  const container = document.getElementById('cs-bars');
  const updEl     = document.getElementById('cs-updated');

  container.innerHTML = '<div class="loading-row"><span class="loading-dot"></span>取得中...</div>';

  try {
    // Fetch in parallel
    const [r, btcUsd] = await Promise.all([getFXRates(force), getBTCRate(force)]);
    // r is lowercase-keyed: { eur: 0.85, gbp: 0.73, xau: 0.000213, ... }

    // ── Group 1: Fiat (rates relative to USD = 1) ──
    const FIAT_KEYS = ['eur','gbp','jpy','aud','nzd','cad','chf'];
    const fiatRates = { USD: 1 };
    FIAT_KEYS.forEach(k => { if (r[k]) fiatRates[k.toUpperCase()] = r[k]; });

    // ── Group 2: Alt (XAU, XAG, BTC) — normalised independently ──
    // Include fiat rates in cross-rate calculation for alt, but normalise alt only
    const altRatesVsFiat = {};
    if (r.xau && r.xau > 0) altRatesVsFiat.XAU = r.xau;
    if (r.xag && r.xag > 0) altRatesVsFiat.XAG = r.xag;
    if (btcUsd)              altRatesVsFiat.BTC = 1 / btcUsd;

    const fiatScores = geomStrength(fiatRates);

    // Alt strength: geometric mean vs FIAT cross-rates + each other
    let altScores = {};
    const altCurs = Object.keys(altRatesVsFiat);
    if (altCurs.length > 0) {
      const combinedRates = { ...fiatRates, ...altRatesVsFiat };
      const combinedCurs  = Object.keys(combinedRates);
      const rawAltStr = {};
      for (const base of altCurs) {
        let s = 0;
        for (const q of combinedCurs) {
          if (q !== base) s += Math.log(combinedRates[q] / combinedRates[base]);
        }
        rawAltStr[base] = Math.exp(s / (combinedCurs.length - 1));
      }
      // Normalise alt within their own group
      const av = Object.values(rawAltStr);
      const aMin = Math.min(...av), aMax = Math.max(...av);
      const aRange = aMax - aMin;
      altCurs.forEach(c => {
        altScores[c] = aRange > 1e-10 ? ((rawAltStr[c] - aMin) / aRange) * 100 : 50;
      });
    }

    _csLastFiatScores = fiatScores;
    _csLastAltScores  = altScores;
    _csLastFiatCurs   = Object.keys(fiatScores);
    _csLastAltCurs    = Object.keys(altScores);
    csHistSave(fiatScores, altScores);

    renderCSBars(fiatScores, _csLastFiatCurs, altScores, _csLastAltCurs, _csCmpHours);

    // Timestamp from last fetched data
    updEl.textContent = `更新: ${new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST`;

  } catch (e) {
    container.innerHTML = `<div class="module-error">取得失敗 — ${e.message}</div>`;
    updEl.textContent = '—';
  }
}

function renderCSBars(fiatScores, fiatCurs, altScores, altCurs, cmpHours) {
  const container = document.getElementById('cs-bars');

  let cmpFiat = null, cmpAlt = null;
  if (cmpHours > 0) {
    const h = csHistAt(cmpHours);
    if (h) { cmpFiat = h.fiat; cmpAlt = h.alt; }
  }

  const SPECIAL_CLS = { XAU: 'bar-gold', XAG: 'bar-silver', BTC: 'bar-btc' };
  const stdCls = p => p >= 62 ? 'bar-strong' : p >= 38 ? 'bar-mid' : 'bar-weak';

  const rowHTML = (c, score, cmpGroup) => {
    const cls = SPECIAL_CLS[c] ?? stdCls(score);
    let delta = '';
    if (cmpGroup?.[c] !== undefined) {
      const d    = score - cmpGroup[c];
      const icon = d > 0.3 ? '▲' : d < -0.3 ? '▼' : '–';
      const dcls = d > 0.3 ? 'up' : d < -0.3 ? 'dn' : 'flat';
      delta = `<span class="cs-delta cs-delta--${dcls}">${icon}${Math.abs(d).toFixed(1)}</span>`;
    }
    return `<div class="cs-row">
      <span class="cs-cur">${c}</span>
      <div class="cs-bar-wrap"><div class="cs-bar ${cls}" style="width:${score.toFixed(1)}%"></div></div>
      <span class="cs-val">${score.toFixed(1)}</span>${delta}
    </div>`;
  };

  const sortedFiat = [...fiatCurs].sort((a, b) => fiatScores[b] - fiatScores[a]);
  let html = sortedFiat.map(c => rowHTML(c, fiatScores[c], cmpFiat)).join('');

  if (altCurs.length > 0) {
    const sortedAlt = [...altCurs].sort((a, b) => altScores[b] - altScores[a]);
    html += `<div class="cs-group-sep"><span>COMMODITIES &amp; CRYPTO</span></div>`;
    html += sortedAlt.map(c => rowHTML(c, altScores[c], cmpAlt)).join('');
  }

  container.innerHTML = html;
}

function setCsCompare(hours) {
  _csCmpHours = hours;
  document.querySelectorAll('.cs-cmp-btn').forEach(b =>
    b.classList.toggle('cs-cmp-btn--active', +b.dataset.h === hours)
  );
  if (_csLastFiatScores) {
    renderCSBars(_csLastFiatScores, _csLastFiatCurs, _csLastAltScores, _csLastAltCurs, hours);
  }
}

function setCsView(view) {
  document.querySelectorAll('.cs-view-btn').forEach(b =>
    b.classList.toggle('cs-view-btn--active', b.dataset.view === view)
  );
  const barsEl   = document.getElementById('cs-bars');
  const cmpBar   = document.getElementById('cs-compare-bar');
  const chartEl  = document.getElementById('cs-chart-panel');

  if (view === 'bars') {
    barsEl.style.display  = '';
    cmpBar.style.display  = '';
    chartEl.style.display = 'none';
  } else {
    barsEl.style.display  = 'none';
    cmpBar.style.display  = 'none';
    chartEl.style.display = '';
    renderCSHistoryChart();
  }
}

function renderCSHistoryChart() {
  const panel = document.getElementById('cs-chart-panel');
  const hist  = csHistLoad();

  if (hist.length < 2) {
    panel.innerHTML = '<div class="cs-chart-empty">データ蓄積中... (最低2件必要)</div>';
    return;
  }

  if (!panel.querySelector('canvas')) {
    panel.innerHTML = '<canvas id="cs-history-chart"></canvas>';
  }
  const canvas = document.getElementById('cs-history-chart');
  const W = panel.offsetWidth || 460;
  const H = 180;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const COLORS = {
    USD:'#00c8ff', EUR:'#4d8fff', GBP:'#aa66ff',
    JPY:'#ff6644', AUD:'#44cc88', NZD:'#44ccaa',
    CAD:'#ff9900', CHF:'#aaaaaa',
    XAU:'#ffd700', XAG:'#cccccc', BTC:'#f7931a',
  };

  const pad = { t:10, r:10, b:26, l:32 };
  const pw  = W - pad.l - pad.r;
  const ph  = H - pad.t - pad.b;
  const n   = hist.length;
  const tx  = i => pad.l + (i / (n - 1)) * pw;
  const ty  = v => pad.t + ph - (v / 100) * ph;

  // Grid lines
  [0, 25, 50, 75, 100].forEach(pct => {
    ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, ty(pct)); ctx.lineTo(W - pad.r, ty(pct)); ctx.stroke();
    ctx.fillStyle = 'rgba(106,128,153,.55)'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText(pct, pad.l - 3, ty(pct) + 3);
  });

  // Time labels
  ctx.fillStyle = 'rgba(106,128,153,.55)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  [0, Math.floor((n - 1) / 2), n - 1].forEach(i => {
    const d = new Date(hist[i].ts);
    ctx.fillText(`${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`, tx(i), H - 5);
  });

  // Draw fiat lines
  const firstFiat = Object.keys(hist[hist.length - 1].fiat || {});
  firstFiat.filter(c => COLORS[c]).forEach(c => {
    ctx.strokeStyle = COLORS[c]; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.75;
    ctx.beginPath();
    hist.forEach((e, i) => {
      const v = (e.fiat || {})[c];
      if (v === undefined) return;
      i === 0 ? ctx.moveTo(tx(i), ty(v)) : ctx.lineTo(tx(i), ty(v));
    });
    ctx.stroke();
  });

  // Draw alt lines (dashed, thicker)
  const firstAlt = Object.keys(hist[hist.length - 1].alt || {});
  firstAlt.filter(c => COLORS[c]).forEach(c => {
    ctx.strokeStyle = COLORS[c]; ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 3]); ctx.globalAlpha = 0.65;
    ctx.beginPath();
    hist.forEach((e, i) => {
      const v = (e.alt || {})[c];
      if (v === undefined) return;
      i === 0 ? ctx.moveTo(tx(i), ty(v)) : ctx.lineTo(tx(i), ty(v));
    });
    ctx.stroke();
    ctx.setLineDash([]);
  });

  ctx.globalAlpha = 1;
}

// ── Spreads ──────────────────────────────────────────────────────
const SPREADS = {
  'EUR/USD': .1, 'USD/JPY': .2, 'GBP/USD': .4,
  'USD/CHF': .3, 'AUD/USD': .3, 'USD/CAD': .4,
  'NZD/USD': .5, 'EUR/JPY': .6, 'GBP/JPY': .9,
};

async function loadSpreads(force = false) {
  const tbody = document.getElementById('spread-tbody');
  tbody.innerHTML = '<tr><td colspan="3" class="loading-row"><span class="loading-dot"></span>取得中...</td></tr>';

  try {
    const r = await getFXRates(force);
    // r is lowercase-keyed: { eur, gbp, jpy, ... }

    const pairs = {
      'EUR/USD': 1 / r.eur,
      'USD/JPY': r.jpy,
      'GBP/USD': 1 / r.gbp,
      'USD/CHF': r.chf,
      'AUD/USD': 1 / r.aud,
      'USD/CAD': r.cad,
      'NZD/USD': 1 / r.nzd,
      'EUR/JPY': r.jpy / r.eur,
      'GBP/JPY': r.jpy / r.gbp,
    };

    tbody.innerHTML = Object.entries(pairs).map(([pair, rate]) => {
      const dec = pair.includes('JPY') ? 3 : 5;
      return `<tr class="spread-row">
        <td class="spread-pair">${pair}</td>
        <td class="spread-rate">${rate.toFixed(dec)}</td>
        <td class="spread-val">${SPREADS[pair] ?? .5}</td>
      </tr>`;
    }).join('');

  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="3" class="module-error">取得失敗 — ${e.message}</td></tr>`;
  }
}

// ── Central Bank Calendar ────────────────────────────────────────
const CB_EVENTS = [
  { date: '2026-05-01', bank: 'BOJ',  event: '金融政策決定会合' },
  { date: '2026-05-07', bank: 'FED',  event: 'FOMC 政策金利発表' },
  { date: '2026-05-08', bank: 'BOE',  event: 'MPC 政策金利決定' },
  { date: '2026-05-20', bank: 'RBA',  event: '政策金利決定' },
  { date: '2026-06-04', bank: 'BOC',  event: '政策金利発表' },
  { date: '2026-06-11', bank: 'ECB',  event: '政策理事会・金利決定' },
  { date: '2026-06-17', bank: 'FED',  event: 'FOMC 政策金利発表' },
  { date: '2026-06-17', bank: 'BOJ',  event: '金融政策決定会合' },
  { date: '2026-06-18', bank: 'SNB',  event: '政策金利決定' },
  { date: '2026-06-19', bank: 'BOE',  event: 'MPC 政策金利決定' },
  { date: '2026-06-25', bank: 'RBNZ', event: '政策金利発表' },
  { date: '2026-07-16', bank: 'ECB',  event: '政策理事会・金利決定' },
  { date: '2026-07-29', bank: 'FED',  event: 'FOMC 政策金利発表' },
  { date: '2026-07-30', bank: 'BOJ',  event: '金融政策決定会合' },
];

function renderCBCalendar() {
  const container = document.getElementById('cb-list');
  const today = new Date(); today.setHours(0,0,0,0);

  const upcoming = CB_EVENTS
    .filter(ev => new Date(ev.date) >= today)
    .slice(0, 9);

  if (!upcoming.length) {
    container.innerHTML = '<div class="module-error">予定データなし</div>';
    return;
  }

  container.innerHTML = upcoming.map(ev => {
    const d = new Date(ev.date);
    const mo = String(d.getMonth()+1).padStart(2,'0');
    const da = String(d.getDate()).padStart(2,'0');
    const days = Math.ceil((d - today) / 864e5);
    const cls = days <= 3 ? 'cb-urgent' : days <= 14 ? 'cb-soon' : '';
    return `<div class="cb-row ${cls}">
      <span class="cb-date">${mo}/${da}</span>
      <span class="cb-bank cb-${ev.bank.toLowerCase()}">${ev.bank}</span>
      <span class="cb-event">${ev.event}</span>
      <span class="cb-days">${days}d</span>
    </div>`;
  }).join('');
}

// ── Refresh All Live ─────────────────────────────────────────────
function refreshLive() {
  const btn = document.getElementById('refresh-btn');
  btn.classList.add('spinning');
  _fxCache  = null;
  _btcCache = null;

  Promise.all([
    loadCurrencyStrength(true),
    loadSpreads(true),
  ]).finally(() => {
    btn.classList.remove('spinning');
  });
}

// ── Notice Tabs ──────────────────────────────────────────────────
function switchNoticeTab(tab) {
  document.querySelectorAll('.notice-tab').forEach(t => {
    t.classList.toggle('notice-tab--active', t.dataset.ntab === tab);
  });
  document.getElementById('notice-global').classList.toggle('notice-list--hidden', tab !== 'global');
  document.getElementById('notice-personal').classList.toggle('notice-list--hidden', tab !== 'personal');
}

// ── Modal Helpers ────────────────────────────────────────────────
function openSimModal(type) {
  document.getElementById(`modal-${type}`).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function openComingSoon(msg) {
  document.getElementById('coming-soon-msg').textContent = msg;
  document.getElementById('modal-coming-soon').classList.add('open');
}

// ── 期待値計算 ───────────────────────────────────────────────────
function calcEV() {
  const wr      = parseFloat(document.getElementById('ev-wr').value) / 100;
  const rr      = parseFloat(document.getElementById('ev-rr').value);
  const capital = parseFloat(document.getElementById('ev-capital').value);
  const riskPct = parseFloat(document.getElementById('ev-risk').value) / 100;

  const lr         = 1 - wr;
  const ev         = (wr * rr) - (lr * 1);
  const riskAmt    = capital * riskPct;
  const avgPerTrade = riskAmt * ev;

  const fmt = n => n >= 0
    ? `+${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}円`
    : `${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}円`;

  const valClass = v => v >= 0 ? 'sim-row-val--pos' : 'sim-row-val--neg';
  const evClass  = ev >= 0 ? 'sim-row-val--pos' : 'sim-row-val--neg';

  const commentText = ev > 0
    ? `期待値はプラス（${ev.toFixed(3)}）です。長期的には利益が積み上がる戦略です。`
    : ev === 0
    ? '期待値はゼロ。長期ではトントンです。手数料分を考慮すると実質マイナスになります。'
    : `期待値はマイナス（${ev.toFixed(3)}）です。この条件での運用は長期的に資金が減少します。勝率またはRRの見直しを検討してください。`;
  const commentClass = ev > 0 ? '' : ev === 0 ? 'sim-comment--warn' : 'sim-comment--danger';

  document.getElementById('ev-results').innerHTML = `
    <div class="sim-row">
      <span class="sim-row-label">許容損失額</span>
      <span class="sim-row-val">${riskAmt.toLocaleString('ja-JP', {maximumFractionDigits:0})}円 <small style="font-size:.65rem;color:var(--text-3)">(${(riskPct*100).toFixed(1)}%)</small></span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">期待値</span>
      <span class="sim-row-val ${evClass}">${ev.toFixed(4)}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">1回の平均増減</span>
      <span class="sim-row-val ${valClass(avgPerTrade)}">${fmt(avgPerTrade)}</span>
    </div>
    <div class="sim-section-head">取引回数別 期待累計損益</div>
    <div class="sim-row">
      <span class="sim-row-label">10回後</span>
      <span class="sim-row-val ${valClass(avgPerTrade*10)}">${fmt(avgPerTrade*10)}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">100回後</span>
      <span class="sim-row-val ${valClass(avgPerTrade*100)}">${fmt(avgPerTrade*100)}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">1000回後</span>
      <span class="sim-row-val ${valClass(avgPerTrade*1000)}">${fmt(avgPerTrade*1000)}</span>
    </div>
    <div class="sim-comment ${commentClass}">${commentText}</div>
  `;
}

// ── 目標達成シミュレーター ────────────────────────────────────────
function calcGoal() {
  const capital  = parseFloat(document.getElementById('goal-capital').value);
  const target   = parseFloat(document.getElementById('goal-target').value);
  const wr       = parseFloat(document.getElementById('goal-wr').value) / 100;
  const rr       = parseFloat(document.getElementById('goal-rr').value);
  const riskPct  = parseFloat(document.getElementById('goal-risk').value) / 100;
  const freq     = parseFloat(document.getElementById('goal-freq').value);

  const lr = 1 - wr;
  const ev = (wr * rr) - (lr * 1);

  if (ev <= 0) {
    document.getElementById('goal-results').innerHTML = `
      <div class="sim-comment sim-comment--danger">
        期待値がマイナス（${ev.toFixed(4)}）のため、目標達成シミュレーションは実行できません。<br>勝率またはRRを見直してください。
      </div>`;
    document.getElementById('goal-chart-wrap').style.display = 'none';
    return;
  }

  // 期待値ベースの取引回数
  const growthPerTrade = riskPct * ev;
  let tradesNeeded = 0;
  let bal = capital;
  const MAX = 100000;
  while (bal < target && tradesNeeded < MAX) {
    bal *= (1 + growthPerTrade);
    tradesNeeded++;
  }
  const weeksNeeded  = tradesNeeded / freq;
  const monthsNeeded = weeksNeeded / 4.33;

  // モンテカルロ（1000試行）
  const TRIALS = 1000;
  let successCount = 0;
  let ruinCount = 0;
  const RUIN_THRESHOLD = capital * 0.5;

  for (let t = 0; t < TRIALS; t++) {
    let b = capital;
    let reached = false;
    let ruined  = false;
    for (let i = 0; i < tradesNeeded * 3; i++) {
      const win = Math.random() < wr;
      const change = win ? b * riskPct * rr : -(b * riskPct);
      b += change;
      if (b >= target) { reached = true; break; }
      if (b <= RUIN_THRESHOLD) { ruined = true; break; }
    }
    if (reached) successCount++;
    if (ruined)  ruinCount++;
  }

  const successRate = (successCount / TRIALS * 100).toFixed(1);
  const ruinRate    = (ruinCount    / TRIALS * 100).toFixed(1);

  const fmtWeeks = w => w < 8 ? `約${w.toFixed(1)}週` : `約${(w/4.33).toFixed(1)}ヶ月`;

  document.getElementById('goal-results').innerHTML = `
    <div class="sim-row">
      <span class="sim-row-label">期待値</span>
      <span class="sim-row-val sim-row-val--pos">${ev.toFixed(4)}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">目標達成まで（期待値ベース）</span>
      <span class="sim-row-val sim-row-val--accent">${tradesNeeded >= MAX ? '未達成' : tradesNeeded + '回'}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">期間（週${freq}回ペース）</span>
      <span class="sim-row-val">${tradesNeeded >= MAX ? '—' : fmtWeeks(weeksNeeded)}</span>
    </div>
    <div class="sim-section-head">モンテカルロ（1,000試行）</div>
    <div class="sim-row">
      <span class="sim-row-label">目標達成確率</span>
      <span class="sim-row-val ${parseFloat(successRate) >= 50 ? 'sim-row-val--pos' : 'sim-row-val--warn'}">${successRate}%</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">破綻確率（資金半減）</span>
      <span class="sim-row-val ${parseFloat(ruinRate) > 20 ? 'sim-row-val--neg' : ''}">${ruinRate}%</span>
    </div>
  `;

  // 資金推移グラフ（期待値ベース）
  const steps = Math.min(tradesNeeded || 200, 300);
  const labels = [];
  const data   = [];
  let b = capital;
  for (let i = 0; i <= steps; i++) {
    labels.push(i);
    data.push(Math.round(b));
    b *= (1 + growthPerTrade);
  }
  renderLineChart('goal-chart', labels, data, capital, target);
  document.getElementById('goal-chart-wrap').style.display = 'block';
}

// ── オプティマルF計算 ─────────────────────────────────────────────
function calcKelly() {
  const wr      = parseFloat(document.getElementById('kelly-wr').value) / 100;
  const rr      = parseFloat(document.getElementById('kelly-rr').value);
  const capital = parseFloat(document.getElementById('kelly-capital').value);
  const current = parseFloat(document.getElementById('kelly-current').value) / 100;

  const lr       = 1 - wr;
  const fStar    = (rr * wr - lr) / rr;
  const halfKelly = fStar * 0.5;

  const fPct    = (fStar    * 100).toFixed(2);
  const halfPct = (halfKelly * 100).toFixed(2);
  const curPct  = (current  * 100).toFixed(2);

  let comment, commentClass;
  if (fStar <= 0) {
    comment = `オプティマルF（${fPct}%）がゼロ以下です。この条件では数学的に利益を期待できません。勝率またはRRを見直してください。`;
    commentClass = 'sim-comment--danger';
  } else if (current > fStar) {
    comment = `現在の許容損失率（${curPct}%）はオプティマルF（${fPct}%）を超えています。オーバーベット状態で破綻リスクが高まります。ハーフケリー（${halfPct}%）への引き下げを推奨します。`;
    commentClass = 'sim-comment--danger';
  } else if (current < halfKelly * 0.5) {
    comment = `現在の許容損失率（${curPct}%）はハーフケリー（${halfPct}%）を大きく下回っています。資金効率が低い可能性があります。`;
    commentClass = 'sim-comment--warn';
  } else {
    comment = `現在の許容損失率（${curPct}%）はハーフケリー（${halfPct}%）の範囲内です。適切なリスク管理ができています。`;
    commentClass = '';
  }

  const fAmt    = (capital * fStar).toLocaleString('ja-JP', {maximumFractionDigits:0});
  const halfAmt = (capital * halfKelly).toLocaleString('ja-JP', {maximumFractionDigits:0});

  document.getElementById('kelly-results').innerHTML = `
    <div class="sim-row">
      <span class="sim-row-label">オプティマルF（f*）</span>
      <span class="sim-row-val ${fStar > 0 ? 'sim-row-val--accent' : 'sim-row-val--neg'}">${fPct}%</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">f* での許容損失額</span>
      <span class="sim-row-val">${fStar > 0 ? fAmt + '円' : '—'}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">ハーフケリー（推奨）</span>
      <span class="sim-row-val sim-row-val--pos">${halfPct}%</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">ハーフケリーでの許容損失額</span>
      <span class="sim-row-val">${fStar > 0 ? halfAmt + '円' : '—'}</span>
    </div>
    <div class="sim-row">
      <span class="sim-row-label">現在の許容損失率</span>
      <span class="sim-row-val">${curPct}%</span>
    </div>
    <div class="sim-comment ${commentClass}">${comment}</div>
  `;

  if (fStar > 0) {
    const steps = 100;
    const labels = [];
    const dataF    = [];
    const dataHalf = [];
    const dataFlat = [];
    let bF = capital, bH = capital, bFlat = capital;
    const lr = 1 - wr;
    for (let i = 0; i <= steps; i++) {
      labels.push(i);
      dataF.push(Math.round(bF));
      dataHalf.push(Math.round(bH));
      dataFlat.push(Math.round(bFlat));
      const evF    = wr * (bF    * fStar    * rr) - lr * (bF    * fStar);
      const evH    = wr * (bH    * halfKelly* rr) - lr * (bH    * halfKelly);
      const evFlat = wr * (bFlat * current  * rr) - lr * (bFlat * current);
      bF    += evF;
      bH    += evH;
      bFlat += evFlat;
    }
    renderMultiLineChart('kelly-chart', labels, [
      { label: `f* (${fPct}%)`,         data: dataF,    color: '#ff4a4a' },
      { label: `ハーフケリー (${halfPct}%)`, data: dataHalf, color: '#00c8ff' },
      { label: `現在 (${curPct}%)`,      data: dataFlat, color: '#6a8099' },
    ]);
    document.getElementById('kelly-chart-wrap').style.display = 'block';
  } else {
    document.getElementById('kelly-chart-wrap').style.display = 'none';
  }
}

// ── Simple Canvas Charts ─────────────────────────────────────────
function renderLineChart(canvasId, labels, data, capital, target) {
  const canvas = document.getElementById(canvasId);
  const ctx    = canvas.getContext('2d');
  const W = canvas.offsetWidth || 600;
  const H = canvas.height = 140;
  canvas.width = W;
  ctx.clearRect(0, 0, W, H);

  const pad = { t: 16, r: 16, b: 28, l: 72 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;
  const minV = Math.min(...data) * 0.95;
  const maxV = target ? Math.max(Math.max(...data), target) * 1.02 : Math.max(...data) * 1.05;

  const tx = i  => pad.l + (i / (data.length - 1)) * pw;
  const ty = v  => pad.t + ph - ((v - minV) / (maxV - minV)) * ph;

  // grid
  ctx.strokeStyle = 'rgba(255,255,255,.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ph / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    const val = maxV - ((maxV - minV) / 4) * i;
    ctx.fillStyle = 'rgba(106,128,153,.7)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText((val / 10000).toFixed(0) + 'w', pad.l - 4, y + 3);
  }

  // target line
  if (target) {
    const ty2 = ty(target);
    ctx.strokeStyle = 'rgba(0,255,170,.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(pad.l, ty2); ctx.lineTo(W - pad.r, ty2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(0,255,170,.7)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('目標', W - pad.r + 2, ty2 + 3);
  }

  // line
  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = 'rgba(0,200,255,.4)';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  data.forEach((v, i) => {
    if (i === 0) ctx.moveTo(tx(i), ty(v));
    else         ctx.lineTo(tx(i), ty(v));
  });
  ctx.stroke();
  ctx.shadowBlur = 0;

  // x axis labels
  ctx.fillStyle = 'rgba(106,128,153,.7)';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  [0, Math.floor((data.length-1)/2), data.length-1].forEach(i => {
    ctx.fillText(i + '回', tx(i), H - 6);
  });
}

function renderMultiLineChart(canvasId, labels, series) {
  const canvas = document.getElementById(canvasId);
  const ctx    = canvas.getContext('2d');
  const W = canvas.offsetWidth || 600;
  const H = canvas.height = 140;
  canvas.width = W;
  ctx.clearRect(0, 0, W, H);

  const pad = { t: 16, r: 80, b: 28, l: 72 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;
  const allVals = series.flatMap(s => s.data);
  const minV = Math.min(...allVals) * 0.95;
  const maxV = Math.max(...allVals) * 1.05;
  const n = labels.length;

  const tx = i => pad.l + (i / (n - 1)) * pw;
  const ty = v => pad.t + ph - ((v - minV) / (maxV - minV)) * ph;

  // grid
  ctx.strokeStyle = 'rgba(255,255,255,.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ph / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    const val = maxV - ((maxV - minV) / 4) * i;
    ctx.fillStyle = 'rgba(106,128,153,.7)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText((val / 10000).toFixed(0) + 'w', pad.l - 4, y + 3);
  }

  series.forEach(s => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    s.data.forEach((v, i) => {
      if (i === 0) ctx.moveTo(tx(i), ty(v));
      else         ctx.lineTo(tx(i), ty(v));
    });
    ctx.stroke();
  });

  // legend
  ctx.font = '8px monospace';
  ctx.textAlign = 'left';
  series.forEach((s, i) => {
    const lx = W - pad.r + 6;
    const ly = pad.t + 14 + i * 18;
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, ly - 6, 10, 2);
    ctx.fillStyle = 'rgba(106,128,153,.9)';
    ctx.fillText(s.label, lx + 13, ly);
  });

  // x axis labels
  ctx.fillStyle = 'rgba(106,128,153,.7)';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  [0, Math.floor((n-1)/2), n-1].forEach(i => {
    ctx.fillText(i + '回', tx(i), H - 6);
  });
}

// ── Loader ───────────────────────────────────────────────────────
const LOADER_VISITED_KEY = 'spp_visited';
const LOADER_STEPS = [
  { text: 'INITIALIZING S++ SYSTEM...',   pct: 15 },
  { text: 'LOADING MODULES...',            pct: 35 },
  { text: 'CONNECTING KNOWLEDGE CORE...', pct: 58 },
  { text: 'CALIBRATING MARKET DATA...',   pct: 82 },
  { text: 'SYSTEM READY.',                pct: 100 },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runLoader() {
  const overlay   = document.getElementById('spp-loader');
  const container = document.getElementById('main-container');
  const linesEl   = document.getElementById('spp-loader-lines');
  const barEl     = document.getElementById('spp-loader-bar');
  const pctEl     = document.getElementById('spp-loader-pct');

  const isFirst = !localStorage.getItem(LOADER_VISITED_KEY);
  const stepMs  = isFirst ? 460 : 120;
  const endMs   = isFirst ? 420 : 100;

  if (isFirst) localStorage.setItem(LOADER_VISITED_KEY, '1');

  for (const step of LOADER_STEPS) {
    const line = document.createElement('div');
    line.className   = 'spp-loader-line';
    line.textContent = '> ' + step.text;
    linesEl.appendChild(line);
    await sleep(16);
    line.classList.add('visible');

    barEl.style.width   = step.pct + '%';
    if (pctEl) pctEl.textContent = step.pct + '%';

    await sleep(stepMs);
  }

  await sleep(endMs);

  overlay.classList.add('fading');
  container.classList.add('loaded');

  await sleep(580);
  overlay.style.display = 'none';
}

// ── Init ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  runLoader();
  initClock();
  loadCurrencyStrength();
  loadSpreads();
  renderCBCalendar();

  // Hourly auto-refresh
  setInterval(() => {
    _fxCache  = null;
    _btcCache = null;
    loadCurrencyStrength(true);
    loadSpreads(true);
  }, 60 * 60 * 1000);
});
