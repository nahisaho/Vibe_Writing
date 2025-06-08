---
title: "Appendix C: GitHub Pages詳細設定ガイド"
description: "Vibe Writing文書のGitHub Pages公開のための包括的技術ガイド - 基本設定から高度なカスタマイズまで"
categories: [appendix, github-pages, web-publishing]
tags: [github-pages, jekyll, markdown, web-hosting, automation]
---

# Appendix C: GitHub Pages詳細設定ガイド

## このAppendixの目的と活用法

**Vibe Writingで作成した文書をGitHub Pagesで効果的に公開するための実践的な技術ガイドです。**基本的なセットアップから高度なカスタマイズ、SEO最適化、自動化まで、プロフェッショナルな文書サイト構築に必要な全ての技術要素を網羅します。

### 対象読者と前提知識

**対象読者：**
- GitHub基本操作を理解している技術者
- Markdown記法に慣れ親しんでいる文書作成者
- 組織の技術文書公開を担当している方

**前提知識：**
- Git/GitHubの基本操作
- Markdown記法の基礎
- HTMLの基本的な理解（カスタマイズ時）

---

## Part 1: 基本セットアップ

### C1. GitHub Pagesの有効化

#### C1-1. リポジトリの準備

**新規リポジトリの作成：**

```bash
# 1. GitHubでリポジトリを作成
# Repository name: your-docs-site
# Description: Vibe Writing Documentation Site
# Public/Private: 用途に応じて選択
# Initialize with README: チェック

# 2. ローカルにクローン
git clone https://github.com/[username]/your-docs-site.git
cd your-docs-site

# 3. 基本ディレクトリ構造の作成
mkdir docs
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

#### C1-2. 基本設定ファイルの作成

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

# Default layouts
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
      type: "chapters"
    values:
      layout: "chapter"
  - scope:
      path: ""
      type: "sections"
    values:
      layout: "section"

# SEO settings
twitter:
  username: your_twitter
  card: summary

facebook:
  app_id: your_app_id
  publisher: your_facebook_page

# Analytics
google_analytics: UA-XXXXXXXX-X

# Navigation
navigation:
  - title: "ホーム"
    url: "/"
  - title: "目次"
    url: "/table-of-contents/"
  - title: "クイックスタート"
    url: "/quick-start-guide/"
  - title: "付録"
    url: "/appendices/"

# Footer
footer_links:
  - title: "GitHub"
    url: "https://github.com/[username]/your-docs-site"
  - title: "Issues"
    url: "https://github.com/[username]/your-docs-site/issues"
```

### C2. レイアウトとテーマの設定

#### C2-1. カスタムレイアウトの作成

**_layouts/default.html（基本レイアウト）：**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}">
    <meta name="keywords" content="{% if page.tags %}{{ page.tags | join: ', ' }}{% endif %}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}">
    <meta property="og:description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ site.url }}{{ page.url }}">
    
    <!-- CSS -->
    <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ '/assets/images/favicon.ico' | relative_url }}">
    
    {% seo %}
    {% feed_meta %}
</head>
<body>
    {% include header.html %}
    
    <main class="main-content">
        {{ content }}
    </main>
    
    {% include footer.html %}
    
    <!-- JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
    
    {% if site.google_analytics %}
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '{{ site.google_analytics }}');
    </script>
    {% endif %}
</body>
</html>
```

**_layouts/chapter.html（章専用レイアウト）：**

```html
---
layout: default
---

<article class="chapter">
    <header class="chapter-header">
        <h1 class="chapter-title">{{ page.title }}</h1>
        {% if page.description %}
        <p class="chapter-description">{{ page.description }}</p>
        {% endif %}
        
        <div class="chapter-meta">
            {% if page.categories %}
            <div class="categories">
                {% for category in page.categories %}
                <span class="category">{{ category }}</span>
                {% endfor %}
            </div>
            {% endif %}
            
            {% if page.tags %}
            <div class="tags">
                {% for tag in page.tags %}
                <span class="tag">{{ tag }}</span>
                {% endfor %}
            </div>
            {% endif %}
        </div>
    </header>
    
    <div class="chapter-content">
        {{ content }}
    </div>
    
    <nav class="chapter-navigation">
        <div class="nav-links">
            <a href="/" class="nav-link home">
                ← ホームに戻る
            </a>
            <a href="/table-of-contents" class="nav-link toc">
                目次を見る →
            </a>
        </div>
    </nav>
