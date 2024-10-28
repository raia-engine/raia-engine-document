# ffi.copy

メモリ間でデータをコピーする

```lua
ffi.copy(dst, src, len)
ffi.copy(dst, str)
```

## 説明

`ffi.copy` 関数は、`src` のデータを `dst` に対して指定したバイト数 `len` 分コピーします。`len` を省略すると、`src` がLuaの文字列であれば、終端バイトも含めて `#src + 1` バイトがコピーされます。これは、Cのメモリ領域間のデータ転送や、Luaの文字列からCのメモリへのコピーに便利です。

## 補足

- `ffi.copy` は `memcpy()` や `strcpy()` の効率的な代替として使用できます。
- `src` がLua文字列の場合、`len` は `#src + 1` バイトを超えてはなりません。

## サンプルコード

```lua
local ffi = require("ffi")

local src = ffi.new("char[6]", "hello")
local dst = ffi.new("char[6]")

ffi.copy(dst, src, 6)
print(ffi.string(dst))  -- hello
```

このコードは、Cのメモリ領域から別の領域にデータをコピーします。

## 互換性

- LuaJIT

## 関連項目

- ffi.string