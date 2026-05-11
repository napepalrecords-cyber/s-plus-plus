# S++ Cognitive Operating System
# OS_INDEX.md — Root Entry（完全自己完結型）

---

## ▼ SYSTEM HEADER

```
NAME:         S++ Cognitive Operating System
VERSION:      2.1.1
LAST_UPDATED: 2026-05-10
SOURCE:       Claude / S++初代開発チャット + ChatGPT / S++基盤chat
STATUS:       ACTIVE
OS_PHASE:     運用耐性固定フェーズ
```

---

## ▼ AIへの指示（必読）

このファイルを読んだAIは以下のルールに従うこと：

```
1. このOS_INDEX.mdだけで通常の引き継ぎは完結する
2. 詳細情報が必要な場合は以下の形式でKに指示する：

   「作業を進めるために [ファイル名] の内容が必要です。
    GitHub（https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/[ファイル名]）
    を開いて、内容を全てコピーしてこのチャットに貼り付けてください。」

3. Kがどのファイルを渡すべきか考える必要はない
4. AIが必要なファイルを特定して具体的に指示する
```

---

## ▼ CURRENT STATE（最重要）

```
サイトフェーズ : Phase 1（S++｜海外FX・プロップファーム実測ガイド）
現在の作業    : Exness・ThreeTrader記事のHTML実装待ち
直近ブロッカー : XM実測データ待ち（SL-004）・アフィリ申請未着手
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

## ▼ ROOT SUMMARY（最上位思想・要点）

```
■ サイト名：S++（永久固定・変更禁止）
■ 定義：実戦トレーダーKが案内する信頼ベースのFX・プロップ情報プラットフォーム
■ 禁止：AI量産比較サイト化・ランキング屋化・断定しすぎ
■ KGI：Kが管理（AIは変更不可）
■ AIの役割：整理・最適化・補助・提案（主役ではない）

■ 変更禁止事項：
  - サイト名: S++
  - URL構造: /brokers/ /prop-firms/ /support-log/ /compare/ /guides/
  - Kのキャラクター: 短期寄り・正直・役割分担思想

■ サイトフェーズ（現在Phase 1）：
  Phase 1: S++｜海外FX・プロップファーム実測ガイド（現在）
  Phase 2: S++｜FX業者・プロップファーム実測ガイド（国内FX記事公開後）
  Phase 3: S++｜統合プラットフォーム（全条件達成後のみ）
  ⚠ Phase 3のタイトルを条件未達で使用しないこと

■ インフラ：
  開発環境: https://s-plus-plus.vercel.app
  GitHub: https://github.com/napepalrecords-cyber/s-plus-plus
  本番URL: 未取得
```

---

## ▼ K PROFILE SUMMARY（記事の核心・変更禁止）

```
■ スタイル：短期寄り・スプレッドに敏感・「役割分担の方が強い」思想
■ 禁止ワード：「総合的におすすめ」「初心者でも安心」「完全に安全」

■ 実体験（一次情報）：
  Fintokei : クオーツプラン第2フェーズ失格
             原因：外付け手数料を損失計算に含めていなかった
             MT5の注文画面が突然操作できなくなりメールで失格を知った

  The5ers  : 日本人限定大会11位入賞
             期間：2026/04/19〜2026/04/27
             開始$10,000 → 利益+$1,477.75（+14.78%）

  ThreeTrader（S++ member A実口座）：
             出金実測：最短14時間（週中）・最長70時間（週末）
             入金実測：20〜30分・手数料JPY 0
             最大出金：約¥3,094,843（2024年9月）
```

---

## ▼ SEO & 記事ルール SUMMARY

```
■ 記事構造：1社=Hub+4記事（タブUIで統合表示）
■ Schema：実測前=Article+FAQPage / 実測後=+Review（ratingValueは実測後）
■ 文体：結論先出し・一人称・「S++側で確認できる範囲では〜」で断定回避

■ 各社差別化軸：
  XM Trading   : ボーナス・初心者・安心感（アフィリリンク待ち）
  Exness       : 高レバ・出金速度・スキャル
  ThreeTrader  : 超低コスト・上級者特化（SL-005〜007反映済み）
  MyFXMarkets  : 高性能・2021年騒動あり（記述は慎重に）
  Fintokei     : 日本語・失格経験が核心コンテンツ
  Funded7      : 革新型・OREF/QC（QC計算式に「簡略イメージ」注釈必須）
  The5ers      : 老舗・スケーリング・大会11位実績

■ DEV管理ルール（HTML実装時）：
  <!-- [DEV ONLY] アフィリエイトリンクに差し替え予定 -->
  <!-- TODO: 個別URL化予定 -->
```

---

## ▼ SUPPORT-LOG STATUS

```
SL-001 : XM Trading / 出金    / 📋 確認予定
SL-002 : XM Trading / ボーナス / 📋 確認予定
SL-003 : XM Trading / 規約    / 📋 確認予定
SL-004 : XM Trading / 実口座  / 📋 入力待ち（仲間からのデータ待ち）
SL-005 : ThreeTrader / 出金   / 📊 実測済み・記事反映済み
SL-006 : ThreeTrader / 入金   / 📊 実測済み・記事反映済み
SL-007 : ThreeTrader / 安全性 / 📊 実測済み・記事反映済み
```

---

## ▼ IMPLEMENTATION STATUS

```
✅ 実装済み：XM Trading記事（5本・HTML・開発環境公開）
✅ 実装済み：dev-dashboard・S++ Cognitive OS v2.1.1
✅ 実装済み：FXロット計算ツール（外部URL）
✅ 実装済み：TOPページ→dev-dashboard導線（右下DEV管理ボタン）

🔄 MD完成・HTML未実装：
   Exness（5本）/ ThreeTrader（5本）/ MyFXMarkets（5本）
   Fintokei（5本）/ Funded7（5本）/ The5ers（5本）

⬜ 未着手：アフィリエイト申請・独自ドメイン・サーチコンソール
⬜ 未実装：support-log一覧ページ
```

---

## ▼ PRODUCTION NG LIST

```
NG-001 : アフィリリンク未設定（[DEV ONLY]コメント管理中）
NG-002 : support-log個別URLが404
NG-003 : /dev-dashboard/が本番でアクセス可能（noindexのみ）
NG-004 : Googleサーチコンソール未設定
NG-005 : XM実測データ未収録（SL-004）
```

---

## ▼ LATEST CHANGELOG

```
[v2.1.1] 2026-05-10
SOURCE: Claude / S++初代チャット + ChatGPT / S++基盤chat
CHANGE: OS_INDEXを完全自己完結型に改修。
        ROOT・MODULES・K Profile・SEOルール・support-log・
        実装状況・本番NGを全てOS_INDEXに集約。
        AIが詳細ファイル要求時にKへ具体的指示を出す仕様を追加。
IMPACT: 全AI・全チャット（引き継ぎの完全ワンストップ化）

[v2.1.0] 2026-05-10
SOURCE: Claude + ChatGPT
CHANGE: OS運用耐性固定フェーズへ移行。7ファイル構造に強化。
```

---

## ▼ 詳細ファイル一覧（AIが必要時にKへ指示する）

```
ROOT.md          → 最上位思想の詳細
MODULES.md       → 各モジュールの詳細
CURRENT_STATE.md → 現在状態・保留・危険事項の詳細
CHANGELOG.md     → 全変更履歴
DEPENDENCY.md    → 論理依存構造の詳細
LINT_RULES.md    → ズレ検知・Trigger Rulesの詳細

場所：
https://github.com/napepalrecords-cyber/s-plus-plus/blob/main/dev-dashboard/os/[ファイル名]
```
