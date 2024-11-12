# buf:putcdata

FFI cdataをバッファに追加する

```lua
buf = buf:putcdata(cdata, len) --FFI
```

## 説明

FFI cdataオブジェクトによって指されるメモリから指定された`len`バイト数をバッファに追加します。オブジェクトは（定数）ポインタに変換可能である必要があります。

## サンプルコード

```lua
local ffi = require("ffi")
local cdata = ffi.new("char[5]", "Hello")
buf:putcdata(cdata, 5)
print(buf:tostring())
```

FFIで作成した文字列データをバッファに追加し、内容を出力します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:put`](buf_put.md)
- [`buf:set`](buf_set.md)