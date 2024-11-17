# luaL_setfuncs

テーブルに関数を登録し、オプションでアップバリューを設定します。

```c
void luaL_setfuncs (lua_State *L, const luaL_Reg *l, int nup);
```

## 説明

配列`l`（`luaL_Reg`参照）内のすべての関数をスタックのトップにあるテーブルに登録します（オプションのアップバリューの下に配置します。次を参照）。

`nup`がゼロでない場合、すべての関数は`nup`個のアップバリューを共有して作成され、それらの値はライブラリテーブルの上にスタックに事前にプッシュされる必要があります。登録後、これらの値はスタックからポップされます。

## サンプルコード

```c
luaL_Reg funcs[] = {
    {"hello", hello_function},
    {NULL, NULL}
};
lua_newtable(L);  // 新しいテーブルを作成
luaL_setfuncs(L, funcs, 0);
```

このコードは、新しいテーブルを作成し、関数`hello_function`を登録します。

## 互換性

- Lua5.2

## 関連項目

- luaL_newlib
- luaL_newlibtable