</article>
```

#### C2-2. インクルードファイルの作成

**_includes/header.html（ヘッダー）：**

```html
<header class="site-header">
    <div class="container">
        <div class="header-content">
            <div class="site-branding">
                <a href="{{ '/' | relative_url }}" class="site-title">
                    {{ site.title }}
                </a>
                <p class="site-description">{{ site.description }}</p>
            </div>
            
            <nav class="main-navigation">
                <ul class="nav-menu">
                    {% for item in site.navigation %}
                    <li class="nav-item">
                        <a href="{{ item.url | relative_url }}" 
                           class="nav-link {% if page.url == item.url %}active{% endif %}">
                            {{ item.title }}
                        </a>
                    </li>
                    {% endfor %}
                </ul>
                
                <button class="mobile-menu-toggle" aria-label="メニューを開く">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </div>
    </div>
</header>
```

**_includes/footer.html（フッター）：**

```html
<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-info">
                <h3>{{ site.title }}</h3>
                <p>{{ site.description }}</p>
            </div>
            
            <div class="footer-links">
                <h4>リンク</h4>
                <ul>
                    {% for link in site.footer_links %}
                    <li>
                        <a href="{{ link.url }}" {% if link.url contains 'http' %}target="_blank" rel="noopener"{% endif %}>
                            {{ link.title }}
                        </a>
                    </li>
                    {% endfor %}
                </ul>
            </div>
            
            <div class="footer-meta">
                <p>&copy; {{ 'now' | date: "%Y" }} Vibe Writing Project</p>
                <p>
                    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja" target="_blank" rel="noopener">
                        CC BY-NC-SA 4.0
                    </a>
                </p>
            </div>
        </div>
    </div>
</footer>
```

### C3. スタイリング（CSS）

#### C3-1. メインスタイルシート

**assets/css/main.scss：**

```scss
---
---

// Variables
$primary-color: #2c3e50;
$secondary-color: #3498db;
$accent-color: #e74c3c;
$text-color: #333;
$light-text: #666;
$border-color: #e1e1e1;
$background-color: #f8f9fa;

$font-family-base: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif;
$font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;

// Base styles
* {
    box-sizing: border-box;
}

body {
    font-family: $font-family-base;
    font-size: 16px;
    line-height: 1.6;
    color: $text-color;
    margin: 0;
    padding: 0;
    background-color: #fff;
}

// Container
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    
    @media (max-width: 768px) {
        padding: 0 15px;
    }
}

// Header
.site-header {
    background-color: $primary-color;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
        }
    }
    
    .site-title {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
        
        &:hover {
            color: $secondary-color;
        }
    }
    
    .site-description {
        margin: 0.25rem 0 0 0;
        font-size: 0.9rem;
        opacity: 0.8;
    }
}

// Navigation
.main-navigation {
    .nav-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 2rem;
        
        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
        }
    }
    
    .nav-link {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        
        &:hover,
        &.active {
            background-color: $secondary-color;
        }
    }
}

// Main content
.main-content {
    min-height: calc(100vh - 200px);
    padding: 2rem 0;
}

