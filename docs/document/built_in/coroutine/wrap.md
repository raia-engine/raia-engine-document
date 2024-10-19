# coroutine.wrap

コルーチンを関数としてラップする

```lua
coroutine.wrap (f)
```

## 説明

本体が`f`の新しいコルーチンを作成し、コルーチンを再開するための関数を返します。`resume`の呼び出しと同様に機能しますが、最初の`true`は返さず、エラーが発生した場合はそれをスローします。

## サンプルコード

```lua
local f = coroutine.wrap(function()
    for i = 1, 3 do
        coroutine.yield(i)
    end
end)

print(f())  -- 1
print(f())  -- 2
print(f())  -- 3
```

この例では、コルーチンを再開するたびに`yield`で値を返します。

## 互換性

Lua 5.1

## 関連項目

- `coroutine.create`
- `coroutine.resume`