# buf:put

データをバッファに追加する

```lua
buf = buf:put([str|num|obj] [,...])
```

## 説明

文字列`str`、数値`num`、または`__tostring`メタメソッドを持つ任意のオブジェクト`obj`をバッファに追加します。複数の引数は指定された順序で追加されます。

## サンプルコード

```lua
buf:put("Hello, ", "world!", 123)
print(buf:tostring())
```

文字列と数値をバッファに追加し、バッファの内容を文字列として出力します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:putf`](buf_putf.md)
- [`buf:set`](buf_set.md)