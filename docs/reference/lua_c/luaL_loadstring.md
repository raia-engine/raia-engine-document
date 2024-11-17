# luaL_loadstring

指定された文字列をLuaチャンクとしてロードします。

`[-0, +1, m]`

```c
int luaL_loadstring (lua_State *L, const char *s);
```

## 説明

文字列をLuaチャンクとしてロードします。この関数は`lua_load`を使用して、ゼロ終端文字列`s`内のチャンクをロードします。

この関数は`lua_load`と同じ結果を返します。

また、`lua_load`と同様に、この関数はチャンクをロードするだけで、実行はしません。

## サンプルコード

```c
if (luaL_loadstring(L, "print('Hello from string')") == 0) {
    lua_pcall(L, 0, LUA_MULTRET, 0);
}
```

このコードは、文字列として指定されたLuaコードをロードして、エラーがなければ実行します。

## 互換性

- Lua5.1

## 関連項目

- luaL_dostring
- lua_load