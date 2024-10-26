# print

標準出力に値を出力する

```lua
print (...)
```

## 説明

任意の数の引数を受け取り、それらの値を`tostring`関数を使用して文字列に変換し、標準出力に出力します。`print`は整形された出力を意図したものではなく、通常はデバッグのために値をすばやく表示するためだけに使用されます。整形された出力には`string.format`を使用してください。

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