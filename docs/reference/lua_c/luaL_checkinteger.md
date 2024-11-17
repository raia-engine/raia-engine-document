# luaL_checkinteger

指定された引数が数値であることを確認し、`lua_Integer`型として返します。

`[-0, +0, v]`

```c
lua_Integer luaL_checkinteger (lua_State *L, int narg);
```

## 説明

関数の引数`narg`が数値であるか確認し、その数値を`lua_Integer`にキャストして返します。

## サンプルコード

```c
lua_Integer value = luaL_checkinteger(L, 1);
printf("整数値: %lld\n", (long long)value);
```

このコードは、引数1が整数であることを確認し、その値を表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checknumber
- luaL_checkint