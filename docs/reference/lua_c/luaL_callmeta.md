# luaL_callmeta

指定されたオブジェクトのメタテーブルのメタメソッドを呼び出します。

`[-0, +(0|1), e]`

```c
int luaL_callmeta (lua_State *L, int obj, const char *e);
```

## 説明

メタメソッドを呼び出します。

インデックス`obj`のオブジェクトにメタテーブルがあり、このメタテーブルにフィールド`e`がある場合、この関数はこのフィールドを呼び出し、オブジェクトを唯一の引数として渡します。この場合、この関数は1を返し、スタックに呼び出しによって返された値をプッシュします。メタテーブルやメタメソッドがない場合、この関数は0を返します（スタックに値をプッシュせず）。

## サンプルコード

```c
if (luaL_callmeta(L, 1, "__tostring")) {
    printf("メタメソッドが呼び出されました\n");
}
```

このコードは、オブジェクトの`tostring`メタメソッドを呼び出し、成功すればメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_getmetafield
- lua_getmetatable