# coroutine.resume

コルーチンを再開する

```lua
coroutine.resume (co [, val1, ...])
```

## 説明

コルーチン`co`の実行を開始または継続します。最初に再開するときは、`co`の本体関数が実行されます。`val1, ...`は本体関数への引数として渡されます。コルーチンが中断されていた場合は、それを再開し、`yield`からの結果として引数が渡されます。

成功すると、`resume`は`true`とコルーチンから返された値を返します。エラーが発生した場合、`false`とエラーメッセージを返します。

## サンプルコード

```lua
local co = coroutine.create(function(a, b) print(a + b) end)
coroutine.resume(co, 3, 5)  -- 8 を出力
```

この例では、コルーチンに2つの引数を渡し、それらを使用して計算を行います。

## 互換性

- Lua 5.1

## 関連項目

- `coroutine.create`
- `coroutine.yield`