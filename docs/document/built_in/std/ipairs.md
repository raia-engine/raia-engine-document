# ipairs

配列テーブルを順番にイテレートするためのイテレータ関数

```lua
ipairs (t)
```

## 説明

イテレータ関数、テーブル`t`、0の3つの値を返し、次の構成

```lua
for i,v in ipairs(t) do body end
```

はテーブルのペア（1,t[1]）、（2,t[2]）、···を、テーブルから欠落している最初の整数キーまで繰り返します。

## サンプルコード

```lua
local t = {1, 2, 3}
for i, v in ipairs(t) do
    print(i, v)
end
```

この例では、配列の各要素が順に表示されます。

## 互換性

- Lua5.1

## 関連項目

- [`pairs`](pairs.md)
- [`next`](next.md)