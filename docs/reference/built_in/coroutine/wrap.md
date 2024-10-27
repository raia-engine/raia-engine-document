# coroutine.wrap

コルーチンを関数としてラップする

```lua
coroutine.wrap (f)
```

## 説明

Lua関数 `f` を本体とする新しいコルーチンを作成し、そのコルーチンを再開するための関数を返します。この関数は `resume` と同様に動作しますが、最初の `true` は返さず、エラーが発生した場合はエラーをスローします。

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

- Lua 5.1

## 関連項目

- [`coroutine.create`](create.md)
- [`coroutine.resume`](resume.md)