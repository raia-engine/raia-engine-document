# rawset

テーブルに直接値を設定する（メタメソッドは呼び出されない）

```lua
rawset (table, index, value)
```

## 説明

テーブル `table` のキー `index` に対して、値 `value` をメタメソッドを呼び出さずに直接設定します。`table` はテーブル型でなければならず、`index` は `nil` 以外の任意の値、`value` は任意の Lua の値を指定できます。

この関数は、設定後のテーブル `table` を返します。

## サンプルコード

```lua
local t = {}
rawset(t, "a", 1)
print(t.a)
```

この例では、`1`が表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`rawequal`](rawequal.md)
- [`rawget`](rawget.md)