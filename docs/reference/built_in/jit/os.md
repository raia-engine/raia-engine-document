# jit.os

```lua
jit.os
```

## 説明

`jit.os` は、現在実行中のターゲットオペレーティングシステム名を示す文字列を返します。返されるOS名には、`"Windows"`、`"Linux"`、`"OSX"`、`"BSD"`、`"POSIX"`、`"Other"` などがあります。これにより、スクリプトが動作しているOSを判別することができます。

## サンプルコード

```lua
local jit = require("jit")
print("Operating System:", jit.os)
```

## 互換性

- LuaJIT