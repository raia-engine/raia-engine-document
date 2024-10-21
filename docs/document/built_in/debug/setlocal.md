# debug.setlocal

```lua
debug.setlocal ([thread,] level, local, value)
```

## 説明

指定したスタックレベル`level`の関数のローカル変数`local`に値`value`を設定します。

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

## 互換性

- Lua 5.1

## 関連項目

- [`debug.getlocal`](getlocal.md)