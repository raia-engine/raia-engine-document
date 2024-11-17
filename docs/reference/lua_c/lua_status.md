# lua_status

スレッドの状態を返します。

`[-0, +0, -]`

```c
int lua_status (lua_State *L);
```

## 説明

スレッド`L`の状態を返します。

状態は、通常のスレッドの場合は0、スレッドがエラーで実行を終了した場合はエラーコード、スレッドが中断されている場合は`LUA_YIELD`になります。

## サンプルコード

```c
int status = lua_status(L);
if (status == LUA_YIELD) {
    printf("スレッドは一時停止中です\n");
}
```

このコードは、スレッドの状態を取得し、一時停止中かどうかを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_resume
- lua_pcall