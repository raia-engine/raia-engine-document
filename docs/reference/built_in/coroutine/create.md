# coroutine.create

新しいコルーチンを作成する

```lua
coroutine.create (f)
```

## 説明

Lua関数 `f` を本体とする新しいコルーチンを作成します。`f` は必ず Lua の関数でなければなりません。この関数は新しく生成されたコルーチンを返し、そのオブジェクトのタイプは `"thread"` です。

## サンプルコード

```lua
local co = coroutine.create(function() print("Hello from coroutine!") end)
coroutine.resume(co)  -- "Hello from coroutine!" を出力
```

この例では、コルーチンを作成し、`resume`でその実行を開始しています。

## 互換性

- Lua 5.1

## 関連項目

- [`coroutine.resume`](resume.md)
- [`coroutine.wrap`](wrap.md)