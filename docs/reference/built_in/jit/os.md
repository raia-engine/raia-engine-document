# jit.os

```lua
jit.os
```

## 説明

`jit.os` は、実行中のターゲットOS名を示す文字列を返します。利用可能なOS名は「Windows」「Linux」「OSX」「BSD」「POSIX」「Other」です。

## サンプルコード

```lua
local jit = require("jit")
print("Operating System:", jit.os)
```

## 互換性

- LuaJIT