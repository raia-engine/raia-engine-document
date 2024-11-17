# lua_getallocf

特定のステートのメモリ割り当て関数を返します。

`[-0, +0, -]`

```c
lua_Alloc lua_getallocf (lua_State *L, void **ud);
```

## 説明

特定のステートのメモリ割り当て関数を返します。`ud`がNULLでない場合、Luaは`*ud`に`lua_newstate`に渡された不透明なポインタを格納します。

## サンプルコード

```c
void *ud;
lua_Alloc alloc = lua_getallocf(L, &ud);
```

このコードは、指定したLuaステートのメモリ割り当て関数とそのユーザーデータを取得します。

## 互換性

- Lua5.1

## 関連項目

- lua_setallocf
- lua_newstate