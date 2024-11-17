# luaL_optinteger

指定された引数が数値である場合、その数値を`lua_Integer`型で返します。引数が省略された場合や`nil`の場合はデフォルト値を返します。

`[-0, +0, v]`

```c
lua_Integer luaL_optinteger (lua_State *L, int narg, lua_Integer d);
```

## 説明

関数の引数`narg`が数値の場合、その数値を`lua_Integer`型にキャストして返します。この引数が欠けている場合や`nil`の場合は、`d`を返します。それ以外の場合はエラーを発生させます。

## サンプルコード

```c
lua_Integer value = luaL_optinteger(L, 1, 100);
printf("整数値: %lld\n", (long long)value);
```

このコードは、引数1が省略された場合や`nil`の場合にデフォルト値100を返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkinteger
- luaL_optint