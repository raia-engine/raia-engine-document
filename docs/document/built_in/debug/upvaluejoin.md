# debug.upvaluejoin

```lua
debug.upvaluejoin (f1, n1, f2, n2)
```

## 説明

指定した関数`f1`のn1番目のアップバリューを、別の関数`f2`のn2番目のアップバリューに結合します。これにより、複数の関数が同じアップバリューを共有することができます。

## サンプルコード

```lua
local function outer()
  local x = 10
  local function inner1() return x end
  local function inner2() return 0 end
  debug.upvaluejoin(inner2, 1, inner1, 1)
  print(inner2())  -- 10が表示される
end

outer()
```

この例では、`inner2`のアップバリューが`inner1`のアップバリューと結合され、値が共有されます。

## 互換性

- Lua 5.2

## 関連項目

- [`debug.upvalueid`](upvalueid.md)
