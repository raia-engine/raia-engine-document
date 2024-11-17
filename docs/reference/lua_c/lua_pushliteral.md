# lua_pushliteral

リテラル文字列をスタックにプッシュします。

`[-0, +1, m]`

```c
void lua_pushliteral (lua_State *L, const char *s);
```

## 説明

このマクロは`lua_pushlstring`と等価ですが、`s`がリテラル文字列である場合のみ使用できます。これらの場合、自動的に文字列の長さを提供します。

## サンプルコード

```c
lua_pushliteral(L, "Hello, world!");
```

このコードは、文字列「Hello, world!」をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushstring
- lua_pushlstring