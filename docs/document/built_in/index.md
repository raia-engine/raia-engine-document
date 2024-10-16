# ビルトイン関数

RaiaEngineはLuaJITをスクリプト言語として採用しています。LuaJITはLua5.1と互換性があり、必要に応じてLua5.2、5.3から機能を追加しています。また、FFIやJIT関係の機能など、LuaJIT独自の機能を追加しています。

## 目次

[[TOC]]

## Luaと互換性のある関数・変数(Lua5.1〜5.3)

### グローバル変数

|名前|説明|互換性|
|---|---|---|
|`_G`|グローバル環境|Lua5.1|
|`_VERSION`|現在のインタプリタのバージョン|Lua5.1|

### 基本関数

|名前|説明|互換性|
|---|---|---|
|[`assert`](std/assert.md)|条件が偽の場合、エラーを発生させる|Lua5.1|
|`collectgarbage`|ガベージコレクタを制御する|Lua5.1|
|`dofile`|指定されたファイルをLuaスクリプトとして実行する|Lua5.1|
|`error`|実行中の関数を停止し、エラーメッセージを返す|Lua5.1|
|`getfenv`|関数やスレッドの環境テーブルを取得する|Lua5.1|
|`getmetatable`|オブジェクトのメタテーブルを返す|Lua5.1|
|`ipairs`|配列テーブルを順番にイテレートするためのイテレータ関数|Lua5.1|
|`load`|文字列や関数からLuaコードを読み込み、チャンクを返す|*Lua5.2*|
|`loadfile`|ファイルからLuaコードを読み込み、チャンクを返す|*Lua5.2*|
|`loadstring`|文字列からLuaコードを読み込み、チャンクを返す|Lua5.1|
|`next`|テーブルの次のキーと値を返し、テーブルをトラバース可能にする|Lua5.1|
|`pairs`|テーブル全体をトラバースするためのイテレータ関数|Lua5.1|
|`pcall`|保護されたモードで関数を呼び出す（エラーが発生しても処理を継続させる）|Lua5.1|
|`print`|標準出力に指定された値を出力する|Lua5.1|
|`rawequal`|2つの値が等しいかをチェックする（メタメソッドは呼び出されない）|Lua5.1|
|`rawget`|テーブルから直接値を取得する（メタメソッドは呼び出されない）|Lua5.1|
|`rawset`|テーブルに直接値を設定する（メタメソッドは呼び出されない）|Lua5.1|
|`select`|可変長引数の中から特定の引数を返す|Lua5.1|
|`setfenv`|可変長引数の中から特定の引数を返す|Lua5.1|
|`setmetatable`|オブジェクトにメタテーブルを設定する|Lua5.1|
|`tonumber`|指定された値を数値に変換する|Lua5.1|
|`tostring`|指定された値を文字列に変換する|Lua5.1|
|`type`|引数のデータ型を文字列で返す|Lua5.1|
|`unpack`|テーブルの要素を複数の引数として展開する|Lua5.1|
|`xpcall`|保護されたモードで関数を呼び出す（エラーハンドラを指定できる）|Lua5.1|

### コルーチン操作 (`coroutine.*`)

|名前|説明|互換性|
|---|---|---|
|`coroutine.create`|新しいコルーチンを作成する|Lua5.1|
|`coroutine.resume`|コルーチンを再開する|Lua5.1|
|`coroutine.running`|実行中のコルーチンを返す|Lua5.1|
|`coroutine.status`|コルーチンの状態を返す|Lua5.1|
|`coroutine.wrap`|コルーチンを関数としてラップする|Lua5.1|
|`coroutine.yield`|コルーチンを一時停止し、再開できるようにする|Lua5.1|
|`coroutine.isyieldable`|現在の関数が中断可能かどうかを判定する|*Lua5.3*|

### モジュール (`package.*`)

|名前|説明|互換性|
|---|---|---|
|`module`|モジュールを定義する（非推奨）。|Lua5.1|
|`require`|モジュールをロードして返す|Lua5.1|
|`package.cpath`|Cライブラリの検索パスを定義する|Lua5.1|
|`package.loaded`|すでにロードされたモジュールを保持するテーブル|Lua5.1|
|`package.loaders`|モジュールのロード関数のリスト（非推奨、Lua5.2以降では`searchers`）|Lua5.1|
|`package.loadlib`|Cライブラリをロードする|Lua5.1,*Lua5.2*|
|`package.path`|Luaスクリプトの検索パスを定義する|Lua5.1|
|`package.preload`|モジュールを手動で登録するためのテーブル|Lua5.1|
|`package.seeall`|モジュールがグローバルな変数にアクセスできるようにする（非推奨）|Lua5.1|
|`package.searchpath`|指定されたモジュール名をパスで検索する。|*Lua5.2*|

