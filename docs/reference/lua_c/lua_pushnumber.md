# lua_pushnumber

数値`n`をスタックにプッシュします。

`[-0, +1, -]`

```c
void lua_pushnumber (lua_State *L, lua_Number n);
```

## 説明

値`n`の数値をスタックにプッシュします。

## サンプルコード

```c
lua_pushnumber(L, 3.14);
```

このコードは、数値`3.14`をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_tonumber
- lua_pushinteger