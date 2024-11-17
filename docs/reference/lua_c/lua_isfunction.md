# lua_isfunction

指定されたインデックスにある値が関数（CまたはLuaのいずれか）であれば1を返します。

`[-0, +0, -]`

```c
int lua_isfunction (lua_State *L, int index);
```

## 説明

指定された許容インデックスにある値が関数（CまたはLuaのいずれか）であれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_isfunction(L, 1)) {
    printf("値は関数です\n");
}
```

このコードは、インデックス1の値が関数であるかを確認し、関数の場合にメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_iscfunction
- luaL_checktype