# luaL_loadbufferx

指定されたバッファをLuaチャンクとしてロードします。

```c
int luaL_loadbufferx (lua_State *L, const char *buff, size_t sz, const char *name, const char *mode);
```

## 説明

バッファをLuaチャンクとしてロードします。この関数は`lua_load`を使用して、`buff`が指すバッファのサイズ`sz`を持つチャンクをロードします。

この関数は`lua_load`と同じ結果を返します。`name`はチャンクの名前で、デバッグ情報やエラーメッセージに使用されます。`mode`文字列は`lua_load`と同様に動作します。

## サンプルコード

```c
const char *script = "print('Hello from buffer')";
if (luaL_loadbufferx(L, script, strlen(script), "buffer", NULL) == 0) {
    lua_pcall(L, 0, LUA_MULTRET, 0);
}
```

このコードは、バッファ内のスクリプトをロードして実行します。

## 互換性

- Lua5.2

## 関連項目

- luaL_loadfilex
- lua_load