# ffi.cast

```lua
ffi.cast(ct, init)
```

## 説明

`ffi.cast` 関数は、指定された型 `ct` に従って `init` をキャストし、新しい `cdata` オブジェクトを返します。これにより、数値やポインタ型の変換が可能です。ポインタの型変換やアドレス変換に特に便利です。

## 補足

- `ffi.cast` は、ポインタ互換性チェックをオーバーライドしたい場合にも使用されます。ポインタや数値の型を他の型に簡単にキャストするのに適しています。

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