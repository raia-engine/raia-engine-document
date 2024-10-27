# os.difftime

```lua
os.difftime (t2, t1)
```

## 説明

時刻 `t1` から時刻 `t2` までの経過時間を秒単位で返します。通常、`os.time` で取得したタイムスタンプを使用して、2つの時刻の差を計算します。

## サンプルコード

```lua
local t1 = os.time()
-- 2秒待つ
os.execute("sleep 2")
local t2 = os.time()
print(os.difftime(t2, t1) .. " seconds have passed.")
```

この例では、`os.difftime` を使って、2つの時刻の差を計測しています。

## 互換性

- Lua 5.1

## 関連項目

- [`os.time`](time.md)
- [`os.date`](date.md)