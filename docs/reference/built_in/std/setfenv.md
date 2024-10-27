# setfenv

関数に新しい環境テーブルを設定する

```lua
setfenv (f, table)
```

## 説明

関数 `f` が使用する環境テーブルを `table` に設定します。`f` は Lua 関数、またはスタックレベルを示す数値で、レベル 1 は `setfenv` を呼び出した関数です。`setfenv` は設定後の関数を返します。

特別な場合として、`f` に 0 を指定すると、実行中のスレッドの環境を変更します。この場合、`setfenv` は値を返しません。

## サンプルコード

```lua
local f = function() return a end
setfenv(f, {a = 10})
print(f())  -- 10
```

この例では、環境テーブルに基づいて変数`a`の値が返されます。

## 互換性

- Lua5.1

## 関連項目

- [`getfenv`](getfenv.md)