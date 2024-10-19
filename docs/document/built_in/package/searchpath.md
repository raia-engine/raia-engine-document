# package.searchpath

指定されたモジュール名をパスで検索する

```lua
package.searchpath (name, path [, sep [, rep]])
```

## 説明

指定された`name`を`path`で検索します。`sep`（デフォルトはドット）を`rep`（デフォルトはシステムのディレクトリ区切り文字）で置換してファイルを検索します。

## サンプルコード

```lua
local path = package.searchpath("mymodule", "./?.lua;./libs/?.lua")
print(path)  -- ファイルパスが見つかれば表示
```

この例では、`mymodule`というモジュールを指定されたパスで検索します。

## 互換性

Lua 5.2

## 関連項目

- `require`
- `package.path`