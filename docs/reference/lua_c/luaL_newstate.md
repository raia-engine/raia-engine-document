# luaL_newstate

新しいLuaステートを作成します。

`[-0, +0, -]`

```c
lua_State *luaL_newstate (void);
```

## 説明

新しいLuaステートを作成します。標準のC realloc関数に基づくアロケータを使用して`lua_newstate`を呼び出し、致命的なエラーが発生した場合に標準エラー出力にエラーメッセージを出力するパニック関数（`lua_atpanic`を参照）を設定します。

新しいステートを返すか、メモリ割り当てエラーがある場合はNULLを返します。

## サンプルコード

```c
lua_State *L = luaL_newstate();
if (L) {
    luaL_openlibs(L);
    lua_close(L);
}
```

このコードは、新しいLuaステートを作成し、標準ライブラリを開いてから閉じます。

## 互換性

- Lua5.1

## 関連項目

- lua_newstate
- luaL_openlibs