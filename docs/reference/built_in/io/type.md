# io.type

```lua
io.type (obj)
```

## 説明

`obj` がファイルハンドルかどうかを判定します。開いているファイルであれば `"file"`、閉じているファイルであれば `"closed file"`、それ以外の場合は `nil` を返します。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
print(io.type(file))  -- "file"
file:close()
print(io.type(file))  -- "closed file"
```

この例では、ファイルハンドルの状態を判定しています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT