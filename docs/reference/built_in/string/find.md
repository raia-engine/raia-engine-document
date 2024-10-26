# string.find

```lua
string.find (s, pattern [, init [, plain]])
```

## 説明

文字列`s`で指定した`pattern`に一致する部分を探し、マッチが見つかればその開始位置と終了位置を返します。`init`は検索の開始位置、`plain`が`true`の場合はパターンマッチングを無効にして部分文字列検索を行います。

## サンプルコード

```lua
local s = "Hello Lua"
local start, stop = string.find(s, "Lua")
print(start, stop)  -- 7 9
```

この例では、`"Lua"`が見つかる位置を返します。

## LuaJIT独自の拡張

- 文字列マッチングパターン`%g`が追加された。(Lua5.2から)

## 互換性

- Lua 5.1

## 関連項目

- [`string.match`](match.md)
- [`string.gmatch`](gmatch.md)