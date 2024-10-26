# table.insert

```lua
table.insert (table, [pos,] value)
```

## 説明

テーブルの`pos`位置に値`value`を挿入します。`pos`を省略した場合、`value`はテーブルの末尾に挿入されます。要素の挿入により、他の要素は必要に応じてシフトされます。

## サンプルコード

```lua
local t = {1, 2, 4}
table.insert(t, 3, 3)
print(table.concat(t, ", "))  -- 1, 2, 3, 4
```

この例では、3番目の位置に値`3`を挿入しています。

## 互換性

- Lua 5.1

## 関連項目

- [`table.concat`](concat.md)
- [`table.remove`](remove.md)