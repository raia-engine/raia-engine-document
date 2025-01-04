# ジェネリクス

複数の型に対して機能するコードを書き、その型に対する要件を指定します。

ジェネリックコードを使用すると、柔軟で再利用可能な関数や型を作成でき、定義した要件に従って任意の型で動作させることができます。コードの重複を避け、意図を明確に抽象化して表現することができます。

ジェネリクスはSwiftの最も強力な機能の一つであり、Swift標準ライブラリの多くはジェネリックコードで構築されています。実際、言語ガイド全体でジェネリクスを使用してきましたが、それに気づいていなかったかもしれません。例えば、Swiftの`Array`や`Dictionary`型はどちらもジェネリックコレクションです。`Int`値を保持する配列や、`String`値を保持する配列、あるいはSwiftで作成できる他の任意の型の配列を作成できます。同様に、指定された任意の型の値を格納する辞書を作成することもでき、その型に制限はありません。

## ジェネリクスが解決する問題

ここに、2つの`Int`値を交換する標準的な非ジェネリック関数`swapTwoInts(_:_:),`があります：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

この関数は、インアウトパラメータを使用して`a`と`b`の値を交換します。

`swapTwoInts(_:_:)`関数は、元の`b`の値を`a`に、元の`a`の値を`b`に交換します。この関数を呼び出して、2つの`Int`変数の値を交換できます：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// "someInt is now 107, and anotherInt is now 3"と表示されます
```

`swapTwoInts(_:_:)`関数は便利ですが、`Int`値にしか使用できません。2つの`String`値や2つの`Double`値を交換したい場合は、以下のように`swapTwoStrings(_:_:)`や`swapTwoDoubles(_:_:)`関数を作成する必要があります：

```swift
func swapTwoStrings(_ a: inout String, _ b: inout String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

func swapTwoDoubles(_ a: inout Double, _ b: inout Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoInts(_:_:),` `swapTwoStrings(_:_:),`および`swapTwoDoubles(_:_:)`関数の本体が同一であることに気づいたかもしれません。唯一の違いは、受け入れる値の型（`Int`、`String`、および`Double`）です。

より便利で柔軟なのは、任意の型の2つの値を交換する単一の関数を書くことです。ジェネリックコードを使用すると、そのような関数を書くことができます。（これらの関数のジェネリックバージョンは以下で定義されています。）

> **注:**  
> 3つの関数すべてで、`a`と`b`の型は同じでなければなりません。`a`と`b`が同じ型でない場合、その値を交換することはできません。Swiftは型安全な言語であり、（例えば）`String`型の変数と`Double`型の変数が互いに値を交換することを許可しません。これを試みると、コンパイル時エラーが発生します。

## ジェネリック関数

ジェネリック関数は任意の型で動作できます。以下は、上記の`swapTwoInts(_:_:)`関数のジェネリックバージョンで、`swapTwoValues(_:_:):`と呼ばれます：

```swift
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoValues(_:_:)`関数の本体は`swapTwoInts(_:_:)`関数の本体と同一です。ただし、`swapTwoValues(_:_:)`の最初の行は`swapTwoInts(_:_:)`の最初の行とは少し異なります。以下は最初の行の比較です：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int)
func swapTwoValues<T>(_ a: inout T, _ b: inout T)
```

関数のジェネリックバージョンは、実際の型名（`Int`、`String`、`Double`など）の代わりにプレースホルダー型名（この場合は`T`）を使用します。プレースホルダー型名は`T`が何であるかを示していませんが、`a`と`b`の両方が同じ型`T`でなければならないことを示しています。`T`の実際の型は、`swapTwoValues(_:_:)`関数が呼び出されるたびに決定されます。

ジェネリック関数と非ジェネリック関数のもう一つの違いは、ジェネリック関数の名前（`swapTwoValues(_:_:))`の後に角括弧（`<T>`）内にプレースホルダー型名（`T`）が続くことです。角括弧は、`T`が`swapTwoValues(_:_:)`関数定義内のプレースホルダー型名であることをSwiftに伝えます。`T`がプレースホルダーであるため、Swiftは実際の型`T`を探しません。

`swapTwoValues(_:_:)`関数は、`swapTwoInts`と同じ方法で呼び出すことができますが、両方の値が同じ型である限り、任意の型の2つの値を渡すことができます。`swapTwoValues(_:_:)`が呼び出されるたびに、`T`に使用する型は渡された値の型から推論されます。

以下の2つの例では、`T`はそれぞれ`Int`と`String`と推論されます：

```swift
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
// someIntは現在107で、anotherIntは現在3です

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
// someStringは現在"world"で、anotherStringは現在"hello"です
```

> **注:**  
> 上記の`swapTwoValues(_:_:)`関数は、Swift標準ライブラリの一部であり、アプリで自動的に使用できるジェネリック関数`swap`に触発されています。独自のコードで`swapTwoValues(_:_:)`関数の動作が必要な場合は、独自の実装を提供する代わりにSwiftの既存の`swap(_:_:)`関数を使用できます。

## 型パラメータ

上記の`swapTwoValues(_:_:)`の例では、プレースホルダー型`T`は型パラメータの一例です。型パラメータはプレースホルダー型を指定して名前を付け、関数名の直後に一致する角括弧のペア（`<T>`など）の間に書かれます。

型パラメータを指定すると、それを使用して関数のパラメータの型（`swapTwoValues(_:_:)`関数の`a`および`b`パラメータなど）を定義したり、関数の戻り値の型として使用したり、関数本体内の型注釈として使用したりできます。いずれの場合も、関数が呼び出されるたびに型パラメータは実際の型に置き換えられます。（上記の`swapTwoValues(_:_:)`の例では、最初に関数が呼び出されたときに`T`は`Int`に置き換えられ、2回目に呼び出されたときには`String`に置き換えられました。）

角括弧内に複数の型パラメータ名をカンマで区切って記述することで、複数の型パラメータを指定できます。

## 型パラメータの命名

ほとんどの場合、型パラメータには`Dictionary<Key, Value>`の`Key`や`Value`、`Array<Element>`の`Element`のように、型パラメータとそれが使用されるジェネリック型や関数との関係を読者に伝える説明的な名前が付けられます。しかし、それらの間に意味のある関係がない場合は、`swapTwoValues(_:_:)`関数の`T`のように、`T`、`U`、`V`などの単一の文字を使用して命名するのが伝統的です。

> **注:**  
> 型パラメータが値ではなく型のプレースホルダーであることを示すために、常に型パラメータにはアッパーキャメルケースの名前（`T`や`MyTypeParameter`など）を付けてください。

## ジェネリック型

ジェネリック関数に加えて、Swiftでは独自のジェネリック型を定義することもできます。これらは、`Array`や`Dictionary`と同様に、任意の型で動作するカスタムクラス、構造体、および列挙型です。

このセクションでは、`Stack`と呼ばれるジェネリックコレクション型の書き方を紹介します。スタックは配列に似た値の順序付きセットですが、Swiftの`Array`型よりも操作が制限されています。配列は新しい項目を配列の任意の場所に挿入および削除できますが、スタックは新しい項目をコレクションの末尾にのみ追加できます（スタックに新しい値をプッシュすることとして知られています）。同様に、スタックはコレクションの末尾からのみ項目を削除できます（スタックから値をポップすることとして知られています）。

> **注:**  
> スタックの概念は、`UINavigationController`クラスによって、そのナビゲーション階層内のビューコントローラをモデル化するために使用されます。`UINavigationController`クラスの`pushViewController(_:animated:)`メソッドを呼び出してビューコントローラをナビゲーションスタックに追加（またはプッシュ）し、`popViewControllerAnimated(_:)`メソッドを使用してビューコントローラをナビゲーションスタックから削除（またはポップ）します。スタックは、コレクションを管理する際に厳密な「後入れ先出し」アプローチが必要な場合に便利なコレクションモデルです。

以下の図は、スタックのプッシュおよびポップの動作を示しています：

- 現在、スタックには3つの値があります。
- 4番目の値がスタックの上にプッシュされます。
- スタックには現在4つの値があり、最新のものが一番上にあります。
- スタックの一番上の項目がポップされます。
- 値をポップした後、スタックには再び3つの値が残ります。

ここでは、`Int`値のスタックの場合の非ジェネリックバージョンのスタックの書き方を示します：

```swift
struct IntStack {
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
}
```

この構造体は、スタック内の値を格納するために`items`と呼ばれる`Array`プロパティを使用しています。`Stack`は、スタックに値をプッシュおよびポップするための2つのメソッド、`push`と`pop`を提供します。これらのメソッドは、構造体の`items`配列を変更（または変異）する必要があるため、mutatingとしてマークされています。

上記の`IntStack`型は`Int`値にのみ使用できますが、任意の型の値を管理できるジェネリックな`Stack`構造体を定義する方がはるかに便利です。

以下は、同じコードのジェネリックバージョンです：

```swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
```

ジェネリックバージョンの`Stack`は、実際の`Int`型の代わりに`Element`と呼ばれる型パラメータを使用している点を除いて、本質的に非ジェネリックバージョンと同じです。この型パラメータは、構造体の名前の直後に角括弧（`<Element>`）で囲んで記述されます。

`Element`は、後で提供される型のプレースホルダー名を定義します。この将来の型は、構造体の定義内の任意の場所で`Element`として参照できます。この場合、`Element`は次の3つの場所でプレースホルダーとして使用されます：

- `Element`型の値の空の配列で初期化される`items`というプロパティを作成するため
- `Element`型でなければならない`item`という単一のパラメータを持つ`push(_:)`メソッドを指定するため
- `pop()`メソッドによって返される値が`Element`型の値であることを指定するため

ジェネリック型であるため、`Stack`は`Array`や`Dictionary`と同様に、Swiftの任意の有効な型のスタックを作成するために使用できます。

スタックに格納する型を角括弧内に記述することで、新しい`Stack`インスタンスを作成します。たとえば、文字列の新しいスタックを作成するには、`Stack<String>()`と記述します：

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
// スタックには現在4つの文字列が含まれています
```

これらの4つの値をスタックにプッシュした後の`stackOfStrings`の様子は次のとおりです：

スタックから値をポップすると、トップの値`"cuatro"`が削除されて返されます：

```swift
let fromTheTop = stackOfStrings.pop()
// fromTheTopは"cuatro"と等しく、スタックには現在3つの文字列が含まれています
```

トップの値をポップした後のスタックの様子は次のとおりです：

## ジェネリック型の拡張

ジェネリック型を拡張する場合、拡張の定義の一部として型パラメータリストを提供しません。代わりに、元の型定義からの型パラメータリストが拡張の本体内で利用可能であり、元の型パラメータ名を使用して元の定義からの型パラメータを参照します。

次の例では、ジェネリックな`Stack`型を拡張して、スタックのトップ項目をポップせずに返す読み取り専用の計算プロパティ`topItem`を追加しています：

```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
```

`topItem`プロパティは、`Element`型のオプショナル値を返します。スタックが空の場合、`topItem`は`nil`を返し、スタックが空でない場合、`topItem`は`items`配列の最後の項目を返します。

この拡張は型パラメータリストを定義していないことに注意してください。代わりに、`Stack`型の既存の型パラメータ名`Element`が拡張内で使用され、`topItem`計算プロパティのオプショナル型を示しています。

`topItem`計算プロパティは、任意の`Stack`インスタンスで使用して、項目を削除せずにそのトップ項目にアクセスしてクエリを実行できます。

```swift
if let topItem = stackOfStrings.topItem {
    print("スタックのトップ項目は\(topItem)です。")
}
// "スタックのトップ項目はtresです。"と表示されます。
```

ジェネリック型の拡張には、拡張された型のインスタンスが新しい機能を得るために満たさなければならない要件を含めることもできます。詳細は、以下の「ジェネリックWhere句を使用した拡張」で説明します。

## 型制約

`swapTwoValues(_:_:)` 関数と `Stack` 型は任意の型で動作します。しかし、ジェネリック関数やジェネリック型で使用できる型に特定の型制約を課すことが有用な場合があります。型制約は、型パラメータが特定のクラスを継承するか、特定のプロトコルまたはプロトコルの組み合わせに準拠する必要があることを指定します。

例えば、Swift の `Dictionary` 型は、辞書のキーとして使用できる型に制限を設けています。辞書について説明したように、辞書のキーの型はハッシュ可能でなければなりません。つまり、自分自身を一意に表現する方法を提供する必要があります。`Dictionary` はキーがハッシュ可能である必要があるため、特定のキーに対して既に値が含まれているかどうかを確認できます。この要件がなければ、`Dictionary` は特定のキーに対して値を挿入するか置き換えるかを判断できず、既に辞書に含まれている特定のキーの値を見つけることもできません。

この要件は、`Dictionary` のキー型に対する型制約によって強制されており、キー型が Swift 標準ライブラリで定義された特別なプロトコルである `Hashable` プロトコルに準拠する必要があることを指定しています。Swift の基本型（`String`、`Int`、`Double`、`Bool` など）はすべてデフォルトでハッシュ可能です。独自のカスタム型を `Hashable` プロトコルに準拠させる方法については、`Hashable` プロトコルへの準拠を参照してください。

カスタムジェネリック型を作成する際に独自の型制約を定義することができ、これらの制約がジェネリックプログラミングの多くの力を提供します。`Hashable` のような抽象的な概念は、具体的な型ではなく、概念的な特性に基づいて型を特徴付けます。

### 型制約の構文

型パラメータリストの一部として、型パラメータの名前の後にコロンで区切って単一のクラスまたはプロトコル制約を配置することで、型制約を記述します。ジェネリック関数の型制約の基本構文は以下の通りです（ジェネリック型の場合も同じ構文です）：

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // 関数の本体がここに入ります
}
```

上記の仮想関数には2つの型パラメータがあります。最初の型パラメータ `T` には `T` が `SomeClass` のサブクラスであることを要求する型制約があります。2番目の型パラメータ `U` には `U` が `SomeProtocol` プロトコルに準拠することを要求する型制約があります。

### 型制約の実際の使用例

ここに `findIndex(ofString:in:)` という非ジェネリック関数があります。この関数は、見つけるべき `String` 値と、その中で見つけるべき `String` 値の配列を受け取ります。`findIndex(ofString:in:)` 関数はオプショナルな `Int` 値を返します。これは、配列内で最初に一致する文字列のインデックスが見つかった場合、そのインデックスを返し、見つからなかった場合は `nil` を返します：

```swift
func findIndex(ofString valueToFind: String, in array: [String]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

`findIndex(ofString:in:)` 関数は、文字列の配列内で文字列値を見つけるために使用できます：

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
if let foundIndex = findIndex(ofString: "llama", in: strings) {
    print("llama のインデックスは \(foundIndex) です")
}
// "llama のインデックスは 2 です" と出力されます
```

配列内の値のインデックスを見つけるという原則は、文字列に限らず有用です。文字列の代わりに任意の型 `T` の値を使用することで、同じ機能をジェネリック関数として記述できます。

次に、`findIndex(ofString:in:)` のジェネリックバージョンである `findIndex(of:in:)` がどのように記述されるかを示します。この関数の戻り値の型は依然として `Int?` です。これは、関数が配列からのオプショナルな値ではなく、オプショナルなインデックス番号を返すためです。ただし、この関数は以下の例で説明する理由によりコンパイルされません：

```swift
func findIndex<T>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

この関数は上記のように記述するとコンパイルされません。問題は等価性チェック「if value == valueToFind」にあります。Swift のすべての型が等価演算子（==）で比較できるわけではありません。例えば、複雑なデータモデルを表す独自のクラスや構造体を作成する場合、そのクラスや構造体に対する「等しい」の意味は Swift が推測できるものではありません。このため、このコードがすべての可能な型 `T` に対して動作することを保証することはできず、コードをコンパイルしようとすると適切なエラーが報告されます。

しかし、すべてが失われたわけではありません。Swift 標準ライブラリには `Equatable` というプロトコルが定義されており、このプロトコルに準拠する任意の型は、等価演算子（==）および非等価演算子（!=）を実装してその型の任意の2つの値を比較する必要があります。Swift の標準型はすべて自動的に `Equatable` プロトコルをサポートしています。

`Equatable` である任意の型は、等価演算子をサポートすることが保証されているため、`findIndex(of:in:)` 関数で安全に使用できます。この事実を表現するために、関数を定義する際に型パラメータの定義の一部として `Equatable` の型制約を記述します：

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

`findIndex(of:in:)` の単一の型パラメータは `T: Equatable` として記述されており、これは「`Equatable` プロトコルに準拠する任意の型 `T`」を意味します。

`findIndex(of:in:)` 関数は現在正常にコンパイルされ、`Equatable` である任意の型（例えば `Double` や `String`）で使用できます：

```swift
let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25])
// doubleIndex はオプショナルな Int で、値はありません。なぜなら 9.3 は配列に含まれていないからです
let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"])
// stringIndex はオプショナルな Int で、値は 2 です
```

## 関連型

プロトコルを定義する際に、プロトコルの定義の一部として1つ以上の関連型を宣言することが有用な場合があります。関連型は、プロトコルの一部として使用される型にプレースホルダー名を与えます。その関連型に使用する実際の型は、プロトコルが採用されるまで指定されません。関連型は `associatedtype` キーワードで指定されます。

### 実際の関連型

ここに `Container` というプロトコルの例があります。このプロトコルは `Item` という関連型を宣言しています：

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

`Container` プロトコルは、任意のコンテナが提供しなければならない3つの必須機能を定義しています：

- `append(_:)` メソッドで新しいアイテムをコンテナに追加できる必要があります。
- `count` プロパティを通じてコンテナ内のアイテムの数を `Int` 値として取得できる必要があります。
- `Int` インデックス値を取るサブスクリプトでコンテナ内の各アイテムを取得できる必要があります。

このプロトコルは、コンテナ内のアイテムがどのように保存されるべきか、またはどの型が許可されるべきかを指定していません。プロトコルは、任意の型が `Container` と見なされるために提供しなければならない3つの機能のみを指定しています。準拠する型は、これら3つの要件を満たす限り、追加の機能を提供することができます。

`Container` プロトコルに準拠する任意の型は、格納する値の型を指定できる必要があります。具体的には、コンテナに追加されるアイテムが正しい型であることを保証し、サブスクリプトによって返されるアイテムの型が明確である必要があります。

これらの要件を定義するために、`Container` プロトコルは、特定のコンテナの型が何であるかを知らなくても、コンテナが保持する要素の型を参照する方法を必要とします。`Container` プロトコルは、`append(_:)` メソッドに渡される任意の値がコンテナの要素型と同じ型である必要があり、サブスクリプトによって返される値がコンテナの要素型と同じ型であることを指定する必要があります。

これを実現するために、`Container` プロトコルは `Item` という関連型を宣言します。これは `associatedtype Item` として書かれます。プロトコルは `Item` が何であるかを定義していません。その情報は準拠する任意の型に任されています。それにもかかわらず、`Item` エイリアスは `Container` 内のアイテムの型を参照する方法を提供し、`append(_:)` メソッドおよびサブスクリプトで使用する型を定義して、任意の `Container` の期待される動作を保証します。

ここに、上記のジェネリック型からの非ジェネリックな `IntStack` 型のバージョンがあります。これは `Container` プロトコルに準拠するように適応されています：

```swift
struct IntStack: Container {
    // 元の IntStack 実装
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // Container プロトコルへの準拠
    typealias Item = Int
    mutating func append(_ item: Int) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```

`IntStack` 型は `Container` プロトコルの3つの要件すべてを実装しており、各ケースで `IntStack` 型の既存の機能の一部をラップしてこれらの要件を満たしています。

さらに、`IntStack` は、この `Container` の実装に適した `Item` が `Int` 型であることを指定しています。`typealias Item = Int` の定義は、抽象的な `Item` 型をこの `Container` プロトコルの実装に対して具体的な `Int` 型に変えます。

Swift の型推論のおかげで、実際には `IntStack` の定義の一部として具体的な `Item` を `Int` として宣言する必要はありません。`IntStack` が `Container` プロトコルのすべての要件を満たしているため、Swift は `append(_:)` メソッドの `item` パラメータの型とサブスクリプトの戻り値の型を見て、適切な `Item` を推論できます。実際、上記のコードから `typealias Item = Int` 行を削除しても、すべてが機能します。なぜなら、`Item` に使用すべき型が明確だからです。

ジェネリックな `Stack` 型も `Container` プロトコルに準拠させることができます：

```swift
struct Stack<Element>: Container {
    // 元の Stack<Element> 実装
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
    // Container プロトコルへの準拠
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Element {
        return items[i]
    }
}
```

この場合、型パラメータ `Element` が `append(_:)` メソッドの `item` パラメータの型およびサブスクリプトの戻り値の型として使用されます。したがって、Swift は `Element` がこの特定のコンテナに対して使用すべき適切な `Item` であると推論できます。

### 既存の型を拡張して関連型を指定する

既存の型を拡張してプロトコルに準拠させることができます。これは、拡張によるプロトコル準拠の追加で説明されています。これには、関連型を持つプロトコルも含まれます。

Swift の `Array` 型はすでに `append(_:)` メソッド、`count` プロパティ、およびその要素を取得するための `Int` インデックスを持つサブスクリプトを提供しています。これらの3つの機能は `Container` プロトコルの要件と一致しています。つまり、`Array` がプロトコルを採用することを宣言するだけで `Container` プロトコルに準拠させることができます。これは、拡張によるプロトコル採用の宣言で説明されているように、空の拡張で行います：

```swift
extension Array: Container {}
```

`Array` の既存の `append(_:)` メソッドとサブスクリプトにより、Swift は `Item` に使用すべき適切な型を推論できます。これは、上記のジェネリックな `Stack` 型と同様です。この拡張を定義した後、任意の `Array` を `Container` として使用できます。

### 関連型に制約を追加する

プロトコルの関連型に型制約を追加して、準拠する型がその制約を満たすように要求することができます。例えば、次のコードは、コンテナ内のアイテムが等価であることを要求する `Container` のバージョンを定義しています。

```swift
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

このバージョンの `Container` に準拠するには、コンテナの `Item` 型が `Equatable` プロトコルに準拠している必要があります。

### 関連型の制約にプロトコルを使用する

プロトコルは、その要件の一部として現れることがあります。例えば、`Container` プロトコルを拡張し、`suffix(_:)` メソッドの要件を追加するプロトコルがあります。`suffix(_:)` メソッドは、コンテナの末尾から指定された数の要素を返し、それらを `Suffix` 型のインスタンスに格納します。

```swift
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
}
```

このプロトコルでは、`Suffix` は `Container` の例の `Item` 型のように関連型です。`Suffix` には2つの制約があります。`SuffixableContainer` プロトコル（現在定義されているプロトコル）に準拠していることと、その `Item` 型がコンテナの `Item` 型と同じであることです。`Item` の制約は、以下で説明するジェネリック where 句を使用した関連型の制約です。

以下は、ジェネリック型の上記の `Stack` 型に `SuffixableContainer` プロトコルへの準拠を追加する拡張です。

```swift
extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack {
        var result = Stack()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Suffix が Stack であると推論されます。
}
var stackOfInts = Stack<Int>()
stackOfInts.append(10)
stackOfInts.append(20)
stackOfInts.append(30)
let suffix = stackOfInts.suffix(2)
// suffix には 20 と 30 が含まれます
```

上記の例では、`Stack` の `Suffix` 関連型も `Stack` であるため、`Stack` 上の `suffix` 操作は別の `Stack` を返します。代わりに、`SuffixableContainer` に準拠する型は、自身とは異なる `Suffix` 型を持つことができ、つまり `suffix` 操作が異なる型を返すことができます。例えば、`IntStack` 型に `SuffixableContainer` 準拠を追加し、`IntStack` の代わりに `Stack<Int>` を `suffix` 型として使用する拡張があります。

```swift
extension IntStack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Int> {
        var result = Stack<Int>()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Suffix が Stack<Int> であると推論されます。
}
```

## ジェネリック where 句

型制約は、型制約で説明されているように、ジェネリック関数、サブスクリプト、または型に関連する型パラメータに対する要件を定義することを可能にします。

関連型に対する要件を定義することも有用です。これを行うには、ジェネリック where 句を定義します。ジェネリック where 句を使用すると、関連型が特定のプロトコルに準拠する必要があることや、特定の型パラメータと関連型が同じである必要があることを要求できます。ジェネリック where 句は `where` キーワードで始まり、関連型や型と関連型の間の等価関係の制約が続きます。ジェネリック where 句は、型や関数の本体の開き中括弧の直前に書きます。

以下の例は、`allItemsMatch` というジェネリック関数を定義しています。この関数は、2つの `Container` インスタンスが同じ順序で同じアイテムを含んでいるかどうかを確認します。この関数は、すべてのアイテムが一致する場合は `true` を返し、一致しない場合は `false` を返します。

チェックされる2つのコンテナは、同じ種類のコンテナである必要はありません（ただし、同じ種類であっても構いません）が、同じ種類のアイテムを保持している必要があります。この要件は、型制約とジェネリック where 句の組み合わせによって表現されます。

```swift
func allItemsMatch<C1: Container, C2: Container>
        (_ someContainer: C1, _ anotherContainer: C2) -> Bool
        where C1.Item == C2.Item, C1.Item: Equatable {

    // 両方のコンテナが同じ数のアイテムを含んでいることを確認します。
    if someContainer.count != anotherContainer.count {
        return false
    }

    // 各アイテムのペアが等価であるかどうかを確認します。
    for i in 0..<someContainer.count {
        if someContainer[i] != anotherContainer[i] {
            return false
        }
    }

    // すべてのアイテムが一致するため、true を返します。
    return true
}
```

この関数は、`someContainer` と `anotherContainer` という2つの引数を取ります。`someContainer` 引数は `C1` 型であり、`anotherContainer` 引数は `C2` 型です。`C1` と `C2` は、関数が呼び出されたときに決定される2つのコンテナ型の型パラメータです。

関数の2つの型パラメータには、次の要件が課されています。

- `C1` は `Container` プロトコルに準拠している必要があります（`C1: Container` と書かれています）。
- `C2` も `Container` プロトコルに準拠している必要があります（`C2: Container` と書かれています）。
- `C1` の `Item` は `C2` の `Item` と同じである必要があります（`C1.Item == C2.Item` と書かれています）。
- `C1` の `Item` は `Equatable` プロトコルに準拠している必要があります（`C1.Item: Equatable` と書かれています）。

最初と2番目の要件は関数の型パラメータリストで定義されており、3番目と4番目の要件は関数のジェネリック where 句で定義されています。

これらの要件は次のことを意味します：

- `someContainer` は `C1` 型のコンテナです。
- `anotherContainer` は `C2` 型のコンテナです。
- `someContainer` と `anotherContainer` は同じ種類のアイテムを含んでいます。
- `someContainer` のアイテムは、等しくない演算子（!=）を使用して互いに異なるかどうかを確認できます。

3番目と4番目の要件は組み合わさって、`anotherContainer` のアイテムも != 演算子を使用して確認できることを意味します。なぜなら、それらは `someContainer` のアイテムとまったく同じ種類だからです。

これらの要件により、`allItemsMatch(_:_:)` 関数は、異なる種類のコンテナであっても、2つのコンテナを比較することができます。

`allItemsMatch(_:_:)` 関数は、まず両方のコンテナが同じ数のアイテムを含んでいることを確認します。異なる数のアイテムを含んでいる場合、それらが一致することはないため、関数は `false` を返します。

このチェックを行った後、関数は `for-in` ループと半開範囲演算子（`..<`）を使用して `someContainer` のすべてのアイテムを反復処理します。各アイテムについて、`someContainer` のアイテムが `anotherContainer` の対応するアイテムと等しくないかどうかを確認します。2つのアイテムが等しくない場合、2つのコンテナは一致しないため、関数は `false` を返します。

ループが不一致を見つけずに終了した場合、2つのコンテナは一致し、関数は `true` を返します。

以下は、`allItemsMatch(_:_:)` 関数の動作例です。

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")

var arrayOfStrings = ["uno", "dos", "tres"]

if allItemsMatch(stackOfStrings, arrayOfStrings) {
    print("すべてのアイテムが一致します。")
} else {
    print("すべてのアイテムが一致しません。")
}
// "すべてのアイテムが一致します。" と表示されます。
```

上記の例では、`Stack` インスタンスを作成して `String` 値を格納し、スタックに3つの文字列をプッシュします。また、同じ3つの文字列を含む配列リテラルで初期化された `Array` インスタンスも作成します。スタックと配列は異なる型ですが、どちらも `Container` プロトコルに準拠しており、同じ種類の値を含んでいます。したがって、これら2つのコンテナを引数として `allItemsMatch(_:_:)` 関数を呼び出すことができます。上記の例では、`allItemsMatch(_:_:)` 関数は、2つのコンテナ内のすべてのアイテムが一致することを正しく報告します。

## ジェネリックWhere句を使用した拡張

拡張の一部としてジェネリックWhere句を使用することもできます。以下の例では、前の例からジェネリック`Stack`構造体を拡張して`isTop(_:)`メソッドを追加しています。

```swift
extension Stack where Element: Equatable {
    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else {
            return false
        }
        return topItem == item
    }
}
```

この新しい`isTop(_:)`メソッドは、まずスタックが空でないことを確認し、次に与えられたアイテムをスタックの最上部のアイテムと比較します。ジェネリックWhere句を使用せずにこれを行おうとすると問題が発生します。`isTop(_:)`の実装では`==`演算子を使用しますが、`Stack`の定義ではアイテムが等価であることを要求していないため、`==`演算子を使用するとコンパイル時エラーが発生します。ジェネリックWhere句を使用すると、拡張に新しい要件を追加できるため、アイテムが等価である場合にのみ`isTop(_:)`メソッドを追加できます。

以下は、`isTop(_:)`メソッドの使用例です。

```swift
if stackOfStrings.isTop("tres") {
    print("Top element is tres.")
} else {
    print("Top element is something else.")
}
// "Top element is tres."と表示されます。
```

アイテムが等価でないスタックで`isTop(_:)`メソッドを呼び出そうとすると、コンパイル時エラーが発生します。

```swift
struct NotEquatable { }
var notEquatableStack = Stack<NotEquatable>()
let notEquatableValue = NotEquatable()
notEquatableStack.push(notEquatableValue)
notEquatableStack.isTop(notEquatableValue)  // エラー
```

ジェネリックWhere句を使用してプロトコルの拡張を行うこともできます。以下の例では、前の例から`Container`プロトコルを拡張して`startsWith(_:)`メソッドを追加しています。

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}
```

