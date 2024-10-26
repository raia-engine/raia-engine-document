# setmetatable

テーブルにメタテーブルを設定する

```lua
setmetatable (table, metatable)
```

## 説明

指定されたテーブルのメタテーブルを設定します。（Luaから他のタイプのメタテーブルを変更することはできません。Cからのみ可能です。）`metatable`が`nil`の場合、指定されたテーブルのメタテーブルを削除します。元のメタテーブルに`"__metatable"`フィールドがある場合、エラーが発生します。

この関数は`table`を返します。

## サンプルコード

```lua
local t = {}
setmetatable(t, {__index = {a = 1}})
print(t.a)  -- 1
```

この例では、メタテーブルを使ってテーブル`t`のキー`a`にアクセスしています。

## 互換性

- Lua5.1

## 関連項目

- [`getmetatable`](getmetatable.md)