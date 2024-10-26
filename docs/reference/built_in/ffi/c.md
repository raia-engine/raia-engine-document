# ffi.C

```lua
ffi.C
```

## 説明

`ffi.C` はLuaJITにおけるデフォルトのCライブラリ名前空間で、標準Cライブラリやシステムのデフォルトシンボルにアクセスするために使用します。これにより、Cの関数やグローバル変数をLuaから呼び出すことが可能です。`ffi.cdef` で宣言された外部関数も、この名前空間を通じて利用できます。

## 補足

- `ffi.C` はターゲットシステム上のデフォルトシンボルにバインドされます。
  - **POSIXシステム**では、`ffi.C` は libc、libm、libdl（Linuxの場合）などを含むグローバル名前空間に対応します。
  - **Windowsシステム**では、`ffi.C` は *.exe、lua51.dll、msvcrt*.dll など、標準CランタイムやOSライブラリ（kernel32.dll、user32.dll、gdi32.dll）にバインドされます。

## サンプルコード

```lua
local ffi = require("ffi")

ffi.cdef[[
int printf(const char* fmt, ...);
]]

ffi.C.printf("Hello from C!\n")
```

このコードは、Cの `printf` 関数をLuaから呼び出して文字列を表示します。

## 互換性

- LuaJIT

## 関連項目

- ffi.load
- ffi.cdef