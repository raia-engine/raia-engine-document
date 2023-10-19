# Mac に Raia の開発環境を構築する

この記事では Mac に Raia の開発環境を構築する方法を解説します。

[[TOC]]

## 0. 検証した環境について

使用した Mac の環境は以下のとおりです。

- マシン: Mac mini
- チップ: Apple M1
- メモリ: 16GB
- OS: macOS Ventura バージョン 13.2

環境構築は Mac を工場出荷時の設定にリセットした状態から行っています。

::: details 工場出荷時の設定にリセット
検証環境では「すべてのコンテンツと設定を消去」を使って macOS を工場出荷時の設定にリセットしています。詳しくは
[Mac を消去して工場出荷時の設定にリセットする](https://support.apple.com/ja-jp/HT212749)を参照してください。
:::

### ターミナルを起動する方法

開発環境を構築するのにターミナルを使用します。ターミナルは「アプリケーション」フォルダの「ユーティリティ」サブフォルダにあります。

::: details Spotlight からアプリケーションを起動する
Mac では Spotlightからアプリケーションを起動することができます。

- Mac のメニューバーで Spotlight アイコン をクリックするか、⌘ + Space を押します。
- 検索フィールドにアプリケーションの名前を入力します。今回は「ターミナル」と入力します。
- Enter を押すか、検索結果のアプリケーション名をクリックして実行します。
:::

### 作業ディレクトリについて

このドキュメントでは開発環境を構築するディレクトリに `~/` を使用するもの仮定として解説をします。

自分が普段使用しているディレクトリに置き換えて読み進めてください。

### 適切に環境構築するために

Raia は多数のサードパーティ製ライブラリを使用しています。その多くは活発に開発されているため、このドキュメントの解説が最新のものとは異なる可能性があることに留意してください。

## 1. Xcodeをインストールする

Mac の App Store から [Xcode を入手](https://apps.apple.com/jp/app/xcode/id497799835?mt=12)します。

ダウンロードに時間がかかるので、完了するまで待ちます。

### ライセンスに同意する

```sh
sudo xcodebuild -license
```

ターミナルに表示されるライセンスを読んだのち、同意できたら `agree` と打ち込んでください。

## 2. コマンドラインツールをインストールする

ターミナルに以下のコマンドを入力して、コマンドラインツールをインストールします。

```sh
xcode-select --install
```

ポップアップウィンドウが表示され、デベロッパーツールをインストールするかどうかを尋ねられます。インストールを続行するための指示に従ってください。

::: details 詳細な手順

- 「インストール」をクリックします。
- 「同意する」をクリックします。
  - ソフトウェアのダウンロードとインストールが開始されます（検証環境では10分程度かかりました）
- 「完了」をクリックします。
:::

### インストールの確認をする

以下のコマンドをターミナルに入力して、正しくインストールされたことを確認します。

```sh
git -v
```

このコマンドを実行すると、インストールされた `git` のバージョン情報が表示されます。バージョン情報が表示されたら、コマンドラインツールのインストールに成功しています。

::: details 検証した環境での結果と補足
検証した環境では次のようなメッセージが表示されました。

```txt
git version 2.39.2 (Apple Git-143)
```

なお、工場出荷時の状態で `git` 等のコマンドを実行しようとすると、`xcode-select --install` を実行したときと同様に、コマンドデベロッパーツールをインストールするためのポップアップが表示されます。
:::

## 3. Homebrew をインストールする

[Homebrew のウェブサイト](https://brew.sh)のトップページにあるコマンドをターミナルで実行します。

検証環境で使用したコマンドは以下のとおりです。

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

パスワードを求められるのでMacのパスワードを入力します。Enter を押して続行するとインストールが始まります。

### Homebrew のパスを通す

インストールが完了したら、ターミナルに表示されている `==> Next steps` の項の `... Homebrew to your PATH:` に続くコマンドをターミナルで実行します。

```sh
例:
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/UserName/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

::: warning 注意点
`/UserName/` の箇所を自分のユーザー名に置き換えて実行してください。
:::

## GCC-13 をインストールする

ompによるGPU処理で使用します。

```sh
brew install gcc-13
```

## 4. Ninjaをインストールする

次のコマンドを実行して、Ninjaをインストールします。

```sh
brew install ninja
```

## 5. Raia リポジトリをクローンする

`cd` コマンドを使用して作業ディレクトリに移動します。

```sh
# 例:
cd ~/
```

### リポジトリをクローンする

`git clone` コマンドを使って、リポジトリをクローンします:

```sh
git clone https://github.com/dolphilia/raia-engine.git
```

## 6. ANGLE をビルドする

`cd` コマンドを使用して作業ディレクトリに移動します。

```sh
# 例:
cd ~/raia/third_party
```

### depot_tools をクローンする

`git clone` コマンドを実行して depot_tools リポジトリをクローンします。

```sh
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

### パスを通す

`export` コマンドを使用して depot_tools のパスを通します。

```sh
# 例:
export PATH=~/$PWD/depot_tools:$PATH
```

### ANGLE のソースコードを取得する

depot_tools の `fetch` を使って ANGLE のソースコードを取得します。

```sh
mkdir angle
cd angle
fetch angle
```

ダウンロードに時間がかかるので、完了するまで待ちます。

### ninja ファイルを生成する

depot_tools の `gn gen` コマンドを使用して ninja ファイルを生成します。

```sh
gn gen out/Release
```

### コンパイルする

depot_toolsの `autoninja` を使ってコンパイルします。

```sh
autoninja -C out/Release
```

コンパイルには時間がかかるので、完了まで待ちます。

### 生成された共有ライブラリを確認する

以下の共有ライブラリが `~/raia/third_party/angle/out/Release` ディレクトリに生成されていることを確認してください。

- `libc++_chrome.dylib`
- `libchrome_zlib.dylib`
- `libEGL.dylib`
- `libGLESv2.dylib`
- `libthird_party_abseil-cpp_absl.dylib`

### 共有ライブラリを Raia コピーする

先ほどの共有ライブラリを `~/raia/sdk/macos/arm64/lib` にコピーします。

### ヘッダーファイルを Raia コピーする

`~/raia/third_party/angle/include` 内のすべてのファイルを `~/raia/sdk/macos/arm64/include` にコピーする。

## 7. V8 をビルドする

ディレクトリを作成して移動します。

```sh
mkdir v8
cd v8
```

### クローンして移動する

depot_tools の `fetch` を使用して、V8をクローンします。

```sh
fetch v8
```

V8 のクローンには時間がかかるので、完了まで待ちます。

### クローンしたディレクトリを移動する

`cd` コマンドでクローンしたディレクトリに移動します。

```sh
cd v8
```

### V8 のバージョンを指定する

次のコマンドを実行して、正常な動作を確認しているバージョンに設定します。

```sh
git checkout refs/tags/11.7.115
gclient sync -D
```

### V8 の ninja ファイルを生成する

`python3` コマンドを使って ninja ファイルを生成します。

```sh
python3 tools/dev/v8gen.py arm64.release
```

### ビルドの設定ファイルを編集する

`vi` などのエディターを使用してビルドの設定ファイル `args.gn` を編集します。

```sh
# 例
vi ~/raia/third_party/v8/v8/out.gn/arm64.release/args.gn
```

内容を次のように書き換えて保存してください。

```txt
dcheck_always_on = false
is_component_build = false
is_debug = false
target_cpu = "arm64"
use_custom_libcxx = false
v8_monolithic = true
v8_enable_sandbox = false
v8_use_external_startup_data = false
v8_enable_pointer_compression = false
v8_enable_31bit_smis_on_64bit_arch = false
```

::: details メモ: WindowsでV8をビルドするときのargs.gnの設定

Windows向けの解説記事を書くまで、ここにメモを残しておきます。

```txt
is_debug = false
target_cpu = "x64"
treat_warnings_as_errors = false
is_component_build = false
v8_enable_i18n_support = false
symbol_level = 0
v8_use_external_startup_data = false
v8_static_library = true
v8_enable_i18n_support = false
v8_monolithic = true
use_custom_libcxx = false #おそらく削除
v8_enable_pointer_compression = false
```

:::

### V8 をコンパイルする

`ninja` コマンドを使用して V8 をコンパイルします。

```sh
ninja -C out.gn/arm64.release v8_monolith
```

コンパイルには時間がかかるので、完了まで待ちます。

### 生成された静的ライブラリの確認

以下の静的ライブラリが `~/raia/third_party/v8/v8/out.gn/arm64.release/obj` ディレクトリに生成されているのを確認してください。

- `libv8_monolith.a`
- `libv8_libbase.a`
- `libv8_libplatform.a`

`libv8_monolith.a` は容量が大きいので注意してください。

### 静的ライブラリを Raia にコピーする

先ほど確認した静的ライブラリを `~/raia/sdk/macos/arm64/lib` にコピーします。

### ヘッダーファイルのコピー

`~/raia/third_party/v8/v8/include` にあるヘッダーファイルを `~/raia/sdk/macos/arm64/include` にコピーします。

## 8. GLFW をビルドする

### GLFW をクローンする

```sh
git clone https://github.com/glfw/glfw.git
```

### GLFW をビルドする

```sh
mkdir build
cd build
cmake ..
cmake --build  .
```

## mruby をセットアップする

```sh
git clone https://github.com/mruby/mruby.git
cd mruby
make
cd ../
cp mruby/build/host/lib/libmruby_core.a ../sdk/macos/arm64/lib
cp mruby/build/host/lib/libmruby.a ../sdk/macos/arm64/lib
rsync -av mruby/build/host/include/ ../sdk/macos/arm64/include/
```
