# luaL_argcheck

指定された条件が真であることを確認します。

`[-0, +0, v]`

```c
void luaL_argcheck (lua_State *L, int cond, int narg, const char *extramsg);
```

## 説明

`cond`が真であることを確認します。そうでない場合、以下のメッセージでエラーを発生させます。ここで`func`はコールスタックから取得されます：

```
<func>への引数#<narg>が不正です（<extramsg>）
```

## サンプルコード

```c
luaL_argcheck(L, condition, 1, "条件が満たされていません");
```

このコードは、`condition`が真でない場合にエラーを生成します。

## 互換性

- Lua5.1

## 関連項目

- luaL_argerror
- luaL_checktype