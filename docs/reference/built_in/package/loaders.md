# package.loaders

モジュールのロード関数のリスト

```lua
package.loaders
```

## 説明

モジュールのローディング方法を制御するための関数のリストです。`require`はこのリストにある関数を順に試し、モジュールをロードします。

## サンプルコード

```lua
for i, loader in ipairs(package.loaders) do
    print(i, loader)
end
```

この例では、登録されているローダー関数を表示します。

## 互換性

- Lua 5.1

## 関連項目

- [`require`](require.md)
- [`package.preload`](preload.md)