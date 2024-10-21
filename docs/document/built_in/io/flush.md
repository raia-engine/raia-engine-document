# io.flush

```lua
io.flush ()
```

## 説明

デフォルトの出力ファイルに対して `file:flush` と同等の操作を行い、書き込みバッファをフラッシュします。

## サンプルコード

```lua
io.write("This will be flushed.")
io.flush()  -- バッファをフラッシュする
```

この例では、書き込みバッファをフラッシュしています。

## 互換性

- Lua 5.1

## 関連項目

- [`file:flush`](file_flush.md)