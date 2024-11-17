# lua_yield

コルーチンを中断します。`lua_resume`で再開されるまで、コルーチンの実行を停止します。

`[-?, +?, -]`

```c
int lua_yield (lua_State *L, int nresults);
```

## 説明

コルーチンを中断します。

この関数はC関数のリターン式としてのみ呼び出されるべきです：

```c
return lua_yield (L, nresults);
```

C関数がこの方法で`lua_yield`を呼び出すと、実行中のコルーチンはその実行を中断し、このコルーチンを開始した`lua_resume`の呼び出しが戻ります。`nresults`パラメータは、`lua_resume`への結果としてスタックから渡される値の数です。

## サンプルコード

```c
int my_function(lua_State *L) {
    lua_pushstring(L, "result");
    return lua_yield(L, 1);  // コルーチンを中断し、1つの結果を返す
}
```

このコードは、C関数からコルーチンを中断し、結果として文字列「result」を返します。

## 互換性

- Lua5.1

## 関連項目

- lua_resume
- lua_status