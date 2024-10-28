# math.pow

べき乗を計算する（`^`演算子と同じ）

```lua
math.pow (x, y)
```

## 説明

`x` の `y` 乗を計算して返します。この計算は `x ^ y` と同等です。

## サンプルコード

```lua
local x, y = 2, 3
print(math.pow(x, y))  -- 8
```

この例では、`2`の`3`乗を計算しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.exp`](exp.md)