# luaL_getmetafield

指定されたオブジェクトのメタテーブルからフィールドを取得します。

`[-0, +(0|1), m]`

```c
int luaL_getmetafield (lua_State *L, int obj, const char *e);
```

## 説明

インデックス`obj`のオブジェクトのメタテーブルからフィールド`e`をスタックにプッシュします。オブジェクトにメタテーブルがない場合、またはメタテーブルにこのフィールドがない場合、0を返し何もプッシュしません。

## サンプルコード

```c
if (luaL_getmetafield(L, 1, "__index")) {
    printf("メタテーブルに__indexが存在します\n");
}
```

このコードは、オブジェクトのメタテーブルから`__index`フィールドを取得し、存在する場合は表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_getmetatable
- luaL_callmeta