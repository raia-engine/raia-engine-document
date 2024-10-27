# debug.upvaluejoin

```lua
debug.upvaluejoin (f1, n1, f2, n2)
```

## 説明

関数`f1`の`n1`番目のアップバリューを、関数`f2`の`n2`番目のアップバリューに結合します。これにより、複数の関数が同じアップバリューを共有できるようになります。

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

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.2
- LuaJIT

## 関連項目

- [`debug.upvalueid`](upvalueid.md)
