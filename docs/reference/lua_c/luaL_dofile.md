# luaL_dofile

指定されたファイルをロードして実行します。

`[-0, +?, m]`

```c
int luaL_dofile (lua_State *L, const char *filename);
```

## 説明

指定されたファイルをロードして実行します。以下のマクロとして定義されています：

```c
(luaL_loadfile(L, filename) || lua_pcall(L, 0, LUA_MULTRET, 0))
```

エラーがなければ0を返し、エラーがある場合は1を返します。

## サンプルコード

```c
if (luaL_dofile(L, "script.lua") != 0) {
    printf("エラー: %s\n", lua_tostring(L, -1));
}
```

このコードは、ファイル`script.lua`をロードして実行し、エラーがあれば表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_loadfile
- lua_pcall