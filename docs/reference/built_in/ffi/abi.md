# ffi.abi

実行環境に関するABI情報を取得する

```lua
ffi.abi(param)
```

## 説明

`ffi.abi` 関数は、指定した `param`（Luaの文字列）が現在の実行環境のABI（Application Binary Interface）に該当するかどうかを判定します。該当する場合は `true`、そうでない場合は `false` を返します。これを利用することで、スクリプトは特定の環境条件に応じた適切な処理を行えるようになります。

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