# Wiki

開発者メモ

## macOS App化（シェルスクリプト経由）

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