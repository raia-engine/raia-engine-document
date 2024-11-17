# luaL_newlibtable

関数リストを格納するのに適したサイズの新しいテーブルを作成します。

```c
void luaL_newlibtable (lua_State *L, const luaL_Reg l[]);
```

## 説明

配列`l`内のすべてのエントリを格納するのに最適なサイズの新しいテーブルを作成しますが、実際にはエントリは格納しません。これは`luaL_setfuncs`と組み合わせて使用されることを意図しています（`luaL_newlib`参照）。

これはマクロとして実装されています。配列`l`は実際の配列でなければならず、ポインタではありません。

## サンプルコード

```c
luaL_Reg funcs[] = {
    {"hello", hello_function},
    {NULL, NULL}
};
luaL_newlibtable(L, funcs);  // 最適なサイズのテーブルを作成
```

このコードは、関数リスト`funcs`を格納するのに適したサイズのテーブルを作成します。

## 互換性

- Lua5.2

## 関連項目

- luaL_setfuncs
- luaL_newlib