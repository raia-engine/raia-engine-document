# luaL_typename

指定されたインデックスの値の型名を返します。

`[-0, +0, -]`

```c
const char *luaL_typename (lua_State *L, int index);
```

## 説明

指定されたインデックスの値の型の名前を返します。

## サンプルコード

```c
printf("タイプ: %s\n", luaL_typename(L, 1));
```

このコードは、引数1の型名を表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_type
- lua_typename