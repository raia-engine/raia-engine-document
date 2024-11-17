# lua_version

Luaのバージョン番号のアドレスを返します。

``[-0, +0, v]``

```c
const lua_Number *lua_version (lua_State *L);
```

## 説明

Luaコアに格納されたバージョン番号のアドレスを返します。`lua_State`が有効である場合、作成された状態のバージョンのアドレスを返します。`NULL`で呼び出すと、呼び出しを行っているバージョンのアドレスを返します。

## サンプルコード

```c
const lua_Number *version = lua_version(L);
if (version) {
    printf("Luaバージョン: %.1f\n", *version);
}
```

このコードは、Luaのバージョン番号を取得して表示します。

## 互換性

- Lua5.2

## 関連項目

- luaL_newstate
- luaL_openlibs