# lua_copy

指定された位置にある要素を別の位置にコピーします。

``[-0, +0, –]``

```c
void lua_copy (lua_State *L, int fromidx, int toidx);
```

## 説明

`fromidx`の位置にある要素を有効なインデックス`toidx`に移動し、他の要素をシフトせずにその位置の値を置き換えます。

## サンプルコード

```c
lua_copy(L, -1, 2);
```

このコードは、スタックのトップにある要素を位置2にコピーします。

## 互換性

- Lua5.2

## 関連項目

- lua_replace
- lua_pushvalue