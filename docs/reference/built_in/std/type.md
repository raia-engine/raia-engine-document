# type

引数のデータ型を文字列で返す

```lua
type (v)
```

## 説明

引数 `v` のデータ型を示す文字列を返します。返される可能性のある文字列は、`"nil"`（文字列であって値の `nil` ではありません）、`"number"`、`"string"`、`"boolean"`、`"table"`、`"function"`、`"thread"`、`"userdata"` です。

## サンプルコード

```lua
print(type(10))  -- "number"
```

この例では、引数の型が表示されます。

## 互換性

- Lua5.1