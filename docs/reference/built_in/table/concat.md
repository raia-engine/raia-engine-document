# table.concat

```lua
table.concat (table [, sep [, i [, j]]])
```

## 説明

テーブルの要素を連結して1つの文字列を作成します。`table[i]..sep..table[i+1]...sep..table[j]`という形式で連結され、`sep`は区切り文字です。`sep`のデフォルトは空文字列です。`i`のデフォルトは1、`j`のデフォルトはテーブルの長さです。

## サンプルコード

```lua
local t = {"Lua", "is", "great"}
local s = table.concat(t, " ")
print(s)  -- Lua is great
```

この例では、テーブルの要素を空白で区切って1つの文字列に連結しています。

## 互換性

- Lua 5.1

## 関連項目

- [`table.insert`](insert.md)
- [`table.remove`](remove.md)