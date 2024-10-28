# ffi.offsetof

C構造体のフィールドのオフセットを返す

```lua
ffi.offsetof(ct, field)
```

## 説明

`ffi.offsetof` 関数は、指定した構造体 `ct` 内の特定のフィールド `field` のオフセット（構造体の先頭からのバイト単位の位置）を返します。これは、フィールドのメモリ上の位置を調べる際に使用されます。

## 補足

- `ct` は構造体でなければなりません。
- フィールドがビットフィールドの場合、フィールドの位置とビット単位のサイズを返します。

## サンプルコード

```lua
local ffi = require("ffi")

ffi.cdef[[
typedef struct {
  int x;
  double y;
} mystruct;
]]

print(ffi.offsetof("mystruct", "y"))  -- 8
```

このコードは、構造体 `mystruct` のフィールド `y` のオフセットをバイト単位で出力します。

## 互換性

- LuaJIT

## 関連項目

- ffi.sizeof
- ffi.alignof