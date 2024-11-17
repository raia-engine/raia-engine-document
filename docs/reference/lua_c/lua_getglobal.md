# lua_getglobal

グローバル変数`name`の値をスタックにプッシュします。

`[-0, +1, e]`

```c
void lua_getglobal (lua_State *L, const char *name);
```

## 説明

グローバル変数`name`の値をスタックにプッシュします。マクロとして定義されています：

```c
#define lua_getglobal(L,s)  lua_getfield(L, LUA_GLOBALSINDEX, s)
```

## サンプルコード

```c
lua_getglobal(L, "print");
```

このコードは、グローバル関数`print`を取得し、スタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_setglobal
- lua_getfield