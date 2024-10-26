# rawequal

2つの値が等しいかをチェックする（メタメソッドは呼び出されない）

```lua
rawequal (v1, v2)
```

## 説明

`v1`が`v2`と等しいかどうかをチェックし、メタメソッドを呼び出さずに真偽値を返します。

## サンプルコード

```lua
print(rawequal(1, 1))  -- true
```

この例では、`true`が表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`rawget`](rawget.md)
- [`rawset`](rawset.md)