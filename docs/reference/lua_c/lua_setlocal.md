# lua_setlocal

指定されたアクティベーションレコードのローカル変数の値を設定します。

`[-(0|1), +0, -]`

```c
const char *lua_setlocal (lua_State *L, lua_Debug *ar, int n);
```

## 説明

与えられたアクティベーションレコードのローカル変数の値を設定します。パラメータ`ar`と`n`は`lua_getlocal`（`lua_getlocal`を参照）と同じです。`lua_setlocal`はスタックのトップにある値を変数に割り当て、その名前を返します。また、スタックから値をポップします。

インデックスがアクティブなローカル変数の数を超える場合は、NULL（何もポップせず）を返します。

## サンプルコード

```c
lua_Debug ar;
lua_getstack(L, 1, &ar);
lua_pushnumber(L, 42);  // 新しい値をプッシュ
lua_setlocal(L, &ar, 1);
```

このコードは、指定されたローカル変数に値42を設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getlocal
- lua_getstack