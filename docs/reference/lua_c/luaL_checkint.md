# luaL_checkint

指定された引数が数値であることを確認し、`int`として返します。

`[-0, +0, v]`

```c
int luaL_checkint (lua_State *L, int narg);
```

## 説明

関数の引数`narg`が数値であるか確認し、その数値を`int`にキャストして返します。

## サンプルコード

```c
int value = luaL_checkint(L, 1);
printf("整数値: %d\n", value);
```

このコードは、引数1が整数であることを確認し、その値を表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checknumber
- luaL_checkinteger