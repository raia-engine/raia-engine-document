# io.popen

```lua
io.popen (prog [, mode])
```

## 説明

指定されたプログラム `prog` をサブプロセスとして実行し、その標準入出力にアクセスできるファイルハンドルを返します。`mode` は `"r"`（読み取り用）または `"w"`（書き込み用）を指定します。

## サンプルコード

```lua
local file = io.popen("ls")  -- ls コマンドを実行
local result = file:read("*a")  -- 結果をすべて読み取る
print(result)
file:close()
```

この例では、`ls` コマンドを実行して、その結果を読み込んで表示しています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT