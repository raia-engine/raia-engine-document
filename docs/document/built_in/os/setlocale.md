# os.setlocale

```lua
os.setlocale (locale [, category])
```

## 説明

プログラムのロケールを設定します。`category`には`"all"`, `"collate"`, `"ctype"`, `"monetary"`, `"numeric"`, `"time"`を指定できます。成功した場合、新しいロケールの名前を返し、失敗した場合は`nil`を返します。

## サンプルコード

```lua
os.setlocale("en_US.UTF-8", "all")
print(os.date("%x"))  -- ロケールに従った日付フォーマット
```

この例では、ロケールを設定して、そのロケールに基づいた日付を表示しています。

## 互換性

- Lua 5.1