# ffi.alignof

型のアラインメントを返す

```lua
ffi.alignof(ct)
```

## 説明

`ffi.alignof` 関数は、指定した型 `ct` のメモリ配置に必要な最小アラインメント（バイト単位）を返します。アラインメントとは、データが効率的にアクセスされるためにメモリ上で配置される適切な境界を指します。

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