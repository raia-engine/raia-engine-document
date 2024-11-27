# Mesonの使用

Meson はできるだけ簡単に使用できるように設計されています。このページでは、インストール、トラブルシューティング、標準的な使用に必要な最初のステップを概説します。

より高度な設定については、コマンドラインヘルプ meson --help、または Mesonbuild ウェブサイトにある Meson ドキュメントを参照してください。

目次

- 必要条件
- パッケージマネージャを使ったインストール
- Pythonを使ったインストール
- ソースからのインストール
- トラブルシューティング
- Mesonプロジェクトのコンパイル
- ディストロのパッケージャーとしてのMesonの使用

## 必要条件

- Python 3
- Ninja

Ninja は、Ninja バックエンドを使用する場合のみ必要です。Meson は、VS と Xcode のネイティブなプロジェクトファイルを生成することもできます。

## パッケージマネージャによるインストール

Ubuntu:

```
$ sudo apt-get install python3 python3-pip python3-setuptools \
                       python3-wheel ninja-build
```

ディストロのパッケージソフトは、頻繁なリリースサイクルと開発スピードの関係で、すぐに古くなってしまうことがあります。

## Pythonを使ったインストール

必要条件: pip3

Mesonbuildの最新バージョンを受け取るための最良の方法です。

ローカルユーザーとしてインストールする（推奨）。

```
$ pip3 install --user meson
```

rootでインストールします。

```
$ pip3 install meson
```

rootでインストールするか、ローカルユーザーでインストールするか迷った場合は、ローカルユーザーでインストールします。

## ソースからのインストール

必要条件: git

Meson はクローンした git リポジトリから直接実行することができます。

```
$ git clone https://github.com/mesonbuild/meson.git /path/to/sourcedir
```

## トラブルシューティング:

共通の課題

```
$ meson setup builddir
$ bash: /usr/bin/meson: No such file or directory
```

説明python pipモジュールのインストール用のデフォルトのプレフィックスが、シェル環境のPATHに含まれていない。python pipのインストールモジュールのデフォルトのプレフィクスは、/usr/local以下に配置されています。

**解決方法この問題は、デフォルトのシェル環境の PATH に /usr/local/bin が含まれるように変更することで解決します。**

> 注意：この問題を解決する方法として、シンボリックリンクを使用する、バイナリをデフォルトパスにコピーするなどの方法がありますが、これらの方法はパッケージ管理の相互運用性を損なう可能性があるため、推奨またはサポートされていません。

## Mesonプロジェクトのコンパイル

Meson の最も一般的な使用例は、作業中のコード ベースでコードをコンパイルすることです。取るべき手順は非常にシンプルです。

```
$ cd /path/to/source/root
$ meson setup builddir && cd builddir
$ meson compile
$ meson test
```

唯一の注意点は、ビルドディレクトリを別に作成する必要があることです。Meson はソースツリーの中でソースコードをビルドすることを許しません。ビルドの成果物はすべてビルドディレクトリに格納されます。これにより、異なる設定を持つ複数のビルドツリーを同時に持つことができます。このようにして、生成されたファイルが誤ってリビジョン管理に追加されることがありません。

コード変更後に再コンパイルするには、meson compile と入力するだけです。ビルドコマンドは常に同じものです。ソースコードとビルドシステムファイルに対して任意の変更を行うことができ、Meson はそれを検出して正しい処理を行います。最適化されたバイナリをビルドしたい場合は、Meson の実行時に --buildtype=debugoptimized という引数を使用するだけです。ビルドディレクトリは、最適化されていないビルド用と、最適化されたビルド用の 2 つを用意することをお勧めします。任意の構成をコンパイルするには、対応するビルド・ディレクトリに移動して、meson compile を実行するだけです。

Mesonは、デバッグ情報とコンパイラー警告を有効にするためのコンパイラーフラグを自動的に追加します（すなわち、-gと-Wall）。つまり、ユーザーはそれらに対処する必要がなく、代わりにコーディングに集中することができます。

## Mesonをディストロのパッケージャーとして使用する

ディストリビューションパッケージャは通常、使用するビルドフラグを完全に制御したいと考えます。Meson はこの使用方法をネイティブにサポートします。Meson プロジェクトのビルドとインストールに必要なコマンドは次のとおりです。

```
$ cd /path/to/source/root
$ meson --prefix /usr --buildtype=plain builddir -Dc_args=... -Dcpp_args=... -Dc_link_args=... -Dcpp_link_args=...
$ meson compile -C builddir
$ meson test -C builddir
$ DESTDIR=/path/to/staging/root meson install -C builddir
```

コマンドラインスイッチ --buildtype=plain は、Meson に自分自身のフラグをコマンドラインに追加しないよう指示します。これにより、パッケージャは使用するフラグを完全に制御できるようになります。

これは他のビルドシステムと非常によく似ています。唯一の違いは、 DESTDIR 変数が meson install の引数としてではなく、環境変数として渡されることです。

ディストロのビルドは常にスクラッチから行われるので、あなたのパッケージでユニティビルドを有効にすることを考えるかもしれません。なぜなら、ユニティの方が速く、より良いコードを生成するからです。しかし、unity builds を有効にしてもビルドされないプロジェクトがたくさんあるので、unity builds を使うかどうかはパッケージャがケースバイケースで判断しなければなりません。
