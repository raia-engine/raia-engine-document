# package.seeall

モジュールがグローバルな変数にアクセスできるようにする

```lua
package.seeall (module)
```

## 説明

指定したモジュールのメタテーブルを設定し、その `__index` フィールドをグローバル環境（`_G`）に設定します。これにより、モジュール内で未定義の変数を参照した場合、グローバル環境から変数を検索できるようになります。

## 補足

- `package.seeall` は `module` 関数と組み合わせて使用され、モジュールがグローバル変数を参照できるようにします。
- グローバル変数の参照は推奨されない場合もあるため、使用には注意が必要です。

## サンプルコード

```lua
module("mymodule")
package.seeall(_M)
print(_G.print)  -- グローバルなprint関数が継承されます
```

この例では、`seeall`を使ってグローバル環境をモジュールに継承しています。

## 互換性

- Lua 5.1

## 関連項目

- [`module`](module.md)
- [`setmetatable`](../std/setmetatable.md)