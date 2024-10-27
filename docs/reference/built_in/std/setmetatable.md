# setmetatable

テーブルにメタテーブルを設定する

```lua
setmetatable (table, metatable)
```

## 説明

テーブル `table` に対して、新しいメタテーブル `metatable` を設定します。（Lua からはテーブル以外の型のメタテーブルを変更することはできません。C 言語からのみ可能です。）`metatable` に `nil` を指定すると、テーブルのメタテーブルを削除します。もし元のメタテーブルに `"__metatable"` フィールドが存在する場合、エラーが発生します。

この関数は、設定後のテーブル `table` を返します。

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