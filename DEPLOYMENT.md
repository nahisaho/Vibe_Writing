# GitHub Pages デプロイメントガイド

このドキュメントは、Vibe WritingをGitHub Pagesにデプロイするための完全ガイドです。

## 📋 前提条件

- GitHubアカウント
- Gitの基本的な知識
- リポジトリの管理権限

## 🚀 デプロイメント手順

### 1. リポジトリの作成

1. GitHubで新しいリポジトリを作成
2. リポジトリ名は `vibe-writing` または任意の名前
3. パブリックリポジトリとして作成（GitHub Pages無料利用のため）

### 2. ローカルファイルをアップロード

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/vibe-writing.git
cd vibe-writing

# ファイルをコピー（現在のディレクトリの内容をすべて）
# このディレクトリの全ファイルをリポジトリにコピー

# 変更をコミット
git add .
git commit -m "Initial commit: Add Vibe Writing documentation"
git push origin main
```

### 3. GitHub Pages設定

1. GitHubリポジトリページにアクセス
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** で "Deploy from a branch" を選択
5. **Branch** で `main` ブランチを選択
6. **Folder** で `/ (root)` を選択
7. **Save** をクリック

### 4. GitHub Actions設定（自動デプロイ）

GitHub Actions ワークフローが既に設定されているため、以下の手順で有効化：

1. リポジトリの **Settings** > **Pages**
2. **Source** で "GitHub Actions" を選択
3. 提案される Jekyll ワークフローを確認
4. カスタムワークフロー（`.github/workflows/pages.yml`）が適用される

### 5. デプロイ確認

- デプロイには通常2-5分かかります
- **Actions** タブでビルド状況を確認
- 完了後、`https://yourusername.github.io/repository-name/` でアクセス可能

## 📁 必要なファイル構造

以下のファイルが正しく配置されていることを確認：

```
repository/
├── _config.yml           # Jekyll設定
├── _layouts/
│   └── default.html      # デフォルトレイアウト
├── _includes/
│   └── license-footer.html # ライセンス表示
├── assets/
│   ├── css/
│   │   └── style.css     # スタイルシート
│   └── js/
│       └── main.js       # JavaScript
├── .github/
│   └── workflows/
│       └── pages.yml     # 自動デプロイ設定
├── index.md              # トップページ
├── Gemfile               # Ruby依存関係
├── LICENSE.md            # ライセンス情報
├── README.md             # プロジェクト説明
└── *.md                  # その他のMarkdownファイル
```

## ⚙️ カスタマイズ

### サイト情報の更新

`_config.yml` を編集：

```yaml
title: "Your Site Title"
description: "Your site description"
url: "https://yourusername.github.io"
baseurl: "/repository-name"  # リポジトリ名が異なる場合
```

### カスタムドメインの設定

1. ドメインを所有している場合
2. リポジトリに `CNAME` ファイルを作成
3. ファイル内容：`your-domain.com`
4. DNS設定でCNAMEレコードを設定

## 🔧 トラブルシューティング

### よくある問題

1. **ビルドエラー**
   - `_config.yml` の文法を確認
   - Gemfile の依存関係を確認
   - Actions タブでエラーログを確認

2. **ページが表示されない**
   - Settings > Pages でURLを確認
   - ブラウザキャッシュをクリア
   - HTTPSでアクセスを試行

3. **スタイルが適用されない**
   - `_config.yml` の `baseurl` 設定を確認
   - CSS ファイルのパスを確認

### ログの確認方法

1. リポジトリの **Actions** タブにアクセス
2. 最新のワークフロー実行をクリック
3. 失敗したジョブのログを確認
4. エラーメッセージに基づいて修正

## 🔄 更新方法

### 文書の更新

1. ローカルでMarkdownファイルを編集
2. 変更をコミット・プッシュ
3. GitHub Actionsが自動的にサイトを更新

```bash
# ファイル編集後
git add .
git commit -m "Update: 文書の内容を更新"
git push origin main
```

### 大規模な変更

1. 新しいブランチを作成
2. 変更を実装・テスト
3. プルリクエストを作成
4. レビュー後にマージ

## 📊 アクセス解析

### Google Analytics の設定

1. Google Analytics でプロパティを作成
2. `_config.yml` に追加：

```yaml
google_analytics: "G-XXXXXXXXXX"
```

### GitHub Pages統計

- リポジトリの **Insights** > **Traffic** で基本統計を確認
- より詳細な分析にはGoogle Analyticsを推奨

## 🔒 セキュリティ

- シークレット情報を `.gitignore` に追加
- 環境変数は GitHub Secrets を使用
- 定期的な依存関係の更新

## 📞 サポート

問題が発生した場合：

1. このガイドのトラブルシューティングを確認
2. GitHub Pages の公式ドキュメントを参照
3. リポジトリの Issues で質問を投稿

---

## ライセンス

このドキュメントは、[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja) ライセンスの下で公開されています。