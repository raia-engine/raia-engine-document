# package.cpath

Cライブラリの検索パスを定義する

```lua
package.cpath
```

## 説明

C 言語で書かれたライブラリ（拡張モジュール）を検索する際に、`require` が使用するパスを定義する文字列です。このパスは、環境変数 `LUA_CPATH` または Lua のデフォルトパスによって初期化されます。

## サンプルコード

```lua
print(package.cpath)
```

この例では、`require`がCライブラリを探すために使用するパスが表示されます。

## 互換性

- Lua 5.1

## 関連項目

- [`require`](require.md)
- [`package.path`](path.md)