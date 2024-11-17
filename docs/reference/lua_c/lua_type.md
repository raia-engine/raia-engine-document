# lua_type

指定されたインデックスの値の型を取得します。

`[-0, +0, -]`

```c
int lua_type (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスの値の型を返します。非有効なインデックスの場合は`LUA_TNONE`を返します（つまり、"空"のスタック位置へのインデックス）。`lua_type`によって返される型は、`lua.h`で定義された以下の定数によってコード化されます：`LUA_TNIL`, `LUA_TNUMBER`, `LUA_TBOOLEAN`, `LUA_TSTRING`, `LUA_TTABLE`, `LUA_TFUNCTION`, `LUA_TUSERDATA`, `LUA_TTHREAD`, そして`LUA_TLIGHTUSERDATA`。

## サンプルコード

```c
int type = lua_type(L, 1);
printf("型: %s\n", lua_typename(L, type));
```

このコードは、指定されたインデックスの値の型を取得し、名前を表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_typename
- lua_isnumber