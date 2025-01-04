# 宣言

型、演算子、変数、およびその他の名前や構造を導入します。

宣言は、プログラムに新しい名前や構造を導入します。例えば、関数やメソッドを導入するため、変数や定数を導入するため、列挙型、構造体、クラス、およびプロトコル型を定義するために宣言を使用します。また、既存の名前付き型の動作を拡張するためや、他の場所で宣言されたシンボルをプログラムにインポートするためにも宣言を使用できます。

Swiftでは、ほとんどの宣言は宣言されると同時に実装または初期化されるという意味で定義でもあります。とはいえ、プロトコルはメンバーを実装しないため、ほとんどのプロトコルメンバーは宣言のみです。便宜上、そしてSwiftではこの区別がそれほど重要でないため、宣言という用語は宣言と定義の両方をカバーします。

## 宣言の文法

```
declaration → import-declaration
declaration → constant-declaration
declaration → variable-declaration
declaration → typealias-declaration
declaration → function-declaration
declaration → enum-declaration
declaration → struct-declaration
declaration → class-declaration
declaration → actor-declaration
declaration → protocol-declaration
declaration → initializer-declaration
declaration → deinitializer-declaration
declaration → extension-declaration
declaration → subscript-declaration
declaration → macro-declaration
declaration → operator-declaration
declaration → precedence-group-declaration
```

## トップレベルコード

Swiftソースファイルのトップレベルコードは、0個以上の文、宣言、および式で構成されます。デフォルトでは、ソースファイルのトップレベルで宣言された変数、定数、およびその他の名前付き宣言は、同じモジュールのすべてのソースファイルのコードからアクセスできます。このデフォルトの動作は、アクセスレベル修飾子を宣言に付けることでオーバーライドできます。詳細はアクセス制御レベルを参照してください。

トップレベルコードには、トップレベル宣言と実行可能なトップレベルコードの2種類があります。トップレベル宣言は宣言のみで構成され、すべてのSwiftソースファイルで許可されます。実行可能なトップレベルコードは、宣言だけでなく文や式を含み、プログラムのトップレベルエントリポイントとしてのみ許可されます。

コンパイルして実行可能にするSwiftコードには、コードがファイルやモジュールにどのように整理されているかに関係なく、次のいずれかの方法でトップレベルエントリポイントをマークすることができます: `main`属性、`NSApplicationMain`属性、`UIApplicationMain`属性、`main.swift`ファイル、またはトップレベル実行可能コードを含むファイル。

### トップレベル宣言の文法

```
top-level-declaration → statements?
```

## コードブロック

コードブロックは、文をグループ化するためにさまざまな宣言や制御構造で使用されます。次の形式を持ちます:

```
{
   <#statements#>
}
```

コードブロック内の文には宣言、式、およびその他の種類の文が含まれ、ソースコードの出現順に実行されます。

### コードブロックの文法

```
code-block → { statements? }
```

## インポート宣言

インポート宣言を使用すると、現在のファイルの外部で宣言されたシンボルにアクセスできます。基本形式はモジュール全体をインポートします。`import`キーワードに続いてモジュール名が続きます:

```
import <#module#>
```

詳細を指定すると、インポートされるシンボルが制限されます。特定のサブモジュールやモジュールまたはサブモジュール内の特定の宣言を指定できます。この詳細形式が使用されると、インポートされたシンボルのみが現在のスコープで利用可能になり、それを宣言するモジュールは利用できません。

```
import <#import kind#> <#module#>.<#symbol name#>
import <#module#>.<#submodule#>
```

### インポート宣言の文法

```
import-declaration → attributes? import import-kind? import-path
import-kind → typealias | struct | class | enum | protocol | let | var | func
import-path → identifier | identifier . import-path
```

## 定数宣言

定数宣言は、プログラムに定数の名前付き値を導入します。定数宣言は`let`キーワードを使用して宣言され、次の形式を持ちます:

```
let <#constant name#>: <#type#> = <#expression#>
```

定数宣言は、定数名と初期化式の値との間に不変のバインディングを定義します。定数の値が設定された後は変更できません。とはいえ、定数がクラスオブジェクトで初期化された場合、オブジェクト自体は変更できますが、定数名とそれが参照するオブジェクトとのバインディングは変更できません。

グローバルスコープで定数が宣言される場合、値で初期化されなければなりません。関数やメソッドのコンテキストで定数宣言が行われる場合、最初に値が読み取られる前に値が設定されることが保証されている限り、後で初期化できます。コンパイラが定数の値が決して読み取られないことを証明できる場合、定数は値を設定する必要はありません。この分析は確定初期化と呼ばれ、コンパイラは値が読み取られる前に確実に設定されることを証明します。

> **注**: 確定初期化はドメイン知識を必要とする証明を構築することはできず、条件付きでの状態追跡能力には限界があります。定数が常に値を持つことを確認できるが、コンパイラがこれを証明できない場合、値を設定するコードパスを簡素化するか、代わりに変数宣言を使用してください。

クラスや構造体の宣言のコンテキストで定数宣言が行われる場合、それは定数プロパティと見なされます。定数宣言は計算プロパティではないため、ゲッターやセッターを持ちません。

定数宣言の定数名がタプルパターンである場合、タプル内の各項目の名前は初期化式の対応する値にバインドされます。

```
let (firstNumber, secondNumber) = (10, 42)
```

この例では、`firstNumber`は値`10`の名前付き定数であり、`secondNumber`は値`42`の名前付き定数です。両方の定数は独立して使用できます:

```
print("最初の数は \(firstNumber) です。")
// "最初の数は 10 です。"と表示されます。
print("2番目の数は \(secondNumber) です。")
// "2番目の数は 42 です。"と表示されます。
```

定数宣言では、定数名の型が推論できる場合、型注釈（`: type`）は省略可能です。詳細は型推論を参照してください。

定数型プロパティを宣言するには、宣言に`static`宣言修飾子を付けます。クラスの定数型プロパティは常に暗黙的にfinalです。サブクラスによるオーバーライドを許可または禁止するために、`class`や`final`宣言修飾子を付けることはできません。型プロパティの詳細は型プロパティを参照してください。

定数の詳細および使用する際のガイダンスについては、定数と変数および格納プロパティを参照してください。

### 定数宣言の文法

```
constant-declaration → attributes? declaration-modifiers? let pattern-initializer-list
pattern-initializer-list → pattern-initializer | pattern-initializer , pattern-initializer-list
pattern-initializer → pattern initializer?
initializer → = expression
```

## 変数宣言

変数宣言は、プログラムに値という名前の変数を導入し、`var`キーワードを使用して宣言されます。

変数宣言には、格納変数や計算変数、プロパティ、格納変数およびプロパティオブザーバ、静的変数プロパティなど、さまざまな形式があります。適切な形式は、変数が宣言されるスコープと宣言しようとしている変数の種類によって異なります。

> **注**: プロトコル宣言の文脈でプロパティを宣言することもできます。詳細はプロトコルプロパティ宣言を参照してください。

サブクラスのプロパティ宣言に`override`宣言修飾子を付けることで、サブクラスのプロパティをオーバーライドすることができます。詳細はオーバーライドを参照してください。

### 格納変数と格納変数プロパティ

次の形式は、格納変数または格納変数プロパティを宣言します：

```
var <#variable name#>: <#type#> = <#expression#>
```

この形式の変数宣言は、グローバルスコープ、関数のローカルスコープ、またはクラスや構造体の宣言の文脈で定義します。この形式の変数宣言がグローバルスコープまたは関数のローカルスコープで宣言されると、それは格納変数と呼ばれます。クラスや構造体の宣言の文脈で宣言されると、それは格納変数プロパティと呼ばれます。

初期化式はプロトコル宣言では存在できませんが、他のすべての文脈では初期化式はオプションです。とはいえ、初期化式が存在しない場合、変数宣言には明示的な型注釈（`: 型`）を含める必要があります。

定数宣言と同様に、変数宣言が初期化式を省略する場合、変数は最初に読み取られる前に値が設定されている必要があります。また、定数宣言と同様に、変数名がタプルパターンである場合、タプル内の各項目の名前は初期化式の対応する値にバインドされます。

名前が示すように、格納変数または格納変数プロパティの値はメモリに格納されます。

### 計算変数と計算プロパティ

次の形式は、計算変数または計算プロパティを宣言します：

```
var <#variable name#>: <#type#> {
   get {
      <#statements#>
   }
   set(<#setter name#>) {
      <#statements#>
   }
}
```

この形式の変数宣言は、グローバルスコープ、関数のローカルスコープ、またはクラス、構造体、列挙型、拡張の宣言の文脈で定義します。この形式の変数宣言がグローバルスコープまたは関数のローカルスコープで宣言されると、それは計算変数と呼ばれます。クラス、構造体、または拡張の宣言の文脈で宣言されると、それは計算プロパティと呼ばれます。

ゲッターは値を読み取るために使用され、セッターは値を書き込むために使用されます。セッター句はオプションであり、ゲッターのみが必要な場合は、両方の句を省略して要求された値を直接返すことができます。詳細は読み取り専用計算プロパティを参照してください。しかし、セッター句を提供する場合は、ゲッター句も提供する必要があります。

セッター名と括弧はオプションです。セッター名を提供する場合、それはセッターのパラメータ名として使用されます。セッター名を提供しない場合、セッターのデフォルトのパラメータ名は`newValue`です。詳細は省略形セッター宣言を参照してください。

格納された名前付き値や格納変数プロパティとは異なり、計算された名前付き値や計算プロパティの値はメモリに格納されません。

詳細および計算プロパティの例については、計算プロパティを参照してください。

### 格納変数オブザーバとプロパティオブザーバ

`willSet`および`didSet`オブザーバを使用して格納変数またはプロパティを宣言することもできます。オブザーバを使用して宣言された格納変数またはプロパティは次の形式です：

```
var <#variable name#>: <#type#> = <#expression#> {
   willSet(<#setter name#>) {
      <#statements#>
   }
   didSet(<#setter name#>) {
      <#statements#>
   }
}
```

この形式の変数宣言は、グローバルスコープ、関数のローカルスコープ、またはクラスや構造体の宣言の文脈で定義します。この形式の変数宣言がグローバルスコープまたは関数のローカルスコープで宣言されると、オブザーバは格納変数オブザーバと呼ばれます。クラスや構造体の宣言の文脈で宣言されると、オブザーバはプロパティオブザーバと呼ばれます。

プロパティオブザーバは任意の格納プロパティに追加できます。また、サブクラス内でプロパティをオーバーライドすることで、継承されたプロパティ（格納プロパティまたは計算プロパティのいずれか）にプロパティオブザーバを追加することもできます。詳細はプロパティオブザーバのオーバーライドを参照してください。

初期化式はクラスや構造体の宣言の文脈ではオプションですが、それ以外の場所では必須です。型注釈は初期化式から型を推論できる場合はオプションです。この式はプロパティの値が最初に読み取られるときに評価されます。プロパティの初期値を読み取らずに上書きする場合、この式はプロパティに最初に書き込まれる前に評価されます。

`willSet`および`didSet`オブザーバは、変数またはプロパティの値が設定されるときにそれを監視し、適切に応答する方法を提供します。オブザーバは変数またはプロパティが初期化されるときには呼び出されません。代わりに、値が初期化コンテキストの外で設定されるときにのみ呼び出されます。

`willSet`オブザーバは、変数またはプロパティの値が設定される直前に呼び出されます。新しい値は定数として`willSet`オブザーバに渡されるため、`willSet`句の実装で変更することはできません。`didSet`オブザーバは、新しい値が設定された直後に呼び出されます。`willSet`オブザーバとは対照的に、変数またはプロパティの古い値は`didSet`オブザーバに渡されるため、まだアクセスする必要がある場合に使用できます。とはいえ、`didSet`オブザーバ句内で変数またはプロパティに値を割り当てると、その割り当てた新しい値が`willSet`オブザーバに渡された値を置き換えます。

`willSet`および`didSet`句のセッター名と括弧はオプションです。セッター名を提供する場合、それは`willSet`および`didSet`オブザーバのパラメータ名として使用されます。セッター名を提供しない場合、`willSet`オブザーバのデフォルトのパラメータ名は`newValue`であり、`didSet`オブザーバのデフォルトのパラメータ名は`oldValue`です。

`didSet`句を提供する場合、`willSet`句はオプションです。同様に、`willSet`句を提供する場合、`didSet`句はオプションです。

`didSet`オブザーバの本文が古い値に言及している場合、オブザーバの前にゲッターが呼び出され、古い値が利用可能になります。それ以外の場合、新しい値はスーパークラスのゲッターを呼び出さずに格納されます。以下の例は、スーパークラスによって定義され、サブクラスによってオブザーバを追加するためにオーバーライドされた計算プロパティを示しています。

