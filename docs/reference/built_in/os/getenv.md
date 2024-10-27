# os.getenv

```lua
os.getenv (varname)
```

## 説明

指定された環境変数 `varname` の値を取得して返します。環境変数が存在しない場合は `nil` を返します。

## サンプルコード

```lua
local path = os.getenv("PATH")
print("PATH: " .. path)
```

この例では、`os.getenv` を使って環境変数 `PATH` の値を取得しています。

## 互換性

- Lua 5.1