---
title: "5.1 GitHub Pagesを活用した文書公開ワークフロー"
description: "Vibe Writing×GitHub Pagesによる効率的な文書公開システムの構築"
categories: [vibe-writing, github-pages, workflow]
tags: [github-pages, publication-workflow, documentation-system, automation]
---

# 5.1 GitHub Pagesを活用した文書公開ワークフロー

## GitHub Pages統合の戦略的価値

Vibe WritingとGitHub Pagesの統合は、単なる文書公開手段を超えた戦略的価値を提供します。高品質な文書作成と効率的な公開・更新システムの組み合わせにより、組織の知識共有と技術発信力を劇的に向上させることができます。

### 従来の文書公開における課題

**技術文書公開の典型的問題：**
- 作成と公開のワークフローが分離
- 更新作業の複雑性と時間コスト
- バージョン管理の困難
- 複数形式での提供の負荷
- アクセス性・検索性の低さ

**結果として生じる問題：**
- 最新版と公開版の乖離
- 更新頻度の低下
- 利用者の混乱
- 文書の陳腐化

### Vibe Writing × GitHub Pages統合の価値

**統合による革新的ワークフロー：**
```
Vibe Writingによる高品質文書作成
    ↓
Markdownファイルとしての出力
    ↓
GitHubリポジトリへのコミット
    ↓
GitHub Pagesによる自動公開
    ↓
継続的更新・改善サイクル
```

## 基本ワークフローの設計

### Phase 1：環境構築（初回のみ）

**実装手順：GitHubリポジトリのセットアップ**

開発者が実際に実行する手順です。ターミナルで以下のコマンドを順次実行してください。

```bash
# 1. 新規リポジトリ作成と初期化
git init documentation-project
cd documentation-project

# 2. 必要なディレクトリ構造を作成
mkdir docs assets templates
mkdir assets/images assets/css assets/js

# 3. Jekyll設定ファイルの作成
cat > _config.yml << EOF
theme: minima
title: Technical Documentation
description: Vibe Writing Documentation Project
baseurl: ""
url: "https://https://github.com/yourysername"

# GitHub Pages設定
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Markdown設定
markdown: kramdown
highlighter: rouge
EOF

# 4. Gemfileの作成（Jekyll環境用）
cat > Gemfile << EOF
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
EOF
```

**重要な実装ポイント：**
- `https://github.com/yourysername`は実際のGitHubユーザー名に置き換えてください
- `github-pages` gemを使用することでGitHub Pagesとの互換性を保証
- `_config.yml`の設定は後でカスタマイズ可能

**ディレクトリ構造の設計：**
```
documentation-project/
├── docs/
│   ├── guides/           # 技術ガイド
│   ├── tutorials/        # チュートリアル
│   ├── references/       # リファレンス
│   └── troubleshooting/  # トラブルシューティング
├── assets/
│   ├── images/          # 画像ファイル
│   ├── css/             # カスタムCSS
│   └── js/              # JavaScript
├── templates/           # Vibe Writingテンプレート
└── _config.yml          # Jekyll設定
```

### Phase 2：Vibe Writing統合設定

**実装手順：文書テンプレートの作成**

以下のコマンドでVibe Writing用のテンプレートファイルを作成します：

```bash
# テンプレートファイルの作成
cat > templates/technical-guide-template.md << 'EOF'
---
layout: default
title: "[文書タイトル]"
description: "[文書説明]"
category: [カテゴリ]
tags: [tag1, tag2, tag3]
last_updated: 2024-01-01
version: 1.0
---

# [文書タイトル]

## 概要
[Vibe WritingのStep 2で設定したVibe内容]

## 対象読者
[読者ペルソナの詳細]

## 前提条件
[必要な前提知識・環境]

[以下、Vibe Writingで生成された本文]
EOF
```

**テンプレート活用方法：**
1. 新しい文書作成時、このテンプレートをコピー
2. `[文書タイトル]`等のプレースホルダーを実際の内容に置換
3. Vibe Writingプロセスで生成した内容を下部に追加

**Front Matter設定のベストプラクティス：**
- `title`: SEO対策のため60文字以内に設定
- `description`: 検索結果表示用、160文字以内を推奨
- `tags`: 関連記事検索用、3-5個程度が適切

**メタデータ管理システム：**
```yaml
# _data/documents.yml
guides:
  - title: "Microsoft 365セキュリティガイド"
    description: "組織向けセキュリティ設定の包括的ガイド"
    author: "技術チーム"
    last_updated: "2024-01-15"
    tags: ["security", "microsoft365", "configuration"]
    
tutorials:
  - title: "多要素認証設定チュートリアル"
    description: "段階的な多要素認証設定手順"
    author: "セキュリティチーム"
    last_updated: "2024-01-10"
    tags: ["mfa", "security", "tutorial"]
```

### Phase 3：自動化ワークフローの構築

**実装手順：GitHub Actionsの設定**

自動デプロイを設定するため、以下の手順を実行してください。

```bash
# 1. GitHub Actionsディレクトリを作成
mkdir -p .github/workflows

# 2. デプロイワークフローファイルを作成
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.1'
        bundler-cache: true
    
    - name: Install dependencies
      run: bundle install
    
    - name: Build site
      run: bundle exec jekyll build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
EOF
```

**設定確認手順：**
1. リポジトリをGitHubにプッシュ
2. GitHubの Settings > Pages でソースを「GitHub Actions」に設定
3. Actions タブでワークフローの実行状況を確認

