# debug.setlocal

指定した関数のローカル変数の値を設定する

```lua
debug.setlocal ([thread,] level, local, value)
```

## 説明

指定したスタックレベル`level`にある関数のローカル変数`local`に値`value`を設定します。

## サンプルコード

```lua
local function test()
  local x = 10
  debug.setlocal(1, 1, 20)
  print(x)  -- 20が表示される
end

test()
```

この例では、ローカル変数`x`の値が変更されて表示されます。

## LuaJIT独自の拡張

- メタメソッドを識別する。
- 可変引数に対して負のインデックスを受け入れる。(Lua5.2から)

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.getlocal`](getlocal.md)