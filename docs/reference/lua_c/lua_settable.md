# lua_settable

指定されたインデックスにあるテーブルにキーと値を設定します。

`[-2, +0, e]`

```c
void lua_settable (lua_State *L, int index);
```

## 説明

`t[k] = v`と同等の操作を行います。ここで`t`は与えられた有効なインデックスでの値、`v`はスタックのトップにあり、`k`はトップの直下にある値です。

この関数はキーと値の両方をスタックからポップします。Luaと同様に、この関数は"newindex"イベントのメタメソッドを起動する可能性があります。

## サンプルコード

```c
lua_pushstring(L, "key");
lua_pushstring(L, "value");
lua_settable(L, -3);
```

このコードは、テーブルにキー「key」と値「value」を設定します。メタメソッドが起動される可能性があります。

## 互換性

- Lua5.1

## 関連項目

- lua_gettable
- lua_setfield