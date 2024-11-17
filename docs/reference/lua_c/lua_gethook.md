# lua_gethook

現在のフック関数を返します。

`[-0, +0, -]`

```c
lua_Hook lua_gethook (lua_State *L);
```

## 説明

現在のフック関数を返します。

## サンプルコード

```c
lua_Hook hook = lua_gethook(L);
if (hook) {
    printf("フック関数が設定されています\n");
}
```

このコードは、現在のフック関数が設定されているかどうかを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_sethook
- lua_gethookmask