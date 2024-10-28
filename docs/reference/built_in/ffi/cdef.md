# ffi.cdef

C言語の宣言をLuaJITに定義する

```lua
ffi.cdef(def)
```

## 説明

`ffi.cdef` 関数は、LuaJITにC言語の型や関数の宣言を追加するために使用します。`def` はCの宣言を含むLua文字列で、構造体や外部C関数の宣言を記述します。複数のC宣言を記述する場合は、セミコロンで区切る必要がありますが、単一の宣言であれば省略可能です。

## 補足

- `ffi.cdef` で宣言された外部シンボル（関数や変数）は名前のみが定義され、メモリ上の実アドレスにはバインドされません。バインドは `ffi.C` などのCライブラリ名前空間で実行されます。
- `ffi.cdef` で追加された宣言には、Cのプリプロセッサは使用されません。例えば `#define` を使用した定義は、`enum` や `static const` などに置き換えて記述する必要があります。

## サンプルコード

```lua
local ffi = require("ffi")

ffi.cdef[[
typedef struct { int a, b; } mystruct;
int myfunc(mystruct* s);
]]
```

このコードは、Cの構造体と関数をLuaJITに追加しています。

## 互換性

- LuaJIT

## 関連項目

- ffi.new
- ffi.typeof
- ffi.load