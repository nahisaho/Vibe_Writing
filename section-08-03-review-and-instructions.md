---
title: "8.3 Step 3-4：人間レビューと詳細指示作成の実例"
description: "実際のプロジェクトでのVibe Writing Step 3-4の詳細実践過程"
categories: [vibe-writing, practical-example, implementation]
tags: [human-review, detailed-instructions, step-by-step, quality-assurance]
---

# 8.3 Step 3-4：人間レビューと詳細指示作成の実例

## Step 3：人間による戦略的レビューと調整

### レビュー会議の開催：2024年10月3日午後2時

**参加者全員による構成レビュー：**

**田中部長：** 「Claude Sonnetとの協働で作成された構成案を確認しました。全体的に非常によく整理されていますが、経営層の観点から幾つか重要な調整点があります。」

### 経営層の視点からの重要な調整要求

**田中部長の指摘：**

**投資対効果の詳細強化：**
「Executive Summaryの投資対効果分析では、具体的な数値目標が必要です。監査対応だけでなく、新規案件獲得への影響も定量化したいと思います。」

**競合優位性の明確化：**
「同業他社との比較で、どの程度のセキュリティレベル優位を実現できるかを明示したいです。営業活動での差別化要因として活用できるように。」

**山田係長がClaude Sonnetに調整を依頼：**

**山田：** 「田中部長からの重要なフィードバックを反映して、Executive Summaryを調整してください。特に以下の点を強化お願いします：

1. **定量的投資対効果分析**
   - 監査対応による直接コスト削減
   - 新規案件獲得への影響予測
   - セキュリティインシデント削減効果

2. **競合優位性の具体化**
   - 同業他社のセキュリティレベル比較
   - 顧客への訴求ポイント
   - 営業資料での活用可能性

これらを含む改良版Executive Summaryの構成を提案してください。」

### Claude Sonnetによる戦略的調整

**Claude Sonnet：** 「田中部長のご指摘を反映した、より戦略的なExecutive Summaryを提案します：

## 強化版Executive Summary（7ページに拡張）

**1. プロジェクト概要と競争環境分析**（1ページ）
   - 監査指摘事項の緊急性
   - 業界セキュリティ動向と競合状況
   - A社の現在位置と目標レベル

**2. 包括的投資対効果分析**（2ページ）
   - **直接効果**
     - 監査対応コスト削減：年間500万円
     - セキュリティインシデント予防：潜在損失2,000万円の回避
     - 運用効率化：年間300万円のコスト削減
   - **戦略的効果**
     - 新規案件獲得率向上：20%増（年間売上3,000万円増）
     - 顧客継続率向上：5%増（年間1,000万円増）
     - 保険料率優遇：年間200万円削減

**3. 競合優位性と市場ポジショニング**（1.5ページ）
   - **同業他社比較**
     - セキュリティ成熟度：業界平均65→A社目標85
     - 認証取得状況：ISO27001完全準拠達成
     - 顧客データ保護レベル：金融機関並みのセキュリティ実現
   - **営業活動での差別化要因**
     - 「金融機関レベルのセキュリティ」での差別化
     - セキュリティ監査レポートの営業資料活用
     - 顧客への安心感提供による受注率向上

**4. 技術的対策と業務価値**（1ページ）
   - 4つの主要対策の技術的・ビジネス的価値
   - 各対策の投資対効果個別分析

**5. 実装工程と組織体制**（1ページ）
   - 60日間の詳細工程とマイルストーン
   - 部門別責任分担と経営層の関与ポイント

**6. 成功指標と継続的価値創出**（0.5ページ）
   - 短期・中期・長期の測定可能な成功指標
   - 継続的な競争優位性維持戦略」

### 技術専門家による詳細検証

**佐藤主任による技術的検証：**

**セキュリティ設定の実現可能性確認：**

**佐藤主任：** 「Claude Sonnetの構成案について、技術的実現可能性を検証しました。以下の重要な調整が必要です。

**条件付きアクセス設定の詳細化：**
- 現在のライセンス（E3）での制限事項の明記
- 段階的実装アプローチの具体化
- ユーザー影響の最小化戦略

**DLP設定の組織適応：**
- A社の業務フローに合わせたポリシー設計
- 顧客データの分類体系の整備
- 例外処理手順の明文化

