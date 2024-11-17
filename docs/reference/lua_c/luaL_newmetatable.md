# luaL_newmetatable

指定された名前で新しいメタテーブルを作成します。

`[-0, +1, m]`

```c
int luaL_newmetatable (lua_State *L, const char *tname);
```

## 説明

レジストリに`tname`というキーが既に存在する場合、0を返します。そうでない場合、ユーザーデータのメタテーブルとして使用される新しいテーブルを作成し、`tname`のキーでレジストリに追加し、1を返します。

どちらの場合も、レジストリ内の`tname`に関連付けられた最終的な値をスタックにプッシュします。

## サンプルコード

```c
if (luaL_newmetatable(L, "MyType")) {
    printf("メタテーブル MyType が作成されました\n");
}
```

このコードは、名前「MyType」のメタテーブルを作成し、成功すればメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_getmetatable
- luaL_checkudata