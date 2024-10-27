# package.path

Luaスクリプトの検索パスを定義する

```lua
package.path
```

## 説明

Lua スクリプト（Lua モジュール）を検索する際に、`require` が使用するパスを定義する文字列です。起動時に環境変数 `LUA_PATH` またはデフォルトのパスで初期化されます。

## サンプルコード

```lua
print(package.path)
```

この例では、Luaライブラリの検索パスが表示されます。

## 互換性

- Lua 5.1

## 関連項目

- [`require`](require.md)
- [`package.cpath`](cpath.md)