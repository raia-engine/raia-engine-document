# luaL_loadfile

指定されたファイルをLuaチャンクとしてロードします。

`[-0, +1, m]`

```c
int luaL_loadfile (lua_State *L, const char *filename);
```

## 説明

ファイルをLuaチャンクとしてロードします。この関数は`lua_load`を使用して`filename`で指定されたファイル内のチャンクをロードします。`filename`がNULLの場合、標準入力からロードします。ファイルの最初の行が`#`で始まる場合は無視されます。

この関数は`lua_load`と同じ結果を返しますが、ファイルを開けない/読み取れない場合の追加のエラーコードLUA_ERRFILEを持っています。

`lua_load`と同様に、この関数はチャンクをロードするだけで、実行はしません。

## サンプルコード

```c
if (luaL_loadfile(L, "example.lua") == 0) {
    lua_pcall(L, 0, LUA_MULTRET, 0);
}
```

このコードは、ファイル`example.lua`をロードして、エラーがなければ実行します。

## 互換性

- Lua5.1

## 関連項目

- luaL_dofile
- lua_load