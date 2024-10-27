# file:read

```lua
file:read (···)
```

## 説明

指定されたフォーマットでファイルからデータを読み取ります。フォーマットには `"n"`（数値の読み込み）、`"l"`（行の読み込み）、バイト数の指定などがあります。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
local content = file:read("*a")  -- ファイル全体を読み込む
print(content)
file:close()
```

この例では、ファイル全体を読み取って出力しています。

## LuaJIT独自の拡張

- 64ビットファイルオフセットを扱う。
- 先頭に*があるかないかにかかわらずフォーマットを受け入れる。(Lua5.3から)

## 互換性

- Lua 5.3
- LuaJIT