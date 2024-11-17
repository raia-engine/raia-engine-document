# lua_pushcfunction

C関数をスタックにプッシュします。

`[-0, +1, m]`

```c
void lua_pushcfunction (lua_State *L, lua_CFunction f);
```

## 説明

C関数をスタックにプッシュします。この関数はC関数へのポインタを受け取り、呼び出されると対応するC関数を起動する型functionのLua値をスタックにプッシュします。

Luaに登録される任意の関数は、そのパラメータを受け取り結果を返すための正しいプロトコルに従う必要があります（`lua_CFunction`を参照）。

`lua_pushcfunction`はマクロとして定義されています：

```c
#define lua_pushcfunction(L,f)  lua_pushcclosure(L,f,0)
```

## サンプルコード

```c
lua_pushcfunction(L, my_c_function);
```

このコードは、C関数`my_c_function`をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushcclosure
- luaL_register