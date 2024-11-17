# lua_newstate

新しい、独立したLuaステートを作成します。

`[-0, +0, -]`

```c
lua_State *lua_newstate (lua_Alloc f, void *ud);
```

## 説明

新しい、独立したステートを作成します。ステートを作成できない（メモリ不足のため）場合はNULLを返します。`f`引数はアロケータ関数で、このステートのためのすべてのメモリ割り当てはこの関数を通じて行われます。2番目の引数`ud`は、Luaがすべての呼び出しでアロケータに単純に渡す不透明なポインタです。

## サンプルコード

```c
lua_State *L = lua_newstate(allocator_function, NULL);
if (L == NULL) {
    fprintf(stderr, "メモリ不足で新しいステートを作成できません\n");
}
```

このコードは、新しいLuaステートを作成し、メモリ不足の場合にエラーメッセージを表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_close
- lua_getallocf