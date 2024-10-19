# coroutine.create

新しいコルーチンを作成する

```lua
coroutine.create (f)
```

## 説明

本体が`f`の新しいコルーチンを作成します。`f`はLua関数でなければなりません。この新しいコルーチンを返します。タイプは `"thread"`のオブジェクトです。

## サンプルコード

```lua
local co = coroutine.create(function() print("Hello from coroutine!") end)
coroutine.resume(co)  -- "Hello from coroutine!" を出力
```

この例では、コルーチンを作成し、`resume`でその実行を開始しています。

## 互換性

- Lua 5.1

## 関連項目

- `coroutine.resume`
- `coroutine.wrap`