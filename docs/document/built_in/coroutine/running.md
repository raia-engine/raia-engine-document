# coroutine.running

実行中のコルーチンを返す

```lua
coroutine.running ()
```

## 説明

現在実行中のコルーチンを返します。メインスレッドが呼び出すと`nil`を返します。

## サンプルコード

```lua
local co = coroutine.create(function()
  print(coroutine.running())  -- コルーチンのオブジェクトを表示
end)
coroutine.resume(co)
```

この例では、現在実行中のコルーチンを取得し、表示しています。

## 互換性

- Lua 5.1

## 関連項目

- `coroutine.status`