**MFA実装の現実的アプローチ：**
- ユーザーの技術レベルを考慮した段階的展開
- サポート体制の具体的な構築方法
- 業務継続性を確保する緊急時手順」

**山田係長：** 「佐藤主任のご指摘を反映して、Technical Moduleの詳細を調整しましょう。Claude Sonnetに具体的な改善を依頼します。」

### 業務分析専門家による実用性確認

**鈴木主任による業務適合性分析：**

**鈴木主任：** 「組織の実際の業務フローとの適合性を検証しました。以下の点で現実的な調整が必要です。

**ユーザー教育の現実的アプローチ：**
- 330名の職員を60日で教育する現実的計画
- 部署別・役職別の差別化された教育内容
- 業務への影響を最小化する教育スケジュール

**変更管理の段階的実施：**
- 一斉変更ではなく部署別段階導入
- 各段階でのフィードバック収集と調整
- 抵抗感の最小化と受容促進策

**運用定着化の具体的方策：**
- 日常業務への自然な統合方法
- 継続的なサポートとフォローアップ体制
- 成功事例の共有と横展開戦略」

### 調整版構成の最終確認

**会議室での最終構成確認：**

**山田係長：** 「皆さんのフィードバックを統合して、Claude Sonnetに最終調整版の構成を作成してもらいました。確認をお願いします。」

**確定された最終構成：**

```
A社Microsoft 365セキュリティ強化ガイドライン
総ページ数：145ページ

Core Documentation（共通基盤 - 22ページ）
├─ Executive Summary（7ページ・経営層重視）
├─ Security Overview（10ページ・全体理解）
└─ Implementation Roadmap（5ページ・実行計画）

Reader-Specific Modules（読者特化 - 100ページ）
├─ Executive Module（経営層向け・18ページ）
│  ├─ 戦略的価値とROI詳細分析
│  ├─ 競合優位性と市場ポジショニング  
│  └─ ステークホルダー説明資料
├─ Technical Module（IT管理者向け・65ページ）
│  ├─ 条件付きアクセス実装（22ページ）
│  ├─ データ損失防止設定（22ページ）
│  ├─ 多要素認証展開（12ページ）
│  └─ インシデント対応体制（9ページ）
├─ User Module（一般職員向け・22ページ）
│  ├─ セキュリティの重要性理解（5ページ）
│  ├─ 日常業務での注意点（10ページ）
│  └─ 困った時の対応方法（7ページ）
└─ Audit Module（監査向け・15ページ）
   ├─ コンプライアンス証跡（8ページ）
   └─ 継続的監視体制（7ページ）

Supporting Resources（サポート - 23ページ）
├─ Quick Reference Cards（各読者向け・8ページ）
├─ FAQ Collection（10ページ）
└─ Templates & Checklists（5ページ）
```

**田中部長：** 「この構成であれば、経営層への説明も十分可能です。特に競合優位性の部分は営業活動でも活用できそうです。」

**佐藤主任：** 「技術的な詳細も現実的なレベルに調整されています。実際の設定作業で使える内容になっています。」

**鈴木主任：** 「業務への影響も適切に考慮されており、現場での受容性も高そうです。」

## Step 4：Claude Codeへの詳細指示作成

### 詳細指示作成の戦略的アプローチ

**山田係長：** 「確定した構成に基づいて、Claude Codeへの詳細な作成指示を準備しましょう。各モジュールごとに、具体的で実行可能な指示を作成します。」

### Core Documentation作成指示

**Executive Summary作成指示：**

**山田がClaude Codeに送信する指示：**

