# lua_gethookmask

現在のフックマスクを返します。

`[-0, +0, -]`

```c
int lua_gethookmask (lua_State *L);
```

## 説明

現在のフックマスクを返します。

## サンプルコード

```c
int mask = lua_gethookmask(L);
printf("フックマスク: %d\n", mask);
```

このコードは、現在のフックマスクを取得して表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_gethook
- lua_sethook