# io.close

```lua
io.close ([file])
```

## 説明

`file:close()` と同じです。ファイルが指定されていない場合、デフォルトの出力ファイルを閉じます。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Hello, Lua!")
io.close(file)  -- ファイルを閉じる
```

この例では、ファイルを開いてデータを書き込み、閉じています。

## 互換性

- Lua 5.1

## 関連項目

- [`file:close`](file_close.md)