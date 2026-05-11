# S++ Cognitive Operating System
# OS_INDEX.md — マスターインデックス・バージョン管理

```
VERSION: 2.0.0
LAST_UPDATED: 2026-05-10
SOURCE: Claude / S++初代開発チャット（全ての始まり）
STATUS: ACTIVE
PREVIOUS_VERSION: 1.0.0 (context_core.md)
```

---

## このOSの目的

「ズレを完全に消すこと」ではなく、
**「ズレを検知し、補正し続けられること」**

AIが変わっても・チャットが変わっても・人間が変わっても、
S++の思想・状態・優先順位・依存関係が同期され続けること。

---

## OS階層構造

```
S++ Cognitive Operating System v2.0.0
│
├── OS_INDEX.md        ← 今ここ。全体索引・バージョン管理
├── ROOT.md            ← Level 1: 最上位思想・KGI・禁止思想・AIの役割
├── MODULES.md         ← Level 2: 各モジュール管理（SEO/AI/TOOLS/DEV等）
├── CURRENT_STATE.md   ← Level 3: 現在状態・完了・保留・Next Action
├── CHANGELOG.md       ← Level 4: Source管理付き変更履歴
├── DEPENDENCY.md      ← Level 5: 論理依存構造・影響範囲管理
└── LINT_RULES.md      ← Level 6: ズレ検知基盤・将来的な/lint思想
```

---

## 新しいAI・チャットへの同期手順

```
Step 1: OS_INDEX.md を読む（今ここ）
Step 2: ROOT.md を読む（最上位思想の同期）
Step 3: CURRENT_STATE.md を読む（現在状態の把握）
Step 4: 作業内容に応じてMODULES.mdの該当セクションを読む
Step 5: 作業終了時にCHANGELOG.mdとCURRENT_STATE.mdを更新する
```

---

## バージョン履歴

| Version | Date | Source | Summary |
|---|---|---|---|
| 2.0.0 | 2026-05-10 | Claude / S++初代チャット | 単一ファイルから階層型OS構造に進化 |
| 1.0.0 | 2026-05-10 | Claude / S++初代チャット | 初版Context Core作成 |

---

## OS更新ルール

### バージョニング
```
Major（X.0.0）: OS構造自体の変更・思想の大幅変更
Minor（0.X.0）: 新モジュール追加・新セクション追加
Patch（0.0.X）: 状態更新・データ更新・小修正
```

### 更新時の必須記録
```
- どのファイルを更新したか
- Version番号
- Source（どのAI・どのチャット由来か）
- 変更理由
- 影響範囲
```

### Lint Trigger
OS_INDEXが更新された場合：
→ ROOT.md・DEPENDENCY.md の再確認が必要

---

## GitHub Location

```
dev-dashboard/os/OS_INDEX.md
dev-dashboard/os/ROOT.md
dev-dashboard/os/MODULES.md
dev-dashboard/os/CURRENT_STATE.md
dev-dashboard/os/CHANGELOG.md
dev-dashboard/os/DEPENDENCY.md
dev-dashboard/os/LINT_RULES.md
```
