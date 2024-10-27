# ffi.new

```lua
ffi.new(ct [, nelem] [, init...])
```

## 説明

`ffi.new` 関数は、指定されたC型 `ct` に基づいて新しい `cdata` オブジェクトを作成し、必要に応じて初期化します。オプションの `nelem` で配列や可変長構造体の要素数を指定でき、`init` 引数を使用してオブジェクトを初期化します。初期化子が多すぎるとエラーになります。

## 補足

- 同じ型の `cdata` オブジェクトを繰り返し作成する場合は、`ffi.typeof()` で型を事前にキャッシュし、キャッシュした `ctype` を直接使用することで、パフォーマンスを改善できます。
  
## サンプルコード

```lua
local ffi = require("ffi")

local int_ptr = ffi.new("int", 42)
print(int_ptr[0])  -- 42
```

このコードは、整数型のCデータを作成し、初期化して出力します。

## 互換性

- LuaJIT

## 関連項目

- ffi.typeof
- ffi.metatype