### 文字列操作 (`string.*`)

|名前|説明|互換性|
|---|---|---|
|`string.byte`|指定された位置の文字のバイト値を返す|Lua5.1|
|`string.char`|バイト値の列を文字列に変換する|Lua5.1|
|`string.dump`|関数のバイトコードを返す|Lua5.1|
|`string.find`|文字列内でパターン検索を行う|Lua5.1|
|`string.format`|フォーマットに従って文字列を生成する|Lua5.1|
|`string.gmatch`|パターンに一致する部分を順次返すイテレータを生成する|Lua5.1|
|`string.gsub`|文字列内でパターンに一致する部分を置換する|Lua5.1|
|`string.len`|文字列の長さを返す|Lua5.1|
|`string.lower`|文字列をすべて小文字に変換する|Lua5.1|
|`string.match`|文字列内でパターンに一致する部分を返す|Lua5.1|
|`string.rep`|文字列を指定回数繰り返し、任意で区切り文字を追加する|*Lua5.2*|
|`string.reverse`|文字列を逆順にする|Lua5.1|
|`string.sub`|文字列の部分文字列を返す|Lua5.1|
|`string.upper`|文字列をすべて大文字に変換する|Lua5.1|

### テーブル操作 (`table.*`)

|名前|説明|互換性|
|---|---|---|
|`table.concat`|テーブルの要素を連結し、文字列を返す|Lua5.1|
|`table.insert`|テーブルに要素を挿入する|Lua5.1|
|`table.maxn`|テーブル内の数値キーの最大値を返す（非推奨）。|Lua5.1|
|`table.remove`|テーブルから要素を削除する|Lua5.1|
|`table.sort`|テーブルの要素をソートする|Lua5.1|
|`table.new`|指定されたサイズで新しいテーブルを作成する|*LuaJIT*|
|`table.clear`|テーブル内のすべての要素を削除する|*Lua5.2*|
|`table.move`|テーブルの一部の要素を他の位置に移動する|*Lua5.3*|

### 数学関数 (`math.*`)

|名前|説明|互換性|
|---|---|---|
|`math.abs`|絶対値を返す|Lua5.1|
|`math.acos`|逆余弦を返す|Lua5.1|
|`math.asin`|逆正弦を返す|Lua5.1|
|`math.atan`|逆正接を返す|Lua5.1|
|`math.atan2`|2つの引数の逆正接を返す|Lua5.1|
|`math.ceil`|指定された数値以上の最小の整数を返す|Lua5.1|
|`math.cos`|余弦を返す|Lua5.1|
|`math.cosh`|双曲線余弦を返す|Lua5.1|
|`math.deg`|ラジアンを度に変換する|Lua5.1|
|`math.exp`|指定された数のe乗を返す|Lua5.1|
|`math.floor`|指定された数値以下の最大の整数を返す|Lua5.1|
|`math.fmod`|商の小数部を返す（余りを返す）|Lua5.1|
|`math.frexp`|浮動小数点数を仮数部と指数部に分解する|Lua5.1|
|`math.huge`|無限大を表す定数|Lua5.1|
|`math.ldexp`|仮数部と指数部から浮動小数点数を構成する|Lua5.1|
|`math.log`|自然対数を返す|*Lua5.2*|
|`math.log10`|底10の対数を返す|Lua5.1|
|`math.max`|引数の中で最大の数を返す|Lua5.1|
|`math.min`|引数の中で最小の数を返す|Lua5.1|
|`math.modf`|整数部分と小数部分を分けて返す|Lua5.1|
|`math.pi`|π（円周率）を表す定数。|Lua5.1|
|`math.pow`|べき乗を計算する（`^`演算子と同じ）|Lua5.1|
|`math.rad`|度をラジアンに変換する|Lua5.1|
|`math.random`|ランダムな数値を返す|Lua5.1|
|`math.randomseed`|乱数生成器の種を設定する|Lua5.1|
|`math.sin`|正弦を返す|Lua5.1|
|`math.sinh`|双曲線正弦を返す|Lua5.1|
|`math.sqrt`|平方根を返す|Lua5.1|
|`math.tan`|正接を返す|Lua5.1|
|`math.tanh`|双曲線正接を返す|Lua5.1|

### 入出力機能 (`io.*` | `file:*`)

