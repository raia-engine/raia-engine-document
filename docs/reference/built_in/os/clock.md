# os.clock

```lua
os.clock ()
```

## 説明

プログラムが使用したCPU時間を秒単位で返します。この関数は、プログラムの実行時間を計測する際に使用します。

## サンプルコード

```lua
local start = os.clock()
for i = 1, 1000000 do end  -- 時間のかかる処理
local elapsed = os.clock() - start
print("Elapsed time: " .. elapsed .. " seconds")
```

この例では、`os.clock` を使って処理にかかった時間を計測しています。

## 互換性

- Lua 5.1

## 関連項目

- [`os.time`](time.md)
- [`os.date`](date.md)