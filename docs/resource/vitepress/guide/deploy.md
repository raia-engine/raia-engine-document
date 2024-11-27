# VitePressサイトのデプロイ

::: details 原文
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/guide/deploy.md
:::

以下のガイドは、いくつかの共通の前提に基づいています。

- VitePressサイトはプロジェクトの`docs`ディレクトリ内にあります。
- デフォルトのビルド出力ディレクトリ（`.vitepress/dist`）を使用しています。
- VitePressはプロジェクトにローカル依存としてインストールされており、`package.json`に以下のスクリプトが設定されています。

  ```json
  {
    "scripts": {
      "docs:build": "vitepress build docs",
      "docs:preview": "vitepress preview docs"
    }
  }
  ```

## ローカルでのビルドとテスト

1. ドキュメントをビルドするには、次のコマンドを実行します。

   ```sh
   $ npm run docs:build
   ```

2. ビルドが完了したら、次のコマンドを実行してローカルでプレビューします。

   ```sh
   $ npm run docs:preview
   ```

   `preview`コマンドは、ローカルの静的ウェブサーバーを起動し、出力ディレクトリ`.vitepress/dist`を`http://localhost:4173`で提供します。これにより、本番環境にプッシュする前に、すべてが正しく表示されていることを確認できます。

3. `--port`引数を指定してサーバーのポートを設定できます。

   ```json
   {
     "scripts": {
       "docs:preview": "vitepress preview docs --port 8080"
     }
   }
   ```

   これで、`docs:preview`メソッドはサーバーを`http://localhost:8080`で起動します。

## 公開ベースパスの設定

