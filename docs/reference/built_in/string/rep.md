# string.rep

```lua
string.rep (s, n [, sep])
```

## 説明

文字列`s`を`n`回繰り返し、それらを文字列`sep`で区切って連結した文字列を返します。`sep`のデフォルト値は空文字列（つまり、区切り文字なし）です。

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