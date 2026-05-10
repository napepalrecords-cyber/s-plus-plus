# S++ change_log.md
# 変更履歴

---

## 2026-05-10

### XM Trading記事ページを開発環境に実装
- **対象：** `brokers/xm-trading/index.html`
- **変更内容：** タブUI（概要/評判/出金/安全性/Kレビュー）で5記事を統合表示するHTMLを生成・GitHubに追加
- **変更理由：** Wave1 XM記事の実装フェーズ開始
- **影響範囲：** `brokers/xm-trading/`
- **関連support-log：** SL-001〜004
- **本番反映：** 開発環境のみ（アフィリリンク待ち）
- **確認者：** K

### TOPページのXMリンクを新URLに接続
- **対象：** `index.html` 192行目
- **変更内容：** `href="brokers-overseas.html"` → `href="brokers/xm-trading/"`
- **変更理由：** XM記事ページ実装に伴うリンク接続
- **影響範囲：** TOPページのXMカード「詳細を見る」ボタン
- **本番反映：** 開発環境のみ
- **確認者：** K

### 開発管理ダッシュボードを実装
- **対象：** `dev-dashboard/index.html`
- **変更内容：** 8セクション構成の開発管理ダッシュボードを実装（全体進捗・本番移行チェック・コンテンツ管理・support-log管理・変更ログ・システム開発・本番NG事項）
- **変更理由：** 本番移行事故防止・開発状況の可視化
- **影響範囲：** 開発環境のみ（noindex設定済み）
- **本番反映：** 非表示（本番NG）

### ThreeTrader withdrawal・safety記事にSL-005〜007実測データを反映
- **対象：** `ThreeTrader_withdrawal.md` / `ThreeTrader_safety.md`
- **変更内容：** S++ member Aの実口座データ（出金3回・入金3回・長期利用実績）を反映
- **変更理由：** 実測データ取得・一次情報化
- **影響範囲：** ThreeTrader withdrawal / safety / support-log
- **関連support-log：** SL-005, SL-006, SL-007
- **本番反映：** MDのみ（HTML未実装）
- **確認者：** K

---

## 2026-05-10（前半）

### XM記事群 最終修正（ai P0〜P4指摘対応）
- **対象：** XM Hub / review / withdrawal / safety / k-review
- **変更内容：**
  - P0：「確認したところ（S++検証中）」矛盾表現を修正
  - P0：Kレビューを「暫定判断と検証ログのページ」と明記
  - P0：K所感プレースホルダーを「検証予定項目リスト」に変更
  - P0：実測前のReview schema・ratingValueを削除
  - P0：HowTo schemaをArticle+FAQPageに変更
  - P0：空CTAリンクを公式URLに差し替え
  - P1：広告・アフィリエイト表記を全記事に追加
  - P1：海外FX・CFDリスク表記を全記事に追加
  - P1：support-logリンクを個別URL（SL-001〜004）に接続
  - P1：「S++ Verification Running」ブロックを全記事に追加
  - P2：Hub記事に「KならXMをどう使うか」を追加
  - P2：出金記事に「なぜ最初に少額出金テストが必要か」を追加
  - P2：Kレビューに「現時点でのKの使い分け」を追加
  - P3：メタ情報・schemaをfrontmatterとして分離
  - P3：未公開の比較記事リンクを公式URLに変更
  - P3：canonical・created_at・updated_at・statusを各記事に追加
  - P4：断定表現を「S++側で確認できる範囲では」に調整
- **変更理由：** 公開前の品質確保・金融表現リスク低減
- **本番反映：** MDのみ（HTML実装はXM記事1本目）

### XM記事群 微修正
- 「扣除」→「控除」に修正
- アフィリ注記をHTMLコメント化（`[DEV ONLY]`）
- `/support-log/`に`<!-- TODO: 個別URL化予定 -->`を付与
- ボーナス利益表現を「条件を満たせば出金対象になります」に柔軟化

---

## 2026-05-09

### Wave1全35記事のMDファイル生成完了
- **対象：** Broker4社×5記事 + Prop3社×5記事 = 35記事
- **変更理由：** SEO MASTER DESIGN v1に基づくWave1実装
- **本番反映：** 未実装（MDのみ）

### S++ SEO MASTER DESIGN v1 策定
- **変更理由：** ChatGPT壁打ちを経て、SEO設計を先に固める方針に転換
- **成果物：** `S++SEO_MASTER_DESIGN_v1.md`

### support-logシステム設計完了
- **成果物：** `support_log_design.md` / `support_log_xm.md` / `support_log_threetrader.md`

---

*最終更新：2026-05-10*
*分類：status / change_log*
