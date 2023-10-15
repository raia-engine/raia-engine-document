import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  srcDir: './docs',
  outDir: '../raia-engine.github.io/docs',
  ignoreDeadLinks: true,
  title: "Raia",
  description: "Documentation of the RaiaEngine game engine.",
  lastUpdated: true,
  themeConfig: {
    sitemap: {
      hostname: 'https://raia.app'
    },
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/raia-engine/raia-document/edit/main/docs/:path'
    },
    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/dolphilia_' },
      { icon: 'github', link: 'https://github.com/dolphilia/raia' }
    ],
    nav: [
      { text: 'ダウンロード', link: '/download/'},
      { text: '使い方', link: '/usage/' },
      { text: 'ドキュメント', link: '/document/'},
      { text: 'API', items: [
        { text: '目次', link: '/api/'},
        { text: '標準ライブラリ', items: [
          { text: 'Draw', link: '/api/std/draw/'},
          { text: 'File', link: '/api/std/file/'},
          { text: 'Font', link: '/api/std/font/'},
        ]},
        { text: 'スクリプト言語', items: [
          { text: 'V8', link: '/api/scripting/v8/'},
          { text: 'Duktape', link: '/api/scripting/duktape/'},
          { text: 'Lua', link: '/api/scripting/lua/'},
          { text: 'mruby', link: '/api/scripting/mruby/'},
        ]},
        { text: 'バインディング', items: [
          { text: 'GLFW', link: '/api/binding/glfw/'},
          { text: 'GLES', link: '/api/binding/gles/'},
          { text: 'ImGui', link: '/api/binding/imgui/'},
        ]},
      ]},
      { text: '参考資料', items: [
        { text: '目次', link: '/reference/'},
        { text: '翻訳', items: [
          { text: 'はじめに', link: '/reference/'},
        ]},
      ]},
    ],
    sidebar: {
      '/download/': [
        {
          text: 'ダウンロード',
          items: [
            { text: 'はじめに', link: '/download/' },
          ]
        }
      ],
      '/usage/':[
        {
          text: '使い方',
          collapsed: false,
          items: [
            { text: 'はじめに', link: '/usage/' },
            { text: 'インストールとセットアップ', link: '/usage/setup'}
          ]
        },
        {
          text: 'チュートリアル',
          collapsed: false,
          items: [
            { 
              text: 'Windows編', 
              collapsed: false,
              items: [
                { text:'Hello World', link:'/usage/tutorial/windows/helloworld'},
                { text:'図形を描画する', link:'/usage/tutorial/windows/shape'},
                { text:'画像を表示する', link:'/usage/tutorial/windows/image'},
                { text:'サーフェスに描画する', link:'/usage/tutorial/windows/surface'},
                { text:'メインループを使う', link:'/usage/tutorial/windows/mainloop'},
                { text:'入力を検知する', link:'/usage/tutorial/windows/input'},
              ] 
            },
            { text: 'macOS編', link: '/usage/tutorial/macos/' },
            { text: 'Linux編', link: '/usage/tutorial/linux/' }
          ]
        },
      ],
      '/document/': [
        {
          text: 'ドキュメント',
          collapsed: false,
          items: [
            { text: 'はじめに', link: '/document/' },
            { text: 'RaiaAPIについて', link: '/document/about_raia_api.md'},
          ]
        },
        {
          text: '雑多な記事',
          collapsed: false,
          items: [
            { text: 'Raiaのプラグインを作成する', link: '/document/plugin.md'},
            { text: 'RAGの文法規則', link: '/document/rag.md'},
            { text: 'MacにRaia開発環境を構築する', link: '/document/configure_macos.md'},
            { text: 'SteamDeckの開発環境構築', link: '/document/steamdeck.md'},
            { text: 'Macの実行ファイルをアプリ化', link: '/document/mac_unix_to_app.md'},
            { text: 'Raiaのディレクトリ構造', link: '/document/raia_dir_struct.md'},
            { text: 'Raiaのテストについて', link: '/document/raia_test.md'},
            { text: 'メモ', link: '/document/memo' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'はじめに', link: '/api/' },
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考',
          items: [
            { text: 'はじめに', link: '/reference/' },
          ]
        }
      ],
    },
  }
})
