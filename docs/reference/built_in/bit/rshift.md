# bit.rshift

```lua
bit.rshift (x, n)
```

## 説明

数値 `x` を `n` ビットだけ右に論理シフトします。論理シフトでは、左端に空いたビットはゼロで埋められます。シフト量 `n` は下位5ビットのみが有効で、`[0..31]` の範囲で解釈されます。

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