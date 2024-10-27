# io.close

```lua
io.close ([file])
```

## 説明

`io.close` は、指定された `file` を閉じます。これは `file:close()` と同じ動作です。ファイルが指定されていない場合、デフォルトの出力ファイルを閉じます。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Hello, Lua!")
io.close(file)  -- ファイルを閉じる
```

この例では、ファイルを開いてデータを書き込み、閉じています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`file:close`](file_close.md)