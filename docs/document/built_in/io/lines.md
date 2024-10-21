# io.lines

```lua
io.lines ([filename])
```

## 説明

ファイルを開き、それを一行ずつ読み取るイテレータを返します。引数なしで呼び出すと、デフォルトの入力ファイルからの行を反復処理します。

## サンプルコード

```lua
for line in io.lines("test.txt") do
    print(line)
end
```

この例では、ファイルの各行を繰り返し処理し、行ごとに出力しています。

## 互換性

- Lua 5.1

## 関連項目

- [`file:lines`](file_lines.md)