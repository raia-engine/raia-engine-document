# buffer.encode

Luaオブジェクトをシリアライズする

```lua
str = buffer.encode(obj)
buf = buf:encode(obj)
```

## 説明

Luaオブジェクト`obj`をシリアライズ（エンコード）します。スタンドアロン関数は文字列を返し、バッファメソッドはエンコーディングをバッファに追加します。

## サンプルコード

```lua
local obj = {name = "Alice", age = 30}
local str = buffer.encode(obj)
print(str)
```

Luaテーブルをエンコードし、文字列形式で出力します。

## 互換性

- LuaJIT

## 関連項目

- [`buffer.decode`](decode.md)
- [`buf:put`](buf_put.md)