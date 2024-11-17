# luaL_addsize

指定されたサイズ`n`のデータをバッファ`B`に追加します。

`[-0, +0, m]`

```c
void luaL_addsize (luaL_Buffer *B, size_t n);
```

## 説明

以前にバッファ領域にコピーされた長さ`n`の文字列をバッファ`B`に追加します（`luaL_Buffer`を参照）。

## サンプルコード

```c
luaL_addsize(&B, 3);
```

このコードは、バッファ`B`に3バイトのデータを追加します。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_buffinit