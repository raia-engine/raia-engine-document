# io.tmpfile

```lua
io.tmpfile ()
```

## 説明

一時ファイルを作成し、そのハンドルを返します。このファイルはプログラム終了時に自動的に削除されます。

## サンプルコード

```lua
local tmp = io.tmpfile()  -- 一時ファイルを作成
tmp:write("Temporary data")
tmp:seek("set")
print(tmp:read("*a"))  -- 一時ファイルの内容を読み込んで表示
tmp:close()
```

この例では、一時ファイルを作成し、データを書き込んでその内容を読み取っています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT