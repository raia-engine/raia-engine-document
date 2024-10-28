# ffi.cast

型にCデータをキャストする

```lua
ffi.cast(ct, init)
```

## 説明

`ffi.cast` 関数は、指定した型 `ct` に `init` をキャストし、新しい `cdata` オブジェクトを返します。これにより、数値やポインタの型変換が可能で、特にポインタの型変換やアドレス変換に便利です。

## 補足

- `ffi.cast` は、ポインタ互換性チェックを無視したい場合にも使用されます。ポインタや数値の型を他の型に簡単にキャストするのに適しています。

## サンプルコード

```lua
local ffi = require("ffi")

local num = ffi.cast("int", 3.14)
print(num)  -- 3
```

このコードは、浮動小数点数を整数型にキャストし、その結果を出力します。

## 互換性

- LuaJIT

## 関連項目

- ffi.typeof
- ffi.new