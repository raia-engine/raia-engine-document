# setfenv

関数に新しい環境テーブルを設定する

```lua
setfenv (f, table)
```

## 説明

指定された関数に使用される環境を設定します。`f`はLua関数またはスタックレベルで関数を指定する数値であり、レベル1は`setfenv`を呼び出す関数です。`setfenv`は与えられた関数を返します。

特別なケースとして、`f`が0の場合、`setfenv`は実行中のスレッドの環境を変更します。この場合、`setfenv`は値を返しません。

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