# bit.bor

数値同士のビット単位のOR演算を行う

```lua
bit.bor (x1 [, x2...])
```

## 説明

複数の引数 `x1, x2...` に対してビット単位のOR演算を行います。各引数の対応するビット同士でOR演算が適用され、結果を返します。

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