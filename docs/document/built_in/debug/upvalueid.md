# debug.upvalueid

```lua
debug.upvalueid (f, n)
```

## 説明

指定した関数`f`のn番目のアップバリューに対して、一意の識別子を返します。この識別子は、異なる関数が同じアップバリューを共有しているかどうかを確認するために使います。

## サンプルコード

```lua
local function outer()
  local x = 10
  local function inner1() return x end
  local function inner2() return x end
  print(debug.upvalueid(inner1, 1) == debug.upvalueid(inner2, 1))  -- true が表示される
end

outer()
```

この例では、2つの関数が同じアップバリューを共有しているかどうかが確認されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.2
- LuaJIT

## 関連項目

- [`debug.upvaluejoin`](upvaluejoin.md)