`startsWith(_:)`メソッドは、まずコンテナに少なくとも1つのアイテムがあることを確認し、次にコンテナの最初のアイテムが与えられたアイテムと一致するかどうかを確認します。この新しい`startsWith(_:)`メソッドは、コンテナのアイテムが等価である限り、上記のスタックや配列を含む`Container`プロトコルに準拠する任意の型で使用できます。

```swift
if [9, 9, 9].startsWith(42) {
    print("Starts with 42.")
} else {
    print("Starts with something else.")
}
// "Starts with something else."と表示されます。
```

上記の例のジェネリックWhere句は、`Item`がプロトコルに準拠することを要求していますが、`Item`が特定の型であることを要求するジェネリックWhere句を書くこともできます。例えば：

```swift
extension Container where Item == Double {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += self[index]
        }
        return sum / Double(count)
    }
}
print([1260.0, 1200.0, 98.6, 37.0].average())
// "648.9"と表示されます。
```

この例では、`Item`型が`Double`であるコンテナに`average()`メソッドを追加しています。コンテナ内のアイテムを合計し、コンテナの数で割って平均を計算します。浮動小数点除算を行うために、カウントを`Int`から`Double`に明示的に変換しています。

拡張の一部としてのジェネリックWhere句には、他の場所で書くジェネリックWhere句と同様に、複数の要件を含めることができます。リスト内の各要件をカンマで区切ります。

