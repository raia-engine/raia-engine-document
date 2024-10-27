# string.format

```lua
string.format (formatstring, ···)
```

## 説明

指定されたフォーマット文字列 `formatstring` に従って、引数をフォーマットし、新しい文字列を返します。C 言語の `printf` スタイルの書式指定が使用でき、Lua 独自の `%q` オプションも利用可能です。

## 補足

LuaJITではLua5.2から次の機能を取り入れています。

- `%q` による逆変換。
- `%s` を指定した場合にオブジェクトの `__tostring` メタメソッドをチェックする。
- `%a` と `%A`（浮動小数点数の16進数表記）。

## サンプルコード

```lua
local s = string.format("Hello %s, you are %d years old.", "Lua", 30)
print(s)  -- "Hello Lua, you are 30 years old."
```

この例では、フォーマットされた文字列を生成します。

## LuaJIT独自の拡張

- `%q`が逆変換可能(Lua5.2から)
- `%s`は`__tostring`をチェック(Lua5.2から)
- `%a`と`%A`が追加された。(Lua5.2から)

## 互換性

- Lua 5.1

## 関連項目

- [`string.rep`](rep.md)