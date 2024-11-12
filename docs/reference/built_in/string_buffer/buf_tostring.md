# buf:tostring

バッファデータを消費せずに文字列として取得する

```lua
str = buf:tostring()
str = tostring(buf)
```

## 説明

バッファデータから文字列を生成しますが、それを消費しません。バッファは変わらずに残ります。

## サンプルコード

```lua
buf:put("Example buffer data")
local str = buf:tostring()
print(str) -- "Example buffer data"
```

バッファ内容を文字列として取得し、バッファの状態は変わらず残ります。

## 互換性

- LuaJIT

## 関連項目

- [`buf:get`](buf_get.md)
- [`buf:reset`](buf_reset.md)