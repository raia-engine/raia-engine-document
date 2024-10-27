# string.upper

```lua
string.upper (s)
```

## 説明

文字列 `s` のアルファベット小文字を大文字に変換した新しい文字列を返します。元の文字列 `s` は変更されません。

## サンプルコード

```lua
local s = "hello"
print(string.upper(s))  -- "HELLO"
```

この例では、文字列`"hello"`を大文字に変換しています。

## 互換性

- Lua 5.1

## 関連項目

- [`string.lower`](lower.md)