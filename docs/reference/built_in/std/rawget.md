# rawget

テーブルから直接値を取得する（メタメソッドは呼び出されない）

```lua
rawget (table, index)
```

## 説明

メタメソッドを呼び出さずに`table[index]`の実際の値を取得します。`table`はテーブルでなければならず、`index`は任意の値です。

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