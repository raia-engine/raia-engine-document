# 関数

関数を定義して呼び出し、引数にラベルを付け、戻り値を使用します。

関数は、特定のタスクを実行する独立したコードの集まりです。関数にはその機能を示す名前を付け、その名前を使って必要な時に関数を「呼び出し」てタスクを実行します。

Swiftの統一された関数構文は、パラメータ名のないシンプルなC形式の関数から、各パラメータに名前と引数ラベルを持つ複雑なObjective-C形式のメソッドまで、あらゆるものを表現できるほど柔軟です。パラメータにはデフォルト値を設定して関数呼び出しを簡素化でき、また関数の実行が完了した後に渡された変数を変更するin-outパラメータとして渡すことができます。

## 関数の定義と呼び出し

関数を定義する際、入力として受け取る1つ以上の名前付きの型付き値（パラメータと呼ばれる）を必要に応じて定義できます。また、関数が完了したときに出力として渡す値の型（戻り値型と呼ばれる）も必要に応じて定義できます。

すべての関数には、その関数が実行するタスクを説明する関数名があります。関数を使用するには、その名前で関数を「呼び出し」、関数のパラメータの型に一致する入力値（引数と呼ばれる）を渡します。関数の引数は、常に関数のパラメータリストと同じ順序で指定する必要があります。

以下の例の関数は `greet(person:)` と呼ばれます。これは、人の名前を入力として受け取り、その人への挨拶を返すからです。これを実現するために、`String` 値の入力パラメータ `person` と、挨拶を含む `String` の戻り値型を定義します：

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

この情報はすべて、`func` キーワードで始まる関数の定義にまとめられています。関数の戻り値型は、戻り矢印 `->`（ハイフンと右角括弧）で示され、その後に戻り値の型の名前が続きます。

定義は、関数が何をするか、何を受け取るか、完了時に何を返すかを説明します。この定義により、コードの他の場所から関数を明確に呼び出すことが容易になります：

```swift
print(greet(person: "Anna"))
// Prints "Hello, Anna!"
print(greet(person: "Brian"))
// Prints "Hello, Brian!"
```

`greet(person:)` 関数は、`person` 引数ラベルの後に `String` 値を渡して呼び出します。例えば、`greet(person: "Anna")` のように。関数は `String` 値を返すため、`greet(person:)` を `print(_:separator:terminator:)` 関数の呼び出しにラップして、その文字列を印刷し、戻り値を確認できます。

> **Note**
> 
> `print(_:separator:terminator:)` 関数は最初の引数にラベルがなく、他の引数はデフォルト値があるためオプションです。これらの関数構文のバリエーションについては、後述の「関数引数ラベルとパラメータ名」と「デフォルトパラメータ値」で説明します。

`greet(person:)` 関数の本体は、新しい `String` 定数 `greeting` を定義し、シンプルな挨拶メッセージに設定することから始まります。この挨拶は `return` キーワードを使用して関数の外に渡されます。`return greeting` の行で、関数は実行を終了し、現在の `greeting` の値を返します。

`greet(person:)` 関数は、異なる入力値で複数回呼び出すことができます。上記の例では、入力値が "Anna" の場合と "Brian" の場合に何が起こるかを示しています。関数はそれぞれの場合に合わせた挨拶を返します。

この関数の本体を短くするために、メッセージの作成と `return` 文を1行にまとめることができます：

```swift
func greetAgain(person: String) -> String {
    return "Hello again, " + person + "!"
}
print(greetAgain(person: "Anna"))
// Prints "Hello again, Anna!"
```

## 関数のパラメータと戻り値

Swiftの関数パラメータと戻り値は非常に柔軟です。単一の名前のないパラメータを持つシンプルなユーティリティ関数から、表現力豊かなパラメータ名と異なるパラメータオプションを持つ複雑な関数まで、何でも定義できます。

### パラメータのない関数

関数は入力パラメータを定義する必要はありません。以下は入力パラメータがない関数で、呼び出されるたびに同じ `String` メッセージを返します：

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// Prints "hello, world"
```

関数定義には、パラメータがなくても関数名の後に括弧が必要です。関数を呼び出すときも、関数名の後に空の括弧が続きます。

### 複数のパラメータを持つ関数

関数は複数の入力パラメータを持つことができ、これらは関数の括弧内にカンマで区切って記述されます。

この関数は、人の名前と既に挨拶されたかどうかを入力として受け取り、その人に対する適切な挨拶を返します：

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person)
    } else {
        return greet(person: person)
    }
}
print(greet(person: "Tim", alreadyGreeted: true))
// Prints "Hello again, Tim!"
```

`greet(person:alreadyGreeted:)` 関数は、`person` とラベル付けされた `String` 引数値と、`alreadyGreeted` とラベル付けされた `Bool` 引数値の両方を括弧内にカンマで区切って渡すことで呼び出します。この関数は、前のセクションで示した `greet(person:)` 関数とは異なります。両方の関数は `greet` で始まる名前を持っていますが、`greet(person:alreadyGreeted:)` 関数は2つの引数を取り、`greet(person:)` 関数は1つの引数しか取りません。

### 戻り値のない関数

関数は戻り値型を定義する必要はありません。以下は、戻り値を返す代わりに自分の `String` 値を印刷する `greet(person:)` 関数のバージョンです：

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// Prints "Hello, Dave!"
```

戻り値を返す必要がないため、関数の定義には戻り矢印（`->`）や戻り値型が含まれていません。

> **Note**
> 
> 厳密に言えば、このバージョンの `greet(person:)` 関数も戻り値を返しますが、戻り値は定義されていません。戻り値型が定義されていない関数は、特別な値 `Void` 型を返します。これは単に空のタプルであり、`()` と書かれます。

関数の戻り値は、呼び出されたときに無視することができます：

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}
printAndCount(string: "hello, world")
// prints "hello, world" and returns a value of 12
printWithoutCounting(string: "hello, world")
// prints "hello, world" but doesn't return a value
```

最初の関数 `printAndCount(string:)` は文字列を印刷し、その文字数を `Int` として返します。2番目の関数 `printWithoutCounting(string:)` は最初の関数を呼び出しますが、その戻り値を無視します。2番目の関数が呼び出されると、メッセージは最初の関数によって印刷されますが、返された値は使用されません。

> **Note**
> 
> 戻り値は無視できますが、戻り値を返すと宣言された関数は常に戻り値を返さなければなりません。定義された戻り値型を持つ関数は、戻り値を返さずに関数の末尾に制御を落とすことはできず、そうしようとするとコンパイル時エラーが発生します。

### 複数の戻り値を持つ関数

タプル型を関数の戻り値型として使用して、複数の値を1つの複合戻り値の一部として返すことができます。

以下の例では、`minMax(array:)` という関数を定義し、`Int` 値の配列内の最小値と最大値を見つけます：

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

`minMax(array:)` 関数は2つの `Int` 値を含むタプルを返します。これらの値は `min` と `max` とラベル付けされ、関数の戻り値を照会するときに名前でアクセスできます。

`minMax(array:)` 関数の本体は、`currentMin` と `currentMax` という2つの作業変数を配列内の最初の整数の値に設定することから始まります。関数は配列内の残りの値を反復処理し、各値が `currentMin` と `currentMax` の値より小さいか大きいかを確認します。最後に、全体の最小値と最大値が2つの `Int` 値のタプルとして返されます。

タプルのメンバー値は関数の戻り値型の一部として名前が付けられているため、ドット構文を使用して最小値と最大値を取得できます：

```swift
let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// Prints "min is -6 and max is 109"
```

タプルのメンバーは、関数からタプルが返される時点で名前を付ける必要はありません。名前はすでに関数の戻り値型の一部として指定されています。

### オプショナルタプル戻り値型

関数から返されるタプル型が、タプル全体に「値がない」可能性がある場合、オプショナルタプル戻り値型を使用して、タプル全体が `nil` になる可能性があることを反映できます。オプショナルタプル戻り値型は、タプル型の閉じ括弧の後に疑問符を付けて書きます。例えば、`(Int, Int)?` や `(String, Int, Bool)?` のように。

> **Note**
> 
> `(Int, Int)?` のようなオプショナルタプル型は、`(Int?, Int?)` のようなオプショナル型を含むタプルとは異なります。オプショナルタプル型では、タプル全体がオプショナルであり、タプル内の各個別の値だけがオプショナルではありません。

