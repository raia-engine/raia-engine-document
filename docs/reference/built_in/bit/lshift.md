# bit.lshift

```lua
bit.lshift (x, n)
```

## 説明

引数 `x` を左に `n` ビットシフトします。左シフトにより、シフトされた部分はゼロで埋められます。シフト回数は下位5ビットだけが使用され、`[0..31]` の範囲で行われます。

## サンプルコード

```lua
print(bit.lshift(1, 0))              --> 1
print(bit.lshift(1, 8))              --> 256
print(bit.lshift(0x12345678, 12))    --> 1165085696
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.rshift`](rshift.md)
- [`bit.arshift`](arshift.md)