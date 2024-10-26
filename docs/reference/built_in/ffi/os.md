# ffi.os

```lua
ffi.os
```

## 説明

`ffi.os` は、現在のターゲットOSの名前を示す文字列を返します。この値は `jit.os` と同じ内容を持ち、スクリプトが特定のOSに依存する処理を行う際に役立ちます。

| OS 名 | 説明 |
| --- | --- |
| Windows | Windows系のOS |
| Linux | Linux系のOS |
| OSX | macOS (OS X) |
| BSD | BSD系のOS |
| POSIX | POSIX準拠のその他のOS |

## サンプルコード

```lua
local ffi = require("ffi")

print("Running on OS:", ffi.os)

if ffi.os == "Windows" then
    print("This is a Windows-specific operation.")
elseif ffi.os == "Linux" then
    print("This is a Linux-specific operation.")
else
    print("Generic operation for other OSes.")
end
```

このコードは、現在のOSに応じてメッセージを出力します。

## 関連項目

- `jit.os`