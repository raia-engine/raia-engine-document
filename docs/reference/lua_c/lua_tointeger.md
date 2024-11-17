# lua_tointeger

指定されたインデックスの値を符号付き整数に変換します。

`[-0, +0, -]`

```c
lua_Integer lua_tointeger (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスでのLua値を符号付き整数型`lua_Integer`に変換します。Lua値は数値または数値に変換可能な文字列でなければなりません。そうでない場合、`lua_tointeger`は0を返します。

数値が整数でない場合、それは特定されていない何らかの方法で切り捨てられます。

## サンプルコード

```c
lua_Integer num = lua_tointeger(L, 1);
printf("整数値: %lld\n", (long long)num);
```

このコードは、指定されたインデックスの値を整数として取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushinteger
- lua_isnumber