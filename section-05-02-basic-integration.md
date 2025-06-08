---
title: "5.2 基本的な連携ワークフロー"
description: "Vibe WritingとGitHub Pagesの基本的な統合手順と実践的な運用方法"
categories: [vibe-writing, github-pages, integration]
tags: [basic-integration, workflow, practical-implementation, documentation-automation]
---

# 5.2 基本的な連携ワークフロー

## 基本統合の概要

Vibe WritingとGitHub Pagesの基本的な連携ワークフローは、高品質な文書作成から効率的な公開まで、シームレスな体験を提供します。このセクションでは、実際の運用で最も頻繁に使用される基本的なワークフローを詳細に解説します。

### 基本ワークフローの全体像

```
[Phase 1] Vibe Writingによる文書作成
    ↓
[Phase 2] Markdownファイルの整備
    ↓
[Phase 3] GitHubリポジトリへのコミット
    ↓
[Phase 4] GitHub Pagesによる自動公開
    ↓
[Phase 5] 継続的な改善・更新
```

## Phase 1: Vibe Writingによる文書作成

### Step 1: 開発環境の準備

**実装前の必要な準備：**

開発者が実行すべき具体的なセットアップ手順：

```bash
# 1. 必要なツールのインストール確認
ruby --version  # Ruby 3.0以上が必要
git --version   # Git必須

# 2. Jekyll環境のセットアップ
gem install bundler jekyll

# 3. ローカル開発サーバーの起動確認
cd your-documentation-project
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000 でアクセス可能になる
```

**推奨開発環境：**
- **エディタ**: VS Code + Markdown All in One拡張機能
- **AIツール**: Claude Sonnet（戦略設計）+ Claude Code（実装）
- **プレビュー**: Jekyll localhost:4000（リアルタイムプレビュー）
- **バージョン管理**: Git + GitHub

**VS Code拡張機能の設定：**
```bash
# VS Codeを開いて以下の拡張機能をインストール
code --install-extension yzhang.markdown-all-in-one
code --install-extension DavidAnson.vscode-markdownlint
code --install-extension bierner.markdown-preview-github-styles
```

### Step 2: 意図の明確化（GitHub Pages最適化）

**Web公開を前提としたVibe設定例：**

**対話例：**
```
私：「GitHub Pagesで公開する技術ガイドを作成します。
対象読者は中級システム管理者で、スマートフォンからのアクセスも考慮する必要があります。
SEO最適化も含めた構成を提案してください。」

Claude Sonnet：「Web公開特性を考慮したVibe設定を提案します：

【読者分析】
- プライマリ：中級システム管理者（実作業での参照）
- セカンダリ：検索エンジン経由の新規利用者
- デバイス：PC（60%）、スマートフォン（30%）、タブレット（10%）

【利用シーン】
- 作業中の手順確認（時間制約あり）
- 問題解決時の情報検索（緊急性あり）
- 事前学習・準備（時間的余裕あり）

【Web最適化要件】
- スキャナビリティ：見出しによる階層構造
- モバイル対応：短いパラグラフ、適切な改行
- SEO対応：検索キーワードの適切な配置
```

### Step 3: 戦略的構成設計（Web最適化）

**GitHub Pages向け構成の特徴：**

**情報階層の設計：**
```markdown
# H1: SEO最重要キーワードを含むタイトル
## H2: 主要セクション（TOCに表示）
### H3: 詳細項目（スキャン読み対応）
#### H4: 補足情報（必要に応じて）
```

**レスポンシブ対応の考慮：**
- 横スクロールを避ける表組み設計
- 画像の適切なサイズ指定
- コードブロックの読みやすさ確保

### Step 4-6: 文書完成まで

従来のVibe Writingプロセスに加え、以下のWeb特有要素を考慮：

**メタデータの設定：**
```yaml
---
layout: default
title: "Microsoft 365 条件付きアクセス設定ガイド"
description: "組織のセキュリティ強化のための条件付きアクセス設定手順"
keywords: "Microsoft 365, 条件付きアクセス, セキュリティ, 設定手順"
author: "技術チーム"
date: 2024-01-15
last_modified: 2024-01-15
category: security
tags: [microsoft365, security, conditional-access]
---
```

