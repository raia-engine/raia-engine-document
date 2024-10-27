# string.match

```lua
string.match (s, pattern [, init])
```

## 説明

文字列 `s` の中から、パターン `pattern` に最初にマッチした部分を返します。`pattern` にキャプチャが含まれている場合は、そのキャプチャの内容を返します。マッチが見つからない場合は `nil` を返します。

## 補足

- LuaJITではLua5.2から文字列マッチングパターン `%g` を取り入れています。

## サンプルコード

```lua
local s = "I have 2 apples"
local number = string.match(s, "%d+")
print(number)  -- 2
```

この例では、文字列の中から最初に見つかる数字を抽出しています。

## 互換性

- Lua 5.1

## 関連項目

- [`string.find`](find.md)
- [`string.gmatch`](gmatch.md)