# luaL_buffinit

バッファ`B`を初期化します。

`[-0, +0, -]`

```c
void luaL_buffinit (lua_State *L, luaL_Buffer *B);
```

## 説明

バッファ`B`を初期化します。この関数は空間を割り当てません。バッファは変数として宣言される必要があります（`luaL_Buffer`を参照）。

## サンプルコード

```c
luaL_Buffer b;
luaL_buffinit(L, &b);
```

このコードは、`luaL_Buffer`を初期化します。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_addstring