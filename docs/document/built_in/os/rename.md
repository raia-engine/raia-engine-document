# os.rename

```lua
os.rename (oldname, newname)
```

## 説明

ファイルやディレクトリの名前を変更します。失敗した場合は`nil`とエラーメッセージを返します。

## サンプルコード

```lua
os.rename("oldname.txt", "newname.txt")  -- ファイルの名前を変更
```

この例では、ファイルの名前を変更しています。

## 互換性

- Lua 5.1