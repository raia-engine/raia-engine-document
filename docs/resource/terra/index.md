# Terra

::: info
このページおよび同じカテゴリーにあるすべてのページは[Terra公式サイト](https://terralang.org)のドキュメント等を翻訳したものです。
:::

__Terra__ は、__Lua__ プログラミング言語に組み込まれ、メタプログラミングされる低レベルのシステムプログラミング言語です。

```lua
-- このコードはすべて通常のLuaコードです。
function printhello()
    -- Luaの関数
    print("Hello, Lua!")
end
printhello()

-- TerraはCと互換性があり、例でCのioライブラリを使用します。
C = terralib.includec("stdio.h")

-- 'terra'というキーワードで新しいTerra関数を定義します。
terra hello(argc : int, argv : &rawstring)
    -- TerraからCの関数を呼び出します
    C.printf("Hello, Terra!\n")
    return 0
end

-- Terraの関数はLuaから直接呼び出せます。LLVMを使ってJITコンパイルし、機械語を生成します。
hello(0,nil)

-- Terraの関数はLuaでファーストクラスの値として扱え、メタプログラミングや調査が可能です。
hello:disas()
--[[ 出力:
    関数のアセンブリ (アドレス 0x60e6010)
    0x60e6010(+0):		push	rax
    0x60e6011(+1):		movabs	rdi, 102129664
    0x60e601b(+11):		movabs	rax, 140735712154681
    0x60e6025(+21):		call	rax
    0x60e6027(+23):		xor	eax, eax
    0x60e6029(+25):		pop	rdx
    0x60e602a(+26):		ret
]]

-- Terraコードは実行ファイルやオブジェクトファイル、共有ライブラリとして保存可能で、他のプログラムとリンクできます。
terralib.saveobj("helloterra",{ main = hello })
```

この例やその他のサンプルは、[Replit](https://replit.com/@terralang/terra)で試せます。

C/C++と同様に、Terraは **静的型付き** 、 **コンパイル済み** で、手動でメモリ管理が必要な言語です。しかし、C/C++とは異なり、最初から **Luaによるメタプログラミング** が可能なよう設計されています。

Terraの設計は、C/C++が実際には複数の「言語」で構成されているという認識から生まれました。C/C++にはオペレータや制御構造、関数呼び出しといったコア言語がありますが、その周囲には、プリプロセッサ、テンプレートシステム、構造体定義などのメタ言語が存在しています。テンプレートはチューリング完全で、[Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page)のような最適化されたライブラリを生成できますが、実際の使用は困難です。

Terraでは、C/C++のメタ言語をより強力にする流れに従い、それを実際のプログラミング言語Luaに置き換えました。

高レベルのスクリプト言語によってメタプログラミングされた低レベル言語の組み合わせにより、他のシステムでは不可能な多くの動作が実現します。C/C++とは異なり、TerraコードはJITコンパイル可能で、Luaの評価と混在して実行できるため、ランタイムコード生成に依存するライブラリを簡単に作成できます。

条件付きコンパイルやテンプレートといった他の言語の機能も、LuaによるTerraのメタプログラミングと組み合わせることで簡単に実現できます。

::: code-group

```cpp [C++]
int add(int a, int b) {
    return a + b;
}

#ifdef _WIN32
void waitatend() {
    getchar();
}
#else
void waitatend() {}
#endif

template<class T>
struct Array {
    int N;
    T* data;
    T get(int i) {
        return data[i];
    }
};
typedef
Array<float> FloatArray;
```

```lua [Lua/Terra]
terra add(a : int,b : int) : int
    return a + b
end

-- 条件付きコンパイルは、コードの定義を制御する条件分岐で行います。
if iswindows() then
    terra waitatend()
        C.getchar()
    end
else
    terra waitatend() end
end

-- テンプレートは、型Tを受け取り、新しい型やコードを生成するLua関数として定義します。
function Array(T)
    struct Array {
        N : int
        data : &T
    }
    terra Array:get(i : int)
        return self.data[i]
    end
    return Array
end

FloatArray = Array(float)
```

:::

__TerraとLua__ は以下のように使用できます。

**言語構築のための埋め込みJITコンパイラ**:

Terraは、マルチステージプログラミングの技術[<sup>2</sup>](#footnote2)を用いて、LuaによってTerraのメタプログラミングが可能になっています。Terraの式、型、関数はすべてLuaのファーストクラスの値であり、実行時に任意のプログラムを生成できるため、Luaで記述された **[ドメイン特化言語](#compiling-a-language)** (DSL) を高性能なTerraコードにコンパイルできます。また、TerraはLuaエコシステムの上に構築されているため、他のソフトウェアにライブラリとして **[組み込む](#embedding-and-interoperability)** のも簡単です。この設計により、既存のソフトウェアにJITコンパイラを追加できます。これを利用して、JITコンパイルされたDSLをアプリケーションに追加したり、高性能なコードの動的な自動チューニングを行うこともできます。

**高性能拡張機能を備えたスクリプト言語**:

Luaやその他の動的言語のパフォーマンスは向上し続けていますが、低レベルの抽象化により、必要なときに予測可能なパフォーマンス制御が可能になります。Terraプログラムは、AppleのCコンパイラで使用されるLLVMバックエンドと同じものを使用しているため、Terraコードは同等のCコードと同様の性能を発揮します。たとえば、プログラミング言語ベンチマークゲームからの`nbody`および`fannhakunen`プログラムのTerra版は、Clang (LLVMのCフロントエンド) でコンパイルしたC版と比べて約5%以内の速度で動作します。また、TerraにはSIMD操作や非一時的な書き込み、プリフェッチなどの低レベル機能も組み込まれています。アプリケーションの整理や設定をLuaで行い、パフォーマンスが必要なときにTerraコードを呼び出すことで、制御可能なパフォーマンスが実現します。

**独立した低レベル言語**:

TerraはLuaから独立して動作するように設計されているため、最終的なプログラムでLuaが不要な場合、Terraコードを.oファイルや実行ファイルとして保存できます。この設計は、高レベルコードと低レベルコードを明確に分離するだけでなく、Terraをスタンドアロンの低レベル言語として使用することも可能にします。この場合、Luaは強力なメタプログラミング言語として機能し、C++のテンプレートメタプログラミング[<sup>3</sup>](#footnote3)やCのプリプロセッサのXマクロ[<sup>4</sup>](#footnote4)を、より良い構文やハイジーン[<sup>5</sup>](#footnote5)などの優れた特性とともに置き換えます。TerraはLuaメタプログラム内に埋め込まれたコードとしてのみ存在するため、通常は低レベル言語に組み込まれる機能をLuaライブラリとして実装できます。この設計により、Terraのコアはシンプルでありながら、条件付きコンパイル、名前空間、テンプレート、さらには **クラスシステムの** **[ライブラリ実装](#simplicity)** などの強力な機能が実現します。

Terraの使用に関する詳細は、 **[入門ガイド](getting-started.html)** や **[APIリファレンス](api.html)** をご覧ください。設計に関するより深い内容は、 **[論文](publications.html)** で紹介しています。

\[1\] <a id="footnote1"> </a> <http://benchmarksgame.alioth.debian.org><br/>
\[2\] <a id="footnote2"> </a> <http://www.cs.rice.edu/~taha/MSP/><br/>
\[3\] <a id="footnote3"> </a> <http://en.wikipedia.org/wiki/Template_metaprogramming><br/>
\[4\] <a id="footnote4"> </a> <http://en.wikipedia.org/wiki/X_Macro><br/>
\[5\] <a id="footnote5"> </a> <http://en.wikipedia.org/wiki/Hygienic_macro><br/>

## ジェネレーティブプログラミング

Terraの関数、型、変数、式などのエンティティは、Luaのファーストクラスの値として扱われます。つまり、これらはLuaの変数に格納したり、Luaの関数に引数として渡したり、戻り値として返したりできます。マルチステージプログラミングの構文[<sup>2</sup>](#footnote2)を使って、Luaコードから任意のTerraコードをプログラム的に生成できます。

### マルチステージ演算子

Terraコード内では、エスケープ演算子 (`[]`) を使用して、Luaの式の結果をTerraコードに挿入することができます。

```lua
local a = 5
terra sin5()
    return [ math.sin(a) ]
end
```

エスケープは、Terra関数が __コンパイルされる__ 際に評価され、その結果がTerraコードに挿入されます。この例では、`math.sin(5)`は __一度だけ__ 評価され、Terra関数を実装するコードが定数を返します。この結果は、コンパイルされた`sin5`関数の内容を出力することで確認できます。

```lua
-- この関数の処理内容をわかりやすく表示
sin5:printpretty() 

-- > 出力:
-- > sin50 = terra() : {double}
-- >    return -0.95892427466314
-- > end
```

エスケープは、関数のような他のTerraエンティティも返すことができます。

```lua
add4 = terra(a : int) return a + 4 end

terra example()
    return   -- 7
end
```

この場合、Terraは変数`add4`に格納されているTerra関数を呼び出すコードを挿入します。

```lua
example:printpretty()

-- > 出力:
-- > example4 = terra() : {int32}
-- >   return <extract0> #add43(3)#
-- > end
```

実際、Terraコード内で使用される`add4`や`foo.bar`といった名前は、デフォルトでエスケープされたものとして扱われます。

エスケープ内で、Terraで定義した変数にアクセスすることも可能です。

```lua
-- エスケープ内で呼び出される関数
function choosesecond(a,b)
    -- falseを出力: 'a'は数値ではありません
    print(a == 1) 
    -- trueを出力: 'a'はTerraのシンボルです
    print(terralib.issymbol(a))
    return b
end

terra example(input : int)
    var a = input
    var b = input+1
    -- 'a'と'b'を参照するエスケープを作成
    return [ choosesecond(a,b) ] -- bの値を返します
end

example(1) -- 2を返します
```

エスケープはTerra関数がコンパイルされる前に評価されるため、エスケープ内の`a`や`b`は具体的な整数値を持ちません。代わりに、Luaコード内での`a`や`b`はTerraのシンボルとして扱われ、Terraの値への参照を表します。`choosesecond`がシンボル`b`を返すため、`example`関数は呼び出された際にTerra変数`b`の値を返します。

_クォート_ 演算子（バッククォート）は、Lua内でTerraの文や式を生成するために使用されます。これらはエスケープ演算子でTerraコードに挿入できます。

```lua
function addtwo(a,b)
    return `a + b
end

terra example(input : int)
    var a = input
    var b = input+1
    return [ addtwo(a,b) ]
end

example(1) -- 3を返します
```

式ではなく文を生成する場合、`quote`演算子を使用します。

```lua
local printtwice = quote
    C.printf("hello\n")
    C.printf("hello\n")
end

terra print4()
    [printtwice]
    [printtwice]
end
```

### 言語のコンパイル

この2つの演算子を使って、Luaでコンパイル時に _任意の_ Terraコードを生成できます。これにより、LuaとTerraの組み合わせは、高性能なドメイン特化言語（DSL）用のコンパイラを記述するのに適しています。たとえば、チューリングマシンを模倣するミニマルな言語である[BF（Brainfuck）](http://en.wikipedia.org/wiki/Brainfuck)の __コンパイラ__ を実装できます。Lua関数`compile`は、BFコードの文字列と最大テープサイズ`N`を受け取り、BFコードを実装するTerra関数を生成します。以下はBFプログラムのセットアップ用のスケルトンです。

```lua
local function compile(code,N)
    local function body(data,ptr)
        --<<bodyの実装>>
    end
    return terra()
        -- テープを保持する配列
        var data : int[N]
        -- 初期状態でテープをクリア
        for i = 0, N do
            data[i] = 0
        end
        var ptr = 0
        -- bodyのコードを生成
        [ body(data,ptr) ]
    end
end
```

関数`body`は、BFコード文字列からBFプログラムの本体を生成する役割を担います。

```lua
local function body(data,ptr)
    -- BFプログラムを構成するTerra文のリスト
    local stmts = terralib.newlist()

    -- BFコード内の各文字をループ処理
    for i = 1,#code do
        local c = code:sub(i,i)
        local stmt
        -- 各BF演算子に対応するTerra文を生成
        if c == ">" then
            stmt = quote ptr = ptr + 1 end
        elseif c == "<" then
            stmt = quote ptr = ptr - 1 end
        elseif c == "+" then
            stmt = quote data[ptr] = data[ptr] + 1 end
        elseif c == "-" then
            stmt = quote data[ptr] = data[ptr] - 1 end
        elseif c == "." then
            stmt = quote C.putchar(data[ptr]) end
        elseif c == "," then
            stmt = quote data[ptr] = C.getchar() end
        elseif c == "[" then
            error("以下で実装")
        elseif c == "]" then
            error("以下で実装")
        else
            error("不明な文字: "..c)
        end
        stmts:insert(stmt)
    end
    return stmts
end
```

この関数は、コード文字列をループして各BF文字に対応するTerraコードを生成します（たとえば`>`はテープを1移動し、Terraコードでは`ptr = ptr + 1`で実装）。これでBF関数をコンパイルできるようになりました。

```lua
add3 = compile(",+++.")
```

結果である`add3`は、入力文字に3を加えてから出力するTerra関数になります。

```lua
add3:printpretty()

-- > bf_t_46_1 = terra() : {}
-- > var data : int32[256]
-- > ...
-- > var ptr : int32 = 0
-- > data[ptr] = <extract0> #getchar()#
-- > data[ptr] = data[ptr] + 1
-- > data[ptr] = data[ptr] + 1
-- > data[ptr] = data[ptr] + 1
-- > <extract0> #putchar(data[ptr])#
-- > end
```

また、`goto`文（`goto labelname`）とラベル（`::labelname::`）を使用して、BFのループ構造を実装することもできます。

```lua
local function body(data,ptr)
    local stmts = terralib.newlist()
    
    -- 各ループの開始位置を記録するためのスタック
    local jumpstack = {}
    
    for i = 1,#code do
        local c = code:sub(i,i)
        local stmt
        if ...
        elseif c == "[" then
            -- ループの開始と終了を表すラベルを生成
            -- 'symbol'関数でグローバルにユニークなラベル名を生成
            local target = { before = symbol(), after = symbol() }
            table.insert(jumpstack,target)
            stmt = quote 
                -- ループの開始ラベル
                ::[target.before]:: 
                if data[ptr] == 0 then
                    goto [target.after] -- ループを抜ける
                end
            end
        elseif c == "]" then
            -- このループに対応するラベルを取得
            local target = table.remove(jumpstack)
            assert(target)
            stmt = quote 
                goto [target.before] -- ループのバックエッジ
                :: [target.after] :: -- ループ終了ラベル
            end
        else
            error("不明な文字: "..c)
        end
        stmts:insert(stmt)
    end
    return stmts
end
```

これらのジェネレーティブプログラミングの構文を使って、ドメイン特化言語や自動チューニングツールを実装しています。私たちの[PLDI論文](/publications.html)では、画像処理カーネル用の言語であるOrionの実装について説明しており、現在メッシュベースのPDE用の[Liszt言語](http://liszt.stanford.edu)のTerraへの移植も進行中です。

## 埋め込みと互換性

プログラミング言語は単独で存在するものではなく、Terraのジェネレーティブプログラミング機能は、他の言語で主に実装されたプロジェクトにも役立ちます。Terraを他のプロジェクトと統合することで、プロジェクト全体を既存の確立された言語で記述しながら、低レベルコードの生成にTerraを利用できます。

まず、LuaとTerraの間で値を渡すことが可能です。この実装はLuaJITの[外部関数インターフェース](http://luajit.org/ext_ffi_tutorial.html)の上に構築されています。Luaから直接Terra関数を呼び出したり（またはその逆も可能）、Luaから直接Terraオブジェクトにアクセスできます（詳細は[APIリファレンス](/api.html#converting-between-lua-values-and-terra-values)を参照）。

さらに、Lua-Terraは純粋なLuaおよびCと互換性があり、既存のコードの再利用が容易です。Lua-Terraでは`require`や`loadfile`を使ってファイルをLuaプログラムとして扱えます（Lua-Terraを組み合わせたファイルを読み込むには`terralib.loadfile`を使用）。既存のヘッダーファイルからC関数をインポートするには`terralib.includec`を使用します。

最後に、Lua-Terraは`libterra.a`にリンクし、TerraのC APIを使うことで、既存のアプリケーションに __埋め込む__ ことも可能です。このインターフェースは[Luaインタープリター](http://queue.acm.org/detail.cfm?id=1983083)に非常に似ています。以下の簡単な例では、Terraを初期化し、各引数で指定されたファイルのコードを実行しています。

```c
#include <stdio.h>
#include "terra.h"

int main(int argc, char ** argv) {
    lua_State * L = luaL_newstate(); // 通常のLua状態を作成
    luaL_openlibs(L);                // ライブラリを初期化
    // Terra状態をLuaで初期化
    terra_init(L);
    for(int i = 1; i < argc; i++)
        // 各ファイルのTerraコードを実行
        if(terra_dofile(L,argv[i]))  
            exit(1);
    return 0;
}
```

## シンプルさ

シンプルな低レベル言語とシンプルな動的プログラミング言語を組み合わせることで、通常静的型付きの低レベル言語に組み込まれている多くの機能を、動的言語のライブラリとして実装できます。以下にいくつかの例を示します。

### 条件付きコンパイル

通常、条件付きコンパイルはプリプロセッサディレクティブ（例: `#ifdef`）やカスタムビルドシステムを使って行いますが、Lua-TerraではLuaコードでTerra関数の構築方法を決定できます。Luaは完全なプログラミング言語であるため、外部プログラムを呼び出すなど、ほとんどのプリプロセッサではできない操作も可能です。この例では、最初に`uname`を実行してオペレーティングシステムを確認し、結果に応じて異なるバージョンのTerra関数をインスタンス化する`if`文を使用して、OSXとLinuxで異なる条件付きコンパイルを行います。

```lua
-- unameを実行して、現在のOSを確認
local uname = io.popen("uname","r"):read("*a")
local C = terralib.includec("stdio.h")

if uname == "Darwin\n" then
    terra reportos()
        C.printf("this is osx\n")
    end
elseif uname == "Linux\n" then
    terra reportos()
        C.printf("this is linux\n")
    end
else
    error("不明なOS")
end

-- 現在のOSに合わせて適切なバージョンを条件付きでコンパイル
reportos()
```

### 名前空間

静的型付き言語では、通常、名前空間の問題を扱うために専用の構造が必要です（例：C++の`namespace`キーワードやJavaの`import`構文）。Terraでは、Luaのファーストクラスのテーブルを使って関数を整理します。Terra関数内で`myfunctions.add`のような「名前」を使用すると、Terraはそれを_コンパイル時に_該当するTerraの値に解決します。以下は、Luaテーブル内にTerra関数を配置し、別のTerra関数から呼び出す例です。

```lua
local myfunctions = {}
-- terra関数はLuaのファーストクラスの値です

-- Luaテーブルに格納できます
terra myfunctions.add(a : int, b : int) : int
    return a + b
end

-- テーブルからも呼び出せます
terra myfunctions.add3(a : int)
    return myfunctions.add(a,3)
end

-- myfunctions.addの宣言は、次の構文糖と同じです：

myfunctions["add"] = terra(a : int, b : int) : int
    return a + b
end

print(myfunctions.add3(4))
```

実際、C関数をインポートしたときにもこの機能を既に見ています。

```lua
C = terralib.includec("stdio.h")
```

`includec`関数はC関数を含むLuaテーブル（`C`）を返します。`C`はLuaテーブルであるため、必要に応じてその中身を繰り返し処理できます。

```lua
for k,v in pairs(C) do
    print(k,v)
end

-- > seek   <terra function>
-- > asprintf    <terra function>
-- > gets    <terra function>
-- > size_t  uint64
-- > ...
```

### テンプレート

Terraの型と関数はファーストクラスの値であるため、Lua関数内でTerra型を作成しTerra関数を定義するだけで、C++テンプレートに似た機能が得られます。次の例では、Lua関数`MakeArray(T)`を定義し、Terra型`T`を引数として取り、複数の`T`オブジェクトを保持できる`Array`オブジェクト（C++の`std::vector`の簡易版）を生成します。

```lua
C = terralib.includec("stdlib.h")
function MakeArray(T)
    -- TのリストへのポインタとサイズNを含む新しいStruct型を作成
    local struct ArrayT {
        -- &TはTへのポインタ
        data : &T;
        N : int;
    } 
    -- 型にメソッドを追加
    terra ArrayT:init(N : int)
        -- [&T](...) はキャストです
        -- Cの等価コードは (T*)(...)
        self.data = [&T](C.malloc(sizeof(T)*N))
        self.N = N
    end
    terra ArrayT:get(i : int)
        return self.data[i]
    end
    terra ArrayT:set(i : int, v : T)
        self.data[i] = v
    end
    -- 型を返します
    return ArrayT
end

IntArray = MakeArray(int)
DoubleArray = MakeArray(double)

terra UseArrays()
    var ia : IntArray
    var da : DoubleArray
    ia:init(1) 
    da:init(1)
    ia:set(0,3)
    da:set(0,4.5)
    return ia:get(0) + da:get(0)
end
```

この例のように、Terraでは`struct`型にメソッドを定義できます。クラスを持つ他の静的型付き言語とは異なり、継承やランタイムポリモーフィズムのための組み込み機能はありません。メソッド宣言は、各型にLuaメソッドのテーブルを関連付ける構文糖にすぎません。ここでの`get`メソッドは次のように同等です。

```lua
ArrayT.methods.get = terra(self : &T, i : int)
    return self.data[i]
end
```

オブジェクト`ArrayT.methods`は、型`ArrayT`のメソッドを保持するLuaテーブルです。

同様に、`ia:get(0)`のような呼び出しは`T.methods.get(&ia,0)`と同等です。

### 専門化（Specialization）
    
Lua関数の内部にTerra関数をネストさせることで、異なるバージョンの関数をコンパイルできます。ここでは、異なるバージョンのべき乗関数（例：`pow2`や`pow3`）を生成しています。

```lua
-- 特定のN（例：N = 3）に対するべき乗関数を生成
function makePowN(N)
    local function emit(a,N)
        if N == 0 then return 1
      else return `a*[emit(a,N-1)]
      end
    end
    return terra(a : double)
        return [emit(a,N)]
    end
end

-- 関数のテーブルに埋め込む
local mymath = {}
for n = 1,10 do
    mymath["pow"..n] = makePowN(n)
end
print(mymath.pow3(2)) -- 8
```

### クラスシステム

テンプレートの例で示したように、Terraでは`struct`型にメソッドを定義できますが、継承やポリモーフィズムのための組み込み機能は提供されていません。その代わり、通常のクラスシステムはライブラリとして記述できます。たとえば、ユーザーが次のように書くことができます。

```lua
J = terralib.require("lib/javalike")
Drawable = J.interface { draw = {} -> {} }
struct Square { length : int; }
J.extends(Square,Shape)
J.implements(Square,Drawable)
terra Square:draw() : {}
    -- 描画の実装
end
```

`J.extends`と`J.implements`は、クラスシステムを実装するために適切なTerraコードを生成するLua関数です。詳細は[PLDI Paper](/publications.html)で説明しています。[lib/javalike.t](https://github.com/terralang/terra/blob/master/tests/lib/javalike.t)ファイルにはJava風のクラスシステムの実装が含まれ、[lib/golike.t](https://github.com/terralang/terra/blob/master/tests/lib/golike.t)ファイルはGoogleのGo言語に似た構造を持っています。

