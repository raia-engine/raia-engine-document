# loadfile

ファイルからLuaコードを読み込み、チャンクを返す

```lua
loadfile ([filename [, mode [, env]]])
```

## 説明

`load`と似ていますが、チャンクをファイル`filename`から、またはファイル名が指定されていない場合は標準入力から取得します。

## サンプルコード

```lua
local f = loadfile("test.lua")
f()
```

この例では、`test.lua`が読み込まれ、実行されます。

## 互換性

- Lua5.2

## 関連項目

- [`load`](load.md)
- [`loadstring`](loadstring.md)
- [`dofile`](dofile.md)