**トラブルシューティング：**
- Actionsが失敗する場合は、Gemfileとbundle installの実行を確認
- GitHub Pagesが有効になっているかSettings画面で確認

## 効率的な文書作成・公開サイクル

### ステップ1：Vibe Writingによる文書作成

**Claude Sonnetでの戦略設計：**
```
私：「GitHub Pages公開を前提とした技術ガイドを作成します。
読者は中級レベルのシステム管理者で、実際の設定作業で参照される文書です。
Web表示に最適化された構成と表現を提案してください。」

Claude Sonnet：「Web表示特性を考慮した構成を提案します：
1. スキャナビリティ重視の見出し構造
2. 段階的詳細展開（概要→詳細）
3. 視覚的な区切りを活用した情報整理
4. モバイル表示も考慮したレイアウト」
```

**Web最適化を考慮したVibe設定例：**
```
「システム管理者が実際の作業中にスマートフォンやタブレットからでも
必要な情報にすぐにアクセスでき、迷わず作業を完了できる実践的なガイド。
検索エンジンからの流入も考慮し、SEO最適化された構成とする。」
```

### ステップ2：Markdown最適化

**Claude Codeでの最終調整：**
```markdown
# タイトル最適化
## 検索しやすいキーワードを含んだ明確なタイトル

### 構造化されたコンテンツ
- **太字**による重要ポイントの強調
- `コードブロック`による設定値の明示
- > 引用による注意点の強調

### 視覚的要素の活用
![設定画面スクリーンショット](../assets/images/config-screen.png)

### リンク最適化
詳細は[関連ガイド](./related-guide.md)を参照してください。
```

### ステップ3：品質確認とコミット

**公開前チェックリスト：**
```bash
# ローカル確認
bundle exec jekyll serve

# 以下をブラウザで確認：
# □ レスポンシブデザインの確認
# □ ナビゲーションの動作確認
# □ 画像・リンクの表示確認
# □ SEO要素の確認

# 問題なければコミット
git add .
git commit -m "Add: 新しい技術ガイド - [文書タイトル]"
git push origin main
```

## 高度な統合機能

### 多言語対応システム

**ディレクトリ構造：**
```
docs/
├── en/              # 英語版
├── ja/              # 日本語版
└── shared/          # 共通リソース
    ├── images/
    └── assets/
```

**言語切り替え設定：**
```yaml
# _config.yml
plugins:
  - jekyll-multiple-languages-plugin

languages: ["ja", "en"]
default_lang: "ja"
exclude_from_localization: ["assets", "shared"]
```

### 検索機能の実装

**Lunr.js統合：**
```html
<!-- _includes/search.html -->
<div id="search-container">
  <input type="text" id="search-input" placeholder="文書を検索...">
  <ul id="results-container"></ul>
</div>

<script src="{{ '/assets/js/lunr.min.js' | relative_url }}"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
```

**検索インデックス生成：**
```javascript
// assets/js/search.js
var idx = lunr(function () {
  this.field('title')
  this.field('content')
  this.field('tags')
  this.ref('id')
  
  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})
```

### アナリティクス統合

**Google Analytics設定：**
```html
<!-- _includes/analytics.html -->
{% raw %}{% if site.google_analytics %}{% endraw %}
<script async src="https://www.googletagmanager.com/gtag/js?id={% raw %}{{ site.google_analytics }}{% endraw %}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{% raw %}{{ site.google_analytics }}{% endraw %}');
</script>
{% raw %}{% endif %}{% endraw %}
```

**利用状況の分析：**
- 人気記事の特定
- 検索キーワードの分析
- ユーザー行動の理解
- 改善ポイントの発見

## 継続的改善システム

### フィードバック収集機能

**文書評価システム：**
```html
<!-- _includes/feedback.html -->
<div class="feedback-section">
  <h4>この文書は役に立ちましたか？</h4>
  <button onclick="submitFeedback('helpful')">👍 役に立った</button>
  <button onclick="submitFeedback('not-helpful')">👎 改善が必要</button>
  
  <div id="feedback-form" style="display:none;">
    <textarea placeholder="改善提案をお聞かせください"></textarea>
    <button onclick="submitSuggestion()">送信</button>
  </div>
</div>
```

### バージョン管理とアーカイブ

**文書履歴の管理：**
```yaml
# 各文書のFrontmatter
---
title: "技術ガイド"
version: 2.1
changelog:
  - version: 2.1
    date: 2024-01-15
    changes: "セキュリティ設定の追加"
  - version: 2.0
    date: 2024-01-01
    changes: "大幅な構成変更"
---
```

### 自動品質チェック

**CI/CDでの品質確認：**
```yaml
# .github/workflows/quality-check.yml
- name: Markdown Lint
  run: markdownlint docs/**/*.md

- name: Link Check
  run: markdown-link-check docs/**/*.md

- name: Spell Check
  run: cspell "docs/**/*.md"
```

## 運用成果の測定

### KPI設定と測定

**定量指標：**
- ページビュー数：月間アクセス数
- 滞在時間：文書の有用性指標
- 検索順位：SEO効果測定
- フィードバック評価：ユーザー満足度

**定性指標：**
- ユーザーフィードバック内容
- 社内利用状況
- 外部からの評価
- 技術コミュニティでの反響

このワークフローにより、Vibe Writingで作成した高品質文書を効率的に公開・運用し、継続的な価値提供を実現できます。

---

**関連リンク：**
- [5.2 基本的な連携ワークフロー](section-05-02-basic-integration.md)
- [第4章：Vibe Writingの実践](chapter-04-six-step-process.md)
- [目次に戻る](table-of-contents.md)