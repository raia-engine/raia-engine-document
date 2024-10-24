# file:seek

```lua
file:seek ([whence [, offset]])
```

## 説明

ファイルの読み書き位置を設定または取得します。`whence`には `"set"`（開始位置）、`"cur"`（現在の位置）、`"end"`（ファイルの終わり）を指定し、`offset` でオフセットを指定します。

## サンプルコード

```lua
local file = io.open("test.txt", "r")
file:seek("end", -10)  -- ファイルの終わりから10バイト前に移動
local content = file:read("*a")
print(content)
file:close()
```

この例では、ファイルの終わりから指定された位置に移動してデータを読み込んでいます。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT