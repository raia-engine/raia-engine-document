# jit.status

```lua
status, ... = jit.status()
```

## 説明

`jit.status` 関数は、JITコンパイラの現在の状態を返します。最初の戻り値 `status` はJITコンパイラが有効かどうかを示すブール値で、`true` の場合は有効です。続く可変長の戻り値には、CPUの特定機能や最適化に関する情報が含まれます。

## 補足

- 追加の戻り値には、JITコンパイラがサポートするCPU機能（例：`SSE2` や `ARMv7` など）が含まれる場合があります。
- 詳細な情報はLuaJITのドキュメントを参照してください。

## サンプルコード

```lua
local jit = require("jit")
local status, details = jit.status()
print("JIT enabled:", status)
```

## 互換性

- LuaJIT