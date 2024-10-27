# 状態

LuaJITは積極的に開発および保守されています。開発の進捗はgitリポジトリ、LuaJITメーリングリスト、およびイシュートラッカーでフォローできます。

## バージョンとブランチ

|ブランチ|保守状況|互換性のない変更|新機能|推奨用途|
|---|---|---|---|---|
|v2.0|バグ修正のみ|なし|なし|互換性維持のみ|
|v2.1|はい|なし|限定|本番環境|
|(未定)|はい|はい|はい|開発|

各バージョン付きブランチはLuaJITの $major.$minor バージョンに対応しています。

古いgitマスターブランチは段階的に廃止され、v2.0ブランチに固定されています。代わりにバージョン付きブランチをフォローしてください。

### 機能とメンテナンスポリシー

- 古いバージョンは修正とバックポートを受けますが、新機能はありません。
- 新しいバージョンのみが新機能を受け取ります。
- 本番用ブランチは非破壊的変更と限定的な上位互換機能のみを受け取ります。
- 開発用ブランチは互換性のない変更を含むことがあります。あらゆるコミットがAPI、ABI、バイトコードの互換性を破る可能性があります。
- TBA (未定) = 新しい開発ブランチがオープンするときにここで発表されます。

## リリースポリシー

LuaJITはローリングリリースを使用します。公式の起点はこのサイトのgitリポジトリです。最新の修正と開発を取得するために、選択されたgitブランチから定期的にプルする必要があります。リリースのtarballやバイナリは提供されません。

リリースごとの手動での増分ではなく、ビルドプロセスは最新のコミットのPOSIXタイムスタンプをセマンティックバージョンのリリース番号として使用します。$major.$minor.$timestamp 形式の完全なバージョン番号は以下のコマンドで表示できます:

```sh
luajit -v
```

バージョン番号のみを持っていて関連するコミットを知りたい場合は、このコマンドにバージョン番号の部分を入力してください:

```sh
git show "v$major.$minor@{$timestamp}"
```

## オペレーティングシステム

### サーバー、デスクトップ、組み込み

|OS|最小バージョン|要件|LuaJITバージョン|
|---|---|---|---|
|Linux| | |v2.0 –|
|*BSD| | |v2.0 –|
|macOS (OSX)|10.4| |v2.1 –|
|POSIX| |mmap, dlopen|v2.0 –|
|Windows|7|x86またはx64、ARM64: 未定|v2.0 –|

### モバイル

|OS|最小バージョン|要件|LuaJITバージョン|
|---|---|---|---|
|Android|4.0|最新のAndroid NDK|v2.0 –|
|iOS|3.0|Xcode iOS SDK|v2.1 –|

### コンソール

|OS|最小バージョン|要件|LuaJITバージョン|
|---|---|---|---|
|PS3| |PS3 SDK|v2.0 – v2.1 EOL|
|PS4| |PS4 SDK (ORBIS)|v2.0 –|
|PS5| |PS5 SDK (PROSPERO)|v2.1 –|
|PS Vita| |PS Vita SDK (PSP2)|v2.0 – v2.1 EOL|
|Xbox 360| |Xbox 360 SDK (XEDK)|v2.0 – v2.1 EOL|
|Xbox One| |Xbox One SDK (DURANGO)|v2.1 –|
|Nintendo Switch| |NintendoSDK + NX Addon|v2.1 –|

コードベースには、公式サポートはありませんが、いくつかのシステムに対応する定義が含まれています。

## CPUアーキテクチャ

|CPU|ビット|エンディアン|FP|要件|LuaJITバージョン|
|---|---|---|---|---|---|
|x86|32|リトル|FPU|v2.1+: SSE2|v2.0 –|
|x64|64|リトル|FPU| |v2.0 –|
|ARM|32|リトル|FPU + ソフト|ARMv5+, ARM9E+|v2.0 –|
|ARM64|64|リトル + ビッグ|FPU| |v2.1 –|
|PPC32|32|ビッグ|FPU + ソフト| |v2.0 – v2.1 EOL|
|PPC/e500 v2|32|ビッグ|FPU| |v2.0 EOL|
|MIPS32 r1-r5|32|ビッグ + リトル|FPU + ソフト| |v2.0 –|
|MIPS64 r1-r5|64|ビッグ + リトル|FPU + ソフト| |v2.1 –|
|MIPS64 r6|64|ビッグ + リトル|FPU + ソフト| |v2.1 EOL|
|RISC-V|64|リトル|ハード|RVA22+|(TBA)|

歴史的アーキテクチャを追加する予定はなく、新しいCPUが一般的に入手できなくなった終了したアーキテクチャのサポートを続ける予定もありません。同様に、マイナーで事実上死んでいるアーキテクチャのサポート予定もありません。