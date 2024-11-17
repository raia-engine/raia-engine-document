# lua_tothread

指定されたインデックスの値をLuaスレッドに変換します。

`[-0, +0, -]`

```c
lua_State *lua_tothread (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスの値をLuaスレッド（`lua_State*`として表される）に変換します。この値はスレッドでなければならず、そうでない場合、関数はNULLを返します。

## サンプルコード

```c
lua_State *thread = lua_tothread(L, 1);
if (thread) {
    printf("スレッドがあります\n");
}
```

このコードは、指定されたインデックスの値がスレッドであるかを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_newthread
- lua_pushthread