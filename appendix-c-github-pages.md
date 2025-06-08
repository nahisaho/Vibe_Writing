---
title: "Appendix C: GitHub Pages詳細設定ガイド"
description: "Jekyll、テーマ設定、SEO最適化、パフォーマンス向上、自動化・CI/CD設定の包括的ガイド"
date: 2025-01-15
categories: [github-pages, jekyll, automation]
tags: [github-pages, jekyll, seo, ci-cd, automation, detailed-guide]
layout: post
permalink: /appendices/github-pages/
toc: true
---

# Appendix C: GitHub Pages詳細設定ガイド

## 📚 このガイドについて

GitHub Pagesを使用してVibe Writing文書を効率的に公開するための詳細設定ガイドです。Jekyll基本設定から高度なカスタマイズ、SEO最適化、自動化まで包括的にカバーします。

---

## Part 1: Jekyll基本設定

### C1-1. GitHub Pagesの有効化

**新規リポジトリでの設定手順：**

```bash
# リポジトリ作成
git init
git remote add origin https://github.com/[username]/[repository].git

# 基本ディレクトリ構造作成
mkdir _layouts
mkdir _includes
mkdir assets
mkdir assets/css
mkdir assets/js
mkdir assets/images
```

**既存リポジトリでの有効化：**

1. **Settings** タブに移動
2. **Pages** セクションを選択
3. **Source** で "Deploy from a branch" を選択
4. **Branch** で `main` または `master` を選択
5. **Folder** で `/` または `/docs` を選択
6. **Save** をクリック

### C1-2. 基本設定ファイルの作成

**_config.yml（Jekyll設定ファイル）：**

```yaml
# Site settings
title: "Vibe Writing Documentation"
description: "革新的文書作成フレームワークの包括的ガイド"
baseurl: "" # サブディレクトリがある場合は"/subdirectory"
url: "https://[username].github.io" # 本番URL

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Collections
collections:
  chapters:
    output: true
    permalink: /:collection/:name/
  sections:
    output: true
    permalink: /:collection/:name/
  appendices:
    output: true
    permalink: /:collection/:name/
```

### C1-3. Gemfileの設定

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-feed"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"
gem "jekyll-relative-links"
gem "jekyll-optional-front-matter"
gem "jekyll-readme-index"
gem "jekyll-default-layout"
gem "jekyll-titles-from-headings"
```

---

## Part 2: 高度なカスタマイズ

### C2-1. カスタムレイアウトの作成

**基本レイアウトファイル構造：**

- `_layouts/default.html` - 基本レイアウト
- `_layouts/chapter.html` - 章専用レイアウト
- `_layouts/section.html` - セクション専用レイアウト
- `_includes/header.html` - ヘッダー部分
- `_includes/footer.html` - フッター部分
- `_includes/navigation.html` - ナビゲーション

### C2-2. SEO最適化設定

**メタタグの最適化：**

1. タイトルタグの動的生成
2. 説明文の自動生成
3. Open Graphタグの設定
4. Twitter Cardの設定
5. 構造化データの実装

**robots.txtの設定：**

```
User-agent: *
Allow: /

Sitemap: https://[username].github.io/sitemap.xml
```

### C2-3. パフォーマンス最適化

**画像最適化：**

```yaml
# _config.ymlに追加
plugins:
  - jekyll-imagemagick

imagemagick:
  output_formats:
    webp:
      quality: 80
    jpg:
      quality: 85
```

**CSS・JS最適化：**

```yaml
# 圧縮設定
sass:
  sass_dir: _sass
  style: compressed

# 本番環境でのJavaScript圧縮
compress_html:
  clippings: all
  comments: all
  endings: all
  startings: all
```

---

## Part 3: 自動化とCI/CD

### C3-1. GitHub Actions設定

**.github/workflows/pages.yml：**

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "{% raw %}"${{ steps.pages.outputs.base_path }}"{% endraw %}"
        env:
          JEKYLL_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: {% raw %}"${{ steps.deployment.outputs.page_url }}"{% endraw %}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### C3-2. 自動品質チェック

**文書品質チェック用スクリプト：**

```yaml
# .github/workflows/quality-check.yml
name: Document Quality Check

on: [push, pull_request]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Markdown Lint
        uses: articulate/actions-markdownlint@v1
        
      - name: Link Check
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        
      - name: Spell Check
        uses: streetsidesoftware/cspell-action@v2
```

### C3-3. 自動デプロイメント

**条件付きデプロイメント：**

```yaml
# タグ作成時のみデプロイ
on:
  push:
    tags:
      - 'v*'

# マージ時のみデプロイ
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

---

## Part 4: 監視・分析・保守

### C4-1. アクセス解析の設定

**Google Analytics 4統合：**

```yaml
# _config.ymlに追加
google_analytics: G-XXXXXXXXXX

# Google Search Console
google_site_verification: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### C4-2. サイトマップ・RSS設定

**自動生成設定：**

```yaml
# _config.yml
plugins:
  - jekyll-sitemap
  - jekyll-feed

feed:
  posts_limit: 20
  excerpt_only: true
```

### C4-3. セキュリティ設定

**Content Security Policy:**

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

---

## Part 5: トラブルシューティング

### C5-1. よくある問題と解決法

**ビルドエラーの対処：**

1. **依存関係の問題**
   ```bash
   bundle update
   bundle exec jekyll build --verbose
   ```

2. **Liquid構文エラー**
   - コードブロック内の構文をエスケープ
   - front matterの形式確認

3. **パス関連のエラー**
   - 相対パスの確認
   - baseurl設定の確認

### C5-2. パフォーマンス問題の診断

**サイト速度測定ツール：**

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**最適化チェックリスト：**

- [ ] 画像圧縮・WebP形式の使用
- [ ] CSS・JS最小化
- [ ] 不要なプラグインの削除
- [ ] CDN設定の検討

---

## Part 6: 実践的な運用Tips

### C6-1. 効率的な更新フロー

**推奨ワークフロー：**

1. ローカル環境での作業
2. プルリクエストでの確認
3. 自動テストの実行
4. マージ後の自動デプロイ

### C6-2. チーム開発での注意点

**コンフリクト回避策：**

- ファイル分割による並行作業
- ブランチ戦略の統一
- 定期的なマージ

### C6-3. 継続的改善

**定期メンテナンス項目：**

- 依存関係の更新
- リンク切れのチェック
- アクセス解析の確認
- セキュリティアップデート

---

## 📚 参考資料

### 公式ドキュメント
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

### 有用なリソース
- [GitHub Pages Examples](https://github.com/collections/github-pages-examples)
- [Jekyll Themes](https://jekyllthemes.io/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**  
**Co-Authored-By: Claude <noreply@anthropic.com>**