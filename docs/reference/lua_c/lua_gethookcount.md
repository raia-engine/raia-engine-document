# lua_gethookcount

現在のフックカウントを返します。

`[-0, +0, -]`

```c
int lua_gethookcount (lua_State *L);
```

## 説明

現在のフックカウントを返します。

## サンプルコード

```c
int count = lua_gethookcount(L);
printf("フックカウント: %d\n", count);
```

このコードは、現在のフックカウントを取得して表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_sethook
- lua_gethook