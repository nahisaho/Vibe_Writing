---
title: "GitHub Pages セットアップガイド"
description: "Vibe Writingで作成した文書をGitHub Pagesで公開するための完全セットアップガイド。Jekyll設定から自動化まで包括的に解説。"
date: 2025-01-15
categories: [github-pages, deployment, automation]
tags: [github-pages, jekyll, automation, vibe-writing]
layout: post
permalink: /github-setup/
toc: true
---

# GitHub Pages セットアップガイド

## 🎯 目標

Vibe Writingで作成した技術文書を、GitHub Pagesで自動的に公開・更新する環境を構築します。

## ⏱️ 所要時間：45分

- **GitHub設定：** 15分
- **Jekyll設定：** 20分
- **自動化設定：** 10分

## 📋 前提条件

- [x] GitHubアカウント
- [x] Vibe Writingで作成済みのMarkdown文書
- [x] 基本的なGit操作の理解

---

## 🚀 Step 1：GitHubリポジトリの作成（5分）

### 1.1 新規リポジトリ作成

1. GitHub.comにログイン
2. 「New repository」をクリック
3. リポジトリ設定：
   ```
   Repository name: [your-username].github.io
   または
   Repository name: vibe-writing-docs
   
   Description: Vibe Writing技術文書ライブラリ
   Public: ✅ チェック
   Add README: ✅ チェック
   Add .gitignore: Jekyll を選択
   ```

### 1.2 GitHub Pages設定

1. リポジトリの「Settings」タブ
2. 左メニューから「Pages」
3. Source設定：
   ```
   Source: Deploy from a branch
   Branch: main / (root)
   ```
4. 「Save」をクリック

**📝 メモ：** 設定後、`https://[username].github.io/[repository-name]`でアクセス可能になります。

---

## ⚙️ Step 2：Jekyll基本設定（15分）

### 2.1 _config.yml作成

リポジトリのルートに`_config.yml`を作成：

```yaml
# サイト基本情報
title: "技術文書ライブラリ"
description: "Vibe Writingで作成された実用的技術文書集"
author: "あなたの名前"
email: "your.email@example.com"

# URL設定
url: "https://[username].github.io"
baseurl: "/[repository-name]"  # リポジトリ名がusername.github.ioの場合は ""

# Jekyll設定
markdown: kramdown
highlighter: rouge
theme: minima

# プラグイン
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-toc

# 目次設定
toc:
  min_level: 2
  max_level: 4
  ordered_list: false
  no_toc_section_class: no_toc_section
  list_id: toc
  list_class: section-nav
  sublist_class: ''
  item_class: toc-entry
  item_prefix: toc-

# ビルド設定
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/

# コレクション設定
collections:
  docs:
    output: true
    permalink: /:collection/:name/

# デフォルト設定
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "技術文書チーム"
  - scope:
      path: ""
      type: "docs"
    values:
      layout: "page"

# 検索設定（Algolia使用時）
algolia:
  application_id: 'YOUR_APP_ID'
  index_name: 'YOUR_INDEX_NAME'
  search_only_api_key: 'YOUR_SEARCH_KEY'
```

### 2.2 Gemfile作成

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-toc", group: :jekyll_plugins

# Windows用
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
```

### 2.3 ディレクトリ構造作成

```
/
├── _config.yml          # Jekyll設定
├── Gemfile             # Ruby gem設定
├── _layouts/           # ページレイアウト
│   ├── default.html
│   ├── post.html
│   └── page.html
├── _includes/          # 共通パーツ
│   ├── header.html
│   ├── footer.html
│   └── navigation.html
├── _sass/              # CSS
│   └── main.scss
├── _posts/             # ブログ記事
├── _docs/              # 技術文書
├── assets/             # 静的ファイル
│   ├── css/
│   ├── js/
│   └── images/
└── index.md            # トップページ
```

---

## 📄 Step 3：レイアウトファイル作成（10分）

### 3.1 _layouts/default.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{% raw %}{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}{% endraw %}</title>
    <meta name="description" content="{% raw %}{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}{% endraw %}">
    
    {% raw %}{% seo %}{% endraw %}
    {% raw %}{% feed_meta %}{% endraw %}
    
    <link rel="stylesheet" href="{% raw %}{{ '/assets/css/main.css' | relative_url }}{% endraw %}">
    
    <!-- 検索機能（Algolia） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css">
</head>
<body>
    {% raw %}{% include header.html %}{% endraw %}
    
    <main>
        {% raw %}{{ content }}{% endraw %}
    </main>
    
    {% raw %}{% include footer.html %}{% endraw %}
    
    <!-- 検索機能JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4"></script>
    <script src="{% raw %}{{ '/assets/js/search.js' | relative_url }}{% endraw %}"></script>
</body>
</html>
```

### 3.2 _layouts/post.html

```html
---
layout: default
---

<article class="post">
    <header class="post-header">
        <h1 class="post-title">{% raw %}{{ page.title }}{% endraw %}</h1>
        <div class="post-meta">
            <time datetime="{% raw %}{{ page.date | date_to_xmlschema }}{% endraw %}">{% raw %}{{ page.date | date: "%Y年%m月%d日" }}{% endraw %}</time>
            {% raw %}{% if page.author %} • {{ page.author }}{% endif %}{% endraw %}
        </div>
        
        {% if page.tags.size > 0 %}
        <div class="post-tags">
            {% for tag in page.tags %}
                <span class="tag">{{ tag }}</span>
            {% endfor %}
        </div>
        {% endif %}
    </header>
    
    {% if page.toc %}
    <nav class="toc">
        <h2>目次</h2>
        {% toc %}
    </nav>
    {% endif %}
    
    <div class="post-content">
        {{ content }}
    </div>
    
    <footer class="post-footer">
        <div class="post-navigation">
            {% if page.previous %}
                <a href="{{ page.previous.url | relative_url }}" class="prev-post">
                    ← {{ page.previous.title }}
                </a>
            {% endif %}
            
            {% if page.next %}
                <a href="{{ page.next.url | relative_url }}" class="next-post">
                    {{ page.next.title }} →
                </a>
            {% endif %}
        </div>
    </footer>
</article>
```

