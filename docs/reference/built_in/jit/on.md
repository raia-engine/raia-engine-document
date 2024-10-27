# jit.on

```lua
jit.on([func|true], [true|false])
```

## 説明

`jit.on` 関数は、JITコンパイラを有効にします。特定の関数に対してJITを有効化することができ、さらにサブ関数にも再帰的に適用することが可能です。

## 補足

- `func` に特定の関数を指定すると、その関数のみでJITコンパイラが有効になります。`func` に `true` を指定すると、全ての関数でJITコンパイラが有効になります。
- 第2引数の `recursive` に `true` を指定すると、サブ関数やクロージャも含めて再帰的にJITを有効化します。

## サンプルコード

```lua
local jit = require("jit")
jit.on(true, true)  -- 全体でJITを有効化
```

## 互換性

- LuaJIT