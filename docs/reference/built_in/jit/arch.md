# jit.arch

```lua
jit.arch
```

## 説明

`jit.arch` は、現在実行中のターゲットアーキテクチャ名を示す文字列を返します。例えば、`"x86"`、`"x64"`、`"arm"`、`"arm64"` などが返されます。これにより、スクリプトが動作しているCPUアーキテクチャを判別することができます。

## サンプルコード

```lua
local jit = require("jit")
print("Processor Architecture:", jit.arch)
```

## 互換性

- LuaJIT