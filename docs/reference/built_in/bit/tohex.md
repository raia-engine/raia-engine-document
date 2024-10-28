# bit.tohex

数値を16進数の文字列に変換する

```lua
bit.tohex (x [, n])
```

## 説明

数値 `x` を16進数表記の文字列に変換します。オプションの第2引数 `n` で出力する桁数を指定できます。`n` が正の数の場合は小文字、負の数の場合は大文字の16進数で表記されます。桁数は1から8まで指定可能で、デフォルトは8桁です。負の数 `x` は符号なしの32ビット整数として扱われます。

## サンプルコード

```lua
print(bit.tohex(1))              --> 00000001
print(bit.tohex(-1))             --> ffffffff
print(bit.tohex(0xffffffff))     --> ffffffff
print(bit.tohex(-1, -8))         --> FFFFFFFF
print(bit.tohex(0x21, 4))        --> 0021
print(bit.tohex(0x87654321, 4))  --> 4321
```

## 互換性

- LuaJIT

## 関連項目

- [`bit.tobit`](tobit.md)