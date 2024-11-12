# buf:get

バッファからデータを取得して消費する

```lua
str, ... = buf:get([len|nil] [,...])
```

## 説明

バッファデータを消費して、1つまたは複数の文字列を返します。引数なしで呼び出すと、バッファ全体が消費されます。

## サンプルコード

```lua
buf:put("Hello, world!")
local str = buf:get(5)
print(str) -- "Hello"
print(buf:tostring()) -- ", world!"
```

バッファから指定した長さの文字列を取り出し、残りのデータも確認します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:skip`](buf_skip.md)
- [`buf:tostring`](buf_tostring.md)