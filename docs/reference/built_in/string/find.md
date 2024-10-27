# string.find

```lua
string.find (s, pattern [, init [, plain]])
```

## 説明

文字列 `s` の中で、指定されたパターン `pattern` に一致する最初の部分を検索し、その開始位置と終了位置を返します。オプションの `init` は検索を開始する位置を指定し、デフォルトは `1` です。`plain` に `true` を指定すると、パターンマッチング機能を無効にし、単純な文字列として `pattern` を検索します。

## 補足

- LuaJITではLua5.2から文字列マッチングパターン `%g` を取り入れています。

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