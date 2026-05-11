# S++ Cognitive Operating System
# VERSION: 1.0.0
# LAST_UPDATED: 2026-05-10
# SOURCE: Claude / S++初代開発チャット（全ての始まり）
# STATUS: ACTIVE

---

## ［OS使用前の必読事項］

このファイルは「引き継ぎメモ」でも「READMEファイル」でもない。

**S++の開発・運営において、AIが変わっても・チャットが変わっても・人間が変わっても、
「最新状態」「根源思想」「優先順位」「変更履歴」「依存関係」を同期し、
ズレを検知・補正し続けるための認識同期OSである。**

### 新しいチャット・AIを開始する際の手順

```
1. このファイルを最初に読み込む
2. 「S++ Cognitive Operating Systemを参照して最新状態に同期してください」と指示
3. AIは本OSの全階層を確認してから作業を開始する
4. 作業終了時に変更があれば本OSのChangelogとCurrent Stateを更新する
```

### このOSの目的

「ズレを完全に消すこと」ではなく、
**「ズレを検知し、補正し続けられること」**

---

# LEVEL 1：ROOT PHILOSOPHY
# S++の根源思想

---

## 1-1. S++とは何か

**正式名称：** S++（エスプラスプラス）

**本質的定義：**
「実戦トレーダーKが案内する、信頼ベースのFX・プロップ情報プラットフォーム」

**何ではないか：**
- AI量産比較サイトではない
- ランキング屋ではない
- 煽りアフィリエイトサイトではない

**何であるか：**
- Kの一次情報・実測データを核にした検証型金融メディア
- support-logという実録DBを持つ観測型プラットフォーム
- 将来的にツール・AI機能・会員機能を統合する開発プラットフォーム
- AI時代に逆行するようで実は最適な「実測・検証・運営感・人間の温度」を持つメディア

## 1-2. KGI（最終目的）※Kが管理

Kが設定・管理するもの。AIは変更不可。

```
KGI-001: 実測データと一次情報によってAI量産サイトと差別化された
          信頼性の高いFX・プロップ情報プラットフォームを構築する

KGI-002: support-logを核にした「検証型金融データベース」として
          AI時代でも価値を持つ一次情報資産を蓄積する

KGI-003: ツール・AI機能・会員機能を統合した
          FXトレーダーのための統合プラットフォームへ発展させる（長期）
```

## 1-3. AIの立ち位置

AIは主役でも神でもない。

**AIの役割：** 整理・接続・最適化・同期・補助・構造化・KPI提案

**Kの役割：** 目的・思想・中核方向・KGIの設定と管理

## 1-4. 変更禁止の根源事項

```
・サイト名：S++（永久固定）
・Kのキャラクター：短期寄り・正直・役割分担思想
・S++の立ち位置：検証型メディア（ランキング屋にしない）
・URL構造：/brokers/ /prop-firms/ /support-log/ /compare/ /guides/
・「ズレを検知・補正する」というOS思想
```

---

# LEVEL 2：CORE STRUCTURE
# S++全体構造

---

## 2-1. 対象範囲（現段階〜将来）

| モジュール | 現状 | 将来 |
|---|---|---|
| SEO記事（証券会社） | 実装中 | 全社展開 |
| SEO記事（プロップ） | MD完成 | 全社展開 |
| support-log（検証DB） | 運用開始 | 永続拡張 |
| ツール群（計算・シミュ） | 一部公開 | 拡充 |
| AIトレードパートナー | 未着手 | 長期計画 |
| wiki接続 | 未着手 | 長期計画 |
| ジャーナル | 未着手 | 長期計画 |
| EA関連 | 未着手 | 長期計画 |
| 会員機能 | 未着手 | 長期計画 |
| Dev管理（dev-dashboard） | 実装済み | 継続更新 |
| BtoB展開 | 未着手 | 超長期 |

## 2-2. サイトフェーズ管理

