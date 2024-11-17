# luaL_pushresult

バッファ`B`の使用を終了し、結果の文字列をスタックにプッシュします。

`[-?, +1, m]`

```c
void luaL_pushresult (luaL_Buffer *B);
```

## 説明

バッファ`B`の使用を終了し、最終的な文字列をスタックのトップに残します。

## サンプルコード

```c
luaL_pushresult(&B);
```

このコードは、バッファ`B`の内容をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- luaL_Buffer
- luaL_addstring