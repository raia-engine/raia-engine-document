# bit.tohex

```lua
bit.tohex (x [, n])
```

## 説明

引数 `x` を16進数表現の文字列に変換します。オプションの第2引数 `n` は生成する桁数を指定し、正の数は小文字の16進数を、負の数は大文字の16進数を生成します。桁数が1から8に設定できます。デフォルトは8桁です。負の数を扱う際は符号なしの32ビット整数として処理されます。

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