# ffi.typeof

型を定義し、キャッシュする

```lua
ffi.typeof(ct)
```

## 説明

`ffi.typeof` 関数は、指定されたC型 `ct` を解析して、再利用可能な `ctype` オブジェクトを返します。`ctype` オブジェクトはキャッシュされ、同じ型の `cdata` オブジェクトを繰り返し生成する際に効率的に使用できます。

## 補足

- `ffi.typeof` を用いて生成された `ctype` は、`ffi.new` の代わりに直接使用でき、性能が向上します。同じC型を複数回生成する場合は、`ffi.typeof` で型をキャッシュしておくのが推奨されます。

## サンプルコード

```lua
local ffi = require("ffi")

local int_type = ffi.typeof("int")
local int_obj = int_type(10)
print(int_obj)  -- 10
```

このコードは、`ffi.typeof` で整数型をキャッシュし、その型を使って新しいオブジェクトを作成します。

## 互換性

- LuaJIT

## 関連項目

- ffi.new
- ffi.metatype