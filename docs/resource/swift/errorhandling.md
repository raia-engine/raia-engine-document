# エラーハンドリング

エラーに対応し、回復する。

エラーハンドリングは、プログラム内のエラー条件に対応し、回復するプロセスです。Swiftは、実行時に回復可能なエラーを投げ、キャッチし、伝播し、操作するためのファーストクラスのサポートを提供します。

いくつかの操作は、常に実行を完了したり、有用な出力を生成したりすることが保証されていません。オプショナルは値の欠如を表すために使用されますが、操作が失敗した場合、失敗の原因を理解することが役立つことが多く、コードが適切に対応できるようになります。

例として、ディスク上のファイルからデータを読み取り、処理するタスクを考えてみましょう。このタスクが失敗する方法はいくつかあり、指定されたパスにファイルが存在しない、ファイルに読み取り権限がない、またはファイルが互換性のある形式でエンコードされていないなどがあります。これらの異なる状況を区別することで、プログラムは一部のエラーを解決し、解決できないエラーをユーザーに伝えることができます。

> **注:**  
> Swiftのエラーハンドリングは、CocoaおよびObjective-Cの`NSError`クラスを使用するエラーハンドリングパターンと相互運用します。このクラスの詳細については、[SwiftでのCocoaエラーの処理](https://developer.apple.com/documentation/swift/handling-cocoa-errors)を参照してください。

## エラーの表現とスロー

Swiftでは、`Error`プロトコルに準拠する型の値によってエラーが表現されます。この空のプロトコルは、型がエラーハンドリングに使用できることを示します。

Swiftの列挙型は、関連するエラー条件のグループをモデル化するのに特に適しており、関連する値を使用してエラーの性質に関する追加情報を伝えることができます。例えば、ゲーム内で自動販売機を操作する際のエラー条件を次のように表現できます。

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

エラーをスローすることで、予期しないことが発生し、通常の実行フローを続行できないことを示すことができます。`throw`文を使用してエラーをスローします。例えば、次のコードは、自動販売機に5枚の追加コインが必要であることを示すためにエラーをスローします。

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

## エラーの処理

エラーがスローされた場合、周囲のコードの一部がエラーを処理する責任を負います。例えば、問題を修正する、代替アプローチを試みる、または失敗をユーザーに通知するなどです。

Swiftでは、エラーを処理する方法が4つあります。関数からエラーを呼び出し元のコードに伝播する、`do-catch`文を使用してエラーを処理する、オプショナル値としてエラーを処理する、またはエラーが発生しないことを主張する、のいずれかです。各アプローチは以下のセクションで説明します。

関数がエラーをスローすると、プログラムのフローが変わるため、エラーをスローする可能性のある場所をすばやく特定できることが重要です。コード内のこれらの場所を特定するには、エラーをスローする可能性のある関数、メソッド、またはイニシャライザを呼び出すコードの前に`try`キーワード（または`try?`や`try!`のバリエーション）を書きます。これらのキーワードについては、以下のセクションで説明します。

> **注:**  
> Swiftのエラーハンドリングは、`try`、`catch`、`throw`キーワードを使用する点で他の言語の例外処理に似ています。Objective-Cを含む多くの言語の例外処理とは異なり、Swiftのエラーハンドリングではコールスタックの巻き戻しを伴わないため、計算コストが高くなることはありません。そのため、`throw`文のパフォーマンス特性は`return`文と同等です。

## スロー関数を使用したエラーの伝播

関数、メソッド、またはイニシャライザがエラーをスローする可能性があることを示すには、パラメータの後に`throws`キーワードを関数の宣言に書きます。`throws`でマークされた関数はスロー関数と呼ばれます。関数が戻り値の型を指定する場合、`throws`キーワードは戻り矢印（`->`）の前に書きます。

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

スロー関数は、その内部でスローされたエラーを呼び出し元のスコープに伝播します。

> **注:**  
> エラーを伝播できるのはスロー関数だけです。非スロー関数内でスローされたエラーは、その関数内で処理する必要があります。

以下の例では、`VendingMachine`クラスに、リクエストされたアイテムが利用できない、在庫がない、または現在の預け入れ額を超えるコストがある場合に適切な`VendingMachineError`をスローする`vend(itemNamed:)`メソッドがあります。

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0

    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }

        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }

        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }

        coinsDeposited -= item.price

        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem

        print("Dispensing \(name)")
    }
}
```

`vend(itemNamed:)`メソッドの実装は、`guard`文を使用してメソッドを早期に終了し、スナックを購入するための要件が満たされていない場合に適切なエラーをスローします。`throw`文はプログラムの制御を即座に移すため、これらの要件がすべて満たされた場合にのみアイテムが販売されます。

`vend(itemNamed:)`メソッドがスローするエラーを伝播するため、このメソッドを呼び出すコードは、`do-catch`文、`try?`、または`try!`を使用してエラーを処理するか、エラーを伝播し続ける必要があります。例えば、以下の例では、`buyFavoriteSnack(person:vendingMachine:)`もスロー関数であり、`vend(itemNamed:)`メソッドがスローするエラーは、`buyFavoriteSnack(person:vendingMachine:)`関数が呼び出されるポイントまで伝播します。

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Bob": "Licorice",
    "Eve": "Pretzels",
]

func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

この例では、`buyFavoriteSnack(person: vendingMachine:)`関数は、指定された人の好きなスナックを調べ、それを購入するために`vend(itemNamed:)`メソッドを呼び出します。`vend(itemNamed:)`メソッドはエラーをスローする可能性があるため、その前に`try`キーワードを付けて呼び出します。

スローイニシャライザは、スロー関数と同じ方法でエラーを伝播できます。例えば、以下のリストの`PurchasedSnack`構造体のイニシャライザは、初期化プロセスの一部としてスロー関数を呼び出し、遭遇したエラーを呼び出し元に伝播することで処理します。

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```

