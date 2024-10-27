# package.loadlib

Cライブラリをロードする

```lua
package.loadlib (libname, funcname)
```

## 説明

指定された C ライブラリ `libname` をロードし、その中の関数 `funcname` を取得して返します。この関数は、C ライブラリを直接ロードし、モジュールのパス検索やローダーの仕組みをバイパスします。

## 補足

- `libname` はライブラリのファイル名で、システム依存のファイル拡張子（例：`.so`、`.dll`）を含みます。
- `funcname` は、ライブラリ内でエクスポートされている初期化関数の名前です。

## サンプルコード

```lua
local f = package.loadlib("mylib.so", "luaopen_mymodule")
f()
```

この例では、`mylib.so`というCライブラリをロードし、`luaopen_mymodule`関数を実行します。

## 互換性

- Lua 5.2

## 関連項目

- [`require`](require.md)
- [`package.cpath`](cpath.md)