## コンテキストWhere句

ジェネリック型制約を持たない宣言の一部としてジェネリックWhere句を書くことができます。例えば、ジェネリック型の拡張におけるメソッドやジェネリック型のサブスクリプトにジェネリックWhere句を書くことができます。以下の例では、`Container`構造体がジェネリックであり、これらの新しいメソッドをコンテナで利用可能にするために満たすべき型制約を指定しています。

```swift
extension Container {
    func average() -> Double where Item == Int {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
    func endsWith(_ item: Item) -> Bool where Item: Equatable {
        return count >= 1 && self[count-1] == item
    }
}
let numbers = [1260, 1200, 98, 37]
print(numbers.average())
// "648.75"と表示されます。
print(numbers.endsWith(37))
// "true"と表示されます。
```

この例では、アイテムが整数である場合に`Container`に`average()`メソッドを追加し、アイテムが等価である場合に`endsWith(_:)`メソッドを追加しています。両方の関数には、元の`Container`宣言のジェネリック`Item`型パラメータに型制約を追加するジェネリックWhere句が含まれています。

コンテキストWhere句を使用せずにこのコードを書きたい場合は、各ジェネリックWhere句に対して1つの拡張を作成します。上記の例と以下の例は同じ動作をします。

```swift
extension Container where Item == Int {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
}
extension Container where Item: Equatable {
    func endsWith(_ item: Item) -> Bool {
        return count >= 1 && self[count-1] == item
    }
}
```

