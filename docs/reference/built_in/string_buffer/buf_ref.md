# buf:ref

バッファデータを指すポインタと長さを取得する

```lua
ptr, len = buf:ref() -- FFI
```

## 説明

バッファデータを指すFFIポインタ`ptr`とデータの長さ`len`を取得します。

## サンプルコード

```lua
buf:put("Hello")
local ptr, len = buf:ref()
for i = 0, len - 1 do
  io.write(string.char(ptr[i]))
end
print() -- "Hello"
```

ポインタを使用してバッファの内容を読み取り、出力します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:skip`](buf_skip.md)
- [`buf:reserve`](buf_reserve.md)