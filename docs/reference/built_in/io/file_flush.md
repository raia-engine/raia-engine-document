# file:flush

```lua
file:flush ()
```

## 説明

書き込みバッファの内容をディスクにフラッシュ（強制的に書き込む）します。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Hello")
file:flush()  -- データをフラッシュする
```

この例では、書き込みバッファの内容をフラッシュしています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT