# lua_tonumber

指定されたインデックスの値を`lua_Number`型の数値に変換します。

`[-0, +0, -]`

```c
lua_Number lua_tonumber (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスのLua値をCのタイプ`lua_Number`に変換します（`lua_Number`を参照）。Lua値は数値または数値に変換可能な文字列でなければなりません。そうでない場合、`lua_tonumber`は0を返します。

## サンプルコード

```c
lua_Number num = lua_tonumber(L, 1);
printf("数値: %f\n", num);
```

このコードは、指定されたインデックスの値を数値として取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushnumber
- lua_isnumber