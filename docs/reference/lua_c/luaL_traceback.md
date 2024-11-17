# luaL_traceback

指定されたLuaステートのスタックトレースを作成します。

```c
void luaL_traceback (lua_State *L, lua_State *L1, const char *msg, int level);
```

## 説明

スタック`L1`のトレースバックを作成してプッシュします。`msg`が`NULL`でない場合、それがトレースバックの先頭に追加されます。`level`パラメータはトレースバックの開始レベルを指定します。

## サンプルコード

```c
luaL_traceback(L, L1, "エラートレース:", 1);
printf("トレースバック: %s\n", lua_tostring(L, -1));
lua_pop(L, 1);
```

このコードは、スタックトレースを作成し、メッセージとともに表示します。

## 互換性

- Lua5.2

## 関連項目

- lua_error
- luaL_where