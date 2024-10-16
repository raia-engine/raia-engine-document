# loadstring

文字列からLuaコードを読み込み、チャンクを返す

```lua
loadstring (string [, chunkname])
```

## 説明

`load`に似ていますが、指定された文字列からチャンクを取得します。

指定された文字列を読み込んで実行するには、次の慣用句を使用します：

```lua
assert(loadstring(s))()
```

省略された場合、`chunkname`は指定された文字列にデフォルト設定されます。

## サンプルコード

```lua
local code = "return 2 + 3"
local f = loadstring(code)
print(f())  -- 5
```

この例では、文字列内のLuaコードを`loadstring`で読み込み、実行して結果を表示します。

## 互換性

- Lua5.1
- Lua5.2で廃止（LuaJITでは使用可能）

## 関連項目

- [`load`](load.md)
- [`loadfile`](loadfile.md)
- [`dofile`](dofile.md)