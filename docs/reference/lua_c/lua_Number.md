# lua_Number

Luaで使用する数値型です。

```c
typedef double lua_Number;
```

## 説明

Luaの数値の型です。デフォルトではdoubleですが、luaconf.hで変更することができます。

設定ファイルを通じて、数値のための別の型（例えば、floatやlong）でLuaを動作させるように変更できます。

## サンプルコード

```c
lua_Number num = 3.14;
lua_pushnumber(L, num);
```

このコードは、数値`3.14`をLuaスタックにプッシュします。

## 互換性

- Lua5.1

## 関連項目

- lua_pushnumber
- lua_tonumber