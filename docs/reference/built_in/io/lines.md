# io.lines

```lua
io.lines ([filename])
```

## 説明

引数 `filename` で指定したファイルを開き、そのファイルから1行ずつ読み取るイテレータ関数を返します。引数を省略すると、デフォルトの入力ファイルから行を順に読み取ります。

## サンプルコード

```lua
for line in io.lines("test.txt") do
    print(line)
end
```

この例では、ファイルの各行を繰り返し処理し、行ごとに出力しています。

## LuaJIT独自の拡張

- 64ビットファイルオフセットを扱う。
- `io.read()`のオプションを処理する。(Lua5.2から)

## 互換性

- Lua 5.1
- LuaJIT

## 関連項目

- [`file:lines`](file_lines.md)