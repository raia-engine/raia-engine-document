# lua_pushboolean

真偽値`b`をスタックにプッシュします。

`[-0, +1, -]`

```c
void lua_pushboolean (lua_State *L, int b);
```

## 説明

真偽値`b`をスタックにプッシュします。

## サンプルコード

```c
lua_pushboolean(L, 1);  /* スタックにtrueをプッシュ */
```

このコードは、真（true）の値をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_toboolean
- lua_isboolean