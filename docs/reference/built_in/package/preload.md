# package.preload

モジュールを手動で登録するためのテーブル

```lua
package.preload
```

## 説明

特定のモジュールのローダー関数を格納するテーブルです。`require` はモジュールをロードする際、まずこのテーブルを参照して、モジュール名に対応するローダー関数が登録されているかを確認します。これにより、Lua スクリプトや C ライブラリ以外の方法でモジュールを提供することが可能になります。

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