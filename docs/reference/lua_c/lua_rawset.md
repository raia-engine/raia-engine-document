# lua_rawset

指定されたインデックスにあるテーブルに生の割り当てを行います。

`[-2, +0, m]`

```c
void lua_rawset (lua_State *L, int index);
```

## 説明

`lua_settable`に似ていますが、メタメソッドを使用せずに生の割り当てを行います。

## サンプルコード

```c
lua_pushstring(L, "key");
lua_pushstring(L, "value");
lua_rawset(L, -3);
```

このコードは、テーブルにキー「key」と値「value」を生の方法で設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_settable
- lua_rawseti