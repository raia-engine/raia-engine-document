# lua_rawget

指定されたインデックスにあるテーブルから生のアクセスで値を取得し、スタックにプッシュします。

`[-1, +1, -]`

```c
void lua_rawget (lua_State *L, int index);
```

## 説明

`lua_gettable`に似ていますが、メタメソッドを使用せずに生のアクセスを行います。

## サンプルコード

```c
lua_pushstring(L, "key");
lua_rawget(L, -2);
```

このコードは、テーブルからキー「key」に対応する値を取得し、メタメソッドを使わずにスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_gettable
- lua_rawgeti