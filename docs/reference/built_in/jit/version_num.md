# jit.version_num

```lua
jit.version_num
```

## 説明

`jit.version_num` は、LuaJITのバージョン番号を10進数で表した数値を返します。例えば、バージョン "2.1.0" は `20100` という数値で表されます。現在のリリース方式では、バージョンの最後の部分は「99」で固定されています。

## サンプルコード

```lua
local jit = require("jit")
print("LuaJIT Version Number:", jit.version_num)
```

## 互換性

- LuaJIT

---

