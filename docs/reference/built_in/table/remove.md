# table.remove

```lua
table.remove (table [, pos])
```

## 説明

テーブルの`pos`位置にある要素を削除し、その要素を返します。削除によって他の要素はシフトされます。`pos`を省略した場合、テーブルの最後の要素が削除されます。

## サンプルコード

```lua
local t = {1, 2, 3, 4}
table.remove(t, 2)
print(table.concat(t, ", "))  -- 1, 3, 4
```

この例では、2番目の要素を削除し、残りの要素を連結して表示しています。

## 互換性

- Lua 5.1

## 関連項目

- [`table.insert`](insert.md)
- [`table.concat`](concat.md)