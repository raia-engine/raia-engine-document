# math.frexp

```lua
math.frexp (x)
```

## 説明

`x` を `x = m * 2^e` の形に分解し、仮数 `m` と指数 `e` を返します。`m` は 0.5 以上 1 未満の値（`|m| >= 0.5 and |m| < 1`）です。

## サンプルコード

```lua
local x = 8
local m, e = math.frexp(x)
print(m, e)  -- 0.5, 4
```

この例では、`8`を`0.5 * 2^4`に分解しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.ldexp`](ldexp.md)