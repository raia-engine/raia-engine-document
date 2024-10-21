# string.dump

```lua
string.dump (function)
```

## 説明

指定された関数のバイナリ表現を含む文字列を返します。この文字列を後で`loadstring`を使って読み込むと、関数のコピーが得られます。

## サンプルコード

```lua
local f = function() print("Hello") end
local dumped = string.dump(f)
print(dumped)
```

この例では、関数のバイナリ表現が出力されます。

## 互換性

- Lua 5.1

## 関連項目

- [`loadstring`](../std/loadstring.md)
