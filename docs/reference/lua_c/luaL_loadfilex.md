# luaL_loadfilex

指定されたファイルをLuaチャンクとしてロードします。

```c
int luaL_loadfilex (lua_State *L, const char *filename, const char *mode);
```

## 説明

ファイルをLuaチャンクとしてロードします。この関数は`lua_load`を使用して、指定されたファイル名`filename`のファイル内のチャンクをロードします。`filename`が`NULL`の場合は標準入力からロードします。ファイルの最初の行が`#`で始まる場合、その行は無視されます。

`mode`文字列は`lua_load`と同様に動作します。

この関数は`lua_load`と同じ結果を返しますが、ファイルを開いたり読み取ったりできない場合、またはファイルのモードが正しくない場合には追加のエラーコード`LUA_ERRFILE`を返します。

`lua_load`と同様に、この関数はチャンクをロードするだけで、実行はしません。

## サンプルコード

```c
if (luaL_loadfilex(L, "example.lua", NULL) == 0) {
    lua_pcall(L, 0, LUA_MULTRET, 0);
}
```

このコードは、ファイル`example.lua`をロードして、エラーがなければ実行します。

## 互換性

- Lua5.2

## 関連項目

- luaL_loadstring
- lua_load