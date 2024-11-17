# luaL_addchar

文字`c`をバッファ`B`に追加します。

`[-0, +0, m]`

```c
void luaL_addchar (luaL_Buffer *B, char c);
```

## 説明

文字`c`をバッファ`B`に追加します（`luaL_Buffer`を参照）。

## サンプルコード

```c
luaL_addchar(&B, 'A');
```

このコードは、バッファ`B`に文字`A`を追加します。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_buffinit