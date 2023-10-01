# macOSでRaiaEngineの開発環境を構築する

## 検証環境

使用したMacの環境は以下のとおりです。

- マシン: Mac mini
- チップ: Apple M1
- メモリ: 16GB
- OS: macOS Ventura バージョン 13.2

また、環境構築はMacを工場出荷時の設定にリセットした状態から行っています。

::: info 工場出荷時の設定にリセット

検証環境では「すべてのコンテンツと設定を消去」を使ってmacOSを工場出荷時の設定にリセットしています。詳しくは
[Mac を消去して工場出荷時の設定にリセットする](https://support.apple.com/ja-jp/HT212749)を参照してください。

:::

## コマンドラインデベロッパーツールをインストールする

### ターミナルを起動する

ターミナルを起動します。ターミナルは「アプリケーション」フォルダの「ユーティリティ」サブフォルダにあります。

::: info Spotlightからアプリケーションを起動する
MacではSpotlightからアプリケーションを起動することができます。
- MacのメニューバーでSpotlightアイコン をクリックするか、Commandキー＋スペースバーを押します。
- 検索フィールドにアプリケーションの名前を入力します。今回は「ターミナル」と入力します。
- エンターキーを押すか、検索結果のアプリケーション名をクリックして実行します。
:::

### コマンドラインデベロッパーツールのインストール

ターミナルに以下のコマンドを入力して、コマンドラインデベロッパーツールをインストールします。

```sh
xcode-select --install
```

コマンドを実行するとポップアップウィンドウが表示され、コマンドラインデベロッパーツールをインストールするかどうかを尋ねられます。インストールを続行するための指示に従ってください。


::: info 詳細な手順
- 「インストール」をクリックします。
- 「同意する」をクリックします。
  - ソフトウェアのダウンロードとインストールが開始されます（検証環境では10分程度かかりました）
- 「完了」をクリックします。
:::

### インストールの確認

以下のコマンドをターミナルに入力して、正しくインストールされたことを確認します。

```sh
git -v
```

このコマンドを実行すると、インストールされた`git`のバージョン情報が表示されます。バージョン情報が表示されたら、コマンドラインデベロッパーツールのインストールに成功しています。

検証環境での結果:

```txt
git version 2.39.2 (Apple Git-143)
```

::: info 補足
工場出荷時の状態で`git`等のコマンドを実行しようとすると、`xcode-select --install`を実行したときと同様に、コマンドラインデベロッパーツールをインストールするためのポップアップが表示されます。
:::

## Xcodeをインストールする

Mac App StoreでXcodeを入手する
インストール完了までしばらく待つ。

```sh
sudo xcodebuild -license
```

ターミナルに表示されるライセンスを読んだのち、`agree`を打ち込む。


## Homebrewをインストールする

https://brew.sh のトップにあるコードをターミナルで実行する

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

パスワードを求められるのでMacのパスワードを入力する。ENTERキーを押して続行するとインストールが始まる。

ターミナルに表示された `==> Next steps` の `... Homebrew to your PATH:` の次のコマンドをターミナルで実行する。

例:

```sh
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/UserName/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

※ UserName の箇所があなたのユーザー名になっているはずです

## Ninjaをインストールする

```sh
brew install ninja
```

## RaiaEngineのリポジトリをクローンする

引き続きターミナルを使います。

`git` を使って GitHub からリポジトリをクローンする方法を、手順を追って説明します。

### 適切なディレクトリに移動する (オプション)

クローンを作成したい場所へ移動します。たとえば、Documents フォルダ内にクローンする場合、以下のコマンドを実行します:

```sh
cd ~/Documents
```

このドキュメントでは開発環境の作業ディレクトリとして `~/Documents` を使用するものとして解説をします。実際に使用されるディレクトリに置き換えて読み進めてください。

::: tip 開発環境の作業ディレクトリをどこに作成するか

開発環境の作業ディレクトリの場所を決める際の一般的な選択肢とそれぞれのメリットとデメリットを以下に示します。

- ホームディレクトリ直下 (例: `~/MyProject`)
  - メリット:
    - アクセスが簡単。ターミナルを開いたときのデフォルトの場所がホームディレクトリであるため、直接作業ディレクトリに移動しやすい。
    - 権限の問題が少ない。ホームディレクトリはユーザーの所有であるため、ファイルやフォルダの操作に関する問題が発生しにくい。
  - デメリット:
    - プロジェクトが増えてくると、ホームディレクトリが散らかってしまう可能性がある。
- ホームディレクトリに専用のサブディレクトリ (例: `~/Projects/MyProject`)
  - メリット:
    - 整理されている。全ての開発関連のプロジェクトやファイルが一箇所にまとまるため、管理がしやすい。
    - 他のユーザーとの共同作業やバックアップを考えた場合、このディレクトリだけを対象にすることが簡単。
  - デメリット:
    - 最初にサブディレクトリを作成し、管理する必要がある。
- 書類ディレクトリ (例: `~/Documents/MyProject`)
  - メリット:
    - macOSの場合、iCloudバックアップの対象にできる
- 外部ドライブやUSB
  - メリット:
    - ポータブル。作業を持ち運びやすく、異なるコンピュータ間での作業が容易。
    - 主要なストレージからの物理的な分離が可能。
  - デメリット:
    - I/O のパフォーマンスが低下する可能性がある。
    - 破損や紛失のリスクが高まる。
- クラウド同期フォルダ (例: Dropbox, Google Drive)
  - メリット:
    - 自動的なバックアップや複数のデバイス間での同期が容易。
    - 外部からのアクセスが可能。
  - デメリット:
    - インターネット接続の有無や速度に依存。
    - クラウドサービスの同期エラーや競合のリスクがある。
    - プライバシーやセキュリティの懸念。
:::

### リポジトリをクローンする

次の git clone コマンドを使って、リポジトリをクローンします:

```sh
git clone https://github.com/dolphilia/raia-engine.git
```

このコマンドは、GitHub から raia-engine リポジトリのコピーをカレントディレクトリ（この例では Documents フォルダ）に raia-engine という名前のフォルダとしてダウンロードします。

## ANGLE を ビルドする

```sh
cd ~/Documents
```

### depot_tools のビルド

https://github.com/google/angle/blob/main/doc/DevSetup.md

Xcodeを使用する。
Python3を使用する。コマンドラインデベロッパーツールに入っている。

depot_toolsリポジトリをクローンする

```sh
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

パスを通す

```sh
export PATH=~/Documents/depot_tools:$PATH
```



https://github.com/google/angle/blob/main/doc/DevSetup.md

depot_toolsを使ってANGLEのソースコードを取得する。完了までしばらく待つ。

```sh
mkdir angle
cd angle
fetch angle
```

ninjaファイルを生成する。必要に応じて`out/Debug`を生成する。

```sh
gn gen out/Release
```

`autoninja`を使ってコンパイルする。必要に応じて`out/Debug`をコンパイルする。

```sh
autoninja -C out/Release
```

しばらく待つ。

### 共有ライブラリとヘッダーファイルのコピー

`~/Documents/angle/out/Release` に生成された `.dylib` 共有ライブラリを`raia-engine/sdk/macos/arm64/lib` にコピーする。

実際に使用するのは以下の共有ライブラリ。

- `libc++_chrome.dylib`
- `libcrohe_zlib.dylib`
- `libEGL.dylib`
- `libGLESv2.dylib`
- `libthird_party_abseil-cpp_absl.dylib`

`~/Documents/angle/include` 内のすべてのファイルを `~/Documents/raia-engine/sdk/macos/arm64/include` にコピーする。

## v8 のビルド

`depot_tools` を `~/Documents/depot_tools` にある前提。またexportでパスを通している前提。





ディレクトリを作成して移動する

```sh
mkdir v8
cd v8
```

V8をクローンする。depot_toolsの`fetch`を使用します。

```sh
fetch v8
```

クローンしたディレクトリに移動する。

```sh
cd v8
```

しばらく待つ。

生成

```sh
python3 tools/dev/v8gen.py arm64.release
```

out.gn/args.gn を編集する

macOSでV8をビルドするときの設定

```txt
dcheck_always_on = false
is_component_build = false
is_debug = false
target_cpu = "arm64"
v8_monolithic = true
v8_use_external_startup_data = false
v8_enable_pointer_compression = false
v8_enable_31bit_smis_on_64bit_arch = false
```

::: details WindowsでV8をビルドするときのargs.gnの設定
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

ソースコードをコンパイルする

```
ninja -C out.gn/arm64.release v8_monolith
```

しばらく待つ。

`~/Documents/v8/v8/out.gn/arm64.release/obj`ディレクトリに生成された、

- `libv8_monolith.a` （容量が3GB以上ある）
- `libv8_libbase.a`
- `libv8_libplatform.a`

静的ライブラリを `~/Documents/raia-engine/sdk/macos/arm64/lib` にコピーする

---



---

### RaiaEngineディレクトリに移動する

クローンが成功すると、raia-engine という名前の新しいディレクトリが作成されます。以下のコマンドを使って、そのディレクトリ内に移動して中身を確認できます:

```sh
cd raia-engine
```

ls
ls コマンドを実行すると、クローンしたリポジトリのファイルやフォルダが表示されます。


