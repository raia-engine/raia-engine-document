# luaL_testudata

指定した型のユーザーデータであるかを確認します。

```c
void *luaL_testudata (lua_State *L, int arg, const char *tname);
```

## 説明

この関数は`luaL_checkudata`と同様に動作しますが、テストが失敗した場合にエラーを発生させる代わりに`NULL`を返します。

## サンプルコード

```c
void *data = luaL_testudata(L, 1, "MyType");
if (data) {
    printf("ユーザーデータが見つかりました。\n");
} else {
    printf("指定された型のユーザーデータは存在しません。\n");
}
```

このコードは、引数が指定された型`MyType`のユーザーデータであるかを確認します。

## 互換性

- Lua5.2

## 関連項目

- luaL_checkudata
- lua_newuserdata