# DEPENDENCY.md — 論理依存構造
# S++ Cognitive Operating System v2.0.0

```
VERSION: 2.0.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット（全ての始まり）
PURPOSE: 「ここを変更すると、どこへ影響するか」を管理する
```

---

## DEPENDENCY思想

変更の影響が連鎖する。
このファイルはその連鎖を可視化し、
更新漏れ・矛盾の発生を防ぐ。

---

## D-1. 思想レベルの依存関係

```
ROOT.md（最上位思想）
  ↓ 変更すると全てに影響
  ├─ MODULES.md（各モジュール設計）
  │     ↓
  │   MOD-SEO（記事設計・文体ルール）
  │     ↓
  │   全記事のHTMLファイル
  │     ↓
  │   LP・比較記事・ガイド記事
  │
  ├─ dev-dashboard（管理ダッシュボード）
  │
  └─ S++ Cognitive OS全体
```

**ROOT変更時の必須対応：**
→ MODULES.mdの該当セクションを更新
→ CURRENT_STATE.mdのフェーズ確認
→ CHANGELOG.mdにエントリー追加

---

## D-2. 記事実装の依存関係

```
S++ SEO MASTER DESIGN v1
  └─ XM記事HTML（テンプレート・基準）
      ├─ Exness記事HTML（継承）
      ├─ ThreeTrader記事HTML（継承 + SL-005〜007）
      ├─ MyFXMarkets記事HTML（継承 + 2021年騒動注意）
      ├─ Fintokei記事HTML（継承 + K失格一次情報）
      ├─ Funded7記事HTML（継承 + QC注釈）
      └─ The5ers記事HTML（継承 + K大会実績）
```

**XM HTMLを変更した場合：**
→ 全記事HTMLへの影響を確認する
→ テンプレートの変更か個別修正かを判断する

---

## D-3. support-logの依存関係

```
support-log設計（SL-001〜007）
  ├─ XM記事（SL-001〜004参照）
  │     → SL-004完成後にwithdrawal・k-reviewを更新
  ├─ ThreeTrader記事（SL-005〜007反映済み）
  │     → ThreeTrader HTML実装時に実測値を表示する
  └─ support-log一覧ページ（未実装）
        → NG-002の解消待ち
        → 実装後に全記事のsupport-logリンクを個別URLに更新
```

---

## D-4. 本番公開の依存関係

```
独自ドメイン取得
  └─ Vercel接続
      └─ 内部リンクを開発URLから本番URLに切り替え（重要）
          └─ Googleサーチコンソール登録
              └─ sitemap.xml作成・送信
                  └─ index申請
                      └─ 本番公開OK

⚠ 重要：開発環境と本番URLで内部リンクが重複しないよう設計が必要
```

---

## D-5. アフィリエイトの依存関係

```
アフィリエイト申請
  └─ 審査完了（1〜2週間）
      └─ [DEV ONLY]コメント箇所を実URLに差し替え
          └─ NG-001解消
              └─ 本番反映OK
```

---

## D-6. フェーズ移行の依存関係

```
Phase 1 → Phase 2移行条件：
  └─ 国内FX証券会社記事が最低限公開
      └─ ROOT.md R-6を更新
      └─ index.htmlのtitle・H1・metaを更新
      └─ CHANGELOG.mdにエントリー追加

Phase 2 → Phase 3移行条件（全て揃うこと）：
  └─ ロット計算ツール実用レベル
  └─ 損益期待値シミュレーター実用レベル
  └─ トレードジャーナル最低限動作
  └─ support-log継続運用中
  └─ 国内FX・海外FX・プロップ記事が揃っている
      → 全条件達成後にのみ「統合プラットフォーム」タイトルを使用可
```

---

## D-7. OS自体の依存関係

```
OS_INDEX.md（バージョン管理）
  └─ 変更時：ROOT・DEPENDENCY の再確認が必要

ROOT.md（最上位思想）
  └─ 変更時：全MODULES・全記事の再確認が必要

MODULES.md（各モジュール）
  └─ 変更時：DEPENDENCY・CURRENT_STATEの更新が必要

CURRENT_STATE.md（現在状態）
  └─ 更新頻度：最も高い（毎作業後に更新）

CHANGELOG.md（変更履歴）
  └─ 更新ルール：全変更を必ず記録

DEPENDENCY.md（このファイル）
  └─ 変更時：LINT_RULESへの影響を確認

LINT_RULES.md（ズレ検知）
  └─ 変更時：全AIへの周知が必要
```
