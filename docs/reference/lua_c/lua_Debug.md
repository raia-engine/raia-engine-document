# lua_Debug

アクティブな関数に関する情報を伝達するための構造体です。

```c
typedef struct lua_Debug {
  int event;
  const char *name;
  const char *namewhat;
  const char *what;
  const char *source;
  int currentline;
  int nups;
  int linedefined;
  int lastlinedefined;
  char short_src[LUA_IDSIZE];
  /* private part */
  other fields
} lua_Debug;
```

## 説明

アクティブな関数に関するさまざまな情報を伝達するために使用される構造体です。`lua_getstack`はこの構造体のプライベート部分のみを埋め、後で使用するためです。`lua_Debug`の他のフィールドを有用な情報で埋めるには、`lua_getinfo`を呼び出します。

`lua_Debug`構造体のフィールドは以下の意味を持ちます：

- `source`: 関数が文字列で定義されている場合、`source`はその文字列です。ファイルで定義されている場合、`source`は`'@'`に続いてファイル名から始まります。
- `short_src`: `source`の「印刷可能な」バージョンで、エラーメッセージで使用されます。
- `linedefined`: 関数の定義が始まる行番号です。
- `lastlinedefined`: 関数の定義が終わる行番号です。
- `what`: 関数がLua関数であれば"Lua"、C関数であれば"C"、チャンクのメイン部分であれば"main"、末尾呼び出しを行った関数であれば"tail"の文字列です。後者の場合、Luaにはその関数についての他の情報はありません。
- `currentline`: 実行中の関数がある現在の行です。行情報が利用できない場合、`currentline`は-1に設定されます。
- `name`: 与えられた関数の適切な名前です。Luaの関数はファーストクラスの値であるため、固定の名前を持っていません：いくつかの関数は複数のグローバル変数の値になることがあり、他のものはテーブルのフィールドにのみ保存されることがあります。`lua_getinfo`関数は、適切な名前を見つけるために関数がどのように呼び出されたかをチェックします。名前を見つけることができない場合、`name`はNULLに設定されます。
- `namewhat`: `name`フィールドを説明します。`namewhat`の値は、関数の呼び出し方によって「global」、「local」、「method」、「field」、「upvalue」、または「」（空の文字列）になります。（Luaは他のオプションが適用されないように見える場合に空の文字列を使用します。）
- `nups`: 関数のアップバリューの数です。

## サンプルコード

```c
lua_Debug ar;
lua_getstack(L, 1, &ar);
lua_getinfo(L, "nSl", &ar);
printf("関数名: %s\n定義開始行: %d\n", ar.name, ar.linedefined);
```

このコードは、関数のスタック情報を取得し、関数名と定義開始行を表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_getstack
- lua_getinfo