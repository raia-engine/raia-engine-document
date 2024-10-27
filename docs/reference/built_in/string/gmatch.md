# string.gmatch

```lua
string.gmatch (s, pattern)
```

## 説明

文字列 `s` に対して、パターン `pattern` に一致する部分文字列を順に返すイテレータ関数を生成します。キャプチャが指定されていない場合は、マッチした全体の文字列が返されます。

## 補足

- LuaJITではLua5.2から文字列マッチングパターン `%g` を取り入れています。

## サンプルコード

```lua
local s = "Lua is great"
for word in string.gmatch(s, "%a+") do
    print(word)  -- "Lua", "is", "great"
end
```

この例では、文字列内のすべての単語を取得して出力します。

## LuaJIT独自の拡張

- 文字列マッチングパターン`%g`が追加された。(Lua5.2から)

## 互換性

- Lua 5.1

## 関連項目

- [`string.match`](match.md)