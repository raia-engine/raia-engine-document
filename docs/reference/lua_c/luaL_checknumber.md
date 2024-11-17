# luaL_checknumber

指定された引数が数値であることを確認し、`lua_Number`型として返します。

`[-0, +0, v]`

```c
lua_Number luaL_checknumber (lua_State *L, int narg);
```

## 説明

関数の引数`narg`が数値であるか確認し、その数値を返します。

## サンプルコード

```c
lua_Number value = luaL_checknumber(L, 1);
printf("数値: %f\n", value);
```

このコードは、引数1が数値であることを確認し、その値を表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_optnumber
- lua_tonumber