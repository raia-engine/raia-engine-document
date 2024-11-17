# luaL_checkoption

指定された引数が文字列であることを確認し、配列内の対応するインデックスを返します。

`[-0, +0, v]`

```c
int luaL_checkoption (lua_State *L, int narg, const char *def, const char *const lst[]);
```

## 説明

関数の引数`narg`が文字列であるか確認し、その文字列を配列`lst`（NULLで終了する必要があります）で検索します。文字列が見つかった配列内のインデックスを返します。引数が文字列でない場合や文字列が見つからない場合はエラーを発生させます。

`def`が`NULL`でない場合、この関数は引数`narg`が存在しない場合や`nil`である場合にデフォルト値として`def`を使用します。

これは文字列をCの列挙型にマッピングするのに便利な関数です（Luaライブラリでは、オプションを選択するために数値の代わりに文字列を使用するのが通常の慣習です）。

## サンプルコード

```c
const char *options[] = {"option1", "option2", NULL};
int index = luaL_checkoption(L, 1, NULL, options);
printf("選択されたオプションインデックス: %d\n", index);
```

このコードは、引数1が指定されたオプションリスト内のどのインデックスかを確認し、表示します。

## 互換性

- Lua5.1

## 関連項目

- luaL_argerror
- luaL_checkstring