# lua_Integer

Lua APIが整数値を表すために使用する型です。

```c
typedef ptrdiff_t lua_Integer;
```

## 説明

Lua APIが整数値を表すために使用する型です。

デフォルトでは`ptrdiff_t`であり、これは通常、マシンが「快適に」扱うことができる最大の符号付き整数型です。

## サンプルコード

```c
lua_Integer my_int = 42;
lua_pushinteger(L, my_int);
```

このコードは、整数`42`をLuaスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushinteger
- lua_tointeger