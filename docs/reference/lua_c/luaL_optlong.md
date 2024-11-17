# luaL_optlong

指定された引数が数値である場合、その数値を`long`型で返します。引数が省略された場合や`nil`の場合はデフォルト値を返します。

`[-0, +0, v]`

```c
long luaL_optlong (lua_State *L, int narg, long d);
```

## 説明

関数の引数`narg`が数値の場合、その数値を`long`型にキャストして返します。この引数が欠けている場合や`nil`の場合は、`d`を返します。それ以外の場合はエラーを発生させます。

## サンプルコード

```c
long value = luaL_optlong(L, 1, 200L);
printf("長整数値: %ld\n", value);
```

このコードは、引数1が省略された場合や`nil`の場合にデフォルト値200を返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checklong
- luaL_optinteger