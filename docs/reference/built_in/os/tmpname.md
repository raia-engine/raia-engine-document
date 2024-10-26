# os.tmpname

```lua
os.tmpname ()
```

## 説明

一時ファイル名を表す文字列を返します。このファイルはプログラム終了後に手動で削除する必要があります。

## サンプルコード

```lua
local tmpfile = os.tmpname()
print("Temporary file name: " .. tmpfile)
```

この例では、一時ファイル名を生成して表示しています。

## 互換性

- Lua 5.1