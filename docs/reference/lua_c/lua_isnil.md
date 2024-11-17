# lua_isnil

指定されたインデックスにある値がnilであれば1を返します。

`[-0, +0, -]`

```c
int lua_isnil (lua_State *L, int index);
```

## 説明

指定された許容インデックスにある値がnilであれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_isnil(L, 1)) {
    printf("値はnilです\n");
}
```

このコードは、インデックス1の値がnilであるかを確認し、nilの場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_type
- lua_isnoneornil