# os.exit

```lua
os.exit ([code [, close]])
```

## 説明

プログラムを終了します。`code`が`true`の場合、ステータスは`EXIT_SUCCESS`、`false`の場合は`EXIT_FAILURE`を返します。数値を指定すると、その数値が終了コードになります。オプションでLuaの状態を閉じることができます。

## サンプルコード

```lua
os.exit(true)  -- 成功コードで終了
```

この例では、プログラムを成功コードで終了させています。

## 互換性

- Lua 5.2