# lua_pushlstring

指定された長さの文字列をスタックにプッシュします。

`[-0, +1, m]`

```c
void lua_pushlstring (lua_State *L, const char *s, size_t len);
```

## 説明

`s`が指す長さ`len`の文字列をスタックにプッシュします。Luaは与えられた文字列の内部コピーを作成（または再利用）しますので、関数が戻った直後に`s`のメモリを解放または再利用できます。文字列には組み込みのゼロを含めることができます。

## サンプルコード

```c
lua_pushlstring(L, "Hello", 5);
```

このコードは、長さ5の文字列「Hello」をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushstring
- lua_pushliteral