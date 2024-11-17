# luaL_addstring

ゼロ終端文字列`s`をバッファ`B`に追加します。

`[-0, +0, m]`

```c
void luaL_addstring (luaL_Buffer *B, const char *s);
```

## 説明

ゼロ終端文字列`s`をバッファ`B`に追加します（`luaL_Buffer`を参照）。文字列には組み込みのゼロを含むことはできません。

## サンプルコード

```c
luaL_addstring(&B, "world");
```

このコードは、バッファ`B`に文字列「world」を追加します。

## 互換性

- Lua5.1

## 関連項目

- luaL_addchar
- luaL_addlstring