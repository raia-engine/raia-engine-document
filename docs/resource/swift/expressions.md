# 式

値にアクセス、変更、および割り当てを行います。Swiftには、前置式、中置式、主式、および後置式の4種類の式があります。式を評価すると、値が返されるか、副作用が発生するか、その両方が発生します。

前置式と中置式を使用すると、小さな式に演算子を適用できます。主式は概念的に最も単純な種類の式であり、値にアクセスする方法を提供します。後置式は、前置式や中置式と同様に、関数呼び出しやメンバーアクセスなどの後置を使用して、より複雑な式を構築できます。各種類の式については、以下のセクションで詳しく説明します。

## 式の文法

```
expression → try-operator? await-operator? prefix-expression infix-expressions?
```

## 前置式

前置式は、オプションの前置演算子と式を組み合わせたものです。前置演算子は、後に続く式を1つの引数として取ります。

これらの演算子の動作については、基本演算子と高度な演算子を参照してください。Swift標準ライブラリで提供される演算子については、演算子宣言を参照してください。

### 前置式の文法

```
prefix-expression → prefix-operator? postfix-expression
prefix-expression → in-out-expression
```

### インアウト式

インアウト式は、関数呼び出し式にインアウト引数として渡される変数をマークします。

```
&<#expression#>
```

インアウトパラメータとその例については、インアウトパラメータを参照してください。インアウト式は、ポインタが必要なコンテキストで非ポインタ引数を提供する場合にも使用されます。詳細は、ポインタ型への暗黙の変換を参照してください。

#### インアウト式の文法

```
in-out-expression → & primary-expression
```

### トライ演算子

トライ式は、トライ演算子の後にエラーをスローする可能性のある式が続く形式です。次の形式を持ちます：

```
try <#expression#>
```

トライ式の値は、その式の値です。

オプショントライ式は、try? 演算子の後にエラーをスローする可能性のある式が続く形式です。次の形式を持ちます：

```
try? <#expression#>
```

式がエラーをスローしない場合、オプショントライ式の値はその式の値を含むオプションです。そうでない場合、オプショントライ式の値はnilです。

強制トライ式は、try! 演算子の後にエラーをスローする可能性のある式が続く形式です。次の形式を持ちます：

```
try! <#expression#>
```

強制トライ式の値は、その式の値です。式がエラーをスローすると、ランタイムエラーが発生します。

中置演算子の左側の式がtry、try?、またはtry!でマークされている場合、その演算子は中置式全体に適用されます。ただし、括弧を使用して演算子の適用範囲を明示的にすることができます。

```swift
// tryは両方の関数呼び出しに適用されます
sum = try someThrowingFunction() + anotherThrowingFunction()

// tryは両方の関数呼び出しに適用されます
sum = try (someThrowingFunction() + anotherThrowingFunction())

// エラー: tryは最初の関数呼び出しにのみ適用されます
sum = (try someThrowingFunction()) + anotherThrowingFunction()
```

トライ式は、中置演算子の右側に現れることはできません。ただし、中置演算子が代入演算子である場合や、トライ式が括弧で囲まれている場合は例外です。

式にtry演算子とawait演算子の両方が含まれている場合、try演算子は最初に現れなければなりません。

try、try?、およびtry!の使用方法と例については、エラーハンドリングを参照してください。

#### トライ式の文法

```
try-operator → try | try ? | try !
```

### アウェイト演算子

アウェイト式は、アウェイト演算子の後に非同期操作の結果を使用する式が続く形式です。次の形式を持ちます：

```
await <#expression#>
```

アウェイト式の値は、その式の値です。

アウェイトでマークされた式は、潜在的な中断点と呼ばれます。非同期関数の実行は、アウェイトでマークされた各式で中断される可能性があります。さらに、並行コードの実行は他のどの点でも中断されることはありません。これは、潜在的な中断点の間のコードが、一時的に不変条件を破る必要がある状態を安全に更新できることを意味します。ただし、次の潜在的な中断点の前に更新を完了する必要があります。

アウェイト式は、`async(priority:operation:)`関数に渡されるトレーリングクロージャなど、非同期コンテキスト内でのみ現れることができます。defer文の本体や、同期関数型の自動クロージャ内には現れることはできません。

中置演算子の左側の式がアウェイト演算子でマークされている場合、その演算子は中置式全体に適用されます。ただし、括弧を使用して演算子の適用範囲を明示的にすることができます。

```swift
// awaitは両方の関数呼び出しに適用されます
sum = await someAsyncFunction() + anotherAsyncFunction()

// awaitは両方の関数呼び出しに適用されます
sum = await (someAsyncFunction() + anotherAsyncFunction())

// エラー: awaitは最初の関数呼び出しにのみ適用されます
sum = (await someAsyncFunction()) + anotherAsyncFunction()
```

アウェイト式は、中置演算子の右側に現れることはできません。ただし、中置演算子が代入演算子である場合や、アウェイト式が括弧で囲まれている場合は例外です。

式にアウェイト演算子とtry演算子の両方が含まれている場合、try演算子は最初に現れなければなりません。

#### アウェイト式の文法

```
await-operator → await
```

## 中置表現

中置表現は、中置二項演算子と、それが左辺および右辺の引数として取る式を組み合わせたものです。次の形式を持ちます：

```
<#left-hand argument#> <#operator#> <#right-hand argument#>
```

これらの演算子の動作については、基本演算子と高度な演算子を参照してください。Swift標準ライブラリが提供する演算子については、演算子宣言を参照してください。

> **注**: 解析時には、中置演算子で構成された式はフラットなリストとして表現されます。このリストは演算子の優先順位を適用することでツリーに変換されます。例えば、式 `2 + 3 * 5` は最初は5つの項目、`2`、`+`、`3`、`*`、および `5` のフラットなリストとして理解されます。このプロセスはそれをツリー `(2 + (3 * 5))` に変換します。

### 中置表現の文法

```
infix-expression → infix-operator prefix-expression
infix-expression → assignment-operator try-operator? await-operator? prefix-expression
infix-expression → conditional-operator try-operator? await-operator? prefix-expression
infix-expression → type-casting-operator
infix-expressions → infix-expression infix-expressions?
```

### 代入演算子

代入演算子は、指定された式に新しい値を設定します。次の形式を持ちます：

```
<#expression#> = <#value#>
```

