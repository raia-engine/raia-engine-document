# debug.getregistry

```lua
debug.getregistry ()
```

## 説明

Luaの内部レジストリテーブルを返します。このレジストリは、C APIで使われる内部データ構造を保存します。

## サンプルコード

```lua
local registry = debug.getregistry()
print(registry)
```

この例では、Luaの内部レジストリテーブルが表示されます。

## 互換性

- Lua 5.1

## 関連項目

- [`debug.traceback`](traceback.md)