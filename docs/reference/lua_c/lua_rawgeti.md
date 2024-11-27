# lua_rawgeti

指定されたインデックスにあるテーブルの整数キー`n`に対応する値を取得し、スタックにプッシュします。

`[-0, +1, -]`

```c
void lua_rawgeti (lua_State *L, int index, int n);
```

## 説明

指定された有効なインデックスにある値`t`の`t[n]`をスタックにプッシュします。アクセスは生のもので、メタメソッドは呼び出されません。

## サンプルコード

```c
lua_rawgeti(L, -1, 1);
```

このコードは、テーブルの整数キー`1`に対応する値を取得し、メタメソッドを使わずにスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_geti
- lua_rawget