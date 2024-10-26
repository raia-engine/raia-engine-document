# math.randomseed

```lua
math.randomseed (x)
```

## 説明

擬似乱数生成器のシードを`x`に設定します。同じシードを設定すれば、同じ乱数列を再現できます。

## サンプルコード

```lua
math.randomseed(os.time())
print(math.random(1, 100))  -- 1から100の乱数
```

この例では、現在の時刻を使って擬似乱数生成器のシードを設定しています。

## LuaJIT独自の拡張

LuaJITは、Tausworthe PRNGを使用して`math.random()`と`math.randomseed()`を実装しています。

## 互換性

- Lua5.1
- LuaJIT

## 関連項目

- [`math.random`](random.md)