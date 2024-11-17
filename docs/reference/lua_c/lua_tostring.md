# lua_tostring

`lua_tolstring`と同等で、文字列ポインタを返します。

`[-0, +0, m]`

```c
const char *lua_tostring (lua_State *L, int index);
```

## 説明

`len`がNULLに等しい`lua_tolstring`と同等です。

## サンプルコード

```c
const char *str = lua_tostring(L, 1);
printf("文字列: %s\n", str);
```

このコードは、指定されたインデックスの値を文字列として取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_tolstring
- lua_isstring