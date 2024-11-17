# luaL_gsub

文字列`s`内の文字列`p`の出現を`r`で置換してコピーを作成します。

`[-0, +1, m]`

```c
const char *luaL_gsub (lua_State *L, const char *s, const char *p, const char *r);
```

## 説明

文字列`s`の中の文字列`p`の出現を文字列`r`で置換することにより、文字列`s`のコピーを作成します。結果の文字列をスタックにプッシュし、それを返します。

## サンプルコード

```c
const char *result = luaL_gsub(L, "hello world", "world", "Lua");
printf("結果: %s\n", result);
```

このコードは、文字列「hello world」の「world」を「Lua」で置き換えた結果を取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushfstring
- lua_tolstring