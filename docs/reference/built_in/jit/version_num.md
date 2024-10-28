# jit.version_num

LuaJITのバージョン番号を整数で表したもの

```lua
jit.version_num
```

## 説明

`jit.version_num` は、LuaJIT のバージョン番号を整数で表したものを返します。例えば、バージョン "2.1.0" は `20100` という数値で表されます。これにより、スクリプト内でバージョン依存の処理を行う際に便利です。

## 補足

- バージョン番号は、メジャー、マイナー、パッチの各バージョンを組み合わせて整数に変換したものです。
- 現在のリリース方式では、パッチバージョンは「99」で固定されています。

## サンプルコード

```lua
local jit = require("jit")
print("LuaJIT Version Number:", jit.version_num)
```

## 互換性

- LuaJIT

---