```
### あなたの役割
- セキュリティの専門家
- テクニカルライター

### ゴール
以下の条件をもとに、A社Microsoft 365セキュリティ強化プロジェクトのExecutive Summaryを含む技術文書を作成する。

### 条件
A社Microsoft 365セキュリティ強化プロジェクト
Executive Summary作成指示

【基本情報】
- 対象読者：経営層（CTO、管理本部長、取締役）
- 文書目的：プロジェクトの承認・支援獲得、ステークホルダー説明
- 要求品質：簡潔性、説得力、数値根拠の明確性

【確定済みVibe設定】
「A社の全職員が、セキュリティ強化を負担ではなく価値として受け入れ、
それぞれの役割と専門性に応じて適切にセキュリティ対策を実践し、
組織全体のセキュリティレベル向上と事業価値創出を両立できるようになる、
実用的で持続可能なセキュリティガイドライン」

【詳細作成要求】

1. プロジェクト概要と競争環境分析（1ページ）
   - 外部監査指摘事項の重要性（具体的リスク額を含む）
   - IT業界のセキュリティ動向（最新統計データ使用）
   - A社の現在位置（セキュリティ成熟度65/100）と目標（85/100）
   - 対応しない場合の具体的リスク（顧客離反、新規案件機会損失）

2. 包括的投資対効果分析（2ページ）
   【投資額】
   - システム設定・調整：300万円
   - 教育・研修：200万円
   - 外部コンサル：500万円
   - 内部工数（400時間×5,000円）：200万円
   - 総投資額：1,200万円
   
   【年間効果（定量化）】
   - 監査対応コスト削減：500万円
   - セキュリティインシデント回避：2,000万円
   - 運用効率化：300万円
   - 新規案件獲得増（20%増）：3,000万円
   - 顧客継続率向上（5%増）：1,000万円
   - 年間総効果：6,800万円
   
   【ROI計算】
   - 1年目ROI：(6,800-1,200)/1,200 = 467%
   - 3年間累積ROI：1,500%

3. 競合優位性と市場ポジショニング（1.5ページ）
   【同業他社比較】
   - セキュリティ成熟度：業界平均65 vs A社目標85
   - 認証状況：A社はISO27001完全準拠（業界30%のみ）
   - 顧客データ保護：金融機関レベル（業界最高水準）
   
   【営業活動での活用】
   - 差別化メッセージ：「金融機関レベルのセキュリティ」
   - 顧客への安心感：具体的な監査結果提示
   - 新規案件での優位性：セキュリティ要求の高い案件獲得

4. 技術的対策と業務価値（1ページ）
   - 条件付きアクセス：不正アクセス99%削減
   - データ損失防止：情報漏洩リスク95%削減
   - 多要素認証：アカウント乗っ取り99.9%削減
   - インシデント対応：対応時間70%短縮

5. 実装工程と組織体制（1ページ）
   【60日間詳細工程】
   - Week 1-2：基盤設定（技術チーム主導）
   - Week 3-6：段階的展開（部署別実装）
   - Week 7-8：教育・研修（全社展開）
   - Week 9：最終検証・監査対応
   
   【組織体制】
   - プロジェクトスポンサー：CTO
   - 実行責任者：田中部長
   - 技術リーダー：佐藤主任
   - 各部門代表者による推進体制

6. 成功指標と継続的価値創出（0.5ページ）
   【短期指標（3ヶ月）】
   - セキュリティスコア：65→85達成
   - 職員理解度：90%以上
   - 監査評価：「優秀」レベル達成
   
   【中期指標（1年）】
   - セキュリティインシデント：ゼロ件達成
   - 新規案件獲得：20%増達成
   - 顧客満足度：セキュリティ面で95%以上

【作成時の注意事項】
- 各数値には明確な根拠と計算過程を示す
- 経営層が理解しやすい表現を使用
- 図表を効果的に活用（投資対効果グラフ、競合比較表など）
- ステークホルダー別の期待効果を明示
- リスク要因と対策も簡潔に記載
```

### Technical Module作成指示

**条件付きアクセス設定手順の詳細指示：**

