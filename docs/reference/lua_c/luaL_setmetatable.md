# luaL_setmetatable

オブジェクトのメタテーブルを設定します。

```c
void luaL_setmetatable (lua_State *L, const char *tname);
```

## 説明

スタックのトップにあるオブジェクトのメタテーブルを、レジストリに`tname`として登録されているメタテーブルに設定します（`luaL_newmetatable`参照）。

## サンプルコード

```c
lua_newuserdata(L, sizeof(MyStruct));
luaL_setmetatable(L, "MyType");
```

このコードは、新しく作成したユーザーデータにメタテーブル`MyType`を設定します。

## 互換性

- Lua5.2

## 関連項目

- luaL_newmetatable
- lua_setmetatable