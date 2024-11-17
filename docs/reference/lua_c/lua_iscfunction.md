# lua_iscfunction

指定されたインデックスにある値がC関数であれば1を返します。

`[-0, +0, -]`

```c
int lua_iscfunction (lua_State *L, int index);
```

## 説明

指定された許容インデックスにある値がC関数であれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_iscfunction(L, 1)) {
    printf("値はC関数です\n");
}
```

このコードは、インデックス1の値がC関数であるかを確認し、C関数の場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_isfunction
- luaL_checktype