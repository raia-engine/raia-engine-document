# luaL_newlib

新しいテーブルを作成し、関数リストを登録します。

```c
void luaL_newlib (lua_State *L, const luaL_Reg *l);
```

## 説明

新しいテーブルを作成し、リスト`l`にある関数を登録します。これは次のマクロとして実装されています：

```c
(luaL_newlibtable(L,l), luaL_setfuncs(L,l,0))
```

## サンプルコード

```c
luaL_Reg funcs[] = {
    {"hello", hello_function},
    {NULL, NULL}
};
luaL_newlib(L, funcs);  // 新しいテーブルに関数を登録
```

このコードは、新しいテーブルを作成し、関数リスト`funcs`を登録します。

## 互換性

- Lua5.2

## 関連項目

- luaL_setfuncs
- luaL_newlibtable