# lua_CFunction

C関数のための型です。

```c
typedef int (*lua_CFunction) (lua_State *L);
```

## 説明

C関数のための型です。

Luaと適切に通信するために、C関数は以下のプロトコルを使用する必要があります。これはパラメータと結果の受け渡し方法を定義しています：C関数は引数をLuaからそのスタック内の直接順序で受け取ります（最初の引数が最初にプッシュされます）。したがって、関数が開始するとき、`lua_gettop(L)`は関数によって受け取られた引数の数を返します。最初の引数（存在する場合）はインデックス1にあり、最後の引数はインデックス`lua_gettop(L)`にあります。Luaに値を返すために、C関数はそれらをスタックに直接順序でプッシュし（最初の結果が最初にプッシュされ）、結果の数を返します。結果の下にあるスタック内の他の値は、Luaによって適切に破棄されます。Lua関数と同様に、Luaによって呼び出されたC関数も多くの結果を返すことができます。

## サンプルコード

```c
static int foo (lua_State *L) {
  int n = lua_gettop(L);
  lua_Number sum = 0;
  int i;
  for (i = 1; i <= n; i++) {
    if (!lua_isnumber(L, i)) {
      lua_pushstring(L, "incorrect argument");
      lua_error(L);
    }
    sum += lua_tonumber(L, i);
  }
  lua_pushnumber(L, sum/n);
  lua_pushnumber(L, sum);
  return 2;
}
```

このコードは、可変数の数値引数を受け取り、その平均値と合計値を返します。

## 互換性

- Lua5.1

## 関連項目

- lua_isnumber
- lua_pushstring
- lua_error