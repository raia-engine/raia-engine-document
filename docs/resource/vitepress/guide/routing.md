# ルーティング

::: details 原文
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/guide/routing.md
:::

## ファイルベースのルーティング

VitePressはファイルベースのルーティングを使用しており、生成されるHTMLページはソースのMarkdownファイルのディレクトリ構造にマッピングされます。例えば、次のディレクトリ構造があるとします。

```
.
├─ guide
│  ├─ getting-started.md
│  └─ index.md
├─ index.md
└─ prologue.md
```

生成されるHTMLページは以下のようになります。

```
index.md                  -->  /index.html (ルートとしてアクセス可能)
prologue.md               -->  /prologue.html
guide/index.md            -->  /guide/index.html (guideルートとしてアクセス可能)
guide/getting-started.md  -->  /guide/getting-started.html
```

生成されたHTMLは、静的ファイルを提供できる任意のWebサーバーでホストできます。

## ルートディレクトリとソースディレクトリ

VitePressプロジェクトのファイル構造には、**プロジェクトルート**と**ソースディレクトリ**という2つの重要な概念があります。

### プロジェクトルート

プロジェクトルートは、VitePressが`.vitepress`という特別なディレクトリを探す場所です。このディレクトリは、VitePressの設定ファイル、開発サーバーのキャッシュ、ビルド出力、およびオプションのテーマカスタマイズコードのために予約されています。

コマンドラインから`vitepress dev`または`vitepress build`を実行すると、VitePressは現在の作業ディレクトリをプロジェクトルートとして使用します。サブディレクトリをルートとして指定するには、コマンドに相対パスを渡す必要があります。例えば、VitePressプロジェクトが`./docs`にある場合、`vitepress dev docs`を実行します。

```
.
├─ docs                    # プロジェクトルート
│  ├─ .vitepress           # 設定ディレクトリ
│  ├─ getting-started.md
│  └─ index.md
└─ ...
```

```sh
vitepress dev docs
```

これにより、以下のソースからHTMLへのマッピングが生成されます。

```
docs/index.md            -->  /index.html (ルートとしてアクセス可能)
docs/getting-started.md  -->  /getting-started.html
```

### ソースディレクトリ

