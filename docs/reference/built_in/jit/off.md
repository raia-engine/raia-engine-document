# jit.off

```lua
jit.off([func|true], [true|false])
```

## 説明

`jit.off` 関数は、JITコンパイラを無効にし、指定された関数または全体のコンパイル済みコードをフラッシュします。サブ関数に対しても無効化を再帰的に適用可能です。

## サンプルコード

```lua
local jit = require("jit")
jit.off(true, true)  -- 全体でJITを無効化
```

## 互換性

- LuaJIT