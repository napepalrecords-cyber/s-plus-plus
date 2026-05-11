# S++ Cognitive Operating System
# OS_INDEX.md — Root Entry / 同期ルーティング中枢

---

## ▼ SYSTEM HEADER

```
NAME:         S++ Cognitive Operating System
VERSION:      2.1.0
LAST_UPDATED: 2026-05-10
SOURCE:       Claude / S++初代開発チャット + ChatGPT / S++基盤chat
STATUS:       ACTIVE
OS_PHASE:     運用耐性固定フェーズ（bootstrap完了）
```

---

## ▼ AI同期フロー

このファイルはOSの「玄関」である。
全文を格納する場所ではなく、**同期ルーティング中枢**として機能する。

```
新チャット開始時の指示：
「S++ Cognitive Operating Systemに同期してください。
 Root Entry: https://s-plus-plus.vercel.app/dev-dashboard/os/OS_INDEX.md」

↓ AIはこのOS_INDEXを参照
↓ Current StateとCritical Updatesを確認
↓ Required Sync Modulesを取得
↓ 最新版へ同期完了
```

---

## ▼ CURRENT STATE（最重要・常に最新を保つ）

```
サイトフェーズ : Phase 1（海外FX・プロップファーム実測ガイド）
現在の作業    : Exness・ThreeTrader記事のHTML実装待ち
直近ブロッカー : XM実測データ待ち（SL-004）・アフィリ申請未着手
次のアクション : アフィリエイト申請（最優先）→ Exness HTML実装
```

---

## ▼ CRITICAL UPDATES（緊急確認事項）

```
[CRITICAL-001] アフィリリンク未設定
  → 全記事CTAが公式URLのまま。申請後に[DEV ONLY]箇所を差し替え。

[CRITICAL-002] support-log個別URLが404
  → SL-001〜004のURLが未作成。一覧ページ実装後に更新。

[CRITICAL-003] SL-004データ待ち
  → XM実口座データが届いたらwithdrawal・k-review記事を更新。
```

---

## ▼ DEPENDENCY ALERTS（現在アクティブな依存関係）

```
[ACTIVE-001] SL-004完成 → XM withdrawal・k-review記事を更新
[ACTIVE-002] アフィリ申請完了 → 全記事[DEV ONLY]箇所を差し替え
[ACTIVE-003] support-log一覧実装 → 全記事TODOリンクを個別URLに更新
[ACTIVE-004] 独自ドメイン取得 → 全記事内部リンクを本番URLに切り替え
```

---

## ▼ ACTIVE MODULES

```
MOD-SEO    : ACTIVE   - XM実装済み・Exness〜The5ers HTML待ち
MOD-SLOG   : ACTIVE   - SL-005〜007実測済み・SL-004待ち
MOD-TOOLS  : PARTIAL  - ロット計算ツール公開済み
MOD-DEV    : ACTIVE   - dev-dashboard・OS v2.1.0稼働中
MOD-AI     : PLANNED  - 長期計画
MOD-EA     : PLANNED  - 長期計画
MOD-JOURNAL: PLANNED  - 長期計画
MOD-WIKI   : PLANNED  - 長期計画
```

---

## ▼ REQUIRED SYNC MODULES（作業前に読むべきファイル）

```
必須（全作業共通）:
  → ROOT.md          最上位思想・KGI・禁止事項
  → CURRENT_STATE.md 現在状態・Next Action・ブロッカー

記事実装時に追加:
  → MODULES.md       MOD-SEOの差別化軸・文体ルール・DEVルール

依存関係確認時:
  → DEPENDENCY.md    論理依存構造・Trigger管理

ズレ検知・引き継ぎ時:
  → LINT_RULES.md    L-7引き継ぎチェックリスト

変更履歴確認時:
  → CHANGELOG.md     Source管理付き変更履歴
```

---

## ▼ LATEST CHANGELOG ENTRY

```
[v2.1.0] 2026-05-10
SOURCE: Claude / S++初代チャット + ChatGPT / S++基盤chat
CHANGE: OS運用耐性固定フェーズへ移行。
        Root Entry型OS_INDEXに改修。
        Version運用固定・Changelog強化・Dependency運用開始・
        Lint Trigger Rules実装・OS肥大化防止・Current State強化。
IMPACT: 全AI・全チャット・全開発者
```

---

## ▼ MODULE FILE MAP

```
dev-dashboard/os/
├── OS_INDEX.md        ← 今ここ（Root Entry・同期ルーティング中枢）
├── ROOT.md            ← 最上位思想・KGI・禁止事項・Kプロフィール
├── MODULES.md         ← 各モジュール詳細・差別化軸・文体ルール
├── CURRENT_STATE.md   ← 現在状態・Next Action・保留・危険事項
├── CHANGELOG.md       ← Source管理付き変更履歴
├── DEPENDENCY.md      ← 論理依存構造・Trigger・Active Dependency
└── LINT_RULES.md      ← Trigger Rules・ズレ検知・引き継ぎチェック
```

---

## ▼ OS運用ルール

```
更新頻度:
  OS_INDEX.md    : 毎作業後（Current State・Critical Updates更新）
  CURRENT_STATE.md: 毎作業後
  CHANGELOG.md   : 全変更時
  ROOT.md        : 思想変更時のみ（頻度低）
  DEPENDENCY.md  : 依存関係変更時のみ
  LINT_RULES.md  : ルール変更時のみ

肥大化防止:
  完了済み情報 → CURRENT_STATEから削除・CHANGELOGに移動
  古い情報 → archive/YYYY-MM-DD_ファイル名.md へ分離
  重複情報 → 1箇所に書いて他は参照のみ
```
