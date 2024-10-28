# table.sort

テーブルの要素をソートする

```lua
table.sort (table [, comp])
```

## 説明

テーブルの要素をその場でソートします。`comp` 関数を指定しない場合、デフォルトで `<` 演算子を使用して昇順にソートされます。`comp` 関数を指定すると、その関数は2つの引数（テーブルの要素）を受け取り、最初の引数が2番目の引数よりも小さい場合に `true` を返す必要があります。

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