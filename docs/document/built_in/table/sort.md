# table.sort

```lua
table.sort (table [, comp])
```

## 説明

テーブルをその場でソートします。`comp`関数が指定されていない場合、デフォルトで`<`演算子が使用されます。`comp`が指定された場合、その関数は2つの要素を受け取り、最初の要素が2番目より小さい場合に`true`を返す必要があります。

## サンプルコード

```lua
local t = {3, 1, 4, 2}
table.sort(t)
print(table.concat(t, ", "))  -- 1, 2, 3, 4
```

この例では、テーブル内の数値を昇順にソートしています。

## 互換性

- Lua 5.1

## 関連項目

- [`table.concat`](concat.md)
- [`table.insert`](insert.md)