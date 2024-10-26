# jit.util.*

```lua
jit.util.funcinfo(func [,pc])
jit.util.funcbc(func, pc)
jit.util.funck(func, idx)
jit.util.funcuvname(func, idx)
jit.util.traceinfo(tr)
jit.util.traceir(tr, idx)
jit.util.tracek(tr, idx)
jit.util.tracesnap(tr, sn)
jit.util.tracemc(tr)
jit.util.traceexitstub([tr,] exitno)
jit.util.ircalladdr(idx)
```

## 説明

`jit.util.*` サブモジュールは、JITコンパイラの内部情報やデバッグ用の関数を提供します。生成されたトレースやバイトコード、IRなどを内省するのに役立ちます。

## 補足

- `jit.util.*` の機能は開発中で、変更される可能性があります。デバッグモジュール（例: `-jbc`, `-jv`, `-jdump`）で広く使用されています。

## 互換性

- LuaJIT