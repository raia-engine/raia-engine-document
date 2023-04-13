import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RaiaEngine",
  description: "Documentation of the RaiaEngine game engine.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/reference/'},
      { text: 'Download', link: '/download/'}
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
                { text:'Hello World', link:'/tutorial/windows/helloworld'},
                { text:'図形を描画する', link:'/tutorial/windows/helloworld'},
                { text:'画像を表示する', link:'/tutorial/windows/helloworld'},
                { text:'入力を検知する', link:'/tutorial/windows/helloworld'},
              ] 
            },
            { text: 'macOS編', link: '/tutorial/' },
            { text: 'Linux編', link: '/tutorial/' }
          ]
        },
      ],
      '/reference/': [
        {
          text: 'リファレンス',
          items: [
            { text: 'はじめに', link: '/reference/' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
      '/download/': [
        {
          text: 'プロトタイプ',
          items: [
            { text: 'はじめに', link: '/download/' },
            { text: '0.1.0.0', link: '/api-examples' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
