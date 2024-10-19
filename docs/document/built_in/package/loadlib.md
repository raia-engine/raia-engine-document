# package.loadlib

Cライブラリをロードする

```lua
package.loadlib (libname, funcname)
```

## 説明

指定されたCライブラリ`libname`をロードし、関数`funcname`を呼び出します。この関数はCライブラリと直接リンクし、モジュールやパスの検索をバイパスします。

## サンプルコード

```lua
local f = package.loadlib("mylib.so", "luaopen_mymodule")
f()
```

この例では、`mylib.so`というCライブラリをロードし、`luaopen_mymodule`関数を実行します。

## 互換性

Lua 5.2

## 関連項目

- `require`
- `package.cpath`