# table.maxn

```lua
table.maxn (table)
```

## 説明

テーブルの最大の正の数値インデックスを返します。テーブルに数値インデックスがない場合は0を返します。

## サンプルコード

```lua
local t = {1, 2, [10] = 100}
print(table.maxn(t))  -- 10
```

この例では、テーブルの最大の数値インデックスを取得しています。

## 互換性

- Lua 5.1

## 関連項目

- [`table.insert`](insert.md)
- [`table.remove`](remove.md)