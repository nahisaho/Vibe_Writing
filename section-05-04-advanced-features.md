---
title: "5.4 高度な機能実装"
description: "GitHub Pages環境でのVibe Writing文書に高度な機能を実装する方法"
categories: [vibe-writing, github-pages, advanced-features]
tags: [advanced-implementation, interactive-features, automation, user-experience]
---

# 5.4 高度な機能実装

## 高度機能実装の戦略的価値

基本的なVibe Writing + GitHub Pages統合を発展させ、読者体験を大幅に向上させる高度機能を実装することで、単なる静的文書から、インタラクティブで価値の高い知識プラットフォームへと進化させることができます。

### 実装する高度機能の概要

**ユーザー体験向上機能：**
- インタラクティブな学習体験
- パーソナライズされたコンテンツ表示
- 進捗追跡システム
- 動的コンテンツ更新

**運用効率化機能：**
- 自動コンテンツ生成
- 智能的な関連記事推薦
- 自動翻訳システム
- パフォーマンス最適化

## 機能1：インタラクティブチュートリアルシステム

### 実装手順：進捗追跡機能の構築

**開発者向け実装ガイド：**

まず、進捗追跡機能の基本コンポーネントを作成します：

```bash
# 1. 必要なディレクトリ構造を作成
mkdir -p _includes assets/js assets/css

# 2. 進捗追跡用のCSSファイル作成
cat > assets/css/learning-progress.css << 'EOF'
.learning-progress {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.step {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

.step:last-child {
  border-bottom: none;
}

.step-checkbox {
  margin-right: 10px;
}

.step-number {
  background: #6c757d;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 10px;
}

.step input:checked + label .step-number {
  background: #28a745;
}

.validate-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.validate-btn:hover {
  background: #0056b3;
}
EOF

# 3. 進捗追跡用のHTMLコンポーネント作成
cat > _includes/learning-progress.html << 'EOF'
<div class="learning-progress" data-tutorial="{{ page.tutorial_id }}">
  <div class="progress-header">
    <h4>📈 学習進捗</h4>
    <span class="progress-percentage">0%</span>
  </div>
  
  <div class="progress-bar">
    <div class="progress-fill" style="width: 0%"></div>
  </div>
  
  <div class="learning-steps">
    {% for step in page.learning_steps %}
    <div class="step" data-step="{{ forloop.index }}">
      <input type="checkbox" id="step-{{ forloop.index }}" class="step-checkbox">
      <label for="step-{{ forloop.index }}">
        <span class="step-number">{{ forloop.index }}</span>
        <span class="step-title">{{ step.title }}</span>
      </label>
      
      {% if step.validation %}
      <div class="step-validation" data-validation="{{ step.validation }}">
        <button class="validate-btn">✓ 理解度チェック</button>
      </div>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</div>

<!-- CSSとJavaScriptの読み込み -->
<link rel="stylesheet" href="{{ '/assets/css/learning-progress.css' | relative_url }}">
<script src="{{ '/assets/js/learning-progress.js' | relative_url }}"></script>
EOF
```

**使用方法：**

文書のFront Matterに以下を追加することで進捗追跡機能を有効化できます：

```yaml
---
layout: technical-guide
title: "Microsoft 365設定ガイド"
tutorial_id: "m365-setup"
learning_steps:
  - title: "前提条件の確認"
    validation: "前提条件の理解"
  - title: "アカウント設定"
    validation: "アカウント設定の完了"
  - title: "セキュリティ設定"
    validation: "セキュリティ設定の理解"
  - title: "動作確認"
    validation: "動作確認の実施"
---

# Microsoft 365設定ガイド

{% raw %}{% include learning-progress.html %}{% endraw %}

## はじめに
[ガイドの内容]
```

<script>
class LearningProgressTracker {
  constructor(tutorialId) {
    this.tutorialId = tutorialId;
    this.progress = this.loadProgress();
    this.initializeEventListeners();
    this.updateDisplay();
  }
  
  loadProgress() {
    const saved = localStorage.getItem(`tutorial_${this.tutorialId}`);
    return saved ? JSON.parse(saved) : { completedSteps: [], percentage: 0 };
  }
  
  saveProgress() {
    localStorage.setItem(`tutorial_${this.tutorialId}`, JSON.stringify(this.progress));
  }
  
