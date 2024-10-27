# debug.traceback

```lua
debug.traceback ([thread,] [message [, level]])
```

## 説明

コールスタックのトレースバック情報を文字列として返します。オプションで、エラーメッセージやトレースバックを開始するレベルを指定できます。

## サンプルコード

```lua
local function test()
  error("An error occurred")
end

local function main()
  test()
end

local success, err = pcall(main)
if not success then
  print(debug.traceback(err))
end
```

この例では、エラーが発生した際にトレースバックが出力されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`error`](../std/error.md)
- [`pcall`](../std/pcall.md)