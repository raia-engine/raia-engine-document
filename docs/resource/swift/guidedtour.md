# Swiftツアー

**Swiftの機能と構文を探索しましょう。**

新しい言語では、伝統的に最初のプログラムで画面に「Hello, world!」という文字を表示します。Swiftでは、これを1行で実現できます：

```swift
print("Hello, world!")
// "Hello, world!"と表示されます
```

他のプログラミング言語を知っている方には見慣れた構文かもしれませんが、Swiftではこの1行のコードが完全なプログラムとなります。テキストの出力や文字列の処理のために別途ライブラリをインポートする必要はありません。グローバルスコープで書かれたコードはプログラムのエントリーポイントとして使われるため、`main()`関数も必要ありません。また、各文の末尾にセミコロンを書く必要もありません。

このツアーでは、Swiftでさまざまなプログラミングタスクを達成する方法を示し、コードを書き始めるために必要な情報を提供します。分からないことがあっても心配しないでください。このツアーで紹介される内容は、本書の後半で詳しく説明されています。

## シンプルな値

`let`を使って定数を作成し、`var`を使って変数を作成します。定数の値はコンパイル時に既知である必要はありませんが、値を一度だけ代入する必要があります。これにより、1度決定した値を複数の場所で使うために名前を付けられます。

```swift
var myVariable = 42
myVariable = 50
let myConstant = 42
```

定数や変数は、代入する値と同じ型でなければなりません。しかし、型を明示的に書く必要はありません。定数や変数を作成する際に値を指定すると、コンパイラが型を推論します。上記の例では、初期値が整数であるため、`myVariable`は整数型と推論されます。

初期値から十分な情報が得られない場合（または初期値が存在しない場合）、変数の後にコロンと型名を記述して型を指定します。

```swift
let implicitInteger = 70
let implicitDouble = 70.0
let explicitDouble: Double = 70
```

::: info Experiment
**Float型**を明示的に指定し、値を4に設定する定数を作成してみてください。
:::

値は自動的に他の型に変換されることはありません。異なる型へ変換する必要がある場合は、目的の型のインスタンスを明示的に作成します。

```swift
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
```

::: info Experiment
最後の行から`String`への変換を取り除いてみてください。どのようなエラーが表示されますか？
:::

値を文字列に含めるさらに簡単な方法があります：値を丸括弧で囲み、その前にバックスラッシュ（`\`）を追加します。例えば：

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pieces of fruit."
```

::: info Experiment
`\()`を使って、浮動小数点計算を文字列に含めたり、誰かの名前を挨拶に含めたりしてみてください。
:::

複数行にわたる文字列には、**3つの二重引用符（`"""`）** を使用します。各行の先頭のインデントが閉じる引用符のインデントと一致している場合、そのインデントは取り除かれます。例えば：

```swift
let quotation = """
        Even though there's whitespace to the left,
        the actual lines aren't indented.
            Except for this line.
        Double quotes (") can appear without being escaped.

        I still have \(apples + oranges) pieces of fruit.
        """
```

角括弧（`[]`）を使って配列や辞書を作成し、要素へはインデックスやキーを角括弧内に記述してアクセスします。最後の要素の後にカンマを追加しても問題ありません。

```swift
var fruits = ["strawberries", "limes", "tangerines"]
fruits[1] = "grapes"

var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
 ]
occupations["Jayne"] = "Public Relations"
```

配列は要素を追加すると自動的に拡張されます。

```swift
fruits.append("blueberries")
print(fruits)
// "["strawberries", "grapes", "tangerines", "blueberries"]" と表示されます
```

空の配列や辞書を作成する場合にも角括弧を使います。配列の場合は`[]`、辞書の場合は`[:]`を記述します。

```swift
fruits = []
occupations = [:]
```

新しい変数や型情報のない場所に空の配列や辞書を代入する場合は、型を指定する必要があります。

```swift
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]
```

## 制御フロー

ifやswitchを使って条件分岐を作成し、for-in、while、およびrepeat-whileを使ってループを作成します。条件やループ変数の周囲の括弧は任意ですが、コードブロックを囲む波括弧は必須です。

```swift
let individualScores = [75, 43, 103, 87, 12]
var teamScore = 0
for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}
print(teamScore)
// "11" と表示されます
```

if文では条件は必ず**ブール式**でなければなりません。そのため、`if score { ... }` のようなコードは暗黙的に0と比較されることはなく、エラーになります。

`=`の右側や`return`の後にifやswitchを書いて、条件に基づいて値を選ぶことができます。

```swift
let scoreDecoration = if teamScore > 10 {
    "🎉"
} else {
    ""
}
print("Score:", teamScore, scoreDecoration)
// "Score: 11 🎉" と表示されます
```

if文とletを組み合わせて、**値が欠落している可能性がある値**を扱うことができます。これらの値は**オプショナル**として表されます。オプショナルの値は、値が含まれているか、`nil`で欠落を示すかのいずれかです。オプショナルとしてマークするには、値の型の後に**`?`** を付けます。

```swift
var optionalString: String? = "Hello"
print(optionalString == nil)
// "false" と表示されます

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if let name = optionalName {
    greeting = "Hello, \(name)"
}
```

::: info Experiment
`optionalName`を`nil`に変更してみてください。どのような挨拶が表示されますか？さらに、`optionalName`が`nil`の場合に別の挨拶を設定するelse節を追加してみてください。
:::

オプショナル値が`nil`の場合、条件は`false`となり、波括弧内のコードはスキップされます。そうでなければ、オプショナル値がアンラップされて`let`の後に指定した定数に代入され、そのブロック内で利用可能になります。

オプショナル値を扱うもう1つの方法は、**`??`演算子**を使用してデフォルト値を提供することです。オプショナル値が`nil`の場合、デフォルト値が使用されます。

```swift
let nickname: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \(nickname ?? fullName)"
```

同じ名前を使用して値をアンラップする**短縮形**も使用できます。

```swift
if let nickname {
    print("Hey, \(nickname)")
}
// 何も表示されません。nicknameがnilだからです。
```

**switch文**はあらゆる種類のデータや多様な比較操作をサポートしており、整数や等価性テストに限定されません。

```swift
let vegetable = "red pepper"
switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"):
    print("Is it a spicy \(x)?")
default:
    print("Everything tastes good in soup.")
}
// "Is it a spicy red pepper?" と表示されます
```

::: info Experiment
`default`ケースを削除してみてください。どのようなエラーが表示されますか？
:::

`let`がパターン内で使用され、パターンに一致した値を定数に代入する方法に注目してください。

一致する`switch`ケース内のコードが実行されると、プログラムは`switch`文から抜け出します。次のケースには処理が継続しないため、各ケースの最後に明示的に`break`を書く必要はありません。

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (_, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
// "25" と表示されます
```

::: info Experiment
`_` を変数名に置き換えて、どの種類の数値が最も大きかったかを記録してみてください。
:::

```swift
var n = 2
while n < 100 {
    n *= 2
}
print(n)
// "128" と表示されます

var m = 2
repeat {
    m *= 2
} while m < 100
print(m)
// "128" と表示されます
```

::: info Experiment
条件を`m < 100`から`m < 0`に変更して、`while`と`repeat-while`がループ条件が最初から`false`の場合にどのように動作するか確認してください。
:::

```swift
var total = 0
for i in 0..<4 {
    total += i
}
print(total)
// "6" と表示されます
```

`..<` を使うと上限を含まない範囲を作成でき、`...` を使うと両端の値を含む範囲を作成できます。

## 関数とクロージャ

`func`を使って関数を宣言します。関数を呼び出すには、関数名の後に括弧で囲んだ引数のリストを記述します。`->`を使ってパラメータ名と型の後に関数の戻り値の型を指定します。

```swift
func greet(person: String, day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet(person: "Bob", day: "Tuesday")
```

::: info Experiment
`day`パラメータを削除し、今日のランチの特別メニューを挨拶に含めるパラメータを追加してください。
:::

デフォルトでは、関数はパラメータ名を引数ラベルとして使用します。カスタム引数ラベルを指定するには、パラメータ名の前に記述します。引数ラベルを使用しない場合は、アンダースコア`_`を使用します。

```swift
func greet(_ person: String, on day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet("John", on: "Wednesday")
```

タプルを使って複合値を作成できます。例えば、関数から複数の値を返す場合です。タプルの要素には名前または番号でアクセスできます。

```swift
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0

    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }

    return (min, max, sum)
}
let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
print(statistics.sum)
// "120" と表示されます
print(statistics.2)
// "120" と表示されます
```

関数はネストすることができます。ネストされた関数は外側の関数で宣言された変数にアクセスできます。長いまたは複雑な関数のコードを整理するためにネスト関数を使用できます。

```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5
    }
    add()
    return y
}
returnFifteen()
```

関数は**第一級型**です。これは、関数が別の関数を戻り値として返すことができることを意味します。

```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

