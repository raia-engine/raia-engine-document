# lua_newtable

新しい空のテーブルを作成し、スタックにプッシュします。

`[-0, +1, m]`

```c
void lua_newtable (lua_State *L);
```

## 説明

新しい空のテーブルを作成し、スタックにプッシュします。これは`lua_createtable(L, 0, 0)`と等価です。

## サンプルコード

```c
lua_newtable(L);
lua_setglobal(L, "myTable");
```

このコードは、新しいテーブルを作成し、それをグローバル変数`myTable`として設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_createtable
- lua_settable