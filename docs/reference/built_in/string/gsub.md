# string.gsub

文字列内でパターンに一致する部分を置換する

```lua
string.gsub (s, pattern, repl [, n])
```

## 説明

文字列 `s` の中で、パターン `pattern` に一致する部分を `repl` で置き換えた新しい文字列を返します。`repl` には、文字列、関数、またはテーブルを指定できます。オプションの `n` を指定すると、最初の `n` 回だけ置換が行われます。

## 補足

- LuaJITではLua5.2から文字列マッチングパターン `%g` を取り入れています。

## サンプルコード

```lua
local s = string.gsub("Lua is great", "great", "awesome")
print(s)  -- "Lua is awesome"
```

この例では、`"great"`を`"awesome"`に置き換えています。

## LuaJIT独自の拡張

- 文字列マッチングパターン`%g`が追加された。(Lua5.2から)

## 互換性

- Lua 5.1

## 関連項目

- [`string.find`](find.md)
- [`string.sub`](sub.md)