# luaL_loadbuffer

指定されたバッファをLuaチャンクとしてロードします。

`[-0, +1, m]`

```c
int luaL_loadbuffer (lua_State *L, const char *buff, size_t sz, const char *name);
```

## 説明

バッファをLuaチャンクとしてロードします。この関数は`lua_load`を使用して、`buff`で指されたバッファ内のチャンクをサイズ`sz`でロードします。

この関数は`lua_load`と同じ結果を返します。`name`はデバッグ情報やエラーメッセージ用のチャンク名です。

## サンプルコード

```c
const char *code = "print('Buffer executed')";
luaL_loadbuffer(L, code, strlen(code), "buffer");
lua_pcall(L, 0, LUA_MULTRET, 0);
```

このコードは、文字列`code`をLuaチャンクとしてロードし、実行します。

## 互換性

- Lua5.1

## 関連項目

- luaL_loadstring
- luaL_dostring