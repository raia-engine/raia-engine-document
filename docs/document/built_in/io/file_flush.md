# file:flush

```lua
file:flush ()
```

## 説明

書き込みバッファの内容をディスクに保存します。

## サンプルコード

```lua
local file = io.open("test.txt", "w")
file:write("Hello")
file:flush()  -- データをフラッシュする
```

この例では、書き込みバッファの内容をフラッシュしています。

## 互換性

- Lua 5.1