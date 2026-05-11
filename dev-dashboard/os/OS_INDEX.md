# S++ Cognitive Operating System

```
Version:      2.1.4
Last Updated: 2026-05-10
Status:       ACTIVE
OS Phase:     運用耐性固定フェーズ
Source:       Claude / S++初代チャット + ChatGPT / S++基盤chat
```

---

## Official AI Sync Root Entry
```
https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/OS_INDEX.md
```

## Human Dev Dashboard
```
https://s-plus-plus.vercel.app/dev-dashboard/
```

---

## ▼ 役割分離

```
Vercel Dev Dashboard  : 人間向けUI・進捗確認・Dev管理用
GitHub raw OS_INDEX   : AI同期用Root Entry・Bootstrap Loader
                        ※全情報を格納する場所ではない
                        ※AIが最低限同期するための入口
```

---

## ▼ AI同期標準プロンプト

```
S++ Cognitive Operating Systemに同期してください。

Root Entry:
https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/OS_INDEX.md

同期完了後、
Current State / Next Action / Active Modules / Critical Updates を整理してください。

不足情報がある場合は、
必要なModule名・Raw URL・Human URLを完全URLで明示して、
Kへ追加共有を要求してください。
```

---

## ▼ FETCH FAILURE FALLBACK RULE

Root Entry取得に失敗した場合：

```
❌ 禁止：検索・推測・無関係リポジトリへのフォールバック
✅ 必須：Kへ以下のみ要求する

必要情報:
  OS_INDEX.md全文

理由:
  Root Entry取得失敗のため、最低限同期に必要

対応:
  以下のURLを開いて全文をコピーし、このチャットへ貼り付けてください。
  https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/OS_INDEX.md
```

---

## ▼ MISSING MODULE REQUEST RULE

AIが追加Moduleを要求する場合：

**必須：Raw URL / Human URLは必ず完全URLで出力すること。**

```
❌ 省略表記禁止：
ROOT.md (raw)
ROOT.md (GitHub)

✅ 必須形式：

必要Module:
[ファイル名]

Raw URL:
https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/[ファイル名]

Human URL:
https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/[ファイル名]

理由:
[〇〇の確認に必要なため]

Kが行う操作:
Raw URLが取得できない場合は、Human URLを開いて全文をコピーし、
このチャットへ貼り付けてください。
```

Kがどの情報を渡すべきか考える必要はない。AIが特定して完全URLで指示する。

---

## ▼ UNKNOWN MODULE REQUEST 禁止

```
❌ 禁止：OS_INDEXに記載されていないModule名を既存Moduleとして要求する
✅ 必須：必要と判断した場合は「新規Module候補」として提案し、
         既存Moduleとは分離して扱うこと

形式：
「新規Module候補として [Module名] の作成を提案します。
 既存Moduleとは別に、Kの判断後に追加してください。」
```

---

## ▼ CURRENT STATE

```
サイトフェーズ : Phase 1（S++｜海外FX・プロップファーム実測ガイド）
現在の作業    : Exness・ThreeTrader記事のHTML実装待ち
直近ブロッカー : SL-004データ待ち・アフィリ申請未着手
次のアクション : ①アフィリエイト申請（最優先）→ ②Exness HTML実装
```

---

## ▼ CRITICAL UPDATES

```
[CRITICAL-001] アフィリリンク未設定
  全記事CTAが公式URLのまま。申請後に[DEV ONLY]箇所を差し替え。

[CRITICAL-002] support-log個別URLが404
  SL-001〜004のURLが未作成。一覧ページ実装後に更新。

[CRITICAL-003] SL-004データ待ち
  XM実口座データが届いたらwithdrawal・k-review記事を更新。
```

---

## ▼ DEPENDENCY ALERTS

```
[ACTIVE-001] SL-004完成 → XM withdrawal・k-review記事を更新
[ACTIVE-002] アフィリ申請完了 → 全記事[DEV ONLY]箇所を差し替え
[ACTIVE-003] support-log一覧実装 → 全記事TODOリンクを個別URLに更新
[ACTIVE-004] 独自ドメイン取得 → 全記事内部リンクを本番URLに切り替え
```

---

## ▼ ROOT SUMMARY

```
■ サイト名：S++（永久固定）
■ 定義：実戦トレーダーKが案内する信頼ベースのFX・プロップ情報プラットフォーム
■ 禁止：AI量産比較サイト化・ランキング屋化・断定しすぎ
■ KGI：Kが管理（AIは変更不可）
■ AIの役割：整理・最適化・補助・提案（主役ではない）

■ 変更禁止：
  サイト名S++ / URL構造（/brokers/ /prop-firms/ /support-log/）
  Kのキャラクター（短期寄り・正直・役割分担思想）

■ フェーズ：
  Phase 1（現在）: S++｜海外FX・プロップファーム実測ガイド
  Phase 2: FX業者・プロップファーム実測ガイド（国内FX記事公開後）
  Phase 3: 統合プラットフォーム（全条件達成後のみ）
  ⚠ Phase 3のタイトルを条件未達で使用しないこと

■ インフラ：
  開発環境: https://s-plus-plus.vercel.app
  GitHub: https://github.com/napepalrecords-cyber/s-plus-plus
  本番URL: 未取得
```

---

## ▼ K PROFILE SUMMARY

