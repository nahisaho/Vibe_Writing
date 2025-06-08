// Vibe Writing Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    // Add table of contents for long pages
    generateTableOfContents();
    
    // Add reading progress indicator
    addReadingProgress();
    
    // External link handling
    handleExternalLinks();
    
    // Add search functionality
    addSearchFunctionality();
});

function generateTableOfContents() {
    const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
    if (headings.length < 3) return; // Don't generate TOC for short pages
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>目次</h3><ul></ul>';
    
    const list = toc.querySelector('ul');
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();
        li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
        list.appendChild(li);
    });
    
    // Insert TOC after the first h1
    const firstH1 = document.querySelector('.markdown-body h1');
    if (firstH1) {
        firstH1.insertAdjacentElement('afterend', toc);
    }
}

function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', `${link.textContent} (新しいタブで開く)`);
        }
    });
}

function addSearchFunctionality() {
    // Simple client-side search for static sites
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="ページ内検索..." />
        <div id="search-results"></div>
    `;
    
    const header = document.querySelector('.site-header .header-content');
    if (header) {
        header.appendChild(searchContainer);
    }
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.trim());
        }, 300);
    });
    
    function performSearch(query) {
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const content = document.querySelector('.markdown-body');
        const paragraphs = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
        const results = [];
        
        paragraphs.forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    element: element,
                    text: element.textContent,
                    type: element.tagName.toLowerCase()
                });
            }
        });
        
        displaySearchResults(results, query);
    }
    
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>検索結果が見つかりませんでした。</p>';
            return;
        }
        
        const resultList = results.slice(0, 5).map(result => {
            const highlightedText = highlightText(result.text, query);
            return `<div class="search-result">
                <strong>${result.type.toUpperCase()}</strong>: ${highlightedText}
            </div>`;
        }).join('');
        
        searchResults.innerHTML = resultList;
    }
    
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
}

// Add CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #2563eb;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .copy-button:hover {
        background: #1d4ed8;
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0,0,0,0.1);
        z-index: 1000;
    }
    
    .reading-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #059669);
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .table-of-contents {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .table-of-contents ul {
        list-style: none;
        padding-left: 0;
    }
    
    .table-of-contents li {
        margin: 0.25rem 0;
    }
    
    .table-of-contents li.h3 {
        padding-left: 1rem;
    }
    
    .table-of-contents a {
        text-decoration: none;
        color: #2563eb;
    }
    
    .table-of-contents a:hover {
        text-decoration: underline;
    }
    
    .search-container {
        margin-top: 1rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    
    #search-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 4px;
        background: rgba(255,255,255,0.1);
        color: white;
    }
    
    #search-input::placeholder {
        color: rgba(255,255,255,0.7);
    }
    
    #search-results {
        background: white;
        border-radius: 4px;
        margin-top: 0.5rem;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .search-result {
        padding: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        color: #1f2937;
    }
    
    .search-result:last-child {
        border-bottom: none;
    }
    
    .search-result mark {
        background: #fef3c7;
        padding: 1px 2px;
    }
`;
document.head.appendChild(style);