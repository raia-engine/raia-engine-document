# lua_touserdata

指定されたインデックスの値をユーザーデータとして取得します。

`[-0, +0, -]`

```c
void *lua_touserdata (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスの値が完全なユーザーデータの場合、そのブロックアドレスを返します。値がライトユーザーデータの場合、そのポインタを返します。それ以外の場合はNULLを返します。

## サンプルコード

```c
void *data = lua_touserdata(L, 1);
if (data) {
    printf("ユーザーデータのポインタ: %p\n", data);
}
```

このコードは、指定されたインデックスの値をユーザーデータとして取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushlightuserdata
- lua_isuserdata