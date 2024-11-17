# lua_tocfunction

指定されたインデックスの値をC関数に変換します。

`[-0, +0, -]`

```c
lua_CFunction lua_tocfunction (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスの値をC関数に変換します。その値はC関数でなければならず、そうでない場合はNULLを返します。

## サンプルコード

```c
lua_CFunction func = lua_tocfunction(L, 1);
if (func) {
    printf("C関数です\n");
}
```

このコードは、インデックス1の値がC関数かどうかを確認し、該当する場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushcfunction
- lua_isfunction