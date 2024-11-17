# luaL_checklstring

指定された引数が文字列であることを確認し、その文字列と長さを返します。

`[-0, +0, v]`

```c
const char *luaL_checklstring (lua_State *L, int narg, size_t *l);
```

## 説明

関数の引数`narg`が文字列であるか確認し、その文字列を返します。`l`が`NULL`でなければ、その文字列の長さを`*l`に設定します。

この関数は結果を得るために`lua_tolstring`を使用するため、その関数のすべての変換と注意点がここに適用されます。

## サンプルコード

```c
size_t len;
const char *str = luaL_checklstring(L, 1, &len);
printf("文字列: %s, 長さ: %zu\n", str, len);
```

このコードは、引数1が文字列であることを確認し、その内容と長さを表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkstring
- lua_tolstring