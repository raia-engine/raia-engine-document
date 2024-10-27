# string.lower

```lua
string.lower (s)
```

## 説明

文字列 `s` のアルファベット大文字を小文字に変換した新しい文字列を返します。元の文字列 `s` は変更されません。

## サンプルコード

```lua
local s = "HELLO"
print(string.lower(s))  -- "hello"
```

この例では、大文字の文字列を小文字に変換しています。

## 互換性

- Lua 5.1

## 関連項目

- [`string.upper`](upper.md)