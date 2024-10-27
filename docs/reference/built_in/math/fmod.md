# math.fmod

```lua
math.fmod (x, y)
```

## 説明

`x` を `y` で割った余りを返します。商はゼロに向かって丸められます。

## 補足

- この関数は、C言語の `fmod` 関数と同等の動作をします。

## サンプルコード

```lua
local x, y = 7, 3
print(math.fmod(x, y))  -- 1
```

この例では、`7 ÷ 3`の余りを計算しています。

## 互換性

- Lua 5.1

## 関連項目

- [`math.modf`](modf.md)