式の値は、値を評価して得られた値に設定されます。式がタプルの場合、値も同じ数の要素を持つタプルでなければなりません（ネストされたタプルも許可されます）。代入は、値の各部分から式の対応する部分に対して行われます。例えば：

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a は "test"、b は 12、c は 3 で、9.45 は無視されます
```

代入演算子は値を返しません。

#### 代入演算子の文法

```
assignment-operator → =
```

### 三項条件演算子

三項条件演算子は、条件の値に基づいて2つの指定された値のいずれかを評価します。次の形式を持ちます：

```
<#condition#> ? <#expression used if true#> : <#expression used if false#>
```

条件がtrueと評価される場合、条件演算子は最初の式を評価し、その値を返します。それ以外の場合、2番目の式を評価し、その値を返します。使用されない式は評価されません。

三項条件演算子を使用した例については、三項条件演算子を参照してください。

#### 条件演算子の文法

```
conditional-operator → ? expression :
```

### 型キャスト演算子

型キャスト演算子には4つの種類があります：`is` 演算子、`as` 演算子、`as?` 演算子、および `as!` 演算子です。次の形式を持ちます：

```
<#expression#> is <#type#>
<#expression#> as <#type#>
<#expression#> as? <#type#>
<#expression#> as! <#type#>
```

`is` 演算子は、式が指定された型にキャストできるかどうかをランタイムでチェックします。式が指定された型にキャストできる場合はtrueを返し、それ以外の場合はfalseを返します。

`as` 演算子は、キャストが常に成功することがコンパイル時にわかっている場合にキャストを実行します。例えば、アップキャストやブリッジングです。アップキャストでは、中間変数を使用せずに式をその型のスーパータイプのインスタンスとして使用できます。次のアプローチは同等です：

```swift
func f(_ any: Any) { print("Any用の関数") }
func f(_ int: Int) { print("Int用の関数") }
let x = 10
f(x)
// "Int用の関数" を出力

let y: Any = x
f(y)
// "Any用の関数" を出力

f(x as Any)
// "Any用の関数" を出力
```

ブリッジングでは、`String` のようなSwift標準ライブラリの型の式を、新しいインスタンスを作成せずに対応するFoundation型（例えば `NSString`）として使用できます。ブリッジングの詳細については、Foundation型の操作を参照してください。

`as?` 演算子は、式を指定された型に条件付きでキャストします。`as?` 演算子は、指定された型のオプショナルを返します。ランタイムでキャストが成功した場合、式の値はオプショナルにラップされて返されます。それ以外の場合、返される値はnilです。指定された型へのキャストが失敗することが保証されている場合、または成功することが保証されている場合、コンパイル時エラーが発生します。

`as!` 演算子は、式を指定された型に強制的にキャストします。`as!` 演算子は、オプショナル型ではなく指定された型の値を返します。キャストが失敗した場合、ランタイムエラーが発生します。`x as! T` の動作は `(x as? T)!` の動作と同じです。

型キャストの詳細および型キャスト演算子を使用した例については、型キャストを参照してください。

#### 型キャスト演算子の文法

```
type-casting-operator → is type
type-casting-operator → as type
type-casting-operator → as ? type
type-casting-operator → as ! type
```

## プライマリ式

プライマリ式は最も基本的な種類の式です。それ自体で式として使用でき、他のトークンと組み合わせて前置式、中置式、後置式を作成することができます。

### プライマリ式の文法

```
primary-expression → identifier generic-argument-clause?
primary-expression → literal-expression
primary-expression → self-expression
primary-expression → superclass-expression
primary-expression → conditional-expression
primary-expression → closure-expression
primary-expression → parenthesized-expression
primary-expression → tuple-expression
primary-expression → implicit-member-expression
primary-expression → wildcard-expression
primary-expression → macro-expansion-expression
primary-expression → key-path-expression
primary-expression → selector-expression
primary-expression → key-path-string-expression
```

### リテラル式

リテラル式は、通常のリテラル（文字列や数値など）、配列リテラル、辞書リテラル、またはプレイグラウンドリテラルのいずれかで構成されます。

> **注**: Swift 5.9以前では、次の特殊リテラルが認識されていました: `#column`, `#dsohandle`, `#fileID`, `#filePath`, `#file`, `#function`, および `#line`。これらは現在、Swift標準ライブラリのマクロとして実装されています: `column()`, `dsohandle()`, `fileID()`, `filePath()`, `file()`, `function()`, および `line()`。

配列リテラルは値の順序付きコレクションです。次の形式を持ちます:

```
[<#value 1#>, <#value 2#>, <#...#>]
```

配列の最後の式にはオプションのカンマを付けることができます。配列リテラルの値は `[T]` 型であり、`T` はその中の式の型です。複数の型の式がある場合、`T` はそれらの最も近い共通のスーパータイプです。空の配列リテラルは空の角括弧のペアを使用して書かれ、指定された型の空の配列を作成するために使用できます。

```swift
var emptyArray: [Double] = []
```

辞書リテラルはキーと値のペアの順序なしコレクションです。次の形式を持ちます:

```
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]
```

辞書の最後の式にはオプションのカンマを付けることができます。辞書リテラルの値は `[Key: Value]` 型であり、`Key` はキー式の型、`Value` は値式の型です。複数の型の式がある場合、`Key` と `Value` はそれぞれの値の最も近い共通のスーパータイプです。空の辞書リテラルは角括弧の中にコロンを入れて書かれ、空の配列リテラルと区別されます。指定されたキーと値の型の空の辞書リテラルを作成するために使用できます。

```swift
var emptyDictionary: [String: Double] = [:]
```

プレイグラウンドリテラルは、Xcodeによってプログラムエディタ内で色、ファイル、または画像のインタラクティブな表現を作成するために使用されます。Xcodeの外部でプレイグラウンドリテラルは特別なリテラル構文を使用して表されます。

Xcodeでプレイグラウンドリテラルを使用する方法については、Xcodeヘルプの「色、ファイル、または画像リテラルを追加する」を参照してください。

#### リテラル式の文法

```
literal-expression → literal
literal-expression → array-literal | dictionary-literal | playground-literal
array-literal → [ array-literal-items? ]
array-literal-items → array-literal-item ,? | array-literal-item , array-literal-items
array-literal-item → expression
dictionary-literal → [ dictionary-literal-items ] | [ : ]
dictionary-literal-items → dictionary-literal-item ,? | dictionary-literal-item , dictionary-literal-items
dictionary-literal-item → expression : expression
playground-literal → #colorLiteral ( red : expression , green : expression , blue : expression , alpha : expression )
playground-literal → #fileLiteral ( resourceName : expression )
playground-literal → #imageLiteral ( resourceName : expression )
```

### self式

self式は、現在の型またはその型のインスタンスへの明示的な参照です。次の形式を持ちます:

```
self
self.<#member name#>
self[<#subscript index#>]
self(<#initializer arguments#>)
self.init(<#initializer arguments#>)
```

イニシャライザ、サブスクリプト、またはインスタンスメソッド内では、`self` はその型の現在のインスタンスを指します。型メソッド内では、`self` はその型自体を指します。

self式は、メンバーにアクセスする際のスコープを指定し、スコープ内に同じ名前の別の変数がある場合に曖昧さを解消するために使用されます。例えば:

```swift
class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}
```

値型のミューテイティングメソッド内では、その値型の新しいインスタンスを `self` に割り当てることができます。例えば:

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

#### self式の文法

```
self-expression → self | self-method-expression | self-subscript-expression | self-initializer-expression
self-method-expression → self . identifier
self-subscript-expression → self [ function-call-argument-list ]
self-initializer-expression → self . init
```

### スーパークラス式

スーパークラス式は、クラスがそのスーパークラスと対話するために使用されます。次の形式のいずれかを持ちます:

