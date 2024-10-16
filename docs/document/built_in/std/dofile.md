# dofile

指定されたファイルをLuaスクリプトとして実行する

```lua
dofile ([filename])
```

## 説明

指定されたファイルを開き、その内容をLuaチャンクとして実行します。引数なしで呼び出された場合、`dofile`は標準入力(stdin)の内容を実行します。チャンクによって返されたすべての値を返します。エラーが発生した場合、`dofile`はその呼び出し元にエラーを伝播します（つまり、`dofile`は保護モードで実行されません）。

## サンプルコード

```lua
dofile("script.lua")
```

この例では、`script.lua`が実行されます。

## 互換性

- Lua5.1

## 関連項目

- [`load`](load.md)
- [`loadfile`](loadfile.md)
- [`loadstring`](loadstring.md)