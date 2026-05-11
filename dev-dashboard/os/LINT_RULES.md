# LINT_RULES.md — ズレ検知基盤
# S++ Cognitive Operating System v2.1.0

```
VERSION: 2.1.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット + ChatGPT / S++基盤chat
PURPOSE: ズレを検知し、補正可能にすること
STATUS: 実運用開始（v2.1.0より）
```

---

## LINT思想

「今ズレているか」だけでなく、
**「どこに影響する可能性があるか」**を検知する。

---

## Lint Trigger Rules（重要）

更新が発生した時に**自動的に再確認すべき箇所**を定義する。

| Trigger（何が変わったか） | 再確認が必要な箇所 |
|---|---|
| ROOT.md（思想変更） | MODULES全体・全記事HTML・LP |
| XM記事HTML（テンプレート変更） | 全記事HTMLへの影響 |
| support-log設計変更 | 全記事内のsupport-logリンク |
| フェーズ移行 | title・H1・meta・ROOT.md R-6 |
| アフィリリンク取得 | 全記事の[DEV ONLY]箇所 |
| 独自ドメイン取得 | 全記事の内部リンク（全面切り替え） |
| SL-004完成 | XM withdrawal・k-review記事 |
| OS_INDEX.md変更 | ROOT・DEPENDENCYの再確認 |

---

## L-1. 思想のズレ検知

```
□ S++を「比較サイト」「ランキングサイト」として扱っていないか
□ AIが主役になっていないか（KGIはKが管理）
□ 実測前の情報を「確認済み」として書いていないか
□ Phase 3のタイトルを条件未達で使用していないか
□ 禁止表現を使っていないか
  （「完全に安全」「必ず儲かる」「総合的におすすめ」等）
□ 「ズレを完全に消す」ことを目的にしていないか
```

---

## L-2. 実装のズレ検知

```
□ XM記事のHTMLをテンプレートとして継承しているか
□ Schema設計を守っているか（実測前：Article+FAQPage）
□ ratingValueを実測前に入れていないか
□ DEV ONLYコメントが適切に管理されているか
□ support-logリンクに「TODO: 個別URL化予定」が付与されているか
□ /dev-dashboard/がnoindex設定されているか
□ 広告・アフィリエイト表記が入っているか
□ 海外FXリスク表記が入っているか
□ 「確認したところ（S++検証中）」のような矛盾表現がないか
□ K所感のプレースホルダーが公開画面に残っていないか
```

---

## L-3. 優先順位のズレ検知

```
□ 比較記事を実測データ揃う前に作ろうとしていないか
□ 完璧主義で公開が遅れていないか（80〜85点で公開・育てる思想）
□ support-logより記事生成を優先していないか
□ アフィリエイト申請を後回しにしていないか（審査に時間がかかる）
```

---

## L-4. Source管理のズレ検知

```
□ CHANGELOGのエントリーにSourceが記録されているか
□ 旧思想ベースの内容が残っていないか
□ ChatGPT由来・Claude由来の更新が混在して矛盾していないか
□ Kの意図と異なる方向でAIが動いていないか
```

---

## L-5. OS肥大化検知

```
□ CURRENT_STATE.mdに「完了済み」の情報が残っていないか
  （完了したものはCHANGELOGに移動する）
□ ROOT.mdに実装詳細が混入していないか
  （実装詳細はMODULES.mdへ）
□ 同じ情報が複数ファイルに重複していないか
□ 1ファイルがAIの1回の読み込みで処理できる範囲を超えていないか
```

---

## L-6. Dependency Triggerのズレ検知

```
□ 変更後にDEPENDENCY.md D-7の「ACTIVE」項目を確認したか
□ Triggerが発生したのに連鎖確認を行っていないか
□ 記事変更後にCurrent Stateが更新されているか
□ 重要な変更後にCHANGELOGにエントリーが追加されているか
```

---

## L-7. 新しいAIへの引き継ぎチェックリスト（必須）

```
□ OS_INDEX.md を読んだか（バージョンとCurrent Active Stateを確認）
□ ROOT.md を読んだか（最上位思想の同期）
□ CURRENT_STATE.md を読んだか（現在状態・Next Action・ブロッカーの把握）
□ 作業内容に関連するMODULES.mdのセクションを読んだか
□ L-1〜L-4のLINTチェックを実施したか
□ 作業終了時にCURRENT_STATE.mdとCHANGELOG.mdを更新したか
□ 更新によって発生したDependency Triggerを確認したか
```

---

## L-8. OS運用テストチェックリスト

```
テスト1: 新チャットでの同期テスト
  □ OS_INDEXだけ読んでCurrent Active Stateを把握できるか
  □ ROOT.mdだけ読んでKGI・禁止思想を把握できるか
  □ CURRENT_STATE.mdだけ読んでNext Actionがわかるか

テスト2: ChatGPT→Claudeへの引き継ぎテスト
  □ ChatGPTが更新したCHANGELOGをClaudeが正しく読めるか
  □ Sourceが「ChatGPT / チャット名」として記録されているか
  □ Dependency Triggerが正しく伝わるか

テスト3: Dependency Trigger確認テスト
  □ XM記事HTMLを変更した時に全記事への影響確認が行われるか
  □ SL-004完成時にXM記事の更新が漏れないか
```
