# buffer.new

新しいバッファオブジェクトを作成する

```lua
local buf = buffer.new([size [,options]])
local buf = buffer.new([options])
```

## 説明

新しいバッファオブジェクトを作成します。オプションの`size`引数は、最小の初期バッファサイズを保証します。これは、必要なバッファサイズが事前に分かっている場合の最適化に過ぎません。いずれにせよ、バッファスペースは必要に応じて拡大します。オプションの`options`は、さまざまなシリアライゼーションオプションを設定します。

## サンプルコード

```lua
local buf = buffer.new(1024)
print("バッファが作成されました")
```

バッファサイズを1024バイトで新たに作成し、作成メッセージを表示します。

## 互換性

- LuaJIT

## 関連項目

- [`buf:reset`](buf_reset.md)
- [`buf:free`](buf_free.md)