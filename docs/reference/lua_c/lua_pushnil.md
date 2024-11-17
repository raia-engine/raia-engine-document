# lua_pushnil

`nil`値をスタックにプッシュします。

`[-0, +1, -]`

```c
void lua_pushnil (lua_State *L);
```

## 説明

`nil`値をスタックにプッシュします。

## サンプルコード

```c
lua_pushnil(L);
```

このコードは、スタックに`nil`をプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_isnil
- lua_pop