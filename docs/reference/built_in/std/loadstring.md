# loadstring

文字列からLuaコードを読み込み、チャンクを返す

```lua
loadstring (string [, chunkname[, mode [, env]]])
```

## 説明

この関数は Lua 5.2 で廃止されましたが、LuaJIT では `load` のエイリアスとして利用できます。

指定した文字列 `string` を Lua コードとして読み込み、コンパイルされたチャンクを返します。エラーがなければ、コンパイルされた関数を返し、エラーがあれば `nil` とエラーメッセージを返します。

文字列 `s` を実行するには、以下のようにします：

```lua
assert(loadstring(s))()
```

`chunkname` を省略した場合、デフォルトで指定された文字列が使用されます。

## サンプルコード

```lua
local code = "return 2 + 3"
local f = loadstring(code)
print(f())  -- 5
```

この例では、文字列内のLuaコードを`loadstring`で読み込み、実行して結果を表示します。

## LuaJIT独自の拡張

LuaJITではUTF-8エンコーディングのソースコードを処理できるように拡張されています。

また引数`mode`でモードパラメータを指定することで、チャンクが「テキストチャンク」または「バイナリチャンク」として処理されるかを制御できます。モードパラメータの詳細は以下の通りです。

- "t": テキストチャンクのみを許可します
- "b": バイナリチャンクのみを許可します
- "bt": テキストとバイナリの両方を許可します（デフォルト）

## 拡張版のサンプルコード

```lua
local utf8_code = "return 'こんにちは、LuaJIT！'"
local f = loadstring(utf8_code, nil, "t")  -- "t" モードでテキストチャンクとして処理
print(f())  -- 出力: こんにちは、LuaJIT！
```

この例では、UTF-8文字列を含むLuaコードをloadstring関数で読み込み、テキストチャンクとして処理します。

## 互換性

- Lua5.1
- Lua5.2で廃止（LuaJITでは使用可能）
- LuaJIT独自の拡張あり

## 関連項目

- [`load`](load.md)
- [`loadfile`](loadfile.md)
- [`dofile`](dofile.md)