<template>
    <div class="diff-wrapper">
      <div id="diff-container" ref="diffContainer" class="diff-container"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { createPatch } from 'diff'            // jsdiff
  import { html as diff2html } from 'diff2html' // diff2html HTML出力用
  import 'diff2html/bundles/css/diff2html.min.css'
  
  // props定義
  const props = defineProps({
    source: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  })
  
  // URLパラメータ取得
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const paramSource = params.get('source') || ''
  const paramTarget = params.get('target') || ''
  
  // propsが優先、propsがなければURLパラメータを使用
  const initialSource = props.source || paramSource
  const initialTarget = props.target || paramTarget
  
  const sourceURL = ref(initialSource)
  const targetURL = ref(initialTarget)
  const diffContainer = ref(null)
  
  async function showDiff() {
    const source = sourceURL.value.trim()
    const target = targetURL.value.trim()
  
    if (!source || !target) {
      diffContainer.value.innerHTML = '<p style="color:red;">比較元と比較先のURLを入力してください。</p>'
      return
    }
  
    try {
      const [sourceText, targetText] = await Promise.all([
        fetch(source).then(r => r.text()),
        fetch(target).then(r => r.text())
      ])
  
      // jsdiffで差分計算
      const diff = createPatch('file', sourceText, targetText, '比較元', '比較先')
      // diff2htmlでHTML整形
      const diffHtml = diff2html(diff, {
        drawFileList: false,
        outputFormat: 'line-by-line',
        matching: 'lines'
      })
  
      diffContainer.value.innerHTML = diffHtml
  
      // 変更箇所ハイライト処理(簡易)
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
  
  // 初期表示時、自動比較(初期値が揃っている場合)
  onMounted(() => {
    if (initialSource && initialTarget) {
      showDiff()
    }
  })
  </script>
  
  <style scoped>
  .diff-wrapper {
    margin: 40px auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 16px;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  h1 {
    font-size: 1.8em;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    color: #222;
  }

  h2 {
    font-size: 1.2em;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    color: #222;
  }
  
  .description {
    max-width: 800px;
    margin: 0 auto 30px;
    font-size: 1em;
    text-align: center;
  }
  
  .description p {
    margin: 10px 0;
  }
  
  .description code {
    background: #f7f7f7;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.95em;
  }
  
  .form-container {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto 40px;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #444;
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
  
  input[type="text"]:focus {
    outline: none;
    border-color: #888;
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
  }
  
  button:hover {
    background: #0055a0;
  }
  
  .diff-container {
    margin-top: 20px;
  }
  
  /* diff2html テーブル調整 */
  .diff-container .d2h-wrapper {
    border-radius: 8px;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  
  .diff-container .d2h-file-name-wrapper {
    background: #eee;
    font-weight: bold;
    padding: 8px;
  }
  
  .diff-container td {
    font-size: 0.9em;
  }
  
  .diff-container .d2h-ins {
    background: #e6ffe6; /* 挿入:薄い緑背景 */
  }
  
  .diff-container .d2h-del {
    background: #ffe6e6; /* 削除:薄い赤背景 */
  }
  </style>
  