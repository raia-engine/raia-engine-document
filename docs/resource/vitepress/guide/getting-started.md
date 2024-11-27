# クイックスタート

::: details 原文
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/guide/getting-started.md
:::

## オンラインで試してみる

[VitePressをStackBlitz](https://vitepress.new)で直接ブラウザで試すことができます。

## インストール

### 前提条件

- [Node.js](https://nodejs.org/) バージョン18以上
- コマンドラインインターフェース（CLI）を通じてVitePressにアクセスするためのターミナル
- [Markdown](https://en.wikipedia.org/wiki/Markdown)構文をサポートするテキストエディタ
  - [VSCode](https://code.visualstudio.com/)を推奨します。また、[公式のVue拡張機能](https://marketplace.visualstudio.com/items?itemName=Vue.volar)もインストールしてください。

VitePressは単独で使用することも、既存のプロジェクトにインストールすることもできます。どちらの場合も、次のコマンドでインストールできます。

::: code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

```sh [yarn (pnp)]
$ yarn add -D vitepress vue
```

```sh [bun]
$ bun add -D vitepress
```

:::

::: details 依存関係が不足しているという警告が出ていますか？
PNPMを使用している場合、`@docsearch/js`の依存関係が不足しているという警告が表示されることがありますが、これはVitePressの動作に支障をきたしません。この警告を抑制したい場合は、次の内容を`package.json`に追加してください。

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```

:::

::: tip 注意

VitePressはESM専用のパッケージです。`require()`を使ってインポートしないでください。また、最寄りの`package.json`に`"type": "module"`が含まれていることを確認するか、関連ファイルの拡張子を`.vitepress/config.js`から`.mjs`/`.mts`に変更してください。詳細は[Viteのトラブルシューティングガイド](http://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only)を参照してください。また、非同期CJSコンテキスト内では、`await import('vitepress')`を使用できます。

:::

### セットアップウィザード

VitePressには、基本的なプロジェクトをスキャフォールドするためのコマンドラインセットアップウィザードが付属しています。インストール後、次のコマンドを実行してウィザードを開始します。

::: code-group

```sh [npm]
$ npx vitepress init
```

```sh [pnpm]
$ pnpm vitepress init
```

```sh [yarn]
$ yarn vitepress init
```

```sh [bun]
$ bun vitepress init
```

:::

いくつかの簡単な質問が表示されます。

<!-- <<< @/snippets/init.ansi -->

::: tip Vueをピア依存関係としてインストール
VueコンポーネントやAPIを使用してカスタマイズを行う予定がある場合は、`vue`を明示的に依存関係としてインストールする必要があります。
:::

## ファイル構造

スタンドアロンのVitePressサイトを構築する場合、現在のディレクトリ（`./`）にサイトをスキャフォールドできます。しかし、既存のプロジェクトにVitePressをインストールする場合は、他のソースコードと分離するために、ネストされたディレクトリ（例：`./docs`）にサイトをスキャフォールドすることをお勧めします。

例えば、`./docs`にVitePressプロジェクトをスキャフォールドした場合、生成されるファイル構造は次のようになります。

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

`docs`ディレクトリはVitePressサイトの**プロジェクトルート**と見なされます。`.vitepress`ディレクトリは、VitePressの設定ファイル、開発サーバーのキャッシュ、ビルド出力、およびテーマカスタマイズ用のコードのための予約場所です。

::: tip
デフォルトでは、VitePressは開発サーバーのキャッシュを`.vitepress/cache`に、プロダクションビルドの出力を`.vitepress/dist`に保存します。Gitを使用している場合、これらを`.gitignore`ファイルに追加する必要があります。これらの場所は[設定で変更可能](../reference/site-config#outdir)です。
:::

### 設定ファイル

設定ファイル（`.vitepress/config.js`）では、サイトのタイトルや説明など、VitePressサイトのさまざまな側面をカスタマイズできます。

```js
// .vitepress/config.js
export default {
  // サイトレベルのオプション
  title: 'VitePress',
  description: 'Just playing around.',

  themeConfig: {
    // テーマレベルのオプション
  }
}
```

`themeConfig`オプションを使用して、テーマの動作をカスタマイズすることもできます。すべての設定オプションの詳細は[設定リファレンス](../reference/site-config)を参照してください。

### ソースファイル

`.vitepress`ディレクトリの外にあるMarkdownファイルは**ソースファイル**と見なされます。

VitePressは**ファイルベースのルーティング**を使用します。各`.md`ファイルは対応する`.html`ファイルにコンパイルされ、同じパスでアクセスできます。例えば、`index.md`は`index.html`にコンパイルされ、生成されたVitePressサイトのルートパス`/`でアクセス可能です。

VitePressは、クリーンなURLの生成、パスの書き換え、動的なページ生成をサポートしています。これらについては[ルーティングガイド](./routing)で詳しく説明します。

## サイトの起動

セットアッププロセス中に許可した場合、次のnpmスクリプトが`package.json`に追加されます。

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

`docs:dev`スクリプトは、即時ホットアップデート付きのローカル開発サーバーを起動します。次のコマンドで実行します。

::: code-group

```sh [npm]
$ npm run docs:dev
```

```sh [pnpm]
$ pnpm run docs:dev
```

```sh [yarn]
$ yarn docs:dev
```

```sh [bun]
$ bun run docs:dev
```

:::

npmスクリプトを使用せずに、直接VitePressを実行することもできます。

::: code-group

```sh [npm]
$ npx vitepress dev docs
```

```sh [pnpm]
$ pnpm vitepress dev docs
```

```sh [yarn]
$ yarn vitepress dev docs
```

```sh [bun]
$ bun vitepress dev docs
```

:::

コマンドラインでの使用方法の詳細は[CLIリファレンス](../reference/cli)に記載されています。

開発サーバーは`http://localhost:5173`で実行されているはずです。ブラウザでそのURLにアクセスして、新しいサイトを確認してください！

## 次に進むべきこと

- Markdownファイルが生成されたHTMLにどのようにマッピングされるかを理解するために、[ルーティングガイド](./routing)に進んでください。
- ページ上でできること、例えばMarkdownコンテンツの作成やVueコンポーネントの使用について知るために、ガイドの「執筆」セクションを参照してください。最初に[Markdown拡張機能](./markdown)を学ぶのがおすすめです。
- デフォルトのドキュメンテーションテーマで