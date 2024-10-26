# package.searchpath

指定されたモジュール名をパスで検索する

```lua
package.searchpath (name, path [, sep [, rep]])
```

## 説明

指定された`name`を指定された`path`で検索します。

`path`はセミコロンで区切られたテンプレートの並びを含む文字列です。各テンプレートに対して、テンプレート内の疑問符（あれば）を`name`のコピーに置き換え、`name`内のすべての`sep`（デフォルトではドット）を`rep`（デフォルトではシステムのディレクトリ区切り文字）に置き換え、その結果生成されたファイル名を開こうとします。

例えば、`path`が次の文字列である場合：

```
"./?.lua;./?.lc;/usr/local/?/init.lua"
```

`foo.a`という名前の検索では、`./foo/a.lua`、`./foo/a.lc`、および`/usr/local/foo/a/init.lua`というファイルをこの順番で開こうとします。

この関数は、最初に読み取りモードで開けたファイルの結果名を返します（ファイルを閉じた後に）。もし成功しなければ、`nil`とエラーメッセージを返します（このエラーメッセージには開こうとしたすべてのファイル名が記載されます）。

## サンプルコード

```lua
local path = package.searchpath("mymodule", "./?.lua;./libs/?.lua")
print(path)  -- ファイルパスが見つかれば表示
```

この例では、`mymodule`というモジュールを指定されたパスで検索します。

## 互換性

- Lua 5.2

## 関連項目

- [`require`](require.md)
- [`package.path`](path.md)