## Phase 2: Markdownファイルの整備

### ファイル構造の標準化

**推奨ディレクトリ構造：**
```
docs/
├── guides/
│   ├── security/
│   │   ├── conditional-access.md
│   │   ├── multi-factor-authentication.md
│   │   └── data-loss-prevention.md
│   ├── infrastructure/
│   └── applications/
├── tutorials/
│   ├── getting-started/
│   └── advanced/
├── references/
│   ├── api/
│   └── configuration/
└── assets/
    ├── images/
    ├── css/
    └── js/
```

### Markdown最適化

**SEO対応のMarkdown記述：**
```markdown
# Microsoft 365 条件付きアクセス設定ガイド

## 概要

組織のセキュリティを強化するため、**条件付きアクセス**を設定する包括的なガイドです。この設定により、リスクの高いアクセスを自動的に制御し、データ保護を強化できます。

### この記事で学べること

- [ ] 条件付きアクセスの基本概念
- [ ] 段階的な設定手順
- [ ] よくある問題と解決方法
- [ ] ベストプラクティス

## 前提条件

以下の要件を満たしていることを確認してください：

| 項目 | 要件 |
|------|------|
| ライセンス | Azure AD Premium P1以上 |
| 権限 | 条件付きアクセス管理者 |
| 環境 | Microsoft 365 E3以上 |

> **⚠️ 重要な注意点**
> 
> 条件付きアクセスの設定は、組織全体のアクセスに影響します。
> 必ずテスト環境での検証を実施してから本番環境に適用してください。
```

### 画像とリソースの最適化

**画像ファイルの管理：**
```markdown
<!-- 相対パスを使用 -->
![条件付きアクセス設定画面](../assets/images/conditional-access-config.png)

<!-- 画像の説明と代替テキストを必ず設定 -->
<img src="../assets/images/policy-creation.png" 
     alt="新しいポリシー作成画面のスクリーンショット" 
     width="800" 
     height="400">
```

**リンクの最適化：**
```markdown
<!-- 内部リンク -->
詳細な設定方法は[多要素認証ガイド](./multi-factor-authentication.md)を参照してください。

<!-- 外部リンク -->
公式ドキュメントは[Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/)で確認できます。

<!-- アンカーリンク -->
[トラブルシューティング](#troubleshooting)セクションもご覧ください。
```

## Phase 3: GitHubリポジトリへのコミット

### ローカル確認とテスト

**実装手順：品質チェックの自動化**

以下のスクリプトで品質チェックを自動実行できます：

```bash
# 1. 品質チェックツールのインストール
npm install -g markdownlint-cli markdown-link-check textlint

# 2. チェックスクリプトの作成
cat > scripts/quality-check.sh << 'EOF'
#!/bin/bash
echo "🔍 品質チェックを開始します..."

# Jekyllビルドテスト
echo "Jekyll ビルドテスト中..."
bundle exec jekyll build
if [ $? -ne 0 ]; then
    echo "❌ Jekyllビルドに失敗しました"
    exit 1
fi

# Markdownリンター
echo "Markdown構文チェック中..."
markdownlint docs/**/*.md
if [ $? -ne 0 ]; then
    echo "❌ Markdown構文エラーがあります"
    exit 1
fi

# リンクチェック
echo "リンク確認中..."
find docs -name "*.md" -exec markdown-link-check {} \;

echo "✅ 品質チェック完了"
EOF

chmod +x scripts/quality-check.sh

# 3. ローカルサーバー起動とテスト
bundle exec jekyll serve --livereload &
SERVER_PID=$!

# ブラウザで確認すべき項目：
echo "📋 以下の項目を手動確認してください："
echo "□ http://localhost:4000 でページが正常に表示される"
echo "□ レスポンシブデザインが機能している"
echo "□ ナビゲーションが正しく動作する"
echo "□ 画像とリンクが正常に表示される"
echo "□ SEOメタデータが設定されている"

# 確認後にサーバーを停止
# kill $SERVER_PID
```

