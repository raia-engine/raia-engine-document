# ffi.alignof

```lua
ffi.alignof(ct)
```

## 説明

`ffi.alignof` 関数は、指定された型 `ct` がメモリ上で配置される際に必要な最小アラインメントをバイト単位で返します。アラインメントは、データが効率的にアクセスされるためのメモリ上の適切な境界を示します。

## サンプルコード

```lua
local ffi = require("ffi")

print(ffi.alignof("int"))       -- 4 (通常のシステム上)
print(ffi.alignof("double"))    -- 8
```

このコードは、`int` 型と `double` 型のアラインメントをバイト単位で出力します。

## 互換性

- LuaJIT

## 関連項目

- ffi.sizeof
- ffi.offsetof