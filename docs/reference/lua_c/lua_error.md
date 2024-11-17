# lua_error

Luaエラーを生成します。

`[-1, +0, v]`

```c
int lua_error (lua_State *L);
```

## 説明

Luaエラーを生成します。エラーメッセージ（実際には任意の型のLua値になり得ます）はスタックの先頭になければなりません。この関数はロングジャンプを行うため、決して戻りません（`luaL_error`を参照）。

## サンプルコード

```c
lua_pushstring(L, "エラーメッセージ");
lua_error(L);
```

このコードは、指定したエラーメッセージをLuaエラーとしてスローします。

## 互換性

- Lua5.1

## 関連項目

- luaL_error
- luaL_traceback