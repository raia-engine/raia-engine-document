# luaL_openlibs

指定されたLuaステートにすべての標準Luaライブラリを開きます。

`[-0, +0, m]`

```c
void luaL_openlibs (lua_State *L);
```

## 説明

指定されたステートにすべての標準Luaライブラリを開きます。

## サンプルコード

```c
luaL_openlibs(L);
```

このコードは、Luaステート`L`に標準ライブラリを開きます。

## 互換性

- Lua5.1

## 関連項目

- luaL_newstate
- luaL_requiref