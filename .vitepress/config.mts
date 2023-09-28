import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  srcDir: './docs',
  outDir: '../raia-engine.github.io/docs',
  ignoreDeadLinks: true,
  title: "Raia",
  description: "Documentation of the RaiaEngine game engine.",
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ドキュメント', link: '/guide/' },
      { text: 'リファレンス', link: '/reference/'},
      { text: 'Wiki', link: '/wiki/'},
      { text: 'ダウンロード', link: '/download/'}
    ],
    sidebar: {
      '/guide/':[
        {
          text: 'ドキュメント',
          collapsed: false,
          items: [
            { text: 'はじめに', link: '/guide/' },
            { text: 'インストールとセットアップ', link: '/guide/setup'}
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
                { text:'Hello World', link:'/guide/tutorial/windows/helloworld'},
                { text:'図形を描画する', link:'/guide/tutorial/windows/shape'},
                { text:'画像を表示する', link:'/guide/tutorial/windows/image'},
                { text:'サーフェスに描画する', link:'/guide/tutorial/windows/surface'},
                { text:'メインループを使う', link:'/guide/tutorial/windows/mainloop'},
                { text:'入力を検知する', link:'/guide/tutorial/windows/input'},
              ] 
            },
            { text: 'macOS編', link: '/tutorial/macos/' },
            { text: 'Linux編', link: '/tutorial/linux/' }
          ]
        },
      ],
      '/reference/': [
        {
          text: 'リファレンス',
          items: [
            { text: 'はじめに', link: '/reference/' },
          ]
        },
        {
          text: '組み込み言語',
          items: [
            { text: 'raia_v8', link: '/reference/' },
            { text: 'raia_duktape', link: '/reference/' },
            { text: 'raia_lua', link: '/reference/' },
            { text: 'raia_mruby', link: '/reference/' },
          ]
        },
        {
          text: '標準プラグイン',
          items: [
            { text: 'raia_app', link: '/reference/' },
            { text: 'raia_draw', link: '/reference/' },
            { text: 'raia_file', link: '/reference/' },
            { text: 'raia_rag', link: '/reference/' },
            { text: 'raia_sound', link: '/reference/' },
          ]
        }
      ],
      '/wiki/': [
        {
          text: 'Wiki',
          collapsed: false,
          items: [
            { text: '目次', link: '/wiki/' },
            { text: 'JSONによる接続', link: '/wiki/joint.md'},
            { text: 'プラグインの作成', link: '/wiki/plugin.md'},
            { text: 'RAGの文法規則', link: '/wiki/rag.md'},
          ]
        },
        {
          text: '備忘録',
          collapsed: false,
          items: [
            { text: 'メモ', link: '/wiki/memo' },
          ]
        },
      ],
      '/download/': [
        {
          text: 'プロトタイプ',
          items: [
            { text: 'はじめに', link: '/download/' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/raia-engine' }
    ]
  }
})
