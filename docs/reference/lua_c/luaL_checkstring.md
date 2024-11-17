# luaL_checkstring

指定された引数が文字列であることを確認し、その文字列を返します。

`[-0, +0, v]`

```c
const char *luaL_checkstring (lua_State *L, int narg);
```

## 説明

関数の引数`narg`が文字列であるか確認し、その文字列を返します。

この関数は結果を得るために`lua_tolstring`を使用するので、その関数のすべての変換と注意点がここに適用されます。

## サンプルコード

```c
const char *str = luaL_checkstring(L, 1);
printf("文字列: %s\n", str);
```

このコードは、引数1が文字列であることを確認し、その内容を表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checklstring
- lua_tolstring