ソースディレクトリは、Markdownソースファイルが存在する場所です。デフォルトではプロジェクトルートと同じ場所ですが、[`srcDir`](../reference/site-config#srcdir)設定オプションで変更できます。

`srcDir`オプションはプロジェクトルートから相対的に解決されます。例えば、`srcDir: 'src'`の場合、ファイル構造は以下のようになります。

```
.                          # プロジェクトルート
├─ .vitepress              # 設定ディレクトリ
└─ src                     # ソースディレクトリ
   ├─ getting-started.md
   └─ index.md
```

この場合、生成されるソースからHTMLへのマッピングは以下のようになります。

```
src/index.md            -->  /index.html (ルートとしてアクセス可能)
src/getting-started.md  -->  /getting-started.html
```

## ページ間のリンク

ページ間をリンクする際には、絶対パスと相対パスの両方を使用できます。`.md`拡張子と`.html`拡張子の両方が機能しますが、VitePressが設定に基づいて最終的なURLを生成できるように、ファイル拡張子を省略するのが最善の方法です。

```md
<!-- 良い例 -->
[Getting Started](./getting-started)
[Getting Started](../guide/getting-started)

<!-- 良くない例 -->
[Getting Started](./getting-started.md)
[Getting Started](./getting-started.html)
```

画像などのアセットへのリンクについては、[アセットの取り扱い](./asset-handling)を参照してください。

### VitePress以外のページへのリンク

VitePressによって生成されていないサイト内のページにリンクしたい場合は、フルURLを使用するか、明示的にターゲットを指定する必要があります。

**入力**

```md
[Link to pure.html](/pure.html){target="_self"}
```

**出力**

[Link to pure.html](/pure.html){target="_self"}

::: tip 注記

Markdownリンクでは、`base`が自動的にURLに付加されます。つまり、ベース外のページにリンクする場合、リンク内で`../../pure.html`のようなものが必要になります（ブラウザによって現在のページから相対的に解決されます）。

または、アンカータグの構文を直接使用することもできます。

```md
<a href="/pure.html" target="_self">Link to pure.html</a>
```

:::

## クリーンURLの生成

::: warning サーバーサポートが必要
VitePressでクリーンなURLを提供するには、サーバーサイドのサポートが必要です。
:::

デフォルトでは、VitePressは受信リンクを`.html`で終わるURLに解決します。しかし、一部のユーザーは`.html`拡張子のない「クリーンURL」を好むかもしれません。例えば、`example.com/path.html`ではなく、`example.com/path`のように。

一部のサーバーやホスティングプラットフォーム（例えばNetlify、Vercel、GitHub Pages）は、リダイレクトなしで`/foo.html`が存在する場合にURL`/foo`をそのファイルにマッピングする機能を提供しています。

- NetlifyとGitHub Pagesはこれをデフォルトでサポートしています。
- Vercelでは、[`vercel.json`の`cleanUrls`オプション](https://vercel.com/docs/concepts/projects/project-configuration#cleanurls)を有効にする必要があります。

この機能が利用可能な場合、VitePressの[`cleanUrls`](../reference/site-config#cleanurls)設定オプションを有効にすることができます。

- ページ間の受信リンクは、`.html`拡張子なしで生成されます。
- 現在のパスが`.html`で終わっている場合、ルーターはクライアントサイドリダイレクトを実行して、拡張子のないパスにリダイレクトします。

ただし、サーバーでこのようなサポートを構成できない場合は、次のようなディレクトリ構造に手動で移行する必要があります。

```
.
├─ getting-started
│  └─ index.md
├─ installation
│  └─ index.md
└─ index.md
```

## ルートの書き換え

ソースディレクトリ構造と生成されたページの間のマッピングをカスタマイズできます。これは、複雑なプロジェクト構造がある場合に便利です。例えば、複数のパッケージを含むモノレポがあり、次のようにソースファイルと一緒にドキュメントを配置したいとします。

```
.
├─ packages
│  ├─ pkg-a
│  │  └─ src
│  │      ├─ pkg-a-code.ts
│  │      └─ pkg-a-docs.md
│  └─ pkg-b
│     └─ src
│         ├─ pkg-b-code.ts
│         └─ pkg-b-docs.md
```

そして、VitePressページを次のように生成したいとします。

```
packages/pkg-a/src/pkg-a-docs.md  -->  /pkg-a/index.html
packages/pkg-b/src/pkg-b-docs.md  -->  /pkg-b/index.html
```

これは、[`rewrites`](../reference/site-config#rewrites)オプションを次のように設定することで実現できます。

```ts
// .vitepress/config.js
export default {
  rewrites: {
    'packages/pkg-a/src/pkg-a-docs.md': 'pkg-a/index.md',
    'packages/pkg-b/src/pkg-b-docs.md': 'pkg-b/index.md'
  }
}
```

`rewrites`オプションは動的なルートパラメータもサポートしています。この例では、多くのパッケージがある場合、すべてのパスをリストアップする

のは冗長になるため、次のように設定を簡素化できます。

```ts
export default {
  rewrites: {
    'packages/:pkg/src/(.*)': ':pkg/index.md'
  }
}
```

書き換えパスは`path-to-regexp`パッケージを使用してコンパイルされます。詳細な構文については、その[ドキュメント](https://github.com/pillarjs/path-to-regexp#parameters)を参照してください。

::: warning 書き換えを使用した相対リンク

書き換えが有効な場合、**相対リンクは書き換え後のパスに基づいて作成する必要があります**。例えば、`packages/pkg-a/src/pkg-a-code.md`から`packages/pkg-b/src/pkg-b-code.md`に相対リンクを作成する場合、次のように記述します。

```md
[Link to PKG B](../pkg-b/pkg-b-code)
```
:::

## 動的ルート

単一のMarkdownファイルと動的データを使用して、複数のページを生成できます。例えば、プロジェクト内のすべてのパッケージに対応するページを生成する`packages/[pkg].md`ファイルを作成できます。ここで、`[pkg]`セグメントは他のページと区別するためのルート**パラメータ**です。

### パスローダーファイル

VitePressは静的サイトジェネレーターであるため、可能なページパスはビルド時に決定される必要があります。したがって、動的ルートページには**パスローダーファイル**が必要です。例えば、`packages/[pkg].md`の場合、`packages/[pkg].paths.js`（`.ts`もサポートされています）が必要です。

```
.
└─ packages
   ├─ [pkg].md         # ルートテンプレート
   └─ [pkg].paths.js   # ルートパスローダー
```

パスローダーは、`paths`メソッドを持つオブジェクトをデフォルトエクスポートとして提供する必要があります。`paths`メソッドは`params`プロパティを持つオブジェクトの配列を返します。これらのオブジェクトのそれぞれが対応するページを生成します。

次のような`paths`配列があるとします。

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [
      { params: { pkg: 'foo' }},
      { params: { pkg: 'bar' }}
    ]
  }
}
```

生成されるHTMLページは次のようになります。

```
.
└─ packages
   ├─ foo.html
   └─ bar.html
```

### 複数のパラメータ

動的ルートには複数のパラメータを含めることができます。

**ファイル構造**

```
.
└─ packages
   ├─ [pkg]-[version].md
   └─ [pkg]-[version].paths.js
```

**パスローダー**

```js
export default {
  paths: () => [
    { params: { pkg: 'foo', version: '1.0.0' }},
    { params: { pkg: 'foo', version: '2.0.0' }},
    { params: { pkg: 'bar', version: '1.0.0' }},
    { params: { pkg: 'bar', version: '2.0.0' }}
  ]
}
```

**出力**

```
.
└─ packages
   ├─ foo-1.0.0.html
   ├─ foo-2.0.0.html
   ├─ bar-1.0.0.html
   └─ bar-2.0.0.html
```

### パスの動的生成

パスローダーモジュールはNode.jsで実行され、ビルド時にのみ実行されます。任意のデータ（ローカルまたはリモート）を使用して、動的にパス配列を生成できます。

ローカルファイルからパスを生成する場合：

```js
import fs from 'fs'

export default {
  paths() {
    return fs
      .readdirSync('packages')
      .map((pkg) => {
        return { params: { pkg }}
      })
  }
}
```

リモートデータからパスを生成する場合：

```js
export default {
  async paths() {
    const pkgs = await (await fetch('https://my-api.com/packages')).json()

    return pkgs.map((pkg) => {
      return {
        params: {
          pkg: pkg.name,
          version: pkg.version
        }
      }
    })
  }
}
```

### ページでのパラメータの使用

パラメータを使用して、各ページに追加のデータを渡すことができます。Markdownルートファイルは、Vueの`$params`グローバルプロパティを介して現在のページパラメータにアクセスできます。

```md
- パッケージ名: {{ $params.pkg }}
- バージョン: {{ $params.version }}
```

また、[`useData`](../reference/runtime-api#usedata)ランタイムAPIを使用して、現在のページのパラメータにアクセスすることもできます。これは、MarkdownファイルとVueコンポーネントの両方で利用可能です。

```vue
<script setup>
import { useData } from 'vitepress'

// paramsはVueのrefです
const { params } = useData()

console.log(params.value)
</script>
```

### 生コンテンツのレンダリング

ページに渡されるパラメータはクライアントのJavaScriptペイロードでシリアライズされるため、パラメータに大きなデータ（例えば、リモートCMSから取得した生のMarkdownやHTMLコンテンツ）を渡すことは避けるべきです。

代わりに、`paths`オブジェクトの各パスに`content`プロパティを使用して、そのようなコンテンツを各ページに渡すことができます。

```js
export default {
  async paths() {
    const posts = await (await fetch('https://my-cms.com/blog-posts')).json()

    return posts.map((post) => {
      return {
        params: { id: post.id },
        content: post.content // 生のMarkdownまたはHTML
      }
    })
  }
}
```

次に、以下の特別な構文を使用して、コンテンツをMarkdownファイルの一部としてレンダリングします。

```md
<!-- @content -->
```