|名前|説明|互換性|
|---|---|---|
|`io.close`|現在の出力ファイルを閉じる|Lua5.1|
|`io.flush`|書き込みバッファをフラッシュする|Lua5.1|
|`io.input`|入力ファイルを設定または返す|Lua5.1|
|`io.lines`|ファイルの各行を返すイテレータを作成する|Lua5.1|
|`io.open`|ファイルを指定モードで開く|Lua5.1|
|`io.output`|出力ファイルを設定または返す|Lua5.1|
|`io.popen`|サブプロセスを開き、その標準入出力にアクセスする|Lua5.1|
|`io.read`|入力から指定された形式でデータを読み取る|*Lua5.2*|
|`io.tmpfile`|一時ファイルを作成し開く|Lua5.1|
|`io.type`|引数がファイルハンドルかどうかを判定する|Lua5.1|
|`io.write`|出力にデータを書き込む|Lua5.1|
|`file:close`|ファイルを閉じる|Lua5.1|
|`file:flush`|書き込みバッファをフラッシュする|Lua5.1|
|`file:lines`|ファイルの各行を返すイテレータを作成する|Lua5.1|
|`file:read`|ファイルから指定された形式でデータを読み取る|Lua5.1|
|`file:seek`|ファイルの読み書き位置を設定または取得する|Lua5.1|
|`file:setvbuf`|バッファリングモードを設定する|Lua5.1|
|`file:write`|ファイルにデータを書き込む|Lua5.1|

### オペレーティングシステムの機能 (`os.*`)

|名前|説明|互換性|
|---|---|---|
|`os.clock`|プログラムの実行時間を返す|Lua5.1|
|`os.date`|現在の日時をフォーマットして返す|Lua5.1|
|`os.difftime`|2つの時刻の差を秒で返す|Lua5.1|
|`os.execute`|システムコマンドを実行する|Lua5.1|
|`os.exit`|プログラムを終了する|*Lua5.2*|
|`os.getenv`|環境変数の値を取得する|Lua5.1|
|`os.remove`|ファイルを削除する|Lua5.1|
|`os.rename`|ファイルの名前を変更する|Lua5.1|
|`os.setlocale`|ロケール情報を設定する|Lua5.1|
|`os.time`|現在の時刻をタイムスタンプとして返す|Lua5.1|
|`os.tmpname`|一時ファイル名を返す|Lua5.1|

### デバッグ機能

|名前|説明|互換性|
|---|---|---|
|`debug.debug`|インタラクティブなデバッガを開始する|Lua5.1|
|`debug.getfenv`|指定した関数やスレッドの環境テーブルを取得する|Lua5.1|
|`debug.gethook`|現在設定されているフック関数を返す|Lua5.1|
|`debug.getinfo`|関数やスレッドに関する情報を返す|Lua5.1|
|`debug.getlocal`|指定されたレベルの関数のローカル変数を取得する|Lua5.1|
|`debug.getmetatable`|オブジェクトのメタテーブルを取得する|Lua5.1|
|`debug.getregistry`|Luaのレジストリテーブルを取得する|Lua5.1|
|`debug.getupvalue`|指定した関数のアップバリューを取得する|Lua5.1|
|`debug.setfenv`|関数やスレッドに環境テーブルを設定する|Lua5.1|
|`debug.sethook`|指定したフック関数を設定する|Lua5.1|
|`debug.setlocal`|指定した関数のローカル変数の値を設定する|Lua5.1|
|`debug.setmetatable`|オブジェクトにメタテーブルを設定する|Lua5.1|
|`debug.setupvalue`|指定した関数のアップバリューに値を設定する|Lua5.1|
|`debug.traceback`|スタックトレースを返す|Lua5.1|
|`debug.upvalueid`|指定した関数のアップバリューに固有のIDを返す|*Lua5.2*|
|`debug.upvaluejoin`|2つの関数のアップバリューを結合する|*Lua5.2*|

## LuaJITの関数・変数(LuaJIT2.1)

### 変更された標準ライブラリ

- `xpcall(f, err [,args...])` は引数を渡します
- `load*()` はUTF-8ソースコードを処理します
- `load*()` にモードパラメータを追加します
- `tostring()`などはNaNと±Infを正規化します
- `tonumber()`などは組み込みの文字列から数値への変換を使用します
- `string.dump(f [,mode])` は移植可能なバイトコードを生成します
- `math.random()` のための強化されたPRNG
- `io.*` 関数は64ビットファイルオフセットを扱う
- `debug.*` 関数はメタメソッドを識別する

#### Lua5.2から

- `string.format()`：`%q`が逆変換可能。`%s`は`__tostring`をチェック。`%a`と`%A`が追加された。
- 文字列マッチングパターン`%g`が追加された。
- `loadstring()`は`load()`のエイリアス。
- `io.lines()`と`file:lines()`は`io.read()`のオプションを処理する。
- `debug.getinfo()`はオプション"u"に対して`nparams`と`isvararg`を返す。
- `debug.getlocal()`はレベルではなく関数を受け入れる。
- `debug.getlocal()`と`debug.setlocal()`は可変引数に対して負のインデックスを受け入れる。
- `debug.getupvalue()`と`debug.setupvalue()`はC関数を扱う。

