# bit.bxor

```lua
bit.bxor (x1 [, x2...])
```

## 説明

すべての引数 `x1, x2...` に対してビット単位の排他的OR (XOR) 演算を行います。複数の引数を渡すことができ、各ビットが対応するビットごとにXOR処理されます。

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