# xpcall

保護されたモードで関数を呼び出す（エラーハンドラを指定する）

```lua
xpcall(f, err [,args...])
```

## 説明

`pcall` と似ていますが、エラーハンドラ `err` を指定できる点が異なります。

`xpcall` は関数 `f` を指定した引数 `args...` とともに保護モードで呼び出し、エラーが発生した場合はエラーハンドラ `err` を用いてエラー処理を行います。`f` 内でエラーが発生すると、エラーは伝播せず、`err` 関数が元のエラーオブジェクトを引数として呼び出されます。

`xpcall` の戻り値は、最初にステータスコード（ブール値）を返し、呼び出しが成功した場合は `true`、失敗した場合は `false` です。成功した場合は、その後に関数 `f` の戻り値を返します。エラーが発生した場合は、`false` と `err` 関数の戻り値を返します。

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