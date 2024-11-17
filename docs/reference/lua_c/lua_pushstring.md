# lua_pushstring

ゼロ終了文字列`s`をスタックにプッシュします。

`[-0, +1, m]`

```c
void lua_pushstring (lua_State *L, const char *s);
```

## 説明

`s`が指すゼロ終了文字列をスタックにプッシュします。Luaは与えられた文字列の内部コピーを作成（または再利用）しますので、関数が戻った直後に`s`のメモリを解放または再利用できます。文字列に組み込みのゼロを含むことはできず、最初のゼロで終了すると見なされます。

## サンプルコード

```c
lua_pushstring(L, "Hello, world!");
```

このコードは、文字列「Hello, world!」をスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushlstring
- lua_tolstring