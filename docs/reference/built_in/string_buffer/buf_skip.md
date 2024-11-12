# buf:skip

指定したバイト数をスキップしてバッファデータを消費する

```lua
buf = buf:skip(len)
```

## 説明

バッファの現在のデータ長までの`len`バイトをスキップ（消費）します。

## サンプルコード

```lua
buf:put("Hello, world!")
buf:skip(7)
print(buf:tostring()) -- "world!"
```

バッファに文字列を追加し、先頭7バイトをスキップして残りの部分を表示します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:get`](buf_get.md)
- [`buf:reset`](buf_reset.md)