# luaL_checktype

指定された引数の型が指定の型であるかを確認します。

`[-0, +0, v]`

```c
void luaL_checktype (lua_State *L, int narg, int t);
```

## 説明

関数の引数`narg`の型が`t`であるか確認します。`t`の型のエンコーディングについては`lua_type`を参照してください。

## サンプルコード

```c
luaL_checktype(L, 1, LUA_TNUMBER);
```

このコードは、引数1が数値型であることを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_type
- luaL_argcheck