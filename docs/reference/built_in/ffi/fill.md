# ffi.fill

```lua
ffi.fill(dst, len [, c])
```

## 説明

`ffi.fill` 関数は、指定したメモリ領域 `dst` を、長さ `len` バイト分、値 `c`（省略時はゼロ）で埋めます。メモリの初期化やリセットに便利です。

## 補足

- `ffi.fill` は、Cライブラリの `memset()` 関数の効率的な代替として利用できますが、引数の順序が異なる点に注意してください。

## サンプルコード

```lua
local ffi = require("ffi")

local buffer = ffi.new("char[10]")
ffi.fill(buffer, 10, 65)  -- ASCII 'A' で埋める
print(ffi.string(buffer, 10))  -- AAAAAAAAAA
```

このコードは、メモリ領域を特定の値で埋め、その結果を表示します。

## 互換性

- LuaJIT

## 関連項目

- ffi.copy