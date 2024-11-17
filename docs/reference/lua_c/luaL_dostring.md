# luaL_dostring

指定された文字列をロードして実行します。

`[-0, +?, m]`

```c
int luaL_dostring (lua_State *L, const char *str);
```

## 説明

指定された文字列をロードして実行します。以下のマクロとして定義されています：

```c
(luaL_loadstring(L, str) || lua_pcall(L, 0, LUA_MULTRET, 0))
```

エラーがなければ0を返し、エラーがある場合は1を返します。

## サンプルコード

```c
if (luaL_dostring(L, "print('Hello, World!')") != 0) {
    printf("エラー: %s\n", lua_tostring(L, -1));
}
```

このコードは、指定されたLuaコードを実行し、エラーがあれば表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_loadstring
- lua_pcall