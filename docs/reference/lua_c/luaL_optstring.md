# luaL_optstring

指定された引数が文字列である場合、その文字列を返します。引数が省略された場合や`nil`の場合はデフォルト文字列を返します。

`[-0, +0, v]`

```c
const char *luaL_optstring (lua_State *L, int narg, const char *d);
```

## 説明

関数の引数`narg`が文字列の場合、その文字列を返します。この引数が欠けている場合や`nil`の場合は、`d`を返します。それ以外の場合はエラーを発生させます。

## サンプルコード

```c
const char *str = luaL_optstring(L, 1, "default");
printf("文字列: %s\n", str);
```

このコードは、引数1が省略された場合や`nil`の場合にデフォルト文字列「default」を返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkstring
- lua_tolstring