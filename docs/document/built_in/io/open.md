# io.open

```lua
io.open (filename [, mode])
```

## 説明

指定されたモードでファイルを開き、ファイルハンドルを返します。モードには `"r"`、`"w"`、`"a"` などが指定可能です。

## サンプルコード

```lua
local file = io.open("test.txt", "r")  -- 読み取り専用でファイルを開く
local content = file:read("*a")  -- ファイル全体を読み込む
print(content)
file:close()
```

この例では、ファイルを読み取り専用で開いて、その内容を読み込んで出力しています。

## 互換性

- Lua 5.1

## 関連項目

- [`file:read`](file_read.md)
- [`file:write`](file_write.md)