# ffi.abi

```lua
ffi.abi(param)
```

## 説明

`ffi.abi` 関数は、指定された `param`（Lua文字列）が現在の実行環境のABI（アプリケーションバイナリインターフェース）に適用されるかどうかを判定し、適用される場合は `true` を、そうでない場合は `false` を返します。これにより、スクリプトが特定の環境条件に応じて適切な処理を行えるように設計できます。

| パラメータ | 説明 |
| --- | --- |
| 32bit | 32ビットアーキテクチャ |
| 64bit | 64ビットアーキテクチャ |
| le | リトルエンディアンアーキテクチャ |
| be | ビッグエンディアンアーキテクチャ |
| fpu | ハードウェアFPUを持つターゲット |
| softfp | softfp呼び出し規約 |
| hardfp | hardfp呼び出し規約 |
| eabi | 標準ABIのEABIバリアント |
| win | 標準ABIのWindowsバリアント |
| pauth | ポインタ認証ABI |
| uwp | ユニバーサルWindowsプラットフォーム |
| gc64 | 64ビットGC参照 |

## サンプルコード

```lua
local ffi = require("ffi")

if ffi.abi("64bit") then
    print("Running on a 64-bit architecture")
else
    print("Running on a 32-bit architecture")
end

if ffi.abi("le") then
    print("Little-endian architecture")
else
    print("Big-endian architecture")
end
```

このコードは、実行環境が64ビットか32ビットか、リトルエンディアンかビッグエンディアンかを判定し、適切なメッセージを表示します。

## 互換性

- LuaJIT

## 関連項目

- `ffi.arch`