# lua_tonumberx

Luaの値を`lua_Number`型に変換します。

``[-0, +0, –]``

```c
lua_Number lua_tonumberx (lua_State *L, int index, int *isnum);
```

## 説明

指定されたインデックスのLuaの値をC型`lua_Number`に変換します（`lua_Number`参照）。Luaの値が数値または数値に変換可能な文字列でなければ、`lua_tonumberx`は0を返します（§3.4.2参照）。

`isnum`が`NULL`でない場合、変換が成功したかどうかを示すブール値が設定されます。

## サンプルコード

```c
int isnum;
lua_Number num = lua_tonumberx(L, 1, &isnum);
if (isnum) {
    printf("数値: %f\n", num);
}
```

このコードは、スタックの位置1にある値を数値に変換し、成功した場合は表示します。

## 互換性

- Lua5.2

## 関連項目

- lua_tonumber
- lua_tointegerx