上記の `minMax(array:)` 関数は2つの `Int` 値を含むタプルを返します。しかし、関数は渡された配列に対して安全チェックを行いません。配列引数が空の配列を含む場合、上記のように定義された `minMax(array:)` 関数は、`array[0]` にアクセスしようとするとランタイムエラーを引き起こします。

空の配列を安全に処理するために、オプショナルタプル戻り値型を持つ `minMax(array:)` 関数を記述し、配列が空の場合は `nil` を返します：

```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

オプショナルバインディングを使用して、このバージョンの `minMax(array:)` 関数が実際のタプル値を返すか `nil` を返すかを確認できます：

```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// Prints "min is -6 and max is 109"
```

### 暗黙的な戻り値を持つ関数

関数の本体全体が単一の式である場合、関数はその式を暗黙的に返します。例えば、以下の2つの関数は同じ動作をします：

```swift
func greeting(for person: String) -> String {
    "Hello, " + person + "!"
}
print(greeting(for: "Dave"))
// Prints "Hello, Dave!"

func anotherGreeting(for person: String) -> String {
    return "Hello, " + person + "!"
}
print(anotherGreeting(for: "Dave"))
// Prints "Hello, Dave!"
```

`greeting(for:)` 関数の定義全体は、返す挨拶メッセージであり、この短い形式を使用できます。`anotherGreeting(for:)` 関数は、長い関数のように `return` キーワードを使用して同じ挨拶メッセージを返します。1行の戻り値だけを持つ関数は、`return` を省略できます。

プロパティゲッターも暗黙的な戻り値を使用できることを、Shorthand Getter Declaration で説明します。

> **Note**
> 
> 暗黙的な戻り値として書くコードは、何らかの値を返す必要があります。例えば、`print(13)` を暗黙的な戻り値として使用することはできません。しかし、`fatalError("Oh no!")` のように決して戻らない関数を暗黙的な戻り値として使用することはできます。なぜなら、Swiftは暗黙的な戻りが発生しないことを知っているからです。

## 関数引数ラベルとパラメータ名

各関数パラメータには、引数ラベルとパラメータ名の両方があります。引数ラベルは関数を呼び出すときに使用され、各引数はその引数ラベルの前に書かれます。パラメータ名は関数の実装で使用されます。デフォルトでは、パラメータはパラメータ名を引数ラベルとして使用します。

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

すべてのパラメータは一意の名前を持つ必要があります。複数のパラメータが同じ引数ラベルを持つことは可能ですが、一意の引数ラベルはコードの可読性を向上させます。

### 引数ラベルの指定

引数ラベルはパラメータ名の前にスペースで区切って書きます：

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

以下は、人の名前と出身地を受け取り、挨拶を返す `greet(person:)` 関数のバリエーションです：

```swift
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)!  Glad you could visit from \(hometown)."
}
print(greet(person: "Bill", from: "Cupertino"))
// Prints "Hello Bill!  Glad you could visit from Cupertino."
```

引数ラベルの使用により、関数を表現力豊かで文のように呼び出すことができ、関数本体が読みやすく明確な意図を持つことができます。

### 引数ラベルの省略

パラメータに引数ラベルを付けたくない場合、そのパラメータの明示的な引数ラベルの代わりにアンダースコア（`_`）を書きます。

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(1, secondParameterName: 2)
```

パラメータに引数ラベルがある場合、関数を呼び出すときに引数にラベルを付ける必要があります。

### デフォルトパラメータ値

関数の任意のパラメータにデフォルト値を定義できます。デフォルト値を定義するには、そのパラメータの型の後に値を割り当てます。デフォルト値が定義されている場合、関数を呼び出すときにそのパラメータを省略できます。

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // If you omit the second argument when calling this function, then
    // the value of parameterWithDefault is 12 inside the function body.
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

デフォルト値を持たないパラメータを関数のパラメータリストの先頭に配置し、デフォルト値を持つパラメータの前に配置します。デフォルト値を持たないパラメータは通常、関数の意味にとってより重要です。最初に書くことで、デフォルトパラメータが省略されているかどうかに関係なく、同じ関数が呼び出されていることを認識しやすくなります。

