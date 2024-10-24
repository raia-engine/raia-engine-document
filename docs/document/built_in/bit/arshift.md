# bit.arshift

```lua
bit.arshift (x, n)
```

## 説明

引数 `x` を右に `n` ビット算術シフトします。算術シフトでは符号ビットが保持され、最上位ビットは複製されます。シフト回数は下位5ビットだけが使用され、`[0..31]` の範囲で行われます。

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