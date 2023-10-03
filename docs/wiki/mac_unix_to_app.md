# Mac で実行ファイルを含むディレクトリをアプリ化する

ここではシェルスクリプト経由で実行する方法について解説します。

## ディレクトリ構造

次のようなディレクトリ構造にしてファイルを配置します。

- 📁 raia.app
  - 📁 Contents
    - 📄 Info.plist（設定ファイル）
    - 📁 MacOS
      - 📄 run.sh（シェルスクリプト）
      - 📄 raia_startup（実行ファイル）
      - 📄 *.dylib（共有ライブラリ）
      - ...
    - 📁 Resources
      - 📄 main.js（ゲームスクリプト）
      - 📄 app.icns（アイコン）
      - ...

## Info.plist を編集する

`*.app/Contents/Info.plist` の内容を次のように書き換えます。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>run.sh</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleSignature</key>
    <string>run</string>
    <key>CFBundleIconFile</key>
    <string>app.icns</string>
</dict>
</plist>
```

## run.sh

`*.app/Contents/MacOS/run.sh` の内容を次のように書き換えます。

```sh
#!/bin/bash
CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT
$CURRENT/raia_startup
```

## シェルスクリプトの実行権限

`chmod` コマンドを使って `run.sh` に実行権限を付与します。

```sh
chmod +x run.sh
```

## 起動のテストをする

`*.app` ディレクトリをダブルクリックして起動するかチェックします。