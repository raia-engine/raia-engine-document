# ffi.string

```lua
ffi.string(ptr [, len])
```

## 説明

`ffi.string` 関数は、指定されたポインタ `ptr` が指すデータをLuaの文字列として返します。オプションで `len` を指定すると、その長さ分だけデータをコピーします。`len` が指定されていない場合は、`ptr` をゼロ終端された文字列として扱い、終端までのデータをコピーします。

## 補足

- `ffi.string` は `const char *` のポインタから一時的なデータをLuaの文字列に変換する際に便利です。
- 返されるLua文字列はデータのコピーで、元のCデータとは独立して管理されます。
- バイナリデータやゼロを含むデータもLua文字列として扱えるため、`len` を指定して任意の長さを取得できます。

## サンプルコード

```lua
local ffi = require("ffi")

local c_str = ffi.new("char[6]", "hello")
print(ffi.string(c_str))  -- hello
```

このコードは、Cの文字列をLuaの文字列に変換して表示します。

## 互換性

- LuaJIT

## 関連項目

- ffi.copy