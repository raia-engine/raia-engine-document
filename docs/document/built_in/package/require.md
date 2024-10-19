# require

モジュールをロードして返す

```lua
require (modname)
```

## 説明

指定されたモジュールをロードします。`package.loaded`にモジュールが既にロードされていればその値を返し、ロードされていない場合は、ローダーを使ってモジュールをロードします。ローダーが見つからない場合、エラーが発生します。

## サンプルコード

```lua
require("mymodule")
```

この例では、`mymodule`というモジュールをロードします。モジュールが`package.loaded`にあれば、その値を返します。

## 互換性

Lua 5.1

## 関連項目

- `module`
- `package.loaded`