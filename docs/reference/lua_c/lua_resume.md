# lua_resume

指定されたスレッドでコルーチンを開始または再開します。

`[-?, +?, -]`

```c
int lua_resume (lua_State *L, int narg);
```

## 説明

指定されたスレッドでコルーチンを開始し、再開します。

コルーチンを開始するには、まず新しいスレッドを作成します（`lua_newthread`を参照）；次に、そのスタックにメイン関数と任意の引数をプッシュします；次に`lua_resume`を呼び出し、`narg`は引数の数です。この呼び出しは、コルーチンが一時停止または実行を終了すると戻ります。戻ったとき、スタックには`lua_yield`に渡されたすべての値、または本体関数によって返されたすべての値が含まれます。`lua_resume`は、コルーチンが一時停止した場合は`LUA_YIELD`を、コルーチンがエラーなしで実行を終了した場合は0を返し、エラーが発生した場合はエラーコードを返します（`lua_pcall`を参照）。エラーが発生した場合、スタックは巻き戻されないので、デバッグAPIを使用できます。エラーメッセージはスタックのトップにあります。コルーチンを再開するには、yieldからの結果として渡す値のみをスタックに置き、`lua_resume`を呼び出します。

## サンプルコード

```c
int status = lua_resume(L, 0);
if (status == LUA_YIELD) {
    printf("コルーチンが一時停止しました\n");
}
```

このコードは、コルーチンを再開し、一時停止した場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_yield
- lua_newthread