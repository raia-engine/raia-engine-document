# debug.getupvalue

```lua
debug.getupvalue (func, up)
```

## 説明

関数`func`の`up`番目のアップバリューの名前と値を返します。指定したインデックスにアップバリューが存在しない場合は`nil`を返します。

## サンプルコード

```lua
local function outer()
  local x = 10
  local function inner() return x end
  print(debug.getupvalue(inner, 1))  -- 'x'とその値10が表示される
end

outer()
```

この例では、関数`inner`のアップバリュー`x`の名前と値が取得されます。

## LuaJIT独自の拡張

- メタメソッドを識別する。
- C関数を扱う。(Lua5.2から)

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.setupvalue`](setupvalue.md)