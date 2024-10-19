# package.seeall

モジュールがグローバルな変数にアクセスできるようにする

```lua
package.seeall (module)
```

## 説明

指定したモジュールのメタテーブルを設定し、その`__index`フィールドをグローバル環境に設定します。これにより、モジュールはグローバル環境から変数を継承できるようになります。

## サンプルコード

```lua
module("mymodule")
package.seeall(_M)
print(_G.print)  -- グローバルなprint関数が継承されます
```

この例では、`seeall`を使ってグローバル環境をモジュールに継承しています。

## 互換性

Lua 5.1

## 関連項目

- `module`
- `setmetatable`