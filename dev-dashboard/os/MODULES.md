# MODULES.md — 各モジュール管理
# S++ Cognitive Operating System v2.1.0

```
VERSION: 2.1.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット
LINT_TRIGGER: モジュール追加・変更時はDEPENDENCY.mdの更新が必要
```

---

## MODULE MAP

```
S++ Platform v2.1.0
├── MOD-SEO    : SEO記事・コンテンツ管理 [ACTIVE]
├── MOD-SLOG   : support-log（検証DB）[ACTIVE]
├── MOD-TOOLS  : ツール群 [PARTIAL]
├── MOD-DEV    : 開発管理 [ACTIVE]
├── MOD-AI     : AI機能 [PLANNED]
├── MOD-EA     : EA関連 [PLANNED]
├── MOD-JOURNAL: ジャーナル [PLANNED]
├── MOD-WIKI   : wiki接続 [PLANNED]
└── MOD-BTB    : BtoB展開 [LONG_TERM]
```

---

## MOD-SEO: SEO記事・コンテンツ管理 [ACTIVE]

**設計原則（SEO MASTER DESIGN v1準拠）：**
- 1社=Hub+4記事（タブUIで統合表示）
- Schema：実測前=Article+FAQPage / 実測後=+Review
- 文体：結論先出し・一人称・断定回避

**各社差別化軸：**

| 会社 | 軸 | 注意 |
|---|---|---|
| XM | ボーナス・初心者・安心感 | アフィリリンク待ち |
| Exness | 高レバ・出金速度・スキャル | 指標時レバ制限 |
| ThreeTrader | 超低コスト・上級者特化 | SL-005〜007反映済み |
| MyFXMarkets | 高性能・2021年騒動あり | 騒動記述は慎重に |
| Fintokei | 日本語・失格経験 | 失格経験が核心 |
| Funded7 | 革新型・OREF/QC | QC計算式注釈必須 |
| The5ers | 老舗・スケーリング・大会11位 | 有料チャレンジ未経験 |

**DEV管理ルール：**
```html
<!-- [DEV ONLY] アフィリエイトリンクに差し替え予定 -->
<!-- TODO: 個別URL化予定 -->
```

---

## MOD-SLOG: support-log（検証DB）[ACTIVE]

**ステータス定義：**
```
📋 確認予定 / 🔬 確認中 / ✅ 確認済み / 📊 実測済み
```

**現在のエントリー：**

| ID | 業者 | ステータス | 記事反映 |
|---|---|---|---|
| SL-001 | XM Trading / 出金 | 📋 確認予定 | TODO |
| SL-002 | XM Trading / ボーナス | 📋 確認予定 | TODO |
| SL-003 | XM Trading / 規約 | 📋 確認予定 | TODO |
| SL-004 | XM Trading / 実口座 | 📋 入力待ち | データ待ち |
| SL-005 | ThreeTrader / 出金 | 📊 実測済み | ✅ 反映済み |
| SL-006 | ThreeTrader / 入金 | 📊 実測済み | ✅ 反映済み |
| SL-007 | ThreeTrader / 安全性 | 📊 実測済み | ✅ 反映済み |

---

## MOD-TOOLS: ツール群 [PARTIAL]

| ツール | ステータス |
|---|---|
| FXロット計算ツール | ✅ 公開済み |
| 損益期待値シミュレーター | 🔄 開発中 |
| トレードジャーナル | ⬜ 未着手 |

---

## MOD-DEV: 開発管理 [ACTIVE]

```
/dev-dashboard/         ← noindex設定済み
/dev-dashboard/os/      ← S++ Cognitive OS v2.1.0
/dev-dashboard/status/  ← 管理ファイル群
```

**本番NG事項（5件）：**
NG-001〜005 → CURRENT_STATE.mdの危険事項を参照

---

## MOD-AI / MOD-EA / MOD-JOURNAL / MOD-WIKI / MOD-BTB

**ステータス：** ⬜ 長期計画（詳細未定）

**AI機能の金融安全制御（設計中）：**
```
・売買を断定しない
・利益保証しない
・投資助言に見えすぎない
・根拠のないエントリー指示を出さない
```
