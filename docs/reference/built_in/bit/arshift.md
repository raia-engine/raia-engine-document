# bit.arshift

```lua
bit.arshift (x, n)
```

## 説明

数値 `x` を `n` ビットだけ右に算術シフトします。算術シフトでは、符号ビット（最上位ビット）が保持され、その値がシフト後の上位ビットを埋めます。シフト量 `n` は下位5ビットのみが有効で、`[0..31]` の範囲で解釈されます。

## サンプルコード

```lua
print(bit.arshift(256, 8))            --> 1
print(bit.arshift(-256, 8))           --> -1
print(bit.arshift(0x87654321, 12))    --> -493996
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.lshift`](lshift.md)
- [`bit.rshift`](rshift.md)