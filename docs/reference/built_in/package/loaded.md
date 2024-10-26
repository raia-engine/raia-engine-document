# package.loaded

すでにロードされたモジュールを保持するテーブル

```lua
package.loaded
```

## 説明

どのモジュールが既にロードされているかを管理するためのテーブルです。モジュールがロード済みであれば、`require`はこのテーブルの値を返します。

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