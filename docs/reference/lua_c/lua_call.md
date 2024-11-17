# lua_call

関数を呼び出します。

`[-(nargs + 1), +nresults, e]`

```c
void lua_call (lua_State *L, int nargs, int nresults);
```

## 説明

関数を呼び出します。

関数を呼び出すには、次のプロトコルを使用する必要があります：まず、呼び出される関数がスタックにプッシュされます。次に、関数への引数が直接の順番でプッシュされます。つまり、最初の引数が最初にプッシュされます。最後に`lua_call`を呼び出します。`nargs`はスタックにプッシュした引数の数です。すべての引数と関数の値は、関数が呼び出されるときにスタックからポップされます。関数の結果は、関数が戻るとスタックにプッシュされます。結果の数は`nresults`に調整されます。ただし、`nresults`が`LUA_MULTRET`の場合は、関数からのすべての結果がプッシュされます。Luaは、返された値がスタックスペースに収まるようにします。関数の結果は直接の順序でスタックにプッシュされます（最初の結果が最初にプッシュされる）ので、呼び出しの後に最後の結果がスタックの上にあります。

呼び出された関数内の任意のエラーは上方に伝播されます（longjmpを使用）。

以下の例は、ホストプログラムがこのLuaコードに相当することをどのように行うかを示しています：

```lua
a = f("how", t.x, 14)
```

## サンプルコード

```c
lua_getfield(L, LUA_GLOBALSINDEX, "f");
lua_pushstring(L, "how");
lua_getfield(L, LUA_GLOBALSINDEX, "t");
lua_getfield(L, -1, "x");
lua_remove(L, -2);
lua_pushinteger(L, 14);
lua_call(L, 3, 1);
lua_setfield(L, LUA_GLOBALSINDEX, "a");
```

このコードは、Luaにおける関数`f`の呼び出しに相当し、結果を変数`a`に格納しています。

## 互換性

- Lua5.1

## 関連項目

- lua_pcall
- luaL_dostring