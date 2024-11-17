# lua_setglobal

グローバル変数として指定された名前で値を設定します。

`[-1, +0, e]`

```c
void lua_setglobal (lua_State *L, const char *name);
```

## 説明

スタックから値をポップし、それをグローバル名の新しい値として設定します。マクロとして定義されています：

```c
#define lua_setglobal(L,s)   lua_setfield(L, LUA_GLOBALSINDEX, s)
```

## サンプルコード

```c
lua_pushstring(L, "value");
lua_setglobal(L, "myVar");
```

このコードは、グローバル変数`myVar`に値「value」を設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getglobal
- lua_setfield