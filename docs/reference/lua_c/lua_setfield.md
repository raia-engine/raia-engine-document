# lua_setfield

指定されたテーブルにキー`k`の値を設定します。

`[-1, +0, e]`

```c
void lua_setfield (lua_State *L, int index, const char *k);
```

## 説明

`t[k] = v`と同等の操作を行います。ここで`t`は与えられた有効なインデックスでの値、`v`はスタックのトップにある値です。

この関数はスタックから値をポップします。Luaと同様に、この関数は"newindex"イベントのメタメソッドを起動する可能性があります。

## サンプルコード

```c
lua_pushstring(L, "value");
lua_setfield(L, -2, "key");
```

このコードは、テーブルにキー「key」と値「value」を設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getfield
- lua_settable