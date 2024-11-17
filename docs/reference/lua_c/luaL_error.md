# luaL_error

指定されたフォーマットと引数でエラーメッセージを生成します。

`[-0, +0, v]`

```c
int luaL_error (lua_State *L, const char *fmt, ...);
```

## 説明

エラーを発生させます。エラーメッセージの形式は`fmt`と追加の引数によって指定され、`lua_pushfstring`のルールに従います。この関数はエラーが発生したファイル名と行番号をメッセージの最初に追加します（この情報が利用可能な場合）。

この関数は戻り値を返しませんが、C関数内で`return luaL_error(args);`として使用するのが一般的です。

## サンプルコード

```c
return luaL_error(L, "無効な引数: %s", "example");
```

このコードは、エラーメッセージ「無効な引数: example」を生成します。

## 互換性

- Lua5.1

## 関連項目

- lua_error
- luaL_argerror