**トラブルシューティング：**
- Jekyll サーバーが起動しない → `bundle install` を再実行
- 画像が表示されない → assets/images/ パスを確認
- CSS が反映されない → ブラウザキャッシュをクリア

### コミット作業の標準化

**ブランチ戦略：**
```bash
# 機能ブランチでの作業
git checkout -b feature/conditional-access-guide

# 作業完了後
git add docs/guides/security/conditional-access.md
git add assets/images/conditional-access-*.png

# わかりやすいコミットメッセージ
git commit -m "Add: Microsoft 365条件付きアクセス設定ガイド

- Vibe Writingプロセスによる新規作成
- SEO最適化とモバイル対応を考慮
- スクリーンショット8枚を含む包括的なガイド
- 実装予定項目：#123"
```

**プルリクエストでの品質確保：**
```markdown
## 変更内容
Microsoft 365条件付きアクセス設定ガイドを新規作成

## Vibe Writingプロセス
- [x] Step 1: ツール役割分担確認済み
- [x] Step 2: Web公開最適化Vibe設定完了
- [x] Step 3: レスポンシブ対応構成設計完了
- [x] Step 4: 専門家レビュー完了
- [x] Step 5: SEO最適化指示作成完了
- [x] Step 6: Claude Codeによる最終生成完了

## 品質チェック
- [x] Markdownlint: PASS
- [x] Link check: PASS
- [x] Mobile responsiveness: OK
- [x] SEO optimization: OK
- [x] Technical accuracy: レビュー完了

## プレビュー
[デプロイプレビュー](https://deploy-preview-123.netlify.app)
```

## Phase 4: GitHub Pagesによる自動公開

### 自動デプロイの設定

**基本的なGitHub Actions設定：**
```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.1'
        bundler-cache: true
        
    - name: Build with Jekyll
      run: bundle exec jekyll build
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: ./_site
        
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: actions/deploy-pages@v2
```

### デプロイ状況の確認

**デプロイ成功の確認：**
```bash
# GitHub ActionsのStatus確認
# リポジトリページのActionsタブで確認

# デプロイ完了後のURL確認
# https://[username].github.io/[repository]/

# カスタムドメインの場合
# https://docs.example.com/
```

## Phase 5: 継続的な改善・更新

### 利用状況の監視

**GitHub Pages Analytics設定：**
```html
<!-- _includes/analytics.html -->
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**監視指標：**
- ページビュー数
- 滞在時間
- 直帰率
- 検索流入キーワード
- モバイル/デスクトップ比率

### フィードバック収集システム

**簡易フィードバック機能：**
```html
<!-- _includes/feedback.html -->
<div class="feedback-section">
  <h4>📝 この記事は役に立ちましたか？</h4>
  <div class="feedback-buttons">
    <button onclick="submitFeedback('helpful', '{{ page.title }}')">
      👍 役に立った
    </button>
    <button onclick="submitFeedback('needs-improvement', '{{ page.title }}')">
      👎 改善が必要
    </button>
  </div>
  
  <div id="improvement-form" style="display:none;">
    <textarea placeholder="具体的な改善提案をお聞かせください"></textarea>
    <button onclick="submitImprovement('{{ page.title }}')">送信</button>
  </div>
</div>
```

### 定期的な更新ワークフロー

**月次更新プロセス：**
```markdown
## 月次文書更新チェックリスト

### 技術情報の更新確認
- [ ] Microsoft 365の機能更新確認
- [ ] セキュリティ脅威の変化確認
- [ ] 法規制変更の確認
- [ ] ベストプラクティスの更新確認

### 利用データ分析
- [ ] Google Analyticsレポート確認
- [ ] 人気記事の特定
- [ ] 離脱率の高いページの特定
- [ ] 検索流入キーワードの分析

