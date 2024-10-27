# file:seek

```lua
file:seek ([whence [, offset]])
```

## 説明

ファイルの現在の読み書き位置を設定または取得します。`whence` には基準位置を指定し、`"set"`（ファイルの先頭）、`"cur"`（現在位置）、`"end"`（ファイルの終端）が指定できます。`offset` で基準位置からのオフセットを指定します。引数なしで呼び出すと、現在のファイル位置を返します。

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