# lua_tointegerx

Luaの値を`lua_Integer`型に変換します。

``[-0, +0, –]``

```c
lua_Integer lua_tointegerx (lua_State *L, int index, int *isnum);
```

## 説明

指定されたインデックスのLuaの値を符号付き整数型`lua_Integer`に変換します。Luaの値が数値または数値に変換可能な文字列でなければ、`lua_tointegerx`は0を返します（§3.4.2参照）。

数値が整数でない場合は、非指定の方法で切り捨てられます。

`isnum`が`NULL`でない場合、変換が成功したかどうかを示すブール値が設定されます。

## サンプルコード

```c
int isnum;
lua_Integer num = lua_tointegerx(L, 1, &isnum);
if (isnum) {
    printf("整数値: %lld\n", (long long)num);
}
```

このコードは、スタックの位置1にある値を整数値に変換し、成功した場合は表示します。

## 互換性

- Lua5.2

## 関連項目

- lua_tointeger
- lua_tonumberx