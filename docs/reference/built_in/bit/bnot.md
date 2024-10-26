# bit.bnot

```lua
bit.bnot (x)
```

## 説明

数値 `x` のビット単位の否定（ビット反転）を行います。各ビットが反転され、符号なし32ビット整数として扱われます。

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