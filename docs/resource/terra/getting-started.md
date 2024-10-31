# はじめに

[[TOC]]

## セットアップ

### Replitを使用してブラウザでTerraを実行

最も速くTerraを試す方法は、[Replit](https://replit.com/@terralang/terra)でブラウザ上から実行することです。何もインストールせずにTerraを実行できます。言語の基本がつかめたら、以下の手順に従ってコンピュータにTerraをインストールできます。

### Terraのインストール

Terraは現在、Linux (x86_64, AArch64, PPC64le)、macOS (x86_64, AArch64)、FreeBSD (x86_64)、およびWindows (x86_64) で動作します。これらのシステム向けのバイナリリリースが[オンライン](https://github.com/terralang/terra/releases)で提供されており、可能であればそれを使用することをお勧めします。TerraのビルドにはLLVMとClangのインストールが必要で、準備が難しいことがあるためです。バイナリはほとんどの操作で依存関係を必要としませんが、Cエコシステムとの連携（Cヘッダファイルのインクルードや実行ファイル・共有ライブラリの作成など）には開発ツールが必要です。macOSではXcode（コマンドラインツールか完全インストール）を、LinuxではGCCまたはClangツールチェーン（例：Ubuntuでは`build-essential`パッケージ）を、WindowsではMicrosoft Visual Studio（2015、2017、2019、2022のいずれか）をインストールしてください。

macOS 10.15 Catalina以降では、TerraでCヘッダーをインクルードするために以下の環境変数を定義する必要があります。

```sh
export SDKROOT="$(xcrun --sdk macosx --show-sdk-path)"
```

### Terraの実行

Luaの設計と同様に、Terraはスタンドアロンの実行ファイルとして使用できるREPL（Read-Eval-Print-Loop）およびCプログラムに埋め込めるライブラリとしても使用できます。この設計により、既存のプロジェクトとの統合が容易です。

REPLを起動するには、以下のように入力します。

```
$ cd <terraフォルダへのパス>
$ bin/terra

Terra -- A low-level counterpart to Lua

Homepage: https://terralang.org/
Project: https://github.com/terralang/terra
Community: https://terralang.zulipchat.com/

>
```

TerraのREPLはLuaのREPLに似た動作をします。Pythonなど他の言語に慣れている場合、REPLで値を得るためには式の前に`return`または`=`を付ける必要がある点が異なります。

```
> 3        -- エラー! ステートメントが期待されています
stdin:1: unexpected symbol near 3
> return 3 -- OK!
3
> = 3      -- REPLでの'syntax sugar'として 'return 3' を意味します
3
```

既存のファイルに対しても実行できます。

```
$ bin/terra share/terra/tests/hello.t
hello, world
```

### Terraのテストスイートの実行

`share/terra/tests/`ディレクトリには、数多くのサンプルスクリプトが含まれています。これらの例は、このチュートリアルで説明されている以上に、言語機能の使い方について参考になります。

このディレクトリにある`run`スクリプトを使って、これらの言語テストをすべて実行し、Terraが正しくビルドされているか確認できます。

```
cd tests
../terra run
```

テスト結果は大量に表示されますが、最後に結果が要約されます。

```
471 tests passed. 0 tests failed.
```

## Terra言語

Terraは通常のLuaプログラム内に埋め込まれています。そのため、例えば以下のようなトップレベルのステートメント：

```lua
print("hello, world")
```

は、実際にはLuaのステートメントです。Terraのソースコードファイルにおけるトップレベルの宣言は、常に通常のLuaコードとして実行されます。

実際にTerraコードを書き始めるには、`terra`キーワードを使用してTerra関数を定義します。

```lua
terra addone(a : int)
    return a + 1
end

print(addone(2)) --出力: 3
```

Luaとは異なり、Terra関数の引数には明示的に型を指定します。Terraでは、`addone`関数の戻り値の型を静的に推論しますが、明示的に指定することも可能です。

```lua
terra addone(a : int) : int
    return a + 1
end
```

最初の例の最後の行は、トップレベルコンテキストからTerra関数を呼び出しています。これは、TerraとLuaの相互作用の一例です。

Terraコードは、関数が初めて呼び出されたときにJITコンパイルされて機械語になります。TerraとLuaのインターフェースに関する詳細は[Lua-Terraの相互作用](#lua-terra-interaction)を参照してください。

### C関数の使用

TerraはCと互換性があるため、Terraから直接Cライブラリを使用することがよくあります。ここでは、`stdio`を使って「hello」を出力します。

```lua
local C = terralib.includecstring [[
   #include <stdio.h>
]]

terra main()
    C.printf("hello, world\n")
end

main()
```

`terralib.includecstring`は、Terraの互換性レイヤーを使用してCコードをインポートするLua関数です。ここでは`stdio.h`をインクルードしています。戻り値はインポートされたC関数を含むLuaテーブルです。Clang（TerraのCフロントエンド）とTerraの両方がLLVM中間表現をターゲットとしているため、C関数を呼び出す際のオーバーヘッドはありません。C関数のソースが利用可能であれば、Terraはこれらの呼び出しをインライン化することも可能です。

`local`キーワードはLuaの構文で、スコープがローカルなLua変数`C`を導入します。省略した場合はグローバルスコープの変数が作成されます。

### 変数と代入

Terraコード内で変数を導入するには、`var`キーワードを使用します。

```lua
terra myfn()
    var a : int = 3
    var b : double
end
```

Luaとは異なり、Terraではすべての変数が宣言される必要があります。初期化子はオプションで、上記の例では`b`の値は初期化されていないため、値は未定義です。初期化子を指定すると、Terraは変数の型を自動的に推論できます。

```lua
terra myfn()
    var a = 3.0 -- aの型はdoubleになります
end
```

1行に複数の宣言を行うことも可能です。

```lua
terra myfn()
    var a : int, b : double = 3, 4.5
    var c : double, d       = 3, 4.5
end
```

LuaとTerraはどちらも空白に依存しないため、ステートメントの間にセミコロンを入れる必要はありません。上記のコードは次のように書き換えても同じ意味になります。

```lua
terra myfn()
    var a : int, b : double = 3, 4.5 var c : double, d = 3, 4.5
end
```

明確さのためにセミコロンを入れることもできます。

```lua
terra myfn()
    var a : int, b : double = 3, 4.5; var c : double, d = 3, 4.5
end
```

代入も同様の形式で行えます。

```lua
terra myfn()
    var a,b = 3.0, 4.5
    a,b = b,a
    -- aには4.5が、bには3.0が入ります
end
```

Luaと同様に、右辺は代入が実行される前に評価されるため、上記の例では2つの変数の値が入れ替わります。

Terraの変数は常にレキシカルスコープで管理されます。`do <stmts> end`ステートメントは新しいスコープを導入します（以降の説明では、Terraコードについての解説であることが明らかな場合、`terra`宣言は省略します）。

```lua
var a = 3.0
do
    var a = 4.0
end
-- この時点でaの値は3.0です
```

### 制御構造

Terraの制御構造はLuaとほぼ同じですが、`for`ループの動作が異なる点と、`switch`文が追加されています。

#### If文

Terraの`if`文はLuaと同様に動作します。

```lua
if a or b and not c then
    C.printf("then\n")
elseif c then
    C.printf("elseif\n")
else
    C.printf("else\n")
end
```

#### ループ

Terraの`while`と`repeat`ループもLuaと同様に動作します。オプションのキーワード`break`を使って途中でループを終了できます。ただし、Luaと同様に`continue`キーワードは存在しません。

```lua
var a = 0
while a < 10 do
    C.printf("loop\n")
    a = a + 1
end

repeat
    a = a - 1
    C.printf("loop2\n")
until a == 0

while a < 10 do
    if a == 8 then
        break
    end
    a = a + 1
end
```

Terraには`for`ループもありますが、**Luaとは動作が異なります**。以下の例では、0から始まり、10を含まずにカウントします。

```lua
for i = 0,10 do
    C.printf("%d\n",i)
end
```

これはLuaの動作とは異なり（Luaでは10を含む）、Terraが0ベースのインデックスとポインタ演算を使用していることに起因します。LuaとTerraでインデックスのルールを統一することが理想ですが、Terraコードはポインタ演算やCコードとのインターフェースが頻繁に必要となるため、1ベースのインデックスでは扱いにくくなります。一方で、Luaを0ベースに変更すると、TerraにバンドルされたLuaのバージョンが既存のLuaコードと互換性がなくなってしまいます。

ループにはオプションでステップパラメータも指定できます。

```lua
for i = 0,10,2 do
    C.printf("%d\n",i) --0, 2, 4, ...
end
```

#### イテレータ

**実験的機能**として、Terraでは[`__for`メタメソッド](api.html#exotypes-structs)を介してイテレータをサポートしています。Terra型が`__for`を実装している場合、以下のような構文で反復処理が可能です。

```lua
for i in Range {0,10} do
    C.printf("%d\n",i)
end
```

### Switch文

**実験的機能。** C++などの他の言語と同様に、Terraでは複数の（コンパイル時に定数の）オプションに分岐するための`switch`文が提供されています。

```lua
switch expr do
   case 1 then
       first_thing()
   case 2 then
       second_thing()
   end
end
```

C++とは異なり、`case`文は対応する`switch`のすぐ下に配置する必要があります。また、`break`文は不要です。（`break`を使用すると、対応する最も内側のループから抜け出すか、ループがなければエラーになります。）

オプションの`else`を使ってデフォルトのフォールスルーケースを指定できます。

```lua
switch expr do
    case 1 then
        first_thing()
    end
else
    default_thing()
end
```

最後の`case`の`end`は、`switch`文に`else`が含まれている場合は省略可能です。

```lua
switch expr do
case 1 then
    first_thing()
else
    default_thing()
end
```

この場合、最後の`end`に合わせて`case`をインデントしない表記が一般的です。

#### Goto文

Terraには`goto`文があります。慎重に使用してください。埋め込み言語用のコードを生成する場合に有用なことがあります。

```lua
::loop::
C.printf("y\n")
goto loop
```

`goto`のターゲットはラベルでなければなりません。コード内に直接記述するか（上記参照）、[APIを使ってプログラム的に生成](api.html#label)できます。

```lua
local loop = label()
terra yes()
    ::[loop]::
    C.printf("y\n")
    goto loop
end
yes()
```

#### Defer文

**実験的機能。** `defer`文を使うと、関数呼び出しをコードブロックの終了時まで遅延できます。

```lua
do
    var f = C.fopen("some_file.txt", "r")
    defer C.fclose(f) -- このファイルはブロックの終わりで閉じられます。
    C.fprintf(f, "Hello defer\n")
end                   -- ブロックの終わりでファイルが閉じられます。
```

### 関数

既にいくつかのシンプルな関数定義を見てきましたが、Terra（およびLua）の関数は複数のパラメータを受け取れるだけでなく、複数の値を返すこともできます。

```lua
terra sort2(a : int, b : int) : {int,int} -- 戻り値の型はオプション
    if a < b then
        return a, b
    else
        return b, a
    end
end

terra doit()
    -- 複数の戻り値は'tuple'型で戻されます（{int, int}の型）
    var ab : {int,int} = sort2(4,3)
    -- タプルはパターンマッチで分割し、個別の変数にできます。
    var a : int, b : int = sort2(4,3)
    -- この時点で a == 3, b == 4 です
end
doit()
```

複数の戻り値は[タプル](getting-started.html#tuples-and-anonymous-functions)にパックされ、代入時にパターンマッチで分解して複数の変数に分けられます。

関数のコンパイルは最初に呼び出されたときに行われます。この例では、`doit()`を呼び出すと、`doit()`と`sort2`の両方がコンパイルされます。これは、`doit`が`sort2`を参照しているため、`doit`が機能するには`sort2`もコンパイルが必要だからです。

#### 相互再帰

関数は定義時に型チェックされます。ある関数が他の関数を参照する場合、その関数は既に定義されている必要があり、そうでなければエラーになります。

```lua
terra iseven(n : uint32) : bool
    if n == 0 then
        return true
    else
        -- エラー! isoddが定義されていません
        return isodd(n - 1)
    end
end
print(iseven)
```

相互再帰を簡単にするため、Terraでは複数の関数を同時に定義することが可能です。ただし、定義の間に他のLuaステートメントが含まれていない場合に限ります。

```lua
terra iseven(n : uint32) : bool
    if n == 0 then
        return true
    else
        -- OK! isoddも同時に定義されています。
        return isodd(n - 1)
    end
end
terra isodd(n : uint32) : bool
    if n == 0 then
        return false
    else
        return iseven(n - 1)
    end
end
```

また、関数を定義する前に宣言することもできます。

```lua
terra isodd :: uint32 -> bool

terra iseven(n : uint32) : bool
    ...
end
terra isodd(n : uint32)
   ...
end
```

#### テーブル内で直接関数を定義

Luaの関数定義と同様に、Terraの関数定義もLuaテーブルに直接挿入できます。

```lua
local mytable = {}
terra mytable.myfunction()
    C.printf("myfunction in mytable\n")
end
```

#### Terra関数はLuaオブジェクト

これまで、トップレベルのLuaコードにおいて`terra`関数を特別な構文として扱ってきましたが、実際にはTerra関数はLuaの値にすぎません。実際、次のコード：

```lua
terra foo()
end
```

は以下の構文糖と同じです：

```lua
foo = terra()
    -- これは匿名のterra関数です
end
```

`foo`というシンボルは、値がTerra関数であるLuaの_変数_にすぎません。LuaはTerraのメタ言語であり、Terra関数に対してリフレクション（メタプログラミング）を行うために使用できます。例えば、関数の逆アセンブルを見ることができます。

```lua
terra add1(a : double)
    return a + a
end

-- 以下はLuaコード:
> add1:disas()
definition     {double}->{double}

define double @add111(double) {
entry:
  %1 = fadd double %0, %0
  ret double %1
}

assembly for function at address 0xa2ef030
0:      vaddsd  XMM0, XMM0, XMM0
4:      ret
```

関数を強制的にコンパイルさせることも可能です。

```lua
add1:compile()
```

また、型チェックされたコードのテキスト表現を確認することもできます。

```lua
> add1:printpretty()
add1 = terra(a : double) : {double}
    return a + a
end
```

\* 実際の構文糖は関数宣言をサポートするためにもう少し複雑です。詳細な動作については[APIリファレンス](api.html#function)をご覧ください。

### スコープのルール

どの言語にもあるように、Terraには、式の中で`add1`のようなシンボル（関数名など）を解決するためのスコープルールが定められています。TerraコードがLuaコード内にネストされているため、このスコープルールは非埋め込み言語よりも複雑です。

Terraコンパイラが`add1`のようなシンボルを参照するとき、まず`terra`関数のローカル（レキシカル）環境内を探します。シンボルが見つからなければ、Luaのスコープルールに従って囲んでいる（Luaの）環境で検索を続けます。Luaの値が見つかれば、可能であればTerraの値に変換されます。いくつかの例を見てみましょう。

```lua
local N = 4
terra powN(a : double)
    var r = 1
    for i = 0, N do
        r = r * a
    end
    return r
end
N = 3
-- powNは依然として4乗を計算します
```

ここで`N`はLuaの`number`型の値です。`powN`が定義される際、Lua環境内での`N`の値が参照され、この関数内で`int`リテラルとしてインライン化されます。

`N`は`powN`が定義されるときに解決されるため、`powN`がコンパイルされた後に`N`を変更しても、`powN`の動作には影響しません。

`terra powN(...`は、Terra関数の_コンストラクタ_のように考えることができます。このコンストラクタが実行された後に`N`を変更しても、構築済みのオブジェクトには影響を与えません。

もちろん、単一のべき乗関数だけではつまらないので、10種類のべき乗関数を作成してみましょう。

```lua
local mymath = {}
for i = 1,10 do
    mymath["pow"..tostring(i)] = terra(a : double)
        var r = 1
        for i = 0, i do
            r = r * a
        end
        return r
    end
end

mymath.pow1(2) -- 2
mymath.pow2(2) -- 4
mymath.pow3(2) -- 8
```

ここでも`terra(...`をTerra関数の_コンストラクタ_として考えます。ループ内でネストさせることで、異なる引数（`i`の値）を使って10個の異なるTerra関数を構築しています。

Luaではテーブルの要素選択演算子（`a.b`）が、テーブルの値を参照する（`a["b"]`）のと同じ動作をすることを利用しています。

これらのべき乗関数をTerra関数から呼び出すことも可能です。

```lua
terra doit()
    return mymath.pow3(3)
end
```

この関数がコンパイルされるときに何が起こるのかを見てみましょう。Terraコンパイラは、`mymath`シンボルをべき乗関数を保持するLuaテーブルとして解決します。その後、選択演算子（`mymath.pow3`）を確認し、`mymath`がLuaテーブルであるため、Terraコンパイラはこの選択演算をコンパイル時に実行し、`mymath.pow3`をループ内で構築された3番目のTerra関数に解決します。そして、`doit`内にその関数への直接的な呼び出しを挿入します。このような動作は_部分実行_の一形態です。一般に、TerraはLuaテーブル上の選択操作チェーン`a.b.c.d`をコンパイル時に解決できます。この動作により、Luaテーブルを使用してコードを異なる名前空間に整理することができ、Terra専用の名前空間メカニズムは不要になります。

Cファイルをインクルードする方法を思い出してください。

```lua
local c = terralib.includec("stdio.h")
```

`terralib.includec`は通常のLua関数であり、（この場合は標準ライブラリ関数を呼び出す）Terra関数への参照を含むLuaテーブルを構築します。テーブルを繰り返し処理して内容を確認することもできます。

```lua
for k,v in pairs(c) do
    print(k)
end

-- 出力:
-- fseek
-- gets
-- printf
-- puts
-- FILE
-- ...
```

Terraでは、多くの種類のLua値をTerra関数内で使用できます。ここでは、Luaの数値`N`をTerraの数値として、また`doit`の本体でのTerra関数`mymath.pow3`として使用しました。多くのLua値はコンパイル時にTerra値に変換可能です。この動作は値によって異なり、詳細は[コンパイル時の変換](api.html#compiletime-conversions)のAPIリファレンスで説明されています。

さらに、Terra関数をローカルスコープのLua変数として宣言することもできます。`local`キーワードを使用します。

```lua
local terra foo()
end
```

これは以下の構文糖と同じです。

```lua
local foo; foo = terra()
end
```

### 型と演算子

Terraの型システムはCの型システムに似ており、いくつかの違いがLua言語との相互運用性を向上させています。

最も重要な点として、Terraの型もLuaの値であり、Terra関数がLuaの値であるのと同じです。既に`int`や`double`といった基本的なTerra型を見てきましたが、これらはLua変数として定義され、Terraの基本型に割り当てられています。

関数と同様、型にも[リフレクションAPI](api.html#types)があります。

```lua
print(int)
-- > int32

print(int:isprimitive())
-- > true

print(int:isarithmetic())
-- > true
```

Terraの型がLuaの値であることから、Terraの型注釈は実際にはLua式となります。

```lua
local function an_integer_expression()
    return int
end
terra foo(a : an_integer_expression())
--            ~~~~~~~~~~~~~~~~~~~~~~~ Luaの式をここに入れることができます
```

`typedef`のようなものも実際にはLua変数の代入です。

```lua
local number = int -- 特別なtypedefは不要です
terra foo(a : number)

end
```

#### 基本型

Terraには通常の基本型が揃っています。

* 整数: `int` `int8` `int16` `int32` `int64`
* 符号なし整数: `uint` `uint8` `uint16` `uint32` `uint64`
* ブール値: `bool`
* 浮動小数点数: `float` `double`

整数は`int`と`uint`を除いて明示的にサイズが指定されており、これらは特定のサイズが重要でない場合にのみ使用します。Cからのほとんどの暗黙の型変換もTerraで有効ですが、大きな例外は`bool`型です。Cとは異なり、すべての制御フローには明示的に`bool`が必要で、整数を`bool`に暗黙的に変換することはできません。

```lua
if 3 then end -- エラー! 3はboolではありません
if 3 == 0 then end -- OK! 3 == 0はboolです
```

`int`から`bool`への変換は明示的なキャストを使って行えます。

```lua
var a : bool =  
```

基本型には標準の演算子が定義されています。

* 算術演算: `- + * / %`
* 比較演算: `< <= > >= == ~=`
* 論理演算: `and or not`
* ビット演算: `and or not ^ << >>`

これらはCと同様に動作しますが、論理演算子はオペランドの型によってオーバーロードされます。

```lua
true and false -- 遅延評価される論理積
1 and 3        -- 即時評価されるビット積
```

#### ポインタ

ポインタはCと同様に動作し、ポインタ演算も可能です。Luaの文法に合わせて構文が少し異なります。

```lua
var a : int = 1
var pa : &int = &a
@pa = 4
var b = @pa
```

ここで`&int`は`int`のアドレスを保持する値を表し、`@a`はアドレス`a`の値を表します。ヒープに割り当てられたメモリのポインタを取得するには、stdlibの`malloc`を使用します。

```lua
C = terralib.includec("stdlib.h")
terra doit()
    var a = [&int](C.malloc(sizeof(int) * 2))
    @a,@(a+1) = 1,2
end
```

インデックス演算子もポインタで使用可能です。

```lua
a[3] -- @(a + 3) の構文糖です
```

ポインタは、損失のない範囲で十分に大きな整数型にキャストできます。`intptr`はポインタを保持できる最小の整数型で、`ptrdiff`型は2つのポインタを減算した結果の符号付き整数型です。

Luaを拡張して型式`&int`を有効なLua式としたため、Luaからも直接使用できます。

```lua
local int_ptr = &int
```

#### 配列

静的サイズの配列を構築することも可能です。

```lua
var a : int[4]
a[0],a[1],a[2],a[3] = 0,1,2,3
```

Luaとは対照的に、Terraはすべてオフセットに基づいているため、0ベースのインデックスを使用します。`&int[3]`は長さ3の配列へのポインタを表し、`(&int)[3]`は整数へのポインタを3つ持つ配列を表します。

`array`関数を使用すると、可変数の引数から配列を構築できます。

```lua
var a = array(1,2,3,4) -- aの型はint[4]
```

配列の要素の型を特定したい場合は、`arrayof`関数を使います。

```lua
var a = arrayof(int,3,4.5,4) -- aの型はint[3]
                           -- 4.5はintにキャストされます
```

#### ベクトル

ベクトルは配列に似ていますが、ベクトル全体に対する演算を行うことができます。

```lua
terra saxpy(a :float,  X : vector(float,3), Y : vector(float,3))
    return a*X + Y
end
```

これはSIMD命令（例えばIntelのSSEやArmのNEON ISA）を抽象化して、ベクトル化されたコードを記述できるようにします。コンストラクタ`vector`と`vectorof`を使用してベクトルを作成でき、配列と同様の動作をします。

```lua
var a = vector(1,2,3,4) -- aの型はvector(int,4)
var a = vectorof(int,3,4.5,4) -- aの型はvector(int,3)
                              -- 4.5はintにキャストされます
```

#### 構造体

`struct`キーワードを使用して集約型を作成できます。構造体はTerraコードの外側で宣言する必要があります。

```lua
struct Complex { real : float; imag : float; }
terra doit()
    var c : Complex
    c.real = 4
    c.imag = 5
end
```

Cとは異なり、ポインタに対しても選択演算子`a.b`を使用できます。これにより、ポインタを1回デリファレンスしてから選択演算子を適用する動作をします（Cの`->`演算子と似ています）。

```lua
terra doit(c : Complex)
    var pc = &c
    return pc.real -- (@pc).realの構文糖です
end
```

関数と同様に、構造体定義内のシンボルは構造体が定義されるときに解決されます。相互再帰する構造体も、他のLuaステートメントが間に挟まれなければ、連続して定義することで問題なく使用できます。また、構造体を先に宣言してから定義することも可能です。

```lua
struct C --宣言
struct A {
    b : &B
}
-- Luaステートメントを挟まずに連続定義
struct B {
    a : &A
    c : &C
}
-- 構造体と関数定義を混在させることも可能です
terra myfunc()
end

struct C { i : int }
```

Terraには明示的な`union`型はありませんが、構造体の2つ以上の要素に同じメモリ領域を共有させることができます。

```lua
struct MyStruct {
    a : int; --ユニークなメモリ領域
    union {
        b : double;  -- bとcのメモリが重なります
        c : int;
    }
}
```

#### タプルと匿名構造体

Terraでは、要素のリストを含む特別な種類の構造体である_タプル_も使用できます。

```lua
var a : tuple(float,float) -- 2つのfloatのタプル
```

コンストラクタ構文を使ってタプルの値を素早く生成できます。

```lua
var a = { 1,2,3,4 } -- 型はtuple(int,int,int,int)
```

タプルは他の構造体型にキャストでき、構造体のフィールドが順に初期化されます。

```lua
var c = Complex { 3,4 }
```

また、コンストラクタ構文に名前を付けて、C#のような_匿名構造体_を作成することもできます。

```lua
var b = { a = 3.0, b = 3 }
```

Terraでは、匿名構造体をそのフィールドのスーパーセットを持つ他の構造体にキャストできます。

```lua
struct Complex { real : float, imag : float}
var c = Complex { real = 3, imag = 1 }
```

`{1,2}`のようなコンストラクタはファーストクラスの値であり、Terraの式が使用できる場所であればどこでも使用可能です。これはCの構造体初期化子が構造体宣言の中でのみ使用できるのとは対照的です。

#### 関数ポインタ

Terraでは関数ポインタも使用できます。

```lua
terra add(a : int, b : int) return a + b end
terra sub(a : int, b : int) return a - b end
terra doit(usesub : bool, v : int)
    var a : {int,int} -> int
    if usesub then
        a = sub
    else
        a = add
    end
    return a(v,v)
end
```

Terraには`void`型はありません。その代わり、引数を0個返す関数が定義できます。

```lua
terra zerorets() : {}
end
```

#### Lua値としてのTerra型

前述したように、宣言での`:`の後に続く式は単なるLua式であり、型に解決される式です。関数呼び出しなど、Luaの式で有効なものであれば、型として使用でき、評価されると有効なTerra型になります。これはさまざまな場面で便利です。

```lua
function Complex(typ)
    return struct { real : typ, imag : typ }
end

terra doit()
    var intcomplex : Complex(int) = {1,2}
    var dblcomplex : Complex(double) = { 1.0, 2.0 }
end
```

型は単なるLua式なので、Terraコード外でも使用できます。ここでは、Terraコードで使用可能な`int`へのポインタ型のエイリアスを作成しています。

```lua
local ptrint = &int

terra doit(a : int)
    var pa : ptrint = &a
end
```

型をLuaオブジェクトにすることで、テンプレートのような強力な機能が可能になります。ここでは、動的にサイズが変更可能な配列のコンストラクタを返すテンプレートを作成します。

```lua
function Array(typ)
    return terra(N : int)
        var r : &typ = [&typ](C.malloc(sizeof(typ) * N))
        return r
    end
end
-- memoizeはArray関数の結果をキャッシュし、再度呼び出された場合にキャッシュされた値を返します
Array = terralib.memoize(Array)

local NewIntArray = Array(int)

terra doit(N : int)
    var my_int_array = NewIntArray(N)
    -- 新しいint配列を使用します
end
```

### リテラル

以下はリテラルの例です。

* `3` は `int`
* `3.` は `double`
* `3.f` は `float`
* `3LL` は `int64`
* `3ULL` は `uint64`
* `"a string"` または `[[ a multi-line long string ]]` は `&int8`
* `nil` は任意のポインタ型におけるnullポインタ
* `true` と `false` は `bool`

### メソッド

C++やScalaのような言語と異なり、Terraは継承やサブタイプといった高度な機能を含む組み込みクラスシステムを提供していません。その代わりに、Terraはこれらのシステムを作成するための_メカニズム_を提供し、利用者が独自にシステムを選択して使用または構築できるようにしています。そのメカニズムの1つが、Luaの`:`演算子に似たメソッド呼び出し構文の糖衣構文です。

Luaでは次のステートメント：

```lua
receiver:method(arg1,arg2)
```

は次の糖衣構文に相当します。

```lua
receiver.method(receiver,arg1,arg2)
```

`method`関数はオブジェクト`receiver`上で動的に検索されます。対照的に、Terraではメソッドがコンパイル時に静的に解決され、`receiver`の値はコンパイル時に不明であるため、その_型_に基づいてメソッドが解決されます。

Terraでは、次のステートメント：

```lua
receiver:method(arg1,arg2)
```

が、`receiver`の型が`T`である場合、以下の糖衣構文に展開されます。

```lua
T.methods.method(receiver,arg1,arg2)
```

`T.methods`は型`T`の_メソッドテーブル_です。Terraでは、名前付き構造体型にメソッドを追加できます。

```lua
struct Complex { real : double, imag : double }
Complex.methods.add = terra(self : &Complex, rhs : Complex) : Complex
    return {self.real + rhs.real, self.imag + rhs.imag}
end

terra doit()
    var a : Complex, b : Complex = {1,1}, {2,1}
    var c = a:add(b)
    var ptra = &a
    var d = ptra:add(b) -- こちらも動作します
end
```

ステートメント`a:add(b)`は通常、`Complex.methods.add(a,b)`に変換されます。ここで、`a`は`Complex`ですが、`add`関数は`&Complex`を引数として期待しています。必要に応じて、Terraはメソッド呼び出しの最初の引数に対して暗黙的に`&`演算子を追加します。この場合、`a:add(b)`は`Complex.methods.add(&a,b)`に変換されます。

`:`演算子も、`&Complex`型の値に対して直接使用できます。この場合、ポインタがデリファレンスされ、通常のメソッドのルールが適用されます。例えば、`&Complex`型（例えば`ptra`）の値に`:`演算子を使用すると、まずデリファレンスして`Complex.methods.add(@a,b)`に変換され、その後`add`の型に合わせるために暗黙のアドレス演算が適用されて`Complex.methods.add(&@a,b)`となります。これにより、メソッドの定義が型`T`や`&T`の引数を取る場合、`T`型または`&T`型の値に対してもメソッド呼び出しが機能します。

メソッド定義を簡単にするため、以下の糖衣構文も用意されています。

```lua
terra Complex:add(rhs : Complex) : Complex
    ...
end
```

これは次の式と同等です。

```lua
terra Complex.methods.add(self : &Complex, rhs : Complex) : Complex
    ...
end
```

Terraはまた、Luaの`__add`などの演算子に似た_メタメソッド_もサポートしており、Terra型で`+`演算子をオーバーロードしたり、カスタムの型変換ルールを指定したりできます。詳細は[構造体のAPIリファレンス](api.html#structs)をご覧ください。

## Lua-Terraの相互作用

既に、LuaコードからTerra関数を呼び出す例を見てきました。一般に、通常のLua関数が使用できる場所ならどこでもTerra関数を呼び出せます。LuaからTerra関数に引数を渡すと、これらはTerra型に変換されます。この変換の[現在のルール](api.html##converting-between-lua-values-and-terra-values)はAPIリファレンスに記載されており、LuaJITの[外部関数インターフェースの動作](http://luajit.org/ext_ffi_semantics.html)に一致します。数値はダブルに、テーブルは構造体や配列に、Lua関数は関数ポインタに変換されるなどの例が挙げられます。

```lua
struct A { a : int, b : double }

terra foo(a : A)
    return a.a + a.b
end

assert( foo( {a = 1,b = 2.3} )== 3.3 )
assert( foo( {1,2.3} ) == 3.3)
assert( foo( {b = 1, a = 2.3} ) == 3 )
```

さらに多くの例は`tests/luabridge*.t`にあります。

また、TerraからLua関数を呼び出すことも可能です。再び、TerraオブジェクトからLuaへの変換にはLuaJITの変換ルールが使用されます。`double`のような基本型は対応するLua型に変換され、集約型や派生型はLuaJITの`ctype`としてボックス化されてLuaから修正可能です。関数`add1`は明示的にキャストする必要があり、さもなければTerraが引数の型を判断できません。

```lua
function add1(a)
    a.real = a.real + 1
end
struct Complex { real : double, imag : double }
tadd1 = terralib.cast({&Complex}->{},add1)
terra doit()
    var a = Complex {1,2}
    tadd1(&a)
    return a
end
a = doit()
print(a.real,a.imag) -- 2    2
print(type(a)) -- cdata
```

さらに多くの例は`tests/terralua.t`にあります。`tests/terraluamethod.t`ファイルでは、Lua関数をTerraオブジェクトのメソッドテーブル内で使用する例も示しています。

`cast`構文を使用してLua関数の戻り値の型を宣言することも可能です。

```lua
function luaadd(a,b) return a + b end
terraadd = terralib.cast( {int,int} -> int, luaadd)

terra doit()
    return terraadd(3,4)
end
```

## LuaでTerraをメタプログラミング

このガイドではすでに、Luaループを使ってTerraの`pow`関数の配列を作成するなど、メタプログラミングの事例に触れました。実際、Terraには実行時に_任意の_コードを生成できるいくつかの演算子が含まれています。たとえば、入力文字列を解析して解析結果を実装するTerra関数を構築することで、コンパイラ全体を実装することも可能です。

これらの演算子は[多段階プログラミング](http://www.cs.rice.edu/~taha/MSP/)からの手法を基にしています。_エスケープ_を使うとLua式の結果をTerraに挿入でき、_クォート_を使うと新しいTerraの文や式を生成し、エスケープを介してTerraコードに挿入できます。また、_シンボル_オブジェクトにより、コンパイル時に一意の名前を作成することも可能です。

#### エスケープ

エスケープを使うと、Lua式の結果をTerraコードに挿入できます。以下に例を示します。

```lua
function get5()
    return 5
end
terra foobar()
    return [ get5() + 1 ]
end
foobar:printpretty()

-- > 出力:
-- > foobar0 = terra() : {int32}
-- >     return 6
-- > end
```

この関数が定義されると、角括弧`[]`内のLua式が評価され、その結果であるLuaの値`6`がTerraコードに挿入されます。Luaの値はAPIリファレンスの[コンパイル時の変換ルール](api.html#compiletime-conversions)に基づいてTerraの値に変換されます（例：数値はTerra定数に、グローバル変数はそのグローバル変数への参照に変換）。

エスケープは任意の式や文が現れる場所に配置でき、複数の値を返す場合にはLua配列を返すことで挿入できます。

```lua
terra return123()
    --エスケープで2つの値を挿入
    return 1, [ {2,3} ]
end
```

フィールドや関数をプログラム的に選択するためにエスケープを使用することも可能です。

```lua
local myfield = "foo"
local mymethod = "bar"
terra fieldsandfunctions()
    var fields = myobj.[myfield]
    var methods = myobj:[mymethod]()
end
```

エスケープ内のLua式はTerra関数内で定義された変数を参照できます。以下の例では、Luaのパラメータに基づいて返す変数を選択しています。

```lua
local choosefirst = true
local function choose(a,b)
    if choosefirst then
        return a
    else
        return b
    end
end
terra doit(a : double)
    var first = C.sin(a)
    var second = C.cos(a)
    return [ choose(first,second) ]
end
```

LuaとTerraは同じ変数の集合を参照できるため、これを_レキシカルスコープの共有_と呼びます。

エスケープで使用される`first`や`second`の値はどうなるのでしょうか？エスケープは関数が_実行_されるときではなく、関数が_定義_されるときに評価されるため、`sin(a)`や`cos(a)`の式の結果が分かるわけではありません。その代わり、`first`や`second`はシンボル（Terraコード内で使用される一意の名前を表す抽象データ型）として扱われます。Terra式の外では具体的な値を持ちませんが、Terra式内で使用されると元の変数への参照になります。例に戻ると、関数`doit`は`choose`関数から返され、コードに挿入されたシンボルに応じて、`C.sin(a)`または`C.cos(a)`のどちらかの値を返します。

以前にLuaのシンボルを直接Terraコードで使用できる例を見ました。例えば、以下の`powN`関数です。

```lua
local N = 4
terra powN(a : double)
    var r = 1
    for i = 0, N do
        r = r * a
    end
    return r
end
```

この動作は、実際にはエスケープ式の糖衣構文にすぎません。Terraでは、式内で使用される_すべての_名前（例えば、`a`や`r`）がエスケープのように扱われます。以下にデシュガーした同じ関数を示します。

```lua
local N = 4
terra powN(a : double)
    var r = 1
    for i = 0, N do
        r = [r] * [a]
    end
    return [r]
end
```

この場合、`[a]`は値`4`に解決され、Terra定数に変換されます。一方、`[r]`はシンボルに解決され、関数の最初の行で定義された変数`r`の参照に変換されます。

この糖衣構文は、`a.b.c`のようなフィールド選択式にも拡張されています。この場合、`a`と`b`が両方ともLuaテーブルであれば、式は`[a.b.c]`にデシュガーされます。例えば、`C.sin`や`C.cos`の呼び出しは、`C`がLuaテーブルであるため、それぞれ`[C.sin]`と`[C.cos]`にデシュガーされます。

#### クォート

クォートを使うと、Terra関数外で単一のTerra式や文を生成できます。クォートは、エスケープと組み合わせてコードを生成する際によく使われ、クォートで個々の式を作成し、エスケープでそれらをつなぎ合わせます。

```lua
function addone(a)
    --aに1を加えるクォートを返す
    return `a + 1
end
terra doit()
    var first = 1
    --addoneを呼び出して
    --式first + 1 + 1を生成
    return [ addone(addone(first)) ]
end
```

一連の文を生成したい場合は、`quote`キーワードを使用します。

```lua
local printit = quote
    C.printf("a quotestatement")
end

terra doit()
    --2回出力
    printit
    printit
end
```

`quote`キーワードには、式を生成するためのオプションの`in`文も含めることができます。

```lua
myquote = quote
    var a = foo()
    var b = bar()
in
    a + b
end
```

このクォートを式として使用すると、その値を生成します。

```lua
terra doit()
    var one,two = myquote
end
```

エスケープで変数を使用する際、その変数の値が何であるべきか曖昧になることがあります。以下の関数がどの値を返すべきかを考えてみましょう。

```lua
function makeexp(arg)
    return quote
        var a = 2
        return arg + a
    end
end
terra client()
    var a = 1;
    [ makeexp(a) ];
end
```

この場合、変数名`a`は関数内とクォート内の2回定義されています。そして、`a`への参照が`makeexp`関数に渡され、`a`が定義された後にクォート内で使用されています。戻り値の式で、`arg`は`1`または`2`のどちらになるべきでしょうか？Cのマクロプリプロセッサを使用する場合、同等のコードは以下のようになります。

```c
#define MAKEEXP(arg) \
    int a = 2; \
    return arg + a; \

int scoping() {
    int a = 1;
    MAKEEXP(a)
}
```

Cの場合、関数は`4`を返します。しかし、これは望ましくない動作です。`MAKEEXP`がライブラリの作成者によって書かれたものであれば、`scoping`の作成者は`MAKEEXP`で`a`が使われていることを知らない可能性があります。この動作は通常「_非衛生的_」と呼ばれ、クォートの内部で変数が意図せず再定義されてしまうリスクがあるため、Cでマクロの使用が避けられる理由の1つです。

Terraでは、変数の参照が_衛生的_に保たれるように保証しています。`makeexp(a)`内の`a`への参照は、同じ[レキシカルスコープ](http://en.wikipedia.org/wiki/Scope_%28computer_science%29#Lexical_scoping_and_dynamic_scoping)（この場合は`client`関数内の`a`の定義）での`a`の定義にのみ紐付けられます。この関係は、シンボルがコード内で最終的にどこに配置されるかに関係なく維持されるため、`scoping`関数は正しく値`3`を返します。

この衛生問題は、メタプログラミングを持つすべての言語で発生します。詳細はWikipediaの[衛生的マクロ](http://en.wikipedia.org/wiki/Hygienic_macro)に関する議論も参考にしてください。衛生を保ち、レキシカルスコープを使用することで、Terraコードの変数が関数の実行方法に依存せずに常にその定義にマッチすることが保証されます。

#### 動的に生成されるシンボル

一般的に、衛生とレキシカルスコープは有用な性質ですが、コードを生成する際にレキシカルスコープのルールを破りたくなる場合もあります。たとえば、1つのクォートでローカル変数を導入し、別のクォートでそれを参照したい場合などです。Terraは、`symbol()`関数を使ってレキシカルスコープの違反を制御された方法で行えるようにしています。この関数は、呼び出すたびに一意の変数名（_シンボル_）を返します（これはCommon Lispの`gensym`に相当します）。以下は、新しいシンボルを作成し、1つのクォートでそのシンボルを定義し、別のクォートでそれを使用する例です。

```lua
local a = symbol()

defineA = quote
    var [a] = 3
end

twiceA = `2*a

terra doit()
    defineA
    return twiceA
end
```

`symbol`関数は、引数として型を受け取ることもできます（例：`symbol(int)`）。これは、宣言で`var a : int`と書くのと同じ効果があります。型が推論できる場合（例：初期化子があるローカル変数）には省略可能ですが、型を推論できない場合（例：関数の引数）には必須です。

シンボルの宣言では`a`の代わりにエスケープ`[a]`を使っていることに注意してください。単に`a`と書くと、そのクォートの外側からは参照できない`a`という名前のローカル変数が作成されます。このコンテキストでは、エスケープによってTerraコンパイラにその部分をLua式として解析し、評価して結果を挿入するよう指示しています。この場合、`a`の評価結果は`symbol()`関数によって生成されたシンボルです。同様に、式`2*a`内の`a`の参照も同じシンボルオブジェクトを評価します。エスケープを省略した場合、`2*a`が未定義の変数を参照しているというコンパイルエラーが発生します。

シンボルのリストを引数リストの末尾にスプライスして、引数の数を可変にした関数を生成することもできます。

```lua
local rest = {symbol(int),symbol(int)}

terra doit(first : int, [rest])
    return first + [rest[1]] + [rest[2]]
end
```

## 詳細情報

### 代入と式リスト

関数が複数の値を返す場合、暗黙的にそれらの値をタプルとして返します。

```lua
terra returns2() return 1,2 end
terra example()
    var a = returns2() -- 型はtuple(int,int)
    C.printf("%d %d\n",a._0,a._1)
end
```

複数の値を返す関数を簡単に使用できるように、式リストの最後の要素がタプルである場合、左辺の複数の変数と一致するようになっています。

```lua
terra example2()
    var a,b,c = 1,returns2()
    var a,b,c = returns2(),1 --エラー: returns2は最後の要素ではありません
end
```

### グローバル変数

Terraの変数は`terra`関数の外でも`global`関数を使って宣言できます。

```lua
a = global(double,3.0)
terra myfn()
    a = a + 1
    return a
end
print(myfn()) -- 4
print(a:get()) -- 4, :get()はLuaからグローバル変数の値にアクセス
```

これにより`a`は複数のTerra関数で見える_グローバル_変数となります。`global`関数はTerraのLuaベースの[API](api.html#global-variables)の一部で、`a`を値`3.0`で初期化します。

### マクロ

Terraでは、関数呼び出しのように見えて実際はLua関数へのエスケープ呼び出しとして動作する構造が役立つ場合があります。これをTerraではマクロと呼び、`macro`関数を使用して通常のLua関数からマクロを作成します。

```lua
local times2 = macro(function(a)
    -- aはTerraのクォートです
    return `a + a
end)

terra doit()
    var a = times2(3)
    -- a == 6
end
```

通常の関数がTerraの値で動作するのに対し、Terraマクロの引数は_クォート_としてマクロに渡されます。

マクロはクォートを引数とするため、関数呼び出しとは異なる動作をします。例えば：

```lua
var c = 0
terra up()
    c = c + 1
    return c
end

terra doit()
    return times2(up()) --1 + 2 == 3を返す
end
```

この例は`3`を返します。これは`up()`が2回評価されるためです。

一部の組み込み演算子もマクロとして実装されています。例えば、`sizeof`演算子は型のサイズを調べる特殊な命令を挿入するマクロです。

マクロはC++スタイルの`new`演算子のような便利なパターンを作成するのにも使用できます。

```lua
new = macro(function(typquote)
    local typ = typquote:astype()
    return `[&typ](C.malloc(sizeof(typ)))
end)

terra doit()
    var a = new(int)
end
```

一般的に、マクロはエスケープの糖衣構文で、エスケープの各引数がクォートされたものです。

```lua
local function foo ...
local mfoo = macro(foo)

terra f()
    var a,b = 1,2
    [ foo(`a,`b,`3) ]
    -- 同等なもの
    mfoo(a,b,3)
end
```

### Terraのビルド

バイナリリリースが適していない場合は、Terraをソースからビルドすることもできます。TerraはLLVM 3.5、Clang 3.5（LLVMのC/C++フロントエンド）、およびLuaJIT 2.0.3（LuaコードのトレーシングJIT）を使用します。TerraはLuaJITを自動的にダウンロードしてビルドしますが、ClangとLLVMのインストールが必要です。

#### Windows

WindowsでのTerraのインストール手順については、この[README](https://github.com/terralang/terra/blob/master/msvc/README.md)を参照してください。LLVMとClang 3.5のビルド済みコピーと、LuaJITのソースが必要です。

#### Linux/OSX

動作するLLVM/Clangインストールを入手する最も簡単な方法は、[LLVMダウンロードページ](http://llvm.org/releases/download.html)から_Clang Binaries_（LLVMバイナリも含む）をダウンロードして解凍することです。

次に、Terraのソースを取得します。

```
git clone https://github.com/terralang/terra
```

ダウンロードしたLLVMおよびClangのバージョンをTerraビルドで使用するために、`terra`ソースディレクトリ内に`Makefile.inc`というファイルを作成し、以下の内容を含めてLLVMインストールへのパスを設定します。

```
LLVM_CONFIG = <path-to-llvm-install>/bin/llvm-config
```

その後、`terra`ディレクトリでmakeを実行してLuaJITをダウンロードし、Terraをビルドします。

```
$ make
```

`Makefile.inc`を作成しない場合、Makefileは以下の値を使用してLLVM設定スクリプトとClangを探します。

```
LLVM_CONFIG = $(shell which llvm-config)
LLVM_COMPILER_BIN = $(shell $(LLVM_CONFIG) --bindir)
LLVM_CXX = $(LLVM_COMPILER_BIN)/clang++
LLVM_CC  = $(LLVM_COMPILER_BIN)/clang
```

インストール先が異なる場合は、`terra`ディレクトリに作成した`Makefile.inc`でこれらのデフォルトを上書きできます。

### CでのTerra-Lua埋め込み

Terraは、Cから`libterra.a`（Windowsの場合は`terra.dll`）とリンクすることでライブラリとしても使用できます。インターフェースは[Luaインタープリタ](http://queue.acm.org/detail.cfm?id=1983083)のものと非常に似ています。
次の簡単な例では、Terraを初期化し、各引数で指定されたファイルからコードを実行します。

```cpp
// simple.cpp
#include <stdio.h>
#include "terra.h"

int main(int argc, char ** argv) {
    lua_State * L = luaL_newstate(); //Lua状態を作成
    luaL_openlibs(L);                //ライブラリを初期化
    //Terraの状態をLuaに初期化
    terra_init(L);
    for(int i = 1; i < argc; i++)
        //各ファイルのTerraコードを実行
        if(terra_dofile(L,argv[i]))
            return 1; //エラー
    return 0;
}
```

このプログラムはTerraライブラリとリンクしてコンパイルできます。

```
# Linux
c++ simple.cpp -o simple -I<path-to-terra-folder>/terra/include \
-L<path-to-terra-folder>/lib -lterra_s -ldl -pthread

# OSX
c++ simple.cpp -o simple -I<path-to-terra-folder>/terra/include \
-L<path-to-terra-folder>/lib -lterra_s
```

これらのモードに加え、Terraコードは`.o`ファイルにコンパイルして実行可能ファイルにリンクするか、直接実行可能ファイルにコンパイルすることもできます。

## さらなる情報

TerraとLuaの相互作用についての詳細は、[APIリファレンス](api.html)に記載されています。また、[Terra For C Programmers](terraforcpp.html)（現在は未完成ですが参考になります）には、C/C++コードと同等のTerraコードが並べて表示され、言語の理解を助けます。Terraの機能についてさらに例を探したい場合は、最新の実装テストを含む`tests/`ディレクトリが最良の参考資料です。テストをgrepして、使用したい特定の機能の例を見つけてください。
