# lua_upvaluejoin

あるLuaクロージャのアップバリューを別のLuaクロージャのアップバリューに関連付けます。

```c
void lua_upvaluejoin (lua_State *L, int funcindex1, int n1,
                      int funcindex2, int n2);
```

## 説明

インデックス`funcindex1`のLuaクロージャの`n1`番目のアップバリューを、インデックス`funcindex2`のLuaクロージャの`n2`番目のアップバリューに関連付けます。

## サンプルコード

```c
lua_upvaluejoin(L, 1, 1, 2, 1);
```

このコードは、スタック上の最初の関数の1番目のアップバリューを、2番目の関数の1番目のアップバリューに関連付けます。

## 互換性

- Lua5.2

## 関連項目

- lua_upvalueid
- lua_getupvalue