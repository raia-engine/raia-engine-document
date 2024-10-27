# io.open

```lua
io.open (filename [, mode])
```

## 説明

引数 `filename` で指定したファイルを引数 `mode` で指定したモードで開き、ファイルハンドルを返します。`mode` には `"r"`（読み込み）、`"w"`（書き込み）、`"a"`（追記）などが指定できます。

## サンプルコード

```lua
local file = io.open("test.txt", "r")  -- 読み取り専用でファイルを開く
local content = file:read("*a")  -- ファイル全体を読み込む
print(content)
file:close()
```

この例では、ファイルを読み取り専用で開いて、その内容を読み込んで出力しています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`file:read`](file_read.md)
- [`file:write`](file_write.md)