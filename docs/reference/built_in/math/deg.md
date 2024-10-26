# math.deg

```lua
math.deg (x)
```

## 説明

ラジアン単位の角度`x`を度単位に変換して返します。

## サンプルコード

```lua
local radians = math.pi
local degrees = math.deg(radians)
print(degrees)  -- 180
```

この例では、`π`ラジアンを度に変換しています。

## 互換性

- Lua 5.1

## 関連項目

- `math.rad`