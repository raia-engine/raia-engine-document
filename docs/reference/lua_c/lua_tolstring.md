# lua_tolstring

指定されたインデックスの値をCの文字列に変換します。

`[-0, +0, m]`

```c
const char *lua_tolstring (lua_State *L, int index, size_t *len);
```

## 説明

与えられた有効なインデックスのLua値をCの文字列に変換します。`len`がNULLでない場合、文字列の長さを`*len`に設定します。Lua値は文字列または数値でなければならず、そうでない場合は関数はNULLを返します。値が数値の場合、`lua_tolstring`はスタック内の実際の値を文字列にも変更します。（この変更は、テーブル走査中にキーに`lua_tolstring`が適用されると`lua_next`を混乱させます。）

`lua_tolstring`はLuaステート内の文字列への完全にアラインされたポインタを返します。この文字列は最後の文字の後に常にゼロ（'\0'）を持ちます（C言語のように）、しかし、本文中に他のゼロを含むことができます。Luaにはガーベージコレクションがあるため、スタックから対応する値が削除された後に`lua_tolstring`によって返されるポインタが有効であることは保証されません。

## サンプルコード

```c
size_t len;
const char *str = lua_tolstring(L, 1, &len);
printf("文字列: %s, 長さ: %zu\n", str, len);
```

このコードは、指定されたインデックスの値を文字列として取得し、長さと共に表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_pushstring
- lua_isstring