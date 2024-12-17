<template>
    <div class="diff-wrapper">
      <h1>テキスト差分比較ツール</h1>
      <div class="description">
        <p>オンライン上にある2つのファイルの差分を表示します。このページのURL末尾に付与された <code>?source=...&amp;target=...</code> を元に比較します。URLはCORSに対応している必要があります。</p>
      </div>

      <div class="form-container">
        <div class="form-group-wrapper">
          <div class="form-group">
            <label for="source-url">比較元URL</label>
            <input type="text" id="source-url" v-model="sourceURL" placeholder="比較元ファイルのRAW URLを入力" />
          </div>
          <div class="form-group">
            <label for="target-url">比較先URL</label>
            <input type="text" id="target-url" v-model="targetURL" placeholder="比較先ファイルのRAW URLを入力" />
          </div>
        </div>
        <button @click="showDiff">差分を表示</button>
      </div>

      <div id="diff-container" ref="diffContainer" class="diff-container"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { createPatch } from 'diff'            // jsdiff
  import { html as diff2html } from 'diff2html' // diff2html HTML出力用
  import 'diff2html/bundles/css/diff2html.min.css'
  
  // URLパラメータ取得用
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const initialSource = params.get('source') || ''
  const initialTarget = params.get('target') || ''
  
  const sourceURL = ref(initialSource)
  const targetURL = ref(initialTarget)
  const diffContainer = ref(null)
  
  async function showDiff() {
    const source = sourceURL.value.trim()
    const target = targetURL.value.trim()

    const sourceFileName = source.split('/').pop()
    const targetFileName = target.split('/').pop()
  
    if (!source || !target) {
      diffContainer.value.innerHTML = '<p style="color:red;">比較元と比較先のURLを入力してください。</p>'
      return
    }
  
    try {
      const [sourceText, targetText] = await Promise.all([
        fetch(source).then(r => r.text()),
        fetch(target).then(r => r.text())
      ])
  
      // 現在のモードを判定：.darkクラスがhtmlに付いていればダークモード
      const isDarkMode = document.documentElement.classList.contains('dark')
  
      // jsdiffで差分計算
      const diff = createPatch('', sourceText, targetText, sourceFileName, targetFileName)
      // diff2htmlでHTML整形
      const diffHtml = diff2html(diff, {
        drawFileList: false,
        outputFormat: 'side-by-side',
        matching: 'lines',
        colorScheme: isDarkMode ? 'dark' : 'light'
      })
  
      diffContainer.value.innerHTML = diffHtml
  
      // 変更箇所のハイライト処理（簡易例）
      const delLines = diffContainer.value.querySelectorAll('.d2h-del')
      delLines.forEach(delLine => {
        const parent = delLine.parentElement
        const insLine = parent.querySelector('.d2h-ins')
        if (insLine) {
          delLine.style.background = '#fff9e6' // 薄い黄色
          insLine.style.background = '#fff9e6'
        }
      })
  
    } catch (error) {
      console.error('差分取得エラー:', error)
      diffContainer.value.innerHTML = '<p style="color:red;">ファイル取得または差分計算中にエラーが発生しました。</p>'
    }
  }
  
  // 初期表示時、自動比較(パラメータがある場合)
  onMounted(() => {
    if (initialSource && initialTarget) {
      showDiff()
    }
  
    // ダークモード切り替え監視
    const observer = new MutationObserver(() => {
      // htmlタグに'.dark'クラスが付与・削除されたら再描画
      showDiff()
    })
  
    // html要素のclass変化を監視
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  })
  </script>
  
  <style scoped>
  .diff-wrapper {
    margin: 40px auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
    line-height: 1.6;
  }

  @media (min-width: 640px) {
    .diff-wrapper {
        padding: 20px;
    }
  }

  @media (min-width: 1454px) {
    .diff-wrapper {
        width: 100%;
        padding: 0 20px;
    }
  }
  
  .dark .diff-wrapper {
    color: #ddd;
  }
  
  h1 {
    font-size: 1.8em;
    margin-bottom: 20px;
    font-weight: bold;
    color: #222;
  }
  
  .dark h1 {
    color: #ccc;
  }
  
  h2 {
    font-size: 1.2em;
    margin-bottom: 20px;
    font-weight: bold;
    color: #222;
  }
  
  .dark h2 {
    color: #ccc;
  }
  
  .description {
    font-size: 1em;
  }
  
  .description p {
    margin: 10px 0;
  }
  
  .description code {
    background: #f7f7f7;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.95em;
    color: #333;
  }
  
  .dark .description code {
    background: #333;
    color: #fff;
  }
  
  .form-container {

  }
  
  .dark .form-container {

  }

  .form-group-wrapper {
    display: flex;
    justify-content: space-between;
  }
  
  .form-group {
    flex-basis: 49%;
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #444;
  }
  
  .dark label {
    color: #ccc;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 1em;
  }
  
  .dark input[type="text"] {
    border: 1px solid #666;
    background: #333;
    color: #ddd;
  }
  
  input[type="text"]:focus {
    outline: none;
    border-color: #888;
  }
  
  .dark input[type="text"]:focus {
    border-color: #999;
  }
  
  button {
    padding: 10px 16px;
    cursor: pointer;
    background: #0066cc;
    color: #fff;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    transition: background 0.3s ease;
    font-weight: bold;
    display: block;
    width: 100%;
  }
  
  button:hover {
    background: #0055a0;
  }
  
  .diff-container {
    margin-top: 20px;
  }
  
  /* ダークモード時 diff2htmlエリア背景を調整 */
  .dark .diff-container .d2h-wrapper {
    border: 1px solid #444;
  }
  
  /* 挿入・削除行はデフォルトの色だが、ダークモード時コントラストを上げる */
  .dark .diff-container .d2h-ins {
    background: rgba(0, 128, 0, 0.3);
  }
  
  .dark .diff-container .d2h-del {
    background: rgba(128, 0, 0, 0.3);
  }
  </style>
  