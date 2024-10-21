# math.rad

```lua
math.rad (x)
```

## 説明

度単位で与えられた角度`x`をラジアン単位に変換して返します。

## サンプルコード

```lua
local degrees = 180
local radians = math.rad(degrees)
print(radians)  -- 3.1415926535898
```

この例では、`180度`をラジアンに変換しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.deg`](deg.md)