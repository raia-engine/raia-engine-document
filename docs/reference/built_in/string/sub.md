# string.sub

```lua
string.sub (s, i [, j])
```

## 説明

文字列`s`の部分文字列を返します。`i`は開始位置、`j`は終了位置です。`j`を省略した場合は文字列の終わりまで取得します。

## サンプルコード

```lua
local s = string.sub("Lua is great", 1, 3)
print(s)  -- "Lua"
```

この例では、文字列の最初の3文字を返しています。

## 互換性

- Lua 5.1

## 関連項目

- [`string.len`](len.md)