# string.len

文字列の長さを返す

```lua
string.len (s)
```

## 説明

文字列 `s` の長さ（文字数）を返します。空文字列の場合は長さは `0` です。

## サンプルコード

```lua
local s = "Hello"
print(string.len(s))  -- 5
```

この例では、文字列`"Hello"`の長さを返します。

## 互換性

- Lua 5.1

## 関連項目

- [`string.sub`](sub.md)