// Chapter styles
.chapter {
    .chapter-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid $border-color;
        
        .chapter-title {
            margin: 0 0 0.5rem 0;
            color: $primary-color;
            font-size: 2.5rem;
            
            @media (max-width: 768px) {
                font-size: 2rem;
            }
        }
        
        .chapter-description {
            font-size: 1.1rem;
            color: $light-text;
            margin: 0 0 1rem 0;
        }
        
        .chapter-meta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .categories,
        .tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .category,
        .tag {
            background-color: $background-color;
            color: $text-color;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
        
        .tag {
            background-color: $secondary-color;
            color: white;
        }
    }
    
    .chapter-content {
        max-width: 800px;
        
        h1, h2, h3, h4, h5, h6 {
            color: $primary-color;
            margin-top: 2rem;
            margin-bottom: 1rem;
            
            &:first-child {
                margin-top: 0;
            }
        }
        
        h2 {
            font-size: 1.8rem;
            border-bottom: 2px solid $secondary-color;
            padding-bottom: 0.5rem;
        }
        
        h3 {
            font-size: 1.4rem;
            color: $secondary-color;
        }
        
        p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        ul, ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        blockquote {
            border-left: 4px solid $secondary-color;
            margin: 1rem 0;
            padding: 1rem;
            background-color: $background-color;
            
            p:last-child {
                margin-bottom: 0;
            }
        }
        
        code {
            background-color: $background-color;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-family: $font-family-monospace;
            font-size: 0.9rem;
        }
        
        pre {
            background-color: #f6f8fa;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            margin: 1rem 0;
            
            code {
                background-color: transparent;
                padding: 0;
            }
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
            
            th, td {
                border: 1px solid $border-color;
                padding: 0.75rem;
                text-align: left;
            }
            
            th {
                background-color: $background-color;
                font-weight: bold;
            }
            
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
        }
        
        img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        a {
            color: $secondary-color;
            text-decoration: none;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
    
    .chapter-navigation {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid $border-color;
        
        .nav-links {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            
            @media (max-width: 768px) {
                flex-direction: column;
            }
        }
        
        .nav-link {
            background-color: $background-color;
            color: $text-color;
            padding: 1rem;
            border-radius: 4px;
            text-decoration: none;
            flex: 1;
            transition: background-color 0.3s ease;
            
            &:hover {
                background-color: $secondary-color;
                color: white;
            }
            
            &.prev {
                text-align: left;
            }
            
            &.next {
                text-align: right;
            }
        }
    }
}

// Footer
.site-footer {
    background-color: $primary-color;
    color: white;
    padding: 2rem 0;
    margin-top: 4rem;
    
    .footer-content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 2rem;
        
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            text-align: center;
        }
    }
    
    h3, h4 {
        margin-top: 0;
        color: white;
    }
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    li {
        margin-bottom: 0.5rem;
    }
    
    a {
        color: white;
        text-decoration: none;
        
        &:hover {
            color: $secondary-color;
        }
    }
}

// Responsive utilities
@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .nav-menu {
        display: none;
        
        &.active {
            display: flex;
        }
    }
}

