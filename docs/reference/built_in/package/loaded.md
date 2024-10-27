# package.loaded

すでにロードされたモジュールを保持するテーブル

```lua
package.loaded
```

## 説明

ロード済みのモジュールを管理するテーブルです。モジュールが既にロードされている場合、`require` はこのテーブルからモジュールを取得して返します。これにより、同じモジュールを複数回ロードすることを防ぎます。

## サンプルコード

```lua
print(package.loaded["mymodule"])
```

この例では、`mymodule`が`package.loaded`に存在するかどうかを確認します。

## 互換性

- Lua 5.1

## 関連項目

- [`require`](require.md)
- [`module`](module.md)