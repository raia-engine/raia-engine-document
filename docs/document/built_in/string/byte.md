# string.byte

```lua
string.byte (s [, i [, j]])
```

## 説明

文字列`s`の指定した範囲の文字（`i`から`j`）の内部数値コードを返します。デフォルトでは、`i`は1で、`j`も省略されている場合は`i`と同じです。数値コードはプラットフォームによって異なる可能性があります。

## サンプルコード

```lua
local s = "Lua"
print(string.byte(s, 1))  -- 'L' の数値コードを出力
```

この例では、`"Lua"`の1文字目の内部数値コードを返します。

## 互換性

- Lua 5.1

## 関連項目

- [`string.char`](char.md)
- [`string.len`](len.md)