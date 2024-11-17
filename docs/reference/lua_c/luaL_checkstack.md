# luaL_checkstack

スタックのサイズを確認し、指定されたサイズまで拡張可能かどうかを確認します。

`[-0, +0, v]`

```c
void luaL_checkstack (lua_State *L, int sz, const char *msg);
```

## 説明

スタックサイズを`top + sz`要素まで増やし、スタックをそのサイズまで増やせない場合にはエラーを発生させます。`msg`はエラーメッセージに追加するテキストです。

## サンプルコード

```c
luaL_checkstack(L, 10, "スタックが小さすぎます");
```

このコードは、スタックに10個の追加項目が配置できるか確認し、できない場合はエラーを出します。

## 互換性

- Lua5.1

## 関連項目

- lua_checkstack
- lua_error