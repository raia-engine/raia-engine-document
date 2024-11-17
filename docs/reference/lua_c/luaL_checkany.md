# luaL_checkany

指定された引数が存在するかをチェックします。

`[-0, +0, v]`

```c
void luaL_checkany (lua_State *L, int narg);
```

## 説明

位置`narg`に任意の型（nilを含む）の引数があるかどうかをチェックします。

## サンプルコード

```c
luaL_checkany(L, 1);
```

このコードは、引数1が存在することを確認します。

## 互換性

- Lua5.1

## 関連項目

- luaL_argcheck
- luaL_checktype