### 可変長パラメータ

可変長パラメータは、指定された型の0個以上の値を受け入れます。可変長パラメータを使用して、関数が呼び出されたときに異なる数の入力値を渡すことができることを指定します。可変長パラメータは、パラメータの型名の後に3つのピリオド文字（`...`）を挿入して記述します。

可変長パラメータに渡された値は、関数の本体内で適切な型の配列として利用できます。例えば、`numbers` という名前の `Double...` 型の可変長パラメータは、関数の本体内で `numbers` という名前の `Double` 型の定数配列として利用できます。

以下の例では、任意の長さの数値のリストの算術平均（平均値）を計算します：

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8.25, 18.75)
// returns 10.0, which is the arithmetic mean of these three numbers
```

関数は複数の可変長パラメータを持つことができます。可変長パラメータの後に来る最初のパラメータは引数ラベルを持たなければなりません。引数ラベルは、どの引数が可変長パラメータに渡され、どの引数が可変長パラメータの後に来るパラメータに渡されるかを明確にします。

### インアウトパラメータ

関数パラメータはデフォルトで定数です。関数の本体内で関数パラメータの値を変更しようとすると、コンパイル時エラーが発生します。これにより、誤ってパラメータの値を変更することはできません。関数がパラメータの値を変更し、その変更が関数呼び出しが終了した後も持続することを望む場合、そのパラメータをインアウトパラメータとして定義します。

インアウトパラメータは、パラメータの型の直前に `inout` キーワードを付けて記述します。インアウトパラメータは、関数に渡され、関数によって変更され、関数の外に渡されて元の値を置き換えます。インアウトパラメータの動作と関連するコンパイラ最適化の詳細な説明については、In-Out Parameters を参照してください。

インアウトパラメータの引数として変数のみを渡すことができます。定数やリテラル値を引数として渡すことはできません。定数やリテラルは変更できないためです。インアウトパラメータに変数を引数として渡すときは、変数名の直前にアンパサンド（`&`）を付けて、その変数が関数によって変更される可能性があることを示します。

> **Note**
> 
> インアウトパラメータはデフォルト値を持つことができず、可変長パラメータは `inout` としてマークすることはできません。

以下は、`a` と `b` という2つのインアウト整数パラメータを持つ `swapTwoInts(_:_:)` という関数の例です：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoInts(_:_:)` 関数は、単に `b` の値を `a` に、`a` の値を `b` に入れ替えます。関数は、`a` の値を一時定数 `temporaryA` に格納し、`b` の値を `a` に代入し、`temporaryA` を `b` に代入することでこの入れ替えを行います。

`swapTwoInts(_:_:)` 関数を `Int` 型の2つの変数で呼び出して、その値を入れ替えることができます。`swapTwoInts(_:_:)` 関数に渡すときに、`someInt` と `anotherInt` の名前の前にアンパサンドが付いていることに注意してください：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

上記の例は、`someInt` と `anotherInt` の元の値が `swapTwoInts(_:_:)` 関数によって変更されることを示しています。これらの値は関数の外部で元々定義されていました。

> **Note**
> 
> インアウトパラメータは、関数から値を返すのと同じではありません。上記の `swapTwoInts` の例は戻り値型を定義しておらず、値を返しませんが、それでも `someInt` と `anotherInt` の値を変更します。インアウトパラメータは、関数本体のスコープ外で効果を持たせるための代替手段です。

## 関数型

すべての関数には、関数のパラメータ型と戻り値型で構成される特定の関数型があります。

