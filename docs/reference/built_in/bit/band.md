# bit.band

```lua
bit.band (x1 [, x2...])
```

## 説明

すべての引数 `x1, x2...` に対してビット単位のAND演算を行います。複数の引数を渡すことができ、各ビットが対応するビットごとにAND処理されます。

## サンプルコード

```lua
print(bit.band(0xf0f0, 0x0f0f))    --> 0
print(bit.band(0x12345678, 0xff))  --> 120
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.bor`](bor.md)
- [`bit.bxor`](bxor.md)