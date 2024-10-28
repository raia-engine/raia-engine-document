# ctype

`ffi.new`や`ffi.cast`などで使用されるC型を定義する

```lua
ctype([nelem], [init...])
```

## 説明

`ctype` は、`ffi.typeof()` で定義されたC型を使って新しい `cdata` オブジェクトを作成するための構文です。`ffi.new` と同様の動作をしますが、型を事前に定義して使用することで、特に同じ型のオブジェクトを多数生成する場合にパフォーマンスが向上します。

## 補足

- 既に定義された `ctype` を使用することで、`ffi.new` を呼び出すたびに型を解析する処理を省けます。

## サンプルコード

```lua
local ffi = require("ffi")

local ctype_int = ffi.typeof("int")
local int_val = ctype_int(42)
print(int_val)  -- 42
```

このコードは、`ffi.typeof` で取得した `ctype` を使用して整数型のオブジェクトを作成します。

## 互換性

- LuaJIT

## 関連項目

- ffi.new
- ffi.typeof