| フェーズ | タイトル | 移行条件 | 現在 |
|---|---|---|---|
| Phase 1 | S++｜海外FX・プロップファーム実測ガイド | 初期公開状態 | **← 現在** |
| Phase 2 | S++｜FX業者・プロップファーム実測ガイド | 国内FX証券会社記事が最低限公開 | 未達成 |
| Phase 3 | S++｜FXトレーダーのための統合プラットフォーム | ツール・ジャーナル・全記事揃い | 長期計画 |

**重要：** Phase 3のタイトルを条件未達で使用しないこと。

## 2-3. インフラ構成

```
開発環境URL: https://s-plus-plus.vercel.app
GitHub: https://github.com/napepalrecords-cyber/s-plus-plus
FXロット計算ツール: https://fx-lot-calculator-xi.vercel.app
本番URL: 未取得（独自ドメイン未取得）
```

## 2-4. SEO設計原則（S++ SEO MASTER DESIGN v1より）

- **SEOは分割・UXは統合：** タブUIで複数記事を統合表示
- **Kナビゲーター型：** 結論先出し・一人称・向いている人/いない人を明確に
- **Wave設計：** Wave1（全社基本5記事）→ Wave1.5（比較記事）→ Wave2以降
- **Schema原則：** 実測前はArticle+FAQPage、実測後にReview追加
- **記事構造：** 1社=Hub（親）+ review + withdrawal/challenge + safety + k-review

---

# LEVEL 3：CURRENT STATE
# 現在の進行状態

---

## 3-1. 実装状況（2026-05-10時点）

### コンテンツ

| 項目 | ステータス | 備考 |
|---|---|---|
| XM Trading記事（5本） | ✅ HTML実装・開発環境公開 | /brokers/xm-trading/ |
| Exness記事（5本） | 🔄 MD完成・HTML未実装 | aiレビュー後に実装 |
| ThreeTrader記事（5本） | 🔄 MD完成・実測反映済み | SL-005〜007反映 |
| MyFXMarkets記事（5本） | 🔄 MD完成・HTML未実装 | 2021年騒動記述あり・要注意 |
| Fintokei記事（5本） | 🔄 MD完成・HTML未実装 | K失格経験一次情報あり |
| Funded7記事（5本） | 🔄 MD完成・HTML未実装 | QC計算式は「簡略イメージ」注釈必要 |
| The5ers記事（5本） | 🔄 MD完成・HTML未実装 | K大会11位実績一次情報あり |

### システム

| 項目 | ステータス | 備考 |
|---|---|---|
| dev-dashboard | ✅ 実装済み | /dev-dashboard/ noindex設定済み |
| FXロット計算ツール | ✅ 公開済み | 外部URL |
| support-log設計 | ✅ 完成 | SL-001〜007 |
| TOPページ→dev-dashboard導線 | ✅ 実装済み | 右下DEV管理ボタン |
| XM→TOPリンク接続 | ✅ 完了 | index.html 192行目 |
| sitemap.xml | ⬜ 未作成 | 独自ドメイン取得後 |
| Googleサーチコンソール | ⬜ 未設定 | 独自ドメイン取得後 |
| 独自ドメイン | ⬜ 未取得 | 要取得 |

### support-log状況

| ID | 業者 | カテゴリ | ステータス | 記事反映 |
|---|---|---|---|---|
| SL-001 | XM Trading | 出金 | 📋 確認予定 | 記事内にTODO |
| SL-002 | XM Trading | ボーナス | 📋 確認予定 | 記事内にTODO |
| SL-003 | XM Trading | 規約 | 📋 確認予定 | 記事内にTODO |
| SL-004 | XM Trading | 実口座検証 | 📋 入力待ち | データ待ち |
| SL-005 | ThreeTrader | 出金 | 📊 実測済み | ✅ 反映済み |
| SL-006 | ThreeTrader | 入金 | 📊 実測済み | ✅ 反映済み |
| SL-007 | ThreeTrader | 安全性 | 📊 実測済み | ✅ 反映済み |