  initializeEventListeners() {
    document.querySelectorAll('.step-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const stepNumber = parseInt(e.target.dataset.step || e.target.id.split('-')[1]);
        this.toggleStep(stepNumber, e.target.checked);
      });
    });
    
    document.querySelectorAll('.validate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.validateStep(e.target.closest('.step'));
      });
    });
  }
  
  toggleStep(stepNumber, completed) {
    if (completed && !this.progress.completedSteps.includes(stepNumber)) {
      this.progress.completedSteps.push(stepNumber);
    } else if (!completed) {
      this.progress.completedSteps = this.progress.completedSteps.filter(s => s !== stepNumber);
    }
    
    this.calculatePercentage();
    this.updateDisplay();
    this.saveProgress();
  }
  
  calculatePercentage() {
    const totalSteps = document.querySelectorAll('.step').length;
    this.progress.percentage = Math.round((this.progress.completedSteps.length / totalSteps) * 100);
  }
  
  updateDisplay() {
    document.querySelector('.progress-percentage').textContent = `${this.progress.percentage}%`;
    document.querySelector('.progress-fill').style.width = `${this.progress.percentage}%`;
    
    // 完了ステップの表示更新
    this.progress.completedSteps.forEach(stepNumber => {
      const checkbox = document.querySelector(`#step-${stepNumber}`);
      if (checkbox) checkbox.checked = true;
    });
  }
  
  async validateStep(stepElement) {
    const validation = stepElement.querySelector('.step-validation').dataset.validation;
    
    // AI による理解度チェック実装
    const userInput = prompt("このステップで学んだ内容を自分の言葉で説明してください：");
    if (!userInput) return;
    
    const validationResult = await this.validateWithAI(validation, userInput);
    this.showValidationResult(stepElement, validationResult);
  }
  
  async validateWithAI(expectedConcept, userExplanation) {
    // Claude API を使用した理解度評価
    try {
      const response = await fetch('/api/validate-understanding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: expectedConcept,
          explanation: userExplanation
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Validation error:', error);
      return { score: 0, feedback: "評価中にエラーが発生しました。" };
    }
  }
  
  showValidationResult(stepElement, result) {
    const resultDiv = document.createElement('div');
    resultDiv.className = `validation-result ${result.score >= 70 ? 'success' : 'needs-improvement'}`;
    resultDiv.innerHTML = `
      <p><strong>理解度: ${result.score}%</strong></p>
      <p>${result.feedback}</p>
      ${result.score >= 70 ? '<p>✅ 次のステップに進みましょう！</p>' : '<p>💡 もう一度内容を確認してみてください。</p>'}
    `;
    
    const existingResult = stepElement.querySelector('.validation-result');
    if (existingResult) existingResult.remove();
    
    stepElement.appendChild(resultDiv);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  const tutorialElement = document.querySelector('[data-tutorial]');
  if (tutorialElement) {
    new LearningProgressTracker(tutorialElement.dataset.tutorial);
  }
});
</script>
```

### 実装手順：コード実行環境の構築

**簡単なクライアントサイド実行環境：**

開発者が即座に実装できる基本的なコード実行機能を提供します：

```bash
# 1. コード実行機能用のファイル作成
cat > _includes/code-executor.html << 'EOF'
<div class="code-executor" data-language="{{ include.language | default: 'javascript' }}">
  <div class="executor-header">
    <h4>💻 実践してみよう</h4>
    <div class="language-badge">{{ include.language | default: 'JavaScript' }}</div>
  </div>
  
  <div class="code-workspace">
    <div class="code-input">
      <textarea class="code-editor" placeholder="ここにコードを入力してください...">{{ include.initial_code }}</textarea>
    </div>
    
    <div class="execution-controls">
      <button class="run-code-btn">▶️ 実行</button>
      <button class="reset-code-btn">🔄 リセット</button>
      {% if include.hints %}
      <button class="hint-btn">💡 ヒント</button>
      {% endif %}
    </div>
    
    <div class="code-output">
      <div class="output-header">実行結果:</div>
      <pre class="output-content"></pre>
    </div>
  </div>
  
  {% if include.expected_output %}
  <div class="expected-output" style="display: none;">{{ include.expected_output }}</div>
  {% endif %}
  
  {% if include.hints %}
  <div class="hints" style="display: none;">{{ include.hints }}</div>
  {% endif %}
</div>

<style>
.code-executor {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  overflow: hidden;
}

