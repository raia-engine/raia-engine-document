# lua_getinfo

特定の関数または関数呼び出しについての情報を返します。

`[-(0|1), +(0|1|2), m]`

```c
int lua_getinfo (lua_State *L, const char *what, lua_Debug *ar);
```

## 説明

特定の関数または関数呼び出しについての情報を返します。

関数呼び出しについての情報を取得するには、`ar`パラメータは、以前に`lua_getstack`によって記入された有効なアクティベーションレコードである必要があります、またはフックに引数として与えられる必要があります（`lua_Hook`を参照）。

関数についての情報を取得するには、それをスタックにプッシュし、`what`文字列を文字`'>'`で開始します。（その場合、`lua_getinfo`はスタックの上にある関数をポップします。）例えば、関数`f`がどの行で定義されたかを知るには、次のコードを書くことができます：

```c
lua_Debug ar;
lua_getfield(L, LUA_GLOBALSINDEX, "f");  /* get global 'f' */
lua_getinfo(L, ">S", &ar);
printf("%d\n", ar.linedefined);
```

`what`文字列の各文字は、構造体`ar`の特定のフィールドを記入するか、スタックに値をプッシュすることを選択します：

- `'n'`: `name`と`namewhat`フィールドを記入します。
- `'S'`: `source`、`short_src`、`linedefined`、`lastlinedefined`、および`what`フィールドを記入します。
- `'l'`: `currentline`フィールドを記入します。
- `'u'`: `nups`フィールドを記入します。
- `'f'`: 与えられたレベルで実行中の関数をスタックにプッシュします。
- `'L'`: 関数で有効な行の番号がインデックスであるテーブルをスタックにプッシュします。（有効な行とは、コードが関連付けられている行、つまり、ブレークポイントを置くことができる行です。無効な行には空行やコメントが含まれます。）

この関数はエラーが発生した場合（例えば、`what`で無効なオプションがある場合）に0を返します。

## サンプルコード

```c
lua_Debug ar;
lua_getfield(L, LUA_GLOBALSINDEX, "myFunction");
lua_getinfo(L, ">S", &ar);
printf("定義開始行: %d\n", ar.linedefined);
```

このコードは、グローバル関数`myFunction`の定義開始行を取得して表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_getstack
- lua_Debug