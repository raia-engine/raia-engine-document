# file:read

```lua
file:read (···)
```

## 説明

指定されたフォーマットでファイルからデータを読み取ります。フォーマットには `"n"`（数値）、`"l"`（行）、バイト数指定などがあります。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
local content = file:read("*a")  -- ファイル全体を読み込む
print(content)
file:close()
```

この例では、ファイル全体を読み取って出力しています。

## 互換性

- Lua 5.3