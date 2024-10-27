# ffi.C

```lua
ffi.C
```

## 説明

`ffi.C` は、LuaJITにおけるデフォルトのCライブラリ名前空間であり、標準のCライブラリやシステムのデフォルトシンボルにアクセスするために使用します。これを通じて、LuaからCの関数やグローバル変数を呼び出すことができます。さらに、`ffi.cdef` で宣言された外部関数もこの名前空間を通じて利用できます。

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