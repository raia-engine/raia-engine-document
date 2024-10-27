# package.searchpath

指定されたモジュール名をパスで検索する

```lua
package.searchpath (name, path [, sep [, rep]])
```

## 説明

指定されたモジュール名 `name` を、指定されたパス `path` を使って検索します。

- `path`：セミコロンで区切られたテンプレート文字列です。各テンプレート内の疑問符（`?`）を、`name` のコピーに置き換えます。
- `sep`：`name` 内の区切り文字を指定します。デフォルトはドット（`.`）です。
- `rep`：ファイルパス内の区切り文字を指定します。デフォルトはシステムのディレクトリ区切り文字（UNIX 系ではスラッシュ `/`）です。

例えば、`path` が以下のような文字列の場合：

```
"./?.lua;./?.lc;/usr/local/?/init.lua"
```

`name` が `"foo.a"` の場合、`name` 内のドットをスラッシュに置き換え、`"foo/a"` となります。これを疑問符に置き換えて、以下のファイルをこの順番で試します：

- `./foo/a.lua`
- `./foo/a.lc`
- `/usr/local/foo/a/init.lua`

ファイルが見つかった場合、そのファイル名を返します。見つからなかった場合は、`nil` とエラーメッセージ（試した全てのファイル名が含まれる）を返します。

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