# buffer.decode

シリアライズされた文字列をデシリアライズする

```lua
obj = buffer.decode(str)
obj = buf:decode()
```

## 説明

スタンドアロン関数は文字列`str`をデシリアライズし、バッファメソッドはバッファから1つのオブジェクトをデシリアライズします。

## サンプルコード

```lua
local obj = buffer.decode('{"name":"Alice","age":30}')
print(obj.name, obj.age)
```

エンコードされた文字列をデコードして、Luaテーブルとして使用します。

## 互換性

- LuaJIT

## 関連項目

- [`buffer.encode`](encode.md)
- [`buf:get`](buf_get.md)