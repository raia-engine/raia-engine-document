# Markdown拡張機能

::: details 元のテキスト
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/guide/markdown.md
:::

VitePressには、ビルトインのMarkdown拡張機能が含まれています。

## 見出しアンカー

見出しには自動的にアンカーリンクが適用されます。アンカーのレンダリングは`markdown.anchor`オプションで設定できます。

### カスタムアンカー

自動生成されたアンカーの代わりにカスタムアンカータグを指定するには、見出しにサフィックスを追加します。

```
# カスタムアンカーを使用する {#my-anchor}
```

これにより、デフォルトの`#using-custom-anchors`ではなく、`#my-anchor`としてリンクできるようになります。

## リンク

内部リンクと外部リンクの両方に特別な処理が行われます。

### 内部リンク

内部リンクはSPAナビゲーションのためにルータリンクに変換されます。また、各サブディレクトリに含まれるすべての`index.md`は自動的に`index.html`に変換され、対応するURL`/`でアクセスできます。

例えば、次のディレクトリ構造があるとします。

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

そして、`foo/one.md`にいると仮定します。

```md
[Home](/) <!-- ルートのindex.mdにユーザーを送ります -->
[foo](/foo/) <!-- fooディレクトリのindex.htmlにユーザーを送ります -->
[foo heading](./#heading) <!-- fooのindexファイル内の見出しにアンカーを設定 -->
[bar - three](../bar/three) <!-- 拡張子を省略できます -->
[bar - three](../bar/three.md) <!-- .mdを追加できます -->
[bar - four](../bar/four.html) <!-- .htmlを追加できます -->
```

### ページサフィックス

ページと内部リンクは、デフォルトで`.html`サフィックスが付いた状態で生成されます。

### 外部リンク

外部リンクには自動的に`target="_blank" rel="noreferrer"`が追加されます。

