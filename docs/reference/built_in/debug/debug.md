# debug.debug

```lua
debug.debug ()
```

## 説明

ユーザーがLuaインタプリタで対話モードに入れるシンプルなデバッガを開始します。ユーザーはコマンドを入力し、グローバル変数やローカル変数を調査したり、その値を変更したりできます。`cont`コマンドを入力すると、デバッガが終了し、実行が再開されます。

## サンプルコード

```lua
print("Before debug")
debug.debug()  -- デバッガに入る
print("After debug")
```

この例では、`debug.debug` によって対話モードに入った後、再開して「After debug」が表示されます。

## LuaJIT独自の拡張

メタメソッドを識別する。

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`debug.traceback`](traceback.md)
- [`debug.getinfo`](getinfo.md)