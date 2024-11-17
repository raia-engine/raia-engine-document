# luaL_checkudata

指定された引数が特定の型のユーザーデータであることを確認します。

`[-0, +0, v]`

```c
void *luaL_checkudata (lua_State *L, int narg, const char *tname);
```

## 説明

関数の引数`narg`が型`tname`のユーザーデータであるか確認します（`luaL_newmetatable`を参照）。

## サンプルコード

```c
MyType *data = (MyType *)luaL_checkudata(L, 1, "MyType");
```

このコードは、引数1が「MyType」型のユーザーデータであることを確認します。

## 互換性

- Lua5.1

## 関連項目

- luaL_newmetatable
- luaL_getmetafield