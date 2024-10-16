# rawset

テーブルに直接値を設定する（メタメソッドは呼び出されない）

```lua
rawset (table, index, value)
```

## 説明

メタメソッドを呼び出さずに`table[index]`の実際の値を`value`に設定します。`table`はテーブルでなければならず、`index`は`nil`以外の任意の値であり、`value`は任意のLuaの値です。

この関数は`table`を返します。

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