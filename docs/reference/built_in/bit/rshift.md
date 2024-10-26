# bit.rshift

```lua
bit.rshift (x, n)
```

## 説明

引数 `x` を右に `n` ビット論理シフトします。論理シフトにより、シフトされた部分はゼロで埋められます。シフト回数は下位5ビットだけが使用され、`[0..31]` の範囲で行われます。

## サンプルコード

```lua
print(bit.rshift(256, 8))            --> 1
print(bit.rshift(0x87654321, 12))    --> 554580
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.lshift`](lshift.md)
- [`bit.arshift`](arshift.md)