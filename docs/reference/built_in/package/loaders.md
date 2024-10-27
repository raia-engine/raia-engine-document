# package.loaders

モジュールのロード関数のリスト

```lua
package.loaders
```

## 説明

モジュールをロードするためのローダー関数のリストです。`require` はこのリストに登録された関数を順番に試し、指定されたモジュールをロードします。

## 補足

- LuaJIT は Lua 5.1 と互換性があり、このフィールドは `package.loaders` ですが、Lua 5.2 以降では `package.searchers` に名称が変更されています。

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