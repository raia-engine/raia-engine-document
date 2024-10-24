# bit.bor

```lua
bit.bor (x1 [, x2...])
```

## 説明

すべての引数 `x1, x2...` に対してビット単位のOR演算を行います。複数の引数を渡すことができ、各ビットが対応するビットごとにOR処理されます。

## サンプルコード

```lua
print(bit.bor(1, 2, 4, 8))          --> 15
print(bit.bor(0x12345678, 0x0f0f))  --> 305422207
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.band`](band.md)
- [`bit.bxor`](bxor.md)