// Print styles
@media print {
    .site-header,
    .chapter-navigation,
    .site-footer {
        display: none;
    }
    
    .main-content {
        margin: 0;
        padding: 0;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    
    pre {
        white-space: pre-wrap;
    }
}
```

---

## Part 2: 高度な機能実装

### C4. 検索機能の実装

#### C4-1. Jekyll検索プラグイン

**_plugins/search_generator.rb：**

```ruby
require 'json'

module Jekyll
  class SearchGenerator < Generator
    safe true
    priority :low

    def generate(site)
      search_data = []
      
      # 全ページを検索対象に追加
      site.pages.each do |page|
        next if page.data['exclude_from_search']
        
        search_data << {
          title: page.data['title'] || page.name,
          url: page.url,
          content: strip_html(page.content),
          excerpt: page.data['description'] || truncate(strip_html(page.content), 200),
          categories: page.data['categories'] || [],
          tags: page.data['tags'] || []
        }
      end
      
      # コレクションアイテムを追加
      site.collections.each do |name, collection|
        collection.docs.each do |doc|
          next if doc.data['exclude_from_search']
          
          search_data << {
            title: doc.data['title'],
            url: doc.url,
            content: strip_html(doc.content),
            excerpt: doc.data['description'] || truncate(strip_html(doc.content), 200),
            categories: doc.data['categories'] || [],
            tags: doc.data['tags'] || []
          }
        end
      end
      
      # 検索データファイルを生成
      File.open(File.join(site.dest, 'search.json'), 'w') do |file|
        file.write(JSON.pretty_generate(search_data))
      end
    end

    private

    def strip_html(content)
      content.gsub(/<[^>]*>/, '').gsub(/\s+/, ' ').strip
    end

    def truncate(text, length)
      return text if text.length <= length
      text[0...length] + '...'
    end
  end
end
```

#### C4-2. フロントエンド検索実装

**assets/js/search.js：**

```javascript
class DocumentSearch {
    constructor() {
        this.searchData = [];
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchOverlay = document.getElementById('search-overlay');
        
        this.init();
    }
    
    async init() {
        try {
            const response = await fetch('/search.json');
            this.searchData = await response.json();
            this.setupEventListeners();
        } catch (error) {
            console.error('検索データの読み込みに失敗しました:', error);
        }
    }
    
    setupEventListeners() {
        // 検索入力
        this.searchInput?.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        // ESCキーで検索を閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSearch();
            }
        });
        
        // オーバーレイクリックで閉じる
        this.searchOverlay?.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.closeSearch();
            }
        });
    }
    
    performSearch(query) {
        if (!query || query.length < 2) {
            this.clearResults();
            return;
        }
        
        const results = this.searchData.filter(item => {
            const searchableText = [
                item.title,
                item.content,
                item.excerpt,
                ...item.categories,
                ...item.tags
            ].join(' ').toLowerCase();
            
            return searchableText.includes(query.toLowerCase());
        }).slice(0, 10); // 最大10件
        
        this.displayResults(results, query);
    }
    
    displayResults(results, query) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>"${query}" に一致する結果が見つかりませんでした。</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <h3 class="search-result-title">
                    <a href="${result.url}">${this.highlightMatch(result.title, query)}</a>
                </h3>
                <p class="search-result-excerpt">
                    ${this.highlightMatch(result.excerpt, query)}
                </p>
                <div class="search-result-meta">
                    ${result.categories.map(cat => `<span class="category">${cat}</span>`).join('')}
                    ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        this.searchResults.innerHTML = resultsHTML;
    }
    
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    clearResults() {
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
        }
    }
    
    closeSearch() {
        this.searchInput.value = '';
        this.clearResults();
        this.searchOverlay?.classList.remove('active');
    }
}

// 検索機能を初期化
document.addEventListener('DOMContentLoaded', () => {
    new DocumentSearch();
});
```

### C5. SEO最適化

#### C5-1. 構造化データの実装

**_includes/structured-data.html：**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechnicalArticle",
  "headline": "{{ page.title | escape }}",
  "description": "{{ page.description | escape }}",
  "author": {
    "@type": "Organization",
    "name": "Vibe Writing Project"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ '/assets/images/logo.png' | absolute_url }}"
    }
  },
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "dateModified": "{{ page.last_modified_at | default: page.date | date_to_xmlschema }}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ page.url | absolute_url }}"
  },
  "image": "{{ page.image | default: '/assets/images/og-image.png' | absolute_url }}",
  "keywords": "{{ page.tags | join: ', ' }}"
}
</script>
```

#### C5-2. サイトマップの自動生成

**sitemap.xml（Jekyllプラグインにより自動生成）：**

```yaml
# _config.ymlに追加
plugins:
  - jekyll-sitemap

# 除外するページを指定
sitemap:
  exclude:
    - "/search/"
    - "/404.html"
```

### C6. パフォーマンス最適化

#### C6-1. 画像最適化

**_plugins/image_optimizer.rb：**

