# xpcall

保護されたモードで関数を呼び出す（エラーハンドラを指定する）

```lua
xpcall(f, err [,args...])
```

## 説明

この関数は`pcall`に似ていますが、新しいエラーハンドラを設定できます。

`xpcall`は`err`をエラーハンドラとして使用し、保護モードで関数`f`を呼び出します。`f`内の任意のエラーは伝播されません。代わりに、`xpcall`はエラーをキャッチし、元のエラーオブジェクトで`err`関数を呼び出し、ステータスコードを返します。最初の結果はステータスコード（真偽値）であり、エラーなしで呼び出しが成功した場合はtrueです。この場合、`xpcall`はこの最初の結果の後に、呼び出しからのすべての結果も返します。エラーが発生した場合、`xpcall`は`false`と`err`からの結果を返します。

## サンプルコード

```lua
local status, err = xpcall(function() error("error") end, function(e) return "Handled: " .. e end)
print(status, err)
```

この例では、エラーが発生してもエラーハンドラによって処理されます。

## LuaJIT独自の拡張

LuaJITでは可変長引数(`args...`)を渡すことができます。それらの引数はエラーハンドラ関数に渡されます。

## 拡張版のサンプルコード

```lua
-- エラーハンドラ関数
local function errorHandler(err, info)
    return string.format("Error: %s (Additional info: %s)", err, info)
end

-- 関数本体
local function faultyFunction()
    error("Something went wrong!")
end

-- xpcallを使用して、エラーハンドラに追加の引数を渡す
local status, result = xpcall(faultyFunction, errorHandler, "Extra info for the error handler")

print(result)  -- "Error: Something went wrong! (Additional info: Extra info for the error handler)"
```

`faultyFunction`内でエラーが発生したときに、エラーハンドラ`errorHandler`が呼び出されます。`xpcall`の第3引数として渡された文字列`"Extra info for the error handler"`が、エラーハンドラの第2引数`info`として渡されます。これにより、エラーハンドラはエラーメッセージと追加情報の両方を処理し、より詳細なエラーメッセージを生成できます。


## 互換性

- Lua5.1
- LuaJIT独自の拡張あり

## 関連項目

- [`pcall`](pcall.md)