.executor-header {
  background: #f8f9fa;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.language-badge {
  background: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.code-workspace {
  padding: 15px;
}

.code-editor {
  width: 100%;
  height: 200px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  resize: vertical;
}

.execution-controls {
  margin-bottom: 15px;
}

.execution-controls button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.run-code-btn {
  background: #28a745;
  color: white;
}

.reset-code-btn {
  background: #6c757d;
  color: white;
}

.hint-btn {
  background: #ffc107;
  color: black;
}

.code-output {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.output-header {
  background: #f8f9fa;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.output-content {
  padding: 12px;
  margin: 0;
  min-height: 60px;
  background: #fff;
}

.hints {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
}
</style>

<script>
// 基本的なJavaScript実行機能
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.code-executor').forEach(function(executor) {
    const language = executor.dataset.language;
    const editor = executor.querySelector('.code-editor');
    const output = executor.querySelector('.output-content');
    const runBtn = executor.querySelector('.run-code-btn');
    const resetBtn = executor.querySelector('.reset-code-btn');
    const hintBtn = executor.querySelector('.hint-btn');
    const hints = executor.querySelector('.hints');
    const expectedOutput = executor.querySelector('.expected-output');
    const initialCode = editor.value;

    runBtn.addEventListener('click', function() {
      const code = editor.value;
      
      if (language === 'javascript') {
        try {
          // 簡易的なJavaScript実行（console.logをキャプチャ）
          let logs = [];
          const originalLog = console.log;
          console.log = function(...args) {
            logs.push(args.join(' '));
            originalLog.apply(console, arguments);
          };
          
          // コード実行
          eval(code);
          
          // console.logを復元
          console.log = originalLog;
          
          output.textContent = logs.join('\n') || '実行完了（出力なし）';
          output.style.color = '#28a745';
          
          // 期待される出力との比較
          if (expectedOutput && expectedOutput.textContent.trim() === logs.join('\n')) {
            showSuccess(executor);
          }
          
        } catch (error) {
          output.textContent = 'エラー: ' + error.message;
          output.style.color = '#dc3545';
        }
      } else {
        output.textContent = `${language}の実行はこのデモでは対応していません`;
        output.style.color = '#6c757d';
      }
    });

    resetBtn.addEventListener('click', function() {
      editor.value = initialCode;
      output.textContent = '';
      output.style.color = '';
    });

    if (hintBtn) {
      hintBtn.addEventListener('click', function() {
        hints.style.display = hints.style.display === 'none' ? 'block' : 'none';
      });
    }
  });

  function showSuccess(executor) {
    const successMsg = document.createElement('div');
    successMsg.innerHTML = '🎉 正解です！期待される結果と一致しています。';
    successMsg.style.cssText = 'background:#d4edda;color:#155724;padding:10px;border-radius:4px;margin-top:10px;';
    executor.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  }
});
</script>
EOF
```

**使用方法の例：**

```markdown
## JavaScript の基本

以下のコードエディタで試してみましょう：

{% raw %}{% include code-executor.html 
   language="javascript" 
   initial_code="console.log('Hello, World!');"
   expected_output="Hello, World!"
   hints="console.log()関数を使用して文字列を出力してください。" %}{% endraw %}
```

**実装のポイント：**
- クライアントサイドでJavaScriptコードを安全に実行
- console.logの出力をキャプチャして表示
- 期待される出力との自動比較機能
- ヒント表示機能でユーザーサポート
- 他の言語対応は外部サービス（CodePen、JSFiddle等）へのリンクで代替可能

<script>
class CodeExecutor {
  constructor(element) {
    this.element = element;
    this.language = element.dataset.language;
    this.editor = element.querySelector('.code-editor');
    this.output = element.querySelector('.output-content');
    this.initializeEventListeners();
  }
  
  initializeEventListeners() {
    this.element.querySelector('.run-code-btn').addEventListener('click', () => {
      this.executeCode();
    });
    
    this.element.querySelector('.reset-code-btn').addEventListener('click', () => {
      this.resetCode();
    });
    
    this.element.querySelector('.hint-btn').addEventListener('click', () => {
      this.showHints();
    });
  }
  
  async executeCode() {
    const code = this.editor.value;
    if (!code.trim()) {
      this.showOutput('コードを入力してください。', 'error');
      return;
    }
    
    this.showOutput('実行中...', 'info');
    
    try {
      const result = await this.runCode(code);
      this.showOutput(result.output, result.success ? 'success' : 'error');
      
      if (result.success) {
        this.checkExpectedOutput(result.output);
      }
    } catch (error) {
      this.showOutput(`エラー: ${error.message}`, 'error');
    }
  }
  
  async runCode(code) {
    // 安全なコード実行環境（サンドボックス）への送信
    const response = await fetch('/api/execute-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: this.language,
        code: code
      })
    });
    
    if (!response.ok) {
      throw new Error('実行サーバーでエラーが発生しました');
    }
    
    return await response.json();
  }
  
  showOutput(content, type) {
    this.output.textContent = content;
    this.output.className = `output-content ${type}`;
  }
  
  checkExpectedOutput(actualOutput) {
    const expectedElement = this.element.querySelector('.expected-output');
    if (!expectedElement) return;
    
    const expectedOutput = expectedElement.textContent.trim();
    const isCorrect = actualOutput.trim() === expectedOutput;
    
    if (isCorrect) {
      this.showSuccessMessage();
    } else {
      this.showImprovementSuggestion(expectedOutput, actualOutput);
    }
  }
  
  showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'execution-success';
    successDiv.innerHTML = '🎉 正解です！期待される結果と一致しています。';
    
    this.element.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 5000);
  }
  
  showImprovementSuggestion(expected, actual) {
    const suggestionDiv = document.createElement('div');
    suggestionDiv.className = 'execution-suggestion';
    suggestionDiv.innerHTML = `
      <p>💡 結果が期待値と異なります。</p>
      <details>
        <summary>期待される結果を確認</summary>
        <pre>${expected}</pre>
      </details>
    `;
    
    this.element.appendChild(suggestionDiv);
    setTimeout(() => suggestionDiv.remove(), 10000);
  }
  
  resetCode() {
    const initialCode = this.element.dataset.initialCode || '';
    this.editor.value = initialCode;
    this.output.textContent = '';
    this.output.className = 'output-content';
  }
  
  showHints() {
    const hintsElement = this.element.querySelector('.hints');
    if (hintsElement.style.display === 'none') {
      hintsElement.style.display = 'block';
    } else {
      hintsElement.style.display = 'none';
    }
  }
}

// 全ての Code Executor を初期化
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.code-executor').forEach(element => {
    new CodeExecutor(element);
  });
});
</script>
```

