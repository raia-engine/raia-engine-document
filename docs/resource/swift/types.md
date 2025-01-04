# 型

組み込みの名前付き型と複合型を使用します。

Swiftには、名前付き型と複合型の2種類の型があります。名前付き型は、定義時に特定の名前を付けることができる型です。名前付き型には、クラス、構造体、列挙型、およびプロトコルが含まれます。例えば、`MyClass`という名前のユーザー定義クラスのインスタンスは、`MyClass`型を持ちます。ユーザー定義の名前付き型に加えて、Swift標準ライブラリには、配列、辞書、およびオプショナル値を表す多くの一般的に使用される名前付き型が定義されています。

他の言語で通常基本またはプリミティブと見なされるデータ型（数値、文字、および文字列を表す型など）は、実際には構造体を使用してSwift標準ライブラリで定義および実装された名前付き型です。名前付き型であるため、拡張宣言を使用してプログラムのニーズに合わせてその動作を拡張できます。詳細は[拡張と拡張宣言](#)を参照してください。

複合型は名前のない型で、Swift言語自体で定義されています。複合型には、関数型とタプル型の2つがあります。複合型には名前付き型や他の複合型を含めることができます。例えば、タプル型`(Int, (Int, Int))`は2つの要素を含みます。最初の要素は名前付き型`Int`で、2番目の要素は別の複合型`(Int, Int)`です。

名前付き型または複合型の周りに括弧を付けることができます。ただし、型の周りに括弧を付けても何の効果もありません。例えば、`(Int)`は`Int`と同じです。

この章では、Swift言語自体で定義された型について説明し、Swiftの型推論の動作について説明します。

## 型の文法

```
type → function-type
type → array-type
type → dictionary-type
type → type-identifier
type → tuple-type
type → optional-type
type → implicitly-unwrapped-optional-type
type → protocol-composition-type
type → opaque-type
type → boxed-protocol-type
type → metatype-type
type → any-type
type → self-type
type → ( type )
```

## 型注釈

型注釈は、変数や式の型を明示的に指定します。型注釈はコロン（`:`）で始まり、型で終わります。以下の例を参照してください。

```swift
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int) { /* ... */ }
```

最初の例では、式`someTuple`がタプル型`(Double, Double)`を持つことが指定されています。2番目の例では、関数`someFunction`のパラメータ`a`が`Int`型を持つことが指定されています。

型注釈には、型の前にオプションで型属性のリストを含めることができます。

### 型注釈の文法

```
type-annotation → : attributes? type
```

## 型識別子

型識別子は、名前付き型または名前付き型や複合型の型エイリアスを指します。

ほとんどの場合、型識別子は識別子と同じ名前の名前付き型を直接指します。例えば、`Int`は名前付き型`Int`を直接指す型識別子であり、型識別子`Dictionary<String, Int>`は名前付き型`Dictionary<String, Int>`を直接指します。

型識別子が同じ名前の型を指さない場合が2つあります。最初の場合、型識別子は名前付き型や複合型の型エイリアスを指します。例えば、以下の例では、型注釈で使用されている`Point`はタプル型`(Int, Int)`を指します。

```swift
typealias Point = (Int, Int)
let origin: Point = (0, 0)
```

2番目の場合、型識別子はドット（`.`）構文を使用して、他のモジュールで宣言された名前付き型や他の型内にネストされた名前付き型を指します。例えば、以下のコードでは、型識別子は`ExampleModule`モジュールで宣言された名前付き型`MyType`を参照しています。

```swift
var someValue: ExampleModule.MyType
```

### 型識別子の文法

```
type-identifier → type-name generic-argument-clause? | type-name generic-argument-clause? . type-identifier
type-name → identifier
```

## タプル型

タプル型は、括弧で囲まれたカンマ区切りの型のリストです。

タプル型を関数の戻り値の型として使用して、関数が複数の値を含む単一のタプルを返すようにすることができます。また、タプル型の要素に名前を付け、その名前を使用して個々の要素の値を参照することもできます。要素名は識別子とコロン（`:`）で構成されます。これらの機能の両方を示す例については、[複数の戻り値を持つ関数](#)を参照してください。

タプル型の要素に名前がある場合、その名前は型の一部です。

```swift
var someTuple = (top: 10, bottom: 12)  // someTupleは(top: Int, bottom: Int)型です
someTuple = (top: 4, bottom: 42) // OK: 名前が一致します
someTuple = (9, 99)              // OK: 名前が推測されます
someTuple = (left: 5, right: 5)  // エラー: 名前が一致しません
```

すべてのタプル型は2つ以上の型を含みますが、空のタプル型`()`の型エイリアスである`Void`は例外です。

### タプル型の文法

```
tuple-type → ( ) | ( tuple-type-element , tuple-type-element-list )
tuple-type-element-list → tuple-type-element | tuple-type-element , tuple-type-element-list
tuple-type-element → element-name type-annotation | type
element-name → identifier
```

## 関数型

関数型は関数、メソッド、またはクロージャの型を表し、パラメータ型と戻り値型が矢印（`->`）で区切られています：

```
(<#parameter type#>) -> <#return type#>
```

パラメータ型はカンマで区切られた型のリストです。戻り値型がタプル型である可能性があるため、関数型は複数の値を返す関数やメソッドをサポートします。

関数型のパラメータ `() -> T`（ここで `T` は任意の型）は、`autoclosure` 属性を適用して呼び出しサイトで暗黙的にクロージャを作成できます。これにより、関数を呼び出すときに明示的なクロージャを書く必要なく、式の評価を遅延させるための構文上の便利な方法が提供されます。autoclosure 関数型パラメータの例については、[Autoclosures](#) を参照してください。

関数型のパラメータ型には可変長パラメータを含めることができます。構文的には、可変長パラメータは基本型名の直後に三点リーダー（`...`）が続く形で構成されます。例えば、`Int...` のように。可変長パラメータは基本型名の要素を含む配列として扱われます。例えば、可変長パラメータ `Int...` は `[Int]` として扱われます。可変長パラメータを使用する例については、[Variadic Parameters](#) を参照してください。

in-out パラメータを指定するには、パラメータ型の前に `inout` キーワードを付けます。可変長パラメータや戻り値型に `inout` キーワードを付けることはできません。in-out パラメータについては、[In-Out Parameters](#) で説明されています。

関数型が1つのパラメータしか持たず、そのパラメータの型がタプル型である場合、関数の型を書くときにタプル型を括弧で囲む必要があります。例えば、`((Int, Int)) -> Void` は、タプル型 `(Int, Int)` の単一のパラメータを取り、値を返さない関数の型です。対照的に、括弧がない場合、`(Int, Int) -> Void` は2つの `Int` パラメータを取り、値を返さない関数の型です。同様に、`Void` は `()` の型エイリアスであるため、関数型 `(Void) -> Void` は `(()) -> ()` と同じです。これは、空のタプルを引数として取る関数の型です。これらの型は、引数を取らない関数の型 `() -> ()` とは異なります。

関数やメソッドの引数名は対応する関数型の一部ではありません。例えば：

```swift
func someFunction(left: Int, right: Int) {}
func anotherFunction(left: Int, right: Int) {}
func functionWithDifferentLabels(top: Int, bottom: Int) {}

var f = someFunction // f の型は (Int, Int) -> Void であり、(left: Int, right: Int) -> Void ではありません。
f = anotherFunction              // OK
f = functionWithDifferentLabels  // OK

func functionWithDifferentArgumentTypes(left: Int, right: String) {}
f = functionWithDifferentArgumentTypes     // エラー

func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
f = functionWithDifferentNumberOfArguments // エラー
```

引数ラベルは関数の型の一部ではないため、関数型を書くときには省略します。

```swift
var operation: (lhs: Int, rhs: Int) -> Int     // エラー
var operation: (_ lhs: Int, _ rhs: Int) -> Int // OK
var operation: (Int, Int) -> Int               // OK
```

関数型に複数の矢印（`->`）が含まれる場合、関数型は右から左にグループ化されます。例えば、関数型 `(Int) -> (Int) -> Int` は `(Int) -> ((Int) -> Int)` として理解されます。つまり、`Int` を取り、`Int` を取り `Int` を返す別の関数を返す関数です。

エラーをスローまたはリスローできる関数の関数型には `throws` キーワードを含める必要があります。`throws` の後に型を括弧で囲んで含めることで、関数がスローするエラーの型を指定できます。スローするエラーの型は `Error` プロトコルに準拠している必要があります。型を指定せずに `throws` と書くことは、`throws(any Error)` と書くのと同じです。`throws` を省略することは、`throws(Never)` と書くのと同じです。関数がスローするエラーの型は、`Error` に準拠している任意の型であり、ジェネリック型、プロトコル型、オペーク型を含むことができます。

関数がスローするエラーの型はその関数の型の一部であり、エラー型間のサブタイプ関係は対応する関数型もサブタイプであることを意味します。例えば、カスタムの `MyError` 型を宣言した場合、いくつかの関数型の関係は次のようになります（スーパータイプからサブタイプへ）：

- 任意のエラーをスローする関数、`throws(any Error)` とマークされる
- 特定のエラーをスローする関数、`throws(MyError)` とマークされる
- エラーをスローしない関数、`throws(Never)` とマークされる

これらのサブタイプ関係の結果として：

- 非スロー関数をスロー関数と同じ場所で使用できます。
- 具体的なエラー型をスローする関数をスロー関数と同じ場所で使用できます。
- より具体的なエラー型をスローする関数を、より一般的なエラー型をスローする関数と同じ場所で使用できます。

関数型でスローされるエラー型として関連型やジェネリック型パラメータを使用する場合、その関連型やジェネリック型パラメータは暗黙的に `Error` プロトコルに準拠する必要があります。

スローおよびリスロー関数については、[Throwing Functions and Methods](#) および [Rethrowing Functions and Methods](#) で説明されています。

非同期関数の関数型には `async` キーワードを含める必要があります。`async` キーワードは関数の型の一部であり、同期関数は非同期関数のサブタイプです。その結果、同期関数を非同期関数と同じ場所で使用できます。非同期関数についての情報は、[Asynchronous Functions and Methods](#) を参照してください。

### 非エスケープクロージャの制限

非エスケープ関数であるパラメータは、その値がエスケープする可能性があるため、`Any` 型のプロパティ、変数、または定数に格納することはできません。

非エスケープ関数であるパラメータは、別の非エスケープ関数パラメータへの引数として渡すことはできません。この制限により、Swift はメモリへの競合アクセスのチェックをランタイムではなくコンパイル時に行うことができます。例えば：

```swift
let external: (() -> Void) -> Void = { _ in () }
func takesTwoFunctions(first: (() -> Void) -> Void, second: (() -> Void) -> Void) {
    first { first {} }       // エラー
    second { second {}  }    // エラー

    first { second {} }      // エラー
    second { first {} }      // エラー

    first { external {} }    // OK
    external { first {} }    // OK
}
```

上記のコードでは、`takesTwoFunctions(first:second:)` の2つのパラメータは関数です。どちらのパラメータも `@escaping` とマークされていないため、結果としてどちらも非エスケープです。

上記の例で「エラー」とマークされた4つの関数呼び出しはコンパイラエラーを引き起こします。`first` および `second` パラメータは非エスケープ関数であるため、別の非エスケープ関数パラメータへの引数として渡すことはできません。対照的に、「OK」とマークされた2つの関数呼び出しはコンパイラエラーを引き起こしません。これらの関数呼び出しは制限に違反していないためです。`external` は `takesTwoFunctions(first:second:)` のパラメータの1つではないためです。

この制限を回避する必要がある場合は、パラメータの1つをエスケープとしてマークするか、`withoutActuallyEscaping(_:do:)` 関数を使用して一時的に非エスケープ関数パラメータの1つをエスケープ関数に変換します。メモリへの競合アクセスを回避する方法については、[Memory Safety](#) を参照してください。

### 関数型の文法

```
function-type → attributes? function-type-argument-clause async? throws-clause? -> type
function-type-argument-clause → ( )
function-type-argument-clause → ( function-type-argument-list ...? )
function-type-argument-list → function-type-argument | function-type-argument , function-type-argument-list
function-type-argument → attributes? parameter-modifier? type | argument-label type-annotation
argument-label → identifier
throws-clause → throws | throws ( type )
```

## 配列型

Swift言語は、Swift標準ライブラリの`Array<Element>`型に対して以下の糖衣構文を提供します：

```
[<#type#>]
```

言い換えると、次の2つの宣言は同等です：

```swift
let someArray: Array<String> = ["Alex", "Brian", "Dave"]
let someArray: [String] = ["Alex", "Brian", "Dave"]
```

どちらの場合も、定数`someArray`は文字列の配列として宣言されています。配列の要素は、有効なインデックス値を角括弧で指定することでサブスクリプトを通じてアクセスできます：`someArray[0]`はインデックス0の要素、つまり`"Alex"`を指します。

複数次元の配列を作成するには、角括弧のペアをネストします。要素の基本型の名前は最も内側の角括弧のペアに含まれます。例えば、3次元の整数配列を作成するには、3組の角括弧を使用します：

```swift
var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```

多次元配列の要素にアクセスする場合、最も左のサブスクリプトインデックスは最も外側の配列のそのインデックスの要素を指します。右にある次のサブスクリプトインデックスは、1レベル内側にネストされた配列のそのインデックスの要素を指します。以下同様です。つまり、上記の例では、`array3D[0]`は`[[1, 2], [3, 4]]`を指し、`array3D[0][1]`は`[3, 4]`を指し、`array3D[0][1][1]`は値`4`を指します。

Swift標準ライブラリの`Array`型の詳細な議論については、[配列](#)を参照してください。

### 配列型の文法

```
array-type → [ type ]
```

## 辞書型

Swift言語は、Swift標準ライブラリの`Dictionary<Key, Value>`型に対して以下の糖衣構文を提供します：

```
[<#key type#>: <#value type#>]
```

言い換えると、次の2つの宣言は同等です：

```swift
let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
```

どちらの場合も、定数`someDictionary`はキーが文字列で値が整数の辞書として宣言されています。

辞書の値は、対応するキーを角括弧で指定することでサブスクリプトを通じてアクセスできます：`someDictionary["Alex"]`はキー`"Alex"`に関連付けられた値を指します。サブスクリプトは辞書の値型のオプショナル値を返します。指定されたキーが辞書に含まれていない場合、サブスクリプトは`nil`を返します。

辞書のキー型は、Swift標準ライブラリの`Hashable`プロトコルに準拠している必要があります。

Swift標準ライブラリの`Dictionary`型の詳細な議論については、[辞書](#)を参照してください。

### 辞書型の文法

```
dictionary-type → [ type : type ]
```

## オプショナル型

Swift言語は、Swift標準ライブラリで定義されている名前付き型`Optional<Wrapped>`の糖衣構文として後置`?`を定義しています。言い換えると、次の2つの宣言は同等です：

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

どちらの場合も、変数`optionalInteger`はオプショナルな整数型として宣言されています。型と`?`の間に空白を入れることはできません。

型`Optional<Wrapped>`は、値が存在するかどうかを表すために使用される2つのケース、`none`と`some(Wrapped)`を持つ列挙型です。任意の型は明示的に（または暗黙的に）オプショナル型として宣言できます。オプショナル変数やプロパティを宣言する際に初期値を提供しない場合、その値は自動的に`nil`にデフォルト設定されます。

オプショナル型のインスタンスに値が含まれている場合、後置演算子`!`を使用してその値にアクセスできます。以下の例を参照してください：

```swift
optionalInteger = 42
optionalInteger! // 42
```

値が`nil`のオプショナルをアンラップするために`!`演算子を使用すると、ランタイムエラーが発生します。

オプショナルチェーンやオプショナルバインディングを使用して、オプショナル式に対して条件付きで操作を実行することもできます。値が`nil`の場合、操作は実行されず、したがってランタイムエラーは発生しません。

オプショナル型の使用方法についての詳細と例については、[オプショナル](#)を参照してください。

### オプショナル型の文法

```
optional-type → type ?
```

## 暗黙的にアンラップされたオプショナル型

Swift言語は、Swift標準ライブラリで定義されている名前付き型`Optional<Wrapped>`の糖衣構文として後置`!`を定義しており、アクセス時に自動的にアンラップされる追加の動作を持ちます。値が`nil`の暗黙的にアンラップされたオプショナルを使用しようとすると、ランタイムエラーが発生します。暗黙的なアンラップ動作を除けば、次の2つの宣言は同等です：

```swift
var implicitlyUnwrappedString: String!
var explicitlyUnwrappedString: Optional<String>
```

型と`!`の間に空白を入れることはできません。

暗黙的なアンラップはその型を含む宣言の意味を変更するため、タプル型やジェネリック型の内部にネストされたオプショナル型（例えば辞書や配列の要素型）は暗黙的にアンラップすることはできません。例えば：

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // エラー
let implicitlyUnwrappedTuple: (Int, Int)!             // OK

let arrayOfImplicitlyUnwrappedElements: [Int!]        // エラー
let implicitlyUnwrappedArray: [Int]!                  // OK
```

暗黙的にアンラップされたオプショナルは、オプショナル値と同じ`Optional<Wrapped>`型を持つため、コード内のオプショナルを使用できるすべての場所で暗黙的にアンラップされたオプショナルを使用できます。例えば、暗黙的にアンラップされたオプショナルの値をオプショナルの変数、定数、プロパティに割り当てたり、その逆も可能です。

オプショナルと同様に、暗黙的にアンラップされたオプショナル変数やプロパティを宣言する際に初期値を提供しない場合、その値は自動的に`nil`にデフォルト設定されます。

暗黙的にアンラップされたオプショナル式に対して条件付きで操作を実行するためにオプショナルチェーンを使用します。値が`nil`の場合、操作は実行されず、したがってランタイムエラーは発生しません。

暗黙的にアンラップされたオプショナル型についての詳細は、[暗黙的にアンラップされたオプショナル](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID334)を参照してください。

### 暗黙的にアンラップされたオプショナル型の文法

```ebnf
implicitly-unwrapped-optional-type → type !
```

## プロトコル合成型

プロトコル合成型は、指定されたプロトコルのリストの各プロトコルに準拠する型、または指定されたクラスのサブクラスであり、指定されたプロトコルのリストの各プロトコルに準拠する型を定義します。プロトコル合成型は、型注釈、ジェネリックパラメータ句、およびジェネリックwhere句で型を指定する場合にのみ使用できます。

プロトコル合成型は次の形式を持ちます：

```swift
<#Protocol 1#> & <#Protocol 2#>
```

プロトコル合成型を使用すると、明示的に新しい名前付きプロトコルを定義せずに、複数のプロトコルの要件を満たす値を指定できます。たとえば、`ProtocolA & ProtocolB & ProtocolC`というプロトコル合成型を使用して、`ProtocolA`、`ProtocolB`、および`ProtocolC`を継承する新しいプロトコルを宣言する代わりに使用できます。同様に、`SuperClass & ProtocolA`を使用して、`SuperClass`のサブクラスであり、`ProtocolA`に準拠する新しいプロトコルを宣言する代わりに使用できます。

プロトコル合成リストの各項目は次のいずれかです。リストにはクラスを1つだけ含めることができます：
- クラスの名前
- プロトコルの名前
- 基本型がプロトコル合成型、プロトコル、またはクラスである型エイリアス

プロトコル合成型に型エイリアスが含まれている場合、定義に同じプロトコルが複数回出現することがありますが、重複は無視されます。たとえば、以下のコードの`PQR`の定義は`P & Q & R`と同等です。

```swift
typealias PQ = P & Q
typealias PQR = PQ & Q & R
```

### プロトコル合成型の文法

```ebnf
protocol-composition-type → type-identifier & protocol-composition-continuation
protocol-composition-continuation → type-identifier | protocol-composition-type
```

## 不透明型

不透明型は、基になる具体的な型を指定せずに、プロトコルまたはプロトコル合成に準拠する型を定義します。

不透明型は、関数またはサブスクリプトの戻り値の型、またはプロパティの型として現れます。不透明型は、タプル型やジェネリック型の一部として現れることはできません（たとえば、配列の要素型やオプショナルのラップ型など）。

不透明型は次の形式を持ちます：

```swift
some <#constraint#>
```

制約はクラス型、プロトコル型、プロトコル合成型、または`Any`です。値は、リストされたプロトコルまたはプロトコル合成に準拠するか、リストされたクラスを継承する型のインスタンスである場合にのみ、不透明型のインスタンスとして使用できます。不透明な値とやり取りするコードは、その制約によって定義されたインターフェースの一部としてのみ値を使用できます。

コンパイル時に、不透明型の値は特定の具体的な型を持ち、Swiftはその基になる型を最適化に使用できます。ただし、不透明型はその基になる型に関する情報が越えられない境界を形成します。

プロトコル宣言には不透明型を含めることはできません。クラスは非finalメソッドの戻り値の型として不透明型を使用することはできません。

不透明型を戻り値の型として使用する関数は、単一の基になる型を共有する値を返す必要があります。戻り値の型には、関数のジェネリック型パラメータの一部である型を含めることができます。たとえば、`someFunction<T>()`という関数は、型`T`または`Dictionary<String, T>`の値を返すことができます。

### 不透明型の文法

```ebnf
opaque-type → some type
```

## ボックス化プロトコル型

ボックス化プロトコル型は、プログラムの実行中に準拠する型が変わる可能性があるプロトコルまたはプロトコル合成に準拠する型を定義します。

ボックス化プロトコル型は次の形式を持ちます：

```swift
any <#constraint#>
```

制約はプロトコル型、プロトコル合成型、プロトコル型のメタタイプ、またはプロトコル合成型のメタタイプです。

実行時に、ボックス化プロトコル型のインスタンスには、制約を満たす任意の型の値を含めることができます。この動作は、不透明型の動作とは対照的であり、不透明型ではコンパイル時に特定の準拠する型が知られています。ボックス化プロトコル型を使用する場合の追加の間接レベルはボクシングと呼ばれます。ボクシングには通常、ストレージのための別のメモリアロケーションとアクセスのための追加の間接レベルが必要であり、実行時にパフォーマンスコストが発生します。

`Any`または`AnyObject`型に`any`を適用しても効果はありません。これらの型はすでにボックス化プロトコル型だからです。

### ボックス化プロトコル型の文法

```ebnf
boxed-protocol-type → any type
```

## メタタイプ型

メタタイプ型は、クラス型、構造体型、列挙型、およびプロトコル型を含む任意の型の型を指します。

クラス、構造体、または列挙型のメタタイプは、その型の名前に`.Type`を付けたものです。プロトコル型のメタタイプ（実行時にプロトコルに準拠する具体的な型ではない）は、そのプロトコルの名前に`.Protocol`を付けたものです。たとえば、クラス型`SomeClass`のメタタイプは`SomeClass.Type`であり、プロトコル`SomeProtocol`のメタタイプは`SomeProtocol.Protocol`です。

後置`self`式を使用して、型を値としてアクセスできます。たとえば、`SomeClass.self`は`SomeClass`自体を返し、`SomeClass`のインスタンスではありません。同様に、`SomeProtocol.self`は`SomeProtocol`自体を返し、実行時に`SomeProtocol`に準拠する型のインスタンスではありません。次の例に示すように、`type(of:)`関数をインスタンスに対して呼び出して、そのインスタンスの動的な実行時型を値としてアクセスできます：

```swift
class SomeBaseClass {
    class func printClassName() {
        print("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        print("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// someInstanceのコンパイル時の型はSomeBaseClassであり、
// someInstanceの実行時の型はSomeSubClassです
type(of: someInstance).printClassName()
// "SomeSubClass"と表示されます
```

詳細については、Swift標準ライブラリの`type(of:)`を参照してください。

初期化式を使用して、その型のメタタイプ値から型のインスタンスを構築します。クラスインスタンスの場合、呼び出される初期化子は`required`キーワードでマークされているか、クラス全体が`final`キーワードでマークされている必要があります。

```swift
class AnotherSubClass: SomeBaseClass {
    let string: String
    required init(string: String) {
        self.string = string
    }
    override class func printClassName() {
        print("AnotherSubClass")
    }
}
let metatype: AnotherSubClass.Type = AnotherSubClass.self
let anotherInstance = metatype.init(string: "some string")
```

### メタタイプ型の文法

```ebnf
metatype-type → type . Type | type . Protocol
```

## Any型

`Any`型は他のすべての型の値を含むことができます。`Any`は次のいずれかの型のインスタンスの具体的な型として使用できます。
- クラス、構造体、または列挙型
- メタタイプ、例えば `Int.self`
- 任意の型のコンポーネントを持つタプル
- クロージャまたは関数型

```swift
let mixed: [Any] = ["one", 2, true, (4, 5.3), { () -> Int in return 6 }]
```

インスタンスの具体的な型として `Any` を使用する場合、プロパティやメソッドにアクセスする前にインスタンスを既知の型にキャストする必要があります。具体的な型が `Any` のインスタンスは元の動的型を保持し、`as`、`as?`、または `as!` のいずれかの型キャスト演算子を使用してその型にキャストできます。例えば、次のように `as?` を使用して異種配列の最初のオブジェクトを `String` に条件付きダウンキャストします。

```swift
if let first = mixed.first as? String {
    print("最初のアイテム '\(first)' は文字列です。")
}
// "最初のアイテム 'one' は文字列です。" と出力されます。
```

キャストの詳細については、[型キャスト](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html)を参照してください。

`AnyObject` プロトコルは `Any` 型に似ています。すべてのクラスは暗黙的に `AnyObject` に準拠します。言語によって定義される `Any` とは異なり、`AnyObject` は Swift 標準ライブラリによって定義されています。詳細については、[クラス専用プロトコルと AnyObject](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html#ID276)を参照してください。

### Any型の文法

```ebnf
any-type → Any
```

## Self型

`Self` 型は特定の型ではなく、現在の型を繰り返したりその型の名前を知ることなく便利に参照するためのものです。

プロトコル宣言またはプロトコルメンバー宣言では、`Self` 型はプロトコルに準拠する最終的な型を指します。

構造体、クラス、または列挙型の宣言では、`Self` 型は宣言によって導入された型を指します。型のメンバーの宣言内では、`Self` 型はその型を指します。クラス宣言のメンバー内では、`Self` は次のようにのみ現れることができます。
- メソッドの戻り値の型として
- 読み取り専用サブスクリプトの戻り値の型として
- 読み取り専用計算プロパティの型として
- メソッドの本体内で

例えば、以下のコードは戻り値の型が `Self` であるインスタンスメソッド `f` を示しています。

```swift
class Superclass {
    func f() -> Self { return self }
}
let x = Superclass()
print(type(of: x.f()))
// "Superclass" と出力されます。

class Subclass: Superclass { }
let y = Subclass()
print(type(of: y.f()))
// "Subclass" と出力されます。

let z: Superclass = Subclass()
print(type(of: z.f()))
// "Subclass" と出力されます。
```

上記の例の最後の部分は、`Self` が変数自体のコンパイル時の型 `Superclass` ではなく、`z` の値の実行時の型 `Subclass` を指していることを示しています。

ネストされた型宣言の内部では、`Self` 型は最も内側の型宣言によって導入された型を指します。

`Self` 型は Swift 標準ライブラリの `type(of:)` 関数と同じ型を指します。現在の型のメンバーにアクセスするために `Self.someStaticMember` と書くことは、`type(of: self).someStaticMember` と書くことと同じです。

### Self型の文法

```ebnf
self-type → Self
```

## 型継承句

型継承句は、名前付き型が継承するクラスと、名前付き型が準拠するプロトコルを指定するために使用されます。型継承句はコロン（`:`）で始まり、その後に型識別子のリストが続きます。

クラス型は単一のスーパークラスから継承し、任意の数のプロトコルに準拠することができます。クラスを定義する場合、スーパークラスの名前は型識別子のリストの最初に表示され、その後にクラスが準拠する必要がある任意の数のプロトコルが続きます。クラスが他のクラスから継承しない場合、リストはプロトコルから始めることができます。クラス継承の詳細な説明といくつかの例については、[継承](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)を参照してください。

他の名前付き型は、プロトコルのリストからのみ継承または準拠することができます。プロトコル型は他のプロトコルから任意の数だけ継承することができます。プロトコル型が他のプロトコルから継承する場合、それらの他のプロトコルからの要件のセットが集約され、現在のプロトコルから継承する任意の型はそれらのすべての要件に準拠する必要があります。

列挙型定義の型継承句は、プロトコルのリストか、列挙型のケースに生の値を割り当てる場合は、それらの生の値の型を指定する単一の名前付き型のいずれかです。生の値の型を指定するために型継承句を使用する列挙型定義の例については、[生の値](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html#ID149)を参照してください。

### 型継承句の文法

```ebnf
type-inheritance-clause → : type-inheritance-list
type-inheritance-list → attributes? type-identifier | attributes? type-identifier , type-inheritance-list
```

## 型推論

Swiftは型推論を広範に使用しており、コード内の多くの変数や式の型や型の一部を省略することができます。例えば、`var x: Int = 0` と書く代わりに、`var x = 0` と書くことができ、型を完全に省略できます。コンパイラは `x` が `Int` 型の値を指すことを正しく推論します。同様に、完全な型が文脈から推論できる場合、型の一部を省略することができます。例えば、`let dict: Dictionary = ["A": 1]` と書くと、コンパイラは `dict` が `Dictionary<String, Int>` 型であることを推論します。

上記の例では、型情報は式ツリーの葉からその根に向かって伝播されます。つまり、`var x: Int = 0` の `x` の型は、まず `0` の型をチェックし、その後この型情報を根（変数 `x`）に伝播することで推論されます。

Swiftでは、型情報は逆方向、つまり根から葉に向かっても伝播することができます。例えば、次の例では、定数 `eFloat` に対する明示的な型注釈（`: Float`）が数値リテラル `2.71828` の型を `Double` ではなく `Float` に推論させます。

```swift
let e = 2.71828 // eの型はDoubleと推論されます。
let eFloat: Float = 2.71828 // eFloatの型はFloatです。
```

Swiftの型推論は単一の式または文のレベルで動作します。これは、式内の省略された型や型の一部を推論するために必要なすべての情報が、式またはその部分式の型チェックからアクセス可能でなければならないことを意味します。