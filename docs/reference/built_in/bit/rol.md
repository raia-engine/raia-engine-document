# bit.rol

```lua
bit.rol (x, n)
```

## 説明

数値 `x` を `n` ビットだけ左にローテート（回転）します。ローテートでは、左にシフトアウトされたビットが右端に再度入ります。シフト量 `n` は下位5ビットのみが有効で、`[0..31]` の範囲で解釈されます。

## サンプルコード

```lua
print(bit.rol(0x12345678, 12))   --> 1164411171
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.ror`](ror.md)