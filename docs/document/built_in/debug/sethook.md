# debug.sethook

```lua
debug.sethook ([thread,] hook, mask [, count])
```

## 説明

指定したフック関数を設定します。フックは関数呼び出しや戻り、行の実行時に呼び出されます。`mask`引数でフックが呼び出されるタイミングを指定できます。

## サンプルコード

```lua
local function hook(event)
  print("Hook event:", event)
end

debug.sethook(hook, "c")
print("Hello")
```

この例では、フック関数が関数呼び出し時に呼び出されます。

## 互換性

- Lua 5.1

## 関連項目

- [`debug.gethook`](gethook.md)