- [vuejs.org](https://vuejs.org)
- [VitePress on GitHub](https://github.com/vuejs/vitepress)

## フロントマター

[YAMLフロントマター](https://jekyllrb.com/docs/front-matter/)は、最初からサポートされています。

```yaml
---
title: ハッカーのようにブログを書く
lang: en-US
---
```

このデータは、カスタムコンポーネントやテーマコンポーネントとともにページ全体で利用できます。

詳細は[フロントマター](../reference/frontmatter-config)を参照してください。

## GitHubスタイルのテーブル

**入力**

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**出力**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## 絵文字 :tada:

**入力**

```
:tada: :100:
```

**出力**

:tada: :100:

[すべての絵文字リスト](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)が利用可能です。

## 目次

**入力**

```
[[toc]]
```

**出力**

[[toc]]

目次のレンダリングは`markdown.toc`オプションで設定できます。

## カスタムコンテナ

カスタムコンテナは、そのタイプ、タイトル、コンテンツによって定義できます。

### デフォルトタイトル

**入力**

```md
::: info
これはインフォボックスです。
:::

::: tip
これはティップです。
:::

::: warning
これは警告です。
:::

::: danger
これは危険な警告です。
:::

::: details
これは詳細ブロックです。
:::
```

**出力**

::: info
これはインフォボックスです。
:::

::: tip
これはティップです。
:::

::: warning
これは警告です。
:::

::: danger
これは危険な警告です。
:::

::: details
これは詳細ブロックです。
:::

### カスタムタイトル

カスタムタイトルを設定するには、コンテナの「タイプ」のすぐ後にテキストを追加します。

**入力**

````md
::: danger 停止
危険区域、進まないでください
:::

::: details クリックしてコードを表示
```js
console.log('Hello, VitePress!')
```
:::
````

**出力**

::: danger 停止
危険区域、進まないでください
:::

::: details クリックしてコードを表示
```js
console.log('Hello, VitePress!')
```
:::

また、グローバルにカスタムタイトルを設定することもできます。英語以外で書いている場合に便利です。

```ts
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```

### `raw`

これは、VitePressとのスタイルやルータの競合を防ぐために使用できる特別なコンテナです。特にコンポーネントライブラリをドキュメント化している場合に便利です。より良い分離のためには、[whyframe](https://whyframe.dev/docs/integrations/vitepress)もチェックすることをお勧めします。

**構文**

```md
::: raw
<div class="vp-raw">
:::
```

`vp-raw`クラスは、要素に直接使用することもできます。スタイルの分離は現在オプトインです。

- お好みのパッケージマネージャーで`postcss`をインストールします。

  ```sh
  $ npm add -D postcss
  ```

- `docs/postcss.config.mjs`というファイルを作成し、次の内容を追加します。

  ```js
  import { postcssIsolateStyles } from 'vitepress'

  export default {
    plugins: [postcssIsolateStyles()]
  }
  ```

  これは、内部で[`postcss-prefix-selector`](https://github.com/RadValentin/postcss-prefix-selector)を使用しています。次のようにオプションを渡すことができます。

  ```js
  postcssIsolateStyles({
    includeFiles: [/vp-doc\.css/] // デフォルトは /base\.css/
  })
  ```

## GitHub風のアラート

VitePressは、コールアウトとしてレンダリングする[GitHub風のアラート](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)もサポートしています。これらは[カスタムコンテナ](#custom-containers)と同じようにレンダリングされます。

```md
> [!NOTE]
> ユーザーが読み飛ばしても考慮すべき情報を強調します。

> [!TIP]
> ユーザーがより成功するためのオプション情報を提供します。

> [!IMPORTANT]
> ユーザーが成功するために必要な重要な情報です。

> [!WARNING]
> 潜在的なリスクがあるため、ユーザーの即時の注意を必要とする重要な内容です。

> [!CAUTION]
> 行動の負の潜在的結果について警告します。
```

> [!NOTE]
> ユーザーが読み飛ばしても考慮すべき情報を強調します。

> [!TIP]
> ユーザーがより成功するためのオプション情報を提供します。

> [!IMPORTANT]
> ユーザーが成功するために必要な重要な情報です。

> [!WARNING]
> 潜在的なリスクがあるため、ユーザーの即時の注意を必要とする重要な

内容です。

> [!CAUTION]
> 行動の負の潜在的結果について警告します。

## コードブロックのシンタックスハイライト

VitePressは、[Shiki](https://github.com/shikijs/shiki)を使用して、Markdownコードブロック内の言語構文を色付きテキストでハイライトします。Shikiはさまざまなプログラミング言語をサポートしています。コードブロックの開始バックティックに有効な言語エイリアスを追加するだけです。

**入力**

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**出力**

```js
export default {
  name: 'MyComponent'
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

[有効な言語のリスト](https://shiki.style/languages)はShikiのリポジトリで確認できます。

アプリの設定でシンタックスハイライトテーマをカスタマイズすることもできます。詳細は[`markdown`オプション](../reference/site-config#markdown)を参照してください。

## コードブロックの行ハイライト

**入力**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**出力**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

単一の行だけでなく、複数の単一行、範囲、またはその両方を指定することもできます。

- 行の範囲：例えば`{5-8}`、`{3-10}`、`{10-17}`
- 複数の単一行：例えば`{4,7,9}`
- 行の範囲と単一行：例えば`{4,7-13,16,23-27,40}`

**入力**

````
```js{1,4,6-8}
export default { // ハイライトされた行
  data () {
    return {
      msg: `Highlighted!
      この行はハイライトされていませんが、
      これと次の2行はハイライトされています。`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**出力**

```js{1,4,6-8}
export default { // ハイライトされた行
  data () {
    return {
      msg: `Highlighted!
      この行はハイライトされていませんが、
      これと次の2行はハイライトされています。`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

また、`// [!code highlight]`コメントを使用して行内で直接ハイライトすることもできます。

**入力**

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!!code highlight]
    }
  }
}
```
````

**出力**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```

## コードブロックのフォーカス

行に`// [!code focus]`コメントを追加すると、その行がフォーカスされ、他の部分がぼやけます。

また、`// [!code focus:<行数>]`を使用して、フォーカスする行数を定義することもできます。

**入力**

````
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!!code focus]
    }
  }
}
```
````

**出力**

```js
export default {
  data() {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## コードブロックのカラードディフ

行に`// [!code --]`または`// [!code ++]`コメントを追加すると、その行のディフが作成され、コードブロックの色が保持されます。

**入力**

````
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!!code --]
      msg: 'Added' // [!!code ++]
    }
  }
}
```
````

**出力**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## コードブロックのエラーと警告

行に`// [!code warning]`または`// [!code error]`コメントを追加すると、それに応じた色で表示されます。

