# file:setvbuf

```lua
file:setvbuf (mode [, size])
```

## 説明

ファイルのバッファリングモードを設定します。`mode` には `"no"`（バッファなし）、`"full"`（完全バッファリング）、`"line"`（行バッファリング）を指定し、必要に応じて `size` でバッファサイズを指定します。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:setvbuf("line")  -- 行バッファリングを設定
file:write("Line 1\n")
file:flush()
file:close()
```

この例では、行バッファリングモードを設定し、ファイルに書き込んでいます。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT