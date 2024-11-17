# luaL_optnumber

指定された引数が数値である場合、その数値を返します。引数が省略された場合や`nil`の場合はデフォルト値を返します。

`[-0, +0, v]`

```c
lua_Number luaL_optnumber (lua_State *L, int narg, lua_Number d);
```

## 説明

関数の引数`narg`が数値の場合、その数値を返します。この引数が欠けている場合や`nil`の場合は、`d`を返します。それ以外の場合はエラーを発生させます。

## サンプルコード

```c
lua_Number value = luaL_optnumber(L, 1, 3.14);
printf("数値: %f\n", value);
```

このコードは、引数1が省略された場合や`nil`の場合にデフォルト値3.14を返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checknumber
- lua_tonumber