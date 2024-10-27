# file:lines

```lua
file:lines ()
```

## 説明

ファイルから1行ずつデータを読み取るイテレータ関数を返します。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
for line in file:lines() do
    print(line)
end
file:close()
```

この例では、ファイルの各行を繰り返し処理しています。

## LuaJIT独自の拡張

- 64ビットファイルオフセットを扱う。
- `io.read()`のオプションを処理する。(Lua5.2から)

## 互換性

- Lua 5.1
- LuaJIT