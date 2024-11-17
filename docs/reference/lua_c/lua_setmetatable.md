# lua_setmetatable

指定されたインデックスにある値のメタテーブルを設定します。

`[-1, +0, -]`

```c
int lua_setmetatable (lua_State *L, int index);
```

## 説明

スタックからテーブルをポップし、指定された有効なインデックスの値の新しいメタテーブルとして設定します。

## サンプルコード

```c
lua_newtable(L);  /* 新しいメタテーブルを作成 */
lua_setmetatable(L, 1);
```

このコードは、インデックス1の値に新しいメタテーブルを設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getmetatable
- luaL_setmetatable