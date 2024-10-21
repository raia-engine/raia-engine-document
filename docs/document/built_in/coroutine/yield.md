# coroutine.yield

コルーチンを一時停止し、再開できるようにする

```lua
coroutine.yield (...)
```

## 説明

現在のコルーチンの実行を中断します。引数`...`はコルーチンを再開したときに返される結果として扱われます。

## サンプルコード

```lua
local co = coroutine.create(function()
    for i = 1, 3 do
        print(coroutine.yield(i))  -- 1, 2, 3 を順に出力
    end
end)

coroutine.resume(co)  -- 1
coroutine.resume(co)  -- 2
coroutine.resume(co)  -- 3
```

この例では、コルーチンが`yield`によって中断され、その後再開されています。

## 互換性

- Lua 5.1

## 関連項目

- [`coroutine.resume`](resume.md)
- [`coroutine.wrap`](wrap.md)