```
### あなたの役割
- セキュリティの専門家
- テクニカルライター

### ゴール
以下の条件をもとに、条件付きアクセス設定詳細手順を作成する。

### 条件
Technical Module - 条件付きアクセス設定詳細手順
作成指示（22ページ）

【対象読者】
- IT管理者（Microsoft 365管理経験有り）
- セキュリティ担当者
- 技術的詳細を理解し、実際の設定作業を実施する担当者

【確定済み技術要件】
- Microsoft 365 E3ライセンス環境
- Azure AD Premium P1機能活用
- A社の3拠点（東京、関西、福岡）での運用
- ハイブリッドワーク環境（在宅50%）対応

【詳細作成要求】

Section A1: 設計思想と要件定義（3ページ）
1.1 条件付きアクセスの基本概念
   - ゼロトラストセキュリティモデルの実装
   - A社の脅威モデル分析
   - リスクベースアクセス制御の価値

1.2 A社固有の要件と制約
   - 業務継続性の確保（緊急時アクセス）
   - 顧客先でのアクセス要求
   - 拠点間アクセスの最適化
   - レガシーアプリケーションとの互換性

1.3 実装方針と段階的展開計画
   - フェーズ1：管理者アカウント（Week 1）
   - フェーズ2：一般職員（Week 2-4）
   - フェーズ3：外部アクセス（Week 5-6）
   - 各フェーズでのリスク評価と対策

Section A2: 基本設定手順（8ページ）
2.1 事前準備と環境確認
   - ライセンス要件の確認手順
   - 既存設定の現状分析方法
   - バックアップとロールバック準備

2.2 基本ポリシー設定（ステップバイステップ）
   【ポリシー1：管理者アカウント保護】
   - 対象：Global Admin、Security Admin
   - 条件：全てのクラウドアプリ、全ての場所
   - 制御：MFA必須、準拠デバイス必須
   - 設定画面のスクリーンショット付き詳細手順

   【ポリシー2：一般ユーザー保護】
   - 対象：全ユーザー（管理者除く）
   - 条件：Office 365アプリ、信頼できない場所
   - 制御：MFA必須、セッション制御
   - 段階的展開手順（部署別ロールアウト）

2.3 地理的制限の設定
   - 日本国内からのアクセス許可
   - 海外出張時の例外処理手順
   - 顧客先アクセスの管理方法

Section A3: 高度な設定オプション（5ページ）
3.1 リスクベースアクセス制御
   - Identity Protection連携設定
   - サインインリスクとユーザーリスクの活用
   - 自動化されたリスク対応設定

3.2 デバイス制御の実装
   - 準拠デバイスの定義と管理
   - モバイルデバイス管理（MDM）連携
   - 私物デバイス（BYOD）の安全な管理

3.3 アプリケーション別制御
   - 機密性レベル別アクセス制御
   - レガシーアプリケーションの保護
   - サードパーティアプリの統合

Section A4: トラブルシューティング（4ページ）
4.1 よくある問題と解決方法
   - ユーザーがアクセスできない場合
   - MFA設定の問題
   - デバイス準拠性の問題
   - 地理的制限の誤動作

4.2 ログ分析とモニタリング
   - Azure AD サインインログの確認方法
   - 条件付きアクセス レポートの読み方
   - 異常なアクセスパターンの検出

4.3 緊急時対応手順
   - 緊急アクセス用Break Glassアカウント
   - ポリシー無効化の手順
   - インシデント時のエスカレーション

4.4 継続的改善
   - 定期的なポリシー見直し
   - ユーザーフィードバックの収集と反映
   - セキュリティ動向に応じた調整

【作成時の注意事項】
- 全ての手順にスクリーンショットを含める
- A社の実際の環境設定値を具体的に記載
- エラーメッセージと対処法を網羅
- 各設定変更の業務への影響を明記
- 設定前後の確認手順を詳細化
- 専門用語には分かりやすい説明を付加
```

### User Module作成指示

**一般職員向けガイド作成指示：**

