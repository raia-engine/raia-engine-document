# lua_typename

指定された型コードに対応する型の名前を返します。

`[-0, +0, -]`

```c
const char *lua_typename (lua_State *L, int tp);
```

## 説明

`tp`でエンコードされた型の名前を返します。`tp`は`lua_type`によって返された値でなければなりません。

## サンプルコード

```c
printf("型名: %s\n", lua_typename(L, LUA_TNUMBER));
```

このコードは、`LUA_TNUMBER`型に対応する型の名前を表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_type
- luaL_typename