```
super.<#member name#>
super[<#subscript index#>]
super.init(<#initializer arguments#>)
```

最初の形式はスーパークラスのメンバーにアクセスするために使用されます。2番目の形式はスーパークラスのサブスクリプト実装にアクセスするために使用されます。3番目の形式はスーパークラスのイニシャライザにアクセスするために使用されます。

サブクラスは、メンバー、サブスクリプト、およびイニシャライザの実装にスーパークラス式を使用して、スーパークラスの実装を利用することができます。

#### スーパークラス式の文法

```
superclass-expression → superclass-method-expression | superclass-subscript-expression | superclass-initializer-expression
superclass-method-expression → super . identifier
superclass-subscript-expression → super [ function-call-argument-list ]
superclass-initializer-expression → super . init
```

### 条件式

条件式は、条件の値に基づいて与えられた複数の値のうちの1つを評価します。次の形式のいずれかを持ちます:

```swift
if <#条件 1#> {
   <#条件 1 が真の場合に使用される式#>
} else if <#条件 2#> {
   <#条件 2 が真の場合に使用される式#>
} else {
   <#両方の条件が偽の場合に使用される式#>
}

switch <#式#> {
case <#パターン 1#>:
    <#式 1#>
case <#パターン 2#> where <#条件#>:
    <#式 2#>
default:
    <#式 3#>
}
```

条件式は、以下の段落で説明する違いを除いて、if文またはswitch文と同じ動作と構文を持ちます。

条件式は次のコンテキストでのみ現れます:

- 変数に割り当てられる値として。
- 変数または定数の宣言時の初期値として。
- throw式によってスローされるエラーとして。
- 関数、クロージャ、またはプロパティゲッターによって返される値として。
- 条件式の分岐内の値として。

条件式の分岐は網羅的であり、条件に関係なく常に値を生成することを保証します。これは、各if分岐に対応するelse分岐が必要であることを意味します。

各分岐には、分岐の条件が真である場合に条件式の値として使用される単一の式、throw文、または決して戻らない関数の呼び出しのいずれかが含まれます。

各分岐は同じ型の値を生成する必要があります。各分岐の型チェックは独立しているため、リテラルの種類が異なる場合や分岐の値がnilである場合など、値の型を明示的に指定する必要があることがあります。この情報を提供する必要がある場合は、結果が割り当てられる変数に型注釈を追加するか、分岐の値に`as`キャストを追加します。

```swift
let number: Double = if someCondition { 10 } else { 12.34 }
let number = if someCondition { 10 as Double } else { 12.34 }
```

結果ビルダー内では、条件式は変数または定数の初期値としてのみ現れます。この動作は、結果ビルダー内でifまたはswitchを書いた場合、そのコードが分岐文として理解され、そのコードを変換する結果ビルダーのメソッドの1つがあることを意味します。

条件式の分岐の1つがスローされる場合でも、try式に条件式を入れないでください。

#### 条件式の文法

```
conditional-expression → if-expression | switch-expression
if-expression → if condition-list { statement } if-expression-tail
if-expression-tail → else if-expression
if-expression-tail → else { statement }
switch-expression → switch expression { switch-expression-cases }
switch-expression-cases → switch-expression-case switch-expression-cases?
switch-expression-case → case-label statement
switch-expression-case → default-label statement
```

### クロージャ式

クロージャ式は、他のプログラミング言語でラムダまたは無名関数としても知られるクロージャを作成します。関数宣言と同様に、クロージャには文が含まれ、囲むスコープから定数や変数をキャプチャします。次の形式を持ちます:

```
{ (<#パラメータ#>) -> <#戻り値の型#> in
   <#文#>
}
```

パラメータは、関数宣言のパラメータと同じ形式を持ちます。詳細は関数宣言を参照してください。

クロージャ式にthrowsまたはasyncを記述すると、クロージャがスローまたは非同期であることが明示的に示されます。

```
{ (<#パラメータ#>) async throws -> <#戻り値の型#> in
   <#文#>
}
```

クロージャの本体にthrows文やdo文内にネストされていないtry式が含まれている場合、クロージャはスローされると理解されます。スローされるクロージャが単一の型のエラーのみをスローする場合、クロージャはそのエラー型をスローすると理解されます。それ以外の場合、任意のエラーをスローすると理解されます。同様に、本体にawait式が含まれている場合、それは非同期であると理解されます。

クロージャをより簡潔に記述するためのいくつかの特別な形式があります:
- クロージャは、そのパラメータの型、戻り値の型、またはその両方を省略できます。パラメータ名と両方の型を省略する場合、文の前にinキーワードを省略します。省略された型が推論できない場合、コンパイル時エラーが発生します。
- クロージャはパラメータの名前を省略することができます。その場合、パラメータは位置に応じて$0、$1、$2などと暗黙的に名前が付けられます。
- 単一の式のみで構成されるクロージャは、その式の値を返すと理解されます。この式の内容は、周囲の式の型推論を行う際にも考慮されます。

次のクロージャ式は同等です:

```swift
myFunction { (x: Int, y: Int) -> Int in
    return x + y
}

myFunction { x, y in
    return x + y
}

myFunction { return $0 + $1 }

myFunction { $0 + $1 }
```

クロージャを関数の引数として渡す方法については、関数呼び出し式を参照してください。

クロージャ式は、変数や定数に格納されずに使用されることがあります。例えば、関数呼び出しの一部としてクロージャをすぐに使用する場合です。上記のコードでmyFunctionに渡されるクロージャ式は、この種の即時使用の例です。その結果、クロージャ式がエスケープするかどうかは、式の周囲のコンテキストによって決まります。クロージャ式が即座に呼び出されるか、非エスケープ関数の引数として渡される場合、クロージャ式は非エスケープとされます。それ以外の場合、クロージャ式はエスケープとされます。

エスケープクロージャについての詳細は、エスケープクロージャを参照してください。

### キャプチャリスト

デフォルトでは、クロージャ式はその周囲のスコープから定数や変数を強参照でキャプチャします。キャプチャリストを使用して、クロージャ内で値がどのようにキャプチャされるかを明示的に制御できます。

キャプチャリストは、パラメータリストの前に角括弧で囲まれたカンマ区切りの式のリストとして記述されます。キャプチャリストを使用する場合、パラメータ名、パラメータ型、戻り値の型を省略した場合でも、in キーワードを使用する必要があります。

キャプチャリストのエントリは、クロージャが作成されるときに初期化されます。キャプチャリストの各エントリについて、定数は周囲のスコープで同じ名前を持つ定数または変数の値に初期化されます。例えば、以下のコードでは、a はキャプチャリストに含まれていますが、b は含まれていないため、それぞれ異なる動作をします。

```swift
var a = 0
var b = 0
let closure = { [a] in
 print(a, b)
}

a = 10
b = 10
closure()
// "0 10" と出力されます
```

