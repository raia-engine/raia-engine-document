# luaL_typerror

指定された引数の型が期待される型と異なる場合にエラーを生成します。

`[-0, +0, v]`

```c
int luaL_typerror (lua_State *L, int narg, const char *tname);
```

## 説明

以下のようなメッセージでエラーを生成します：

```
location: bad argument narg to 'func' (tname expected, got rt)
```

ここで`location`は`luaL_where`によって生成され、`func`は現在の関数の名前であり、`rt`は実際の引数の型名です。

## サンプルコード

```c
if (!lua_isnumber(L, 1)) {
    return luaL_typerror(L, 1, "number");
}
```

このコードは、引数1が数値でない場合にエラーメッセージを生成します。

## 互換性

- Lua5.1

## 関連項目

- luaL_argerror
- luaL_where