#### Lua5.3から

- `assert()`は任意のタイプのエラーオブジェクトを受け入れます。
- `io.read()`および`file:read()`は、先頭に*があるかないかにかかわらずフォーマットを受け入れます。


### ビット単位の操作 (`bit.*`)

|名前|説明|互換性|
|---|---|---|
|`bit.tobit`|数値を32ビット整数に変換する|LuaJIT|
|`bit.tohex`|数値を16進数の文字列に変換する|LuaJIT|
|`bit.bnot`|数値のビット単位のNOT演算を行う|LuaJIT|
|`bit.band`|数値同士のビット単位のAND演算を行う|LuaJIT|
|`bit.bor`|数値同士のビット単位のOR演算を行う|LuaJIT|
|`bit.bxor`|数値同士のビット単位のXOR演算を行う|LuaJIT|
|`bit.lshift`|数値を左にビットシフトする|LuaJIT|
|`bit.rshift`|数値を右にビットシフトする（符号なし）|LuaJIT|
|`bit.arshift`|数値を右にビットシフトする（符号あり）|LuaJIT|
|`bit.rol`|数値を左にローテートシフトする|LuaJIT|
|`bit.ror`|数値を右にローテートシフトする|LuaJIT|
|`bit.bswap`|32ビット整数のバイト順序を逆転させる（エンディアン変換）|LuaJIT|

### FFIライブラリ (`ffi.*`)

|名前|説明|互換性|
|---|---|---|
|`ffi.cdef`|C言語の宣言をLuaJITに定義する|LuaJIT|
|`ffi.C`|C標準ライブラリへのアクセスを提供する|LuaJIT|
|`ffi.load`|共有ライブラリをロードし、関数や変数にアクセスする|LuaJIT|
|`ffi.new`|指定された型の新しいCデータを作成する|LuaJIT|
|`ctype`|`ffi.new`や`ffi.cast`などで使用されるC型を定義する|LuaJIT|
|`ffi.typeof`|型を定義し、キャッシュするための関数|LuaJIT|
|`ffi.cast`|型にCデータをキャストする|LuaJIT|
|`ffi.metatype`|Cデータ型にメタテーブルを設定する|LuaJIT|
|`ffi.gc`|ガベージコレクションでメモリを解放するための関数を登録する|LuaJIT|
|`ffi.sizeof`|型やオブジェクトのサイズ（バイト数）を返す|LuaJIT|
|`ffi.alignof`|型のアラインメントを返す|LuaJIT|
|`ffi.offsetof`|C構造体のフィールドのオフセットを返す|LuaJIT|
|`ffi.errno`|Cライブラリの`errno`の値を取得または設定する|LuaJIT|
|`ffi.string`|Cの文字列（`char*`）をLuaの文字列に変換する|LuaJIT|
|`ffi.copy`|メモリ間でデータをコピーする|LuaJIT|
|`ffi.fill`|メモリを指定された値で埋める|LuaJIT|
|`ffi.abi`|実行環境に関するABI情報を取得する|LuaJIT|
|`ffi.os`|実行中のオペレーティングシステムの名前を返す|LuaJIT|
|`ffi.arch`|実行中のプロセッサアーキテクチャを返す|LuaJIT|
|`cb:free`|コールバック関数を解放する|LuaJIT|
|`cb:set`|コールバック関数を設定する|LuaJIT|

### JITライブラリ (`jit.*`)

|名前|説明|互換性|
|---|---|---|
|`jit.on`|JITコンパイラを有効にする|LuaJIT|
|`jit.off`|JITコンパイラを無効にする|LuaJIT|
|`jit.flush`|JITコンパイル済みコードをクリアし、再コンパイルさせる|LuaJIT|
|`jit.status`|JITコンパイラの現在のステータスを返す|LuaJIT|
|`jit.version`|JITコンパイラのバージョン文字列を返す|LuaJIT|
|`jit.version_num`|JITコンパイラのバージョン番号を返す|LuaJIT|
|`jit.os`|オペレーティングシステムを返す|LuaJIT|
|`jit.arch`|プロセッサアーキテクチャを返す|LuaJIT|
|`jit.opt.*`|JITの最適化オプションを設定または取得する|LuaJIT|
|`jit.util.*`|JITコンパイラの内部情報やデバッグツールにアクセスするための関数群|LuaJIT|