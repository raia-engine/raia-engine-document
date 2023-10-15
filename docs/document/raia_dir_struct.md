# Raiaのディレクトリの構造

## Raiaエンドユーザー向け

### Windows

- 📁 *
  - raia_launcher.exe
  - config.json
  - 📁 system
    - raia_startup.exe
    - *.dll
    - ...
  - 📁 data
    - main.js
    - ...

### Linux

- 📁 *
  - raia_launcher.sh
  - config.json
  - 📁 system
    - raia_startup.exe
    - *.dll
    - ...
  - 📁 data
    - main.js
    - ...

### macOS

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