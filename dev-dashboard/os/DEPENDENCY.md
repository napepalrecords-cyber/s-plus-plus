# DEPENDENCY.md — 論理依存構造
# S++ Cognitive Operating System v2.1.0

```
VERSION: 2.1.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット
PURPOSE: 「ここを変更すると、どこへ影響するか」を管理する
STATUS: 実運用開始（v2.1.0より）
```

---

## DEPENDENCY思想

変更の影響は連鎖する。
このファイルはその連鎖を可視化し、更新漏れ・矛盾の発生を防ぐ。

**重要：** Dependencyは「情報管理」ではなく「論理影響管理」。
「ここが変わると、どこを再確認・再更新する必要があるか」を常に意識する。

---

## D-1. 思想レベルの依存チェーン

```
ROOT.md（最上位思想）が変わると：
  ↓
  MODULES.md の全セクションを再確認
  ↓
  MOD-SEO の文体ルール・記事設計を再確認
  ↓
  全記事HTMLファイルの表現を再確認
  ↓
  LP・比較記事・ガイド記事の方針を再確認
```

**Trigger:** ROOT.md変更 → LINT_RULES L-1を実行

---

## D-2. 記事実装の依存チェーン

```
S++ SEO MASTER DESIGN v1（設計基盤）
  ↓
XM記事HTML（テンプレート・基準）
  ├─ Exness記事HTML ← XMのHTMLをテンプレートとして継承
  ├─ ThreeTrader記事HTML ← 継承 + SL-005〜007の実測値を表示
  ├─ MyFXMarkets記事HTML ← 継承 + 2021年騒動表現を慎重に
  ├─ Fintokei記事HTML ← 継承 + K失格一次情報を核心に
  ├─ Funded7記事HTML ← 継承 + QC計算式に「簡略イメージ」注釈
  └─ The5ers記事HTML ← 継承 + K大会11位実績を活用
```

**Trigger:** XM記事HTML変更 → 全記事HTMLへの影響を確認

---

## D-3. support-logの依存チェーン

```
support-log設計（SL-001〜007）
  ├─ XM記事（SL-001〜004参照）
  │     ↓ SL-004完成後
  │     withdrawal記事・k-review記事の検証ログを更新
  ├─ ThreeTrader記事（SL-005〜007反映済み）
  │     ↓ HTML実装時
  │     実測値（14〜70時間・20〜30分・300万超）を表示すること
  └─ support-log一覧ページ（未実装）
        ↓ 実装完了後
        全記事内のsupport-logリンクを個別URLに更新（NG-002解消）
```

**Trigger:** SL-004完成 → XM記事2本を更新

---

## D-4. 本番公開の依存チェーン

```
アフィリエイト申請完了
  ↓ NG-001解消
  全記事の[DEV ONLY]箇所を実URLに差し替え

独自ドメイン取得
  ↓
  Vercel接続
  ↓ 重要：内部リンクを開発URLから本番URLに切り替え
  Googleサーチコンソール登録
  ↓
  sitemap.xml作成・送信
  ↓
  index申請
  ↓
  本番公開OK
```

**⚠ 重要Trigger:** 独自ドメイン取得 → 全記事の内部リンクを本番URLに切り替え

---

## D-5. フェーズ移行の依存チェーン

```
Phase 1 → Phase 2（国内FX記事公開後）：
  ROOT.md R-6を更新
  → index.htmlのtitle・H1・metaを更新
  → CURRENT_STATE.mdのフェーズ表示を更新
  → CHANGELOG.mdにエントリー追加

Phase 2 → Phase 3（全条件達成後）：
  上記に加えて
  → 「統合プラットフォーム」タイトルへの変更を実施
  → 全ページのmeta descriptionを更新
```

**Trigger:** フェーズ移行 → ROOT・CURRENT_STATE・CHANGELOG・index.htmlを更新

---

## D-6. OS自体の依存チェーン

```
OS_INDEX.md変更 → ROOT・DEPENDENCYの再確認
ROOT.md変更 → 全MODULES・全記事HTMLの再確認
MODULES.md変更 → DEPENDENCY・CURRENT_STATEの更新
CURRENT_STATE.md → 毎作業後に更新（最も頻繁）
CHANGELOG.md → 全変更を必ず記録
DEPENDENCY.md変更 → LINT_RULESへの影響を確認
LINT_RULES.md変更 → 全AIへの周知が必要
```

---

## D-7. 現在アクティブなDependency（要監視）

```
[ACTIVE-001] SL-004完成待ち
  → 完成後: XM withdrawal・k-review記事の検証ログを更新

[ACTIVE-002] アフィリエイト申請完了待ち
  → 完了後: 全記事の[DEV ONLY]箇所を実URLに差し替え

[ACTIVE-003] support-log一覧ページ未実装
  → 実装後: 全記事内のTODOコメント箇所を個別URLに更新

[ACTIVE-004] 独自ドメイン未取得
  → 取得後: 内部リンクの全面切り替えが必要（開発→本番URL）
```
