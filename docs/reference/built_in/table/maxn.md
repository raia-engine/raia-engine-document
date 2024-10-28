# table.maxn

テーブル内の数値キーの最大値を返す

```lua
table.maxn (table)
```

## 説明

テーブル内で使用されている最大の正の数値キー（インデックス）を返します。テーブルに数値キーがない場合は `0` を返します。

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