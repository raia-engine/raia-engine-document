# lua_atpanic

新しいパニック関数を設定し、古いものを返します。

`[-0, +0, -]`

```c
lua_CFunction lua_atpanic (lua_State *L, lua_CFunction panicf);
```

## 説明

新しいパニック関数を設定し、古いものを返します。

保護された環境の外でエラーが発生した場合、Luaはパニック関数を呼び出し、その後`exit(EXIT_FAILURE)`を呼び出してホストアプリケーションを終了します。パニック関数は（例えば長いジャンプを行うことで）この終了を回避できます。

パニック関数はスタックの先頭にあるエラーメッセージにアクセスできます。

## サンプルコード

```c
lua_CFunction old_panic = lua_atpanic(L, new_panic_function);
```

このコードは、新しいパニック関数を設定し、古いパニック関数を変数`old_panic`に保存しています。

## 互換性

- Lua5.1

## 関連項目

- lua_CFunction
- luaL_error