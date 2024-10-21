# string.match

```lua
string.match (s, pattern [, init])
```

## 説明

文字列`s`からパターンに最初にマッチする部分を返します。`pattern`がキャプチャを指定していれば、そのキャプチャを返します。見つからなければ`nil`を返します。

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