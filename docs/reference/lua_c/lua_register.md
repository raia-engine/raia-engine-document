# lua_register

C関数`f`をグローバル名`name`の新しい値として設定します。

`[-0, +0, e]`

```c
void lua_register (lua_State *L, const char *name, lua_CFunction f);
```

## 説明

C関数`f`をグローバル名`name`の新しい値として設定します。マクロとして定義されています：

```c
#define lua_register(L,n,f) \
           (lua_pushcfunction(L, f), lua_setglobal(L, n))
```

## サンプルコード

```c
lua_register(L, "my_function", my_c_function);
```

このコードは、C関数`my_c_function`をグローバル名`my_function`としてLuaに登録します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushcfunction
- lua_setglobal