**入力**

````
```js
export default {
  data () {
    return {
      msg: 'Error', // [!!code error]
      msg: 'Warning' // [!!code warning]
    }
  }
}
```
````

**出力**

```js
export default {
  data() {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## 行番号

コードブロックごとに行番号を有効にするには、設定を行います。

```js
export default {
  markdown: {
    lineNumbers: true
  }
}
```

詳細は[`markdown`オプション](../reference/site-config#markdown)を参照してください。

フェンス付きコードブロックに`:line-numbers`または`:no-line-numbers`マークを追加して、設定された値を上書きできます。

行番号の開始位置をカスタマイズすることもできます。例えば、`:line-numbers=2`とすると、コードブロックの行番号が2から始まります。

**入力**

````md
```ts {1}
// デフォルトで行番号は無効です
const line2 = 'これは2行目です'
const line3 = 'これは3行目です'
```

```ts:line-numbers {1}
// 行番号が有効です
const line2 = 'これは2行目です'
const line3 = 'これは3行目です'
```

```ts:line-numbers=2 {1}
// 行番号が有効で2から開始します
const line3 = 'これは3行目です'
const line4 = 'これは4行目です'
```
````

**出力**

```ts {1}
// デフォルトで行番号は無効です
const line2 = 'これは2行目です'
const line3 = 'これは3行目です'
```

```ts:line-numbers {1}
// 行番号が有効です
const line2 = 'これは2行目です'
const line3 = 'これは3行目です'
```

```ts:line-numbers=2 {1}
// 行番号が有効で2から開始します
const line3 = 'これは3行目です'
const line4 = 'これは4行目です'
```

## コードスニペットのインポート

既存のファイルからコードスニペットをインポートできます。

```md
<<< @/filepath
```

[行ハイライト](#line-highlighting-in-code-blocks)もサポートしています。

```md
<<< @/filepath{highlightLines}
```

**入力**

```md
<<< @/snippets/snippet.js{2}
```

**コードファイル**

<!-- <<< @/snippets/snippet.js -->

**出力**

<!-- <<< @/snippets/snippet.js{2} -->

::: tip
`@`の値はソースルートに対応します。デフォルトではVitePressプロジェクトのルートですが、`srcDir`が設定されている場合は異なります。また、相対パスからもインポートできます。

```md
<<< ../snippets/snippet.js
```

:::

[VS Codeのリージョン](https://code.visualstudio.com/docs/editor/codebasics#_folding)を使用して、コードファイルの対応する部分のみを含めることもできます。ファイルパスの後に`#`を付けてカスタムリージョン名を指定できます。

**入力**

```md
<<< @/snippets/snippet-with-region.js#snippet{1}
```

**コードファイル**

<!-- <<< @/snippets/snippet-with-region.js -->

**出力**

<!-- <<< @/snippets/snippet-with-region.js#snippet{1} -->

中括弧内に言語を指定することもできます。

```md
<<< @/snippets/snippet.cs{c#}

<!-- 行のハイライト付き: -->

<<< @/snippets/snippet.cs{1,2,4-6 c#}

<!-- 行番号付き: -->

<<< @/

snippets/snippet.cs{1,2,4-6 c#:line-numbers}
```

ファイル拡張子からソース言語が推測できない場合に便利です。

## コードグループ

複数のコードブロックをグループ化できます。

**入力**

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

**出力**

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

