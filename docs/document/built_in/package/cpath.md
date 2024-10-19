# package.cpath

Cライブラリの検索パスを定義する

```lua
package.cpath
```

## 説明

Cライブラリを探すために`require`が使用するパスです。このパスは、環境変数`LUA_CPATH`またはLuaのデフォルトパスによって初期化されます。

## サンプルコード

```lua
print(package.cpath)
```

この例では、`require`がCライブラリを探すために使用するパスが表示されます。

## 互換性

Lua 5.1

## 関連項目

- `require`
- `package.path`