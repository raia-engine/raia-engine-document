# coroutine.resume

コルーチンを再開する

```lua
coroutine.resume (co [, val1, ...])
```

## 説明

コルーチン `co` の実行を開始または再開します。最初に再開する場合、`co` の本体関数が実行され、引数 `val1, ...` がその関数に渡されます。コルーチンが `yield` により中断されていた場合は、その地点から再開され、`yield` の戻り値として引数が渡されます。

成功すると、`resume` は `true` とコルーチンから返された値を返します。エラーが発生した場合は、`false` とエラーメッセージを返します。

## サンプルコード

```lua
local co = coroutine.create(function(a, b) print(a + b) end)
coroutine.resume(co, 3, 5)  -- 8 を出力
```

この例では、コルーチンに2つの引数を渡し、それらを使用して計算を行います。

## 互換性

- Lua 5.1

## 関連項目

- [`coroutine.create`](create.md)
- [`coroutine.yield`](yield.md)