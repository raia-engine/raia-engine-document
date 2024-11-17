# lua_toboolean

指定されたインデックスの値をCのブール値に変換します。

`[-0, +0, -]`

```c
int lua_toboolean (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスでのLua値をCのブール値（0または1）に変換します。Luaのすべてのテストと同様に、`lua_toboolean`はfalseとnil以外の任意のLua値に対して1を返し、それ以外の場合は0を返します。無効なインデックスで呼び出された場合も0を返します。（実際のブール値のみを受け入れる場合は、値のタイプをテストするために`lua_isboolean`を使用します。）

## サンプルコード

```c
if (lua_toboolean(L, 1)) {
    printf("真の値です\n");
} else {
    printf("偽の値です\n");
}
```

このコードは、指定されたインデックスの値をブール値に変換し、真偽を表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_isboolean
- lua_pushboolean