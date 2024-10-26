# ffi.arch

```lua
ffi.arch
```

## 説明

`ffi.arch` は、現在のターゲットアーキテクチャの名前を示す文字列を返します。この値は `jit.arch` と同じ内容を持ち、スクリプトが特定のアーキテクチャに依存する処理を行う際に役立ちます。

| アーキテクチャ名 | 説明 |
| --- | --- |
| x86 | 32ビット x86 アーキテクチャ |
| x64 | 64ビット x86 アーキテクチャ（AMD64 / Intel64） |
| arm | 32ビット ARM アーキテクチャ |
| arm64 | 64ビット ARM アーキテクチャ |
| mips | MIPS アーキテクチャ |
| ppc | PowerPC アーキテクチャ |

## サンプルコード

```lua
local ffi = require("ffi")

print("Target architecture:", ffi.arch)

if ffi.arch == "x64" then
    print("This is a 64-bit x86 architecture.")
elseif ffi.arch == "arm" then
    print("This is a 32-bit ARM architecture.")
else
    print("Running on another architecture.")
end
```

このコードは、現在のアーキテクチャに応じてメッセージを出力します。

## 関連項目

- `jit.arch`