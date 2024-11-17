# lua_next

スタックからキーをポップし、指定されたテーブルから次のキーと値のペアをプッシュします。

`[-1, +(2|0), e]`

```c
int lua_next (lua_State *L, int index);
```

## 説明

スタックからキーをポップし、指定されたインデックスのテーブルからキーと値のペア（与えられたキーの「次」のペア）をプッシュします。テーブル内に他の要素がない場合、`lua_next`は0を返します（何もプッシュしません）。

典型的な走査は次のようになります：

```c
/* table is in the stack at index 't' */
lua_pushnil(L);  /* 最初のキー */
while (lua_next(L, t) != 0) {
  /* 'key'（インデックス-2に）と'value'（インデックス-1に）を使用 */
  printf("%s - %s\n",
         lua_typename(L, lua_type(L, -2)),
         lua_typename(L, lua_type(L, -1)));
  /* 'value'を削除し、次の反復のために'key'を保持 */
  lua_pop(L, 1);
}
```

テーブルを走査するときは、キーが実際に文字列であることが分かっている場合を除き、キーに対して`lua_tolstring`を直接呼び出さないでください。`lua_tolstring`は指定されたインデックスの値を変更するため、次の`lua_next`の呼び出しを混乱させます。

## サンプルコード

```c
lua_pushnil(L);  /* 最初のキー */
while (lua_next(L, t) != 0) {
    printf("%s - %s\n",
           lua_typename(L, lua_type(L, -2)),
           lua_typename(L, lua_type(L, -1)));
    lua_pop(L, 1);  /* 値を削除し、次のキーの準備 */
}
```

このコードは、テーブルを走査し、キーと値の型名を出力します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushnil
- lua_gettable