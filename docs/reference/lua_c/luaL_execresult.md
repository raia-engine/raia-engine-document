# luaL_execresult

標準ライブラリのプロセス関連関数の戻り値を生成します。

```c
int luaL_execresult (lua_State *L, int stat);
```

## 説明

標準ライブラリのプロセス関連関数（`os.execute`や`io.close`）に対する戻り値を生成します。

## サンプルコード

```c
if (luaL_execresult(L, 0)) {
    printf("プロセス実行成功\n");
} else {
    printf("プロセス実行失敗\n");
}
```

このコードは、プロセスの実行結果に基づいてメッセージを表示します。

## 互換性

- Lua5.2

## 関連項目

- luaL_fileresult
- os.execute