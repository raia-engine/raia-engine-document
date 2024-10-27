# error

実行中の関数を停止し、エラーメッセージを返す

```lua
error (message [, level])
```

## 説明

実行中の関数を停止し、`message` をエラーメッセージとして返します。`error` 関数は呼び出し元に戻らず、最後に呼び出された保護された関数を終了させます。

通常、`error` はエラーメッセージの先頭にエラーが発生した位置の情報を追加します。オプションの `level` 引数は、エラー位置を特定するためのスタックレベルを指定します。レベル 1（デフォルト）では、`error` 関数が呼び出された場所がエラー位置となります。レベル 2 では、`error` を呼び出した関数の呼び出し元がエラー位置となります。以下同様にスタックをさかのぼります。レベル 0 を指定すると、エラーメッセージにエラー位置の情報が追加されません。

## サンプルコード

```lua
error("An error occurred.")
```
この例では、指定されたメッセージでエラーが発生します。

## 互換性

- Lua5.1

## 関連項目

- [`assert`](assert.md)