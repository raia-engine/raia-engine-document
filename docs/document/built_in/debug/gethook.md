# debug.gethook

```lua
debug.gethook ([thread])
```

## 説明

指定されたスレッドに設定されているフック関数、フックマスク、フックカウントを返します。フックは関数の呼び出しや戻り、行遷移などのイベントを捕捉するために使用されます。

## サンプルコード

```lua
local hook, mask, count = debug.gethook()
print(hook, mask, count)
```

この例では、現在設定されているフック関数とそのマスクやカウントが出力されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.sethook`](sethook.md)