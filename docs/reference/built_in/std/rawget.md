# rawget

テーブルから直接値を取得する（メタメソッドは呼び出されない）

```lua
rawget (table, index)
```

## 説明

テーブル `table` のキー `index` に対応する値を、メタメソッドを呼び出さずに直接取得します。`table` はテーブル型でなければならず、`index` は任意の値を指定できます。

## サンプルコード

```lua
local t = {a = 1}
print(rawget(t, "a"))
```

この例では、`1`が表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`rawequal`](rawequal.md)
- [`rawset`](rawset.md)