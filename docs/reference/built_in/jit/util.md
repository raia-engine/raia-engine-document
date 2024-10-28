# jit.util.*

JITコンパイラの内部情報やデバッグツールにアクセスするための関数群

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

`jit.util.*` サブモジュールは、JITコンパイラの内部情報やデバッグ用の関数を提供します。これらの関数を使用することで、生成されたトレースやバイトコード、中間表現（IR）などを詳細に調査することができます。


## 補足

- `jit.util.*` の機能は開発中で、変更される可能性があります。
- これらの関数は高度なデバッグや最適化のために使用され、通常のスクリプトでは必要ありません。

## 互換性

- LuaJIT