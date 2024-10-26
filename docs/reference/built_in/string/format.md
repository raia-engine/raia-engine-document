# string.format

```lua
string.format (formatstring, ···)
```

## 説明

指定されたフォーマット文字列に従って引数をフォーマットし、新しい文字列を返します。`printf`スタイルのフォーマットに加え、Lua独自の`%q`オプションも利用可能です。

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