```swift
class Superclass {
    private var xValue = 12
    var x: Int {
        get { print("ゲッターが呼び出されました"); return xValue }
        set { print("セッターが呼び出されました"); xValue = newValue }
    }
}

// このサブクラスはオブザーバ内でoldValueに言及していないため、
// スーパークラスのゲッターは値を印刷するために一度だけ呼び出されます。
class New: Superclass {
    override var x: Int {
        didSet { print("新しい値 \(x)") }
    }
}
let new = New()
new.x = 100
// "セッターが呼び出されました"を印刷
// "ゲッターが呼び出されました"を印刷
// "新しい値 100"を印刷

// このサブクラスはオブザーバ内でoldValueに言及しているため、
// スーパークラスのゲッターはセッターの前に一度呼び出され、
// 値を印刷するために再度呼び出されます。
class NewAndOld: Superclass {
    override var x: Int {
        didSet { print("古い値 \(oldValue) - 新しい値 \(x)") }
    }
}
let newAndOld = NewAndOld()
newAndOld.x = 200
// "ゲッターが呼び出されました"を印刷
// "セッターが呼び出されました"を印刷
// "ゲッターが呼び出されました"を印刷
// "古い値 12 - 新しい値 200"を印刷
```

プロパティオブザーバの使用方法の詳細および例については、プロパティオブザーバを参照してください。

### 型変数プロパティ

型変数プロパティを宣言するには、宣言に `static` 宣言修飾子を付けます。クラスは `class` 宣言修飾子を使用して型計算プロパティをマークし、サブクラスがスーパークラスの実装をオーバーライドできるようにすることもできます。型プロパティについては、型プロパティで説明します。

### 変数宣言の文法

```
variable-declaration → variable-declaration-head pattern-initializer-list
variable-declaration → variable-declaration-head variable-name type-annotation code-block
variable-declaration → variable-declaration-head variable-name type-annotation getter-setter-block
variable-declaration → variable-declaration-head variable-name type-annotation getter-setter-keyword-block
variable-declaration → variable-declaration-head variable-name initializer willSet-didSet-block
variable-declaration → variable-declaration-head variable-name type-annotation initializer? willSet-didSet-block
variable-declaration-head → attributes? declaration-modifiers? var
variable-name → identifier
getter-setter-block → code-block
getter-setter-block → { getter-clause setter-clause? }
getter-setter-block → { setter-clause getter-clause }
getter-clause → attributes? mutation-modifier? get code-block
setter-clause → attributes? mutation-modifier? set setter-name? code-block
setter-name → ( identifier )
getter-setter-keyword-block → { getter-keyword-clause setter-keyword-clause? }
getter-setter-keyword-block → { setter-keyword-clause getter-keyword-clause }
getter-keyword-clause → attributes? mutation-modifier? get
setter-keyword-clause → attributes? mutation-modifier? set
willSet-didSet-block → { willSet-clause didSet-clause? }
willSet-didSet-block → { didSet-clause willSet-clause? }
willSet-clause → attributes? willSet setter-name? code-block
didSet-clause → attributes? didSet setter-name? code-block
```

## 型エイリアス宣言

型エイリアス宣言は、既存の型の名前付きエイリアスをプログラムに導入します。型エイリアス宣言は `typealias` キーワードを使用して宣言され、次の形式を持ちます。

```
typealias <#name#> = <#existing type#>
```

型エイリアスが宣言されると、プログラム内のどこでも既存の型の代わりにエイリアス名を使用できます。既存の型は名前付き型または複合型である可能性があります。型エイリアスは新しい型を作成するのではなく、単に既存の型を参照する名前を提供します。

型エイリアス宣言は、ジェネリックパラメータを使用して既存のジェネリック型に名前を付けることができます。型エイリアスは、既存の型のジェネリックパラメータの一部またはすべてに具体的な型を提供できます。例えば：

```swift
typealias StringDictionary<Value> = Dictionary<String, Value>

// 次の辞書は同じ型を持ちます。
var dictionary1: StringDictionary<Int> = [:]
var dictionary2: Dictionary<String, Int> = [:]
```

ジェネリックパラメータを持つ型エイリアスが宣言される場合、これらのパラメータに対する制約は、既存の型のジェネリックパラメータに対する制約と完全に一致する必要があります。例えば：

```swift
typealias DictionaryOfInts<Key: Hashable> = Dictionary<Key, Int>
```

型エイリアスと既存の型は互換性があるため、型エイリアスは追加のジェネリック制約を導入することはできません。

型エイリアスは、宣言からすべてのジェネリックパラメータを省略することで、既存の型のジェネリックパラメータを転送できます。例えば、ここで宣言された `Diccionario` 型エイリアスは、`Dictionary` と同じジェネリックパラメータと制約を持ちます。

```swift
typealias Diccionario = Dictionary
```

プロトコル宣言内では、型エイリアスは頻繁に使用される型に対して短くて便利な名前を提供できます。例えば：

```swift
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    typealias Element = Iterator.Element
}

func sum<T: Sequence>(_ sequence: T) -> Int where T.Element == Int {
    // ...
}
```

この型エイリアスがなければ、`sum` 関数は関連型を `T.Element` ではなく `T.Iterator.Element` として参照する必要があります。