例えば：

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}
```

この例では、`addTwoInts` と `multiplyTwoInts` という2つのシンプルな数学関数を定義しています。これらの関数はそれぞれ2つの `Int` 値を取り、適切な数学的操作の結果である `Int` 値を返します。

これらの関数の型は `(Int, Int) -> Int` です。これは次のように読むことができます：

「2つの `Int` パラメータを持ち、`Int` 型の値を返す関数。」

以下は、パラメータや戻り値のない関数の例です：

```swift
func printHelloWorld() {
    print("hello, world")
}
```

この関数の型は `() -> Void` です。つまり、「パラメータがなく、`Void` を返す関数」です。

### 関数型の使用

関数型はSwiftの他の型と同じように使用します。例えば、定数や変数を関数型として定義し、適切な関数をその変数に代入できます：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

これは次のように読むことができます：

「`mathFunction` という名前の変数を定義し、その型は『2つの `Int` 値を取り、`Int` 値を返す関数』です。この新しい変数を `addTwoInts` 関数を参照するように設定します。」

`addTwoInts(_:_:)` 関数は `mathFunction` 変数と同じ型を持っているため、この代入はSwiftの型チェッカーによって許可されます。

これで、`mathFunction` という名前で代入された関数を呼び出すことができます：

```swift
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"
```

同じ型の異なる関数を同じ変数に代入することもできます。これは非関数型の場合と同じ方法です：

```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 6"
```

他の型と同様に、定数や変数に関数を代入するときにSwiftに関数型を推論させることができます：

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### パラメータ型としての関数型

`(Int, Int) -> Int` のような関数型を他の関数のパラメータ型として使用できます。これにより、関数の実装の一部を関数の呼び出し元が提供できるようになります。

以下は、上記の数学関数の結果を印刷する例です：

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// Prints "Result: 8"
```

この例では、`printMathResult(_:_:_:)` という関数を定義しています。この関数には3つのパラメータがあります。最初のパラメータは `mathFunction` と呼ばれ、型は `(Int, Int) -> Int` です。この最初のパラメータの引数として、この型の任意の関数を渡すことができます。2番目と3番目のパラメータは `a` と `b` と呼ばれ、どちらも `Int` 型です。これらは提供された数学関数の2つの入力値として使用されます。

`printMathResult(_:_:_:)` が呼び出されると、`addTwoInts(_:_:)` 関数と整数値 `3` と `5` が渡されます。提供された関数を `3` と `5` の値で呼び出し、結果の `8` を印刷します。

`printMathResult(_:_:_:)` の役割は、適切な型の数学関数の呼び出し結果を印刷することです。その関数の実装が実際に何をするかは重要ではありません。重要なのは、その関数が正しい型であることだけです。これにより、`printMathResult(_:_:_:)` は関数の呼び出し元に一部の機能を型安全な方法で委任できます。

### 戻り値型としての関数型

関数型を他の関数の戻り値型として使用できます。これを行うには、戻り矢印（`->`）の直後に完全な関数型を記述します。

次の例では、`stepForward(_:)` と `stepBackward(_:)` という2つのシンプルな関数を定義しています。`stepForward(_:)` 関数は入力値より1つ大きい値を返し、`stepBackward(_:)` 関数は入力値より1つ小さい値を返します。両方の関数の型は `(Int) -> Int` です：

```swift
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}
```

以下は、戻り値型が `(Int) -> Int` である `chooseStepFunction(backward:)` という関数です。`chooseStepFunction(backward:)` 関数は、`backward` というブール型のパラメータに基づいて、`stepForward(_:)` 関数または `stepBackward(_:)` 関数を返します：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

これで、`chooseStepFunction(backward:)` を使用して、ある方向にステップする関数を取得できます：

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

上記の例では、変数 `currentValue` をゼロに近づけるために正のステップまたは負のステップが必要かどうかを判断します。`currentValue` は初期値 `3` を持ち、`currentValue > 0` は `true` を返すため、`chooseStepFunction(backward:)` は `stepBackward(_:)` 関数を返します。返された関数への参照は `moveNearerToZero` という定数に格納されます。

`moveNearerToZero` が正しい関数を参照するようになったので、ゼロまでカウントするために使用できます：

```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!
```

### ネストされた関数

これまでにこの章で紹介した関数はすべて、グローバルスコープで定義されたグローバル関数の例です。関数の本体内に関数を定義することもでき、これをネストされた関数と呼びます。

ネストされた関数はデフォルトで外部から隠されていますが、それでも囲む関数によって呼び出され、使用されることができます。囲む関数は、ネストされた関数の1つを返すこともでき、ネストされた関数を別のスコープで使用できるようにします。

上記の `chooseStepFunction(backward:)` の例をネストされた関数を使用して書き直すことができます：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!