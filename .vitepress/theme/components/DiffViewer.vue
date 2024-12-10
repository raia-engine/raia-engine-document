<template>
    <div>
      <h2>ドキュメント差分比較ツール</h2>
      <div class="form-group">
        <label for="source-url">比較元URL</label>
        <input type="text" id="source-url" v-model="sourceURL" placeholder="比較元ファイルのRAW URLを入力" />
      </div>
      <div class="form-group">
        <label for="target-url">比較先URL</label>
        <input type="text" id="target-url" v-model="targetURL" placeholder="比較先ファイルのRAW URLを入力" />
      </div>
      <button @click="showDiff">差分を表示</button>
  
      <div id="diff-container" ref="diffContainer" style="margin-top:20px;"></div>
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
        outputFormat: 'side-by-side',
        matching: 'lines'
      })
  
      diffContainer.value.innerHTML = diffHtml
  
      // 差分行に対して色分け(挿入:緑, 削除:赤 はdiff2htmlデフォルトで対応済み)
      // 変更箇所を薄い黄色でハイライトする例（簡易実装）
      // 挿入(d2h-ins)と削除(d2h-del)が対になっている場合を変更箇所とみなす
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
  })
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="text"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  button {
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>
  