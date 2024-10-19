# package.path

Luaスクリプトの検索パスを定義する

```lua
package.path
```

## 説明

Luaライブラリを探すために`require`が使用するパスです。起動時に環境変数`LUA_PATH`またはデフォルトパスで初期化されます。

## サンプルコード

```lua
print(package.path)
```

この例では、Luaライブラリの検索パスが表示されます。

## 互換性

Lua 5.1

## 関連項目

- `require`
- `package.cpath`