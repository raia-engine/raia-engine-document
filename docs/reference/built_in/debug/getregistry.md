# debug.getregistry

```lua
debug.getregistry ()
```

## 説明

Luaの内部レジストリテーブルを返します。このレジストリは、C APIで使用される内部データ構造を格納します。

## サンプルコード

```lua
local registry = debug.getregistry()
print(registry)
```

この例では、Luaの内部レジストリテーブルが表示されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.traceback`](traceback.md)