# io.input

```lua
io.input ([file])
```

## 説明

引数 `file` にファイル名が指定された場合は、そのファイルを開いてデフォルトの入力ファイルとして設定します。ファイルハンドルが指定された場合、そのハンドルをデフォルトの入力ファイルとして設定します。引数なしで呼び出すと、現在のデフォルト入力ファイルを返します。

## サンプルコード

```lua
io.input("test.txt")  -- test.txt をデフォルトの入力ファイルに設定
local content = io.read("*a")  -- ファイル全体を読み込む
print(content)
```

この例では、ファイルをデフォルトの入力として設定し、その内容を読み込んで出力しています。

## LuaJIT独自の拡張

64ビットファイルオフセットを扱う。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`io.output`](output.md)