# VitePressとは？

::: details 原文
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/guide/what-is-vitepress.md
:::

VitePressは、高速でコンテンツ中心のウェブサイトを構築するために設計された[静的サイトジェネレーター](https://en.wikipedia.org/wiki/Static_site_generator) (SSG)です。簡単に言えば、VitePressはMarkdownで書かれたソースコンテンツにテーマを適用し、どこにでも簡単にデプロイできる静的なHTMLページを生成します。

::: tip
とりあえず試してみたい？ [クイックスタート](./getting-started)を見てください。
:::

## 使用例

- **ドキュメンテーション**

  VitePressには技術文書向けに設計されたデフォルトのテーマが付属しています。このページや、[Vite](https://vitejs.dev/)、[Rollup](https://rollupjs.org/)、[Pinia](https://pinia.vuejs.org/)、[VueUse](https://vueuse.org/)、[Vitest](https://vitest.dev/)、[D3](https://d3js.org/)、[UnoCSS](https://unocss.dev/)、[Iconify](https://iconify.design/)などのドキュメントもVitePressで作成されています。さらに、[多くのプロジェクト](https://www.vuetelescope.com/explore?framework.slug=vitepress)がこのツールを利用しています。

  [公式のVue.jsドキュメント](https://vuejs.org/)もVitePressを基盤にしていますが、複数の翻訳版で共通のカスタムテーマを使用しています。

- **ブログ、ポートフォリオ、マーケティングサイト**

  VitePressは[完全にカスタマイズされたテーマ](./custom-theme)をサポートしており、通常のVite + Vueアプリケーションと同じ開発体験を提供します。また、VitePressは、ビルド時にデータが決定できる限り、ほぼ何でも構築できる柔軟なAPIを提供します。たとえば、[データをロード](./data-loading)したり、[動的にルートを生成](./routing#dynamic-routes)したりできます。

  公式の[Vue.jsブログ](https://blog.vuejs.org/)も、ローカルコンテンツに基づいてインデックスページを生成するシンプルなブログです。

## 開発者体験

VitePressは、Markdownコンテンツを扱う際に素晴らしい開発者体験(DX)を提供することを目指しています。

- **[Viteによるサポート](https://vitejs.dev/):** 即時サーバー起動、100ms以内で常に編集内容が即座に反映され、ページリロードが不要。

- **[組み込みのMarkdown拡張機能](./markdown):** フロントマター、テーブル、シンタックスハイライトなどが標準でサポートされています。特に、コードブロックを扱うための高度な機能を多数提供しており、技術文書に最適です。

- **[Vueで強化されたMarkdown](./using-vue):** 各MarkdownページはVueの[シングルファイルコンポーネント](https://vuejs.org/guide/scaling-up/sfc.html)でもあり、VueテンプレートがHTMLと100％互換性があるため、Vueのテンプレート機能やインポートしたVueコンポーネントを使用して、静的コンテンツにインタラクティブな要素を埋め込むことができます。

## パフォーマンス

従来の多くのSSGでは、ナビゲーションごとにページ全体のリロードが行われますが、VitePressで生成されたサイトでは、初回訪問時に静的なHTMLが提供されますが、その後のナビゲーションでは[シングルページアプリケーション](https://en.wikipedia.org/wiki/Single-page_application) (SPA)として機能します。このモデルは、パフォーマンスにおいて最適なバランスを提供すると考えています。

- **高速な初回ロード**

  どのページへの初回訪問でも、静的にプリレンダリングされたHTMLが提供され、速い読み込み速度と最適なSEOが実現されます。その後、ページがJavaScriptバンドルを読み込み、VueのSPAとして機能します（"ハイドレーション"と呼ばれるプロセス）。SPAのハイドレーションは遅いと思われがちですが、Vue 3の高いパフォーマンスとコンパイラの最適化のおかげで、このプロセスは非常に高速です。[PageSpeed Insights](https://pagespeed.web.dev/report?url=https%3A%2F%2Fvitepress.dev%2F)でも、VitePressサイトは低性能なモバイルデバイスでもほぼ完璧なパフォーマンススコアを達成しています。

- **高速なポストロードナビゲーション**

  さらに重要なのは、初回ロード後のSPAモデルによって、サイト内のナビゲーションがより良いユーザー体験を提供することです。その後のナビゲーションでは、ページ全体のリロードは行われず、リンク先のページのコンテンツが動的に取得されて更新されます。また、VitePressはビューポート内のリンクに対してページチャンクを自動的にプリフェッチします。ほとんどの場合、ポストロードナビゲーションは瞬時に感じられます。

- **ペナルティなしのインタラクティブ性**

  静的なMarkdown内に埋め込まれた動的なVue部分をハイドレートできるように、各MarkdownページはVueコンポーネントとして処理され、JavaScriptにコンパイルされます。これは非効率に思えるかもしれませんが、Vueコンパイラは静的部分と動的部分を賢く分離し、ハイドレーションコストとペイロードサイズを最小限に抑えています。初回ページロード時には、静的部分が自動的にJavaScriptペイロードから除外され、ハイドレーション中にスキップされます。

## VuePressとの違いは？

VitePressはVuePressの精神的後継者です。元々のVuePressはVue 2とwebpackに基づいていましたが、VitePressはVue 3とViteをベースにしており、より優れたDX、より高い本番環境でのパフォーマンス、より洗練されたデフォルトテーマ、そしてより柔軟なカスタマイズAPIを提供します。

VitePressとVuePressのAPIの違いは、主にテーマとカスタマイズに関するものです。もしVuePress 1をデフォルトテーマで使用している場合、VitePressへの移行は比較的簡単です。

VuePress 2もVue 3とViteをサポートするための努力がなされていますが、2つのSSGを並行して維持するのは持続可能ではないため、Vueチームは長期的にはVitePressを主要な推奨SSGとして焦点を当てることに決めました。