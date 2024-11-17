# lua_setupvalue

クロージャのアップバリューの値を設定します。

`[-(0|1), +0, -]`

```c
const char *lua_setupvalue (lua_State *L, int funcindex, int n);
```

## 説明

クロージャのアップバリューの値を設定します。スタックのトップにある値をアップバリューに割り当て、その名前を返します。値もスタックからポップします。パラメータ`funcindex`と`n`は`lua_getupvalue`（`lua_getupvalue`を参照）と同じです。

インデックスがアップバリューの数を超える場合は、NULL（何もポップせず）を返します。

## サンプルコード

```c
lua_pushnumber(L, 100);  // 新しい値をプッシュ
lua_setupvalue(L, 1, 1);
```

このコードは、指定された関数の最初のアップバリューに値100を設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getupvalue
- lua_pushvalue