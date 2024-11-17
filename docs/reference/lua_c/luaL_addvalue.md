# luaL_addvalue

スタックのトップにある値をバッファ`B`に追加します。

`[-1, +0, m]`

```c
void luaL_addvalue (luaL_Buffer *B);
```

## 説明

スタックのトップにある値をバッファ`B`に追加します（`luaL_Buffer`を参照）。値をポップします。

これは文字列バッファに対して呼び出すことができ（そして呼び出す必要がある）唯一の関数です。バッファに追加する値がスタック上に余分に存在する必要があります。

## サンプルコード

```c
lua_pushstring(L, "Hello");
luaL_addvalue(&B);
```

このコードは、スタックトップにある文字列「Hello」をバッファ`B`に追加し、スタックからポップします。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_pushresult