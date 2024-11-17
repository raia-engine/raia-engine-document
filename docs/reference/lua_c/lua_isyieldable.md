# lua_isyieldable

指定されたコルーチンが`yield`可能であるかどうかを確認します。

``[-0, +0, –]``

```c
int lua_isyieldable (lua_State *L);
```

## 説明

指定されたコルーチンが`yield`可能であれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_isyieldable(L)) {
    printf("このコルーチンはyield可能です。\n");
} else {
    printf("このコルーチンはyield不可能です。\n");
}
```

このコードは、指定されたコルーチンが`yield`可能かどうかを確認して、結果を表示します。

## 互換性

- Lua5.2

## 関連項目

- lua_yield
- lua_resume
- lua_newthread