## 3-2. 次にやること（優先順位順）

```
優先度1: XM実測データ受け取り → SL-004完成（仲間からのデータ待ち）
優先度2: アフィリエイト申請（各社）
優先度3: Exness記事HTML実装
優先度4: ThreeTrader記事HTML実装
優先度5: MyFXMarkets・Fintokei・Funded7・The5ers記事HTML実装
優先度6: support-log一覧ページ実装
優先度7: Googleサーチコンソール登録・sitemap送信
優先度8: 独自ドメイン取得・Vercel接続
優先度9: 比較記事（実測データが揃ってから）
優先度10: 本番URL公開
```

## 3-3. 本番NG事項

| ID | 内容 | 対応 | ステータス |
|---|---|---|---|
| NG-001 | アフィリリンク未設定 | 申請後に[DEV ONLY]箇所を差し替え | ⬜ 未対応 |
| NG-002 | support-log個別URLが404 | 一覧ページ実装後に更新 | ⬜ 未対応 |
| NG-003 | /dev-dashboard/の本番非表示 | 本番ビルド時に除外 | 🔄 noindexのみ設定済み |
| NG-004 | Googleサーチコンソール未設定 | 独自ドメイン取得後 | ⬜ 未対応 |
| NG-005 | XM実測データ未収録（SL-004） | データ受領後に更新 | ⬜ データ待ち |

---

# LEVEL 4：CHANGELOG
# 変更履歴

---

## FORMAT

```
DATE: 日付
VERSION: バージョン
SOURCE: どのAI / どのチャット由来か
CHANGE: 変更内容
REASON: 変更理由
IMPACT: 影響範囲
DEPENDENCY: 依存関係への影響
```

---

### [v1.0.0] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット（全ての始まり）
**CHANGE:** S++ Cognitive Operating System 初版作成
**REASON:** チャット上限・AI切り替えに伴うズレ防止のため認識同期OSを構築
**IMPACT:** 全AI・全チャット・全開発者
**DEPENDENCY:** 全モジュールの根幹

---

### [v0.9.5] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット
**CHANGE:** dev-dashboardにサイトID管理セクション追加。TOPページに「⚙ DEV管理」ボタン追加。status/site_identity_policy.md追加。
**REASON:** フェーズ管理・サイト名固定ルール・AI間ズレ防止
**IMPACT:** dev-dashboard・index.html・status/
**DEPENDENCY:** Phase移行時に必ず確認が必要

---

### [v0.9.0] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット
**CHANGE:** XM記事5本HTML実装・GitHubに追加。タブUI（概要/評判/出金/安全性/Kレビュー）。TOPページのXMリンク接続。
**REASON:** Wave1実装フェーズ開始
**IMPACT:** /brokers/xm-trading/ ・ index.html
**DEPENDENCY:** Exness以降の記事もこのHTMLをテンプレートとして継承する

---

### [v0.8.5] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット
**CHANGE:** dev-dashboard実装（7セクション）。status/に4ファイル追加（content_inventory.json・production_notes.md・change_log.md・site_identity_policy.md）。
**REASON:** 本番移行事故防止・開発状況の可視化
**IMPACT:** /dev-dashboard/ 全体
**DEPENDENCY:** 記事実装のたびにcontent_inventory.jsonを更新する

---

### [v0.8.0] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット
**CHANGE:** ThreeTrader withdrawal・safety記事にSL-005〜007実測データを反映。support-logシステムが初めて「実測済み」ステータスで稼働開始。
**REASON:** S++ member Aの実口座データ取得
**IMPACT:** ThreeTrader withdrawal・safety・support-log
**DEPENDENCY:** ThreeTraderのHTML実装時にこの実測データを反映すること

---

