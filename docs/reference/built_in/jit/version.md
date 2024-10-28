# jit.version

LuaJITのバージョンを示す文字列

```lua
jit.version
```

## 説明

`jit.version` は、LuaJIT のバージョンを示す文字列を返します。例えば、`"LuaJIT 2.1.1725453128"` のような形式です。LuaJIT のリリースごとにこの値は更新されます。

## 補足

- この文字列にはバージョンだけでなく、ビルドオプションやプラットフォームに関する情報が含まれる場合があります。
- スクリプト内でバージョン情報を表示したり、特定のバージョンに依存した処理を行う際に使用できます。

## サンプルコード

```lua
local jit = require("jit")
print("LuaJIT Version:", jit.version)
```

## 互換性

- LuaJIT