ここでは、周囲のスコープにある変数 a とクロージャのスコープにある定数 a の2つの異なるものがありますが、変数 b は1つだけです。内側のスコープにある a は、クロージャが作成されたときに外側のスコープにある a の値で初期化されますが、それらの値は特別な方法で接続されていません。つまり、外側のスコープにある a の値の変更は、内側のスコープにある a の値に影響を与えず、逆もまた同様です。対照的に、b という名前の変数は1つだけであり、クロージャの内外での変更は両方の場所で確認できます。

キャプチャされた変数の型が参照セマンティクスを持つ場合、この区別は見えません。例えば、以下のコードでは、外側のスコープにある変数 x と内側のスコープにある定数 x の2つの異なるものがありますが、参照セマンティクスのため、両方とも同じオブジェクトを参照します。

```swift
class SimpleClass {
    var value: Int = 0
}
var x = SimpleClass()
var y = SimpleClass()
let closure = { [x] in
    print(x.value, y.value)
}

x.value = 10
y.value = 10
closure()
// "10 10" と出力されます
```

式の値の型がクラスである場合、キャプチャリスト内の式を weak または unowned でマークして、その式の値を弱参照または非所有参照でキャプチャできます。

```swift
myFunction { print(self.title) }                    // 暗黙の強参照キャプチャ
myFunction { [self] in print(self.title) }          // 明示的な強参照キャプチャ
myFunction { [weak self] in print(self!.title) }    // 弱参照キャプチャ
myFunction { [unowned self] in print(self.title) }  // 非所有参照キャプチャ
```

キャプチャリスト内で任意の式を名前付きの値にバインドすることもできます。式はクロージャが作成されるときに評価され、指定された強度で値がキャプチャされます。例えば：

