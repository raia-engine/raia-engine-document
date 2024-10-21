# file:close

```lua
file:close ()
```

## 説明

ファイルを閉じます。ファイルハンドルが自動的に閉じられることはありますが、予測できないため明示的に閉じるのが望ましいです。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Data")
file:close()  -- ファイルを閉じる
```

この例では、ファイルを開き、データを書き込み、閉じています。

## 互換性

Lua 5.1