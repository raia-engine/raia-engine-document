# luaL_unref

指定されたテーブルから参照を解放します。

`[-0, +0, -]`

```c
void luaL_unref (lua_State *L, int t, int ref);
```

## 説明

インデックス`t`のテーブルから参照`ref`を解放します（`luaL_ref`を参照）。エントリはテーブルから削除されるので、参照されたオブジェクトは回収されることができます。参照`ref`も再利用のために解放されます。

`ref`が`LUA_NOREF`または`LUA_REFNIL`の場合、`luaL_unref`は何も行いません。

## サンプルコード

```c
luaL_unref(L, LUA_REGISTRYINDEX, ref);
```

このコードは、レジストリ内で参照されていたオブジェクトを解放します。

## 互換性

- Lua5.1

## 関連項目

- luaL_ref
- lua_rawgeti