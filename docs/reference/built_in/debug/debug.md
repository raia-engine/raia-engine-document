# debug.debug

簡易デバッガを開始する

```lua
debug.debug ()
```

## 説明

Luaインタプリタの対話モードに入るための簡易デバッガを起動します。これにより、ユーザーはコマンドを入力してグローバル変数やローカル変数を調べたり、その値を変更することができます。`cont`コマンドを入力すると、デバッガを終了して実行を再開します。

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