### [v0.7.0] 2026-05-10
**SOURCE:** Claude / S++初代開発チャット + ChatGPT / S++ SEOチャット
**CHANGE:** XM記事群 最終修正（ai P0〜P4指摘全対応）。矛盾表現修正・Schema修正・広告表記追加・Verificationバナー追加・断定表現統一など。
**REASON:** 公開前品質確保・金融表現リスク低減
**IMPACT:** XM記事5本全て
**DEPENDENCY:** この修正方針をExness以降の記事にも横展開する

---

### [v0.6.0] 2026-05-09
**SOURCE:** Claude / S++初代開発チャット + ChatGPT / S++ SEOチャット
**CHANGE:** Wave1全35記事MDファイル生成完了。Broker4社×5本・Prop3社×5本。
**REASON:** S++ SEO MASTER DESIGN v1に基づくWave1実装
**IMPACT:** 全記事群
**DEPENDENCY:** aiレビュー→最終修正→HTML実装の流れで順次処理

---

### [v0.5.0] 2026-05-09
**SOURCE:** Claude / S++初代開発チャット + ChatGPT / S++ SEOチャット
**CHANGE:** S++ SEO MASTER DESIGN v1策定完了。
**REASON:** SEO設計を先に固める方針に転換
**IMPACT:** 全記事・全実装の根幹
**DEPENDENCY:** 全記事生成・HTML実装の際に必ず参照する

---

# LEVEL 5：DEPENDENCY & LINT
# 依存関係・ズレ検知

---

## 5-1. 依存関係マップ

```
S++ SEO MASTER DESIGN v1
  └─ XM記事HTML（テンプレート）
      └─ Exness記事HTML（継承）
      └─ ThreeTrader記事HTML（継承・SL-005〜007反映）
      └─ MyFXMarkets記事HTML（継承・2021年騒動表現注意）
      └─ Fintokei記事HTML（継承・K失格一次情報）
      └─ Funded7記事HTML（継承・QC注釈必要）
      └─ The5ers記事HTML（継承・K大会実績）

support-log設計（SL-001〜007）
  └─ XM記事（SL-001〜004参照）→ SL-004完成後にwithdrawal・k-reviewを更新
  └─ ThreeTrader記事（SL-005〜007参照・反映済み）
  └─ support-log一覧ページ（未実装・NG-002の解消待ち）

独自ドメイン取得
  └─ Vercel接続 → Googleサーチコンソール → sitemap → index申請 → 本番公開

アフィリエイト申請
  └─ 審査完了 → [DEV ONLY]箇所を実URLに差し替え → NG-001解消
```

## 5-2. LINT チェック項目

新しいAI・チャットが参照する際に以下をチェックすること：

### 思想のズレ検知

```
□ S++を「比較サイト」「ランキングサイト」として扱っていないか
□ AIが主役になっていないか（KGIはKが管理）
□ 実測前の情報を「確認済み」として書いていないか
□ Phase 3のタイトルを条件未達で使用していないか
□ 禁止表現（「完全に安全」「必ず儲かる」等）を使っていないか
```

### 実装のズレ検知

```
□ XM記事のHTMLをテンプレートとして継承しているか
□ Schema設計（実測前：Article+FAQPage）を守っているか
□ DEV ONLYコメントが適切に管理されているか
□ support-logリンクにTODOコメントが付与されているか
□ /dev-dashboard/がnoindex設定されているか
```

### 優先順位のズレ検知

```
□ 比較記事を早急に作ろうとしていないか（実測データ揃ってから）
□ 完璧主義で公開が遅れていないか（80〜85点で公開・育てる思想）
□ support-logより記事生成を優先していないか（support-logが核DB）
```

---

# APPENDIX A：Kのプロフィール

## A-1. トレードスタイル

- 短期寄り（スキャルピング・デイトレード中心）
- スタンダード口座のスプレッドは「正直かなり重い」
- XMを使うならKIWAMI極口座前提
- 「最強の1社」より「役割分担の方が強い」という複数業者活用思想

