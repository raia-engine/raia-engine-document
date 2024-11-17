# lua_replace

スタックトップの要素を指定されたインデックスの位置に移動します。

`[-1, +0, -]`

```c
void lua_replace (lua_State *L, int index);
```

## 説明

トップ要素を指定された位置に移動し（ポップします）、他の要素をシフトせずに（したがって、指定された位置の値を置き換えます）。

## サンプルコード

```c
lua_pushstring(L, "new_value");
lua_replace(L, 1);
```

このコードは、スタックトップの値「new_value」をインデックス1に移動し、元のインデックス1の値を置き換えます。

## 互換性

- Lua5.1

## 関連項目

- lua_pop
- lua_pushvalue