関数は他の関数を引数として受け取ることもできます。

```swift
func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}
var numbers = [20, 19, 7, 12]
hasAnyMatches(list: numbers, condition: lessThanTen)
```

関数は、クロージャの特別なケースです。クロージャは後で呼び出すことができるコードブロックです。クロージャ内のコードは、クロージャが作成されたスコープで利用可能な変数や関数にアクセスできます。クロージャは名前を付けずに書くことができ、コードを波括弧`{}`で囲みます。引数と戻り値の型は`in`でコード本体と分離します。

```swift
numbers.map({ (number: Int) -> Int in
    let result = 3 * number
    return result
})
```

::: info Experiment
クロージャを変更して、すべての奇数の数値に対して0を返すようにしてください。
:::

クロージャはさらに簡潔に記述することができます。例えば、クロージャの型がすでに分かっている場合、パラメータの型や戻り値の型を省略できます。1つの式だけを含むクロージャでは、暗黙的にその値が戻り値となります。

```swift
let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
// "[60, 57, 21, 36]" と表示されます
```

パラメータを名前ではなく番号で参照することもできます。このアプローチは非常に短いクロージャで便利です。関数の最後の引数としてクロージャを渡す場合、括弧の後ろに記述することができます。クロージャが関数の唯一の引数である場合は、括弧自体を省略できます。

```swift
let sortedNumbers = numbers.sorted { $0 > $1 }
print(sortedNumbers)
// "[20, 19, 12, 7]" と表示されます
```

## オブジェクトとクラス

`class`に続けてクラス名を記述することでクラスを作成します。クラス内のプロパティ宣言は定数や変数の宣言と同様の書き方をします。メソッドや関数の宣言も同様です。

```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```

::: info Experiment
`let`を使って定数プロパティを追加し、引数を取る別のメソッドを追加してください。
:::

クラスのインスタンスは、クラス名の後に括弧`()`を付けることで作成します。インスタンスのプロパティやメソッドにはドット構文を使用してアクセスします。

```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```

この`Shape`クラスには重要なものが欠けています：インスタンス作成時の初期化処理です。初期化処理を作成するには`init`を使用します。

```swift
class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
       self.name = name
    }

    func simpleDescription() -> String {
       return "A shape with \(numberOfSides) sides."
    }
}
```

`self`を使って、プロパティ`name`と初期化引数`name`を区別する方法に注目してください。初期化引数は、インスタンス作成時に関数呼び出しのように渡されます。すべてのプロパティには値が代入されている必要があります。これは、プロパティ宣言時（`numberOfSides`のように）や初期化処理内（`name`のように）で行います。

オブジェクトの破棄前にクリーンアップ処理が必要な場合、`deinit`を使用してデイニシャライザを作成します。

サブクラスを作成するには、クラス名の後にコロン`:`でスーパークラス名を続けて記述します。クラスは標準のルートクラスを継承する必要はないため、スーパークラスを指定するかどうかは任意です。