コードグループ内で[スニペットをインポート](#import-code-snippets)することもできます。

**入力**

```md
::: code-group

<!-- ファイル名はデフォルトでタイトルとして使用されます -->

<<< @/snippets/snippet.js

<!-- カスタムタイトルも指定できます -->

<<< @/snippets/snippet-with-region.js#snippet{1,2 ts:line-numbers} [リージョンスニペット]

:::
```

**出力**

::: code-group

<!-- <<< @/snippets/snippet.js -->

<!-- <<< @/snippets/snippet-with-region.js#snippet{1,2 ts:line-numbers} [リージョンスニペット] -->

:::

## Markdownファイルのインクルード

Markdownファイルを別のMarkdownファイルにインクルードできます。ネストも可能です。

::: tip
Markdownパスの前に`@`を付けることもできます。これにより、ソースルートとして機能します。デフォルトではVitePressプロジェクトのルートですが、`srcDir`が設定されている場合は異なります。
:::

例えば、次のようにして相対的なMarkdownファイルをインクルードできます。

**入力**

```md
# ドキュメント

## 基本

<!--@include: ./parts/basics.md-->
```

**パートファイル**（`parts/basics.md`）

```md
基本的な入門内容。

### 設定

`.foorc.json`を使用して作成できます。
```

**同等のコード**

```md
# ドキュメント

## 基本

基本的な入門内容。

### 設定

`.foorc.json`を使用して作成できます。
```

行範囲を選択することもできます。

**入力**

```md
# ドキュメント

## 基本

<!--@include: ./parts/basics.md{3,}-->
```

**パートファイル**（`parts/basics.md`）

```md
基本的な入門内容。

### 設定

`.foorc.json`を使用して作成できます。
```

**同等のコード**

```md
# ドキュメント

## 基本

### 設定

`.foorc.json`を使用して作成できます。
```

選択する行範囲の形式は次のとおりです：`{3,}`、`{,10}`、`{1,10}`

[VS Codeのリージョン](https://code.visualstudio.com/docs/editor/codebasics#_folding)を使用して、コードファイルの対応する部分のみを含めることもできます。ファイルパスの後に`#`を付けてカスタムリージョン名を指定できます。

**入力**

```md
# ドキュメント

## 基本

<!--@include: ./parts/basics.md#basic-usage{,2}-->
<!--@include: ./parts/basics.md#basic-usage{5,}-->
```

**パートファイル**（`parts/basics.md`）

```md
<!-- #region basic-usage -->
## 使用法ライン1

## 使用法ライン2

## 使用法ライン3
<!-- #endregion basic-usage -->
```

**同等のコード**

```md
# ドキュメント

## 基本

## 使用法ライン1

## 使用法ライン3
```

::: warning
ファイルが存在しない場合でもエラーは発生しません。この機能を使用する際は、内容が期待通りにレンダリングされていることを確認してください。
:::

## 数式

現在、この機能はオプトインです。これを有効にするには、`markdown-it-mathjax3`をインストールし、設定ファイルで`markdown.math`を`true`に設定する必要があります。

```sh
npm add -D markdown-it-mathjax3
```

```ts
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```

**入力**

```md
$a \ne 0$のとき、$(ax^2 + bx + c = 0)$には2つの解があり、それらは
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
です。

**マクスウェルの方程式：**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | $\vec{\mathbf{B}}$の発散はゼロ                                                          |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | $\vec{\mathbf{E}}$のカールは$\vec{\mathbf{B}}$の変化率に比例する                        |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |
```

**出力**

$a \ne 0$のとき、$(ax^2 + bx + c = 0)$には2つの解があり、それらは
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
です。

**マクスウェルの方程式：**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | $\vec{\mathbf{B}}$の発散はゼロ                                                          |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | $\vec{\mathbf{E}}$のカールは$\vec{\mathbf{B}}$の変化率に比例する                        |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

## 画像の遅延読み込み

設定ファイルで`lazyLoading`を`true`に設定すると、Markdown経由で追加された各画像に対して遅延読み込みを有効にできます。

```js
export default {
  markdown: {
    image: {
      // 画像の遅延読み込みはデフォルトで無効です
      lazyLoading: true
    }
  }
}
```

## 高度な設定

VitePressは、Markdownレンダラーとして[markdown-it](https://github.com/markdown-it/markdown-it)を使用しています。上記の多くの拡張機能はカスタムプラグインを通じて実装されています。`.vitepress/config.js`で`markdown`オプションを使用して、`markdown-it`インスタンスをさらにカスタマイズできます。

```js
import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFoo from 'markdown-it-foo'

export default defineConfig({
  markdown: {
    // markdown-it-anchorのオプション
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: markdownItAnchor.permalink.headerLink()
    },

    // @mdit-vue/plugin-tocのオプション
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },

    config: (

md) => {
      // さらに多くのmarkdown-itプラグインを使用
      md.use(markdownItFoo)
    }
  }
})
```

設定可能なプロパティの完全なリストについては、[設定リファレンス：アプリ設定](../reference/site-config#markdown)を参照してください。