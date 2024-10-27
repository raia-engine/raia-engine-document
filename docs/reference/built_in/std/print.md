# print

標準出力に値を出力する

```lua
print (...)
```

## 説明

複数の引数を受け取り、それぞれを `tostring` 関数で文字列に変換して標準出力に表示します。`print` はデバッグ目的で簡単に値を表示するための関数であり、フォーマットされた出力には適していません。整形された出力を行いたい場合は、`string.format` 関数を使用してください。

## サンプルコード

```lua
print("Hello, World!")
```

この例では、`"Hello, World!"`が表示されます。

## 互換性

- Lua5.1

## 関連項目

- [tostring](tostring.md)
- [string.format](../string/format.md)