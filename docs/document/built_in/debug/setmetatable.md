# debug.setmetatable

```lua
debug.setmetatable (object, table)
```

## 説明

指定したオブジェクト`object`のメタテーブルを`table`に設定します。

## サンプルコード

```lua
local t = {}
debug.setmetatable(t, {__index = function() return "default" end})
print(t.key)  -- "default"が表示される
```

この例では、テーブル`t`にメタテーブルが設定され、`__index`が機能します。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`getmetatable`](../std/getmetatable.md)
- [`setmetatable`](../std/setmetatable.md)