```swift
// "self.parent" を "parent" として弱参照キャプチャ
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

クロージャ式の詳細と例については、クロージャ式を参照してください。キャプチャリストの詳細と例については、クロージャの強参照サイクルの解決を参照してください。

#### クロージャ式の文法

```
closure-expression → { attributes? closure-signature? statements? }
closure-signature → capture-list? closure-parameter-clause async? throws-clause? function-result? in
closure-signature → capture-list in
closure-parameter-clause → ( ) | ( closure-parameter-list ) | identifier-list
closure-parameter-list → closure-parameter | closure-parameter , closure-parameter-list
closure-parameter → closure-parameter-name type-annotation?
closure-parameter → closure-parameter-name type-annotation ...
closure-parameter-name → identifier
capture-list → [ capture-list-items ]
capture-list-items → capture-list-item | capture-list-item , capture-list-items
capture-list-item → capture-specifier? identifier
capture-list-item → capture-specifier? identifier = expression
capture-list-item → capture-specifier? self-expression
capture-specifier → weak | unowned | unowned(safe) | unowned(unsafe)
```

### 暗黙のメンバー式

暗黙のメンバー式は、型推論が暗黙の型を決定できるコンテキストで、型のメンバー（列挙ケースや型メソッドなど）にアクセスするための省略形です。次の形式を持ちます：

```
.<#member name#>
```

例えば：

```swift
var x = MyEnumeration.someValue
x = .anotherValue
```

推論された型がオプショナルの場合、暗黙のメンバー式で非オプショナル型のメンバーを使用することもできます。

```swift
var someOptional: MyEnumeration? = .someValue
```

暗黙のメンバー式の後には、後置演算子や後置構文（後置式に記載されているもの）を続けることができます。これを連鎖暗黙のメンバー式と呼びます。連鎖する後置式がすべて同じ型を持つことが一般的ですが、唯一の要件は、連鎖暗黙のメンバー式全体がそのコンテキストによって暗黙的に示される型に変換可能である必要があることです。具体的には、暗黙の型がオプショナルである場合、非オプショナル型の値を使用でき、暗黙の型がクラス型である場合、そのサブクラスの値を使用できます。例えば：

```swift
class SomeClass {
    static var shared = SomeClass()
    static var sharedSubclass = SomeSubclass()
    var a = AnotherClass()
}
class SomeSubclass: SomeClass { }
class AnotherClass {
    static var s = SomeClass()
    func f() -> SomeClass { return AnotherClass.s }
}
let x: SomeClass = .shared.a.f()
let y: SomeClass? = .shared
let z: SomeClass = .sharedSubclass
```

上記のコードでは、x の型はそのコンテキストによって暗黙的に示される型と正確に一致し、y の型は SomeClass から SomeClass? に変換可能であり、z の型は SomeSubclass から SomeClass に変換可能です。

#### 暗黙のメンバー式の文法

```
implicit-member-expression → . identifier
implicit-member-expression → . identifier . postfix-expression
```

### 括弧付き式

括弧付き式は、括弧で囲まれた式で構成されます。括弧を使用して、明示的に式をグループ化することで演算の優先順位を指定できます。グループ化括弧は式の型を変更しません。例えば、(1) の型は単に Int です。

#### 括弧付き式の文法

```
parenthesized-expression → ( expression )
```

### タプル式

タプル式は、括弧で囲まれたカンマ区切りの式のリストで構成されます。各式には、オプションで識別子を付けることができ、コロン (:) で区切られます。次の形式を持ちます：

```
(<#identifier 1#>: <#expression 1#>, <#identifier 2#>: <#expression 2#>, <#...#>)
```

タプル式内の各識別子は、そのタプル式のスコープ内で一意でなければなりません。ネストされたタプル式では、同じレベルのネストで識別子が一意である必要があります。例えば、(a: 10, a: 20) は無効です。なぜなら、ラベル a が同じレベルで2回現れるからです。しかし、(a: 10, b: (a: 1, x: 2)) は有効です。a は2回現れますが、外側のタプルと内側のタプルでそれぞれ1回ずつ現れます。

タプル式には、0個の式を含めることも、2つ以上の式を含めることもできます。括弧内の単一の式は括弧付き式です。

> **注**: 空のタプル式と空のタプル型はどちらも Swift では () と書かれます。Void は () の型エイリアスであるため、空のタプル型を記述するために使用できます。しかし、すべての型エイリアスと同様に、Void は常に型であり、空のタプル式を記述するために使用することはできません。

#### タプル式の文法

```
tuple-expression → ( ) | ( tuple-element , tuple-element-list )
tuple-element-list → tuple-element | tuple-element , tuple-element-list
tuple-element → expression | identifier : expression
```

### ワイルドカード式

ワイルドカード式は、代入中に値を明示的に無視するために使用されます。例えば、次の代入では10がxに代入され、20は無視されます。

```swift
(x, _) = (10, 20)
// xは10で、20は無視されます
```

#### ワイルドカード式の文法

```
wildcard-expression → _
```

### マクロ展開式

マクロ展開式は、マクロ名の後にカンマで区切られたマクロの引数のリストを括弧内に続けたものです。マクロはコンパイル時に展開されます。マクロ展開式は次の形式を持ちます。

```
<#macro name#>(<#macro argument 1#>, <#macro argument 2#>)
```

マクロが引数を取らない場合、マクロ展開式はマクロ名の後の括弧を省略します。

マクロ展開式は、パラメータのデフォルト値として使用できます。関数やメソッドのパラメータのデフォルト値として使用される場合、マクロは呼び出し元のソースコードの位置を使用して評価され、関数定義内に現れる位置では評価されません。ただし、デフォルト値が他のコードと一緒にマクロを含む大きな式である場合、それらのマクロは関数定義内に現れる位置で評価されます。

```swift
func f(a: Int = #line, b: Int = (#line), c: Int = 100 + #line) {
    print(a, b, c)
}
f()  // "4 1 101"と表示されます
```

上記の関数では、aのデフォルト値は単一のマクロ式であるため、そのマクロはf(a:b:c:)が呼び出されるソースコードの位置を使用して評価されます。対照的に、bとcの値はマクロを含む式であり、それらの式のマクロはf(a:b:c:)が定義されているソースコードの位置を使用して評価されます。

マクロをデフォルト値として使用する場合、次の要件を確認するためにマクロを展開せずに型チェックが行われます:
- マクロのアクセスレベルが、それを使用する関数と同じかそれよりも制限が少ないこと。
- マクロが引数を取らないか、引数が文字列補間を含まないリテラルであること。
- マクロの戻り値の型がパラメータの型と一致すること。

マクロ式を使用してフリースタンディングマクロを呼び出します。アタッチドマクロを呼び出すには、属性で説明されているカスタム属性構文を使用します。フリースタンディングマクロとアタッチドマクロの両方は次のように展開されます:
1. Swiftはソースコードを解析して抽象構文木（AST）を生成します。
2. マクロの実装は入力としてASTノードを受け取り、そのマクロに必要な変換を行います。
3. マクロの実装が生成した変換されたASTノードが元のASTに追加されます。

各マクロの展開は独立しており、自己完結しています。ただし、パフォーマンスの最適化として、Swiftはマクロを実装する外部プロセスを開始し、複数のマクロを展開するために同じプロセスを再利用する場合があります。マクロを実装する際、そのコードは以前に展開されたマクロや現在の時間などの外部状態に依存してはなりません。

ネストされたマクロや複数の役割を持つアタッチドマクロの場合、展開プロセスは繰り返されます。ネストされたマクロ展開式は外側から内側に展開されます。例えば、次のコードではouterMacro(_:)が最初に展開され、innerMacro(_:)への未展開の呼び出しがouterMacro(_:)の入力として抽象構文木に現れます。

```swift
#outerMacro(12, #innerMacro(34), "some text")
```

複数の役割を持つアタッチドマクロは、各役割ごとに一度展開されます。各展開は同じ元のASTを入力として受け取ります。Swiftは生成されたすべてのASTノードを収集し、それらをASTの対応する場所に配置して全体の展開を形成します。

Swiftのマクロの概要については、マクロを参照してください。


#### マクロ展開式の文法

```
macro-expansion-expression → # identifier generic-argument-clause? function-call-argument-clause? trailing-closures?
```


### キーパス式

キーパス式は、型のプロパティまたはサブスクリプトを参照します。キーパス式は、キー値監視などの動的プログラミングタスクで使用します。キーパス式は次の形式を持ちます：

```
\<#型名#>.<#パス#>
```

型名は、String、[Int]、または `Set<Int>` などのジェネリックパラメータを含む具体的な型の名前です。

パスは、プロパティ名、サブスクリプト、オプショナルチェーン式、および強制アンラップ式で構成されます。これらのキーパスコンポーネントは、必要に応じて何度でも、任意の順序で繰り返すことができます。

コンパイル時に、キーパス式は KeyPath クラスのインスタンスに置き換えられます。

キーパスを使用して値にアクセスするには、すべての型で利用可能な subscript(keyPath:) サブスクリプトにキーパスを渡します。例えば：

```swift
struct SomeStructure {
    var someValue: Int
}

let s = SomeStructure(someValue: 12)
let pathToProperty = \SomeStructure.someValue

let value = s[keyPath: pathToProperty]
// value は 12
```


型推論で暗黙の型を決定できるコンテキストでは、型名を省略できます。次のコードでは、\.someProperty の代わりに \SomeClass.someProperty を使用しています：

```swift
class SomeClass: NSObject {
    @objc dynamic var someProperty: Int
    init(someProperty: Int) {
        self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 10)
c.observe(\.someProperty) { object, change in
    // ...
}
```

パスは self を参照して、アイデンティティキーパス (\.self) を作成できます。アイデンティティキーパスはインスタンス全体を参照するため、変数に格納されているすべてのデータに一度にアクセスして変更することができます。例えば：

```swift
var compoundValue = (a: 1, b: 2)
// compoundValue = (a: 10, b: 20) と同等
compoundValue[keyPath: \.self] = (a: 10, b: 20)
```

パスには複数のプロパティ名を含めることができ、ピリオドで区切ってプロパティの値のプロパティを参照します。このコードでは、OuterStructure 型の outer プロパティの someValue プロパティにアクセスするために、キーパス式 \OuterStructure.outer.someValue を使用しています：

```swift
struct OuterStructure {
    var outer: SomeStructure
    init(someValue: Int) {
        self.outer = SomeStructure(someValue: someValue)
    }
}

let nested = OuterStructure(someValue: 24)
let nestedKeyPath = \OuterStructure.outer.someValue

let nestedValue = nested[keyPath: nestedKeyPath]
// nestedValue は 24
```

パスには、サブスクリプトのパラメータ型が Hashable プロトコルに準拠している限り、角括弧を使用してサブスクリプトを含めることができます。この例では、配列の2番目の要素にアクセスするためにキーパス内でサブスクリプトを使用しています：

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting は 'hola'
```

サブスクリプトで使用される値は、名前付き値またはリテラルであることができます。値は値セマンティクスを使用してキーパスにキャプチャされます。次のコードでは、変数 index をキーパス式とクロージャの両方で使用して、greetings 配列の3番目の要素にアクセスしています。index が変更されても、キーパス式は3番目の要素を参照し続けますが、クロージャは新しい index を使用します。

```swift
var index = 2
let path = \[String].[index]
let fn: ([String]) -> String = { strings in strings[index] }

print(greetings[keyPath: path])
// "bonjour" を出力
print(fn(greetings))
// "bonjour" を出力

// 'index' を新しい値に設定しても 'path' には影響しません
index += 1
print(greetings[keyPath: path])
// "bonjour" を出力

// 'fn' は 'index' をクロージャ内でキャプチャしているため、新しい値を使用します
print(fn(greetings))
// "안녕" を出力
```

パスはオプショナルチェーンと強制アンラップを使用できます。このコードでは、オプショナルチェーンをキーパス内で使用して、オプショナルな文字列のプロパティにアクセスしています：

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// "Optional(5)" を出力

// キーパスを使用して同じことを行います。
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// "Optional(5)" を出力
```

キーパスのコンポーネントを組み合わせて、型内に深くネストされた値にアクセスすることができます。次のコードでは、これらのコンポーネントを組み合わせたキーパス式を使用して、配列の辞書の異なる値とプロパティにアクセスしています。

```swift
let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                          "triangular": [1, 3, 6, 10, 15, 21, 28],
                          "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
// "Optional([2, 3, 5, 7, 11, 13, 17])" を出力
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
// "2" を出力
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
// "7" を出力
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
// "64" を出力
```

キーパス式を、通常は関数やクロージャを提供するコンテキストで使用できます。具体的には、ルート型が SomeType であり、パスが Value 型の値を生成するキーパス式を、(SomeType) -> Value 型の関数やクロージャの代わりに使用できます。

```swift
struct Task {
    var description: String
    var completed: Bool
}
var toDoList = [
    Task(description: "Practice ping-pong.", completed: false),
    Task(description: "Buy a pirate costume.", completed: true),
    Task(description: "Visit Boston in the Fall.", completed: false),
]

// 以下の両方のアプローチは同等です。
let descriptions = toDoList.filter(\.completed).map(\.description)
let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
```

キーパス式の副作用は、式が評価される時点でのみ評価されます。例えば、キーパス式のサブスクリプト内で関数呼び出しを行う場合、その関数は式の評価の一部として一度だけ呼び出され、キーパスが使用されるたびに呼び出されるわけではありません。

```swift
func makeIndex() -> Int {
    print("インデックスを作成しました")
    return 0
}
// 以下の行は makeIndex() を呼び出します。
let taskKeyPath = \[Task][makeIndex()]
// "インデックスを作成しました" を出力

// taskKeyPath を使用しても makeIndex() は再度呼び出されません。
let someTask = toDoList[keyPath: taskKeyPath]
```

Objective-C API と連携するコードでキーパスを使用する方法の詳細については、「Using Objective-C Runtime Features in Swift」を参照してください。キー値コーディングとキー値監視の詳細については、「Key-Value Coding Programming Guide」および「Key-Value Observing Programming Guide」を参照してください。




















#### キーパス式の文法

```
key-path-expression → \ type? . key-path-components
key-path-components → key-path-component | key-path-component . key-path-components
key-path-component → identifier key-path-postfixes? | key-path-postfixes
key-path-postfixes → key-path-postfix key-path-postfixes?
key-path-postfix → ? | ! | self | [ function-call-argument-list ]
```

### セレクタ式

セレクタ式を使用すると、Objective-Cでメソッドやプロパティのゲッターまたはセッターを参照するために使用されるセレクタにアクセスできます。次の形式を持ちます：

```
#selector(<#メソッド名#>)
#selector(getter: <#プロパティ名#>)
#selector(setter: <#プロパティ名#>)
```

メソッド名とプロパティ名は、Objective-Cランタイムで利用可能なメソッドまたはプロパティへの参照でなければなりません。セレクタ式の値はSelector型のインスタンスです。例えば：

```swift
class SomeClass: NSObject {
    @objc let property: String

    @objc(doSomethingWithInt:)
    func doSomething(_ x: Int) { }

    init(property: String) {
        self.property = property
    }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```

プロパティのゲッターのセレクタを作成する場合、プロパティ名は変数または定数プロパティへの参照であることができます。対照的に、プロパティのセッターのセレクタを作成する場合、プロパティ名は変数プロパティへの参照でなければなりません。

メソッド名には、グループ化のための括弧や、同じ名前を持つが異なる型シグネチャを持つメソッドを区別するためのas演算子を含めることができます。例えば：

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```

セレクタは実行時ではなくコンパイル時に作成されるため、コンパイラはメソッドやプロパティが存在し、それらがObjective-Cランタイムに公開されていることを確認できます。

> **注**: メソッド名とプロパティ名は式ですが、評価されることはありません。

Objective-C APIと連携するSwiftコードでセレクタを使用する方法の詳細については、「Using Objective-C Runtime Features in Swift」を参照してください。

#### セレクタ式の文法

```
selector-expression → #selector ( expression )
selector-expression → #selector ( getter: expression )
selector-expression → #selector ( setter: expression )
```

### キーパス文字列式

キーパス文字列式を使用すると、Objective-Cでプロパティを参照するために使用される文字列にアクセスできます。これはキー値コーディングおよびキー値監視APIで使用されます。次の形式を持ちます：

```
#keyPath(<#プロパティ名#>)
```

プロパティ名は、Objective-Cランタイムで利用可能なプロパティへの参照でなければなりません。コンパイル時に、キーパス文字列式は文字列リテラルに置き換えられます。例えば：

```swift
class SomeClass: NSObject {
    @objc var someProperty: Int
    init(someProperty: Int) {
       self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 12)
let keyPath = #keyPath(SomeClass.someProperty)

if let value = c.value(forKey: keyPath) {
    print(value)
}
// "12"と出力されます
```

クラス内でキーパス文字列式を使用する場合、クラス名なしでプロパティ名だけを書くことで、そのクラスのプロパティを参照できます。

```swift
extension SomeClass {
    func getSomeKeyPath() -> String {
        return #keyPath(someProperty)
    }
}
print(keyPath == c.getSomeKeyPath())
// "true"と出力されます
```

キーパス文字列は実行時ではなくコンパイル時に作成されるため、コンパイラはプロパティが存在し、それがObjective-Cランタイムに公開されていることを確認できます。

Objective-C APIと連携するSwiftコードでキーパスを使用する方法の詳細については、「Using Objective-C Runtime Features in Swift」を参照してください。キー値コーディングおよびキー値監視の詳細については、「Key-Value Coding Programming Guide」および「Key-Value Observing Programming Guide」を参照してください。

> **注**: プロパティ名は式ですが、評価されることはありません。

#### キーパス文字列式の文法

```
key-path-string-expression → #keyPath ( expression )
```

## 後置式

後置式は、後置演算子や他の後置構文を式に適用することで形成されます。構文的には、すべての基本式も後置式です。

これらの演算子の動作については、基本演算子と高度な演算子を参照してください。Swift標準ライブラリによって提供される演算子については、演算子宣言を参照してください。

### 後置式の文法

```
postfix-expression → primary-expression
postfix-expression → postfix-expression postfix-operator
postfix-expression → function-call-expression
postfix-expression → initializer-expression
postfix-expression → explicit-member-expression
postfix-expression → postfix-self-expression
postfix-expression → subscript-expression
postfix-expression → forced-value-expression
postfix-expression → optional-chaining-expression
```

### 関数呼び出し式

関数呼び出し式は、関数名の後にカンマで区切られた関数の引数のリストを括弧内に続けたものです。関数呼び出し式は次の形式を持ちます：

```
<#function name#>(<#argument value 1#>, <#argument value 2#>)
```

関数名は、値が関数型である任意の式で構いません。

関数定義にパラメータの名前が含まれている場合、関数呼び出しには引数値の前に名前を含める必要があり、コロン（:）で区切られます。この種の関数呼び出し式は次の形式を持ちます：

```
<#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)
```

関数呼び出し式には、閉じ括弧の直後にクロージャ式としてトレーリングクロージャを含めることができます。トレーリングクロージャは、最後の括弧内の引数の後に追加される関数の引数として理解されます。以下の例は、トレーリングクロージャ構文を使用する場合と使用しない場合の関数呼び出しの等価なバージョンを示しています：

```swift
// someFunctionは整数とクロージャを引数として取ります
someFunction(x: x, f: { $0 == 13 })
someFunction(x: x) { $0 == 13 }

// anotherFunctionは整数と2つのクロージャを引数として取ります
anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
anotherFunction(x: x) { $0 == 13 } g: { print(99) }
```

トレーリングクロージャが関数の唯一の引数である場合、括弧を省略できます。

```swift
// someMethodはクロージャを唯一の引数として取ります
myData.someMethod() { $0 == 13 }
myData.someMethod { $0 == 13 }
```

トレーリングクロージャを引数に含めるために、コンパイラは関数のパラメータを左から右に次のように調べます：

| トレーリングクロージャ | パラメータ | アクション |
|------------------|-----------|--------|
| ラベル付き          | ラベル付き   | ラベルが同じ場合、クロージャはパラメータに一致します。それ以外の場合、パラメータはスキップされます。 |
| ラベル付き          | ラベルなし | パラメータはスキップされます。 |
| ラベルなし        | ラベル付きまたはラベルなし | パラメータが以下で定義されるように関数型に構造的に似ている場合、クロージャはパラメータに一致します。それ以外の場合、パラメータはスキップされます。 |

トレーリングクロージャは、一致するパラメータの引数として渡されます。スキャンプロセス中にスキップされたパラメータには引数が渡されません。たとえば、デフォルトパラメータを使用できます。一致が見つかった後、スキャンは次のトレーリングクロージャと次のパラメータで続行されます。マッチングプロセスの最後に、すべてのトレーリングクロージャは一致する必要があります。

パラメータが関数型に構造的に似ている場合、パラメータは次のいずれかです：
- 型が関数型であるパラメータ、例：(Bool) -> Int
- ラップされた式の型が関数型である自動クロージャパラメータ、例：@autoclosure () -> ((Bool) -> Int)
- 配列要素の型が関数型である可変長パラメータ、例：((Bool) -> Int)...
- 型が1つ以上のオプションでラップされているパラメータ、例：Optional<(Bool) -> Int>
- これらの許可された型を組み合わせた型を持つパラメータ、例：(Optional<(Bool) -> Int>)...

トレーリングクロージャが関数型に構造的に似ているが関数ではないパラメータに一致する場合、必要に応じてクロージャがラップされます。たとえば、パラメータの型がオプション型である場合、クロージャは自動的にOptionalにラップされます。

Swift 5.3以前のバージョンからのコードの移行を容易にするために、コンパイラは左から右および右から左の順序の両方をチェックします。スキャン方向が異なる結果を生成する場合、古い右から左の順序が使用され、コンパイラは警告を生成します。将来のバージョンのSwiftでは、常に左から右の順序が使用されます。

```swift
typealias Callback = (Int) -> Int
func someFunction(firstClosure: Callback? = nil,
                secondClosure: Callback? = nil) {
    let first = firstClosure?(10)
    let second = secondClosure?(20)
    print(first ?? "-", second ?? "-")
}

someFunction()  // "- -"と表示
someFunction { return $0 + 100 }  // 曖昧
someFunction { return $0 } secondClosure: { return $0 }  // "10 20"と表示
```

上記の例では、「曖昧」とマークされた関数呼び出しはSwift 5.3では「- 120」と表示され、コンパイラ警告が生成されます。将来のバージョンのSwiftでは「110 -」と表示されます。

クラス、構造体、または列挙型は、特別な名前を持つメソッドを宣言することで、関数呼び出し構文の糖衣構文を有効にできます。詳細は、特別な名前を持つメソッドを参照してください。

### ポインタ型への暗黙的な変換

関数呼び出し式では、引数とパラメータの型が異なる場合、コンパイラは次のリストにある暗黙的な変換のいずれかを適用して型を一致させようとします:
- `inout SomeType` は `UnsafePointer<SomeType>` または `UnsafeMutablePointer<SomeType>` になることができます
- `inout Array<SomeType>` は `UnsafePointer<SomeType>` または `UnsafeMutablePointer<SomeType>` になることができます
- `Array<SomeType>` は `UnsafePointer<SomeType>` になることができます
- `String` は `UnsafePointer<CChar>` になることができます

次の2つの関数呼び出しは同等です:

```swift
func unsafeFunction(pointer: UnsafePointer<Int>) {
    // ...
}
var myNumber = 1234

unsafeFunction(pointer: &myNumber)
withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
```

これらの暗黙的な変換によって作成されたポインタは、関数呼び出しの期間中のみ有効です。未定義の動作を避けるために、関数呼び出しが終了した後にポインタを保持しないようにしてください。

> **注意**: 配列を暗黙的にunsafeポインタに変換する場合、Swiftは必要に応じて配列を変換またはコピーすることで、配列のストレージが連続していることを保証します。例えば、NSArrayサブクラスからArrayにブリッジされた配列でこの構文を使用することができます。この作業が不要であることを保証するために、配列のストレージが既に連続していることを保証する必要がある場合は、Arrayの代わりにContiguousArrayを使用してください。

&を使用する代わりにwithUnsafePointer(to:)のような明示的な関数を使用することで、特に関数が複数のポインタ引数を取る場合、低レベルのC関数への呼び出しをより読みやすくすることができます。ただし、他のSwiftコードから関数を呼び出す場合、&を使用する代わりにunsafe APIを明示的に使用することを避けてください。

#### 関数呼び出し式の文法

```
function-call-expression → postfix-expression function-call-argument-clause
function-call-expression → postfix-expression function-call-argument-clause? trailing-closures
function-call-argument-clause → ( ) | ( function-call-argument-list )
function-call-argument-list → function-call-argument | function-call-argument , function-call-argument-list
function-call-argument → expression | identifier : expression
function-call-argument → operator | identifier : operator
trailing-closures → closure-expression labeled-trailing-closures?
labeled-trailing-closures → labeled-trailing-closure labeled-trailing-closures?
labeled-trailing-closure → identifier : closure-expression
```

### イニシャライザ式

イニシャライザ式は、型のイニシャライザへのアクセスを提供します。次の形式を持ちます:

```
<#expression#>.init(<#initializer arguments#>)
```

イニシャライザ式を関数呼び出し式で使用して、新しいインスタンスを初期化します。また、スーパークラスのイニシャライザに委譲するためにもイニシャライザ式を使用します。

```swift
class SomeSubClass: SomeSuperClass {
    override init() {
        // サブクラスの初期化はここに記述します
        super.init()
    }
}
```

関数のように、イニシャライザも値として使用できます。例えば:

```swift
// Stringには複数のイニシャライザがあるため、型注釈が必要です。
let initializer: (Int) -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
print(oneTwoThree)
// "123"と表示されます
```

型を名前で指定する場合、イニシャライザ式を使用せずに型のイニシャライザにアクセスできます。それ以外の場合は、イニシャライザ式を使用する必要があります。

```swift
let s1 = SomeType.init(data: 3)  // 有効
let s2 = SomeType(data: 1)       // これも有効

let s3 = type(of: someValue).init(data: 7)  // 有効
let s4 = type(of: someValue)(data: 5)       // エラー
```

#### イニシャライザ式の文法

```
initializer-expression → postfix-expression . init
initializer-expression → postfix-expression . init ( argument-names )
```

### 明示的メンバー式

明示的メンバー式は、名前付き型、タプル、またはモジュールのメンバーへのアクセスを提供します。これは、項目とそのメンバーの識別子の間にピリオド（.）を置くことで構成されます。

```
<#expression#>.<#member name#>
```

名前付き型のメンバーは、型の宣言または拡張の一部として名前が付けられます。例えば:

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // メンバーアクセス
```

タプルのメンバーは、0から始まる整数を使用して暗黙的に名前が付けられます。例えば:

```swift
var t = (10, 20, 30)
t.0 = t.1
// tは(20, 20, 30)になります
```

モジュールのメンバーは、そのモジュールのトップレベル宣言にアクセスします。

dynamicMemberLookup属性で宣言された型には、実行時に検索されるメンバーが含まれます。詳細はAttributesを参照してください。

引数の名前だけが異なるメソッドやイニシャライザを区別するために、引数の名前を括弧内に含め、各引数の名前の後にコロン（:）を付けます。名前のない引数にはアンダースコア（_）を書きます。オーバーロードされたメソッドを区別するために、型注釈を使用します。例えば:

```swift
class SomeClass {
    func someMethod(x: Int, y: Int) {}
    func someMethod(x: Int, z: Int) {}
    func overloadedMethod(x: Int, y: Int) {}
    func overloadedMethod(x: Int, y: Bool) {}
}
let instance = SomeClass()

let a = instance.someMethod              // 曖昧
let b = instance.someMethod(x:y:)        // 明確

let d = instance.overloadedMethod        // 曖昧
let d = instance.overloadedMethod(x:y:)  // まだ曖昧
let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // 明確
```

行の先頭にピリオドがある場合、それは明示的メンバー式の一部として理解され、暗黙的メンバー式としては理解されません。例えば、次のリストは複数行に分割された連鎖メソッド呼び出しを示しています:

```swift
let x = [10, 3, 20, 15, 4]
    .sorted()
    .filter { $0 > 5 }
    .map { $0 * 100 }
```

この複数行の連鎖構文をコンパイラ制御文と組み合わせて、各メソッドが呼び出されるタイミングを制御できます。例えば、次のコードはiOSで異なるフィルタリングルールを使用します:

```swift
let numbers = [10, 20, 33, 43, 50]
#if os(iOS)
    .filter { $0 < 40 }
#else
    .filter { $0 > 25 }
#endif
```

#if、#endif、および他のコンパイルディレクティブの間で、条件付きコンパイルブロックには、ゼロまたはそれ以上の後置を持つ暗黙的メンバー式を含めることができます。また、別の条件付きコンパイルブロック、またはこれらの式とブロックの組み合わせを含めることもできます。

この構文は、トップレベルコードだけでなく、明示的メンバー式を記述できる場所ならどこでも使用できます。

条件付きコンパイルブロックでは、#ifコンパイルディレクティブのブランチには少なくとも1つの式を含める必要があります。他のブランチは空でもかまいません。

#### 明示的メンバー式の文法

```
explicit-member-expression → postfix-expression . decimal-digits
explicit-member-expression → postfix-expression . identifier generic-argument-clause?
explicit-member-expression → postfix-expression . identifier ( argument-names )
explicit-member-expression → postfix-expression conditional-compilation-block
argument-names → argument-name argument-names?
argument-name → identifier :
```



### 後置Self式

後置Self式は、式または型の名前の直後に.selfが続く形式です。次の形式があります：

```
<#expression#>.self
<#type#>.self
```

最初の形式は、式の値を評価します。例えば、x.selfはxを評価します。

2番目の形式は、型の値を評価します。この形式を使用して、型を値としてアクセスします。例えば、SomeClass.selfはSomeClass型自体を評価するため、型レベルの引数を受け取る関数やメソッドに渡すことができます。

#### 後置Self式の文法

```
postfix-self-expression → postfix-expression . self
```

### 添字式

添字式は、対応する添字宣言のゲッターとセッターを使用して添字アクセスを提供します。次の形式があります：

```
<#expression#>[<#index expressions#>]
```

添字式の値を評価するには、式の型の添字ゲッターが添字パラメータとしてインデックス式を渡して呼び出されます。その値を設定するには、同じ方法で添字セッターが呼び出されます。

添字宣言の詳細については、「プロトコル添字宣言」を参照してください。

#### 添字式の文法

```
subscript-expression → postfix-expression [ function-call-argument-list ]
```

### 強制アンラップ式

強制アンラップ式は、nilでないことが確実なオプショナル値をアンラップします。次の形式があります：

```
<#expression#>!
```

式の値がnilでない場合、オプショナル値はアンラップされ、対応する非オプショナル型で返されます。そうでない場合、ランタイムエラーが発生します。

強制アンラップ式のアンラップされた値は、値自体を変更するか、値のメンバーに代入することで変更できます。例えば：

```swift
var x: Int? = 0
x! += 1
// xは現在1です

var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionaryは現在["a": [100, 2, 3], "b": [10, 20]]です
```

#### 強制アンラップ式の文法

```
forced-value-expression → postfix-expression !
```

### オプショナルチェーン式

オプショナルチェーン式は、後置式でオプショナル値を使用するための簡略化された構文を提供します。次の形式があります：

```
<#expression#>?
```

後置?演算子は、式の値を変更せずにオプショナルチェーン式を作成します。

オプショナルチェーン式は後置式内に現れる必要があり、後置式を特別な方法で評価させます。オプショナルチェーン式の値がnilの場合、後置式の他のすべての操作は無視され、後置式全体がnilと評価されます。オプショナルチェーン式の値がnilでない場合、オプショナルチェーン式の値はアンラップされ、後置式の残りを評価するために使用されます。いずれの場合も、後置式の値は依然としてオプショナル型です。

オプショナルチェーン式を含む後置式が他の後置式内にネストされている場合、最も外側の式のみがオプショナル型を返します。以下の例では、cがnilでない場合、その値はアンラップされ、.propertyを評価するために使用され、その値が.performAction()を評価するために使用されます。式全体c?.property.performAction()はオプショナル型の値を持ちます。

```swift
var c: SomeClass?
var result: Bool? = c?.property.performAction()
```

以下の例は、オプショナルチェーンを使用せずに上記の例の動作を示しています。

```swift
var result: Bool?
if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
```

オプショナルチェーン式のアンラップされた値は、値自体を変更するか、値のメンバーに代入することで変更できます。オプショナルチェーン式の値がnilの場合、代入演算子の右側の式は評価されません。例えば：

```swift
func someFunctionWithSideEffects() -> Int {
    return 42  // 実際の副作用はありません。
}
var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["not here"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffectsは評価されません
// someDictionaryは依然として["a": [1, 2, 3], "b": [10, 20]]です

someDictionary["a"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffectsは評価され、42を返します
// someDictionaryは現在["a": [42, 2, 3], "b": [10, 20]]です
```

#### オプショナルチェーン式の文法

```
optional-chaining-expression → postfix-expression ?
```