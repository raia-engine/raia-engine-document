# os.rename

```lua
os.rename (oldname, newname)
```

## 説明

ファイルやディレクトリの名前を `oldname` から `newname` に変更します。成功した場合は `true` を、失敗した場合は `nil` とエラーメッセージを返します。

## 補足

- `oldname` と `newname` はパスを含むことができます。
- 移動先のファイルやディレクトリが既に存在する場合、上書きされるかどうかはシステム依存です。

## サンプルコード

```lua
os.rename("oldname.txt", "newname.txt")  -- ファイルの名前を変更
```

この例では、ファイルの名前を変更しています。

## 互換性

- Lua 5.1