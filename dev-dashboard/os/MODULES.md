# MODULES.md — 各モジュール管理
# S++ Cognitive Operating System v2.0.0

```
VERSION: 2.0.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット（全ての始まり）
LINT_TRIGGER: モジュール追加時はDEPENDENCY.mdの更新が必要
```

---

## MODULE MAP

```
S++ Platform
├── MOD-SEO    : SEO記事・コンテンツ管理
├── MOD-SLOG   : support-log（検証DB）
├── MOD-TOOLS  : ツール群（計算・シミュ）
├── MOD-DEV    : 開発管理（dev-dashboard）
├── MOD-AI     : AI機能（将来）
├── MOD-EA     : EA関連（将来）
├── MOD-JOURNAL: ジャーナル（将来）
├── MOD-WIKI   : wiki接続（将来）
└── MOD-BTB    : BtoB展開（超長期）
```

---

## MOD-SEO: SEO記事・コンテンツ管理

**ステータス：** 🔄 実装中

**設計原則：**
- SEO MASTER DESIGN v1準拠
- 1社=Hub+4記事（review/withdrawal/challenge/safety/k-review）
- タブUIで統合表示・URLハッシュでSEO分割
- Schema：実測前=Article+FAQPage / 実測後=+Review

**各社の差別化軸：**

| 会社 | 軸 | 注意 |
|---|---|---|
| XM Trading | ボーナス・初心者・安心感 | アフィリリンク待ち |
| Exness | 高レバ・出金速度・スキャル | 指標時レバ制限 |
| ThreeTrader | 超低コスト・上級者特化 | スリッページ実測待ち |
| MyFXMarkets | 高性能・2021年騒動あり | 騒動記述は慎重に |
| Fintokei | 日本語・失格経験（外付け手数料） | 失格経験が核心 |
| Funded7 | 革新型・OREF/QC・新世代 | QC計算式注釈必須 |
| The5ers | 老舗・スケーリング・大会11位 | 有料チャレンジ未経験 |

**文体ルール：**
```
✅ 「S++側で確認できる範囲では〜」（断定回避）
✅ 「自分なら〜」（Kナビゲーター型）
✅ 結論先出し・向いている人/いない人を明確に
❌ 「総合的におすすめ」「初心者でも安心」「完全に安全」
```

**DEV管理ルール：**
```html
<!-- [DEV ONLY] アフィリエイトリンクに差し替え予定 -->
<!-- TODO: 個別URL化予定 -->
```

---

## MOD-SLOG: support-log（検証DB）

**ステータス：** 🔄 運用開始（SL-005〜007実測済み）

**設計思想：**
support-logはS++の最大の差別化核。
競合サイトが二次情報・コピペの中、S++は実際に問い合わせ・実口座で検証した一次情報を持つ。

**ステータス定義：**
```
📋 確認予定: まだ問い合わせていない・仮エントリー
🔬 確認中: 問い合わせ済み・回答待ち
✅ 確認済み: 実際にサポートへ問い合わせ・回答受領済み
📊 実測済み: 実口座で実際に操作して確認した
```

**現在のエントリー：**

| ID | 業者 | カテゴリ | ステータス |
|---|---|---|---|
| SL-001 | XM Trading | 出金 | 📋 確認予定 |
| SL-002 | XM Trading | ボーナス | 📋 確認予定 |
| SL-003 | XM Trading | 規約 | 📋 確認予定 |
| SL-004 | XM Trading | 実口座検証 | 📋 入力待ち |
| SL-005 | ThreeTrader | 出金 | 📊 実測済み |
| SL-006 | ThreeTrader | 入金 | 📊 実測済み |
| SL-007 | ThreeTrader | 安全性 | 📊 実測済み |

---

## MOD-TOOLS: ツール群

**ステータス：** 🔄 一部公開

| ツール | ステータス | URL |
|---|---|---|
| FXロット計算ツール | ✅ 公開済み | https://fx-lot-calculator-xi.vercel.app |
| 損益期待値シミュレーター | 🔄 開発中 | — |
| トレードジャーナル | ⬜ 未着手 | — |

---

## MOD-DEV: 開発管理

**ステータス：** ✅ 実装済み

```
/dev-dashboard/              ← メインダッシュボード（noindex設定済み）
/dev-dashboard/os/           ← S++ Cognitive OS（このフォルダ）
/dev-dashboard/status/       ← 管理ファイル群
```

**本番NG事項：**

| ID | 内容 | 状態 |
|---|---|---|
| NG-001 | アフィリリンク未設定 | ⬜ 申請後に対応 |
| NG-002 | support-log個別URLが404 | ⬜ 一覧ページ実装後 |
| NG-003 | /dev-dashboard/の本番非表示 | 🔄 noindexのみ設定済み |
| NG-004 | Googleサーチコンソール未設定 | ⬜ ドメイン取得後 |
| NG-005 | XM実測データ未収録（SL-004） | ⬜ データ待ち |

---

## MOD-AI: AI機能（将来）

**ステータス：** ⬜ 長期計画

**金融系AI安全制御（設計中）：**
```
・売買を断定しない
・利益保証しない
・投資助言に見えすぎない
・根拠のないエントリー指示を出さない
```

---

## MOD-EA / MOD-JOURNAL / MOD-WIKI / MOD-BTB

**ステータス：** ⬜ 超長期計画（詳細未定）
