# jit.flush

```lua
jit.flush([func|true], [true|false])
```

## 説明

`jit.flush` 関数は、指定された関数または全体のコンパイル済みコードキャッシュをクリアします。JITコンパイラの有効/無効状態には影響を与えません。

## サンプルコード

```lua
local jit = require("jit")
jit.flush()  -- 全体のコンパイル済みコードをフラッシュ
```

## 互換性

- LuaJIT