## do-catchを使用したエラー処理

`do-catch`文を使用して、コードのブロックを実行しながらエラーを処理します。`do`句内のコードでエラーがスローされた場合、それは`catch`句と照合され、どの`catch`句がエラーを処理できるかが決定されます。

`do-catch`文の一般的な形式は次のとおりです：

```swift
do {
    try <#expression#>
    <#statements#>
} catch <#pattern 1#> {
    <#statements#>
} catch <#pattern 2#> where <#condition#> {
    <#statements#>
} catch <#pattern 3#>, <#pattern 4#> where <#condition#> {
    <#statements#>
} catch {
    <#statements#>
}
```

`catch`の後にパターンを書いて、その句がどのエラーを処理できるかを示します。`catch`句にパターンがない場合、その句は任意のエラーと一致し、エラーは`error`という名前のローカル定数にバインドされます。パターンマッチングの詳細については、[パターン](https://docs.swift.org/swift-book/LanguageGuide/Patterns.html)を参照してください。

例えば、次のコードは`VendingMachineError`列挙の3つのケースすべてに一致します。

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
// Prints "Insufficient funds. Please insert an additional 2 coins."
```

上記の例では、`buyFavoriteSnack(person:vendingMachine:)`関数が`try`式で呼び出されています。これはエラーをスローする可能性があるためです。エラーがスローされると、実行は直ちに`catch`句に移り、エラーの伝播を続行するかどうかを決定します。パターンが一致しない場合、エラーは最後の`catch`句に捕捉され、ローカルの`error`定数にバインドされます。エラーがスローされない場合、`do`文内の残りの文が実行されます。

`catch`句は、`do`句内のコードがスローする可能性のあるすべてのエラーを処理する必要はありません。どの`catch`句もエラーを処理しない場合、エラーは周囲のスコープに伝播します。ただし、伝播されたエラーは周囲のスコープで処理されなければなりません。非スロー関数では、囲む`do-catch`文がエラーを処理する必要があります。スロー関数では、囲む`do-catch`文または呼び出し元がエラーを処理する必要があります。エラーがトップレベルのスコープに伝播しても処理されない場合、ランタイムエラーが発生します。

例えば、上記の例は、`VendingMachineError`以外のエラーが呼び出し関数によって捕捉されるように書き換えることができます：

```swift
func nourish(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try nourish(with: "Beet-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
// Prints "Couldn't buy that from the vending machine."
```

`nourish(with:)`関数では、`vend(itemNamed:)`が`VendingMachineError`列挙のケースのいずれかをスローした場合、`nourish(with:)`はエラーメッセージを印刷してエラーを処理します。それ以外の場合、`nourish(with:)`はエラーを呼び出し元に伝播します。エラーは一般的な`catch`句によって捕捉されます。

関連する複数のエラーを捕捉する別の方法は、`catch`の後にカンマで区切ってリストすることです。例えば：

```swift
func eat(item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock {
        print("Invalid selection, out of stock, or not enough money.")
    }
}
```

`eat(item:)`関数は、自動販売機のエラーを捕捉するためにリストし、そのエラーテキストはリスト内の項目に対応しています。リストされた3つのエラーのいずれかがスローされた場合、この`catch`句はメッセージを印刷してそれらを処理します。それ以外のエラーは周囲のスコープに伝播されます。後で追加される可能性のある自動販売機のエラーも含まれます。

## エラーをオプショナル値に変換する

`try?`を使用して、エラーをオプショナル値に変換して処理します。`try?`式を評価中にエラーがスローされた場合、式の値は`nil`になります。例えば、次のコードでは`x`と`y`は同じ値と動作を持ちます：

```swift
func someThrowingFunction() throws -> Int {
    // ...
}

let x = try? someThrowingFunction()

let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

`someThrowingFunction()`がエラーをスローした場合、`x`と`y`の値は`nil`になります。それ以外の場合、`x`と`y`の値は関数が返した値になります。`x`と`y`は、`someThrowingFunction()`が返す型のオプショナルです。ここでは関数が整数を返すので、`x`と`y`はオプショナルの整数です。

`try?`を使用すると、すべてのエラーを同じ方法で処理したい場合に簡潔なエラー処理コードを書くことができます。例えば、次のコードはデータを取得するためにいくつかのアプローチを使用し、すべてのアプローチが失敗した場合は`nil`を返します。

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

## エラー伝播の無効化

時々、スロー関数やメソッドが実際にはランタイムでエラーをスローしないことがわかっている場合があります。そのような場合、式の前に`try!`を書いてエラー伝播を無効にし、エラーがスローされないことをランタイムアサーションでラップすることができます。実際にエラーがスローされた場合、ランタイムエラーが発生します。

例えば、次のコードは`loadImage(atPath:)`関数を使用して、指定されたパスの画像リソースをロードします。画像がロードできない場合はエラーをスローします。この場合、画像はアプリケーションと一緒に出荷されるため、ランタイムでエラーがスローされることはありません。そのため、エラー伝播を無効にするのが適切です。

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```



## エラータイプの指定

上記のすべての例では、コードがスローするエラーが `Error` プロトコルに準拠する任意のタイプの値である、最も一般的なエラーハンドリングを使用しています。このアプローチは、コードが実行されている間に発生する可能性のあるすべてのエラーを事前に知ることができない現実に一致しています。特に他の場所でスローされたエラーを伝播する場合はそうです。また、エラーは時間とともに変化する可能性があるという事実も反映しています。ライブラリの新しいバージョン（依存関係が使用するライブラリを含む）は新しいエラーをスローする可能性があり、実際のユーザー設定の複雑さにより、開発やテスト中には見えなかった障害モードが露呈することがあります。上記の例のエラーハンドリングコードは、特定の `catch` 節を持たないエラーを処理するために常にデフォルトケースを含んでいます。

ほとんどのSwiftコードは、スローするエラーのタイプを指定しません。ただし、次の特別な場合には、特定のタイプのエラーのみをスローするようにコードを制限することがあります。

- 動的メモリ割り当てをサポートしない組み込みシステムでコードを実行する場合。任意の `Error` または他のボックス化されたプロトコルタイプのインスタンスをスローするには、エラーを格納するためにランタイムでメモリを割り当てる必要があります。対照的に、特定のタイプのエラーをスローすることで、Swiftはエラーのヒープ割り当てを回避できます。
- エラーがライブラリのようなコードの単位の実装詳細であり、そのコードのインターフェースの一部ではない場合。エラーがライブラリからのみ発生し、他の依存関係やライブラリのクライアントからは発生しないため、すべての可能な失敗のリストを網羅できます。また、これらのエラーがライブラリの実装詳細であるため、常にそのライブラリ内で処理されます。
- クロージャ引数を取り、そのクロージャからのエラーを伝播する関数のように、ジェネリックパラメータで記述されたエラーのみを伝播するコードの場合。特定のエラータイプを伝播することと `rethrows` を使用することの比較については、[再スロー関数とメソッド](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID546)を参照してください。

例えば、次のエラータイプを使用する評価を要約するコードを考えてみましょう。

```swift
enum StatisticsError: Error {
    case noRatings
    case invalidRating(Int)
}
```

関数がそのエラーとして `StatisticsError` 値のみをスローすることを指定するには、関数を宣言する際に `throws` のみではなく `throws(StatisticsError)` と書きます。この構文は、宣言で `throws` の後にエラータイプを書くため、型付きスローとも呼ばれます。例えば、以下の関数はエラーとして `StatisticsError` 値をスローします。

```swift
func summarize(_ ratings: [Int]) throws(StatisticsError) {
    guard !ratings.isEmpty else { throw .noRatings }

    var counts = [1: 0, 2: 0, 3: 0]
    for rating in ratings {
        guard rating > 0 && rating <= 3 else { throw .invalidRating(rating) }
        counts[rating]! += 1
    }

    print("*", counts[1]!, "-- **", counts[2]!, "-- ***", counts[3]!)
}
```

上記のコードでは、`summarize(_:)` 関数は1から3のスケールで表現された評価のリストを要約します。この関数は、入力が無効な場合に `StatisticsError` のインスタンスをスローします。上記のコードでエラーをスローする2つの場所は、関数のエラータイプが既に定義されているため、エラーのタイプを省略しています。このような関数でエラーをスローする場合、`throw .noRatings` の短縮形を使用できます。

関数の先頭に特定のエラータイプを書くと、Swiftは他のエラーをスローしないことを確認します。例えば、上記の `summarize(_:)` 関数でこの章の前の例から `VendingMachineError` を使用しようとすると、そのコードはコンパイル時にエラーを生成します。

型付きスローを使用する関数を通常のスロー関数内から呼び出すことができます。

```swift
func someThrowingFunction() throws {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

上記のコードは `someThrowingFunction()` のエラータイプを指定していないため、任意の `Error` をスローします。以下のコードは上記のコードと同等で、エラータイプを明示的に `throws(any Error)` と書くこともできます。

```swift
func someThrowingFunction() throws(any Error) {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

このコードでは、`someThrowingFunction()` は `summarize(_:)` がスローする任意のエラーを伝播します。`summarize(_:)` からのエラーは常に `StatisticsError` 値であり、これは `someThrowingFunction()` がスローする有効なエラーでもあります。

戻り値の型が `Never` の関数を記述できるのと同様に、`throws(Never)` を使用して決してスローしない関数を記述できます。

```swift
func nonThrowingFunction() throws(Never) {
  // ...
}
```

この関数はスローできません。なぜなら、スローするための `Never` 型の値を作成することは不可能だからです。

関数のエラータイプを指定することに加えて、`do-catch` 文の特定のエラータイプを書くこともできます。例えば：

```swift
let ratings = []
do throws(StatisticsError) {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("評価がありません")
    case .invalidRating(let rating):
        print("無効な評価: \(rating)")
    }
}
// "評価がありません" と表示されます
```

このコードでは、`do throws(StatisticsError)` と書くことで、`do-catch` 文が `StatisticsError` 値をエラーとしてスローすることを示しています。他の `do-catch` 文と同様に、`catch` 節はすべての可能なエラーを処理するか、処理されていないエラーを周囲のスコープに伝播させることができます。このコードはすべてのエラーを処理し、各列挙値に対して1つのケースを持つ `switch` 文を使用しています。パターンを持たない他の `catch` 節と同様に、この節は任意のエラーに一致し、エラーを `error` というローカル定数にバインドします。`do-catch` 文が `StatisticsError` 値をスローするため、`error` は `StatisticsError` 型の値です。

上記の `catch` 節は `switch` 文を使用して各可能なエラーを一致させて処理します。`StatisticsError` に新しいケースを追加し、エラーハンドリングコードを更新しなかった場合、`switch` 文が網羅的でなくなるため、Swiftはエラーを出します。すべてのエラーを自分でキャッチするライブラリの場合、このアプローチを使用して新しいエラーに対応する新しいコードが確実に追加されるようにできます。

関数や `do` ブロックが単一のタイプのエラーのみをスローする場合、Swiftはこのコードが型付きスローを使用していると推測します。この短い構文を使用すると、上記の `do-catch` の例を次のように書くことができます。

```swift
let ratings = []
do {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("評価がありません")
    case .invalidRating(let rating):
        print("無効な評価: \(rating)")
    }
}
// "評価がありません" と表示されます
```

上記の `do-catch` ブロックはスローするエラーのタイプを指定していませんが、Swiftはそれが `StatisticsError` をスローすることを推測します。型付きスローを推測させたくない場合は、明示的に `throws(any Error)` と書くことができます。

## クリーンアップアクションの指定

`defer` 文を使用して、現在のコードブロックを離れる直前に一連の文を実行します。この文を使用すると、エラーがスローされた場合や `return` や `break` などの文によってコードブロックを離れる場合に関係なく、必要なクリーンアップを実行できます。例えば、ファイルディスクリプタを閉じたり、手動で割り当てたメモリを解放したりするために `defer` 文を使用できます。

`defer` 文は現在のスコープが終了するまで実行を遅延させます。この文は `defer` キーワードと後で実行される文で構成されます。遅延された文には、`break` や `return` 文、エラーをスローすることによって制御を文から移すコードを含めることはできません。遅延されたアクションは、ソースコードに書かれた順序の逆順で実行されます。つまり、最初の `defer` 文のコードが最後に実行され、2番目の `defer` 文のコードが最後から2番目に実行されるということです。ソースコードの順序で最後の `defer` 文が最初に実行されます。

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // ファイルを処理します。
        }
        // スコープの終わりで close(file) が呼び出されます。
    }
}
```

上記の例では、`defer` 文を使用して `open(_:)` 関数に対応する `close(_)` 呼び出しがあることを確認しています。

エラーハンドリングコードが関与していない場合でも `defer` 文を使用できます。詳細については、[Deferred Actions](https://docs.swift.org/swift-book/LanguageGuide/Defer.html) を参照してください。