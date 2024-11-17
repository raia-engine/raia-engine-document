# luaL_checklong

指定された引数が数値であることを確認し、`long`型として返します。

`[-0, +0, v]`

```c
long luaL_checklong (lua_State *L, int narg);
```

## 説明

関数の引数`narg`が数値であるか確認し、その数値を`long`にキャストして返します。

## サンプルコード

```c
long value = luaL_checklong(L, 1);
printf("長整数値: %ld\n", value);
```

このコードは、引数1が長整数であることを確認し、その値を表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkinteger
- luaL_checknumber