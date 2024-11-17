# luaL_getmetatable

レジストリ内の指定された名前で関連付けられたメタテーブルを取得します。

`[-0, +1, -]`

```c
void luaL_getmetatable (lua_State *L, const char *tname);
```

## 説明

レジストリ内の`tname`名で関連付けられたメタテーブルをスタックにプッシュします（`luaL_newmetatable`を参照）。

## サンプルコード

```c
luaL_getmetatable(L, "MyType");
```

このコードは、レジストリ内の「MyType」メタテーブルを取得し、スタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- luaL_newmetatable
- luaL_checkudata