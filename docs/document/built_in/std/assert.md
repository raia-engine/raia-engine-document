# assert

```lua
assert(v [, message])
```

引数`v`の値が偽（すなわち、`nil`または`false`）の場合にエラーを発生させます。それ以外の場合は、すべての引数を返します。`message`はエラーメッセージで、省略された場合は「assertion failed!」がデフォルトです。

- 互換性: Lua5.1