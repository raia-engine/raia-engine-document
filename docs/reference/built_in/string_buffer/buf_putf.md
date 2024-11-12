# buf:putf

フォーマットしたデータをバッファに追加する

```lua
buf = buf:putf(format, ...)
```

## 説明

フォーマットされた引数をバッファに追加します。フォーマット文字列は`string.format()`と同じオプションをサポートします。

## サンプルコード

```lua
buf:putf("Name: %s, Age: %d", "Alice", 30)
print(buf:tostring())
```

フォーマットされた文字列をバッファに追加し、バッファの内容を表示します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:put`](buf_put.md)
- [`buf:set`](buf_set.md)