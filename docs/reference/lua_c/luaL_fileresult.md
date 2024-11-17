# luaL_fileresult

標準ライブラリのファイル操作関数の戻り値を生成します。

```c
int luaL_fileresult (lua_State *L, int stat, const char *fname);
```

## 説明

標準ライブラリのファイル関連関数（`io.open`、`os.rename`、`file:seek`など）に対する戻り値を生成します。

## サンプルコード

```c
if (luaL_fileresult(L, 1, "test.txt")) {
    printf("ファイル操作成功\n");
} else {
    printf("ファイル操作失敗\n");
}
```

このコードは、ファイル操作の結果に基づいてメッセージを表示します。

## 互換性

- Lua5.2

## 関連項目

- luaL_execresult
- io.open