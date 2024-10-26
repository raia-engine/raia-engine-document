# jit.arch

```lua
jit.arch
```

## 説明

`jit.arch` は、実行中のターゲットアーキテクチャ名を示す文字列を返します。利用可能なアーキテクチャ名には「x86」「x64」「arm」「arm64」などが含まれます。

## サンプルコード

```lua
local jit = require("jit")
print("Processor Architecture:", jit.arch)
```

## 互換性

- LuaJIT