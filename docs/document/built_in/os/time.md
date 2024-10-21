# os.time

```lua
os.time ([table])
```

## 説明

引数なしで呼び出すと、現在の時刻をタイムスタンプとして返します。引数としてテーブルを指定すると、指定された日時をタイムスタンプとして返します。

## サンプルコード

```lua
local now = os.time()
print("Current timestamp: " .. now)
```

この例では、現在のタイムスタンプを取得して表示しています。

## 互換性

- Lua 5.1

## 関連項目

- [`os.date`](date.md)
- [`os.difftime`](difftime.md)