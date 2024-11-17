# luaL_register

新しいライブラリを登録します。

`[-(0|1), +1, m]`

```c
void luaL_register (lua_State *L, const char *libname, const luaL_Reg *l);
```

## 説明

ライブラリをオープンします。

`libname`が`NULL`に等しい場合、単にリスト`l`内のすべての関数（`luaL_Reg`を参照）をスタックのトップにあるテーブルに登録します。

`libname`が非`null`で呼び出された場合、`luaL_register`は新しいテーブル`t`を作成し、グローバル変数`libname`の値として設定し、`package.loaded[libname]`の値として設定し、リスト`l`のすべての関数をそれに登録します。`package.loaded[libname]`や変数`libname`にテーブルがある場合は、新しいテーブルを作成する代わりにこのテーブルを再利用します。

いずれの場合も、関数はテーブルをスタックのトップに残します。

## サンプルコード

```c
luaL_register(L, "mylib", mylib);
```

このコードは、ライブラリ`mylib`を登録し、関数をLuaに公開します。

## 互換性

- Lua5.1

## 関連項目

- luaL_Reg
- luaL_openlibs