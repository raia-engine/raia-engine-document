# file:lines

```lua
file:lines ()
```

## 説明

ファイルから新しい行を返すイテレータ関数を返します。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
for line in file:lines() do
    print(line)
end
file:close()
```

この例では、ファイルの各行を繰り返し処理しています。

## 互換性

- Lua 5.1