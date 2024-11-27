# lua_newuserdata

指定されたサイズの新しいメモリブロックを割り当て、フルユーザーデータとしてスタックにプッシュします。

`[-0, +1, m]`

```c
void *lua_newuserdata (lua_State *L, size_t size);
```

## 説明

この関数は指定されたサイズの新しいメモリブロックを割り当て、そのブロックのアドレスを持つ新しいフルユーザーデータをスタックにプッシュし、このアドレスを返します。

ユーザーデータはLua内のCの値を表します。フルユーザーデータはメモリブロックを表します。それはオブジェクト（テーブルのような）です：作成する必要があり、自身のメタテーブルを持つことができ、収集されているときに検出することができます。フルユーザーデータはそれ自体（生の等価性の下で）にのみ等しいです。

Luaがgcメタメソッドを持つフルユーザーデータを収集するとき、Luaはメタメソッドを呼び出し、ユーザーデータを最終化されたとマークします。このユーザーデータが再び収集されると、Luaは対応するメモリを解放します。

## サンプルコード

```c
void *data = lua_newuserdata(L, sizeof(int));
*((int *)data) = 100;
```

このコードは、サイズ`sizeof(int)`のユーザーデータを作成し、その値を`100`に設定します。

## 互換性

- Lua5.1

## 関連項目

- luaL_checkudata
- lua_touserdata