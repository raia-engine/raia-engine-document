# jit.opt.*

```lua
jit.opt.start(...)
```

## 説明

`jit.opt.*` サブモジュールは、JITコンパイラの最適化オプションを設定または取得します。コマンドラインの `-O` オプションに対応しており、プログラム中で特定の最適化を調整できます。

## サンプルコード

```lua
local jit = require("jit")
jit.opt.start(2)  -- -O2 と同じ
```

## 互換性

- LuaJIT