[プロトコル関連型宣言](#)も参照してください。

### 型エイリアス宣言の文法

```
typealias-declaration → attributes? access-level-modifier? typealias typealias-name generic-parameter-clause? typealias-assignment
typealias-name → identifier
typealias-assignment → = type
```

## 関数宣言

関数宣言は、プログラムに関数またはメソッドを導入します。クラス、構造体、列挙型、またはプロトコルのコンテキストで宣言された関数はメソッドと呼ばれます。関数宣言は `func` キーワードを使用して宣言され、次の形式を持ちます。

```swift
func <#function name#>(<#parameters#>) -> <#return type#> {
   <#statements#>
}
```

関数の戻り値の型が `Void` の場合、戻り値の型を次のように省略できます。

```swift
func <#function name#>(<#parameters#>) {
   <#statements#>
}
```

各パラメータの型は含める必要があり、推論することはできません。パラメータの型の前に `inout` と書くと、そのパラメータは関数のスコープ内で変更できます。インアウトパラメータについては、以下の[インアウトパラメータ](#in-out-parameters)で詳しく説明します。

ステートメントが単一の式のみを含む関数宣言は、その式の値を返すと理解されます。この暗黙の戻り構文は、式の型と関数の戻り値の型が `Void` ではなく、`Never` のようなケースを持たない列挙型でもない場合にのみ考慮されます。

関数は、タプル型を関数の戻り値の型として使用して複数の値を返すことができます。

関数定義は、別の関数宣言内に現れることがあります。この種類の関数はネストされた関数と呼ばれます。

ネストされた関数は、インアウトパラメータのように決してエスケープしないことが保証された値をキャプチャする場合、または非エスケープ関数引数として渡される場合、非エスケープ関数です。それ以外の場合、ネストされた関数はエスケープ関数です。

ネストされた関数の議論については、[ネストされた関数](#nested-functions)を参照してください。

### パラメータ名

関数パラメータは、各パラメータがいくつかの形式の1つを持つカンマ区切りのリストです。関数呼び出しにおける引数の順序は、関数の宣言におけるパラメータの順序と一致する必要があります。パラメータリストの最も単純なエントリは次の形式を持ちます：

```
<#parameter name#>: <#parameter type#>
```

パラメータには、関数本体内で使用される名前と、関数またはメソッドを呼び出すときに使用される引数ラベルがあります。デフォルトでは、パラメータ名も引数ラベルとして使用されます。例えば：

```swift
func f(x: Int, y: Int) -> Int { return x + y }
f(x: 1, y: 2) // x と y は両方ともラベル付き
```

引数ラベルのデフォルトの動作を次の形式のいずれかでオーバーライドできます：

```
<#argument label#> <#parameter name#>: <#parameter type#>
_ <#parameter name#>: <#parameter type#>
```

パラメータ名の前に名前を付けると、そのパラメータに引数ラベルが明示的に付けられ、パラメータ名とは異なる場合があります。対応する引数は、関数またはメソッド呼び出しで指定された引数ラベルを使用する必要があります。

パラメータ名の前にアンダースコア（`_`）を付けると、引数ラベルが抑制されます。対応する引数には、関数またはメソッド呼び出しでラベルがない必要があります。

```swift
func repeatGreeting(_ greeting: String, count n: Int) { /* 挨拶を n 回繰り返す */ }
repeatGreeting("Hello, world!", count: 2) // count はラベル付き、greeting はラベルなし
```

### パラメータ修飾子

パラメータ修飾子は、引数が関数に渡される方法を変更します。

```
<#引数ラベル#> <#パラメータ名#>: <#パラメータ修飾子#> <#パラメータ型#>
```

パラメータ修飾子を使用するには、引数の型の前に `inout`、`borrowing`、または `consuming` を記述します。

```swift
func someFunction(a: inout A, b: consuming B, c: C) { ... }
```

### インアウトパラメータ

デフォルトでは、Swiftの関数引数は値渡しされます。つまり、関数内で行われた変更は呼び出し元には反映されません。インアウトパラメータにするには、`inout` パラメータ修飾子を適用します。

```swift
func someFunction(a: inout Int) {
    a += 1
}
```

インアウトパラメータを含む関数を呼び出すときは、インアウト引数の前にアンパサンド（`&`）を付けて、関数呼び出しが引数の値を変更できることを示します。

```swift
var x = 7
someFunction(&x)
print(x)  // "8" と表示されます
```

インアウトパラメータは次のように渡されます：

- 関数が呼び出されると、引数の値がコピーされます。
- 関数の本体では、そのコピーが変更されます。
- 関数が戻ると、コピーの値が元の引数に割り当てられます。

この動作はコピーイン・コピーアウトまたは値結果呼び出しとして知られています。例えば、計算プロパティやオブザーバーを持つプロパティがインアウトパラメータとして渡される場合、そのゲッターは関数呼び出しの一部として呼び出され、セッターは関数の戻りの一部として呼び出されます。

最適化として、引数がメモリ内の物理アドレスに格納されている値である場合、関数本体の内外で同じメモリ位置が使用されます。この最適化された動作は参照呼び出しとして知られています。コピーイン・コピーアウトモデルによって与えられる動作を使用し、最適化の有無にかかわらず正しく動作するようにコードを書いてください。

関数内では、インアウト引数として渡された値にアクセスしないでください。元の値が現在のスコープで利用可能であっても同様です。元の値にアクセスすることは、値の同時アクセスとなり、メモリ排他性に違反します。

```swift
var someValue: Int
func someFunction(a: inout Int) {
    a += someValue
}

// エラー: これは実行時の排他性違反を引き起こします
someFunction(&someValue)
```

同じ理由で、同じ値を複数のインアウトパラメータに渡すことはできません。

```swift
var someValue: Int
func someFunction(a: inout Int, b: inout Int) {
    a += b
    b += 1
}

// エラー: 同じ値を複数のインアウトパラメータに渡すことはできません
someFunction(&someValue, &someValue)
```

メモリの安全性とメモリ排他性の詳細については、[メモリの安全性](#memory-safety)を参照してください。

インアウトパラメータをキャプチャするクロージャやネストされた関数は、エスケープしないものでなければなりません。インアウトパラメータを変更せずにキャプチャする必要がある場合は、キャプチャリストを使用してパラメータを明示的に不変としてキャプチャします。

```swift
func someFunction(a: inout Int) -> () -> Int {
    return { [a] in return a + 1 }
}
```

インアウトパラメータをキャプチャして変更する必要がある場合は、明示的なローカルコピーを使用します。例えば、関数が戻る前にすべての変更が終了することを保証するマルチスレッドコードで使用します。

```swift
func multithreadedFunction(queue: DispatchQueue, x: inout Int) {
    // ローカルコピーを作成し、手動でコピーを戻します。
    var localX = x
    defer { x = localX }

    // localXに対して非同期に操作を行い、戻る前に待機します。
    queue.async { someMutatingOperation(&localX) }
    queue.sync {}
}
```

インアウトパラメータの詳細な議論と例については、[インアウトパラメータ](#in-out-parameters)を参照してください。

### 借用と消費パラメータ

デフォルトでは、Swiftは関数呼び出し間でオブジェクトのライフタイムを自動的に管理する一連のルールを使用し、必要に応じて値をコピーします。デフォルトのルールはほとんどの場合オーバーヘッドを最小限に抑えるように設計されていますが、より具体的な制御が必要な場合は、`borrowing` または `consuming` パラメータ修飾子を適用できます。この場合、コピー操作を明示的にマークするために `copy` を使用します。

デフォルトのルールを使用するかどうかにかかわらず、Swiftはすべての場合においてオブジェクトのライフタイムと所有権が正しく管理されることを保証します。これらのパラメータ修飾子は、特定の使用パターンの相対的な効率性にのみ影響し、正確性には影響しません。

`borrowing` 修飾子は、関数がパラメータの値を保持しないことを示します。この場合、呼び出し元がオブジェクトの所有権とライフタイムの責任を維持します。`borrowing` を使用すると、関数がオブジェクトを一時的にしか使用しない場合にオーバーヘッドを最小限に抑えます。

```swift
// `isLessThan` はどちらの引数も保持しません
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    ...
}
```

関数がパラメータの値を保持する必要がある場合、例えばグローバル変数に格納する場合は、その値を明示的にコピーするために `copy` を使用します。

```swift
// 上記と同様ですが、この `isLessThan` は最小値も記録したい
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    if lhs < storedValue {
        storedValue = copy lhs
    } else if rhs < storedValue {
        storedValue = copy rhs
    }
    return lhs < rhs
}
```

逆に、`consuming` パラメータ修飾子は、関数が値の所有権を引き受け、関数が戻る前にそれを保存または破棄する責任を負うことを示します。

```swift
// `store` は引数を保持するため、`consuming` とマークします
func store(a: consuming A) {
    someGlobalVariable = a
}
```

`consuming` を使用すると、関数呼び出し後に呼び出し元がオブジェクトを使用する必要がなくなる場合にオーバーヘッドを最小限に抑えます。

```swift
// 通常、これは値に対して行う最後の操作です
store(a: value)
```

関数呼び出し後もコピー可能なオブジェクトを使用し続ける場合、コンパイラはそのオブジェクトのコピーを関数呼び出し前に自動的に作成します。

```swift
// コンパイラはここで暗黙のコピーを挿入します
store(a: someValue)  // この関数は someValue を消費します
print(someValue)  // これは someValue のコピーを使用します
```

`inout` とは異なり、`borrowing` や `consuming` パラメータは関数を呼び出すときに特別な表記を必要としません：

```swift
func someFunction(a: borrowing A, b: consuming B) { ... }

someFunction(a: someA, b: someB)
```

`borrowing` または `consuming` のいずれかを明示的に使用することは、ランタイム所有権管理のオーバーヘッドをより厳密に制御する意図を示します。コピーは予期しないランタイム所有権操作を引き起こす可能性があるため、これらの修飾子が付いたパラメータは、明示的な `copy` キーワードを使用しない限りコピーできません：

```swift
func borrowingFunction1(a: borrowing A) {
    // エラー: a を暗黙的にコピーできません
    // この代入はコピーを必要とします
    // `a` は呼び出し元から借用されているだけです。
    someGlobalVariable = a
}

func borrowingFunction2(a: borrowing A) {
    // OK: 明示的なコピーは動作します
    someGlobalVariable = copy a
}

func consumingFunction1(a: consuming A) {
    // エラー: a を暗黙的にコピーできません
    // この代入はコピーを必要とします
    // 以下の `print` のためです
    someGlobalVariable = a
    print(a)
}

func consumingFunction2(a: consuming A) {
    // OK: 明示的なコピーは常に動作します
    someGlobalVariable = copy a
    print(a)
}

func consumingFunction3(a: consuming A) {
    // OK: ここではコピーは不要です。これが最後の使用だからです
    someGlobalVariable = a
}
```

### 特殊な種類のパラメータ

パラメータは無視されたり、可変個数の値を取ったり、デフォルト値を提供したりすることができます。以下の形式を使用します：

```
_ : <#parameter type#>
<#parameter name#>: <#parameter type#>...
<#parameter name#>: <#parameter type#> = <#default argument value#>
```

アンダースコア（`_`）パラメータは明示的に無視され、関数の本体内でアクセスすることはできません。

基本型名の後にすぐに三点リーダー（`...`）が続くパラメータは、可変長パラメータとして理解されます。可変長パラメータの直後に続くパラメータは、引数ラベルを持たなければなりません。関数は複数の可変長パラメータを持つことができます。可変長パラメータは、基本型名の要素を含む配列として扱われます。例えば、可変長パラメータ `Int...` は `[Int]` として扱われます。可変長パラメータを使用する例については、[可変長パラメータ](#variadic-parameters)を参照してください。

型の後に等号（`=`）と式が続くパラメータは、指定された式のデフォルト値を持つと理解されます。関数が呼び出されたときに指定された式が評価されます。関数を呼び出す際にパラメータが省略された場合、デフォルト値が使用されます。

```swift
func f(x: Int = 42) -> Int { return x }
f()       // 有効、デフォルト値を使用
f(x: 7)   // 有効、指定された値を使用
f(7)      // 無効、引数ラベルが欠けている
```

### 特殊な種類のメソッド

`self` を変更する列挙型または構造体のメソッドは、`mutating` 宣言修飾子でマークされなければなりません。

スーパークラスのメソッドをオーバーライドするメソッドは、`override` 宣言修飾子でマークされなければなりません。`override` 修飾子なしでメソッドをオーバーライドすることや、スーパークラスのメソッドをオーバーライドしないメソッドに `override` 修飾子を使用することは、コンパイル時エラーとなります。

型に関連付けられたメソッドは、列挙型や構造体の場合は `static` 宣言修飾子で、クラスの場合は `static` または `class` 宣言修飾子でマークされなければなりません。`class` 宣言修飾子でマークされたクラス型メソッドは、サブクラスの実装によってオーバーライドできますが、`class final` または `static` でマークされたクラス型メソッドはオーバーライドできません。

### 特殊な名前を持つメソッド

特殊な名前を持ついくつかのメソッドは、関数呼び出し構文のためのシンタックスシュガーを有効にします。これらのメソッドの1つを定義すると、その型のインスタンスは関数呼び出し構文で使用できます。関数呼び出しは、そのインスタンス上の特別に名前付けられたメソッドの1つへの呼び出しとして理解されます。

クラス、構造体、または列挙型は、`dynamicallyCall(withArguments:)` メソッドや `dynamicallyCall(withKeywordArguments:)` メソッドを定義することで、または以下で説明するように関数として呼び出すメソッドを定義することで、関数呼び出し構文をサポートできます。型が関数として呼び出すメソッドと `dynamicCallable` 属性によって使用されるメソッドの両方を定義している場合、どちらのメソッドも使用できる状況では、コンパイラは関数として呼び出すメソッドを優先します。

関数として呼び出すメソッドの名前は `callAsFunction()` であり、またはラベル付きまたはラベルなしの引数を追加する `callAsFunction(` で始まる別の名前です。例えば、`callAsFunction(_:_:)` や `callAsFunction(something:)` も有効な関数として呼び出すメソッド名です。

以下の関数呼び出しは同等です：

```swift
struct CallableStruct {
    var value: Int
    func callAsFunction(_ number: Int, scale: Int) {
        print(scale * (number + value))
    }
}
let callable = CallableStruct(value: 100)
callable(4, scale: 2)
callable.callAsFunction(4, scale: 2)
// 両方の関数呼び出しは 208 を出力します。
```

関数として呼び出すメソッドと `dynamicCallable` 属性のメソッドは、型システムにどれだけの情報をエンコードするかと、ランタイムでどれだけの動的な動作が可能かの間で異なるトレードオフを行います。関数として呼び出すメソッドを宣言するとき、引数の数、各引数の型とラベルを指定します。`dynamicCallable` 属性のメソッドは、引数の配列を保持するために使用される型のみを指定します。

関数として呼び出すメソッドや `dynamicCallable` 属性のメソッドを定義しても、その型のインスタンスを関数呼び出し式以外の文脈で関数のように使用することはできません。例えば：

```swift
let someFunction1: (Int, Int) -> Void = callable(_:scale:)  // エラー
let someFunction2: (Int, Int) -> Void = callable.callAsFunction(_:scale:)
```

`subscript(dynamicMember:)` サブスクリプトは、メンバーのルックアップのためのシンタックスシュガーを有効にします。詳細は [dynamicMemberLookup](#dynamicmemberlookup) を参照してください。

### エラーを投げる関数とメソッド

エラーを投げる可能性のある関数とメソッドは、`throws` キーワードでマークされなければなりません。これらの関数とメソッドは、エラーを投げる関数とエラーを投げるメソッドとして知られています。以下の形式を持ちます：

```swift
func <#function name#>(<#parameters#>) throws -> <#return type#> {
   <#statements#>
}
```

特定のエラー型を投げる関数は、以下の形式を持ちます：

```swift
func <#function name#>(<#parameters#>) throws(<#error type#>) -> <#return type#> {
   <#statements#>
}
```

エラーを投げる関数やメソッドの呼び出しは、`try` または `try!` 式（つまり、`try` または `try!` 演算子のスコープ内）でラップする必要があります。

関数の型には、エラーを投げるかどうか、およびどのタイプのエラーを投げるかが含まれます。このサブタイプ関係により、例えば、エラーを投げる関数が期待される文脈でエラーを投げない関数を使用することができます。エラーを投げる関数の型についての詳細は、[関数型](#function-type)を参照してください。明示的な型を持つエラーを扱う例については、[エラー型の指定](#specifying-the-error-type)を参照してください。

関数がエラーを投げるかどうかだけで関数をオーバーロードすることはできません。ただし、関数パラメータがエラーを投げるかどうかに基づいて関数をオーバーロードすることはできます。

エラーを投げるメソッドは、エラーを投げないメソッドをオーバーライドすることはできません。また、エラーを投げるメソッドは、エラーを投げないメソッドのプロトコル要件を満たすことはできません。ただし、エラーを投げないメソッドは、エラーを投げるメソッドをオーバーライドすることができ、エラーを投げるメソッドのプロトコル要件を満たすことができます。

### 再投げ関数とメソッド

関数またはメソッドは、`rethrows`キーワードを使用して宣言することができ、これはその関数パラメータの1つがエラーをスローした場合にのみエラーをスローすることを示します。これらの関数とメソッドは再投げ関数および再投げメソッドと呼ばれます。再投げ関数とメソッドは、少なくとも1つのスロー関数パラメータを持っている必要があります。

```swift
func someFunction(callback: () throws -> Void) rethrows {
    try callback()
}
```

再投げ関数またはメソッドは、`catch`句の中でのみ`throw`文を含むことができます。これにより、`do-catch`文の中でスロー関数を呼び出し、`catch`句で異なるエラーをスローすることでエラーを処理することができます。さらに、`catch`句は再投げ関数のスローするパラメータの1つによってスローされたエラーのみを処理する必要があります。例えば、次の例は無効です。なぜなら、`catch`句が`alwaysThrows()`によってスローされたエラーを処理するからです。

```swift
func alwaysThrows() throws {
    throw SomeError.error
}
func someFunction(callback: () throws -> Void) rethrows {
    do {
        try callback()
        try alwaysThrows()  // 無効、alwaysThrows()はスローするパラメータではありません
    } catch {
        throw AnotherError.error
    }
}
```

スローするメソッドは再投げメソッドをオーバーライドできず、スローするメソッドは再投げメソッドのプロトコル要件を満たすことができません。とはいえ、再投げメソッドはスローするメソッドをオーバーライドでき、再投げメソッドはスローするメソッドのプロトコル要件を満たすことができます。

再投げの代替として、ジェネリックコードで特定のエラータイプをスローすることができます。例えば：

```swift
func someFunction<E: Error>(callback: () throws(E) -> Void) throws(E) {
    try callback()
}
```

エラーを伝播するこのアプローチは、エラーに関する型情報を保持します。しかし、関数に`rethrows`をマークするのとは異なり、このアプローチは関数が同じタイプのエラーをスローするのを防ぎません。

### 非同期関数とメソッド

非同期に実行される関数とメソッドは、`async`キーワードでマークする必要があります。これらの関数とメソッドは非同期関数および非同期メソッドと呼ばれます。これらは次の形式を持ちます：

```swift
func <#function name#>(<#parameters#>) async -> <#return type#> {
   <#statements#>
}
```

非同期関数またはメソッドの呼び出しは、`await`式でラップする必要があります。つまり、`await`演算子のスコープ内にある必要があります。

`async`キーワードは関数の型の一部であり、同期関数は非同期関数のサブタイプです。その結果、非同期関数が期待されるコンテキストで同期関数を使用することができます。例えば、非同期メソッドを同期メソッドでオーバーライドすることができ、同期メソッドは非同期メソッドを要求するプロトコル要件を満たすことができます。

関数は非同期であるかどうかに基づいてオーバーロードすることができます。呼び出しサイトでは、コンテキストによってどのオーバーロードが使用されるかが決まります：非同期コンテキストでは非同期関数が使用され、同期コンテキストでは同期関数が使用されます。

非同期メソッドは同期メソッドをオーバーライドできず、非同期メソッドは同期メソッドのプロトコル要件を満たすことができません。とはいえ、同期メソッドは非同期メソッドをオーバーライドでき、同期メソッドは非同期メソッドのプロトコル要件を満たすことができます。

### 決して戻らない関数

Swiftは`Never`型を定義しており、これは関数またはメソッドが呼び出し元に戻らないことを示します。`Never`戻り型を持つ関数とメソッドは非戻り関数と呼ばれます。非戻り関数とメソッドは、回復不能なエラーを引き起こすか、無期限に続く作業のシーケンスを開始します。これは、呼び出しの直後に実行されるはずのコードが決して実行されないことを意味します。スローおよび再投げ関数は、非戻りであっても適切な`catch`ブロックにプログラム制御を移すことができます。

非戻り関数またはメソッドは、`guard`文の`else`句を終了するために呼び出すことができます。詳細は[ガード文](#guard-statement)を参照してください。

非戻りメソッドをオーバーライドすることができますが、新しいメソッドはその戻り型と非戻り動作を保持する必要があります。

### 関数宣言の文法

```
function-declaration → function-head function-name generic-parameter-clause? function-signature generic-where-clause? function-body?
function-head → attributes? declaration-modifiers? func
function-name → identifier | operator
function-signature → parameter-clause async? throws-clause? function-result?
function-signature → parameter-clause async? rethrows function-result?
function-result → -> attributes? type
function-body → code-block
parameter-clause → ( ) | ( parameter-list )
parameter-list → parameter | parameter , parameter-list
parameter → external-parameter-name? local-parameter-name parameter-type-annotation default-argument-clause?
parameter → external-parameter-name? local-parameter-name parameter-type-annotation
parameter → external-parameter-name? local-parameter-name parameter-type-annotation ...
external-parameter-name → identifier
local-parameter-name → identifier
parameter-type-annotation → : attributes? parameter-modifier? type
parameter-modifier → inout | borrowing | consuming
default-argument-clause → = expression
```

## 列挙型宣言

列挙型宣言は、プログラムに名前付きの列挙型を導入します。

列挙型宣言には2つの基本的な形式があり、`enum`キーワードを使用して宣言されます。どちらの形式で宣言された列挙型の本体には、0個以上の値（列挙ケースと呼ばれる）および計算プロパティ、インスタンスメソッド、タイプメソッド、イニシャライザ、型エイリアス、さらには他の列挙型、構造体、クラス、アクター宣言など、任意の数の宣言を含めることができます。列挙型宣言にはデイニシャライザやプロトコル宣言を含めることはできません。

列挙型は任意の数のプロトコルを採用できますが、クラス、構造体、または他の列挙型から継承することはできません。

クラスや構造体とは異なり、列挙型には暗黙的に提供されるデフォルトのイニシャライザがありません。すべてのイニシャライザは明示的に宣言する必要があります。イニシャライザは列挙型内の他のイニシャライザに委譲することができますが、イニシャライザが`self`に列挙ケースの1つを割り当てた後に初期化プロセスが完了します。

構造体と同様に、クラスとは異なり、列挙型は値型です。列挙型のインスタンスは、変数や定数に代入されたり、関数呼び出しの引数として渡されたりするとコピーされます。値型についての詳細は[構造体と列挙型は値型です](#)を参照してください。

列挙型の動作を拡張宣言で拡張することができます。詳細は[拡張宣言](#)を参照してください。

### 任意の型のケースを持つ列挙型

次の形式は、任意の型の列挙ケースを含む列挙型を宣言します:

```swift
enum <#enumeration name#>: <#adopted protocols#> {
    case <#enumeration case 1#>
    case <#enumeration case 2#>(<#associated value types#>)
}
```

この形式で宣言された列挙型は、他のプログラミング言語では判別共用体と呼ばれることがあります。

この形式では、各ケースブロックは`case`キーワードに続いて1つ以上の列挙ケースがカンマで区切られて並びます。各ケースの名前は一意でなければなりません。各ケースは、指定された型の値を格納することもできます。これらの型は、ケース名の直後にある関連値型のタプルで指定されます。

関連値を格納する列挙ケースは、指定された関連値を持つ列挙型のインスタンスを作成する関数として使用できます。そして、関数と同様に、列挙ケースへの参照を取得し、後でコード内で適用することができます。

```swift
enum Number {
    case integer(Int)
    case real(Double)
}
let f = Number.integer
// fは(Int) -> Number型の関数です

// fを適用して整数値を持つNumberインスタンスの配列を作成します
let evenInts: [Number] = [0, 2, 4, 6].map(f)
```

関連値型を持つケースの詳細と例については、[関連値](#)を参照してください。

### 間接参照を持つ列挙型

列挙型は再帰的な構造を持つことができます。つまり、関連値として列挙型自体のインスタンスを持つケースを持つことができます。しかし、列挙型のインスタンスは値セマンティクスを持つため、メモリ内で固定されたレイアウトを持ちます。再帰をサポートするために、コンパイラは間接参照の層を挿入する必要があります。

特定の列挙ケースに対して間接参照を有効にするには、`indirect`宣言修飾子を付けます。間接ケースには関連値が必要です。

```swift
enum Tree<T> {
    case empty
    indirect case node(value: T, left: Tree, right: Tree)
}
```

関連値を持つすべてのケースに対して間接参照を有効にするには、列挙型全体に`indirect`修飾子を付けます。これは、多くのケースが`indirect`修飾子を付ける必要がある場合に便利です。

`indirect`修飾子が付けられた列挙型は、関連値を持つケースと持たないケースの混在を含むことができます。ただし、`indirect`修飾子が付けられたケースを含むことはできません。

### 生の値型のケースを持つ列挙型

次の形式は、同じ基本型の列挙ケースを含む列挙型を宣言します:

```swift
enum <#enumeration name#>: <#raw-value type#>, <#adopted protocols#> {
    case <#enumeration case 1#> = <#raw value 1#>
    case <#enumeration case 2#> = <#raw value 2#>
}
```

この形式では、各ケースブロックは`case`キーワードに続いて1つ以上の列挙ケースがカンマで区切られて並びます。最初の形式のケースとは異なり、各ケースには同じ基本型の基礎値（生の値）が割り当てられます。これらの値の型は生の値型で指定され、整数、浮動小数点数、文字列、または単一文字を表す必要があります。特に、生の値型は`Equatable`プロトコルおよび次のプロトコルのいずれかに準拠している必要があります: 整数リテラルの場合は`ExpressibleByIntegerLiteral`、浮動小数点リテラルの場合は`ExpressibleByFloatLiteral`、任意の文字数を含む文字列リテラルの場合は`ExpressibleByStringLiteral`、単一文字を含む文字列リテラルの場合は`ExpressibleByUnicodeScalarLiteral`または`ExpressibleByExtendedGraphemeClusterLiteral`。各ケースは一意の名前を持ち、一意の生の値が割り当てられている必要があります。

生の値型が`Int`として指定され、ケースに明示的に値が割り当てられていない場合、それらは暗黙的に0、1、2などの値が順に割り当てられます。`Int`型の各未割り当てケースには、前のケースの生の値から自動的にインクリメントされた生の値が暗黙的に割り当てられます。

```swift
enum ExampleEnum: Int {
    case a, b, c = 5, d
}
```

上記の例では、`ExampleEnum.a`の生の値は0であり、`ExampleEnum.b`の値は1です。そして、`ExampleEnum.c`の値が明示的に5に設定されているため、`ExampleEnum.d`の値は5から自動的にインクリメントされ、6になります。

生の値型が`String`として指定され、ケースに明示的に値が割り当てられていない場合、各未割り当てケースには、そのケースの名前と同じテキストを含む文字列が暗黙的に割り当てられます。

```swift
enum GamePlayMode: String {
    case cooperative, individual, competitive
}
```

上記の例では、`GamePlayMode.cooperative`の生の値は"cooperative"であり、`GamePlayMode.individual`の生の値は"individual"、`GamePlayMode.competitive`の生の値は"competitive"です。

生の値型のケースを持つ列挙型は、Swift標準ライブラリで定義されている`RawRepresentable`プロトコルに暗黙的に準拠します。その結果、`rawValue`プロパティと、シグネチャ`init?(rawValue: RawValue)`を持つ失敗可能なイニシャライザを持ちます。`rawValue`プロパティを使用して列挙ケースの生の値にアクセスできます。例えば、`ExampleEnum.b.rawValue`のように。また、生の値を使用して対応するケースを見つけることもできます。例えば、`ExampleEnum(rawValue: 5)`のように、これはオプショナルなケースを返します。生の値型のケースの詳細と例については、[生の値](#)を参照してください。

### 列挙ケースへのアクセス

列挙型のケースを参照するには、`EnumerationType.enumerationCase`のようにドット（.）構文を使用します。列挙型が文脈から推測できる場合は、省略することができます（ドットは依然として必要です）。詳細は[列挙構文と暗黙のメンバー式](#)を参照してください。

列挙ケースの値を確認するには、`switch`文を使用します。詳細は[スイッチ文での列挙値のマッチング](#)を参照してください。列挙型は、`switch`文のケースブロック内の列挙ケースパターンに対してパターンマッチングされます。詳細は[列挙ケースパターン](#)を参照してください。

### 列挙宣言の文法

```ebnf
enum-declaration → attributes? access-level-modifier? union-style-enum
enum-declaration → attributes? access-level-modifier? raw-value-style-enum
union-style-enum → indirect? enum enum-name generic-parameter-clause? type-inheritance-clause? generic-where-clause? { union-style-enum-members? }
union-style-enum-members → union-style-enum-member union-style-enum-members?
union-style-enum-member → declaration | union-style-enum-case-clause | compiler-control-statement
union-style-enum-case-clause → attributes? indirect? case union-style-enum-case-list
union-style-enum-case-list → union-style-enum-case | union-style-enum-case , union-style-enum-case-list
union-style-enum-case → enum-case-name tuple-type?
enum-name → identifier
enum-case-name → identifier
raw-value-style-enum → enum enum-name generic-parameter-clause? type-inheritance-clause generic-where-clause? { raw-value-style-enum-members }
raw-value-style-enum-members → raw-value-style-enum-member raw-value-style-enum-members?
raw-value-style-enum-member → declaration | raw-value-style-enum-case-clause | compiler-control-statement
raw-value-style-enum-case-clause → attributes? case raw-value-style-enum-case-list
raw-value-style-enum-case-list → raw-value-style-enum-case | raw-value-style-enum-case , raw-value-style-enum-case-list
raw-value-style-enum-case → enum-case-name raw-value-assignment?
raw-value-assignment → = raw-value-literal
raw-value-literal → numeric-literal | static-string-literal | boolean-literal
```

## 構造体宣言

構造体宣言は、プログラムに名前付き構造体型を導入します。構造体宣言は`struct`キーワードを使用して宣言され、次の形式を持ちます：

```swift
struct <#structure name#>: <#adopted protocols#> {
   <#declarations#>
}
```

構造体の本体には、0個以上の宣言が含まれます。これらの宣言には、格納プロパティと計算プロパティ、型プロパティ、インスタンスメソッド、型メソッド、イニシャライザ、サブスクリプト、型エイリアス、さらには他の構造体、クラス、アクター、および列挙宣言を含めることができます。構造体宣言にはデイニシャライザやプロトコル宣言を含めることはできません。さまざまな種類の宣言を含む構造体の議論といくつかの例については、[構造体とクラス](#)を参照してください。

構造体型は任意の数のプロトコルを採用できますが、クラス、列挙、または他の構造体から継承することはできません。

以前に宣言された構造体のインスタンスを作成する方法は3つあります：

1. 構造体内で宣言されたイニシャライザの1つを呼び出す。詳細は[イニシャライザ](#)を参照してください。
2. イニシャライザが宣言されていない場合、構造体のメンバーごとのイニシャライザを呼び出す。詳細は[構造体型のメンバーごとのイニシャライザ](#)を参照してください。
3. イニシャライザが宣言されておらず、構造体宣言のすべてのプロパティに初期値が与えられている場合、構造体のデフォルトイニシャライザを呼び出す。詳細は[デフォルトイニシャライザ](#)を参照してください。

構造体の宣言されたプロパティの初期化プロセスについては、[初期化](#)を参照してください。

構造体インスタンスのプロパティには、[プロパティへのアクセス](#)で説明されているように、ドット（.）構文を使用してアクセスできます。

構造体は値型です。構造体のインスタンスは、変数や定数に代入されたり、関数呼び出しの引数として渡されたりするときにコピーされます。値型についての情報は、[構造体と列挙は値型です](#)を参照してください。

構造体型の動作を拡張するには、[拡張宣言](#)で説明されているように、拡張宣言を使用します。

### 構造体宣言の文法

```ebnf
struct-declaration → attributes? access-level-modifier? struct struct-name generic-parameter-clause? type-inheritance-clause? generic-where-clause? struct-body
struct-name → identifier
struct-body → { struct-members? }
struct-members → struct-member struct-members?
struct-member → declaration | compiler-control-statement
```

## クラス宣言

クラス宣言は、プログラムに名前付きクラス型を導入します。クラス宣言は`class`キーワードを使用して宣言され、次の形式を持ちます：

```swift
class <#class name#>: <#superclass#>, <#adopted protocols#> {
   <#declarations#>
}
```

クラスの本体には、0個以上の宣言が含まれます。これらの宣言には、格納プロパティと計算プロパティ、インスタンスメソッド、型メソッド、イニシャライザ、単一のデイニシャライザ、サブスクリプト、型エイリアス、さらには他のクラス、構造体、アクター、および列挙宣言を含めることができます。クラス宣言にはプロトコル宣言を含めることはできません。さまざまな種類の宣言を含むクラスの議論といくつかの例については、[構造体とクラス](#)を参照してください。

クラス型は1つの親クラス（スーパークラス）からのみ継承できますが、任意の数のプロトコルを採用できます。スーパークラスはクラス名とコロンの後に最初に表示され、続いて採用されたプロトコルが表示されます。ジェネリッククラスは他のジェネリックおよび非ジェネリッククラスから継承できますが、非ジェネリッククラスは他の非ジェネリッククラスからのみ継承できます。コロンの後にジェネリックスーパークラスの名前を書く場合、そのジェネリッククラスの完全な名前（ジェネリックパラメータ句を含む）を含める必要があります。

[イニシャライザ宣言](#)で説明されているように、クラスには指定イニシャライザとコンビニエンスイニシャライザがあります。クラスの指定イニシャライザは、クラスの宣言されたすべてのプロパティを初期化し、スーパークラスの指定イニシャライザを呼び出す前にそれを行う必要があります。

クラスは、スーパークラスのプロパティ、メソッド、サブスクリプト、およびイニシャライザをオーバーライドできます。オーバーライドされたプロパティ、メソッド、サブスクリプト、および指定イニシャライザは、`override`宣言修飾子でマークする必要があります。

サブクラスがスーパークラスのイニシャライザを実装することを要求するには、スーパークラスのイニシャライザを`required`宣言修飾子でマークします。サブクラスのそのイニシャライザの実装も`required`宣言修飾子でマークする必要があります。

スーパークラスで宣言されたプロパティとメソッドは現在のクラスによって継承されますが、スーパークラスで宣言された指定イニシャライザは、サブクラスが[自動イニシャライザ継承](#)で説明されている条件を満たす場合にのみ継承されます。Swiftクラスは、ユニバーサルベースクラスから継承しません。

以前に宣言されたクラスのインスタンスを作成する方法は2つあります：

1. クラス内で宣言されたイニシャライザの1つを呼び出す。詳細は[イニシャライザ](#)を参照してください。
2. イニシャライザが宣言されておらず、クラス宣言のすべてのプロパティに初期値が与えられている場合、クラスのデフォルトイニシャライザを呼び出す。詳細は[デフォルトイニシャライザ](#)を参照してください。

クラスインスタンスのプロパティには、[プロパティへのアクセス](#)で説明されているように、ドット（.）構文を使用してアクセスします。

クラスは参照型です。クラスのインスタンスは、変数や定数に代入されたり、関数呼び出しの引数として渡されたりするときにコピーされるのではなく、参照されます。参照型についての情報は、[クラスは参照型です](#)を参照してください。

クラス型の動作を拡張するには、[拡張宣言](#)で説明されているように、拡張宣言を使用します。

### クラス宣言の文法

```ebnf
class-declaration → attributes? access-level-modifier? final? class class-name generic-parameter-clause? type-inheritance-clause? generic-where-clause? class-body
class-declaration → attributes? final access-level-modifier? class class-name generic-parameter-clause? type-inheritance-clause? generic-where-clause? class-body
class-name → identifier
class-body → { class-members? }
class-members → class-member class-members?
class-member → declaration | compiler-control-statement
```

## アクター宣言

アクター宣言は、プログラムに名前付きアクター型を導入します。アクター宣言は `actor` キーワードを使用して宣言され、次の形式を持ちます:

```swift
actor <#actor name#>: <#adopted protocols#> {
    <#declarations#>
}
```

アクターの本体には、0個以上の宣言が含まれます。これらの宣言には、格納プロパティと計算プロパティ、インスタンスメソッド、タイプメソッド、イニシャライザ、単一のデイニシャライザ、サブスクリプト、型エイリアス、さらには他のクラス、構造体、列挙型の宣言も含まれます。さまざまな種類の宣言を含むアクターの議論といくつかの例については、[アクター](#)を参照してください。

アクター型は任意の数のプロトコルを採用できますが、クラス、列挙型、構造体、または他のアクターから継承することはできません。ただし、`@objc` 属性が付けられたアクターは暗黙的に `NSObjectProtocol` プロトコルに準拠し、Objective-C ランタイムに `NSObject` のサブタイプとして公開されます。

以前に宣言されたアクターのインスタンスを作成する方法は2つあります:

1. アクター内で宣言されたイニシャライザの1つを呼び出す。詳細は[イニシャライザ](#)を参照してください。
2. イニシャライザが宣言されておらず、アクター宣言のすべてのプロパティに初期値が与えられている場合、アクターのデフォルトイニシャライザを呼び出す。詳細は[デフォルトイニシャライザ](#)を参照してください。

デフォルトでは、アクターのメンバーはそのアクターに隔離されています。メソッドの本体やプロパティのゲッターなどのコードは、そのアクター上で実行されます。アクター内のコードは同期的にそれらと対話できますが、アクター外のコードは `await` を使用して、このコードが別のアクター上で非同期に実行されていることを示す必要があります。キー・パスはアクターの隔離されたメンバーを参照することはできません。アクター隔離された格納プロパティは、同期関数への `in-out` パラメータとして渡すことができますが、非同期関数には渡すことができません。

アクターには `nonisolated` キーワードで宣言された非隔離メンバーも含まれる場合があります。非隔離メンバーはアクター外のコードのように実行され、アクターの隔離された状態と対話することはできず、呼び出し元はそれを使用する際に `await` を付ける必要はありません。

アクターのメンバーは、非隔離または非同期である場合にのみ `@objc` 属性を付けることができます。

アクターの宣言されたプロパティの初期化プロセスについては、[初期化](#)を参照してください。

アクターインスタンスのプロパティは、[プロパティのアクセス](#)で説明されているように、ドット（.）構文を使用してアクセスできます。

アクターは参照型です。アクターのインスタンスは、変数や定数に代入されたり、関数呼び出しの引数として渡されたりするときにコピーされるのではなく、参照されます。参照型についての情報は、[クラスは参照型です](#)を参照してください。

アクター型の動作を拡張宣言で拡張することができます。詳細は[拡張宣言](#)を参照してください。

### アクター宣言の文法

```ebnf
actor-declaration → attributes? access-level-modifier? actor actor-name generic-parameter-clause? type-inheritance-clause? generic-where-clause? actor-body
actor-name → identifier
actor-body → { actor-members? }
actor-members → actor-member actor-members?
actor-member → declaration | compiler-control-statement
```

## プロトコル宣言

プロトコル宣言は、プログラムに名前付きプロトコル型を導入します。プロトコル宣言は `protocol` キーワードを使用して宣言され、次の形式を持ちます:

```swift
protocol <#protocol name#>: <#inherited protocols#> {
   <#protocol member declarations#>
}
```

プロトコル宣言はグローバルスコープで、または非ジェネリック型や非ジェネリック関数の内部にネストして現れることができます。

プロトコルの本体には、0個以上のプロトコルメンバー宣言が含まれます。これらの宣言は、プロトコルを採用する型が満たすべき準拠要件を説明します。特に、プロトコルは、準拠する型が特定のプロパティ、メソッド、イニシャライザ、およびサブスクリプトを実装する必要があることを宣言できます。プロトコルはまた、関連型と呼ばれる特別な種類の型エイリアスを宣言することができ、プロトコルのさまざまな宣言間の関係を指定することができます。プロトコル宣言には、クラス、構造体、列挙型、または他のプロトコル宣言を含めることはできません。プロトコルメンバー宣言の詳細については、以下で説明します。

プロトコル型は他の任意の数のプロトコルから継承することができます。プロトコル型が他のプロトコルから継承すると、それらの他のプロトコルからの要件のセットが集約され、現在のプロトコルを継承する任意の型はすべてこれらの要件を満たす必要があります。プロトコル継承の使用例については、プロトコル継承を参照してください。

> **注**: プロトコル合成型およびプロトコル合成を使用して、複数のプロトコルの準拠要件を集約することもできます。詳細はプロトコル合成型およびプロトコル合成を参照してください。

以前に宣言された型にプロトコル準拠を追加するには、その型の拡張宣言でプロトコルを採用します。拡張内で、採用したプロトコルのすべての要件を実装する必要があります。型がすでにすべての要件を実装している場合、拡張宣言の本体を空にすることができます。

デフォルトでは、プロトコルに準拠する型は、プロトコルで宣言されたすべてのプロパティ、メソッド、およびサブスクリプトを実装する必要があります。ただし、これらのプロトコルメンバー宣言に `optional` 宣言修飾子を付けて、準拠する型による実装がオプションであることを指定できます。`optional` 修飾子は、`@objc` 属性が付けられたメンバーにのみ適用でき、`@objc` 属性が付けられたプロトコルのメンバーにのみ適用できます。その結果、オプションのメンバー要件を含むプロトコルを採用および準拠できるのはクラス型のみです。`optional` 宣言修飾子の使用方法と、準拠する型がそれらを実装しているかどうかわからない場合にオプションのプロトコルメンバーにアクセスする方法についてのガイダンスについては、オプションのプロトコル要件を参照してください。

列挙型のケースは、型メンバーのプロトコル要件を満たすことができます。具体的には、関連値を持たない列挙型のケースは、`Self` 型の取得専用の型変数のプロトコル要件を満たし、関連値を持つ列挙型のケースは、パラメータとその引数ラベルがケースの関連値と一致する関数のプロトコル要件を満たします。例えば:

```swift
protocol SomeProtocol {
    static var someValue: Self { get }
    static func someFunction(x: Int) -> Self
}

enum MyEnum: SomeProtocol {
    case someValue
    case someFunction(x: Int)
}
```

プロトコルの採用をクラス型のみに制限するには、コロンの後に `AnyObject` プロトコルを含めます。例えば、次のプロトコルはクラス型のみが採用できます:

```swift
protocol SomeProtocol: AnyObject {
    /* プロトコルメンバーがここに入ります */
}
```

`AnyObject` 要件が付けられたプロトコルを継承する任意のプロトコルも同様にクラス型のみが採用できます。

> **注**: プロトコルが `@objc` 属性でマークされている場合、`AnyObject` 要件は暗黙的にそのプロトコルに適用されます。プロトコルに `AnyObject` 要件を明示的にマークする必要はありません。

プロトコルは名前付き型であり、したがって、プロトコルは他の名前付き型と同じ場所にコード内に現れることができます。詳細はプロトコルを型として参照してください。ただし、プロトコルのインスタンスを構築することはできません。なぜなら、プロトコルは指定された要件の実装を実際に提供しないからです。

プロトコルを使用して、クラスまたは構造体のデリゲートが実装すべきメソッドを宣言することができます。詳細はデリゲーションを参照してください。

### プロトコル宣言の文法

```ebnf
protocol-declaration → attributes? access-level-modifier? protocol protocol-name type-inheritance-clause? generic-where-clause? protocol-body
protocol-name → identifier
protocol-body → { protocol-members? }
protocol-members → protocol-member protocol-members?
protocol-member → protocol-member-declaration | compiler-control-statement
protocol-member-declaration → protocol-property-declaration
protocol-member-declaration → protocol-method-declaration
protocol-member-declaration → protocol-initializer-declaration
protocol-member-declaration → protocol-subscript-declaration
protocol-member-declaration → protocol-associated-type-declaration
protocol-member-declaration → typealias-declaration
```

## プロトコルプロパティ宣言

プロトコルは、プロトコル宣言の本体にプロトコルプロパティ宣言を含めることで、準拠する型がプロパティを実装する必要があることを宣言します。プロトコルプロパティ宣言は、変数宣言の特別な形式を持ちます:

```swift
var <#property name#>: <#type#> { get set }
```

他のプロトコルメンバー宣言と同様に、これらのプロパティ宣言はプロトコルに準拠する型のゲッターとセッターの要件のみを宣言します。その結果、宣言されたプロトコル内でゲッターやセッターを直接実装することはありません。

ゲッターとセッターの要件は、準拠する型によってさまざまな方法で満たすことができます。プロパティ宣言に `get` と `set` の両方のキーワードが含まれている場合、準拠する型はストアド変数プロパティまたは読み書き可能な計算プロパティ（つまり、ゲッターとセッターの両方を実装するもの）で実装できます。ただし、そのプロパティ宣言は定数プロパティや読み取り専用の計算プロパティとして実装することはできません。プロパティ宣言に `get` キーワードのみが含まれている場合、任意の種類のプロパティとして実装できます。プロトコルのプロパティ要件を実装する準拠する型の例については、プロパティ要件を参照してください。

プロトコル宣言で型プロパティ要件を宣言するには、プロパティ宣言に `static` キーワードを付けます。プロトコルに準拠する構造体や列挙型は `static` キーワードを使用してプロパティを宣言し、プロトコルに準拠するクラスは `static` または `class` キーワードのいずれかを使用してプロパティを宣言します。構造体、列挙型、またはクラスにプロトコル準拠を追加する拡張は、拡張する型が使用するのと同じキーワードを使用します。型プロパティ要件のデフォルト実装を提供する拡張は `static` キーワードを使用します。

変数宣言も参照してください。

### プロトコルプロパティ宣言の文法

```ebnf
protocol-property-declaration → variable-declaration-head variable-name type-annotation getter-setter-keyword-block
```

## プロトコルメソッド宣言

プロトコルは、プロトコル宣言の本体にプロトコルメソッド宣言を含めることで、準拠する型がメソッドを実装する必要があることを宣言します。プロトコルメソッド宣言は、関数宣言と同じ形式を持ちますが、2つの例外があります: 関数本体を含まず、関数宣言の一部としてデフォルトパラメータ値を提供することはできません。プロトコルのメソッド要件を実装する準拠する型の例については、メソッド要件を参照してください。

プロトコル宣言でクラスまたは静的メソッド要件を宣言するには、メソッド宣言に `static` 宣言修飾子を付けます。プロトコルに準拠する構造体や列挙型は `static` キーワードを使用してメソッドを宣言し、プロトコルに準拠するクラスは `static` または `class` キーワードのいずれかを使用してメソッドを宣言します。構造体、列挙型、またはクラスにプロトコル準拠を追加する拡張は、拡張する型が使用するのと同じキーワードを使用します。型メソッド要件のデフォルト実装を提供する拡張は `static` キーワードを使用します。

関数宣言も参照してください。

### プロトコルメソッド宣言の文法

```ebnf
protocol-method-declaration → function-head function-name generic-parameter-clause? function-signature generic-where-clause?
```

## プロトコルイニシャライザ宣言

プロトコルは、プロトコル宣言の本体にプロトコルイニシャライザ宣言を含めることで、準拠する型がイニシャライザを実装する必要があることを宣言します。プロトコルイニシャライザ宣言は、イニシャライザ宣言と同じ形式を持ちますが、イニシャライザの本体を含みません。

準拠する型は、非失敗プロトコルイニシャライザ要件を、非失敗イニシャライザまたは `init!` 失敗可能イニシャライザを実装することで満たすことができます。準拠する型は、失敗可能プロトコルイニシャライザ要件を任意の種類のイニシャライザを実装することで満たすことができます。

クラスがプロトコルのイニシャライザ要件を満たすためにイニシャライザを実装する場合、そのクラスがすでに `final` 宣言修飾子でマークされていない限り、イニシャライザは `required` 宣言修飾子でマークされなければなりません。

イニシャライザ宣言も参照してください。

### プロトコルイニシャライザ宣言の文法

```ebnf
protocol-initializer-declaration → initializer-head generic-parameter-clause? parameter-clause throws-clause? generic-where-clause?
protocol-initializer-declaration → initializer-head generic-parameter-clause? parameter-clause rethrows generic-where-clause?
```

## プロトコルサブスクリプト宣言

プロトコルは、プロトコル宣言の本体にプロトコルサブスクリプト宣言を含めることで、準拠する型がサブスクリプトを実装する必要があることを宣言します。プロトコルサブスクリプト宣言は、サブスクリプト宣言の特別な形式を持ちます:

```swift
subscript (<#parameters#>) -> <#return type#> { get set }
```

サブスクリプト宣言は、プロトコルに準拠する型の最小限のゲッターとセッターの実装要件のみを宣言します。サブスクリプト宣言に `get` と `set` の両方のキーワードが含まれている場合、準拠する型はゲッターとセッターの両方の句を実装する必要があります。サブスクリプト宣言に `get` キーワードのみが含まれている場合、準拠する型は少なくともゲッター句を実装し、オプションでセッター句を実装することができます。

プロトコル宣言で静的サブスクリプト要件を宣言するには、サブスクリプト宣言に `static` 宣言修飾子を付けます。プロトコルに準拠する構造体や列挙型は `static` キーワードを使用してサブスクリプトを宣言し、プロトコルに準拠するクラスは `static` または `class` キーワードのいずれかを使用してサブスクリプトを宣言します。構造体、列挙型、またはクラスにプロトコル準拠を追加する拡張は、拡張する型が使用するのと同じキーワードを使用します。静的サブスクリプト要件のデフォルト実装を提供する拡張は `static` キーワードを使用します。

サブスクリプト宣言も参照してください。

### プロトコルサブスクリプト宣言の文法

```ebnf
protocol-subscript-declaration → subscript-head subscript-result generic-where-clause? getter-setter-keyword-block
```

## プロトコル関連型宣言

プロトコルは `associatedtype` キーワードを使用して関連型を宣言します。関連型は、プロトコルの宣言の一部として使用される型のエイリアスを提供します。関連型はジェネリックパラメータ句の型パラメータに似ていますが、それらは宣言されたプロトコル内の `Self` に関連付けられています。その文脈では、`Self` はプロトコルに準拠する最終的な型を指します。詳細と例については、関連型を参照してください。

プロトコル宣言でジェネリックwhere句を使用して、関連型が他のプロトコルから継承する制約を追加することができます。例えば、以下の `SubProtocol` の宣言は同等です:

```swift
protocol SomeProtocol {
    associatedtype SomeType
}

protocol SubProtocolA: SomeProtocol {
    // この構文は警告を生成します。
    associatedtype SomeType: Equatable
}

// この構文が推奨されます。
protocol SubProtocolB: SomeProtocol where SomeType: Equatable { }
```

型エイリアス宣言も参照してください。

### プロトコル関連型宣言の文法

```ebnf
protocol-associated-type-declaration → attributes? access-level-modifier? associatedtype typealias-name type-inheritance-clause? typealias-assignment? generic-where-clause?
```

## イニシャライザ宣言

イニシャライザ宣言は、クラス、構造体、または列挙型のイニシャライザをプログラムに導入します。イニシャライザ宣言は `init` キーワードを使用して宣言され、2つの基本形式があります。

構造体、列挙型、およびクラス型は任意の数のイニシャライザを持つことができますが、クラスのイニシャライザに関するルールと関連する動作は異なります。構造体や列挙型とは異なり、クラスには指定イニシャライザとコンビニエンスイニシャライザの2種類のイニシャライザがあります。これについては、初期化の章で説明されています。

次の形式は、構造体、列挙型、およびクラスの指定イニシャライザのイニシャライザを宣言します。

```swift
init(<#parameters#>) {
   <#statements#>
}
```

クラスの指定イニシャライザは、クラスのすべてのプロパティを直接初期化します。同じクラスの他のイニシャライザを呼び出すことはできません。また、クラスにスーパークラスがある場合は、スーパークラスの指定イニシャライザの1つを呼び出す必要があります。クラスがスーパークラスからプロパティを継承している場合、これらのプロパティを現在のクラスで設定または変更する前に、スーパークラスの指定イニシャライザの1つを呼び出す必要があります。

指定イニシャライザはクラス宣言のコンテキストでのみ宣言できるため、拡張宣言を使用してクラスに追加することはできません。

構造体や列挙型のイニシャライザは、他の宣言されたイニシャライザを呼び出して初期化プロセスの一部または全部を委譲することができます。

クラスのコンビニエンスイニシャライザを宣言するには、イニシャライザ宣言に `convenience` 宣言修飾子を付けます。

```swift
convenience init(<#parameters#>) {
   <#statements#>
}
```

コンビニエンスイニシャライザは、他のコンビニエンスイニシャライザまたはクラスの指定イニシャライザのいずれかに初期化プロセスを委譲できます。つまり、初期化プロセスはクラスのプロパティを最終的に初期化する指定イニシャライザの呼び出しで終了しなければなりません。コンビニエンスイニシャライザはスーパークラスのイニシャライザを呼び出すことはできません。

指定イニシャライザとコンビニエンスイニシャライザの両方に `required` 宣言修飾子を付けて、すべてのサブクラスがそのイニシャライザを実装することを要求できます。サブクラスのそのイニシャライザの実装にも `required` 宣言修飾子を付ける必要があります。

デフォルトでは、スーパークラスで宣言されたイニシャライザはサブクラスに継承されません。ただし、サブクラスがすべてのストアドプロパティをデフォルト値で初期化し、自身のイニシャライザを定義しない場合、スーパークラスのすべてのイニシャライザを継承します。サブクラスがスーパークラスのすべての指定イニシャライザをオーバーライドする場合、スーパークラスのコンビニエンスイニシャライザを継承します。

メソッド、プロパティ、およびサブスクリプトと同様に、オーバーライドされた指定イニシャライザには `override` 宣言修飾子を付ける必要があります。

> **注**: イニシャライザに `required` 宣言修飾子を付けた場合、サブクラスでその必須イニシャライザをオーバーライドするときに `override` 修飾子を付ける必要はありません。

関数やメソッドと同様に、イニシャライザはエラーをスローまたはリスローすることができます。また、関数やメソッドと同様に、イニシャライザのパラメータの後に `throws` または `rethrows` キーワードを使用して適切な動作を示します。同様に、イニシャライザは非同期であることができ、これを示すために `async` キーワードを使用します。

さまざまな型宣言におけるイニシャライザの例については、初期化の章を参照してください。

### 失敗可能なイニシャライザ

失敗可能なイニシャライザは、宣言された型のオプショナルインスタンスまたは暗黙的にアンラップされたオプショナルインスタンスを生成するイニシャライザの一種です。その結果、失敗可能なイニシャライザは初期化が失敗したことを示すために `nil` を返すことができます。

オプショナルインスタンスを生成する失敗可能なイニシャライザを宣言するには、イニシャライザ宣言の `init` キーワードに疑問符を付けます（`init?`）。暗黙的にアンラップされたオプショナルインスタンスを生成する失敗可能なイニシャライザを宣言するには、代わりに感嘆符を付けます（`init!`）。以下の例は、構造体のオプショナルインスタンスを生成する `init?` 失敗可能なイニシャライザを示しています。

```swift
struct SomeStruct {
    let property: String
    // 'SomeStruct' のオプショナルインスタンスを生成
    init?(input: String) {
        if input.isEmpty {
            // 'self' を破棄して 'nil' を返す
            return nil
        }
        property = input
    }
}
```

`init?` 失敗可能なイニシャライザを呼び出す方法は、非失敗可能なイニシャライザを呼び出す方法と同じですが、結果のオプショナル性に対処する必要があります。

```swift
if let actualInstance = SomeStruct(input: "Hello") {
    // 'SomeStruct' のインスタンスを使用して何かを行う
} else {
    // 'SomeStruct' の初期化が失敗し、イニシャライザが 'nil' を返した
}
```

失敗可能なイニシャライザは、イニシャライザの本体の任意のポイントで `nil` を返すことができます。

失敗可能なイニシャライザは、任意の種類のイニシャライザに委譲できます。非失敗可能なイニシャライザは、他の非失敗可能なイニシャライザまたは `init!` 失敗可能なイニシャライザに委譲できます。非失敗可能なイニシャライザは、スーパークラスのイニシャライザの結果を強制アンラップすることで `init?` 失敗可能なイニシャライザに委譲できます。例えば、`super.init()!` と書くことで実現できます。

初期化の失敗は、イニシャライザの委譲を通じて伝播します。具体的には、失敗可能なイニシャライザが失敗して `nil` を返すイニシャライザに委譲した場合、委譲したイニシャライザも失敗し、暗黙的に `nil` を返します。非失敗可能なイニシャライザが `init!` 失敗可能なイニシャライザに委譲し、それが失敗して `nil` を返した場合、ランタイムエラーが発生します（オプショナルが `nil` 値を持つ場合に `!` 演算子を使用してアンラップした場合と同様です）。

失敗可能な指定イニシャライザは、任意の種類の指定イニシャライザによってサブクラスでオーバーライドできます。非失敗可能な指定イニシャライザは、非失敗可能な指定イニシャライザによってのみサブクラスでオーバーライドできます。

失敗可能なイニシャライザの詳細と例については、失敗可能なイニシャライザの章を参照してください。

### イニシャライザ宣言の文法

```ebnf
initializer-declaration → initializer-head generic-parameter-clause? parameter-clause async? throws-clause? generic-where-clause? initializer-body
initializer-declaration → initializer-head generic-parameter-clause? parameter-clause async? rethrows generic-where-clause? initializer-body
initializer-head → attributes? declaration-modifiers? init
initializer-head → attributes? declaration-modifiers? init ?
initializer-head → attributes? declaration-modifiers? init !
initializer-body → code-block
```

## デイニシャライザ宣言

デイニシャライザ宣言は、クラス型のデイニシャライザを宣言します。デイニシャライザはパラメータを取らず、次の形式を持ちます。

```swift
deinit {
   <#statements#>
}
```

デイニシャライザは、クラスオブジェクトへの参照がなくなり、クラスオブジェクトが解放される直前に自動的に呼び出されます。デイニシャライザはクラス宣言の本体内でのみ宣言でき、クラスの拡張では宣言できません。また、各クラスは最大で1つのデイニシャライザを持つことができます。

サブクラスはスーパークラスのデイニシャライザを継承し、サブクラスオブジェクトが解放される直前に暗黙的に呼び出されます。サブクラスオブジェクトは、その継承チェーン内のすべてのデイニシャライザが実行を終了するまで解放されません。

デイニシャライザは直接呼び出されません。

クラス宣言でデイニシャライザを使用する方法の例については、デイニシャライゼーションの章を参照してください。

### デイニシャライザ宣言の文法

```ebnf
deinitializer-declaration → attributes? deinit code-block
```

## 拡張宣言

拡張宣言を使用すると、既存の型の動作を拡張できます。拡張宣言は `extension` キーワードを使用して宣言され、次の形式を取ります。

```swift
extension <#type name#> where <#requirements#> {
   <#declarations#>
}
```

拡張宣言の本体には、0個以上の宣言が含まれます。これらの宣言には、計算プロパティ、計算型プロパティ、インスタンスメソッド、型メソッド、イニシャライザ、サブスクリプト宣言、さらにはクラス、構造体、および列挙型の宣言を含めることができます。拡張宣言には、デイニシャライザやプロトコル宣言、格納プロパティ、プロパティオブザーバ、または他の拡張宣言を含めることはできません。プロトコル拡張の宣言には `final` を付けることはできません。さまざまな種類の宣言を含む拡張の議論といくつかの例については、拡張を参照してください。

型名がクラス、構造体、または列挙型の場合、拡張はその型を拡張します。型名がプロトコル型の場合、拡張はそのプロトコルに準拠するすべての型を拡張します。

ジェネリック型または関連型を持つプロトコルを拡張する場合、要件を含めることができます。拡張された型のインスタンスまたは拡張されたプロトコルに準拠する型のインスタンスが要件を満たす場合、そのインスタンスは宣言で指定された動作を取得します。

拡張宣言にはイニシャライザ宣言を含めることができます。ただし、拡張する型が別のモジュールで定義されている場合、イニシャライザ宣言はそのモジュールですでに定義されているイニシャライザに委譲する必要があります。これにより、その型のメンバーが適切に初期化されることが保証されます。

既存の型のプロパティ、メソッド、およびイニシャライザは、その型の拡張でオーバーライドすることはできません。

拡張宣言は、採用されたプロトコルを指定することによって、既存のクラス、構造体、または列挙型にプロトコル準拠を追加できます。

```swift
extension <#type name#>: <#adopted protocols#> where <#requirements#> {
   <#declarations#>
}
```

拡張宣言は、既存のクラスにクラス継承を追加することはできないため、型名とコロンの後にプロトコルのリストのみを指定できます。

### 条件付き準拠

ジェネリック型を拡張してプロトコルに条件付きで準拠させることができます。これにより、特定の要件が満たされた場合にのみ、その型のインスタンスがプロトコルに準拠します。拡張宣言に要件を含めることで、プロトコルに条件付きで準拠させることができます。

### 一部のジェネリックコンテキストではオーバーライドされた要件が使用されない

一部のジェネリックコンテキストでは、プロトコルへの条件付き準拠から動作を取得する型が、必ずしもそのプロトコルの要件の特殊化された実装を使用するとは限りません。この動作を説明するために、次の例では2つのプロトコルと、それぞれのプロトコルに条件付きで準拠するジェネリック型を定義しています。

```swift
protocol Loggable {
    func log()
}
extension Loggable {
    func log() {
        print(self)
    }
}

protocol TitledLoggable: Loggable {
    static var logTitle: String { get }
}
extension TitledLoggable {
    func log() {
        print("\(Self.logTitle): \(self)")
    }
}

struct Pair<T>: CustomStringConvertible {
    let first: T
    let second: T
    var description: String {
        return "(\(first), \(second))"
    }
}

extension Pair: Loggable where T: Loggable { }
extension Pair: TitledLoggable where T: TitledLoggable {
    static var logTitle: String {
        return "Pair of '\(T.logTitle)'"
    }
}

extension String: TitledLoggable {
    static var logTitle: String {
        return "String"
    }
}
```

`Pair` 構造体は、ジェネリック型がそれぞれ `Loggable` または `TitledLoggable` に準拠する場合に `Loggable` および `TitledLoggable` に準拠します。以下の例では、`oneAndTwo` は `Pair<String>` のインスタンスであり、`String` が `TitledLoggable` に準拠しているため `TitledLoggable` に準拠しています。`oneAndTwo` に対して `log()` メソッドが直接呼び出されると、タイトル文字列を含む特殊化されたバージョンが使用されます。

```swift
let oneAndTwo = Pair(first: "one", second: "two")
oneAndTwo.log()
// Prints "Pair of 'String': (one, two)"
```

しかし、`oneAndTwo` がジェネリックコンテキストまたは `Loggable` プロトコルのインスタンスとして使用される場合、特殊化されたバージョンは使用されません。Swiftは、`Pair` が `Loggable` に準拠するために必要な最小要件のみを参照して、どの `log()` の実装を呼び出すかを決定します。このため、`Loggable` プロトコルによって提供されるデフォルトの実装が代わりに使用されます。

```swift
func doSomething<T: Loggable>(with x: T) {
    x.log()
}
doSomething(with: oneAndTwo)
// Prints "(one, two)"
```

`doSomething(_)` に渡されたインスタンスに対して `log()` が呼び出されると、カスタマイズされたタイトルはログ文字列から省略されます。

### プロトコル準拠は冗長であってはならない

具体的な型は特定のプロトコルに一度だけ準拠できます。Swiftは冗長なプロトコル準拠をエラーとしてマークします。この種のエラーに遭遇する可能性が高いのは、2つの状況です。最初の状況は、異なる要件で同じプロトコルに複数回明示的に準拠する場合です。2つ目の状況は、同じプロトコルを複数回暗黙的に継承する場合です。これらの状況については、以下のセクションで説明します。

#### 明示的な冗長性の解決

具体的な型に対する複数の拡張は、要件が相互に排他的であっても、同じプロトコルへの準拠を追加することはできません。この制限は、次の例で示されています。2つの拡張宣言が、`Int` 要素を持つ配列と `String` 要素を持つ配列に対して `Serializable` プロトコルへの条件付き準拠を追加しようとしています。

```swift
protocol Serializable {
    func serialize() -> Any
}

extension Array: Serializable where Element == Int {
    func serialize() -> Any {
        // 実装
    }
}
extension Array: Serializable where Element == String {
    func serialize() -> Any {
        // 実装
    }
}
// エラー: 'Array<Element>' のプロトコル 'Serializable' への冗長な準拠
```

複数の具体的な型に基づいて条件付き準拠を追加する必要がある場合は、各型が準拠できる新しいプロトコルを作成し、そのプロトコルを条件付き準拠を宣言する際の要件として使用します。

```swift
protocol SerializableInArray { }
extension Int: SerializableInArray { }
extension String: SerializableInArray { }

extension Array: Serializable where Element: SerializableInArray {
    func serialize() -> Any {
        // 実装
    }
}
```

#### 暗黙的な冗長性の解決

具体的な型が条件付きでプロトコルに準拠する場合、その型は同じ要件で親プロトコルにも暗黙的に準拠します。

単一の親プロトコルから継承する2つのプロトコルに型を条件付きで準拠させる必要がある場合、親プロトコルへの準拠を明示的に宣言します。これにより、異なる要件で親プロトコルに2回暗黙的に準拠することを避けることができます。

次の例では、`Array` の条件付き準拠を明示的に宣言して、`TitledLoggable` と新しい `MarkedLoggable` プロトコルへの条件付き準拠を宣言する際の競合を回避しています。

```swift
protocol MarkedLoggable: Loggable {
    func markAndLog()
}

extension MarkedLoggable {
    func markAndLog() {
        print("----------")
        log()
    }
}

extension Array: Loggable where Element: Loggable { }
extension Array: TitledLoggable where Element: TitledLoggable {
    static var logTitle: String {
        return "Array of '\(Element.logTitle)'"
    }
}
extension Array: MarkedLoggable where Element: MarkedLoggable { }
```

`Loggable` への条件付き準拠を明示的に宣言しない場合、他の `Array` 拡張はこれらの宣言を暗黙的に作成し、エラーが発生します。

```swift
extension Array: Loggable where Element: TitledLoggable { }
extension Array: Loggable where Element: MarkedLoggable { }
// エラー: 'Array<Element>' のプロトコル 'Loggable' への冗長な準拠
```

### 拡張宣言の文法

```ebnf
extension-declaration → attributes? access-level-modifier? extension type-identifier type-inheritance-clause? generic-where-clause? extension-body
extension-body → { extension-members? }
extension-members → extension-member extension-members?
extension-member → declaration | compiler-control-statement
```

## サブスクリプト宣言

サブスクリプト宣言を使用すると、特定の型のオブジェクトにサブスクリプトサポートを追加でき、通常はコレクション、リスト、またはシーケンス内の要素にアクセスするための便利な構文を提供します。サブスクリプト宣言は `subscript` キーワードを使用して宣言され、次の形式を持ちます:

```swift
subscript (<#parameters#>) -> <#return type#> {
   get {
      <#statements#>
   }
   set(<#setter name#>) {
      <#statements#>
   }
}
```

サブスクリプト宣言は、クラス、構造体、列挙型、拡張、またはプロトコル宣言のコンテキスト内にのみ表示できます。

パラメータは、サブスクリプト式内の対応する型の要素にアクセスするために使用される1つ以上のインデックスを指定します（例えば、`object[i]` の `i`）。要素にアクセスするために使用されるインデックスは任意の型にすることができますが、各パラメータには各インデックスの型を指定するための型注釈を含める必要があります。戻り値の型は、アクセスされる要素の型を指定します。

計算プロパティと同様に、サブスクリプト宣言はアクセスされる要素の値の読み取りと書き込みをサポートします。ゲッターは値を読み取るために使用され、セッターは値を書き込むために使用されます。セッター句はオプションであり、ゲッターのみが必要な場合は、両方の句を省略して要求された値を直接返すことができます。とはいえ、セッター句を提供する場合は、ゲッター句も提供する必要があります。

セッター名と括弧はオプションです。セッター名を提供する場合、それはセッターへのパラメータの名前として使用されます。セッター名を提供しない場合、セッターへのデフォルトのパラメータ名は `value` です。セッターへのパラメータの型は戻り値の型と同じです。

パラメータまたは戻り値の型が異なる限り、宣言された型内でサブスクリプト宣言をオーバーロードすることができます。また、スーパークラスから継承されたサブスクリプト宣言をオーバーライドすることもできます。その場合、オーバーライドされたサブスクリプト宣言に `override` 宣言修飾子を付ける必要があります。

サブスクリプトパラメータは、2つの例外を除いて関数パラメータと同じルールに従います。デフォルトでは、サブスクリプトで使用されるパラメータには、関数、メソッド、およびイニシャライザとは異なり、引数ラベルがありません。ただし、関数、メソッド、およびイニシャライザが使用するのと同じ構文を使用して明示的な引数ラベルを提供できます。さらに、サブスクリプトには `inout` パラメータを持つことはできません。サブスクリプトパラメータには、特別な種類のパラメータで説明されている構文を使用してデフォルト値を持たせることができます。

プロトコル宣言のコンテキストでもサブスクリプトを宣言できます。詳細はプロトコルサブスクリプト宣言を参照してください。

サブスクリプトとサブスクリプト宣言の例についての詳細は、サブスクリプトを参照してください。

### 型サブスクリプト宣言

型によって公開されるサブスクリプトを宣言するには、サブスクリプト宣言に `static` 宣言修飾子を付けます。クラスは、サブクラスがスーパークラスの実装をオーバーライドできるようにするために、型計算プロパティに `class` 宣言修飾子を付けることもできます。クラス宣言では、`static` キーワードは宣言に `class` と `final` 宣言修飾子の両方を付けるのと同じ効果を持ちます。

### サブスクリプト宣言の文法

```ebnf
subscript-declaration → subscript-head subscript-result generic-where-clause? code-block
subscript-declaration → subscript-head subscript-result generic-where-clause? getter-setter-block
subscript-declaration → subscript-head subscript-result generic-where-clause? getter-setter-keyword-block
subscript-head → attributes? declaration-modifiers? subscript generic-parameter-clause? parameter-clause
subscript-result → -> attributes? type
```

## マクロ宣言

マクロ宣言は新しいマクロを導入します。`macro` キーワードで始まり、次の形式を持ちます:

```swift
macro <#name#> = <#macro implementation#>
```

マクロ実装は別のマクロであり、このマクロの展開を実行するコードの場所を示します。マクロ展開を実行するコードは別のSwiftプログラムであり、`SwiftSyntax` モジュールを使用してSwiftコードと対話します。Swift標準ライブラリから `externalMacro(module:type:)` マクロを呼び出し、その型の実装を含むモジュールの名前とその型の名前を渡します。

マクロは関数と同じモデルに従ってオーバーロードできます。マクロ宣言はファイルスコープでのみ表示されます。

Swiftのマクロの概要については、マクロを参照してください。

### マクロ宣言の文法

```ebnf
macro-declaration → macro-head identifier generic-parameter-clause? macro-signature macro-definition? generic-where-clause
macro-head → attributes? declaration-modifiers? macro
macro-signature → parameter-clause macro-function-signature-result?
macro-function-signature-result → -> type
macro-definition → = expression
```

## 演算子宣言

演算子宣言は、新しい中置、前置、または後置演算子をプログラムに導入し、`operator` キーワードを使用して宣言されます。

3つの異なる結合性の演算子を宣言できます: 中置、前置、および後置。演算子の結合性は、オペランドに対する演算子の相対的な位置を指定します。

演算子宣言には、結合性ごとに3つの基本形式があります。演算子の結合性は、`operator` キーワードの前に `infix`、`prefix`、または `postfix` 宣言修飾子を付けることで指定されます。各形式では、演算子の名前には演算子で定義された文字のみを含めることができます。

次の形式は、新しい中置演算子を宣言します:

```swift
infix operator <#operator name#>: <#precedence group#>
```

中置演算子は、2つのオペランドの間に書かれる二項演算子であり、例えば、式 `1 + 2` の加算演算子（`+`）のようなものです。

中置演算子は、オプションで優先順位グループを指定できます。演算子の優先順位グループを省略した場合、Swiftはデフォルトの優先順位グループ `DefaultPrecedence` を使用します。これは `TernaryPrecedence` よりも少し高い優先順位を指定します。詳細については、優先順位グループ宣言を参照してください。

次の形式は、新しい前置演算子を宣言します:

```swift
prefix operator <#operator name#>
```

前置演算子は、オペランドの直前に書かれる単項演算子であり、例えば、式 `!a` の前置論理否定演算子（`!`）のようなものです。

前置演算子宣言は優先順位レベルを指定しません。前置演算子は非結合性です。

次の形式は、新しい後置演算子を宣言します:

```swift
postfix operator <#operator name#>
```

後置演算子は、オペランドの直後に書かれる単項演算子であり、例えば、式 `a!` の後置強制アンラップ演算子（`!`）のようなものです。

前置演算子と同様に、後置演算子宣言は優先順位レベルを指定しません。後置演算子は非結合性です。

新しい演算子を宣言した後、その演算子と同じ名前の静的メソッドを宣言することで実装します。静的メソッドは、演算子が引数として取る型の1つのメンバーです。例えば、`Double` と `Int` を掛ける演算子は、`Double` または `Int` 構造体のいずれかの静的メソッドとして実装されます。前置または後置演算子を実装する場合、そのメソッド宣言にも対応する `prefix` または `postfix` 宣言修飾子を付ける必要があります。新しい演算子を作成して実装する方法の例については、カスタム演算子を参照してください。

### 演算子宣言の文法

```ebnf
operator-declaration → prefix-operator-declaration | postfix-operator-declaration | infix-operator-declaration
prefix-operator-declaration → prefix operator operator
postfix-operator-declaration → postfix operator operator
infix-operator-declaration → infix operator operator infix-operator-group?
infix-operator-group → : precedence-group-name
```

## 優先順位グループ宣言

優先順位グループ宣言は、中置演算子の優先順位の新しいグループをプログラムに導入します。演算子の優先順位は、グループ化の括弧がない場合に、演算子がオペランドにどれだけ強く結びつくかを指定します。

優先順位グループ宣言は次の形式を持ちます：

```swift
precedencegroup <#precedence group name#> {
    higherThan: <#lower group names#>
    lowerThan: <#higher group names#>
    associativity: <#associativity#>
    assignment: <#assignment#>
}
```

lower group names と higher group names のリストは、新しい優先順位グループの既存の優先順位グループとの関係を指定します。`lowerThan` 優先順位グループ属性は、現在のモジュールの外部で宣言された優先順位グループを参照するためにのみ使用できます。例えば、式 `2 + 3 * 5` では、2つの演算子がオペランドを巡って競合する場合、相対的に優先順位が高い演算子がオペランドにより強く結びつきます。

> **注**: lower group names と higher group names を使用して関連付けられた優先順位グループは、単一の関係階層に適合する必要がありますが、線形階層を形成する必要はありません。つまり、相対的な優先順位が未定義の優先順位グループを持つことが可能です。これらの優先順位グループの演算子は、グループ化の括弧なしで隣接して使用することはできません。

Swift は、Swift 標準ライブラリで提供される演算子に対応する多数の優先順位グループを定義しています。例えば、加算 (`+`) と減算 (`-`) 演算子は `AdditionPrecedence` グループに属し、乗算 (`*`) と除算 (`/`) 演算子は `MultiplicationPrecedence` グループに属します。Swift 標準ライブラリで提供される優先順位グループの完全なリストについては、演算子宣言を参照してください。

演算子の結合性は、グループ化の括弧がない場合に、同じ優先順位レベルの演算子のシーケンスがどのようにグループ化されるかを指定します。演算子の結合性を指定するには、コンテキスト依存のキーワード `left`、`right`、または `none` のいずれかを記述します。結合性を省略した場合、デフォルトは `none` です。左結合の演算子は左から右にグループ化されます。例えば、減算演算子 (`-`) は左結合なので、式 `4 - 5 - 6` は `(4 - 5) - 6` とグループ化され、`-7` と評価されます。右結合の演算子は右から左にグループ化され、結合性が `none` と指定された演算子は全く結合しません。同じ優先順位レベルの非結合演算子は隣接して現れることはできません。例えば、`<` 演算子は結合性が `none` なので、`1 < 2 < 3` は有効な式ではありません。

優先順位グループの代入は、オプショナルチェーンを含む操作で演算子の優先順位を指定します。`true` に設定すると、対応する優先順位グループの演算子は、Swift 標準ライブラリの代入演算子と同じグループ化ルールを使用します。それ以外の場合、`false` に設定するか省略すると、優先順位グループの演算子は代入を行わない演算子と同じオプショナルチェーンルールに従います。

### 優先順位グループ宣言の文法

```ebnf
precedence-group-declaration → precedencegroup precedence-group-name { precedence-group-attributes? }
precedence-group-attributes → precedence-group-attribute precedence-group-attributes?
precedence-group-attribute → precedence-group-relation
precedence-group-attribute → precedence-group-assignment
precedence-group-attribute → precedence-group-associativity
precedence-group-relation → higherThan : precedence-group-names
precedence-group-relation → lowerThan : precedence-group-names
precedence-group-assignment → assignment : boolean-literal
precedence-group-associativity → associativity : left
precedence-group-associativity → associativity : right
precedence-group-associativity → associativity : none
precedence-group-names → precedence-group-name | precedence-group-name , precedence-group-names
precedence-group-name → identifier
```

## 宣言修飾子

宣言修飾子は、宣言の動作や意味を変更するキーワードまたはコンテキスト依存のキーワードです。宣言修飾子を指定するには、適切なキーワードまたはコンテキスト依存のキーワードを宣言の属性（ある場合）と宣言を導入するキーワードの間に記述します。

### class

この修飾子をクラスのメンバーに適用して、そのメンバーがクラス自体のメンバーであり、クラスのインスタンスのメンバーではないことを示します。`final` 修飾子がないこの修飾子を持つスーパークラスのメンバーは、サブクラスによってオーバーライドできます。

### dynamic

この修飾子を、Objective-C で表現できるクラスの任意のメンバーに適用します。`dynamic` 修飾子でメンバー宣言をマークすると、そのメンバーへのアクセスは常に Objective-C ランタイムを使用して動的にディスパッチされます。そのメンバーへのアクセスは、コンパイラによってインライン化または非仮想化されることはありません。

`dynamic` 修飾子でマークされた宣言は Objective-C ランタイムを使用してディスパッチされるため、`@objc` 属性でマークされている必要があります。

### final

この修飾子をクラス、またはクラスのプロパティ、メソッド、サブスクリプトメンバーに適用します。クラスに適用すると、そのクラスはサブクラス化できないことを示します。クラスのプロパティ、メソッド、またはサブスクリプトに適用すると、そのクラスメンバーはサブクラスでオーバーライドできないことを示します。`final` 属性の使用方法の例については、オーバーライドの防止を参照してください。

### lazy

この修飾子をクラスまたは構造体の格納変数プロパティに適用して、そのプロパティの初期値が最初にアクセスされたときに一度だけ計算および格納されることを示します。`lazy` 修飾子の使用方法の例については、遅延格納プロパティを参照してください。

### optional

この修飾子をプロトコルのプロパティ、メソッド、またはサブスクリプトメンバーに適用して、準拠する型がそれらのメンバーを実装する必要がないことを示します。

`optional` 修飾子は、`@objc` 属性でマークされたプロトコルにのみ適用できます。その結果、クラス型のみがオプションのメンバー要件を含むプロトコルを採用および準拠できます。`optional` 修飾子の使用方法と、準拠する型がそれらを実装しているかどうかわからない場合にオプションのプロトコルメンバーにアクセスする方法については、オプションのプロトコル要件を参照してください。

### required

この修飾子をクラスの指定またはコンビニエンスイニシャライザに適用して、すべてのサブクラスがそのイニシャライザを実装する必要があることを示します。サブクラスのそのイニシャライザの実装も `required` 修飾子でマークする必要があります。

### static

この修飾子を構造体、クラス、列挙型、またはプロトコルのメンバーに適用して、そのメンバーがその型のインスタンスではなく、その型のメンバーであることを示します。クラス宣言のスコープ内でメンバー宣言に `static` 修飾子を記述すると、そのメンバー宣言に `class` および `final` 修飾子を記述した場合と同じ効果があります。ただし、クラスの定数型プロパティは例外です。これらの宣言には `class` または `final` を記述できないため、`static` は通常の非クラスの意味を持ちます。

### unowned

この修飾子を格納変数、定数、または格納プロパティに適用して、変数またはプロパティがその値として格納されたオブジェクトへの非所有参照を持つことを示します。オブジェクトが解放された後に変数またはプロパティにアクセスしようとすると、ランタイムエラーが発生します。弱参照のように、プロパティまたは値の型はクラス型でなければなりませんが、弱参照とは異なり、型は非オプショナルです。`unowned` 修飾子の例と詳細については、非所有参照を参照してください。

### unowned(safe)

`unowned`の明示的なスペル。

### unowned(unsafe)

この修飾子を格納変数、定数、または格納プロパティに適用して、変数またはプロパティがその値として格納されているオブジェクトへの非所有参照を持つことを示します。オブジェクトが解放された後に変数またはプロパティにアクセスしようとすると、オブジェクトが以前存在していた場所のメモリにアクセスすることになり、これはメモリの安全性がない操作です。弱参照と同様に、プロパティまたは値の型はクラス型でなければなりませんが、弱参照とは異なり、型はオプショナルではありません。`unowned`修飾子の例と詳細については、Unowned Referencesを参照してください。

### weak

この修飾子を格納変数または格納変数プロパティに適用して、変数またはプロパティがその値として格納されているオブジェクトへの弱参照を持つことを示します。変数またはプロパティの型はオプショナルなクラス型でなければなりません。オブジェクトが解放された後に変数またはプロパティにアクセスすると、その値は`nil`になります。`weak`修飾子の例と詳細については、Weak Referencesを参照してください。

## アクセス制御レベル

Swiftは5つのアクセス制御レベルを提供します：`open`、`public`、`internal`、`fileprivate`、および`private`。宣言のアクセスレベルを指定するために、以下のアクセスレベル修飾子のいずれかで宣言をマークできます。アクセス制御の詳細については、Access Controlを参照してください。

### open

この修飾子を宣言に適用して、宣言が宣言と同じモジュール内のコードによってアクセスおよびサブクラス化できることを示します。`open`アクセスレベル修飾子でマークされた宣言は、その宣言を含むモジュールをインポートするモジュールのコードによってもアクセスおよびサブクラス化できます。

### public

この修飾子を宣言に適用して、宣言が宣言と同じモジュール内のコードによってアクセスおよびサブクラス化できることを示します。`public`アクセスレベル修飾子でマークされた宣言は、その宣言を含むモジュールをインポートするモジュールのコードによってもアクセスできますが、サブクラス化はできません。

### package

この修飾子を宣言に適用して、宣言が宣言と同じパッケージ内のコードによってのみアクセスできることを示します。パッケージは、使用しているビルドシステムで定義するコード配布の単位です。ビルドシステムがコードをコンパイルするとき、Swiftコンパイラに`-package-name`フラグを渡してパッケージ名を指定します。ビルドシステムがそれらをビルドするときに同じパッケージ名を指定する場合、2つのモジュールは同じパッケージの一部です。

### internal

この修飾子を宣言に適用して、宣言が宣言と同じモジュール内のコードによってのみアクセスできることを示します。デフォルトでは、ほとんどの宣言は暗黙的に`internal`アクセスレベル修飾子でマークされています。

### fileprivate

この修飾子を宣言に適用して、宣言が宣言と同じソースファイル内のコードによってのみアクセスできることを示します。

### private

この修飾子を宣言に適用して、宣言が宣言の直近の囲むスコープ内のコードによってのみアクセスできることを示します。

アクセス制御の目的のために、拡張は次のように動作します：

- 同じファイル内に複数の拡張があり、それらの拡張がすべて同じ型を拡張する場合、それらの拡張はすべて同じアクセス制御スコープを持ちます。拡張とそれが拡張する型は異なるファイルに存在することができます。
- 拡張がそれが拡張する型と同じファイルにある場合、拡張はそれが拡張する型と同じアクセス制御スコープを持ちます。
- 型の宣言で宣言されたプライベートメンバーは、その型の拡張からアクセスできます。1つの拡張で宣言されたプライベートメンバーは、他の拡張および拡張された型の宣言からアクセスできます。

上記の各アクセスレベル修飾子は、オプションで1つの引数を受け入れます。この引数は、`set`キーワードを括弧で囲んだものです（例：`private(set)`）。この形式のアクセスレベル修飾子を使用して、変数またはサブスクリプトのセッターのアクセスレベルを、変数またはサブスクリプト自体のアクセスレベル以下に指定します。詳細は、Getters and Settersを参照してください。

### 宣言修飾子の文法

```ebnf
declaration-modifier → class | convenience | dynamic | final | infix | lazy | optional | override | postfix | prefix | required | static | unowned | unowned ( safe ) | unowned ( unsafe ) | weak
declaration-modifier → access-level-modifier
declaration-modifier → mutation-modifier
declaration-modifier → actor-isolation-modifier
declaration-modifiers → declaration-modifier declaration-modifiers?
access-level-modifier → private | private ( set )
access-level-modifier → fileprivate | fileprivate ( set )
access-level-modifier → internal | internal ( set )
access-level-modifier → package | package ( set )
access-level-modifier → public | public ( set )
access-level-modifier → open | open ( set )
mutation-modifier → mutating | nonmutating
actor-isolation-modifier → nonisolated
```