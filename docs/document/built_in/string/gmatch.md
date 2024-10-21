# string.gmatch

```lua
string.gmatch (s, pattern)
```

## 説明

文字列`s`上でパターン`pattern`に一致する部分を順に返すイテレータ関数を生成します。キャプチャを指定していない場合は、マッチ全体が返されます。

## サンプルコード

```lua
local s = "Lua is great"
for word in string.gmatch(s, "%a+") do
    print(word)  -- "Lua", "is", "great"
end
```

この例では、文字列内のすべての単語を取得して出力します。

## 互換性

- Lua 5.1

## 関連項目

- [`string.match`](match.md)