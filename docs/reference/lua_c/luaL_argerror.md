# luaL_argerror

指定された引数番号にエラーメッセージを表示します。

`[-0, +0, v]`

```c
int luaL_argerror (lua_State *L, int narg, const char *extramsg);
```

## 説明

以下のメッセージでエラーを発生させます。ここで`func`はコールスタックから取得されます：

```
<func>への引数#<narg>が不正です（<extramsg>）
```

この関数は決して返りませんが、C関数内で`return luaL_argerror(args)`として使用するのが一般的な慣習です。

## サンプルコード

```c
if (!condition) return luaL_argerror(L, 1, "無効な引数");
```

このコードは、条件が満たされていない場合に引数エラーを返します。

## 互換性

- Lua5.1

## 関連項目

- luaL_argcheck
- luaL_checktype