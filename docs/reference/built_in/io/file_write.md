# file:write

```lua
file:write (···)
```

## 説明

ファイルにデータを書き込みます。複数の引数を指定でき、文字列や数値を出力できます。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Hello, Lua!")
file:close()
```

この例では、ファイルにデータを書き込んでいます。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT