# lua_pushvfstring

可変個の引数をリスト形式で受け取り、フォーマットされた文字列をスタックにプッシュします。

`[-0, +1, m]`

```c
const char *lua_pushvfstring (lua_State *L, const char *fmt, va_list argp);
```

## 説明

`lua_pushfstring`と同等ですが、可変個の引数の代わりに`va_list`を受け取ります。

## サンプルコード

```c
va_list args;
va_start(args, format);
lua_pushvfstring(L, "フォーマット: %s", args);
va_end(args);
```

このコードは、`va_list`を使ってフォーマット文字列をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushfstring
- lua_pushstring