```ruby
require 'mini_magick'

module Jekyll
  class ImageOptimizer < Generator
    safe true
    priority :low

    def generate(site)
      image_dir = File.join(site.source, 'assets', 'images')
      optimized_dir = File.join(site.dest, 'assets', 'images')
      
      return unless Dir.exist?(image_dir)
      
      Dir.glob(File.join(image_dir, '**', '*')).each do |image_path|
        next unless File.file?(image_path)
        next unless image_path.match?(/\.(jpg|jpeg|png|gif)\z/i)
        
        relative_path = image_path.sub(image_dir + '/', '')
        output_path = File.join(optimized_dir, relative_path)
        
        # ディレクトリを作成
        FileUtils.mkdir_p(File.dirname(output_path))
        
        # 画像を最適化
        optimize_image(image_path, output_path)
        
        # WebP形式も生成
        generate_webp(image_path, output_path.sub(/\.[^.]+\z/, '.webp'))
      end
    end

    private

    def optimize_image(input_path, output_path)
      image = MiniMagick::Image.open(input_path)
      
      # リサイズ（最大幅1200px）
      image.resize '1200>' if image.width > 1200
      
      # 品質を設定
      image.quality 85
      
      # 書き出し
      image.write output_path
    end

    def generate_webp(input_path, output_path)
      image = MiniMagick::Image.open(input_path)
      image.format 'webp'
      image.quality 80
      image.write output_path
    end
  end
end
```

#### C6-2. CSS/JS最小化

**_plugins/minify_assets.rb：**

```ruby
require 'sassc'
require 'uglifier'

module Jekyll
  class MinifyAssets < Generator
    safe true
    priority :low

    def generate(site)
      # CSS最小化
      minify_css(site)
      
      # JavaScript最小化
      minify_js(site)
    end

    private

    def minify_css(site)
      css_files = Dir.glob(File.join(site.dest, 'assets', 'css', '*.css'))
      
      css_files.each do |css_file|
        content = File.read(css_file)
        minified = SassC::Engine.new(content, style: :compressed).render
        File.write(css_file, minified)
      end
    end

    def minify_js(site)
      js_files = Dir.glob(File.join(site.dest, 'assets', 'js', '*.js'))
      
      js_files.each do |js_file|
        content = File.read(js_file)
        minified = Uglifier.new.compile(content)
        File.write(js_file, minified)
      end
    end
  end
end
```

---

## Part 3: 自動化とCI/CD

### C7. GitHub Actions設定

#### C7-1. 自動デプロイワークフロー

**.github/workflows/pages.yml：**

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

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
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: |
          bundle install
          npm install
          
      - name: Build site
        run: |
          bundle exec jekyll build
          npm run build:production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./_site

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

#### C7-2. 品質チェックワークフロー

**.github/workflows/quality-check.yml：**

```yaml
name: Quality Check

on:
  pull_request:
    branches: ["main"]

jobs:
  markdown-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Markdown Lint
        uses: articulate/actions-markdownlint@v1
        with:
          config: .markdownlint.json
          files: '**/*.md'
          
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Link Check
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          config-file: '.markdown-link-check.json'
          
  spell-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Spell Check
        uses: streetsidesoftware/cspell-action@v2
        with:
          files: '**/*.md'
          config: '.cspell.json'
```

### C8. 継続的品質管理

#### C8-1. 設定ファイル

**.markdownlint.json：**

```json
{
  "default": true,
  "MD013": false,
  "MD033": {
    "allowed_elements": ["details", "summary", "br", "sub", "sup"]
  },
  "MD041": false
}
```

**.markdown-link-check.json：**

```json
{
  "ignorePatterns": [
    {
      "pattern": "^http://localhost"
    }
  ],
  "replacementPatterns": [
    {
      "pattern": "^/",
      "replacement": "https://your-site.github.io/"
    }
  ],
  "httpHeaders": [
    {
      "urls": ["https://github.com/"],
      "headers": {
        "User-Agent": "Mozilla/5.0"
      }
    }
  ]
}
```

**.cspell.json：**

```json
{
  "version": "0.2",
  "language": "en,ja",
  "words": [
    "Vibe",
    "Claude",
    "Sonnet",
    "GitHub",
    "Jekyll",
    "Markdown",
    "YAML",
    "プロンプト",
    "フレームワーク"
  ],
  "ignorePaths": [
    "_site/**",
    "node_modules/**",
    ".git/**"
  ]
}
```

---

## Part 4: カスタマイズと拡張

### C9. 高度なコンポーネント

#### C9-1. インタラクティブ目次

**_includes/toc.html：**

