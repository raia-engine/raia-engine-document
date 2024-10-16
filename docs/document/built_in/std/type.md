# type

引数のデータ型を文字列で返す

```lua
type (v)
```

## 説明

唯一の引数の型を文字列として返します。この関数の可能な結果は `"nil"`（文字列であり、値`nil`ではありません）、`"number"`、`"string"`、`"boolean"`、`"table"`、`"function"`、`"thread"`、および `"userdata"`です。

## サンプルコード

```lua
print(type(10))  -- "number"
```

この例では、引数の型が表示されます。

## 互換性

- Lua5.1