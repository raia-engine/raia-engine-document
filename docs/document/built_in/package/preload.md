# package.preload

モジュールを手動で登録するためのテーブル

```lua
package.preload
```

## 説明

特定のモジュールのローダーを格納するテーブルです。`require`はこのテーブルを最初に調べ、モジュールのローダーを探します。

## サンプルコード

```lua
package.preload["mymodule"] = function() print("Loading mymodule") end
require("mymodule")
```

この例では、`mymodule`のローダーを手動で設定し、`require`でロードしています。

## 互換性

- Lua 5.1

## 関連項目

- [`require`](require.md)
- [`package.loaders`](loaders.md)