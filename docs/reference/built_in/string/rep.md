# string.rep

```lua
string.rep (s, n [, sep])
```

## 説明

文字列 `s` を `n` 回繰り返し、各繰り返しの間に区切り文字 `sep` を挟んで連結した新しい文字列を返します。`sep` を省略した場合、デフォルトでは空文字列（区切りなし）となります。

## サンプルコード

```lua
local s = string.rep("Lua", 3)
print(s)  -- "LuaLuaLua"
```

この例では、`"Lua"`を3回繰り返しています。

## 互換性

- Lua 5.2

## 関連項目

- [`string.format`](format.md)