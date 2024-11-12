# buf:reserve

指定したサイズの書き込みスペースを予約する

```lua
ptr, len = buf:reserve(size) -- FFI
buf = buf:commit(used) -- FFI
```

## 説明

`reserve`メソッドは、バッファ内に少なくともsizeバイトの書き込みスペースを予約します。このスペースを指すFFIポインタ`ptr`とバイト数`len`を返します。

## サンプルコード

```lua
local ptr, len = buf:reserve(128)
for i = 0, len - 1 do
  ptr[i] = string.byte("A")
end
buf:commit(len)
print(buf:tostring())
```

128バイト分のスペースを予約し、文字`A`で埋めてバッファにコミットします。

## 互換性

- LuaJIT

## 関連項目

- [`buf:skip`](buf_skip.md)