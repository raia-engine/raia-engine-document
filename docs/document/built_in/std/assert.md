# assert

条件が偽の場合、エラーを発生させる

```lua
assert(v [, message])
```

## 説明

引数`v`の値が偽（すなわち、`nil`または`false`）の場合にエラーを発生させます。それ以外の場合は、すべての引数を返します。`message`はエラーメッセージで、省略された場合は「assertion failed!」がデフォルトです。

## サンプルコード

```lua
local x = 0
assert(x ~= 0, "x cannot be zero.")
```

この例では、`x`が0のためエラーメッセージが表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`error`](error.md)