```html
<div class="table-of-contents">
    <h3>目次</h3>
    <nav class="toc-navigation">
        {% assign headings = content | split: '<h' %}
        {% for heading in headings %}
            {% if forloop.first %}
                {% continue %}
            {% endif %}
            {% assign heading_parts = heading | split: '>' %}
            {% assign level = heading_parts[0] | slice: 0, 1 %}
            {% assign heading_content = heading_parts[1] | split: '</h' | first %}
            {% assign anchor = heading_content | slugify %}
            
            <div class="toc-item toc-level-{{ level }}">
                <a href="#{{ anchor }}" class="toc-link" data-level="{{ level }}">
                    {{ heading_content }}
                </a>
            </div>
        {% endfor %}
    </nav>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 見出しにIDを追加
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
        }
    });
    
    // アクティブな見出しのハイライト
    const tocLinks = document.querySelectorAll('.toc-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = document.querySelector(`.toc-link[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                link?.classList.add('active');
            } else {
                link?.classList.remove('active');
            }
        });
    }, { rootMargin: '-20% 0px -80% 0px' });
    
    headings.forEach(heading => observer.observe(heading));
});
</script>
```

#### C9-2. コードブロック拡張

**_includes/code-block.html：**

```html
<div class="enhanced-code-block">
    <div class="code-header">
        <span class="language-label">{{ include.language }}</span>
        {% if include.filename %}
        <span class="filename">{{ include.filename }}</span>
        {% endif %}
        <button class="copy-button" data-clipboard-target="#code-{{ include.id }}">
            コピー
        </button>
    </div>
    <pre class="code-content"><code id="code-{{ include.id }}" class="language-{{ include.language }}">{{ include.code }}</code></pre>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new ClipboardJS('.copy-button').on('success', function(e) {
        const button = e.trigger;
        const originalText = button.textContent;
        button.textContent = 'コピーしました！';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
});
</script>
```

### C10. アナリティクスとモニタリング

#### C10-1. Google Analytics 4設定

**_includes/analytics.html：**

```html
{% if site.google_analytics %}
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', '{{ site.google_analytics }}', {
    // カスタムイベントの設定
    custom_map: {
      'custom_parameter_1': 'chapter_view',
      'custom_parameter_2': 'search_query'
    }
  });
  
  // カスタムイベントの実装
  document.addEventListener('DOMContentLoaded', function() {
    // ダウンロード追跡
    document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"]')
      .forEach(link => {
        link.addEventListener('click', function() {
          gtag('event', 'download', {
            'file_name': this.href.split('/').pop(),
            'file_extension': this.href.split('.').pop()
          });
        });
      });
    
    // 外部リンク追跡
    document.querySelectorAll('a[href^="http"]:not([href*="' + location.hostname + '"])')
      .forEach(link => {
        link.addEventListener('click', function() {
          gtag('event', 'click', {
            'event_category': 'outbound',
            'event_label': this.href,
            'transport_type': 'beacon'
          });
        });
      });
    
    // スクロール深度追跡
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        gtag('event', 'scroll', {
          'event_category': 'engagement',
          'event_label': scrollPercent + '%'
        });
      }
    });
  });
</script>
{% endif %}
```

#### C10-2. パフォーマンス監視

**assets/js/performance-monitor.js：**

```javascript
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        // Core Web Vitals測定
        this.measureWebVitals();
        
        // カスタムメトリクス測定
        this.measureCustomMetrics();
        
        // 結果を送信
        this.sendMetrics();
    }
    
    measureWebVitals() {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        // FID (First Input Delay)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-input') {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                }
            });
        }).observe({entryTypes: ['first-input']});
        
        // CLS (Cumulative Layout Shift)
        let cumulativeLayoutShift = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    cumulativeLayoutShift += entry.value;
                }
            });
            this.metrics.cls = cumulativeLayoutShift;
        }).observe({entryTypes: ['layout-shift']});
    }
    
    measureCustomMetrics() {
        // ページ読み込み時間
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        });
        
        // リソース読み込み時間
        const resourceObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (entry.initiatorType === 'img') {
                    this.metrics.imageLoadTime = entry.responseEnd - entry.startTime;
                }
            });
        });
        resourceObserver.observe({entryTypes: ['resource']});
    }
    
    sendMetrics() {
        window.addEventListener('beforeunload', () => {
            if (navigator.sendBeacon && this.metrics) {
                navigator.sendBeacon('/api/metrics', JSON.stringify({
                    url: location.href,
                    timestamp: Date.now(),
                    metrics: this.metrics,
                    userAgent: navigator.userAgent
                }));
            }
        });
    }
}

