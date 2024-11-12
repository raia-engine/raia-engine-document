# buf:set

指定したデータでバッファをリセットする

```lua
buf = buf:set(str)
buf = buf:set(cdata, len) -- FFI
```

## 説明

このメソッドは、文字列またはFFI cdataオブジェクトをバッファとしてゼロコピーで消費することを可能にします。元々割り当てられていたバッファスペースは解放されます。

## サンプルコード

```lua
buf:set("New buffer content")
print(buf:tostring())
```

指定した文字列でバッファを置き換え、内容を表示します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:put`](buf_put.md)
- [`buf:putcdata`](buf_putcdata.md)