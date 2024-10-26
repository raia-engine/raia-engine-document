# jit.status

```lua
status, ... = jit.status()
```

## 説明

`jit.status` 関数は、JITコンパイラの現在の状態を返します。最初の戻り値は、JITが有効かどうかを示し、以降の戻り値にはCPUの特定機能や最適化の情報が含まれます。

## サンプルコード

```lua
local jit = require("jit")
local status, details = jit.status()
print("JIT enabled:", status)
```

## 互換性

- LuaJIT