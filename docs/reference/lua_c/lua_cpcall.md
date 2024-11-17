# lua_cpcall

保護モードでC関数`func`を呼び出します。

`[-0, +(0|1), -]`

```c
int lua_cpcall (lua_State *L, lua_CFunction func, void *ud);
```

## 説明

保護モードでC関数`func`を呼び出します。`func`はスタックに`ud`を含むライトユーザーデータのみで開始します。エラーが発生した場合、`lua_cpcall`は`lua_pcall`と同じエラーコードを返し、スタックの上部にエラーオブジェクトを返します。そうでない場合はゼロを返し、スタックを変更しません。`func`によって返されたすべての値は破棄されます。

## サンプルコード

```c
int result = lua_cpcall(L, my_func, NULL);
if (result != 0) {
    fprintf(stderr, "エラー: %s\n", lua_tostring(L, -1));
}
```

このコードは、`my_func`を保護モードで呼び出し、エラーが発生した場合にはエラーメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pcall
- lua_call