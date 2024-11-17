# lua_setallocf

指定されたステートのメモリアロケータ関数を設定します。

`[-0, +0, -]`

```c
void lua_setallocf (lua_State *L, lua_Alloc f, void *ud);
```

## 説明

指定されたステートのアロケータ関数をユーザーデータ`ud`を持つ`f`に変更します。

## サンプルコード

```c
lua_setallocf(L, custom_allocator, NULL);
```

このコードは、カスタムアロケータ`custom_allocator`を設定します。

## 互換性

- Lua5.1

## 関連項目

- lua_getallocf
- lua_newstate