# ffi.metatype

```lua
ffi.metatype(ct, metatable)
```

## 説明

`ffi.metatype` 関数は、指定したC型 `ct` にメタテーブルを設定し、カスタムメソッドや演算子を追加できるようにします。メタテーブルは構造体や共用体、複素数、ベクトル型に適用可能で、一度設定すると変更はできません。このメタテーブルは、その型のすべてのインスタンスに自動的に適用されます。

## 補足

- メタテーブルは、`__index` や `__tostring` などの標準メタメソッドを利用できます。
- `__gc` メタメソッドは、構造体や共用体型に対してのみ適用され、`ffi.gc()` を呼び出して自動メモリ管理を行います。
- 設定後のメタテーブルや `__index` テーブルの内容は変更できません。

## サンプルコード

```lua
local ffi = require("ffi")

ffi.cdef[[
typedef struct { int x, y; } point;
]]

local point_mt = {
  __tostring = function(p)
    return string.format("Point(%d, %d)", p.x, p.y)
  end
}

local Point = ffi.metatype("struct point", point_mt)

local p = Point(10, 20)
print(p)  -- Point(10, 20)
```

このコードは、構造体にメタテーブルを設定し、カスタムの `__tostring` メソッドを追加しています。

## 互換性

- LuaJIT

## 関連項目

- ffi.typeof
- ffi.new