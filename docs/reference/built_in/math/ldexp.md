# math.ldexp

```lua
math.ldexp (m, e)
```

## 説明

`m * 2^e` を計算して返します。これは `math.frexp` の逆関数です。

## サンプルコード

```lua
local m, e = 0.5, 4
print(math.ldexp(m, e))  -- 8
```

この例では、`0.5 * 2^4`を計算しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.frexp`](frexp.md)