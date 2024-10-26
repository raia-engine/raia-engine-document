# jit.version

```lua
jit.version
```

## 説明

`jit.version` は、LuaJITのバージョンを示す文字列を返します。LuaJITのリリースごとに更新されます。

## サンプルコード

```lua
local jit = require("jit")
print("LuaJIT Version:", jit.version)
```

## 互換性

- LuaJIT