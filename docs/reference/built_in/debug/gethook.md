# debug.gethook

現在設定されているフック関数を返す

```lua
debug.gethook ([thread])
```

## 説明

指定したスレッドに設定されているフック関数、フックマスク、およびフックカウントを返します。フックは、関数の呼び出しやリターン、行の遷移などのイベントを捕捉するために使用されます。

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