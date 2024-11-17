# luaL_optint

指定された引数が数値である場合、その数値を`int`型で返します。引数が省略された場合や`nil`の場合はデフォルト値を返します。

`[-0, +0, v]`

```c
int luaL_optint (lua_State *L, int narg, int d);
```

## 説明

関数の引数`narg`が数値の場合、この数値をint型にキャストして返します。この引数が存在しないかnilの場合は`d`を返します。そうでない場合、エラーを発生させます。

## サンプルコード

```c
int value = luaL_optint(L, 1, 42);
printf("整数値: %d\n", value);
```

このコードは、引数1が省略された場合や`nil`の場合にデフォルト値42を返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkint
- luaL_optinteger