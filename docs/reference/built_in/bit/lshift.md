# bit.lshift

数値を左にビットシフトする

```lua
bit.lshift (x, n)
```

## 説明

数値 `x` を `n` ビットだけ左に論理シフトします。シフトによって空いた下位ビットはゼロで埋められます。シフト量 `n` は下位5ビットのみが有効で、`[0..31]` の範囲で解釈されます。

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