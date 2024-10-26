# jit.on

```lua
jit.on([func|true], [true|false])
```

## 説明

`jit.on` 関数は、JITコンパイラを有効にします。特定の関数に対してJITを有効化したり、再帰的にサブ関数へも適用できます。

## サンプルコード

```lua
local jit = require("jit")
jit.on(true, true)  -- 全体でJITを有効化
```

## 互換性

- LuaJIT