# bit.bxor

数値同士のビット単位のXOR演算を行う

```lua
bit.bxor (x1 [, x2...])
```

## 説明

複数の引数 `x1, x2...` に対してビット単位の排他的OR（XOR）演算を行います。各引数の対応するビット同士でXOR演算が適用され、結果を返します。

## サンプルコード

```lua
print(bit.bxor(0xa5a5f0f0, 0xaa55ff00))  --> 267390960
print(bit.bxor(0x12345678, 0x87654321))  --> -1789848231
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.band`](band.md)
- [`bit.bor`](bor.md)