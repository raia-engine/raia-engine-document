# lua_load

Luaチャンクをロードしますが、実行はしません。

`[-0, +1, -]`

```c
int lua_load (lua_State *L, lua_Reader reader, void *data, const char *chunkname);
```

## 説明

Luaチャンクをロードします。エラーがなければ、`lua_load`はコンパイルされたチャンクをLua関数としてスタックの上にプッシュします。そうでなければ、エラーメッセージをプッシュします。`lua_load`の戻り値は以下の通りです：

- 0: エラーなし
- `LUA_ERRSYNTAX`: 前処理中の構文エラー
- `LUA_ERRMEM`: メモリ割り当てエラー

この関数はチャンクをロードするだけで、実行はしません。

`lua_load`はチャンクがテキストかバイナリかを自動的に検出し、それに応じてロードします（プログラム`luac`を参照）。

`lua_load`関数はユーザー提供のリーダー関数を使用してチャンクを読み込みます（`lua_Reader`参照）。`data`引数はリーダー関数に渡される不透明な値です。

`chunkname`引数はチャンクに名前を与え、エラーメッセージやデバッグ情報で使用されます。

## サンプルコード

```c
int result = lua_load(L, reader_function, NULL, "chunk_name");
if (result == LUA_ERRSYNTAX) {
    fprintf(stderr, "構文エラーが発生しました\n");
}
```

このコードは、`reader_function`を使ってLuaチャンクをロードし、構文エラーがあればメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_loadfile
- luaL_dofile