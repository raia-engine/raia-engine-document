# Wiki

## 開発者メモ

### SteamDeckの開発環境構築

```sh
sudo steamos-readonl disable
sudo pacman-key --init
sudo pacman-key --populate archlinux
# sudo pacman -S bc
# sudo pacman -S --overwrite
sudo pacman -S linux-neptune-headers
sudo pacman -S glibc
sudo pacman -S linux-apt-headers
```

bashrc

```sh
# ~/.bashrc
export C_INCLUDE_PATH="/lib/modules/$(uname -r)/build/include":$C_INCLUDE_PATH
export C_INCLUDE_PATH="/lib/modules/$(uname -r)/build/include/uapi":$C_INCLUDE_PATH
```

```sh
sudo pacman -S libx11
sudo pacman -S xorgproto
sudo pacman -S glfw
sudo pacman -S libgl
# sudo pacman -S mesa
# sudo pacman -S glu
```

### macOS App化（シェルスクリプト経由）

- raia_engine.app
  - Contents
    - Info.plist
    - MacOS
      - run.sh
      - raia-engine
      - .dylib
      - ...
    - Resources
      - startup.js
      - app.icns

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

```sh
#!/bin/bash

CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT
$CURRENT/raia-engine
```

`run.sh`にスクリプトの実行権限を付与しておく

```
chmod +x run.sh
```