```
### あなたの役割
- セキュリティの専門家
- テクニカルライター
- 優秀なITトレーナー

### ゴール
以下の条件をもとに、条件付きアクセス設定詳細手順を作成する。

### 条件
User Module - 一般職員向けセキュリティガイド
作成指示（22ページ）

【対象読者】
- A社全職員（330名）
- ITリテラシーレベル：初級〜中級
- セキュリティ専門知識：なし〜基礎レベル

【基本方針】
- 不安解消を最優先
- 業務への影響最小化
- 実践的で即座に使える内容
- 視覚的で理解しやすい構成

【詳細作成要求】

Section U1: セキュリティの重要性理解（5ページ）
1.1 なぜセキュリティ強化が必要なのか
   - 身近な事例での説明（他社での実際の事故例）
   - A社が狙われる理由（顧客の機密情報保護責任）
   - 一人一人の行動が会社全体に与える影響

1.2 セキュリティ強化による職員のメリット
   - 安心して仕事ができる環境
   - 顧客からの信頼向上
   - 会社の成長による職場環境改善
   - 個人のスキルアップ機会

1.3 新しいセキュリティ対策の概要
   - 4つの主要対策の職員視点での説明
   - 「面倒になる」のではなく「安全になる」視点
   - 段階的導入による負担軽減

Section U2: 日常業務での注意点（10ページ）
2.1 多要素認証（MFA）の使い方
   - MFAとは何か（銀行のワンタイムパスワードとの比較）
   - スマートフォンアプリの設定方法（画面付き）
   - 毎日のログイン手順（ステップバイステップ）
   - よくある質問と答え

2.2 安全なファイル共有
   - 社内での安全な共有方法
   - 顧客とのファイル共有時の注意点
   - 個人のクラウドサービス使用の制限理由
   - 正しい共有手順の実例

2.3 メール・コミュニケーションセキュリティ
   - 怪しいメールの見分け方
   - 添付ファイルの安全な取り扱い
   - 社外とのやり取りでの注意点
   - フィッシング詐欺の実例と対策

2.4 在宅勤務・外出先でのセキュリティ
   - 自宅Wi-Fiでの安全な接続
   - カフェ・コワーキングスペースでの注意点
   - 画面の覗き見防止
   - 紛失・盗難時の対応

Section U3: 困った時の対応方法（7ページ）
3.1 よくあるトラブルと解決方法
   【パターン1：ログインできない】
   - MFAアプリが動かない
   - パスワードを忘れた
   - 会社支給デバイス以外からアクセスしたい

   【パターン2：ファイルにアクセスできない】
   - 共有ファイルが開けない
   - 顧客にファイルを送れない
   - 外部サービスが使えない

   【パターン3：セキュリティ警告が表示される】
   - 怪しいメールの警告
   - 不正なアクセス試行の通知
   - デバイス準拠性の警告

3.2 サポート体制と連絡先
   - IT部門への連絡方法（緊急度別）
   - 自己解決のためのFAQサイト
   - 緊急時の対応手順

3.3 セキュリティインシデント時の対応
   - 「何かおかしい」と感じた時の行動
   - 被害を最小化するための初期対応
   - 報告すべき内容と方法
   - 責任追及ではなく早期対応の重要性

【作成時の注意事項】
- 専門用語を避け、日常的な言葉で説明
- 不安を煽るのではなく、安心感を与える表現
- 実際の画面と操作手順を豊富に掲載
- 「なぜそうするのか」の理由も併記
- 失敗しても大丈夫という安心感の提供
- 段階的学習ができる構成
```

### 作成指示の品質保証

**山田係長：** 「これらの詳細指示により、Claude Codeは一貫性があり、実用的な文書を作成できるはずです。各指示には以下の要素を含めました。

**品質保証要素：**
1. **明確な対象読者の定義**
2. **具体的な技術要件・制約の明示**
3. **実際の業務シーンでの使用方法**
4. **段階的な実装・学習アプローチ**
5. **トラブルシューティングの網羅**

**一貫性確保要素：**
1. **共通のVibe設定の全指示への適用**
2. **用語集の統一**
3. **文書間の相互参照関係**
4. **A社固有情報の一貫した反映**

次のステップでは、これらの指示に基づいてClaude Codeに実際の文書作成を依頼し、高品質な成果物を短時間で完成させることができます。」

**従来手法との比較（Step 3-4完了時点）：**
- 戦略的レビュー時間：従来12時間 → Vibe Writing 4時間
- 詳細指示作成：従来8時間 → Vibe Writing 2時間
- 関係者の合意形成：従来3日 → Vibe Writing 1日
- 指示の明確性：従来の曖昧な依頼 → 具体的で実行可能な指示

Step 3-4により、人間の専門知識と戦略的判断を活かしながら、AIへの効果的な作業指示を準備できました。この基盤により、Step 5-6での高品質・高速な文書生成が実現可能になります。

---

**関連リンク：**
- [8.2 Step 1-2：意図明確化と構成設計の実例](section-08-02-intent-and-structure.md)
- [8.4 Step 5-6：効率性分析と組織への波及効果](section-08-04-efficiency-analysis.md)
- [目次に戻る](table-of-contents.md)