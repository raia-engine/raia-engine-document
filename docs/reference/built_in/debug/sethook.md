# debug.sethook

指定したフック関数を設定する

```lua
debug.sethook ([thread,] hook, mask [, count])
```

## 説明

指定したフック関数を設定します。フックは、関数の呼び出しやリターン、行の実行時に呼び出されます。`mask`引数で、フックが呼び出されるイベントを指定できます。

## サンプルコード

```lua
local function hook(event)
  print("Hook event:", event)
end

debug.sethook(hook, "c")
print("Hello")
```

この例では、フック関数が関数呼び出し時に呼び出されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.gethook`](gethook.md)