コンテキストWhere句を使用したこの例では、`average()`と`endsWith(_:)`の実装は同じ拡張内にあります。各メソッドのジェネリックWhere句が、そのメソッドを利用可能にするために満たすべき要件を示しているためです。これらの要件を拡張のジェネリックWhere句に移動すると、メソッドが同じ状況で利用可能になりますが、要件ごとに1つの拡張が必要になります。

## ジェネリックWhere句を使用した関連型

関連型にジェネリックWhere句を含めることができます。例えば、Swift標準ライブラリの`Sequence`プロトコルのようにイテレータを含む`Container`のバージョンを作成したいとします。以下のように書きます：

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }

    associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
    func makeIterator() -> Iterator
}
```

`Iterator`のジェネリックWhere句は、イテレータがコンテナのアイテムと同じアイテム型を持つ要素を巡回する必要があることを要求しています。`makeIterator()`関数は、コンテナのイテレータへのアクセスを提供します。

他のプロトコルを継承するプロトコルの場合、プロトコル宣言にジェネリックWhere句を含めることで、継承された関連型に制約を追加します。例えば、以下のコードは`Item`が`Comparable`に準拠することを要求する`ComparableContainer`プロトコルを宣言しています：

```swift
protocol ComparableContainer: Container where Item: Comparable { }
```

## ジェネリックサブスクリプト

サブスクリプトはジェネリックにすることができ、ジェネリックWhere句を含めることができます。サブスクリプトの後に山括弧内にプレースホルダー型名を書き、サブスクリプトの本体の開き中括弧の直前にジェネリックWhere句を書きます。例えば：

```swift
extension Container {
    subscript<Indices: Sequence>(indices: Indices) -> [Item]
            where Indices.Iterator.Element == Int {
        var result: [Item] = []
        for index in indices {
            result.append(self[index])
        }
        return result
    }
}
```

この`Container`プロトコルへの拡張は、一連のインデックスを取り、各指定されたインデックスのアイテムを含む配列を返すサブスクリプトを追加します。このジェネリックサブスクリプトには以下の制約があります：

- 山括弧内のジェネリックパラメータ`Indices`は、Swift標準ライブラリの`Sequence`プロトコルに準拠する型でなければなりません。
- サブスクリプトは、`Indices`型のインスタンスである単一のパラメータ`indices`を取ります。
- ジェネリックWhere句は、シーケンスのイテレータが`Int`型の要素を巡回する必要があることを要求しています。これにより、シーケンス内のインデックスがコンテナで使用されるインデックスと同じ型であることが保証されます。

これらの制約を総合すると、`indices`パラメータに渡される値は整数のシーケンスであることを意味します。