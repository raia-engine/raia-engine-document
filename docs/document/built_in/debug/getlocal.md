# debug.getlocal

```lua
debug.getlocal ([thread,] level, local)
```

## 説明

指定したスタックレベル`level`の関数のローカル変数の名前と値を取得します。`local`はその変数のインデックスを指定します。

## サンプルコード

```lua
local function test()
  local x = 10
  print(debug.getlocal(1, 1))  -- 'x'とその値10が表示される
end

test()
```

この例では、ローカル変数`x`の名前と値が表示されます。

## LuaJIT独自の拡張

- メタメソッドを識別する。
- レベルではなく関数を受け入れる。(Lua5.2から)
- 可変引数に対して負のインデックスを受け入れる。(Lua5.2から)

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.setlocal`](setlocal.md)