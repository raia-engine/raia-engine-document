# lua_dump

関数をバイナリチャンクとしてダンプします。

`[-0, +0, m]`

```c
int lua_dump (lua_State *L, lua_Writer writer, void *data);
```

## 説明

関数をバイナリチャンクとしてダンプします。スタックの先頭にあるLua関数を受け取り、再度ロードすると元の関数と同等の関数となるバイナリチャンクを生成します。チャンクの一部を生成すると、`lua_dump`は与えられたデータでそれらを書き込むために関数ライター（`lua_Writer`参照）を呼び出します。

戻り値は、ライターへの最後の呼び出しによって返されたエラーコードです。0はエラーがないことを意味します。

この関数はスタックからLua関数をポップしません。

## サンプルコード

```c
int result = lua_dump(L, writer_function, NULL);
if (result != 0) {
    fprintf(stderr, "ダンプ中にエラーが発生しました\n");
}
```

このコードは、`writer_function`を使用してLua関数をバイナリチャンクにダンプし、エラーが発生した場合にはエラーメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_loadbuffer
- luaL_loadfile