デフォルトでは、サイトはドメインのルートパス（`/`）にデプロイされることを前提としています。サイトがサブパス（例：`https://mywebsite.com/blog/`）で提供される場合、VitePressの設定で[`base`](../reference/site-config#base)オプションを`'/blog/'`に設定する必要があります。

**例:** GitHub（またはGitLab）Pagesを使用し、`user.github.io/repo/`にデプロイする場合、`base`を`/repo/`に設定します。

## HTTPキャッシュヘッダー

本番サーバーでHTTPヘッダーを制御できる場合、`cache-control`ヘッダーを設定して、再訪時のパフォーマンスを向上させることができます。

プロダクションビルドでは、静的アセット（JavaScript、CSS、および`public`にない他のインポートされたアセット）に対してハッシュされたファイル名が使用されます。ブラウザの開発者ツールのネットワークタブを使用してプロダクションプレビューを確認すると、`app.4f283b18.js`のようなファイルが表示されます。

この`4f283b18`ハッシュは、このファイルの内容から生成されます。同じハッシュURLは同じファイル内容を提供することが保証されており、内容が変更されるとURLも変更されます。これにより、これらのファイルには最強のキャッシュヘッダーを安全に使用できます。すべてのファイルは出力ディレクトリ内の`assets/`フォルダに配置されるため、これらのファイルには次のヘッダーを設定できます。

```
Cache-Control: max-age=31536000,immutable
```

::: details Netlifyの`_headers`ファイルの例

```
/assets/*
  cache-control: max-age=31536000
  cache-control: immutable
```

注: `_headers`ファイルは[publicディレクトリ](./asset-handling#the-public-directory)に配置する必要があります。今回の例では、`docs/public/_headers`に配置され、出力ディレクトリにそのままコピーされます。

[Netlifyのカスタムヘッダーに関するドキュメント](https://docs.netlify.com/routing/headers/)

:::

::: details Vercelの`vercel.json`設定例

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

注: `vercel.json`ファイルはリポジトリのルートに配置する必要があります。

[Vercelのヘッダー設定に関するドキュメント](https://vercel.com/docs/concepts/projects/project-configuration#headers)

:::

## プラットフォーム別ガイド

### Netlify / Vercel / Cloudflare Pages / AWS Amplify / Render

新しいプロジェクトをセットアップし、ダッシュボードで次の設定を変更します。

- **ビルドコマンド:** `npm run docs:build`
- **出力ディレクトリ:** `docs/.vitepress/dist`
- **Nodeバージョン:** `18`（またはそれ以上）

::: warning
HTMLコードの_自動最適化_などのオプションは有効にしないでください。Vueにとって重要なコメントが出力から削除され、ハイドレーションの不一致エラーが発生する可能性があります。
:::

### GitHub Pages

1. プロジェクトの`.github/workflows`ディレクトリ内に`deploy.yml`という名前のファイルを作成し、以下の内容を記述します。

   ```yaml
   # VitePressサイトをGitHub Pagesにデプロイするためのサンプルワークフロー
   #
   name: Deploy VitePress site to Pages

   on:
     # `main`ブランチにプッシュされたときに実行されます。デフォルトブランチが`master`の場合は、`master`に変更してください。
     push:
       branches: [main]

     # Actionsタブから手動でこのワークフローを実行できるようにします
     workflow_dispatch:

   # GitHub Pagesへのデプロイを許可するためのGITHUB_TOKENの権限を設定します
   permissions:
     contents: read
     pages: write
     id-token: write

   # 同時に進行中の実行をスキップして、最後のキューに入った実行を続行します。
   # ただし、進行中の実行はキャンセルせず、これらのプロダクションデプロイが完了するようにします。
   concurrency:
     group: pages
     cancel-in-progress: false

   jobs:
     # ビルドジョブ
     build:
       runs-on: ubuntu-latest
       steps:
         - name: チェックアウト
           uses: actions/checkout@v4
           with:
             fetch-depth: 0 # lastUpdatedが有効でない場合は不要です
         # - uses: pnpm/action-setup@v3 # pnpmを使用している場合はこの行を有効にします
         # - uses: oven-sh/setup-bun@v1 # Bunを使用している場合はこの行を有効にします
         - name: Nodeのセットアップ
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm # またはpnpm / yarn
         - name: Pagesのセットアップ
           uses: actions/configure-pages@v4
         - name: 依存関係のインストール
           run: npm ci # またはpnpm install / yarn install / bun install
         - name: VitePressでビルド
           run: npm run docs:build # またはpnpm docs:build / yarn docs:build / bun run docs:build
         - name: アーティファクトのアップロード
           uses: actions/upload-pages-artifact@v3
           with:
             path: docs/.vitepress/dist

     # デプロイジョブ
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       needs: build
       runs-on: ubuntu-latest
       name: デプロイ
       steps:
         - name: GitHub Pagesへのデプロイ
           id: deployment
           uses: actions/deploy-pages@v4
   ```

   ::: warning
   VitePressの`base`オプションが適切に設定されていることを確認してください。詳細は[公開ベースパスの設定](#setting-a-public-base-path)を参照してください。
   :::

2.

 リポジトリの設定の「Pages」メニュー項目で、「ビルドとデプロイ > ソース」で「GitHub Actions」を選択します。

3. 変更を`main`ブランチにプッシュし、GitHub Actionsワークフローが完了するのを待ちます。設定に応じて、サイトは`https://<username>.github.io/[repository]/`または`https://<custom-domain>/`にデプロイされるはずです。サイトは、`main`ブランチへのプッシュごとに自動的にデプロイされます。

### GitLab Pages

1. VitePressの設定で`outDir`を`../public`に設定します。`https://<username>.gitlab.io/<repository>/`にデプロイする場合は、`base`オプションを`'/<repository>/'`に設定します。カスタムドメイン、ユーザーまたはグループページにデプロイする場合や、GitLabで「ユニークドメインを使用」設定が有効になっている場合は、`base`は不要です。

2. プロジェクトのルートに`.gitlab-ci.yml`という名前のファイルを作成し、以下の内容を記述します。これにより、コンテンツに変更が加えられるたびにサイトがビルドおよびデプロイされます。

   ```yaml
   image: node:18
   pages:
     cache:
       paths:
         - node_modules/
     script:
       # - apk add git # 小さいDockerイメージ（例：alpine）を使用していて、lastUpdatedが有効な場合はこの行を有効にします
       - npm install
       - npm run docs:build
     artifacts:
       paths:
         - public
     only:
       - main
   ```

### Azure Static Web Apps

1. [公式ドキュメント](https://docs.microsoft.com/en-us/azure/static-web-apps/build-configuration)に従います。

2. 設定ファイルで次の値を設定し、不要なもの（`api_location`など）は削除します。

   - **`app_location`**: `/`
   - **`output_location`**: `docs/.vitepress/dist`
   - **`app_build_command`**: `npm run docs:build`

### Firebase

1. プロジェクトのルートに`firebase.json`と`.firebaserc`を作成します。

   `firebase.json`:

   ```json
   {
     "hosting": {
       "public": "docs/.vitepress/dist",
       "ignore": []
     }
   }
   ```

   `.firebaserc`:

   ```json
   {
     "projects": {
       "default": "<YOUR_FIREBASE_ID>"
     }
   }
   ```

2. `npm run docs:build`を実行した後、次のコマンドを実行してデプロイします。

   ```sh
   firebase deploy
   ```

### Surge

1. `npm run docs:build`を実行した後、次のコマンドを実行してデプロイします。

   ```sh
   npx surge docs/.vitepress/dist
   ```

### Heroku

1. [`heroku-buildpack-static`](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-static)に記載されているドキュメントとガイドに従います。

2. プロジェクトのルートに`static.json`というファイルを作成し、以下の内容を記述します。

   ```json
   {
     "root": "docs/.vitepress/dist"
   }
   ```

### Edgio

[EdgioにVitePressアプリを作成してデプロイする](https://docs.edg.io/guides/vitepress)を参照してください。

### Kinsta Static Site Hosting

[Kinsta](https://kinsta.com/static-site-hosting/)にVitePressサイトをデプロイするには、[これらの手順](https://kinsta.com/docs/vitepress-static-site-example/)に従ってください。

### Stormkit

[Stormkit](https://www.stormkit.io)にVitePressプロジェクトをデプロイするには、[これらの手順](https://stormkit.io/blog/how-to-deploy-vitepress)に従ってください。

### Nginx

以下はNginxサーバーブロック設定の例です。この設定には、一般的なテキストベースのアセットに対するgzip圧縮、VitePressサイトの静的ファイルを適切なキャッシュヘッダーで提供するルール、および`cleanUrls: true`の処理が含まれています。

```nginx
server {
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    listen 80;
    server_name _;
    index index.html;

    location / {
        # コンテンツの場所
        root /app;

        # 正確な一致 -> クリーンURLのリバース -> フォルダ -> 見つからない
        try_files $uri $uri.html $uri/ =404;

        # 存在しないページ
        error_page 404 /404.html;

        # この設定ではindex.htmlがないフォルダは403を返します
        error_page 403 /404.html;

        # キャッシュヘッダーを調整
        # assetsフォルダ内のファイルにはハッシュ付きファイル名があります
        location ~* ^/assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

この設定では、ビルドされたVitePressサイトがサーバーの`/app`ディレクトリに配置されていることを前提としています。サイトのファイルが他の場所にある場合は、`root`ディレクティブを適切に調整してください。

::: warning index.htmlをデフォルトにしないでください
try_filesの解決策は、他のVueアプリケーションのようにindex.htmlをデフォルトにしてはいけません。これにより、無効なページ状態が発生します。
:::

詳細は[公式nginxドキュメント](https://nginx.org/en/docs/)や、以下の議論[#2837](https://github.com/vuejs/vitepress/discussions/2837)、[#3235](https://github.com/vuejs/vitepress/issues/3235)、およびMehdi Merahによる[このブログ記事](https://blog.mehdi.cc/articles/vitepress-cleanurls-on-nginx-environment#readings)を参照してください。