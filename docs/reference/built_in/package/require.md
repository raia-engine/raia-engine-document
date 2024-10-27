# require

モジュールをロードして返す

```lua
require (modname)
```

## 説明

指定されたモジュール `modname` をロードし、そのモジュールの戻り値を返します。モジュールが既に `package.loaded` にロードされている場合、その値を返します。ロードされていない場合は、ローダー関数を使用してモジュールをロードします。モジュールが見つからない場合、エラーが発生します。

## 補足

- `require` はモジュールの再ロードを防ぎ、効率的なモジュール管理を行います。
- モジュールの検索には、`package.path` と `package.cpath` が使用されます。

## サンプルコード

```lua
require("mymodule")
```

この例では、`mymodule`というモジュールをロードします。モジュールが`package.loaded`にあれば、その値を返します。

## 互換性

- Lua 5.1

## 関連項目

- [`module`](module.md)
- [`package.loaded`](loaded.md)