```
■ スタイル：短期寄り・スプレッドに敏感・役割分担思想
■ 禁止ワード：「総合的におすすめ」「初心者でも安心」「完全に安全」
■ 断定回避：「S++側で確認できる範囲では〜」を必ず使う

■ 実体験（一次情報・変更禁止）：
  Fintokei : クオーツプラン第2フェーズ失格
             原因：外付け手数料を損失計算に含めていなかった

  The5ers  : 日本人大会11位（+14.78% / $10,000口座）
             2026/04/19〜04/27

  ThreeTrader（S++ member A実口座）：
             出金：最短14時間（週中）・最長70時間（週末）
             入金：20〜30分・手数料JPY 0
             最大出金：約¥3,094,843（2024年9月完了）
```

---

## ▼ SEO SUMMARY

```
■ 記事構造：1社=Hub+4記事（タブUI統合表示）
■ Schema：実測前=Article+FAQPage / 実測後=+Review
■ 各社差別化軸：
  XM        : ボーナス・初心者・安心感
  Exness    : 高レバ・出金速度・スキャル
  ThreeTrader: 超低コスト・上級者（SL-005〜007反映済み）
  MyFXMarkets: 高性能・2021年騒動あり（記述慎重に）
  Fintokei  : 日本語・失格経験が核心
  Funded7   : OREF/QC・新世代（QC計算式注釈必須）
  The5ers   : 老舗・スケーリング・大会11位実績

■ DEV管理ルール：
  <!-- [DEV ONLY] アフィリエイトリンクに差し替え予定 -->
  <!-- TODO: 個別URL化予定 -->
```

---

## ▼ SUPPORT-LOG STATUS

```
SL-001〜004: XM Trading / 📋 確認予定・入力待ち
SL-005: ThreeTrader / 出金 / 📊 実測済み・反映済み
SL-006: ThreeTrader / 入金 / 📊 実測済み・反映済み
SL-007: ThreeTrader / 安全性 / 📊 実測済み・反映済み
```

---

## ▼ IMPLEMENTATION STATUS

```
✅ XM Trading記事（5本・HTML実装済み・開発環境公開）
✅ dev-dashboard・OS v2.1.4・TOPページ導線
✅ FXロット計算ツール（公開済み）

🔄 MD完成・HTML未実装：
   Exness / ThreeTrader / MyFXMarkets / Fintokei / Funded7 / The5ers

⬜ 未着手：アフィリ申請・独自ドメイン・サーチコンソール
⬜ 未実装：support-log一覧ページ
```

---

## ▼ PRODUCTION NG LIST

```
NG-001: アフィリリンク未設定（[DEV ONLY]コメント管理中）
NG-002: support-log個別URLが404
NG-003: /dev-dashboard/が本番でアクセス可能（noindexのみ）
NG-004: Googleサーチコンソール未設定
NG-005: XM実測データ未収録（SL-004）
```

---

## ▼ ACTIVE MODULES

```
MOD-SEO    : ACTIVE   - XM実装済み・残6社HTML待ち
MOD-SLOG   : ACTIVE   - SL-005〜007実測済み・SL-004待ち
MOD-TOOLS  : PARTIAL  - ロット計算ツール公開済み
MOD-DEV    : ACTIVE   - dev-dashboard・OS稼働中
MOD-AI / MOD-EA / MOD-JOURNAL / MOD-WIKI: PLANNED（長期）
```

---

## ▼ DETAIL MODULES一覧（完全URL）

```
ROOT.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/ROOT.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/ROOT.md

MODULES.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/MODULES.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/MODULES.md

CURRENT_STATE.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/CURRENT_STATE.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/CURRENT_STATE.md

CHANGELOG.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/CHANGELOG.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/CHANGELOG.md

DEPENDENCY.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/DEPENDENCY.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/DEPENDENCY.md

LINT_RULES.md
  Raw URL:
    https://raw.githubusercontent.com/napepalrecords-cyber/s-plus-plus/main/dev-dashboard/os/LINT_RULES.md
  Human URL:
    https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/LINT_RULES.md
```

---

## ▼ LATEST CHANGELOG

```
[v2.1.4] 2026-05-10
SOURCE: Claude / S++初代チャット + ChatGPT / S++基盤chat
CHANGE:
  - Missing Module Request Rule: 完全URL出力必須化
    （Raw URL / Human URLの省略表記を禁止・完全URLのみ許可）
  - Unknown Module Request禁止ルールを維持・明示
  - Detail Modules一覧の全URLを完全URL形式に統一
IMPACT: 全AI・全チャット（Gemini含む全環境での一貫した動作）

[v2.1.3] 2026-05-10
SOURCE: Claude + ChatGPT
CHANGE:
  - Fetch Failure Fallback Rule追加
  - Missing Module Request Rule強化
  - Unknown Module Request禁止

[v2.1.2] 2026-05-10
SOURCE: Claude + ChatGPT
CHANGE: GitHub raw URLを正式AI同期Root Entryに設定

[v2.1.1] 2026-05-10
SOURCE: Claude + ChatGPT
CHANGE: OS_INDEXを完全自己完結型に改修

[v2.1.0] 2026-05-10
SOURCE: Claude + ChatGPT
CHANGE: OS運用耐性固定フェーズへ移行
```