## 機能2：智能的コンテンツ推薦システム

### AI駆動の関連コンテンツ推薦

**コンテンツ分析と推薦エンジン：**
```javascript
// assets/js/content-recommendation.js
class ContentRecommendationEngine {
  constructor() {
    this.userProfile = this.loadUserProfile();
    this.contentMetadata = null;
    this.recommendations = [];
    this.initialize();
  }
  
  async initialize() {
    await this.loadContentMetadata();
    this.trackUserBehavior();
    this.generateRecommendations();
    this.displayRecommendations();
  }
  
  async loadContentMetadata() {
    try {
      const response = await fetch('/assets/data/content-metadata.json');
      this.contentMetadata = await response.json();
    } catch (error) {
      console.error('Failed to load content metadata:', error);
    }
  }
  
  loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      readArticles: [],
      timeSpentByCategory: {},
      preferredDifficulty: 'intermediate',
      interests: [],
      learningPath: []
    };
  }
  
  saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
  }
  
  trackUserBehavior() {
    // 記事読了時間の追跡
    const startTime = Date.now();
    let isActive = true;
    
    // ページの可視性変更を監視
    document.addEventListener('visibilitychange', () => {
      isActive = !document.hidden;
    });
    
    // スクロール行動の追跡
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      if (isActive) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
      }
    });
    
    // ページ離脱時の処理
    window.addEventListener('beforeunload', () => {
      this.recordReadingSession(startTime, maxScroll);
    });
  }
  
  recordReadingSession(startTime, maxScroll) {
    const sessionDuration = Date.now() - startTime;
    const currentPage = window.location.pathname;
    const pageMetadata = this.findPageMetadata(currentPage);
    
    if (!pageMetadata) return;
    
    // 読了記録の更新
    if (!this.userProfile.readArticles.includes(currentPage)) {
      this.userProfile.readArticles.push(currentPage);
    }
    
    // カテゴリ別時間の更新
    const category = pageMetadata.category;
    this.userProfile.timeSpentByCategory[category] = 
      (this.userProfile.timeSpentByCategory[category] || 0) + sessionDuration;
    
    // 興味分野の更新（スクロール率80%以上で興味ありと判定）
    if (maxScroll >= 80) {
      pageMetadata.tags.forEach(tag => {
        if (!this.userProfile.interests.includes(tag)) {
          this.userProfile.interests.push(tag);
        }
      });
    }
    
    this.saveUserProfile();
  }
  
  findPageMetadata(path) {
    return this.contentMetadata?.pages?.find(page => page.path === path);
  }
  
  async generateRecommendations() {
    if (!this.contentMetadata) return;
    
    const currentPage = this.findPageMetadata(window.location.pathname);
    if (!currentPage) return;
    
    // 複数の推薦アルゴリズムを組み合わせ
    const contentBasedRecs = this.getContentBasedRecommendations(currentPage);
    const collaborativeRecs = await this.getCollaborativeRecommendations();
    const learningPathRecs = this.getLearningPathRecommendations(currentPage);
    
    // 重み付けして統合
    this.recommendations = this.combineRecommendations([
      { type: 'content-based', items: contentBasedRecs, weight: 0.4 },
      { type: 'collaborative', items: collaborativeRecs, weight: 0.3 },
      { type: 'learning-path', items: learningPathRecs, weight: 0.3 }
    ]);
  }
  
  getContentBasedRecommendations(currentPage) {
    const candidates = this.contentMetadata.pages.filter(page => 
      page.path !== currentPage.path && 
      !this.userProfile.readArticles.includes(page.path)
    );
    
    return candidates
      .map(page => ({
        ...page,
        similarity: this.calculateContentSimilarity(currentPage, page)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  }
  
  calculateContentSimilarity(page1, page2) {
    // タグの重複度を計算
    const tags1 = new Set(page1.tags);
    const tags2 = new Set(page2.tags);
    const intersection = new Set([...tags1].filter(x => tags2.has(x)));
    const union = new Set([...tags1, ...tags2]);
    
    const tagSimilarity = intersection.size / union.size;
    
    // カテゴリ一致度
    const categorySimilarity = page1.category === page2.category ? 1 : 0;
    
    // 難易度の近さ
    const difficultyLevels = ['beginner', 'intermediate', 'advanced'];
    const diff1Index = difficultyLevels.indexOf(page1.difficulty);
    const diff2Index = difficultyLevels.indexOf(page2.difficulty);
    const difficultySimilarity = 1 - Math.abs(diff1Index - diff2Index) / (difficultyLevels.length - 1);
    
    return (tagSimilarity * 0.5) + (categorySimilarity * 0.3) + (difficultySimilarity * 0.2);
  }
  
  async getCollaborativeRecommendations() {
    // 他のユーザーの行動パターンに基づく推薦
    // （プライバシーを考慮した匿名化データの活用）
    try {
      const response = await fetch('/api/collaborative-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          readArticles: this.userProfile.readArticles,
          interests: this.userProfile.interests
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Collaborative filtering failed:', error);
      return [];
    }
  }
  
  getLearningPathRecommendations(currentPage) {
    // 学習パスに基づく次のステップ推薦
    const learningPaths = this.contentMetadata.learningPaths || [];
    const currentPath = learningPaths.find(path => 
      path.steps.some(step => step.path === currentPage.path)
    );
    
    if (!currentPath) return [];
    
    const currentStepIndex = currentPath.steps.findIndex(step => step.path === currentPage.path);
    const nextSteps = currentPath.steps.slice(currentStepIndex + 1, currentStepIndex + 4);
    
    return nextSteps.map(step => ({
      ...this.findPageMetadata(step.path),
      learningContext: step.description,
      pathTitle: currentPath.title
    })).filter(Boolean);
  }
  
  combineRecommendations(recSets) {
    const scoreMap = new Map();
    
    recSets.forEach(({ items, weight }) => {
      items.forEach((item, index) => {
        const score = (items.length - index) * weight;
        const currentScore = scoreMap.get(item.path) || 0;
        scoreMap.set(item.path, currentScore + score);
      });
    });
    
    return Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([path, score]) => {
        const metadata = this.findPageMetadata(path);
        return { ...metadata, recommendationScore: score };
      });
  }
  
  displayRecommendations() {
    const container = document.querySelector('.recommendations-container');
    if (!container || this.recommendations.length === 0) return;
    
    const html = `
      <div class="recommendations-section">
        <h3>🎯 あなたにおすすめ</h3>
        <div class="recommendations-grid">
          ${this.recommendations.map(rec => `
            <article class="recommendation-card" data-path="${rec.path}">
              <div class="card-header">
                <h4><a href="${rec.path}">${rec.title}</a></h4>
                <span class="difficulty-badge ${rec.difficulty}">${rec.difficulty}</span>
              </div>
              <p class="card-description">${rec.description}</p>
              <div class="card-tags">
                ${rec.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
              <div class="card-footer">
                <span class="reading-time">⏱️ ${rec.estimatedReadingTime}分</span>
                <span class="recommendation-reason">${this.getRecommendationReason(rec)}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // クリック追跡
    container.querySelectorAll('.recommendation-card').forEach(card => {
      card.addEventListener('click', () => {
        this.trackRecommendationClick(card.dataset.path);
      });
    });
  }
  
  getRecommendationReason(rec) {
    if (rec.learningContext) return `📚 ${rec.pathTitle}の次のステップ`;
    if (rec.recommendationScore > 0.8) return '🔥 高い関連性';
    if (this.userProfile.interests.some(interest => rec.tags.includes(interest))) return '❤️ あなたの興味に基づく';
    return '💡 おすすめ';
  }
  
  trackRecommendationClick(path) {
    // 推薦クリックの追跡（推薦精度向上のため）
    const clickData = {
      timestamp: Date.now(),
      fromPage: window.location.pathname,
      toPage: path,
      userProfile: this.userProfile
    };
    
    // 匿名化してサーバーに送信
    fetch('/api/track-recommendation-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clickData)
    }).catch(error => console.error('Failed to track recommendation click:', error));
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new ContentRecommendationEngine();
});
```

## 機能3：多言語自動翻訳システム

### AI駆動の技術文書翻訳

**自動翻訳機能の実装：**
```html
<!-- _includes/translation-widget.html -->
<div class="translation-widget">
  <div class="translation-controls">
    <label for="language-selector">🌐 言語:</label>
    <select id="language-selector" class="language-selector">
      <option value="ja">日本語 (原文)</option>
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="ko">한국어</option>
    </select>
    
    <button id="translate-btn" class="translate-btn">翻訳</button>
    <div class="translation-status" style="display: none;">
      <span class="status-text">翻訳中...</span>
    </div>
  </div>
  
  <div class="translation-quality-notice" style="display: none;">
    <p>⚠️ この翻訳は AI により自動生成されています。技術的正確性については原文をご確認ください。</p>
    <div class="quality-feedback">
      <span>翻訳品質の評価:</span>
      <button class="quality-btn" data-rating="good">👍 良い</button>
      <button class="quality-btn" data-rating="poor">👎 改善が必要</button>
    </div>
  </div>
</div>

<script>
class TechnicalDocumentTranslator {
  constructor() {
    this.originalContent = null;
    this.currentLanguage = 'ja';
    this.translationCache = new Map();
    this.initialize();
  }
  
  initialize() {
    this.originalContent = this.extractTranslatableContent();
    this.setupEventListeners();
  }
  
  extractTranslatableContent() {
    const article = document.querySelector('article, .content, main');
    if (!article) return null;
    
    const content = {
      title: document.querySelector('h1')?.textContent || '',
      headings: Array.from(document.querySelectorAll('h2, h3, h4')).map(h => ({
        level: h.tagName.toLowerCase(),
        text: h.textContent,
        element: h
      })),
      paragraphs: Array.from(document.querySelectorAll('p')).map(p => ({
        text: p.textContent,
        element: p
      })),
      lists: Array.from(document.querySelectorAll('li')).map(li => ({
        text: li.textContent,
        element: li
      })),
      captions: Array.from(document.querySelectorAll('figcaption, .caption')).map(cap => ({
        text: cap.textContent,
        element: cap
      }))
    };
    
    return content;
  }
  
  setupEventListeners() {
    const selector = document.getElementById('language-selector');
    const translateBtn = document.getElementById('translate-btn');
    
    selector?.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      if (selectedLang === 'ja') {
        this.restoreOriginalContent();
      } else {
        this.translateToLanguage(selectedLang);
      }
    });
    
    translateBtn?.addEventListener('click', () => {
      const selectedLang = selector.value;
      if (selectedLang !== 'ja') {
        this.translateToLanguage(selectedLang);
      }
    });
    
    // 翻訳品質フィードバック
    document.querySelectorAll('.quality-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.submitQualityFeedback(e.target.dataset.rating);
      });
    });
  }
  
  async translateToLanguage(targetLang) {
    if (!this.originalContent) return;
    
    this.showTranslationStatus(true);
    
    try {
      // キャッシュチェック
      const cacheKey = `${window.location.pathname}_${targetLang}`;
      if (this.translationCache.has(cacheKey)) {
        this.applyTranslation(this.translationCache.get(cacheKey));
        this.showTranslationStatus(false);
        return;
      }
      
      const translation = await this.performTranslation(targetLang);
      this.translationCache.set(cacheKey, translation);
      this.applyTranslation(translation);
      
    } catch (error) {
      console.error('Translation failed:', error);
      this.showTranslationError();
    } finally {
      this.showTranslationStatus(false);
    }
  }
  
  async performTranslation(targetLang) {
    const contentToTranslate = {
      title: this.originalContent.title,
      texts: [
        ...this.originalContent.headings.map(h => h.text),
        ...this.originalContent.paragraphs.map(p => p.text),
        ...this.originalContent.lists.map(li => li.text),
        ...this.originalContent.captions.map(cap => cap.text)
      ].filter(text => text.trim().length > 0)
    };
    
    const response = await fetch('/api/translate-technical-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: contentToTranslate,
        targetLanguage: targetLang,
        sourceLanguage: 'ja',
        domain: 'technical', // 技術文書特化翻訳
        preserveFormatting: true
      })
    });
    
    if (!response.ok) {
      throw new Error('Translation service error');
    }
    
    return await response.json();
  }
  
  applyTranslation(translation) {
    // タイトルの翻訳適用
    const titleElement = document.querySelector('h1');
    if (titleElement && translation.title) {
      titleElement.textContent = translation.title;
    }
    
    // 見出しの翻訳適用
    this.originalContent.headings.forEach((heading, index) => {
      if (translation.headings && translation.headings[index]) {
        heading.element.textContent = translation.headings[index];
      }
    });
    
    // 段落の翻訳適用
    this.originalContent.paragraphs.forEach((paragraph, index) => {
      if (translation.paragraphs && translation.paragraphs[index]) {
        paragraph.element.textContent = translation.paragraphs[index];
      }
    });
    
    // リストアイテムの翻訳適用
    this.originalContent.lists.forEach((listItem, index) => {
      if (translation.lists && translation.lists[index]) {
        listItem.element.textContent = translation.lists[index];
      }
    });
    
    // キャプションの翻訳適用
    this.originalContent.captions.forEach((caption, index) => {
      if (translation.captions && translation.captions[index]) {
        caption.element.textContent = translation.captions[index];
      }
    });
    
    this.showTranslationQualityNotice(true);
    this.currentLanguage = translation.targetLanguage;
  }
  
  restoreOriginalContent() {
    // タイトル復元
    const titleElement = document.querySelector('h1');
    if (titleElement && this.originalContent.title) {
      titleElement.textContent = this.originalContent.title;
    }
    
    // 見出し復元
    this.originalContent.headings.forEach(heading => {
      heading.element.textContent = heading.text;
    });
    
    // 段落復元
    this.originalContent.paragraphs.forEach(paragraph => {
      paragraph.element.textContent = paragraph.text;
    });
    
    // リストアイテム復元
    this.originalContent.lists.forEach(listItem => {
      listItem.element.textContent = listItem.text;
    });
    
    // キャプション復元
    this.originalContent.captions.forEach(caption => {
      caption.element.textContent = caption.text;
    });
    
    this.showTranslationQualityNotice(false);
    this.currentLanguage = 'ja';
  }
  
  showTranslationStatus(show) {
    const status = document.querySelector('.translation-status');
    if (status) {
      status.style.display = show ? 'inline-block' : 'none';
    }
  }
  
  showTranslationQualityNotice(show) {
    const notice = document.querySelector('.translation-quality-notice');
    if (notice) {
      notice.style.display = show ? 'block' : 'none';
    }
  }
  
  showTranslationError() {
    const status = document.querySelector('.status-text');
    if (status) {
      status.textContent = '翻訳中にエラーが発生しました';
      status.style.color = 'red';
    }
  }
  
  async submitQualityFeedback(rating) {
    try {
      await fetch('/api/translation-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: window.location.pathname,
          language: this.currentLanguage,
          rating: rating,
          timestamp: Date.now()
        })
      });
      
      // フィードバック送信完了を表示
      const feedback = document.querySelector('.quality-feedback');
      if (feedback) {
        feedback.innerHTML = '<span style="color: green;">✓ フィードバックありがとうございました</span>';
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new TechnicalDocumentTranslator();
});
</script>
```

## 機能4：リアルタイム協働編集システム

### GitHub統合による協働編集

**リアルタイム編集提案システム：**
```html
<!-- _includes/collaborative-editing.html -->
<div class="collaborative-editing" style="display: none;">
  <div class="editing-toolbar">
    <button id="suggest-edit-btn">✏️ 編集提案</button>
    <button id="add-comment-btn">💬 コメント追加</button>
    <button id="view-history-btn">📊 編集履歴</button>
  </div>
  
  <div class="edit-suggestions-panel" style="display: none;">
    <h4>📝 編集提案</h4>
    <form id="edit-suggestion-form">
      <div class="selection-info"></div>
      <textarea id="suggestion-text" placeholder="改善提案を入力してください..."></textarea>
      <div class="suggestion-type">
        <label>
          <input type="radio" name="type" value="correction"> 🔧 修正
        </label>
        <label>
          <input type="radio" name="type" value="improvement"> ⬆️ 改善
        </label>
        <label>
          <input type="radio" name="type" value="addition"> ➕ 追加
        </label>
      </div>
      <div class="form-actions">
        <button type="submit">送信</button>
        <button type="button" id="cancel-suggestion">キャンセル</button>
      </div>
    </form>
  </div>
</div>

<script>
class CollaborativeEditingSystem {
  constructor() {
    this.selectedText = '';
    this.selectionRange = null;
    this.initialize();
  }
  
  initialize() {
    this.setupTextSelection();
    this.setupEditingSuggestions();
    this.loadExistingSuggestions();
  }
  
  setupTextSelection() {
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        this.selectedText = selection.toString();
        this.selectionRange = selection.getRangeAt(0);
        this.showEditingOptions();
      } else {
        this.hideEditingOptions();
      }
    });
  }
  
  showEditingOptions() {
    const toolbar = document.querySelector('.collaborative-editing');
    if (toolbar) {
      toolbar.style.display = 'block';
      
      // 選択範囲の近くに表示
      const rect = this.selectionRange.getBoundingClientRect();
      toolbar.style.position = 'fixed';
      toolbar.style.top = `${rect.bottom + 10}px`;
      toolbar.style.left = `${rect.left}px`;
      toolbar.style.zIndex = '1000';
    }
  }
  
  hideEditingOptions() {
    const toolbar = document.querySelector('.collaborative-editing');
    if (toolbar) {
      toolbar.style.display = 'none';
    }
  }
  
  setupEditingSuggestions() {
    document.getElementById('suggest-edit-btn')?.addEventListener('click', () => {
      this.openSuggestionPanel();
    });
    
    document.getElementById('edit-suggestion-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitEditSuggestion();
    });
    
    document.getElementById('cancel-suggestion')?.addEventListener('click', () => {
      this.closeSuggestionPanel();
    });
    
    document.getElementById('add-comment-btn')?.addEventListener('click', () => {
      this.addComment();
    });
    
    document.getElementById('view-history-btn')?.addEventListener('click', () => {
      this.viewEditHistory();
    });
  }
  
  openSuggestionPanel() {
    const panel = document.querySelector('.edit-suggestions-panel');
    const selectionInfo = document.querySelector('.selection-info');
    
    if (panel && selectionInfo) {
      selectionInfo.innerHTML = `
        <div class="selected-text-preview">
          <strong>選択されたテキスト:</strong>
          <blockquote>"${this.selectedText}"</blockquote>
        </div>
      `;
      panel.style.display = 'block';
    }
  }
  
  closeSuggestionPanel() {
    const panel = document.querySelector('.edit-suggestions-panel');
    if (panel) {
      panel.style.display = 'none';
      document.getElementById('suggestion-text').value = '';
    }
  }
  
  async submitEditSuggestion() {
    const suggestionText = document.getElementById('suggestion-text').value;
    const suggestionType = document.querySelector('input[name="type"]:checked')?.value;
    
    if (!suggestionText || !suggestionType) {
      alert('提案内容と種類を選択してください。');
      return;
    }
    
    const suggestion = {
      id: this.generateSuggestionId(),
      selectedText: this.selectedText,
      suggestionText: suggestionText,
      type: suggestionType,
      page: window.location.pathname,
      timestamp: Date.now(),
      author: this.getCurrentUser(),
      status: 'pending'
    };
    
    try {
      await this.saveSuggestion(suggestion);
      await this.createGitHubIssue(suggestion);
      this.showSuccessMessage('編集提案が送信されました！');
      this.closeSuggestionPanel();
    } catch (error) {
      console.error('Failed to submit suggestion:', error);
      this.showErrorMessage('提案の送信に失敗しました。');
    }
  }
  
  async saveSuggestion(suggestion) {
    // ローカルストレージに保存
    const suggestions = JSON.parse(localStorage.getItem('editSuggestions') || '[]');
    suggestions.push(suggestion);
    localStorage.setItem('editSuggestions', JSON.stringify(suggestions));
    
    // サーバーにも送信
    await fetch('/api/edit-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suggestion)
    });
  }
  
  async createGitHubIssue(suggestion) {
    const issueTitle = `編集提案: ${suggestion.type} - ${document.title}`;
    const issueBody = `
## 編集提案

**ページ:** ${window.location.href}
**種類:** ${suggestion.type}
**提案者:** ${suggestion.author}

### 対象テキスト
\`\`\`
${suggestion.selectedText}
\`\`\`

### 提案内容
${suggestion.suggestionText}

**提案ID:** ${suggestion.id}
**作成日時:** ${new Date(suggestion.timestamp).toLocaleString('ja-JP')}

---
*この issue は Vibe Writing 協働編集システムにより自動生成されました。*
    `;
    
    await fetch('/api/github/create-issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ['documentation', 'edit-suggestion', `type:${suggestion.type}`]
      })
    });
  }
  
  async addComment() {
    const comment = prompt('コメントを入力してください:');
    if (!comment) return;
    
    const commentData = {
      id: this.generateSuggestionId(),
      selectedText: this.selectedText,
      comment: comment,
      page: window.location.pathname,
      timestamp: Date.now(),
      author: this.getCurrentUser()
    };
    
    try {
      await this.saveComment(commentData);
      this.showSuccessMessage('コメントが追加されました！');
    } catch (error) {
      console.error('Failed to add comment:', error);
      this.showErrorMessage('コメントの追加に失敗しました。');
    }
  }
  
  async saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('pageComments') || '[]');
    comments.push(comment);
    localStorage.setItem('pageComments', JSON.stringify(comments));
    
    await fetch('/api/page-comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });
  }
  
  async viewEditHistory() {
    try {
      const response = await fetch(`/api/edit-history?page=${encodeURIComponent(window.location.pathname)}`);
      const history = await response.json();
      this.displayEditHistory(history);
    } catch (error) {
      console.error('Failed to load edit history:', error);
    }
  }
  
  displayEditHistory(history) {
    const historyHtml = `
      <div class="edit-history-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>📊 編集履歴</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="modal-body">
            ${history.map(entry => `
              <div class="history-entry">
                <div class="entry-header">
                  <span class="entry-date">${new Date(entry.timestamp).toLocaleString('ja-JP')}</span>
                  <span class="entry-author">${entry.author}</span>
                  <span class="entry-type type-${entry.type}">${entry.type}</span>
                </div>
                <div class="entry-content">
                  ${entry.description}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', historyHtml);
    
    document.querySelector('.close-modal').addEventListener('click', () => {
      document.querySelector('.edit-history-modal').remove();
    });
  }
  
  loadExistingSuggestions() {
    const suggestions = JSON.parse(localStorage.getItem('editSuggestions') || '[]');
    const pageSuggestions = suggestions.filter(s => s.page === window.location.pathname);
    
    if (pageSuggestions.length > 0) {
      this.displaySuggestionIndicators(pageSuggestions);
    }
  }
  
  displaySuggestionIndicators(suggestions) {
    suggestions.forEach(suggestion => {
      // テキスト内に提案インジケーターを表示
      const indicator = document.createElement('span');
      indicator.className = 'suggestion-indicator';
      indicator.innerHTML = '💡';
      indicator.title = `編集提案: ${suggestion.suggestionText}`;
      
      // 適切な位置に挿入（簡略化実装）
      document.body.appendChild(indicator);
    });
  }
  
  generateSuggestionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  getCurrentUser() {
    return localStorage.getItem('username') || 'anonymous';
  }
  
  showSuccessMessage(message) {
    this.showMessage(message, 'success');
  }
  
  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }
  
  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      border-radius: 4px;
      z-index: 10000;
    `;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new CollaborativeEditingSystem();
});
</script>
```

これらの高度機能により、GitHub Pages上のVibe Writing文書は、単なる静的文書から、インタラクティブで継続的に改善される知識プラットフォームに進化します。読者の学習体験を大幅に向上させ、コンテンツの品質と価値を継続的に高めることができます。

---

**関連リンク：**
- [5.3 Vibe Writing + GitHub Pages統合プロセス](section-05-03-integration-process.md)
- [第6章：組織規模別実装戦略](chapter-06-organizational-strategies.md)
- [目次に戻る](table-of-contents.md)