```swift
class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }

    func area() -> Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

::: info Experiment
`NamedShape`を継承する`Circle`クラスを作成し、半径と名前を初期化引数として受け取るようにしてください。また、`area()`メソッドと`simpleDescription()`メソッドを実装してください。
:::

プロパティには**getter**と**setter**を持たせることができます。

```swift
class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }

    var perimeter: Double {
        get {
             return 3.0 * sideLength
        }
        set {
            sideLength = newValue / 3.0
        }
    }

    override func simpleDescription() -> String {
        return "An equilateral triangle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
// "9.3" と表示されます
triangle.perimeter = 9.9
print(triangle.sideLength)
// "3.3000000000000003" と表示されます
```

`perimeter`のsetterでは、新しい値は暗黙的に`newValue`という名前で参照されます。明示的な名前を指定する場合は、`set`の後に括弧内で名前を記述します。

`EquilateralTriangle`クラスの初期化処理は、次の3つのステップから成り立っています：

1. サブクラスが宣言するプロパティの値を設定する。
2. スーパークラスの初期化処理を呼び出す。
3. スーパークラスで定義されたプロパティの値を変更する。

`willSet`や`didSet`を使うと、プロパティの値が変更される前後にコードを実行できます。

```swift
class TriangleAndSquare {
    var triangle: EquilateralTriangle {
        willSet {
            square.sideLength = newValue.sideLength
        }
    }
    var square: Square {
        willSet {
            triangle.sideLength = newValue.sideLength
        }
    }
    init(size: Double, name: String) {
        square = Square(sideLength: size, name: name)
        triangle = EquilateralTriangle(sideLength: size, name: name)
    }
}
var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
print(triangleAndSquare.square.sideLength)
// "10.0" と表示されます
print(triangleAndSquare.triangle.sideLength)
// "10.0" と表示されます
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
print(triangleAndSquare.triangle.sideLength)
// "50.0" と表示されます
```

オプショナル値を扱う際には、`?`を使ってメソッドやプロパティ、サブスクリプトを記述できます。`?`の前の値が`nil`の場合、その後のすべての操作は無視され、式全体の値は`nil`になります。それ以外の場合、オプショナル値はアンラップされ、その後の操作はアンラップされた値に対して行われます。

```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

## 列挙型と構造体

`enum`を使用して列挙型を作成します。クラスや他の名前付き型と同様に、列挙型にはメソッドを関連付けることができます。

```swift
enum Rank: Int {
    case ace = 1
    case two, three, four, five, six, seven, eight, nine, ten
    case jack, queen, king

    func simpleDescription() -> String {
        switch self {
        case .ace:
            return "ace"
        case .jack:
            return "jack"
        case .queen:
            return "queen"
        case .king:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
}
let ace = Rank.ace
let aceRawValue = ace.rawValue
```

::: info Experiment
2つの`Rank`値を比較して、生の値を基準にして比較する関数を書いてください。
:::

デフォルトでは、Swiftは生の値を0から順に1ずつ増やして割り当てますが、この動作は明示的に値を指定することで変更できます。上の例では、`ace`に生の値1を与え、残りの値は順に割り当てられます。文字列や浮動小数点数も列挙型の生の型として使用できます。生の値には`rawValue`プロパティを使ってアクセスします。

`init?(rawValue:)`初期化子を使って、生の値から列挙型のインスタンスを作成できます。一致するケースがない場合は`nil`が返されます。

```swift
if let convertedRank = Rank(rawValue: 3) {
    let threeDescription = convertedRank.simpleDescription()
}
```

列挙型のケース値は実際の値であり、生の値の別の表現ではありません。意味のある生の値がない場合は、指定する必要はありません。

```swift
enum Suit {
    case spades, hearts, diamonds, clubs

    func simpleDescription() -> String {
        switch self {
        case .spades:
            return "spades"
        case .hearts:
            return "hearts"
        case .diamonds:
            return "diamonds"
        case .clubs:
            return "clubs"
        }
    }
}
let hearts = Suit.hearts
let heartsDescription = hearts.simpleDescription()
```

::: info Experiment
`Suit`に`color()`メソッドを追加し、スペードとクラブは「black」、ハートとダイヤモンドは「red」を返すようにしてください。
:::

上の例では、`hearts`ケースは2通りの方法で参照されています：`hearts`定数に値を代入する際には`Suit.hearts`の完全な名前を使用していますが、`switch`内では省略形の`.hearts`を使用しています。これは、`self`がすでに`Suit`型であることが分かっているためです。値の型がすでに分かっている場合、省略形を使用できます。

列挙型に生の値がある場合、その値は宣言時に決定され、特定のケースのインスタンスは常に同じ生の値を持ちます。一方、**関連値**を持つケースでは、インスタンスごとに異なる値を指定できます。関連値は列挙型のケースインスタンスの格納プロパティのように動作します。

```swift
enum ServerResponse {
    case result(String, String)
    case failure(String)
}

let success = ServerResponse.result("6:00 am", "8:09 pm")
let failure = ServerResponse.failure("Out of cheese.")

switch success {
case let .result(sunrise, sunset):
    print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
case let .failure(message):
    print("Failure... \(message)")
}
// "Sunrise is at 6:00 am and sunset is at 8:09 pm." と表示されます
```

::: info Experiment
`ServerResponse`に3番目のケースを追加し、`switch`文にも対応するケースを追加してください。
:::

`ServerResponse`の値が`switch`のケースにマッチする際に、関連値`sunrise`や`sunset`が抽出されていることに注目してください。

`struct`を使用して構造体を作成します。構造体はメソッドや初期化子をサポートする点でクラスと似ていますが、重要な違いとして、**構造体は常にコピーされて渡され、クラスは参照で渡される**という点があります。

```swift
struct Card {
    var rank: Rank
    var suit: Suit
    func simpleDescription() -> String {
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
    }
}
let threeOfSpades = Card(rank: .three, suit: .spades)
let threeOfSpadesDescription = threeOfSpades.simpleDescription()
```

::: info Experiment
`rank`と`suit`のすべての組み合わせを含む、完全なトランプのデッキを返す関数を書いてください。
:::

## 並行処理

`async`を使用して非同期に実行される関数をマークします。

```swift
func fetchUserID(from server: String) async -> Int {
    if server == "primary" {
        return 97
    }
    return 501
}
```

非同期関数を呼び出す場合、`await`を前に書いて待機を示します。

```swift
func fetchUsername(from server: String) async -> String {
    let userID = await fetchUserID(from: server)
    if userID == 501 {
        return "John Appleseed"
    }
    return "Guest"
}
```

`async let`を使うと、非同期関数を呼び出して他の非同期コードと並行して実行できます。返される値を使用する際は`await`を書きます。

```swift
func connectUser(to server: String) async {
    async let userID = fetchUserID(from: server)
    async let username = fetchUsername(from: server)
    let greeting = await "Hello \(username), user ID \(userID)"
    print(greeting)
}
```

`Task`を使って同期コードから非同期関数を呼び出します。この場合、戻り値を待つ必要はありません。

```swift
Task {
    await connectUser(to: "primary")
}
// "Hello Guest, user ID 97" と表示されます
```

タスクグループを使用して並行コードを構造化します。

```swift
let userIDs = await withTaskGroup(of: Int.self) { group in
    for server in ["primary", "secondary", "development"] {
        group.addTask {
            return await fetchUserID(from: server)
        }
    }

    var results: [Int] = []
    for await result in group {
        results.append(result)
    }
    return results
}
```

`actor`はクラスに似ていますが、非同期関数が同じ`actor`インスタンスに安全にアクセスできるようにします。

```swift
actor ServerConnection {
    var server: String = "primary"
    private var activeUsers: [Int] = []
    func connect() async -> Int {
        let userID = await fetchUserID(from: server)
        // ... サーバーと通信 ...
        activeUsers.append(userID)
        return userID
    }
}
```

`actor`のメソッドを呼び出す、またはプロパティにアクセスする際は`await`を使用して、そのコードが他のタスクの完了を待つ可能性があることを示します。

```swift
let server = ServerConnection()
let userID = await server.connect()
```

## プロトコルと拡張

`protocol`を使ってプロトコルを宣言します。

```swift
protocol ExampleProtocol {
     var simpleDescription: String { get }
     mutating func adjust()
}
```

クラス、列挙型、構造体はすべてプロトコルを採用できます。

```swift
class SimpleClass: ExampleProtocol {
     var simpleDescription: String = "A very simple class."
     var anotherProperty: Int = 69105
     func adjust() {
          simpleDescription += "  Now 100% adjusted."
     }
}
var a = SimpleClass()
a.adjust()
let aDescription = a.simpleDescription


struct SimpleStructure: ExampleProtocol {
     var simpleDescription: String = "A simple structure"
     mutating func adjust() {
          simpleDescription += " (adjusted)"
     }
}
var b = SimpleStructure()
b.adjust()
let bDescription = b.simpleDescription
```

::: info Experiment
`ExampleProtocol`に別の要件を追加してください。`SimpleClass`と`SimpleStructure`が引き続きプロトコルに準拠するために必要な変更を行ってください。
:::

`SimpleStructure`では`mutating`キーワードが必要です。これは構造体のメソッドがインスタンスを変更することを示します。一方、クラスのメソッドには`mutating`を付ける必要はありません。

`extension`を使用して、既存の型に機能（新しいメソッドや計算プロパティ）を追加できます。拡張を使うことで、他で宣言された型やライブラリからインポートした型にプロトコル準拠を追加できます。

```swift
extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    mutating func adjust() {
        self += 42
    }
}
print(7.simpleDescription)
// "The number 7" と表示されます
```

::: info Experiment
`Double`型に`absoluteValue`プロパティを追加する拡張を書いてください。
:::

プロトコル名は他の型と同様に使用できます。例えば、異なる型を持つオブジェクトのコレクションを作成する際に、すべてのオブジェクトが同じプロトコルに準拠している場合です。

```swift
let protocolValue: any ExampleProtocol = a
print(protocolValue.simpleDescription)
// "A very simple class.  Now 100% adjusted." と表示されます
// print(protocolValue.anotherProperty)  // コメントを外すとエラーが発生します
```

`protocolValue`の実行時型は`SimpleClass`ですが、コンパイラはこれを`ExampleProtocol`型として扱います。そのため、プロトコル準拠以外のメソッドやプロパティに誤ってアクセスすることはありません。

## エラーハンドリング

`Error`プロトコルに準拠した任意の型を使用してエラーを表現します。

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}
```

`throw`を使ってエラーを投げ、`throws`を使って関数がエラーを投げる可能性があることを示します。関数内でエラーが投げられると、関数は即座に戻り、呼び出し元がエラーを処理します。

```swift
func send(job: Int, toPrinter printerName: String) throws -> String {
    if printerName == "Never Has Toner" {
        throw PrinterError.noToner
    }
    return "Job sent"
}
```

エラーの処理にはいくつかの方法があります。1つは`do-catch`を使用する方法です。`do`ブロック内でエラーを投げる可能性のあるコードには`try`を前に書きます。`catch`ブロック内では、エラーはデフォルトで`error`という名前で参照されますが、別の名前を付けることもできます。

```swift
do {
    let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
    print(printerResponse)
} catch {
    print(error)
}
// "Job sent" と表示されます
```

::: info Experiment
プリンタ名を`"Never Has Toner"`に変更して、`send(job:toPrinter:)`関数がエラーを投げるようにしてください。
:::

複数の`catch`ブロックを用意して、特定のエラーを処理することもできます。`catch`の後に`switch`の`case`と同じようにパターンを書きます。

```swift
do {
    let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
    print(printerResponse)
} catch PrinterError.onFire {
    print("I'll just put this over here, with the rest of the fire.")
} catch let printerError as PrinterError {
    print("Printer error: \(printerError).")
} catch {
    print(error)
}
// "Job sent" と表示されます
```

::: info Experiment
`do`ブロック内でエラーを投げるコードを追加してください。最初の`catch`ブロック、2番目、3番目のブロックがどのエラーを処理するか確認してください。
:::

別の方法として`try?`を使用して、結果をオプショナル型に変換できます。関数がエラーを投げた場合、エラーは無視され、結果は`nil`になります。それ以外の場合、結果はオプショナルに含まれます。

```swift
let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
```

`defer`を使用すると、関数が終了する直前に実行されるコードブロックを書けます。`defer`のコードは関数がエラーを投げた場合でも必ず実行されます。

```swift
var fridgeIsOpen = false
let fridgeContent = ["milk", "eggs", "leftovers"]

