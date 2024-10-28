# math.modf

整数部分と小数部分を分けて返す

```lua
math.modf (x)
```

## 説明

`x` を整数部分と小数部分に分け、それぞれを返します。戻り値は整数部分と小数部分の2つの数値です。

## サンプルコード

```lua
local x = 5.67
local int_part, frac_part = math.modf(x)
print(int_part, frac_part)  -- 5, 0.67
```

この例では、`5.67`を整数部分と小数部分に分けています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.fmod`](fmod.md)