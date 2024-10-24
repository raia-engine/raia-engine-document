# debug.getfenv

```lua
debug.getfenv (o)
```

## 説明

指定したオブジェクト`o`の環境テーブルを返します。この環境テーブルは、そのオブジェクトが使用するグローバル変数やモジュールを管理するために使われます。

## サンプルコード

```lua
local fenv = debug.getfenv(print)
print(fenv._G == _G)  -- true が表示される
```

この例では、`print`関数の環境テーブルが取得され、グローバル環境`_G`と同じかどうかが確認されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`setfenv`](../std/setfenv.md)
- [`getmetatable`](../std/getmetatable.md)