---

## 🤖 Step 4：GitHub Actions自動化（10分）

### 4.1 .github/workflows/pages.yml作成

```yaml
name: GitHub Pages デプロイ

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
      uses: actions/checkout@v3
      
    - name: Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: 3.0
        bundler-cache: true
        
    - name: Install dependencies
      run: bundle install
      
    - name: Build site
      run: bundle exec jekyll build
      
    - name: Test site
      run: |
        bundle exec htmlproofer ./_site \
          --disable-external \
          --check-html \
          --allow_hash_href
          
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

### 4.2 .github/workflows/quality-check.yml作成

```yaml
name: 文書品質チェック

on:
  push:
    paths: ['_posts/**/*.md', '_docs/**/*.md']

jobs:
  quality-check:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: リンク切れチェック
      uses: gaurav-nelson/github-action-markdown-link-check@v1
      with:
        use-quiet-mode: 'yes'
        use-verbose-mode: 'yes'
        config-file: '.github/workflows/markdown-link-check-config.json'
        
    - name: スペルチェック
      uses: rojopolis/spellcheck-github-actions@0.5.0
      with:
        config_path: '.github/workflows/spellcheck-settings.yml'
        
    - name: 文書鮮度チェック
      run: |
        python .github/scripts/freshness-check.py
```

---

## 📝 Step 5：Vibe Writing文書の配置（5分）

### 5.1 既存文書の配置

```bash
# _posts/ ディレクトリに配置（ブログ形式）
_posts/2025-01-15-vibe-writing-framework.md

# _docs/ ディレクトリに配置（文書集形式）
_docs/vibe-writing-framework.md
_docs/quick-start-guide.md
_docs/prompt-templates.md
```

### 5.2 Front Matter調整

Vibe Writingで作成した文書のFront Matterを確認：

```yaml
---
title: "文書タイトル"
description: "文書の説明"
date: 2025-01-15
categories: [category1, category2]
tags: [tag1, tag2, tag3]
layout: post          # または page
toc: true             # 目次表示
author: "作成者名"
---
```

---

## 🔍 Step 6：検索機能の実装（オプション）

### 6.1 Algolia検索設定

1. [Algolia](https://www.algolia.com/)でアカウント作成
2. インデックス作成
3. APIキー取得
4. `_config.yml`にAlgolia設定追加

### 6.2 assets/js/search.js作成

```javascript
const searchClient = algoliasearch(
  '{% raw %}{{ site.algolia.application_id }}{% endraw %}',
  '{% raw %}{{ site.algolia.search_only_api_key }}{% endraw %}'
);

const search = instantsearch({
  indexName: '{% raw %}{{ site.algolia.index_name }}{% endraw %}',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: '文書を検索...',
  }),
  
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="hit">
          <h3><a href="{{ url }}">{{{ title }}}</a></h3>
          <p>{{{ description }}}</p>
          <div class="hit-meta">
            <span class="hit-category">{{ category }}</span>
            <span class="hit-date">{{ date }}</span>
          </div>
        </div>
      `,
    },
  }),
]);

search.start();
```

---

## ✅ Step 7：動作確認（5分）

### 7.1 ローカル確認

```bash
# リポジトリをクローン
git clone https://github.com/[username]/[repository-name].git
cd [repository-name]

# 依存関係インストール
bundle install

# ローカルサーバー起動
bundle exec jekyll serve

# ブラウザで確認
# http://localhost:4000
```

### 7.2 本番確認

1. 変更をGitHubにプッシュ
2. GitHub Actionsの実行確認
3. GitHub Pagesでの表示確認
4. SEO対応の確認

---

## 🔧 トラブルシューティング

### よくある問題と解決策

#### 問題1：GitHub Pagesでページが表示されない
**確認事項：**
- Settings > Pages設定が正しいか
- `_config.yml`のbaseurl設定
- ファイル名の命名規則（`YYYY-MM-DD-title.md`）

#### 問題2：Jekyll Build Failed
**確認事項：**
- `_config.yml`の構文エラー
- Front Matterの形式
- 必要なプラグインのインストール

#### 問題3：CSSが適用されない
**確認事項：**
- `_config.yml`のbaseurl設定
- CSSファイルのパス
- GitHub Pagesでのキャッシュクリア

---

## 📈 運用・保守

### 定期メンテナンス

**月次作業：**
- リンク切れチェック実行
- Jekyll/プラグインのアップデート確認
- アクセス解析の確認

**四半期作業：**
- セキュリティアップデートの適用
- 不要ファイルの整理
- サイト構造の見直し

### パフォーマンス最適化

```yaml
# _config.yml に追加
compress_html:
  clippings: all
  comments: all
  endings: all
  ignore:
    envs: [development]

# 画像最適化
plugins:
  - jekyll-imagemagick
```

---

## 🎉 完了！

GitHub Pagesでの技術文書公開環境が完成しました。

### 次のステップ

1. **Vibe Writing文書の継続投稿**
2. **読者フィードバックの収集**（GitHub Issues活用）
3. **アクセス解析の導入**（Google Analytics）
4. **SEO対策の強化**
5. **チーム展開の検討**

これで、Vibe Writingで作成した技術文書を効率的に公開・管理する基盤が整いました！