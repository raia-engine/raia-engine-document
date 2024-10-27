# dofile

指定されたファイルをLuaスクリプトとして実行する

```lua
dofile ([filename])
```

## 説明

指定したファイルを開き、その内容を Lua のチャンクとして実行します。引数を省略すると、`dofile` は標準入力（stdin）の内容を実行します。チャンクが返すすべての値をそのまま返します。エラーが発生した場合、`dofile` はエラーを呼び出し元に伝播します（つまり、`dofile` は保護モードで実行されません）。

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