# Terra API リファレンス

[[TOC]]

## リスト

`terralib`内のAPIで配列を返すものは、常にListオブジェクトを返します。これは、Luaコード内で使用するためのより完全なリストデータ型です。

List型は通常のLuaテーブルで、以下の追加メソッドを持っています：

1. Luaの`table`グローバルの全メソッド
2. [SMLのリスト型](http://sml-family.org/Basis/list.html)に基づいた高階関数のリスト

これにより、Terraオブジェクトをメタプログラムで操作しやすくなります。

```lua
local List = require("terralist")

List() -- 空のリスト
List { 1,2,3 } -- 要素3つのリスト
```

テーブルで初期化された新しいリストを作成します。

Listには次の関数もあります：

```lua
-- Luaのstring.subに相当、リストの部分取得
list:sub(i,j)

-- リストを反転
list:rev() : List[A]

-- すべての要素に関数fnを適用
list:app(fn : A -> B) : {}

-- すべての要素にmapを適用し、新しいリストを返す
list:map(fn : A -> B) : List[B]

-- 関数fn(e)が真である要素のみの新しいリスト
list:filter(fn : A -> boolean) : List[A]

-- すべての要素にmapを適用し、結果のリストを連結
list:flatmap(fn : A -> List[B]) : List[B]

-- 条件を満たす最初の要素を見つける
list:find(fn : A -> boolean) : A?

-- k,v = fn(e)を各要素に適用し、同じkの値vをグループ化
list:partition(fn : A -> {K,V}) : Map[ K,List[V] ]

-- 再帰的に初期値initとリストの各要素にfnを適用
list:fold(init : B,fn : {B,A} -> B) -> B

-- リストの各要素にfnを再帰的に適用
list:reduce(fn : {B,A} -> B) -> B

-- リストのいずれかの要素が条件を満たすか
list:exists(fn : A -> boolean) : boolean

-- リストのすべての要素が条件を満たすか
list:all(fn : A -> boolean) : boolean
```

高階関数を取るすべての関数には、関数にリストのインデックスも提供する`i`バリアントもあります：

```lua
list:mapi(fn : {int,A} -> B) -> List[B]
```

リスト関数の`map`のようなものは、関数を引数として取る高階関数です。
高階List関数の引数となる関数には以下のいずれかを指定できます：

1. Luaの通常の関数
2. 演算子の文字列（例：`"+"`。`src/terralist.lua`のopテーブルを参照）
3. オブジェクト上で呼び出すフィールドまたはメソッドを指定する文字列

例：

```lua
local mylist = List { a,b,c }
mylist:map("foo") -- 各要素に対してフィールドを選択：a.foo, b.foo, c.foo, など
                  -- a.fooが関数の場合、メソッドa:foo()として扱われる
```

高階関数への追加引数は、これらの関数に渡されます。これは、Luaのインライン関数の記述が冗長であるため、インライン関数を避けるためのものです。

```lua
local List = require("terralist")
List:isclassof(exp)
```

`exp`がリストであればtrueを返します。

```lua
terralib.israwlist(l)
```

`l`が連続する整数キー`1`から`N`まで（他のキーなし）のテーブルであればtrueを返します。

## Terra リフレクションAPI

すべてのTerraエンティティは、ファーストクラスのLuaオブジェクトでもあります。これにはTerraの[関数](#Functions)、[型](#Types)、[グローバル変数](#global_variables)が含まれます。[クォート](#quotes)は、Terraのクォーテーション構文（バッククォートや`quote`）によって返されるオブジェクトで、Terra関数内にはまだ含まれていないコードの断片を表します。[シンボル](#symbols)は変数に固有の名前を与えるもので、新しいパラメータやローカル変数を定義する際に使用されます。

Terra関数がLuaオブジェクトに変換できない値を返す場合、Terraの[値](#values)になります。これはLuaからアクセス可能なラッパーです（内部的にはLuaJITの`"cdata"`オブジェクトです）。

各オブジェクトには、操作用のLua APIが提供されています。例えば、関数の逆アセンブルを行う`terrafn:disas()`や、型の特性を問い合わせる`typ:isarithmetic()`といったメソッドがあります。

### ジェネリック

```lua
tostring(terraobj)
print(terraobj)
```

すべてのTerraオブジェクトにはデバッグ用の文字列表現が備わっています。

```lua
terralib.islist(t)
terralib.isfunction(t)
terralib.types.istype(t)
terralib.isquote(t)
terralib.issymbol(t)
terralib.ismacro(t)
terralib.isglobalvar(t)
terralib.islabel(t)
terralib.isoverloadedfunction(t)
```

特定のオブジェクトがTerraのクラス型であるかをチェックします。

```lua
terralib.type(o)
```

`type(o)`の拡張版で、次のように定義されています：

```lua
function terralib.type(t)
   if terralib.isfunction(t) then return "terrafunction"
   elseif terralib.types.istype(t) then return "terratype"
   elseif terralib.ismacro(t) then return "terramacro"
   elseif terralib.isglobalvar(t) then return "terraglobalvariable"
   elseif terralib.isquote(t) then return "terraquote"
   elseif terralib.istree(t) then return "terratree"
   elseif terralib.islist(t) then return "list"
   elseif terralib.issymbol(t) then return "terrasymbol"
   elseif terralib.isfunction(t) then return "terrafunction"
   elseif terralib.islabel(t) then return "terralabel"
   elseif terralib.isoverloadedfunction(t) then return "overloadedterrafunction"
   else return type(t) end
end
```

```lua
memoized_fn = terralib.memoize(function(a,b,c,...) ... end)
```

関数の結果をメモ化します。ある引数セットで関数が初めて呼び出されると、その引数での戻り値が計算されキャッシュされます。同じ引数での以後の呼び出し（Luaの等価性による）では、そのキャッシュされた値が返されます。テンプレート化された値（例：同じ`T`に対して毎回同じ`Vector(T)`型を返すべき場合）を生成する際に便利です。

### 関数

Terra関数は、Terraコードのエントリーポイントです。関数は定義済みまたは未定義である可能性があります (`myfunction:isdefined()`)。未定義の関数は型が既知ですが、実装がまだ提供されていません。関数が初めて実行されるまで、`myfunction:resetdefinition(another_function)`を使用して定義を変更できます。

```lua
[local] terra myfunctionname :: type_expression
[local] terra myfunctionname :: {int,bool} -> {int}
```

_Terra関数の宣言_。新しい未定義の関数を作成し、Lua変数`myfunctionname`に保存します。
オプションの`local`キーワードを使用する場合、`myfunctionname`は最初に新しいローカルLua変数として定義されます。`local`キーワードを使用しない場合、`myfunctionname`はテーブル指定子（例：`a.b.c`）として使うこともできます。

```lua
[local] terra myfunctionname(arg0 : type0,
                             ...
                             argN : typeN)
        [...]
end
```

_Terra関数の定義_。指定されたコード本体を使用して`myfunctionname`を定義します。`myfunctionname`が未定義の場合は既存の関数宣言に定義を追加し、それ以外の場合は新しい関数宣言を作成して定義を追加します。

```lua
local func = terralib.externfunction(function_name,function_type)
```

外部で定義された関数にバインドされたTerra関数を作成します。例：

```lua
local atoi = terralib.externfunction("atoi",{rawstring} -> {int})
```

```lua
myfunction(arg0,...,argN)
```

`myfunction`はTerra関数です。Luaから`myfunction`を呼び出します。未定義の関数に対して呼び出しを行うとエラーになります。引数は[Lua値からTerraへの変換規則](#converting-lua-values-to-terra-values-of-known-type)を使用してTerraに変換され、戻り値は[Terra値からLuaへの変換規則](#converting-terra-values-to-lua-values)に基づいて変換されます。

```lua
local b = func:isdefined()
```

関数に定義が存在する場合は`true`を返します。関数を定義するには、`func:adddefinition`、`func:resetdefinition`、または関数定義構文`terra func(...) ... end`を使用します。

```lua
local b = func:isextern()
```

この関数が`printf`のような外部シンボルにバインドされている場合は`true`を返します。外部関数は`terralib.includec`でC関数をインポートするか、`terralib.externfunction`を呼び出して作成されます。

```lua
func:adddefinition(another_function)
```

`func`の定義を`another_function`の現在の定義に設定します。`another_function`は定義されている必要があり、`func`は未定義でなければなりません。`func`と`another_function`の型は一致している必要があります。

```lua
func:resetdefinition(another_function)
```

`func`の定義を`another_function`の現在の定義に設定（またはリセット）します。`another_function`は定義されている必要があります。`func`は定義済みまたは未定義のどちらでもかまいません。すでにコンパイルされている関数に対してこのメソッドを呼び出すとエラーになります。

```lua
func:printstats()
```

この関数のコンパイルおよびJITにかかった時間などの統計を出力します。このメソッドを呼び出すと、関数がコンパイルされます。

```lua
func:disas()
```

すべての関数定義をx86アセンブリや最適化されたLLVM形式に逆アセンブルして出力します。パフォーマンスデバッグに役立ちます。このメソッドを呼び出すと関数がコンパイルされます。

```lua
func:printpretty([quote_per_line=true])
```

この関数のコードを視覚的に表現して出力します。デフォルトでは、元のコードの各部分を別の行として表示します。`quote_per_line`を`false`に設定すると、読みやすいようにコードがまとめて表示されます。

```lua
r0, ..., rn = myfunction(arg0, ... argN)
```

Luaから`myfunction`を呼び出します。引数は、Terra値とLua値を相互に変換するための[規則](#converting-between-lua-values-and-terra-values)に従って変換され、戻り値も同様にLua値に変換されます。このメソッドの呼び出しにより、関数が機械コードにコンパイルされます。

```lua
func:compile()
```

関数を機械コードにコンパイルします。この関数が必要とするすべての関数やグローバル変数も定義されていることを確認します。

```lua
function_type = func:gettype()
```

関数の[型](#types)を返します。`function_type.parameters`はパラメータの型リスト、`function_type.returntype`は戻り値の型です。複数の値を返す関数の場合、戻り値の型はタプルになります。

```lua
func:getpointer()
```

この関数の機械コードを指すLuaJITの`ctype`オブジェクトを返します。呼び出すと関数がコンパイルされます。

```lua
str = func:getname()
func:setname(str)
```

関数の見やすい名前を取得または設定します。生成されたコードを表示する際に役立ちますが、関数の動作には影響しません。

```lua
func:setinlined(bool)
```

`true`の場合、この関数は常にインライン化されます。`false`の場合、インライン化されません。デフォルトではLLVMの関数インライナーの裁量によりインライン化されます。

```lua
func:setoptimized(bool)
```

すべてのTerra関数はデフォルトで最適化されます（Clangの`-O3`に相当）。最適化を無効にするには`false`を渡します（Clangの`-O0`に相当）。

```lua
func:setcallingconv(string)
```

関数の呼び出し規約を設定します。デフォルトではLLVMのデフォルトの呼び出し規約が使用されます。有効な値は、[LLVMのテキストベースのアセンブリ言語](https://llvm.org/docs/LangRef.html#calling-conventions)で指定できるものと同じです（執筆時点では公式のLLVMドキュメントは不完全で、特にターゲット固有の呼び出し規約については[ソースコード](https://github.com/llvm/llvm-project/blob/llvmorg-13.0.0/llvm/lib/IR/AsmWriter.cpp#L289-L339)を直接参照する必要がある場合があります）。

### 型 (Types)

型オブジェクトはTerraオブジェクトの型を表す一級のLua値です。Terraの組み込み型システムは、Cのような低レベル言語の型システムに似ています。型コンストラクタ（例：`&int`）は有効なLua式であり、Terraの型オブジェクトを返します。リンクリストのような再帰型をサポートするために、[構造体](#exotypes-structs)はメンバーやメソッドが完全に指定される前に宣言できます。構造体が宣言されただけで定義されていない場合、それは「不完全」とみなされ、値としては使用できません。ただし、ポインタ算術が不要な限り、不完全型へのポインタは使用可能です。型が完全に指定される必要がある場合（例：コンパイルされた関数で使用される、またはその型のグローバル変数を割り当てる場合）に、「完全」となります。この時点で型の完全な定義が必要です。

```
int int8 int16 int32 int64
uint uint8 uint16 uint32 uint64
bool
float double
```

基本型（プリミティブ型）。

```
&typ
```

`typ`へのポインタを構築します。

```
typ[N]
```

`typ`型のインスタンスを`N`個持つ配列を構築します。`N`は正の整数である必要があります。

```lua
vector(typ,N)
```

`typ`型のインスタンスを`N`個持つベクトルを構築します。`N`は整数で、`typ`はプリミティブ型である必要があります。これらの型は[SSE](http://en.wikipedia.org/wiki/Streaming_SIMD_Extensions)のようなベクトル命令セットの抽象化です。

```lua
parameters -> returntype
```

関数ポインタを構築します。`parameters`および`returns`は、型のリスト（例：`{int,int}`）または単一の型（例：`int`）で指定できます。複数の値を返す場合、戻り値の型としてタプルが使用されます。

戻り値の型が`void`の場合は、空のタプル`{}`を使用します。

```lua
struct { field0 : type0, ..., fieldN : typeN }
```

ユーザー定義型またはエキソタイプを構築します。各`struct`の呼び出しは独自の型を生成します（[指名型システム](http://en.wikipedia.org/wiki/Nominative_type_system)を使用）。詳細は[エキソタイプ](#exotypes-structs)を参照してください。

```lua
tuple(type0, type1, ..., typeN)
```

タプルを構築します。これは`struct`の特別な型で、`type0`...`typeN`の値を`obj._0`...`obj._N`のフィールドとして保持します。通常の構造体と異なり、同じ引数を使った`tuple`の各呼び出しは同じ型を返します。

```lua
terralib.types.istype(t)
```

`t`が型であれば`true`を返します。

```lua
type:isprimitive()
```

`type`がプリミティブ型（上記参照）であれば`true`を返します。

```lua
type:isintegral()
```

`type`が整数型であれば`true`を返します。

```lua
type:isfloat()
```

`type`が`float`または`double`であれば`true`を返します。

```lua
type:isarithmetic()
```

`type`が整数型または浮動小数点型であれば`true`を返します。

```lua
type:islogical()
```

`type`が`bool`であれば`true`を返します（将来的に、ベクトル命令内のフラグに近いサイズのブール型をサポートする予定）。

```lua
type:canbeord()
```

`type`が`or`および`and`演算に使用できる場合（つまり整数型や論理型だが浮動小数点型ではない場合）、`true`を返します。

```lua
type:ispointer()
```

`type`がポインタであれば`true`を返します。`type.type`は指している型です。

```lua
type:isarray()
```

`type`が配列であれば`true`を返します。`type.N`は長さを、`type.type`は要素の型を表します。

```lua
type:isfunction()
```

`type`が関数（関数ポインタではない）であれば`true`を返します。`type.parameters`はパラメータ型のリスト、`type.returntype`は戻り値の型です。複数の値を返す関数の場合、戻り値の型はその値の`tuple`になります。

```lua
type:isstruct()
```

`type`が[構造体](#exotypes-structs)であれば`true`を返します。

```lua
type:ispointertostruct()
```

`type`が構造体へのポインタであれば`true`を返します。

```lua
type:ispointertofunction()
```

`type`が関数へのポインタであれば`true`を返します。

```lua
type:isaggregate()
```

`type`が配列または構造体であれば`true`を返します（任意の型を保持できる型です）。

```lua
type:iscomplete()
```

`type`が完全に定義され、コードで使用できる状態であれば`true`を返します。非集約型では常に`true`です。集約型の場合、その内部に含まれるすべての型が定義されていれば`true`となります。`type:complete()`を呼び出すと強制的に型が完全になります。

```lua
type:isvector()
```

`type`がベクトルであれば`true`を返します。`type.N`は長さ、`type.type`は要素の型です。

```lua
type:isunit()
```

`type`が空のタプルであれば`true`を返します。空のタプルは、戻り値を持たない関数の戻り値型としても使用されます。

```lua
type:(isprimitive|isintegral|isarithmetic|islogical|canbeord)orvector()
```

`type`が指定されたプロパティを持つプリミティブ型である場合、またはそのプリミティブ型を要素とするベクトル型である場合に`true`を返します。

```lua
type:complete()
```

型を強制的に完全にします。構造体の場合、構造体のレイアウトを計算し（定義されていれば`__getentries`や`__staticinitialize`を呼び出します）、この型が参照するすべての型を再帰的に完全にします。

```lua
type:printpretty()
```

型を出力し、構造体の場合はそのメンバーも含めて表示します。

```lua
terralib.sizeof(terratype)
```

`ffi.sizeof`のラッパーです。`terratype`を完全にして、そのサイズ（バイト単位）を返します。

```lua
terralib.offsetof(terratype,field)
```

`ffi.offsetof`のラッパーです。`terratype`を完全にして、`terratype`内の`field`のオフセット（バイト単位）を返します。

```lua
terralib.types.pointer(typ, [addrspace])
```

**実験的機能**。`&typ`の代替で、[LLVMアドレス空間](https://llvm.org/docs/LangRef.html#pointer-type)を指定することが可能です。非ゼロアドレス空間の意味はターゲット固有です。


### Quotes

Quotes（引用句）は、Terraの引用演算子（バッククォートおよび`quote ... in ... end`）によって返されるLuaオブジェクトです。これは関数にまだ挿入されていないTerraコードの断片（文や式）を表します。エスケープ演算子（`[...]`および`escape ... emit ... end`）を使うと、引用句を周囲のTerraコードに挿入できます。Quotesには、1つの式のみを生成する短い形式と、文や式を生成する長い形式があります。

```lua
quotation = `terraexpr
-- `記号で引用句を作成
```

引用句の短い形式です。バッククォート演算子により、1つのTerra式を含む引用句が作成されます。`terraexpr`には任意のTerra式を指定できます。`terraexpr`内にエスケープが含まれる場合、それは式が構築される際に評価されます。

```lua
quote
    terrastmts
end
```

引用句の長い形式です。`quote`演算子により、複数のTerra文を含む引用句が作成されます。この引用句は、Terraコード内で式または文が有効な場所に挿入できます。式のコンテキストで使用される場合、その型は空のタプルになります。

```lua
quote
    terrastmts
in
    terraexp1,terraexp2,...,terraexpN
end
```

長い`quote`構文には、いくつかの式を生成する`in`文をオプションで含めることができます。この`quote`がTerraコード内で式として挿入される場合、これらの式から構築されたタプルが値として返されます。

```lua
local a = quote
    var a : int = foo()
    var b : int = bar()
in
    a + b + b
end
terra f()
    var c : int = [a] -- 'a'はint型
end
```

```lua
terralib.isquote(t)
```

`t`が引用句であれば`true`を返します。

```lua
typ = quoteobj:gettype()
```

この引用句のTerra型を返します。

```lua
typ = quoteobj:astype()
```

この引用句をTerra型オブジェクトとして解釈しようとします。通常、型を引数として受け取る[マクロ](#macros)で使用されます（例：`sizeof([&int])`）。この関数は、`quote`オブジェクトを型に変換します（例：`&int`）。

```lua
bool = quoteobj:islvalue()
```

この引用句が代入の左辺（l-value）として使用可能であれば`true`を返します。

```lua
luaval = quoteobj:asvalue()
```

この引用句を単純なLua値として解釈しようとします。通常、定数を引数として受け取る[マクロ](#macros)で使用されます。特定の値のみで動作し、Constant式として利用可能な場合に限られます。生成コードに複雑なデータ構造を渡す場合、マクロよりもエスケープを使用することを検討してください。

```lua
quoteobj:printpretty()
```

この引用句内のコードの視覚表現を出力します。引用句は関数に挿入されるまで型チェックが行われないため、関数の型なしの表現が出力されます。

### Symbol

Symbol（シンボル）は、Terraの識別子の抽象的な表現です。変数の使用、定義、関数の引数、フィールド名、メソッド名、ラベルなど、識別子が期待される場所で使用できます（[エスケープ](#escapes)も参照）。LISPの`gensym`関数で返されるシンボルに似ています。

```lua
terralib.issymbol(s)
```

`s`がシンボルであれば`true`を返します。

```lua
symbol(typ,[displayname])
```

新しいシンボルを構築します。このシンボルは他のシンボルと一意になります。`typ`はシンボルの型で、`displayname`はエラーメッセージで表示される際のオプションの名前です。

### Values

LuaJITの[FFI API](http://luajit.org/ext_ffi.html)のラッパーを提供しており、Luaから直接Terraオブジェクトを割り当てたり操作したりできます。

```lua
terralib.typeof(obj)
```

`obj`のTerra型を返します。`obj`は、以前にTerra APIを使用して割り当てられたLuaJIT `ctype`である必要があります。または、Terra関数の戻り値として返されるものです。

```lua
terralib.new(terratype,[init])
```

LuaJITの`ffi.new`のラッパーです。型`terratype`の新しいオブジェクトを割り当てます。`init`はオプションの初期化子であり、Terra値とLua値の間での[変換ルール](#converting-between-lua-values-and-terra-values)に従います。このオブジェクトはLuaから到達不可能になるとガベージコレクションされます。

```lua
terralib.cast(terratype,obj)
```

`ffi.cast`のラッパーです。`obj`を`terratype`に変換し、Terra値とLua値の間での[変換ルール](#converting-between-lua-values-and-terra-values)に従います。

### グローバル変数

グローバル変数は、すべてのTerra関数で共有されるTerra値です。

```lua
global(type,[init,name,isextern,isconstant,addrspace])
global(init,[name,isextern,isconstant,addrspace])
```

型`type`と初期値`init`で新しいグローバル変数を作成します。`type`または`init`のどちらか一方は必須です。`type`が指定されない場合は、`init`から型を推定します。`init`が指定されない場合、グローバル変数は未初期化のままです。`init`は通常の変換[ルール](#converting-between-lua-values-and-terra-values)に従ってTerra値に変換されます。`init`が指定された場合、型は[完了](#types)されます。

`init`には[Quote](#quote)も指定でき、これは[定数式](#constants)として扱われ、グローバル変数の初期化に使用されます。`name`はデバッグ用の名前です。

`isextern`が`true`の場合、このグローバル変数は外部で定義された変数`name`にバインドされます。

`isconstant`が`true`の場合、グローバル変数の内容は定数として扱われます。

`addrspace`が`nil`でない場合、グローバルは対応する[LLVMアドレス空間](https://llvm.org/docs/LangRef.html#pointer-type)に配置されます。非ゼロのアドレス空間の意味はターゲットによって異なるため注意が必要です。

```lua
globalvar:getpointer()
```

メモリ内でこのグローバル変数へのポインタである`ctype`オブジェクトを返します。型を[完了](#types)します。

```lua
globalvar:get()
```

このグローバル変数の値をLuaJITの`ctype`オブジェクトとして取得します。型を[完了](#types)します。

```lua
globalvar:set(v)
```

`v`を通常の変換[ルール](#converting-between-lua-values-and-terra-values)に従ってTerra値に変換し、グローバル変数に設定します。型を[完了](#types)します。

```lua
globalvar:setname(str)
str = globalvar:getname()
```

このグローバル変数のデバッグ名を設定または取得します。これはデバッグに役立ちますが、グローバル変数の動作には影響しません。

```lua
typ = globalvar:gettype()
```

グローバル変数のTerra型を取得します。

```lua
globalvar:setinitializer(init)
```

このグローバル変数の初期化式を設定または変更します。グローバル変数がコンパイルされる前にのみ有効です。例えば、クラスのvtableを格納するグローバル変数の場合、クラスにメソッドを追加するたびに値を追加することができます。

### 定数

Terra定数は、Terraコードで使用される定数値を表します。例えば、`sin`関数の[ルックアップテーブル](http://en.wikipedia.org/wiki/Lookup_table)を作成する場合、まずLuaで値を計算し、これらの値を格納する定数のTerra配列を作成することができます。コンパイラはこの配列が定数であることを認識して、より積極的な最適化を行うことができます。

```lua
constant([type],init)
```

新しい定数を作成します。`init`は通常の変換[ルール](#converting-between-lua-values-and-terra-values)に従ってTerra値に変換されます。オプションの[type](#types)が指定されると、`init`はその型に明示的に変換されます。型を[完了](#types)します。

`init`にはTerraの[quote](#quotes)オブジェクトも指定可能です。この場合、quoteは_定数初期化式_として扱われます。

```lua
local complexobject = constant(`Complex { 3, 4 })
```

定数式は、Terra式のサブセットであり、その値がコンパイル後に確定されるもので、LLVMの定数式の概念におおむね対応します。例えば、関数ポインタの値のように、事前に確定できないものも含まれます。

```lua
terra a() end
terra b() end
terra c() end
-- a, b, cを含む関数ポインタの配列
local functionarray = const(`array(a,b,c))
```

```lua
terralib.isconstant(obj)
```

`obj`がTerra定数であれば`true`を返します。

### ラベル

ラベルは、`goto`文などで使用できる抽象的なコード位置です。シンボルのように、ラベルの値を使ってプログラムでコード位置を生成できます。

```lua
terralib.islabel(l)
```

`l`がラベルであれば`true`を返します。

```lua
label([displayname])
```

新しいラベルを構築します。このラベルは他のラベルと一意で、`displayname`が同じでも異なるラベルとみなされます。`displayname`はエラーメッセージに表示されるオプションの名前です。

### マクロ

マクロを使用すると、型チェック中にコンパイラにカスタムの動作を挿入できます。コンパイル時に実行されるため、コンパイラに戻る際は[非同期コンパイル](#asynchronous-compilation)を考慮する必要があります。

```lua
macro(function(arg0,arg1,...,argN) [...] end)
```

新しいマクロを作成します。この関数はTerraコード内の各呼び出し時にコンパイル時に呼び出されます。各引数は、マクロに対して引数として渡されるTerraの[quote](#quote)です。例えば、`mymacro(a,b,foo())`の呼び出しは、マクロへの引数として3つのquoteを生成します。マクロは単一の値を返し、その値はコンパイル時の変換[ルール](#converting-between-lua-values-and-terra-values)を使用してTerraオブジェクトに変換されます。

```lua
terralib.ismacro(t)
```

`t`がマクロであれば`true`を返します。

### ビルトインマクロ

Terraには以下のビルトインマクロが用意されています。

```lua
terralib.intrinsic(name, type)
```

指定した`name`と`type`に対応するLLVMの組み込み関数を呼び出すTerra関数を返します。たとえば、LLVMは`sqrt`に以下のような組み込み関数を提供しています。

```lua
local sqrt = terralib.intrinsic("llvm.sqrt.f32", float -> float)
```

これで`sqrt`を呼び出せるようになり、ターゲットプラットフォーム向けに効率的なコードが生成されます。

なお、使用できる組み込み関数のセットはLLVMのバージョンやターゲットプラットフォームによって異なり、Terra側で制御することはできません。

```lua
terralib.attrload(addr, attrs)
```

`addr`のアドレスから`attrs`属性付きでデータを読み込みます。`attrs`は以下のキーを含むリテラルテーブルで指定します。

- `nontemporal`（任意）: `true`の場合、読み込みが非一時的になります。
- `align`（任意）: `addr`のアライメントを指定します。
- `isvolatile`（任意）: `true`の場合、`addr`の内容が揮発性であると見なされます。

以下の例では、`attrload`が`123`を返します。

```lua
var i = 123
terralib.attrload(&i, { align = 1 })
```

```lua
terralib.attrstore(addr, value, attrs)
```

`addr`のアドレスに`value`の値を`attrs`属性付きで書き込みます。属性の指定方法は`attrload`と同じです。

```lua
terralib.fence(attrs)
```

**実験的機能**。フェンス操作を発行します。指定した属性によって、フェンスを境にした原子命令の順序変更を防ぎます。この操作の意味は[LLVM](https://llvm.org/docs/LangRef.html#fence-instruction)によって決まります。

以下の属性が指定可能です（使用できる属性のセットは各原子操作によって異なります）。

- `syncscope`（任意）: [LLVM syncscope](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)を指定します。多くの値はターゲット固有です。
- `ordering`（必須）: [LLVM memory ordering](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)を指定します。

```lua
terralib.cmpxchg(addr, cmp, new, attrs)
```

**実験的機能**。アドレス`addr`での原子比較交換（cmpxchg）操作を実行します。`addr`の値が`cmp`と同じ場合、`new`の値が書き込まれます。違う場合、値は変更されません。`addr`の元の値と交換が成功したかどうかを示すブール値のタプルを返します。

使用できる属性は次の通りです（原子操作によって使用できる属性が異なります）。

- `syncscope`（任意）: [LLVM syncscope](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)。
- `success_ordering`（必須）: 交換が成功した場合に適用する[LLVM memory ordering](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)。
- `failure_ordering`（必須）: 交換が失敗した場合に適用するLLVMメモリ順序。
- `align`（任意）: `addr`のアライメント。`attrload`と異なり、`align`の値は`addr`の内容のサイズ以上でなければなりません（[詳細はこちら](https://llvm.org/docs/LangRef.html#cmpxchg-instruction)）。
- `isvolatile`（任意）: `true`の場合、`addr`の内容が揮発性であると見なされます。
- `isweak`（任意）: `true`の場合、偽の失敗を許可します。交換条件が一致しても書き込まれないことがあります。

以下の例では、最初の`cmpxchg`は失敗し、`{1, false}`を返しますが、2番目は成功し`{1, true}`を返します。最終的な`i`の値は`4`になります。

```lua
var i = 1
terralib.cmpxchg(&i, 2, 3, {success_ordering = "acq_rel", failure_ordering = "monotonic"})
terralib.cmpxchg(&i, 1, 4, {success_ordering = "acq_rel", failure_ordering = "monotonic"})
```

```lua
terralib.atomicrmw(op, addr, value, atomicattrs)
```

**実験的機能**。`addr`のアドレスで`value`値と演算子`op`を使用した原子読み書き操作（RMW）を実行します。操作は原子的に行われます。`addr`の元の値を返します。

使用可能な操作は[LLVMのドキュメント](https://llvm.org/docs/LangRef.html#atomicrmw-instruction)に指定されています。`fadd`および`fsub`操作は浮動小数点型を必要とし、ほとんどの操作は整数型またはポインタ型を必要とします。使用できる操作のセットはLLVMのバージョンやターゲットプラットフォームに依存することがあります。

指定可能な属性は次の通りです（原子操作によって使用できる属性が異なります）。

- `syncscope`（任意）: [LLVM syncscope](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)。
- `ordering`（必須）: [LLVM memory ordering](https://llvm.org/docs/LangRef.html#atomic-memory-ordering-constraints)。
- `align`（任意）: `addr`のアライメント。`attrload`とは異なり、`align`の値は`addr`の内容のサイズ以上でなければなりません（[詳細はこちら](https://llvm.org/docs/LangRef.html#atomicrmw-instruction)）。
- `isvolatile`（任意）: `true`の場合、`addr`の内容が揮発性と見なされます。

以下の例では、`atomicrmw`が`i`に`21`を書き込み、元の値`1`を返します（シングルスレッドの場合）。

```lua
var i = 1
terralib.atomicrmw("add", &i, 20, {ordering = "acq_rel"})
```

### Exotypes（構造体）

Terraでは、ユーザー定義の集約型を「exotype」と呼びます。これは、Lua APIを使ってTerraの外部で定義されるためです。この設計は、ユーザー定義型の振る舞いを定義するための基本的なメカニズムを提供することを目的としており、言語固有のポリシーを強制することはありません。このため、JavaやC++のようなポリシーベースのクラスシステムを、これらのメカニズムを基にライブラリとして作成することができます。簡潔さと親しみやすさのために、これらの型を言語内で「struct」というキーワードで表現します。

また、一般的なケースに対しては、exotypeの定義用のシンタックスシュガーも提供しています。このセクションでは、まずLua API自体について説明し、その後、シンタックスシュガーがどのようにAPIに変換されるかを示します。

この設計の背景については、[公開資料](publications.html)で詳しく説明しています。

### Lua API

新しいユーザー定義型は次の呼び出しで作成します。

```lua
mystruct = terralib.types.newstruct([displayname])
```

`displayname`はエラーメッセージに表示される任意の名前ですが、`newstruct`を呼び出すたびに名前に関係なくユニークな型が作成されます（Terraでは[指名型システム](http://en.wikipedia.org/wiki/Nominative_type_system)が使用されています）。この型はTerraプログラム内で次のように利用できます。

```lua
terra foo()
    var a : mystruct -- mystruct型のインスタンス
end
```

この型がTerraプログラムで使用される際のメモリレイアウトと動作は、型の`metamethods`テーブルに*プロパティ関数*を設定することで定義されます。

```lua
mystruct.metamethods.myproperty = function ...
```

Terraの型チェッカーが型に関する情報を知る必要があるとき、型の`metamethods`テーブルにあるプロパティ関数を呼び出します。プロパティが設定されていない場合、デフォルトの動作が適用されます。各プロパティの詳細については個別に説明されます。

`metamethods`で設定できるフィールドは以下の通りです。

```lua
entries = __getentries(self)
```

構造体内のフィールドを計算によって決定する_Lua_関数です。構造体内のエントリリストが最初に必要になると、コンパイラは`__getentries`関数を1度だけ呼び出します。この呼び出し時点では型がまだ完全でないため、このメソッドで型の完全性が必要な操作を行うとエラーになります。`entries`はフィールドエントリの[List](#list)です。各フィールドエントリは以下のいずれかです：

- `{ field = stringorsymbol, type = terratype }` 形式のテーブルで、名前付きフィールドを指定します。
- `{stringorsymbol, terratype}` 形式のテーブルで、名前付きフィールドを指定します。
- 一連の[List](#list)フィールドエントリで、同じメモリを共有するunionとして割り当てられます。

デフォルトでは、`__getentries`は`self.entries`テーブルを返します。これは`struct`定義シンタックスで設定されます。

```lua
method = __getmethod(self, methodname)
```

構造体のメソッドを検索する_Lua_関数です。コンパイラが`mystruct:mymethod(...)`のメソッド呼び出しや`mystruct.mymethod`の静的メソッド参照を検出したときに呼び出されます。`mymethod`は文字列または[symbol](#symbol)で指定可能です。このメタメソッドは、この型での`methodname`の静的な呼び出しごとにコンパイラによって呼び出されます。同じ`methodname`に対して複数回呼ばれる可能性があるため、高コストの操作は呼び出しごとにメモ化して使い回すべきです。

`method`には、Terra関数、Lua関数、またはコンパイル時に実行される[マクロ](#macro)を指定できます。

たとえば、`__getmethod`が`method`を返す場合、Terraコード内の式`myobj:mymethod(arg0, ...argN)`は、`myobj`の型が`T`の場合に`[method](myobj, arg0, ..., argN)`に変換されます。

もし`myobj`の型が`&T`の場合は、`[method](@myobj, arg0, ..., argN)`に展開されます。メソッドが呼び出された際に`myobj`の型が`T`であり、形式パラメータの型が`&T`である場合、引数はアドレスを取得してポインタに自動的に変換されます。この「メソッド受信キャスト」により、メソッド呼び出しでオブジェクトを変更可能にします。

デフォルトでは、`__getmethod(self, methodname)`は`self.methods[methodname]`を返し、これはメソッド定義のシンタックスシュガーで設定されます。メソッドテーブルにメソッドが含まれていない場合、型チェッカーは以下で説明する`__methodmissing`を呼び出します。

```lua
__staticinitialize(self)
```

型が完全になった後、コンパイラがユーザー定義コードに戻る前に呼ばれる_Lua_関数です。型が完全であるため、`terralib.offsetof`を使ってオフセットを調べたり、仮想関数テーブル（vtables）を作成したりといった、完全な型を必要とする操作を行うことができます。構造体内のエントリに対する静的初期化子は、構造体自体の静的初期化子よりも先に実行されます。

```lua
castedexp = __cast(from, to, exp)
```

型間の変換を定義する_Lua_関数です。`from`は`exp`の型で、`to`は必要な型です。`mystruct`型について、`__cast`は`from`または`to`のどちらかが`mystruct`または`&mystruct`型の場合に呼び出されます。有効な変換がある場合、このメソッドは`castedexp`（`exp`を`to`に変換する式）を返すべきです。変換できない場合は、`error`関数を使って説明的なエラーメッセージを出力する必要があります。Terraコンパイラは、適用可能な`__cast`メタメソッドを見つけるまで試行します（つまり、`error`を呼び出さないものを探します）。

```lua
__for(iterable, body)
```

**実験的機能。** 指定した型を反復処理するためのループを生成する_Lua_関数です。`iterable`の値は指定された型の値を生成する式になります。`body`はループ変数を受け取り、1回のループ処理を実行するLua関数です。**`iterable`と`body`の引数は複数回の評価から保護される必要があります。** `__for`メタメソッドの結果は引用句（quote）でなければなりません。

例として、単純な`Range`型の実装は以下のようになります：

```lua
struct Range {
    a : int
    b : int
}
Range.metamethods.__for = function(iter, body)
    return quote
        var it = iter
        for i = it.a, it.b do
            [body(i)]
        end
    end
end
```

```lua
__methodmissing(mymethod, myobj, arg1, ..., argN)
```

メソッドが`myobj:mymethod(arg0, ..., argN)`として呼び出され、`__getmethod`が設定されていない場合、メソッドテーブルに`mymethod`が存在しなければマクロ`__methodmissing`が呼び出されます。このマクロはメソッド呼び出しの代わりに使用されるTerraの[quote](#quote)を返すべきです。

```lua
__entrymissing(entryname, myobj)
```

`myobj`が`entryname`フィールドを含まない場合、型チェッカーが`myobj.entryname`式を検出すると`__entrymissing`が呼び出されます。これはマクロでなければならず、フィールドの代わりに使用されるTerraの[quote](#quote)を返す必要があります。

カスタム演算子：

```lua
__sub, __add, __mul, __div, __mod, __lt, __le, __gt, __ge,
__eq, __ne, __and, __or, __not, __xor, __lshift, __rshift,
__select, __apply
```

これらはTerraメソッドまたはマクロとして指定できます。指定した型でこれらの演算子が使用されたときに呼び出されます。`__apply`は関数適用に、`__select`は`terralib.select`に使用されます。二項演算子の場合、少なくとも引数の1つが`mystruct`型である必要があります。カスタム演算子のインターフェースは十分なテストが行われておらず、変更される可能性があります。

```lua
__typename(self)
```

型の名前を生成する_Lua_関数です。この名前はエラーメッセージや`tostring`で使用されます。

#### 構文シュガー

```lua
[local] struct mystruct
```

_構造体の宣言_ `mystruct`がまだTerraの構造体でない場合、`terralib.types.newstruct("mystruct")`を呼び出し、新しい構造体を作成してLua変数`mystruct`に格納します。`mystruct`が既に構造体の場合は、変更は行いません。オプションの`local`キーワードが使用される場合、`mystruct`はまず新しいローカルのLua変数として定義されます。`local`キーワードなしで使用する場合、`mystruct`はテーブルの指定子（例: `a.b.c`）にすることができます。

```lua
[local] struct mystruct {
    field0 : type0;
    ...
    union {
        fieldUnion0 : type1;
        fieldUnion1 : type2;
    }
    ...
    fieldN : typeN;
}
```

_構造体の定義_ `mystruct`がまだ構造体でない場合、構造体の宣言の動作に従い新しい構造体を作成します。次に、定義の本体で指定されたフィールドと型を使用して構造体の`entries`テーブルを埋めます。`union`ブロックを使用して、一連のフィールドがメモリ内の同じ位置を共有することを指定できます。`mystruct`が以前に定義されている場合、再定義はエラーになります。

```lua
terra mystruct:mymethod(arg0 : type0,..., argN : typeN)
    ...
end
```

_メソッド定義_ `mystruct.methods.mymethod`がTerra関数でない場合、それを作成します。その後、メソッド定義を追加します。`&mystruct`型の`self`という仮引数が、仮引数リストの先頭に追加されます。

### オーバーロード関数

オーバーロード関数は通常の関数とは別のオブジェクトであり、API呼び出しを使用して作成します。

```lua
local addone = terralib.overloadedfunction("addone",
              { terra(a : int) return a + 1 end,
                terra(a : double) return a + 1 end })
```

また、後でメソッドを追加することもできます。

```lua
addone:adddefinition(terra(a : float) return a + 1 end)
```

通常の関数とは異なり、オーバーロード関数はLuaから直接呼び出すことはできません。

```lua
overloaded_func:getdefinitions()
```

この関数の定義の[リスト](#lists)を返します。

### エスケープ（Escapes）

エスケープは[マルチステージプログラミング](http://www.cs.rice.edu/~taha/MSP/)から取り入れられた特殊な構文で、Luaを使用してTerraの式を生成できるようにします。エスケープは角括弧（ブラケット）構文を使って作成され、1つのLua式（例: `[ 4 + 5 ]`）を含みます。このLua式は、周囲のTerraコードが_定義_されるときに評価されます（注: これは、関数が_コンパイル_されるときに実行される[マクロ](#macros)とは異なります）。エスケープはTerraコードのレキシカルスコープ内で評価され、周囲のLuaスコープの識別子に加え、Terraコード内で定義された識別子も含まれます。これらの識別子はLuaコード内で[シンボル](#symbol)として表現されます。以下のエスケープ例では、

```lua
terra foo(a : int)
    var b = 4
    return [dosomething(a,b)]
end
```

`dosomething`に渡される引数`a`と`b`は、Terraコード内で定義された変数への参照としての[シンボル](#symbols)になります。

また、識別子やテーブル選択のエスケープに対して構文シュガーも提供されています。例えば、Terraの式`ident`はエスケープ`[ident]`として扱われ、テーブルの選択`a.b.c`は、`a`と`b`がLuaテーブルである場合にエスケープ`[a.b.c]`として扱われます。

```lua
terra foo()
    return [luaexpr],4
end
```

`[luaexpr]`は単一式のエスケープです。`luaexpr`は関数が_定義_されるときにLuaの値に評価される単一のLua式です。評価されたLua式は、コンパイル時の変換[ルール](#converting-between-lua-values-and-terra-values)を使用してTerraオブジェクトに変換されます。変換がTerra値のリストを生成した場合、リストは1つの値に切り詰められます。

```lua
terra foo()
    bar(3,4,[luaexpr])
end
```

`[luaexpr]`は複数式のエスケープであり、式リストの最後の式として発生します。単一式エスケープと同様の動作をしますが、`luaexpr`の変換が複数のTerra式を生成した場合、これらの値は式リストの末尾に追加されます（この場合、`bar`の呼び出しの引数リストに追加されます）。

```lua
terra foo()
    [luaexpr]
    return 4
end
```

`[luaexpr]`は文のエスケープです。この形式は複数式エスケープと同様の動作をしますが、Terra文の[クオート](#quote)を返すことも可能です。`luaexpr`の変換がTerra値のリストを生成した場合、すべてが現在のブロックに挿入されます。

```lua
terra foo([luaexpr] : int)
    var [luaexpr] = 4
    mystruct.[luaexpr]
end
```

各`[luaexpr]`は識別子のエスケープの例です。`luaexpr`は[シンボル](#symbol)を生成する必要があります。フィールド選択子（`a.[luaexpr]`）、メソッド（`a:[luaexpr]()`）またはラベル（`goto [luaexpr]`）に対して、`luaexpr`は文字列も生成できます。この形式は、プログラム的に識別子を定義することを可能にします。シンボルが明示的に定義された型を持つ場合、変数の型が明示的に指定されていない限り、変数はシンボルの型を取ります。たとえば、シンボルを構築する場合（`foo = symbol(int)`）、`var [foo]`は`int`型となり、`var [foo] : float`は`float`型になります。

```lua
terra foo(a : int, [luaexpr])
end
```

`[luaexpr]`は識別子リストのエスケープです。この場合、単一識別子のエスケープと同様に動作しますが、明示的に型指定されたシンボルのリストも返すことができ、パラメータリストに追加されます。

## TerraでCを使用する

Terraは[Clang](http://clang.llvm.org)フロントエンドを利用して、TerraコードをCとの後方互換性を持つようにしています。この機能は現在、Cヘッダーファイルから関数、型、およびenumをインポートすることが可能です。また、次のように数値のみのマクロ定義もインポートできます。

```c
#define FOO 1
```

ただし、現時点ではグローバル変数や定数のインポートはサポートされていません。これについては将来の改善を予定しています。

```lua
table = terralib.includecstring(code,[args,target])
```

文字列`code`をCコードとしてインポートします。含まれるC関数の名前をTerraの[関数](#function)オブジェクトに、Cの型（typedefなど）をTerraの[型](#types)に対応するLuaテーブルを返します。Lua変数`terralib.includepath`を使って、追加のヘッダー検索パスを指定できます。これはセミコロンで区切られたディレクトリのリストです。`args`はオプションで、Clangに渡すフラグのリスト（例：`includecstring(code, "-I", "..")`）です。`target`は指定されたターゲット用にヘッダーを正しくインポートするための[ターゲット](#targets)オブジェクトです。

```lua
table = terralib.includec(filename,[args,target])
```

`includecstring`と似ていますが、Cコードが`filename`から読み込まれます。これはClangのデフォルトのヘッダーファイル検索パスを使用します。`...`を使用して、Clangに追加の引数を渡すことができます（さらに検索するディレクトリを含めることも可能です）。

```lua
terralib.linklibrary(filename)
```

ファイル`filename`にある動的ライブラリを読み込みます。`includec`でインポートしたヘッダーファイルに含まれる宣言の定義がTerraが実行されている実行ファイルにリンクされていない場合、`linklibrary`で定義を動的に読み込む必要があります。この状況は、外部ライブラリを`terra`のREPL/ドライバーアプリケーションで使用するときに発生します。

```lua
local llvmobj = terralib.linkllvm(filename)
local sym = llvmobj:extern(functionname,functiontype)
```

LLVMビットコードファイル`filename`を`.bc`拡張子でリンクし、`clang`または`clang++`で生成します：

```sh
clang++ -O3 -emit-llvm -c mycode.cpp -o mybitcode.bc
```

このコードは機械語ではなくビットコードとして読み込まれるため、より強力な最適化（例：関数呼び出しのインライン化）が可能ですが、機械語にコンパイルするためTerraでの初期化に時間がかかります。このビットコードファイルから関数を抽出するには、関数名とTerra相当の型（例：`int -> int`）を指定して`llvmobj:extern`メソッドを呼び出します。

## Luaの値とTerraの値の変換

Terraコードをコンパイルまたは実行する際、TerraとLua間で値を変換する必要があります。内部的には、この変換はLuaJITの[外国関数インターフェース（FFI）](http://luajit.org/ext_ffi.html)を基にして実装され、Luaから直接C関数の呼び出しやC値の使用が可能です。Terraの型システムはCに似ているため、このインフラストラクチャをほとんど再利用できます。

#### 既知の型のLua値をTerra値に変換する

Lua値をTerraに変換する際、期待される型がわかっている場合（例：`terralib.cast`や`terralib.constant`で型が指定されているとき）は、LuaJITの[変換セマンティクス](http://luajit.org/ext_ffi_semantics.html#convert-fromlua)に従い、各Terra型に相当するC型に変換されます。

#### 型が不明なLua値をTerra値に変換する

Lua値が[エスケープ](#escapes)を介してTerraコードから直接使用されたり、型指定なしでTerra値が作成される（例：`terralib.constant(3)`）場合、オブジェクトの型を推定しようとします。成功した場合、通常の変換が適用されます。`type(value)`が次の場合に適用される型は次の通りです：

* `cdata` -- Terra APIから以前に割り当てられた、またはTerraコードから返されたものであれば、オブジェクトの`ctype`に相当するTerra型に変換されます。
* `number` -- `floor(value) == value`かつ値が`int`に収まる場合は`int`、そうでなければ`double`型とみなされます。
* `boolean` -- `bool`型になります。
* `string` -- `rawstring`（すなわち`&int8`）に変換されます。将来的には特別な文字列型を追加する可能性があります。
* その他 -- 型を推定できません。オブジェクトの型がわかっている場合は、`terralib.cast`関数を使用して指定することができます。

#### コンパイル時の変換

Luaの値がTerra関数内の[エスケープ](#escapes)演算子の結果として使用される場合、以下の追加変換が許可されます：

* [グローバル変数](#global-variable) — 値がTerraコード内でグローバル変数へのlvalue参照となります。
* [シンボル](#symbol) — シンボルを使って定義された変数へのlvalue参照になります。変数がスコープ内にない場合、コンパイル時エラーが発生します。
* [引用](#quote) — 引用内で定義されたコードがTerraコードにスプライスされます。引用がステートメントのみを含む場合、ステートメントの位置にのみスプライス可能です。
* [定数](#constant) — 定数がTerraコードにスプライスされます。
* Lua関数 — 関数呼び出しで使用される場合、Lua関数は`terralib.cast`で戻り値のないTerra関数型に変換され、実際のパラメータのTerra型が使用されます。関数呼び出し以外ではエラーとなります。
* [マクロ](#macro) — 関数呼び出しとして使用される場合、コンパイル時に実行され、結果はコンパイル時変換ルールでTerraに変換され、指定された位置にスプライスされます。
* [型](#types) — マクロ呼び出しの引数として使用される場合、そのまま渡され、`arg:astype()`呼び出しが値を返します。関数呼び出しとして使用された場合（例：`[&int](v)`）、その型への明示的なキャストとして動作します。
* [リスト](#list) または`terralib.israwlist`で分類された生リスト — リストの各メンバーはコンパイル時変換を用いて再帰的にLua値に変換されます（リストの変換は除く）。ステートメントや複数の式がある場合、リストのすべての値がスプライスされます。単一の式のみが許可される場合、リストは1つの値に切り詰められます。
* `cdata` 集合体（構造体や配列） — Lua `cdata`集合体のTerra型`T`がTerraコード内で直接参照される場合、その値はLuaで割り当てられたメモリにある集合体へのlvalue参照となります。
* その他 — 値はまず標準的なLuaからTerraへの変換ルールでTerra値に変換され、結果の値が_定数_としてスプライスされます。

#### Terra値からLua値への変換

Terra値をLua値に変換する場合（例えば関数呼び出しの結果から）、LuaJITの[C型からLuaオブジェクトへの変換セマンティクス](http://luajit.org/ext_ffi_semantics.html#convert-tolua)に従います。各Terra型に相当するC型に置き換えられ、`cdata`オブジェクトの場合はTerraの[値API](#values)で利用可能です。

## Terraコードの読み込み

これらの関数を使って、実行時に混在するTerra-Luaコードのチャンクを読み込むことができます。

```lua
terralib.load(readerfn)
```

C APIの`terra_load`と同等のLua関数です。`readerfn`はLuaの`load`関数と同じ動作をします。

```lua
terralib.loadstring(s)
```

C APIの`terra_loadstring`と同等のLua関数です。

```lua
terralib.loadfile(filename)
```

C APIの`terra_loadfile`と同等のLua関数です。

```lua
require(modulename)
```

Terraコードモジュール`modulename`を読み込みます。Luaの`package.loaders`にTerraコードをモジュールとしてロードするための追加コードローダーが登録されています。`require`はまず、以前に`require`を使ってロードされた`modulename`があるかを確認し、存在する場合はそれを返します。存在しない場合は、`package.terrapath`でモジュールを検索します。`package.terrapath`はセミコロンで区切られたテンプレートリストです。例：

```lua
"lib/?.t;./?.t"
```

`modulename`は、`.`をディレクトリセパレータ`/`に置き換えてパスに変換されます。そして、ファイルが見つかるまで各テンプレートが試されます。例えば、このパスを使用すると、`require("foo.bar")`は`lib/foo/bar.t`または`foo/bar.t`をロードしようとします。ファイルが見つかると、そのファイルに対する`terralib.loadfile`呼び出しの結果が返されます。デフォルトでは、`package.terrapath`は環境変数`TERRA_PATH`に設定されます。`TERRA_PATH`が設定されていない場合、`package.terrapath`にはデフォルトのパス（`./?.t`）が含まれます。`TERRA_PATH`内の`;;`は存在する場合、デフォルトパスに置き換えられます。

通常のLuaコードも`require`を使ってインポートされることに注意してください。`package.path`（環境変数`LUA_PATH`）は純粋なLuaコードのロードに使用され、`package.terrapath`（環境変数`TERRA_PATH`）はLua-Terraコードのロードに使用されます。

## コンパイルAPI

### Terraコードの保存

```lua
terralib.saveobj(filename [, filetype], functiontable[, arguments, target, optimize])
```

Terraコードを外部ファイル形式（オブジェクトファイルや実行ファイルなど）に保存します。`filetype`には、`"object"`（オブジェクトファイル `*.o`）、`"asm"`（アセンブリファイル `*.s`）、`"bitcode"`（LLVMビットコード `*.bc`）、`"llvmir"`（LLVMテキストIR `*.ll`）、または`"executable"`（拡張子なし）のいずれかを指定できます。`filetype`が省略された場合、拡張子から自動的に推測されます。

`functiontable`は文字列からTerra関数へのテーブルで、これらの関数が指定された名前で出力されるコードに含まれます。`arguments`はリンク時に渡される追加のフラグリストで、`filetype`が`"executable"`の場合に使用されます。`filename`が`nil`の場合、ファイルはメモリ内に書き込まれ、Lua文字列として返されます。

別のアーキテクチャ用にオブジェクトをクロスコンパイルする場合は、ターゲットアーキテクチャを説明する[target](#targets)オブジェクトを指定できます。指定がない場合、`saveobj`はネイティブアーキテクチャを使用します。

デフォルトでは、`saveobj`はClangの`-O3`相当の最適化でコードをコンパイルします。`optimize`の設定で最適化を無効にしたり、安全でない高速数学の最適化を追加で有効にしたりできます。`optimize`の値は次の通りです：

* `true` または `false`：最適化を有効/無効にする（`-O3`相当）。デフォルトは有効です。高速数学最適化は含まれません。
* `{optimize = ..., fastmath = ...}`：最適化プロファイルを指定するテーブル。`optimize`キーは前述の`true`または`false`（指定しない場合はデフォルトで`true`）。`fastmath`の可能な値は以下で説明します。

`fastmath`キーには以下のいずれかの値を指定できます：

* `true` または `false`：すべての[LLVM高速数学フラグ](https://llvm.org/docs/LangRef.html#fast-math-flags)を有効/無効にします（デフォルトは`false`）。
* `"flag"`：単一の高速数学フラグを指定し、それだけを有効化。他のフラグは無効。
* `{"flag1", "flag2"}`：複数のフラグをリストとして指定し、リスト内のフラグをすべて有効化。他のフラグは無効。

LLVMの高速数学フラグの一覧は[こちら](https://llvm.org/docs/LangRef.html#fast-math-flags)から確認できます。利用可能なフラグはLLVMのバージョンに依存し、Terraの管理外です。

例：

```lua
terralib.saveobj("a.o", {main=main}, nil, nil, false) -- 最適化を無効化。
terralib.saveobj("a.o", {main=main}, nil, nil, {fastmath=true}) -- 全ての高速数学最適化を有効化。
terralib.saveobj("a.o", {main=main}, nil, nil, {fastmath={"contract", "nnan"}}) -- contractとnnanを有効化。
```

### ターゲット

`terralib.saveobj`や`terralib.includec`は、コードを異なるアーキテクチャ用にコンパイルするためのターゲットオブジェクトをオプションで受け取ります。これによりクロスコンパイルが可能になります。例えば、x86マシンを使ってRaspberry Pi用にARMコードをコンパイルするには、次のようにターゲットオブジェクトを作成します：

```lua
local armtarget = terralib.newtarget {
    Triple = "armv6-unknown-linux-gnueabi"; -- LLVMターゲットトリプル
    CPU = "arm1176jzf-s";,  -- LLVM CPU名
    Features = ""; -- LLVMの特徴文字列
    FloatABIHard = true; -- ARM用に浮動小数点レジスタを使用
}
```

テーブル内の`Triple`フィールド以外のエントリはオプションです。設定する文字列に関する詳細情報は、[clangのドキュメント](http://clang.llvm.org/docs/CrossCompilation.html)で確認できます。

## デバッグ

Terraにはコードのデバッグやパフォーマンスチューニングに役立つライブラリ関数がいくつか用意されています。`currenttimeinseconds`以外のデバッグ機能は、OSXおよびLinuxでのみ使用可能です。

```lua
terralib.currenttimeinseconds()
```

過去のある時点からの経過時間を秒で返すLua関数です。Terraコードのパフォーマンスチューニングに便利です。

```lua
terra terralib.traceback(uctx : &opaque)
```

Terraコードから呼び出してスタックトレースを出力するTerra関数です。`uctx`が`nil`の場合は現在のスタックを出力します。`uctx`は`ucontext_t`オブジェクト（`ucontext.h`参照）へのポインタとしても指定でき、そのコンテキストのスタックトレースを表示します。デフォルトでは、プログラムがセグメンテーションフォールトを起こした際にこの情報が出力されます。

```lua
terra terralib.backtrace(addresses : &&opaque, naddr : uint64, ip : &opaque, frameaddress : &opaque)
```

低レベルのインターフェースで、マシンスタックからリターンアドレスを取得します。`addresses`は少なくとも`naddr`ポインタ分の容量があるバッファへのポインタである必要があります。`ip`は現在の命令のアドレスで、最初のエントリとして`addresses`に格納され、`frameaddress`はベースポインタの値にする必要があります。`addresses`にはスタック上のリターンアドレスが格納されます。正しく機能させるにはデバッグモードを有効化（`-g`オプション）する必要があります。

```lua
terra terralib.disas(addr : &opaque, nbytes : uint64, ninst : uint64)
```

低レベルの逆アセンブラインターフェースです。`addr`から始まる命令の逆アセンブルを出力します。`nbytes`バイト分または`ninst`命令分のいずれか多くなる方の命令が出力されます。

```lua
terra terralib.lookupsymbol(ip : &opaque, addr : &&opaque, size : &uint64, name : &rawstring, namelength : &uint64) : bool
```

任意の命令のポインタ`ip`を基に、Terra関数に関する情報を検索しようと試みます。成功すると`true`を返し、`addr`に関数の開始アドレス、`size`に関数のバイト数が格納されます。`name`には関数名を最大`namemax`文字まで固定幅文字列として格納します。

```lua
terra terralib.lookupline(fnaddr : &opaque, ip : &opaque, filename : &rawstring, namelength : &uint64, line : &uint64) : bool
```

命令のポインタ`ip`と、それを含む関数の開始アドレス`fnaddr`を指定して、Terra命令に関する情報を検索しようと試みます。成功すると`true`を返し、`line`に命令がある行番号、`filename`にファイル名が最大`namemax`文字まで格納されます。

## Cコード内にTerraを埋め込む

Luaと同様に、Terraは既存のコードに埋め込むことを意図して設計されています。TerraのC APIは、Terra-Luaプログラムを実行するためのエントリーポイントとして機能します。実際、`terra`の実行ファイルとREPLは、このC APIのクライアントに過ぎません。TerraのC APIは、[LuaのAPI](http://www.lua.org/manual/5.1/manual.html#3)を拡張しており、Terra固有の関数が追加されています。クライアントはまず`lua_State`オブジェクトを作成し、`terra_init`を呼び出してTerra拡張を初期化します。Terraには、`lua_load`に相当する関数（例：`terra_loadfile`）が用意されており、これらの関数は入力をTerra-Luaコードとして扱います。

```lua
int terra_init(lua_State * L);
```

`lua_State` `L`の内部Terra状態を初期化します。`L`はすでに初期化された`lua_State`である必要があります。

```lua
typedef struct { /* 初期値は0 */
    int verbose; /* デバッグ出力の冗長性を設定します。
                    0（デバッグ出力なし）から2（非常に冗長）までの
                    値が有効です。 */
    int debug;   /* Terraコンパイラでデバッグ情報を有効にします。
                    スタックトレースにベースポインタと行番号情報が
                    表示されるようになります。 */
} terra_Options;
int terra_initwithoptions(lua_State * L, terra_Options * options);
```

`lua_State` `L`の内部Terra状態を初期化します。`L`はすでに初期化された`lua_State`である必要があります。`terra_Options`には追加の設定オプションが含まれます。

```lua
int terra_load(lua_State *L,
               lua_Reader reader,
               void *data,
               const char *chunkname);
```

TerraとLuaの両方を含むチャンクを読み込みます。これは`lua_load`のTerra版であり、引数や動作は`lua_load`と同じですが、入力をTerra拡張を含むLuaプログラムとして解釈します。現時点では、Lua-Terraコードのバイナリ形式はなく、入力はテキストでなければなりません。

```lua
int terra_loadfile(lua_State * L, const char * file);
```

ファイルをTerra-Luaチャンクとして読み込みます。`luaL_loadfile`のTerra版です。

```lua
int terra_loadbuffer(lua_State * L,
                         const char *buf,
                         size_t size,
                         const char *name);
```

バッファをTerra-Luaチャンクとして読み込みます。`luaL_loadbuffer`のTerra版です。

```lua
int terra_loadstring(lua_State *L, const char *s);
```

文字列`s`をTerra-Luaチャンクとして読み込みます。`luaL_loadstring`のTerra版です。

```lua
terra_dofile(L, file)
```

ファイル`file`を読み込み、実行します。以下のコードと同等です。

```lua
(terra_loadfile(L, fn) || lua_pcall(L, 0, LUA_MULTRET, 0))
```

```lua
terra_dostring(L, s)
```

文字列`s`を読み込み、実行します。以下のコードと同等です。

```lua
(terra_loadstring(L, s) || lua_pcall(L, 0, LUA_MULTRET, 0))
```

## Luaに埋め込む新しい言語の作成

Terraシステムの言語拡張により、カスタムLua文や式を作成して独自の埋め込み言語を実装することができます。各言語は、言語内の文や式の開始を示すエントリーポイントキーワードを登録します。TerraパーサがLua式や文の先頭でこれらのキーワードのいずれかを検出すると、パーサの制御がその言語に切り替わり、トークンを抽象構文木（AST）またはその他の中間表現に解析します。ASTを作成した後、言語はTerraパーサに戻り、実行時に文や式を実行するためのコンストラクタ関数を返します。

このガイドでは、簡単なスタンドアロンの例を用いて言語拡張の基本を紹介し、Terraへの登録方法を示します。その後、この例を拡張してLua環境と相互作用する方法を説明します。ガイドの最後には、言語拡張インターフェースとレキサーインターフェースの詳細な仕様が記載されています。

### 簡単な例

まず、Luaに単純な言語拡張を追加し、数値のリストを合計する言語を作成します。この構文は `sum 1,2,3 done` のような形で、実行すると数値を合計して `6` を出力します。言語拡張はLuaのテーブルを使って定義されます。以下がその言語のテーブルです。

```lua
local sumlanguage = {
  name = "sumlanguage"; -- デバッグ用の名前
  -- 式の開始トークンとなるキーワードリスト
  entrypoints = {"sum"};
  keywords = {"done"}; -- この言語固有のキーワードリスト
   -- Terraパーサから呼び出されてこの言語に入ります
  expression = function(self,lex)
    -- 実装がここに入ります
  end;
}
```

ここでは、`entrypoints`リストに `"sum"` を追加しています。これは、このトークンが式の先頭に現れた際にTerraが制御をこの言語に渡すようにするためです。また、式の終わりを示す `"done"` もキーワードとしてリストに追加しています。Terraパーサが`sum`トークンを見つけたときに、`expression`関数が呼び出され、レキサーへのインターフェース `lex` が引数として渡されます。実装は以下の通りです。

```lua
expression = function(self,lex)
  local sum = 0
  lex:expect("sum") -- 最初のトークンは "sum" であるべき
  if not lex:matches("done") then
    repeat
      -- 数値を解析してその値を返します
      local v = lex:expect(lex.number).value
      sum = sum + v
    -- コンマがあれば、それを消費して続行
    until not lex:nextif(",")
  end

  lex:expect("done")
  -- この式がLuaで評価されるときに実行される関数を返します
  return function(environment_function)
    return sum
  end
end
```

`lex` オブジェクトを使ってトークンと対話しています。このインターフェースは後述します。この文は数値の定数のみを許可しているため、解析中に合計を計算できます。最後に、_コンストラクタ関数_ を返し、この文が実行されるたびにこの関数が呼び出されます。Luaコードでの使用例は以下の通りです。

```lua
print(sum 1,2,3 done) -- 6を出力
```

この例のコードは `tests/lib/sumlanguage.t` にあり、その使用例は `tests/sumlanguage1.t` にあります。

### 言語の読み込みと実行

言語拡張を使用するためには、それを _インポート_ する必要があります。
言語拡張の仕組みには、言語拡張をロードするための `import` 文が含まれています。

```lua
import "lib/sumlanguage" -- 新しいパース規則を有効化
result = sum 1,2,3 done
```

`import` 文は _パース時_ に評価されるため、引数は文字列リテラルでなければなりません。パーサはこの文字列リテラルを使って `require` を呼び出し、言語拡張ファイルを読み込みます。
指定されたファイルは、言語を記述したLuaテーブルを _return_ する必要があります。

```lua
local sumlanguage = { ... } -- テーブルを記入
return sumlanguage
```

インポートされた言語は、インポート文が現れたローカルスコープ内でのみ有効です。

```lua
do
    import "lib/sumlanguage"
    result = sum 1,2,3 done -- OK、スコープ内
    if result == 6 then
        result = sum 4,5 done -- OK、まだスコープ内
    end
end
result = sum 6,7 done -- エラー! sumlanguageはスコープ外
```

複数の言語を同じスコープにインポートすることも可能ですが、`entrypoints` が重複しない必要があります。
もし`entrypoints` が重複する場合、`import` 文が異なるスコープで発生すれば同じファイル内でインポートできます。

### Luaシンボルとの相互作用

Terraの利点の一つは、Luaと同じレキシカルスコープを共有することにより、Terraの関数を簡単にパラメータ化できる点です。拡張言語もまたLuaの静的スコープにアクセスできます。では、定数の数値だけでなくLuaの変数もサポートするように、sum言語を拡張してみましょう。

```lua
local a = 4
print(sum a,3 done) -- 7を出力します
```

これを行うには、`expression`関数内のコードを修正する必要があります。

```lua
expression = function(self,lex)
  local sum = 0
  local variables = terralib.newlist()
  lex:expect("sum")
  if not lex:matches("done") then
    repeat
      if lex:matches(lex.name) then -- 変数の場合
        local name = lex:next().value
        -- Terraのパーサーに指示
        -- Luaの変数 'name' にアクセスすることを伝える
        lex:ref(name)
        -- 変数名をリストに追加
        variables:insert(name)
      else
        sum = sum + lex:expect(lex.number).value
      end
    until not lex:nextif(",")
  end
  lex:expect("done")
  return function(environment_function)
    -- ローカル環境をキャプチャ
    -- 変数名から値へのテーブル
    local env = environment_function()
    local mysum = sum
    for i,v in ipairs(variables) do
      mysum = mysum + env[v]
    end
    return mysum
  end
end
```

これで、式は変数名（`lex.name`）を含むことができます。定数とは異なり、変数の値は解析時にわからないため、実行前に合計を計算することはできません。代わりに、変数名を保存（`variables:insert(name)`）し、Terraのパーサーに実行時にその変数の値が必要であることを伝えます（`lex:ref(name)`）。_コンストラクタ_では、`environment_function`パラメータを呼び出すことでローカルなレキシカル環境をキャプチャし、その環境内で変数の値を参照して合計を計算します。`lex:ref(name)`を呼び出すことが重要です。もしこれを呼び出さなければ、この環境テーブルには必要な変数が含まれません。

### Luaの再帰的な解析

場合によっては、言語の途中でLuaのパーサーに戻り、Luaの式全体を解析したいことがあります。例えば、Terraの型はLuaの式です。

```lua
var a : int = 3
```

この例では、`int`は実際にはLuaの式です。

`lex:luaexpr()`メソッドはLuaの式を解析します。このメソッドは、式を実装するLua関数を返します。この関数はローカルなレキシカル環境を受け取り、その環境での式の値を返します。例として、単一引数のLua関数を簡潔に指定する方法を追加してみましょう。`def(a) exp`のように、ここで`a`は単一の引数、`exp`はLuaの式です。これはPythonの`lambda`ステートメントに似ています。以下にその言語拡張を示します。

```lua
{
  name = "def";
  entrypoints = {"def"};
  keywords = {};
  expression = function(self,lex)
    lex:expect("def")
    lex:expect("(")
    local formal = lex:expect(lex.name).value
    lex:expect(")")
    local expfn = lex:luaexpr()
    return function(environment_function)
      -- 結果を返します。単一引数のlua関数です。
      return function(actual)
        local env = environment_function()
        -- 仮引数を環境内の実引数にバインド
        env[formal] = actual
        -- 環境内で式を評価
        return expfn(env)
      end
    end
  end;
}
```

この例の完全なコードは`tests/lib/def.t`および`tests/def1.t`にあります。

### ステートメントの拡張

式の構文を拡張するだけでなく、ステートメントやローカル変数の宣言に対しても新しい構文を定義できます。

```lua
terra foo() end -- 新しいステートメント
local terra foo() end -- 新しいローカル変数の宣言
```

これは、言語テーブルに`statement`および`localstatement`関数を指定することで行います。これらの関数は、`expression`関数と同様に動作しますが、定義する名前のリストをオプションで返すことができます。ファイル`test/lib/def.t`には、この方法を使って`def`コンストラクタでステートメントをサポートする方法が示されています。

```lua
def foo(a) luaexpr -- グローバル変数 foo を定義
local def bar(a) luaexpr -- ローカル変数 bar を定義
```

### Prattパーサによる高レベルの解析

直接的に字句解析器インターフェースを使ってパーサを書くのは手間がかかります。解析を簡単にするためのシンプルな方法の一つに、Prattパーサ（トップダウンの優先度解析、詳細は[こちら](http://javascript.crockford.com/tdop/tdop.html)）があります。この方法は、特に複数の優先度レベルがある式に対して便利です。Lexerインターフェース上に構築されたライブラリを提供しており、APIのドキュメントと共に`tests/lib/parsing.t`で見つけることができます。このライブラリを使用した拡張の例は`tests/lib/pratttest.t`、およびそれを使用したプログラムの例は`tests/pratttest1.t`にあります。

### 言語とLexer API

このセクションでは、言語を定義し、`lexer`オブジェクトとやり取りするためのAPIについて詳しく説明します。

#### 言語テーブル

言語拡張は、次のフィールドを持つLuaテーブルによって定義されます。

```lua
name
```

デバッグに使用する言語の名前

```lua
entrypoints
```

この言語での項を開始できるキーワードを指定するLuaリストです。これらのキーワードは、TerraやLuaのキーワードであってはならず、他の読み込まれた言語のエントリーポイントと重複してはなりません（将来的には、言語を読み込む際にエントリーポイントの名前を変更して競合を解決できるようにする可能性があります）。これらのキーワードは有効なLua識別子でなければなりません（すなわち、英数字で構成され、数字で始まってはなりません）。将来的には任意の演算子（例：`+=`）を許可することを検討しています。

```lua
keywords
```

言語内で使用する追加のキーワードを指定するLuaリストです。エントリーポイントと同様に、これらも有効な識別子である必要があります。LuaやTerra内でキーワードとされるものは常にあなたの言語でもキーワードとして扱われるため、ここにリストする必要はありません。

```lua
expression
```

（オプション）Luaの式の先頭にエントリーポイントキーワードが出現した場合に呼び出されるLuaメソッド`function(self,lexer)`です。`self`は言語オブジェクト、`lexer`はトークンの取得やエラーの報告を行うためにTerraの字句解析器とやり取りするためのLuaオブジェクトです。そのAPIについては以下で説明します。この`expression`メソッドは、コンストラクタ関数`function(environment_function)`を返すべきです。このコンストラクタは式が評価されるたびに呼び出され、その式がLuaコード内で現れる際の値を返す必要があります。引数`environment_function`は、呼び出されると変数名から値へのLuaテーブルとしてローカルなレキシカル環境を返す関数です。

```lua
statement
```

（オプション）Lua _ステートメント_の先頭にエントリーポイントキーワードが出現した場合に呼び出されるLuaメソッド`function(self,lexer)`です。`expression`と同様にコンストラクタ関数を返します。さらに、変数に対する代入のリストとして二つ目の引数を返すことができます。たとえば、値`{ "a", "b", {"c","d"} }`はLuaステートメント`a,b,c.d = constructor(...)`のように振る舞います。

```lua
localstatement
```

（オプション）`local`ステートメントの先頭にエントリーポイントキーワードが出現した場合（例：`local terra foo() end`）に呼び出されるLuaメソッド`function(self,lexer)`です。`statement`と同様に、このメソッドも名前のリスト（例：`{"a","b"}`）を返すことができます。この場合、これらの名前はローカル変数として定義され、`local a, b = constructor(...)`のように振る舞います。

#### トークン

言語のメソッドには、Terraの_字句解析器_（lexer）へのインターフェースである`lexer`が与えられます。これを使用してトークンのストリームを調べたり、エラーを報告したりできます。_トークン_は以下のフィールドを持つLuaテーブルです。

```lua
token.type
```

_トークンの種類_。キーワードや演算子の場合、これは単なる文字列です（例：`"and"`や`"+"`）。`lexer.name`、`lexer.number`、`lexer.string`は、それぞれ識別子（例：`myvar`）、数値（例：3）、文字列（例：`"my string"`）を示します。`lexer.eof`はトークンストリームの終端を示します。

```lua
token.value
```

名前、文字列、数値の場合、これは具体的な値になります（例：`3.3`）。数値は、Luaの数値として表現される場合（浮動小数点数または32ビット整数）と、64ビット整数では`[u]int64_t`のcdata型として表現されます。

```lua
token.valuetype
```

数値の場合、これは解析されたリテラルのTerra型です。`3`は`int`型、`3.3`は`double`型、`3.f`は`float`型、`3ULL`は`uint64`型、`3LL`は`int64`型、`3U`は`uint`型になります。

```lua
token.linenumber
```

このトークンが出現した行番号です（先読みトークンには利用できません）。

```lua
token.offset
```

このトークンが発生したファイルの先頭からの文字数のオフセットです（先読みトークンには利用できません）。

#### Lexer

`lexer`オブジェクトは、以下のフィールドとメソッドを提供します。`lexer`自体は解析中のみ有効であり、たとえばコンストラクタ関数から呼び出すことはできません。

```lua
lexer:cur()
```

現在の_トークン_を返します。位置は変更しません。

```lua
lexer:lookahead()
```

現在のトークンの次の_トークン_を返します。位置は変更しません。実装を簡単にするため、1つのトークンのみ先読みが許可されています。

```lua
lexer:matches(tokentype)
```

`lexer:cur().type == tokentype` の短縮形

```lua
lexer:lookaheadmatches(tokentype)
```

`lexer:lookahead().type == tokentype` の短縮形

```lua
lexer:next()
```

現在のトークンを返し、次のトークンに進みます。

```lua
lexer:nextif(tokentype)
```

`tokentype`が現在のトークンの`type`と一致する場合、そのトークンを返してlexerを進めます。そうでない場合は`false`を返し、lexerは進みません。多くの代替案を解析したいときに便利です。

```lua
lexer:expect(tokentype)
```

`tokentype`が現在のトークンのタイプと一致する場合、そのトークンを返しlexerを進めます。そうでない場合、解析を停止してエラーを発生させます。どのトークンが出現すべきかがわかっている場合に便利です。

```lua
lexer:expectmatch(tokentype,openingtokentype,linenumber)
```

`expect`と同様ですが、マッチしたトークンに対してより良いエラーレポートを提供します。たとえば、リストの閉じカッコ`}`を解析する際に`lexer:expectmatch('}','{',lineno)`を呼び出すと、対応しない括弧や開閉行が報告されます。

```lua
lexer.source
```

ファイル名またはストリームの識別子を含む文字列（将来のエラーレポートに便利）

```lua
lexer:error(msg)
```

解析エラーを報告して処理を中断します。`msg`は文字列です。返り値はありません。

```lua
lexer:errorexpected(msg)
```

`msg`という文字列が予期されていましたが、現れなかったことを報告します。返り値はありません。

```lua
lexer:ref(name)
```

`name`は文字列で、Terraのパーサーに対し、言語がLuaの変数`name`を参照する可能性があることを示します。関心のある自由な識別子について、この関数を必ず呼び出す必要があります。そうしないと、その識別子は_コンストラクタ_関数に渡されるレキシカル環境に現れない可能性があります。参照しない識別子に対して呼び出しても安全ですが、効率が低下します。

```lua
lexer:luaexpr()
```

トークンストリームから単一のLua式を解析します。これを使用して言語の式に対しLuaの解析に戻ることができます。たとえば、Terraはこれを使用して型を解析します（型は単なるLua式です）：`var a : aluaexpression(4) = 3`。この関数は、`function(lexicalenv)`という関数を返し、現在のレキシカルスコープのテーブル（コンストラクタの`environment_function`から返されるものなど）を受け取り、そのスコープで評価された式の値を返します。この関数は、Lua式をASTに解析するためのものではありません。現在、Lua式をASTに解析するには、自分でパーサーを書く必要があります。将来的には、言語でLua/Terraの文法の一部を選択して使用できるライブラリを追加する予定です。

```lua
lexer:luastats()
```

トークンストリームから一連のLuaステートメントを解析し、ブロックの終了キーワード（`end`、`else`、`elseif`など）に達するまで処理します。これを利用すると、Luaのすべてのパーサを再実装することなく、Luaを拡張したドメイン固有言語を構築するのに役立ちます。

```lua
lexer:terraexpr()
```

トークンストリームから単一のTerra式を解析します。これを使用すると、Terraを拡張したドメイン固有言語を再実装することなく構築するのに役立ちます。

```lua
lexer:terrastats()
```

トークンストリームから一連のTerraステートメントを解析し、ブロックの終了キーワード（`end`、`else`、`elseif`など）に達するまで処理します。これを利用して、Terraを拡張したドメイン固有言語を構築するのに役立ちます。

## 中間表現と抽象構文記述言語 (ASDL)

[抽象構文記述言語 (ASDL)](https://www.usenix.org/legacy/publications/library/proceedings/dsl97/full_papers/wang/wang.pdf) は、コンパイラの中間表現（IR）やツリーやグラフベースのデータ構造を簡潔に記述する方法です。代数的データ型に似ていますが、一貫したクロス言語仕様を提供します。Pythonのコンパイラではその文法を記述するためにASDLが使用され、Terra内部でもTerraコードを表現するために使用されています。

ASDL仕様を解析するためのLuaライブラリを提供しており、ドメイン固有言語の構築に役立つIRや他のデータ構造を実装できます。このライブラリを使用すると、ASDL仕様を解析し、IRを構築するためのLuaクラス（実際には特別に定義されたメタテーブル）を作成できます。このライブラリはIRの構築用のコンストラクタ付きでクラスを自動的に設定し、通常のLuaメソッド定義を使って追加メソッドをクラスに追加できます。

```lua
local asdl = require 'asdl'
```

ASDLパッケージはTerraに付属しています。

```lua
context = asdl.NewContext()
```

ASDLクラスはコンテキスト内で定義されます。異なるコンテキストは何も共有しません。コンテキスト内の各クラスには一意の名前が必要です。

### ASDLクラスの作成

```lua
local Types = asdl.NewContext()

Types:Define [[

   # 2つのメンバーを持つ単純なレコード型を定義
   Real = (number mantissa, number exp)
   #       ^~~~ フィールド型         ^~~~~ フィールド名

   # タグ付きユニオン（バリアント、判別付きユニオン、合計型）
   # をいくつかのオプションのデータ型で定義。
   # この例では型 Stm は3つのサブタイプを持ちます。
   Stm = Compound(Stm head, Stm next)
       | Assign(string lval, Exp rval)
   # '*' はフィールドがリストオブジェクトであることを指定
   # '?' はフィールドがオプション（nilまたはその型）であることを指定
       | Print(Exp* args, string? format)

   Exp = Id(string name)
       | Num(number v)
       | Op(Exp lhs, BinOp op, Exp rhs)

   # タグ付きユニオンで()を省略すると、シングルトン値を作成
   BinOp = Plus | Minus
]]
```

型はLuaのプリミティブ（`type(v)`が返すnumber、table、function、string、booleanなど）、他のASDL型、または`context:Extern`で登録された任意の関数でチェックされた型が使用できます。

外部型を使用するには、その型に対して名前を登録し、その型のオブジェクトに対してtrueを返す関数を指定します。

```lua
Types:Extern("File",function(obj)
   return io.type(obj) == "file"
end)
```

### ASDLクラスの使用

```lua
local exp = Types.Num(1)
local assign = Types.Assign("x",exp)
local real = Types.Real(3,4)

local List = require 'terralist'
local p = Types.Print(List {exp})
```

値はクラスを関数として呼び出すことで作成されます。引数は構築時に正しい型であるかチェックされ、間違った型の場合には警告が表示されます。

フィールドはコンストラクタによって初期化されます。

```lua
print(exp.v) -- 1
```

デフォルトでクラスには文字列表現があります。

```lua
print(assign) -- Assign(lval = x,rval = Num(v = 1))
```

メンバーシップを`:isclassof`で確認することができます。

```lua
assert(Types.Assign:isclassof(assign))
assert(Types.Stm:isclassof(assign))
assert(Types.Exp:isclassof(assign) == false)
```

シングルトンはクラスではなく値です。

```lua
assert(Types.BinOp:isclassof(Types.Plus))
```

クラスはその値のメタテーブルであり、`Class.__index = Class`を持ちます。

```lua
assert(getmetatable(assign) == Types.Assign)
```

タグ付きユニオンには文字列フィールド`.kind`があり、ユニオン内でその値がどのバリアントであるかを識別します。

```lua
assert(assign.kind == "Assign")
```

### ASDLクラスにメソッドを追加

クラスに追加のメソッドを定義して、追加の機能を持たせることができます。

```lua
function Types.Id:eval(env)
  return env[self.name]
end
function Types.Num:eval(env)
  return self.v
end
function Types.Op:eval(env)
  local op = self.op
  local lhs = self.lhs:eval(env)
  local rhs = self.rhs:eval(env)
  if op.kind == "Plus" then
     return lhs + rhs
  elseif op.kind == "Minus" then
     return lhs - rhs
  end
end

local s = Types.Op(Types.Num(1),Types.Plus,Types.Num(2))
assert(s:eval({}) == 3)
```

また、スーパークラスにメソッドを定義すると、サブクラスにもそのメソッドが定義されます。

```lua
function Types.Stm:foo()
  print("foo")
end

assign:foo()
```

注意: メタテーブルの構造を簡単に保つために、これは連鎖テーブルで実装されていません。このデザイン上、スーパークラスでのメソッド定義はサブクラスにもコピーされるため、**親のメソッドは子のメソッドより先に定義しなければなりません**。そうでなければ、親のメソッドが子のメソッドを上書きしてしまいます。

**すでに定義済みのメソッド（例えば `__tostring`）をオーバーライドする必要がある場合は、最初にスーパークラスでそれを`nil`に設定してください。**

```lua
Types.Stm.__tostring = nil
function Types.Stm:__tostring()
  return "<Stm>"
end
```

### 名前空間

ASDLの拡張として、名前空間を定義するために`module`キーワードを使用できます。これにより、コンパイラで多くの異なる`Exp`や`Type`を扱う際に役立ちます。

```lua
Types:Define [[
   module Foo {
      Bar = (number a)
      Baz = (Bar b)
   }
   Outside = (Foo.Baz x)
]]
local a = Types.Foo.Bar(3)
```

### ユニーク

もう一つの拡張として、任意の具体型を`unique`としてマークすることができます。`unique`型は構築時にメモ化され、同じ引数（Luaの等価性の範囲内で）で構築された場合は、同じLuaオブジェクトが再び返されます。これは、リスト（`*`）やオプション（`?`）を含む型にも対応しています。

```lua
Types:Define [[
   module U {
      Exp = Id(string name) unique
          | Num(number v) unique
   }
]]
assert(Types.U.Id("foo") == Types.U.Id("foo"))
```