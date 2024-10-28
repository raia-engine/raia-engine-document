# table.concat

テーブルの要素を連結し、文字列を返す

```lua
table.concat (table [, sep [, i [, j]]])
```

## 説明

テーブル内の要素を連結して、一つの文字列を作成します。要素は以下の形式で連結されます：

`table[i] .. sep .. table[i+1] .. sep .. ... .. sep .. table[j]`

ここで、`sep` は区切り文字を指定します。`sep` を省略した場合、デフォルトは空文字列（区切りなし）です。`i` は連結を開始するインデックスで、デフォルトは `1`、`j` は連結を終了するインデックスで、デフォルトはテーブルの長さ（`#table`）です。

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