func fridgeContains(_ food: String) -> Bool {
    fridgeIsOpen = true
    defer {
        fridgeIsOpen = false
    }

    let result = fridgeContent.contains(food)
    return result
}
if fridgeContains("banana") {
    print("Found a banana")
}
print(fridgeIsOpen)
// "false" と表示されます
```

## ジェネリクス

角括弧`<>`内に名前を書いてジェネリック関数や型を作成します。

```swift
func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
    var result: [Item] = []
    for _ in 0..<numberOfTimes {
         result.append(item)
    }
    return result
}
makeArray(repeating: "knock", numberOfTimes: 4)
```

ジェネリック関数やメソッド、クラス、列挙型、構造体も作成できます。

```swift
// Swift標準ライブラリのOptional型の再実装
enum OptionalValue<Wrapped> {
    case none
    case some(Wrapped)
}
var possibleInteger: OptionalValue<Int> = .none
possibleInteger = .some(100)
```

`where`を使用して、特定の要件を指定します。例えば、型がプロトコルに準拠していることや、2つの型が等しいこと、または特定のスーパークラスを持つことを指定できます。

```swift
func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
    where T.Element: Equatable, T.Element == U.Element
{
    for lhsItem in lhs {
        for rhsItem in rhs {
            if lhsItem == rhsItem {
                return true
            }
        }
    }
   return false
}
anyCommonElements([1, 2, 3], [3])
```

::: info Experiment
`anyCommonElements(_:_:)`関数を修正して、2つのシーケンスに共通する要素の配列を返す関数にしてください。
:::

`<T: Equatable>`と書くことは、`<T> ... where T: Equatable`と同じ意味です。