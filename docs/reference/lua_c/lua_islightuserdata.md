# lua_islightuserdata

指定されたインデックスにある値がライトユーザーデータであれば1を返します。

`[-0, +0, -]`

```c
int lua_islightuserdata (lua_State *L, int index);
```

## 説明

指定された許容インデックスにある値がライトユーザーデータであれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_islightuserdata(L, 1)) {
    printf("値はライトユーザーデータです\n");
}
```

このコードは、インデックス1の値がライトユーザーデータであるかを確認し、該当する場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_touserdata
- luaL_checktype