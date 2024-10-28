# bit.bnot

数値のビット単位のNOT演算を行う

```lua
bit.bnot (x)
```

## 説明

数値 `x` のビットごとに反転（ビット単位の否定）を行います。各ビットが0なら1に、1なら0に変わります。結果は符号なし32ビット整数として解釈されます。

## サンプルコード

```lua
print(bit.bnot(0))            --> -1
print(bit.bnot(-1))           --> 0
print(bit.bnot(0xffffffff))   --> 0
print(bit.bnot(0x12345678))   --> -305419897
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.band`](band.md)
- [`bit.bor`](bor.md)
- [`bit.bxor`](bxor.md)