### 改善実施
- [ ] フィードバックに基づく修正
- [ ] 古い情報の更新
- [ ] 新しいスクリーンショットの追加
- [ ] リンク切れの修正

### 品質確保
- [ ] 更新内容のレビュー
- [ ] テスト環境での確認
- [ ] 本番デプロイ
- [ ] デプロイ後の動作確認
```

## 効率化のためのツールとテンプレート

### VS Code拡張機能の活用

**推奨拡張機能：**
```json
{
  "recommendations": [
    "yzhang.markdown-all-in-one",
    "DavidAnson.vscode-markdownlint",
    "bierner.markdown-preview-github-styles",
    "streetsidesoftware.code-spell-checker",
    "ms-vscode.vscode-json"
  ]
}
```

### 開発効率化スクリプト

**実装手順：新規文書作成の自動化**

以下のスクリプトで効率的に新しい文書を作成できます：

```bash
# 1. スクリプトディレクトリを作成
mkdir -p scripts

# 2. 新規文書作成スクリプト
cat > scripts/create-new-doc.sh << 'EOF'
#!/bin/bash
# 新規文書作成自動化スクリプト

# 使用方法チェック
if [ $# -ne 2 ]; then
    echo "使用方法: $0 <カテゴリ> <ファイル名>"
    echo "例: $0 security conditional-access"
    echo ""
    echo "利用可能なカテゴリ:"
    echo "  - security (セキュリティ関連)"
    echo "  - infrastructure (インフラ関連)"
    echo "  - tutorials (チュートリアル)"
    exit 1
fi

CATEGORY=$1
FILENAME=$2
DATE=$(date +%Y-%m-%d)
FILEPATH="docs/guides/$CATEGORY/$FILENAME.md"

# ディレクトリ作成
mkdir -p "docs/guides/$CATEGORY"

# テンプレートから新規ファイル作成
cat > "$FILEPATH" << TEMPLATE
---
layout: default
title: ""
description: ""
keywords: ""
author: "技術チーム"
date: $DATE
last_modified: $DATE
category: $CATEGORY
tags: []
---

# [タイトルをここに入力]

## 概要
[文書の概要を記述]

## 対象読者
[想定する読者層を明記]

## 前提条件
[必要な前提知識や環境を列挙]

## 手順

### ステップ1: [手順名]
[具体的な手順を記述]

## まとめ
[要点をまとめる]

---

**関連記事：**
- [関連記事1](../path/to/related1.md)
- [関連記事2](../path/to/related2.md)
- [目次に戻る](../../../index.md)
TEMPLATE

echo "✅ 新規文書を作成しました: $FILEPATH"
echo "📝 次の手順:"
echo "1. VS Codeで $FILEPATH を開く"
echo "2. タイトルや内容を実際の値に置換"
echo "3. Vibe Writingプロセスで本文を生成"
echo "4. 品質チェック: ./scripts/quality-check.sh"
EOF

chmod +x scripts/create-new-doc.sh

# 3. 使用例
echo "📖 使用例:"
echo "./scripts/create-new-doc.sh security multi-factor-auth"
```

**実際の使用方法：**
```bash
# セキュリティガイドの新規作成
./scripts/create-new-doc.sh security conditional-access

# インフラガイドの新規作成  
./scripts/create-new-doc.sh infrastructure kubernetes-setup

# 作成後のワークフロー
code docs/guides/security/conditional-access.md  # VS Codeで編集
./scripts/quality-check.sh                        # 品質チェック
git add . && git commit -m "Add: 条件付きアクセス設定ガイド"
```

この基本的な連携ワークフローにより、Vibe Writingで作成した高品質文書を効率的にGitHub Pagesで公開し、継続的な改善を実現できます。

---

**関連リンク：**
- [5.1 GitHub Pagesを活用した文書公開ワークフロー](section-05-01-publication-workflow.md)
- [5.3 Vibe Writing + GitHub Pages統合プロセス](section-05-03-integration-process.md)
- [目次に戻る](table-of-contents.md)