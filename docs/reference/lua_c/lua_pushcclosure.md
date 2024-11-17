# lua_pushcclosure

新しいCクロージャをスタックにプッシュします。

`[-n, +1, m]`

```c
void lua_pushcclosure (lua_State *L, lua_CFunction fn, int n);
```

## 説明

新しいCクロージャをスタックにプッシュします。

C関数が作成されると、それにいくつかの値を関連付けることができ、これによりCクロージャが作成されます。これらの値は、関数が呼び出されるたびに関数からアクセス可能です。C関数に値を関連付けるには、まずこれらの値をスタックにプッシュする必要があります（複数の値がある場合は、最初の値が最初にプッシュされます）。次に`lua_pushcclosure`を呼び出して、C関数をスタックに作成してプッシュします。引数`n`は関数に関連付けるべき値の数を示します。`lua_pushcclosure`はこれらの値もスタックからポップします。

`n`の最大値は255です。

## サンプルコード

```c
lua_pushnumber(L, 5);    /* 値をスタックにプッシュ */
lua_pushcclosure(L, my_c_function, 1);  /* my_c_functionをクロージャとしてプッシュ */
```

このコードは、C関数`my_c_function`に値を関連付けたクロージャを作成し、スタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushcfunction
- lua_pushvalue