## A-2. 実体験（記事の核心・変更禁止）

### Fintokei
- クオーツプランで第2フェーズまで到達 → 失格
- 失格原因：外付け手数料を損失計算に含めていなかった
- ドローダウンの全体10%ルールに外付け手数料込みで抵触
- MT5の注文画面が突然操作できなくなり、メールで失格を知った
- この経験がFintokei記事の最大の差別化ポイント

### The5ers
- 日本人限定トレーディングコンテストに出場・11位入賞
- 期間：2026年4月19日〜4月27日（MT5）
- 開始残高：$10,000・認識済み利益：$1,477.75（+14.78%）
- 序盤に大きな引き下げあり → 回復・上昇して着地

### ThreeTrader（S++ member A・匿名・実口座）
- RAW-JPY口座・2022年末から3年以上利用
- 出金実測：最短14時間（週中）・最長70時間（週末をまたぐ）
- 入金実測：20〜30分以内・手数料JPY 0
- 最大出金額：約¥3,094,843（2024年9月・完了）

---

# APPENDIX B：各社の差別化軸

## B-1. Broker

| 会社 | 差別化軸 | 注意事項 |
|---|---|---|
| XM Trading | ボーナス・初心者・安心感 | アフィリリンク待ち |
| Exness | 高レバ・出金速度・スキャル | 指標時レバ制限に注意 |
| ThreeTrader | 超低コスト・上級者特化 | スリッページ実測待ち |
| MyFXMarkets | 高性能だが2021年騒動あり | 騒動の記述は慎重に |

## B-2. Prop Firms

| 会社 | 差別化軸 | 注意事項 |
|---|---|---|
| Fintokei | 日本語・失格経験（外付け手数料の落とし穴） | 失格経験が核心コンテンツ |
| Funded7 | 革新型・OREF/QC・新世代ルール | QC計算式は「簡略イメージ」注釈必須 |
| The5ers | 老舗・長期スケーリング・大会11位 | 有料チャレンジは未経験 |

---

# APPENDIX C：文体・表現ルール

## C-1. 断定リスク管理

```
❌ 「出金拒否はありません」
✅ 「S++側で確認できる範囲では、正規利用者への悪質な出金拒否事例は
    見当たっていない。ただしS++が全ての事例を網羅しているわけではない。」
```

## C-2. 禁止ワード

```
「総合的におすすめ」「初心者でも安心」「人気があります」（根拠なし）
「完全に安全」「必ず儲かる」「出金拒否はない」（断定）
```

## C-3. 検証状態の表記

```
✅ 確認済み / 🔬 確認中 / 📋 確認予定 / 📊 実測済み
```

## C-4. DEV ONLY管理

```html
<!-- [DEV ONLY] アフィリエイトリンクに差し替え予定 -->
<!-- TODO: 個別URL化予定 -->
```

---

# APPENDIX D：OS更新ルール

## D-1. 更新タイミング

```
・新しい実測データが追加された時
・記事のHTML実装が完了した時
・本番NG事項が解消された時
・フェーズが移行した時
・新しいAI・チャットが引き継いだ時
```

## D-2. バージョニングルール

```
Major（X.0.0）：思想・方針の大幅変更
Minor（0.X.0）：新機能・新セクション追加
Patch（0.0.X）：小修正・データ更新
```

---

# OS SIGNATURE

```
NAME: S++ Cognitive Operating System
VERSION: 1.0.0
CREATED: 2026-05-10
CREATED_BY: K + Claude
SOURCE_CHAT: S++初代開発チャット（全ての始まり）
LOCATION: dev-dashboard/status/context_core.md
STATUS: ACTIVE
```

*このOSは「記録」ではなく「文明の認識同期基盤」として機能する。*
*AIが変わっても・チャットが変わっても・人間が変わっても、*
*S++の思想・状態・優先順位・依存関係が同期され続けること。*
