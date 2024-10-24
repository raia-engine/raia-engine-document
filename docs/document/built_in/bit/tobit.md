# bit.tobit

```lua
bit.tobit (x)
```

## 説明

数値をビット演算に使用できる数値範囲に正規化して返します。この関数は通常不要です。なぜなら、すべてのビット演算が入力引数を自動的に正規化するためです。

## サンプルコード

```lua
print(bit.tobit(0xffffffff))     --> -1
print(bit.tobit(0xffffffff + 1)) --> 0
print(bit.tobit(2^40 + 1234))    --> 1234
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.tohex`](tohex.md)