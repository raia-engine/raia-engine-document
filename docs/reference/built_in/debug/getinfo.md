# debug.getinfo

```lua
debug.getinfo ([thread,] function [, what])
```

## 説明

指定した関数やスタックレベルに関する情報を返します。この情報には、関数名、ソースコードの行番号、呼び出し回数などが含まれます。`what`引数を使用して取得する情報を特定することができます。

## サンプルコード

```lua
local info = debug.getinfo(1, "n")
print(info.name)
```

この例では、現在の関数に関する名前が取得され、出力されます。

## LuaJIT独自の拡張

- メタメソッドを識別する。
- オプション"u"に対して`nparams`と`isvararg`を返す。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.traceback`](traceback.md)
- [`debug.getlocal`](getlocal.md)