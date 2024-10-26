# pairs

テーブル全体をトラバースするためのイテレータ関数

```lua
pairs (t)
```

## 説明

3つの値を返します：`next`関数、テーブル`t`、そして`nil`です。そのため、次の構成

```lua
for k,v in pairs(t) do body end
```

はテーブル`t`の全てのキーと値のペアをイテレートします。

テーブルのトラバース中にテーブルを修正する際の注意点については、`next`関数を参照してください。

## サンプルコード

```lua
local t = {a = 1, b = 2}
for k, v in pairs(t) do
    print(k, v)
end
```

この例では、テーブルのすべてのキーと値が表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`ipairs`](ipairs.md)
- [`next`](next.md)