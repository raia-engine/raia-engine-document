# lua_getfield

スタックに値`t[k]`をプッシュします。

`[-0, +1, e]`

```c
void lua_getfield (lua_State *L, int index, const char *k);
```

## 説明

スタックに値`t[k]`をプッシュします。ここで`t`は指定された有効なインデックスの値です。Luaと同様に、この関数は"index"イベントに対するメタメソッドをトリガーすることがあります。

## サンプルコード

```c
lua_getfield(L, LUA_GLOBALSINDEX, "myVar");
```

このコードは、グローバル変数`myVar`の値をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_setfield
- lua_gettable