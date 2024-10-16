# getmetatable

オブジェクトのメタテーブルを返す

```lua
getmetatable (object)
```

## 説明

オブジェクトにメタテーブルがない場合、nilを返します。それ以外の場合、オブジェクトのメタテーブルに`"__metatable"`フィールドがある場合、関連付けられた値を返します。それ以外の場合は、指定されたオブジェクトのメタテーブルを返します。

## サンプルコード

```lua
local t = {}
print(getmetatable(t))
```
この例では、テーブル`t`のメタテーブルが表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`setmetatable`](setmetatable.md)