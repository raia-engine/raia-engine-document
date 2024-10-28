# math.floor

指定された数値以下の最大の整数を返す

```lua
math.floor (x)
```

## 説明

`x` 以下の最大の整数（切り捨てた整数値）を返します。

## サンプルコード

```lua
local x = 1.8
print(math.floor(x))  -- 1
```

この例では、`1.8`以下の最大の整数を計算しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.ceil`](ceil.md)