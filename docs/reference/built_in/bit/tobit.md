# bit.tobit

数値を32ビット整数に変換する

```lua
bit.tobit (x)
```

## 説明

数値 `x` をビット演算が扱える数値範囲内に正規化して返します。ただし、この関数は通常必要ありません。すべてのビット演算関数が入力引数を自動的に正規化するためです。

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