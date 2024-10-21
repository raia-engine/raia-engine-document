# debug.getmetatable

```lua
debug.getmetatable (object)
```

## 説明

指定されたオブジェクトのメタテーブルを取得します。メタテーブルが存在しない場合は`nil`を返します。

## サンプルコード

```lua
local t = {}
setmetatable(t, {__index = {}})
print(debug.getmetatable(t))
```

この例では、テーブル`t`のメタテーブルが取得されて表示されます。

## 互換性

- Lua 5.1

## 関連項目

- [`setmetatable`](../std/setmetatable.md)
- [`debug.setmetatable`](setmetatable.md)