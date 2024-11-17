# luaL_Reg

関数名と関数ポインタを格納するための構造体の型です。

```c
typedef struct luaL_Reg {
  const char *name;
  lua_CFunction func;
} luaL_Reg;
```

## 説明

`luaL_register`によって登録される関数の配列の型です。`name`は関数名で、`func`は関数へのポインタです。`luaL_Reg`の配列は、`name`と`func`の両方が`NULL`であるセンチネルエントリで終了する必要があります。

## サンプルコード

```c
static const luaL_Reg mylib[] = {
    {"func1", func1},
    {"func2", func2},
    {NULL, NULL}
};
```

このコードは、ライブラリの関数配列を`luaL_Reg`構造体で定義します。

## 互換性

- Lua5.1

## 関連項目

- luaL_register
- luaL_newlib