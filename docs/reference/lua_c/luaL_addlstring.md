# luaL_addlstring

長さ`l`の文字列`s`をバッファ`B`に追加します。

`[-0, +0, m]`

```c
void luaL_addlstring (luaL_Buffer *B, const char *s, size_t l);
```

## 説明

長さ`l`の文字列`s`をバッファ`B`に追加します（`luaL_Buffer`を参照）。文字列には組み込みのゼロを含むことができます。

## サンプルコード

```c
luaL_addlstring(&B, "Hello", 5);
```

このコードは、バッファ`B`に長さ5の文字列「Hello」を追加します。

## 互換性

- Lua5.1

## 関連項目

- luaL_addstring
- luaL_Buffer