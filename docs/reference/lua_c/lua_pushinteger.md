# lua_pushinteger

整数値`n`をスタックにプッシュします。

`[-0, +1, -]`

```c
void lua_pushinteger (lua_State *L, lua_Integer n);
```

## 説明

値`n`の数値をスタックにプッシュします。

## サンプルコード

```c
lua_pushinteger(L, 10);
```

このコードは、整数値`10`をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushnumber
- lua_tointeger