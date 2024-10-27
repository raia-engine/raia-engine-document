# file:close

```lua
file:close ()
```

## 説明

ファイルを閉じます。ファイルハンドルは自動的に閉じられることもありますが、予測できないため、明示的に閉じることが推奨されます。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Data")
file:close()  -- ファイルを閉じる
```

この例では、ファイルを開き、データを書き込み、閉じています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT