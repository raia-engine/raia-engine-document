# luaL_prepbuffer

バッファに追加するための領域を準備し、バッファの先頭アドレスを返します。

`[-0, +0, -]`

```c
char *luaL_prepbuffer (luaL_Buffer *B);
```

## 説明

バッファ`B`に追加される文字列をコピーするための、サイズ`LUAL_BUFFERSIZE`のスペースへのアドレスを返します（`luaL_Buffer`を参照）。このスペースに文字列をコピーした後、実際にバッファに追加するためには`luaL_addsize`を文字列のサイズで呼び出す必要があります。

## サンプルコード

```c
char *buf = luaL_prepbuffer(&B);
strcpy(buf, "hello");
luaL_addsize(&B, 5);
```

このコードは、バッファ`B`に「hello」を追加します。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_addsize