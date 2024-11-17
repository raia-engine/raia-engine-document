# lua_pushthread

現在のスレッドをスタックにプッシュし、メインスレッドであれば1を返します。

`[-0, +1, -]`

```c
int lua_pushthread (lua_State *L);
```

## 説明

`L`によって表されるスレッドをスタックにプッシュします。このスレッドがそのステートのメインスレッドであれば1を返します。

## サンプルコード

```c
int is_main_thread = lua_pushthread(L);
printf("メインスレッド: %d\n", is_main_thread);
```

このコードは、現在のスレッドをスタックにプッシュし、メインスレッドかどうかを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_newthread
- lua_resume