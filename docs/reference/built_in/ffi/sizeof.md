# ffi.sizeof

```lua
ffi.sizeof(ct [, nelem])
```

## 説明

`ffi.sizeof` 関数は、指定した型 `ct` または `cdata` オブジェクトのサイズをバイト単位で返します。配列型の場合、オプションで `nelem` を指定して要素数を決めることができます。サイズが不明な場合（例: `void` や関数型）は `nil` を返します。

## 補足

- 可変長配列（VLA）や可変長構造体（VLS）のサイズを取得する場合は、要素数 `nelem` を指定する必要があります。

## サンプルコード

```lua
local ffi = require("ffi")

print(ffi.sizeof("int"))        -- 4 (通常のシステム上)
print(ffi.sizeof("double"))     -- 8
```

このコードは、`int` 型と `double` 型のサイズをバイト単位で出力します。

## 互換性

- LuaJIT

## 関連項目

- ffi.alignof
- ffi.offsetof