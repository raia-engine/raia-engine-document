# lua_concat

スタックの上部にある`n`個の値を連結し、結果をスタックの上部に残します。

`[-n, +1, e]`

```c
void lua_concat (lua_State *L, int n);
```

## 説明

スタックの上部にある`n`個の値を連結し、それらをポップして、結果をスタックの上部に残します。`n`が1の場合、結果はスタック上の単一の値です（つまり、関数は何もしません）。`n`が0の場合、結果は空の文字列です。連結はLuaの通常のセマンティクスに従って行われます。

## サンプルコード

```c
lua_pushstring(L, "Hello, ");
lua_pushstring(L, "world!");
lua_concat(L, 2);
```

このコードは、スタックの上部にある2つの文字列「Hello, 」と「world!」を連結し、結果をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushstring
- lua_pushlstring