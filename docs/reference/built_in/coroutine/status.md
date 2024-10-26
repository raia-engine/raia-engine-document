# coroutine.status

コルーチンの状態を返す

```lua
coroutine.status (co)
```

## 説明

コルーチン`co`の現在の状態を文字列で返します。状態は次の4つです：

- `"running"`: 実行中
- `"suspended"`: 実行が中断されている、またはまだ開始されていない
- `"normal"`: コルーチンが別のコルーチンを実行中
- `"dead"`: コルーチンが終了したかエラーが発生した

## サンプルコード

```lua
local co = coroutine.create(function() end)
print(coroutine.status(co))  -- "suspended"
coroutine.resume(co)
print(coroutine.status(co))  -- "dead"
```

この例では、コルーチンの状態が変更される様子を確認しています。

## 互換性

- Lua 5.1

## 関連項目

- [`coroutine.running`](running.md)
- [`coroutine.create`](create.md)