// パフォーマンス監視を開始
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceMonitor();
});
```

---

## Part 5: トラブルシューティングとメンテナンス

### C11. よくある問題と解決策

#### C11-1. ビルドエラー対応

**問題：Jekyllビルドが失敗する**

```bash
# 依存関係の確認
bundle install

# Jekyllバージョンの確認
bundle exec jekyll --version

# デバッグモードでビルド
bundle exec jekyll build --verbose --trace

# キャッシュクリア
bundle exec jekyll clean
rm -rf _site .sass-cache .jekyll-cache

# 再ビルド
bundle exec jekyll build
```

**問題：GitHub Pagesでの公開が失敗する**

```yaml
# _config.ymlの確認項目
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  # GitHub Pagesでサポートされているプラグインのみ使用

# 使用禁止プラグインの確認
# - jekyll-babel
# - jekyll-coffeescript
# カスタムプラグインは_pluginsディレクトリから削除
```

#### C11-2. パフォーマンス問題

**問題：サイトの読み込みが遅い**

```bash
# 画像最適化
npm install -g imagemin-cli
imagemin assets/images/*.{jpg,png} --out-dir=assets/images/optimized

# CSS/JS最小化の確認
# Sassの圧縮設定
sass:
  style: compressed

# 不要なファイルの除外
exclude:
  - node_modules/
  - .sass-cache/
  - .jekyll-cache/
  - gemfiles/
  - Gemfile
  - Gemfile.lock
  - vendor/
```

### C12. 定期メンテナンス

#### C12-1. 月次メンテナンス項目

```bash
# 1. 依存関係の更新
bundle update

# 2. セキュリティ監査
bundle audit

# 3. リンクチェック
bundle exec htmlproofer ./_site --check-html --check-opengraph

# 4. サイトマップの確認
curl -s "https://your-site.github.io/sitemap.xml" | xmllint --format -

# 5. パフォーマンステスト
npm install -g lighthouse
lighthouse https://your-site.github.io --output=html --output-path=./lighthouse-report.html
```

#### C12-2. 年次レビュー項目

- Jekyll・テーマの最新バージョンへの更新
- SEO設定の見直し・最適化
- アナリティクスデータの分析・改善計画策定
- セキュリティ設定の確認・強化
- バックアップ・復旧手順の検証

---

## まとめ：プロフェッショナルな文書サイトの構築

**このAppendix Cを活用することで：**

1. **技術的基盤の確立**：堅牢で拡張性のあるGitHub Pagesサイト構築
2. **SEO最適化**：検索エンジンでの発見性向上と適切な構造化データ実装
3. **パフォーマンス最適化**：高速で快適なユーザー体験の提供
4. **自動化の実現**：CI/CDパイプラインによる効率的な運用体制構築
5. **継続的改善**：データドリブンな最適化と品質管理

**成功のポイント：**

- **段階的実装**：基本機能から始めて徐々に高度な機能を追加
- **ユーザー中心設計**：読者の利便性を最優先に考慮した設計
- **運用性重視**：長期的な保守・更新を考慮したアーキテクチャ
- **品質管理**：自動化されたテストと継続的な監視体制

Vibe Writingで作成した高品質な文書を、この技術基盤により多くの人々に効果的に届けることができます。

---

**関連リンク：**
- [第5章：GitHub Pagesとの連携方法](chapter-05-github-pages-integration.md)
- [Appendix D: セキュリティ・コンプライアンス対応ガイド](appendix-d-security-compliance.md)
- [Appendix E: 自動化スクリプト集](appendix-e-automation-scripts.md)
- [目次に戻る](table-of-contents.md)