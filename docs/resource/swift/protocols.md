# プロトコル

準拠する型が実装しなければならない要件を定義します。

プロトコルは、特定のタスクや機能に適したメソッド、プロパティ、およびその他の要件の設計図を定義します。プロトコルは、クラス、構造体、または列挙型によって採用され、これらの要件の実際の実装を提供できます。プロトコルの要件を満たす型は、そのプロトコルに準拠していると言います。

準拠する型が実装しなければならない要件を指定することに加えて、プロトコルを拡張してこれらの要件の一部を実装したり、準拠する型が利用できる追加の機能を実装したりすることもできます。

## プロトコルの構文

プロトコルは、クラス、構造体、および列挙型と非常に似た方法で定義します。

```swift
protocol SomeProtocol {
    // プロトコルの定義はここに記述します
}
```

カスタム型は、定義の一部として型名の後にコロンで区切ってプロトコル名を配置することで、特定のプロトコルを採用することを示します。複数のプロトコルをリストすることができ、カンマで区切られます。

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // 構造体の定義はここに記述します
}
```

クラスにスーパークラスがある場合、採用するプロトコルの前にスーパークラス名をリストし、カンマで区切ります。

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // クラスの定義はここに記述します
}
```

> **注:** プロトコルは型であるため、他のSwiftの型（`Int`、`String`、`Double`など）の名前と一致するように、名前を大文字で始めます（例：`FullyNamed`、`RandomNumberGenerator`）。

## プロパティ要件

プロトコルは、準拠する型が特定の名前と型のインスタンスプロパティまたはタイププロパティを提供することを要求できます。プロトコルは、プロパティが格納プロパティであるべきか計算プロパティであるべきかを指定しません。プロトコルは、必要なプロパティ名と型のみを指定します。また、各プロパティが取得可能であるべきか、取得および設定可能であるべきかも指定します。

プロトコルがプロパティを取得および設定可能であることを要求する場合、そのプロパティ要件は定数格納プロパティや読み取り専用計算プロパティでは満たされません。プロトコルがプロパティを取得可能であることのみを要求する場合、その要件は任意の種類のプロパティで満たすことができ、必要に応じてプロパティを設定可能にすることも有効です。

プロパティ要件は常に変数プロパティとして宣言され、`var`キーワードで始まります。取得および設定可能なプロパティは、型宣言の後に`{ get set }`と記述し、取得可能なプロパティは`{ get }`と記述します。

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

プロトコルでタイププロパティ要件を定義する場合は、常に`static`キーワードを使用してプレフィックスを付けます。このルールは、クラスによって実装される場合にタイププロパティ要件が`class`または`static`キーワードでプレフィックスされる場合でも適用されます。

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

ここに、単一のインスタンスプロパティ要件を持つプロトコルの例があります。

```swift
protocol FullyNamed {
    var fullName: String { get }
}
```

`FullyNamed`プロトコルは、準拠する型が完全な名前を提供することを要求します。プロトコルは、準拠する型の性質について他に何も指定しません。プロトコルは、`FullyNamed`型が`String`型の取得可能なインスタンスプロパティ`fullName`を持つ必要があることを指定します。

ここに、`FullyNamed`プロトコルを採用し、準拠する単純な構造体の例があります。

```swift
struct Person: FullyNamed {
    var fullName: String
}
let john = Person(fullName: "John Appleseed")
// john.fullNameは"John Appleseed"です
```

この例では、特定の名前を持つ人物を表す`Person`という構造体を定義しています。定義の最初の行で`FullyNamed`プロトコルを採用することを示しています。

各`Person`インスタンスには、`String`型の単一の格納プロパティ`fullName`があります。これは`FullyNamed`プロトコルの単一の要件に一致し、`Person`がプロトコルに正しく準拠していることを意味します（プロトコル要件が満たされていない場合、Swiftはコンパイル時にエラーを報告します）。

ここに、`FullyNamed`プロトコルを採用し、準拠するより複雑なクラスの例があります。

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullNameは"USS Enterprise"です
```

このクラスは、宇宙船のための読み取り専用の計算プロパティとして`fullName`プロパティ要件を実装しています。各`Starship`クラスインスタンスは、必須の名前とオプションのプレフィックスを格納します。`fullName`プロパティは、プレフィックスの値が存在する場合はそれを使用し、名前の先頭に追加して宇宙船の完全な名前を作成します。

## メソッド要件

プロトコルは、準拠する型が特定のインスタンスメソッドおよびタイプメソッドを実装することを要求できます。これらのメソッドは、通常のインスタンスメソッドおよびタイプメソッドとまったく同じ方法でプロトコルの定義の一部として記述されますが、中括弧やメソッド本体はありません。可変長引数は通常のメソッドと同じルールに従って許可されます。ただし、プロトコルの定義内でメソッドパラメータのデフォルト値を指定することはできません。

タイププロパティ要件と同様に、プロトコルで定義されるタイプメソッド要件には常に`static`キーワードをプレフィックスします。これは、クラスによって実装される場合にタイプメソッド要件が`class`または`static`キーワードでプレフィックスされる場合でも同様です。

```swift
protocol SomeProtocol {
    static func someTypeMethod()
}
```

次の例は、単一のインスタンスメソッド要件を持つプロトコルを定義しています。

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

この`RandomNumberGenerator`プロトコルは、準拠する型が`random`というインスタンスメソッドを持ち、このメソッドが呼び出されるたびに`Double`値を返すことを要求します。プロトコルの一部として指定されていませんが、この値は0.0から1.0未満の数値であると想定されます。

`RandomNumberGenerator`プロトコルは、各ランダム数がどのように生成されるかについては何も仮定しません。単に新しいランダム数を生成する標準的な方法を提供することを要求します。

ここに、`RandomNumberGenerator`プロトコルを採用し、準拠するクラスの実装例があります。このクラスは、線形合同法として知られる疑似乱数生成アルゴリズムを実装しています。

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
        lastRandom = ((lastRandom * a + c)
            .truncatingRemainder(dividingBy:m))
        return lastRandom / m
    }
}
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// "Here's a random number: 0.3746499199817101"と表示されます
print("And another one: \(generator.random())")
// "And another one: 0.729023776863283"と表示されます
```

## 変更メソッドの要件

メソッドが所属するインスタンスを変更（またはミューテート）する必要がある場合があります。値型（構造体や列挙型）のインスタンスメソッドの場合、メソッドが所属するインスタンスおよびそのインスタンスのプロパティを変更できることを示すために、メソッドの `func` キーワードの前に `mutating` キーワードを置きます。このプロセスについては[インスタンスメソッドからの値型の変更](https://docs.swift.org/swift-book/LanguageGuide/Methods.html#ID239)で説明されています。

プロトコルのインスタンスメソッド要件を定義する際に、そのメソッドがプロトコルを採用する任意の型のインスタンスを変更することを意図している場合は、プロトコルの定義の一部としてメソッドに `mutating` キーワードを付けます。これにより、構造体や列挙型がプロトコルを採用し、そのメソッド要件を満たすことができます。

> **注:** プロトコルのインスタンスメソッド要件に `mutating` キーワードを付けた場合、そのメソッドをクラスで実装する際には `mutating` キーワードを記述する必要はありません。`mutating` キーワードは構造体や列挙型でのみ使用されます。

以下の例では、`Togglable` というプロトコルを定義しており、単一のインスタンスメソッド要件 `toggle` を定義しています。その名前が示すように、`toggle()` メソッドは、通常、その型のプロパティを変更することによって、任意の準拠型の状態を切り替えまたは反転させることを意図しています。

`toggle()` メソッドは、呼び出されたときに準拠インスタンスの状態を変更することが期待されることを示すために、`Togglable` プロトコルの定義の一部として `mutating` キーワードが付けられています：

```swift
protocol Togglable {
    mutating func toggle()
}
```

構造体や列挙型に対して `Togglable` プロトコルを実装する場合、その構造体や列挙型は `mutating` とマークされた `toggle()` メソッドの実装を提供することでプロトコルに準拠できます。

以下の例では、`OnOffSwitch` という列挙型を定義しています。この列挙型は、`on` と `off` の列挙ケースによって示される2つの状態を切り替えます。列挙型の `toggle` 実装は、`Togglable` プロトコルの要件に一致するように `mutating` とマークされています：

```swift
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}
var lightSwitch = OnOffSwitch.off
lightSwitch.toggle()
// lightSwitch は現在 .on と等しい
```

## イニシャライザの要件

プロトコルは、準拠する型によって実装される特定のイニシャライザを要求することができます。これらのイニシャライザは、通常のイニシャライザと同じ方法でプロトコルの定義の一部として記述しますが、波括弧やイニシャライザ本体は含まれません：

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

### プロトコルイニシャライザ要件のクラス実装

プロトコルのイニシャライザ要件を準拠するクラスで実装する場合、それを指定イニシャライザまたはコンビニエンスイニシャライザとして実装できます。いずれの場合も、イニシャライザの実装には `required` 修飾子を付ける必要があります：

```swift
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        // イニシャライザの実装がここに入ります
    }
}
```

`required` 修飾子の使用により、準拠するクラスのすべてのサブクラスでイニシャライザ要件の明示的または継承された実装を提供し、それらもプロトコルに準拠することが保証されます。

`required` イニシャライザについての詳細は、[必須イニシャライザ](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID216)を参照してください。

> **注:** `final` 修飾子が付いたクラスでは、プロトコルのイニシャライザ実装に `required` 修飾子を付ける必要はありません。`final` クラスはサブクラス化できないためです。`final` 修飾子についての詳細は、[オーバーライドの防止](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html#ID199)を参照してください。

サブクラスがスーパークラスの指定イニシャライザをオーバーライドし、かつプロトコルの一致するイニシャライザ要件を実装する場合、イニシャライザの実装には `required` と `override` の両方の修飾子を付けます：

```swift
protocol SomeProtocol {
    init()
}

class SomeSuperClass {
    init() {
        // イニシャライザの実装がここに入ります
    }
}

class SomeSubClass: SomeSuperClass, SomeProtocol {
    // SomeProtocol 準拠のための "required"; SomeSuperClass からの "override"
    required override init() {
        // イニシャライザの実装がここに入ります
    }
}
```

### 失敗可能なイニシャライザの要件

プロトコルは、準拠する型に対して失敗可能なイニシャライザ要件を定義することができます。これは[失敗可能なイニシャライザ](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID222)で定義されています。

失敗可能なイニシャライザ要件は、準拠する型の失敗可能または非失敗可能なイニシャライザによって満たすことができます。非失敗可能なイニシャライザ要件は、非失敗可能なイニシャライザまたは暗黙的にアンラップされた失敗可能なイニシャライザによって満たすことができます。

## 型としてのプロトコル

プロトコル自体は実際には機能を実装しません。それにもかかわらず、コード内でプロトコルを型として使用することができます。

プロトコルを型として使用する最も一般的な方法は、プロトコルをジェネリック制約として使用することです。ジェネリック制約を持つコードは、プロトコルに準拠する任意の型で動作し、具体的な型はAPIを使用するコードによって選択されます。たとえば、引数を取り、その引数の型がジェネリックである関数を呼び出すとき、呼び出し側が型を選択します。

不透明な型を持つコードは、プロトコルに準拠するある型で動作します。基になる型はコンパイル時に知られており、APIの実装がその型を選択しますが、その型の識別はAPIのクライアントから隠されています。不透明な型を使用すると、関数からの具体的な戻り値の型を隠し、値が特定のプロトコルに準拠していることだけを保証することで、抽象化の層を通じてAPIの実装の詳細が漏れるのを防ぐことができます。

ボックス化されたプロトコル型を持つコードは、実行時に選択されたプロトコルに準拠する任意の型で動作します。この実行時の柔軟性をサポートするために、Swiftは必要に応じて間接参照のレベルを追加します。これをボックスと呼び、パフォーマンスコストがかかります。この柔軟性のため、Swiftはコンパイル時に基になる型を知ることができず、プロトコルによって要求されるメンバーのみアクセスできます。基になる型の他のAPIにアクセスするには、実行時にキャストが必要です。

ジェネリック制約としてプロトコルを使用する方法については、[ジェネリクス](https://docs.swift.org/swift-book/LanguageGuide/Generics.html)を参照してください。不透明な型とボックス化されたプロトコル型については、[不透明型とボックス化されたプロトコル型](https://docs.swift.org/swift-book/LanguageGuide/OpaqueTypes.html)を参照してください。

## デリゲーション

デリゲーションは、クラスや構造体がその責任の一部を別の型のインスタンスに引き渡す（または委任する）ことを可能にするデザインパターンです。このデザインパターンは、委任された責任をカプセル化するプロトコルを定義することによって実装され、準拠する型（デリゲートと呼ばれる）が委任された機能を提供することが保証されます。デリゲーションは、特定のアクションに応答するため、または外部ソースからデータを取得するために使用され、そのソースの基礎となる型を知る必要はありません。

以下の例では、サイコロゲームを定義し、ゲームの進行を追跡するデリゲートのためのネストされたプロトコルを定義しています：

```swift
class DiceGame {
    let sides: Int
    let generator = LinearCongruentialGenerator()
    weak var delegate: Delegate?

    init(sides: Int) {
        self.sides = sides
    }

    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }

    func play(rounds: Int) {
        delegate?.gameDidStart(self)
        for round in 1...rounds {
            let player1 = roll()
            let player2 = roll()
            if player1 == player2 {
                delegate?.game(self, didEndRound: round, winner: nil)
            } else if player1 > player2 {
                delegate?.game(self, didEndRound: round, winner: 1)
            } else {
                delegate?.game(self, didEndRound: round, winner: 2)
            }
        }
        delegate?.gameDidEnd(self)
    }

    protocol Delegate: AnyObject {
        func gameDidStart(_ game: DiceGame)
        func game(_ game: DiceGame, didEndRound round: Int, winner: Int?)
        func gameDidEnd(_ game: DiceGame)
    }
}
```

`DiceGame`クラスは、各プレイヤーがサイコロを振り、最も高い数字を出したプレイヤーがラウンドに勝つゲームを実装しています。これは、サイコロの目を生成するために、章の前半で紹介した線形合同法ジェネレータを使用しています。

`DiceGame.Delegate`プロトコルは、サイコロゲームの進行を追跡するために採用できます。`DiceGame.Delegate`プロトコルは常にサイコロゲームの文脈で使用されるため、`DiceGame`クラスの内部にネストされています。プロトコルは、外部の宣言がジェネリックでない限り、構造体やクラスのような型宣言の内部にネストできます。型のネストに関する情報は、[ネストされた型](https://docs.swift.org/swift-book/LanguageGuide/NestedTypes.html)を参照してください。

強い参照サイクルを防ぐために、デリゲートは弱参照として宣言されます。弱参照に関する情報は、[クラスインスタンス間の強い参照サイクル](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID51)を参照してください。プロトコルをクラス専用にすることで、`DiceGame`クラスはそのデリゲートが弱参照を使用する必要があることを宣言できます。クラス専用のプロトコルは、[クラス専用プロトコル](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html#ID276)で説明されているように、`AnyObject`から継承することでマークされます。

`DiceGame.Delegate`は、ゲームの進行を追跡するための3つのメソッドを提供します。これらの3つのメソッドは、上記の`play(rounds:)`メソッドのゲームロジックに組み込まれています。`DiceGame`クラスは、新しいゲームが開始されたとき、新しいターンが始まったとき、またはゲームが終了したときにデリゲートメソッドを呼び出します。

`delegate`プロパティはオプショナルな`DiceGame.Delegate`であるため、`play(rounds:)`メソッドはデリゲートのメソッドを呼び出すたびにオプショナルチェーンを使用します。オプショナルチェーンに関する情報は、[オプショナルチェーン](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html)を参照してください。`delegate`プロパティが`nil`の場合、これらのデリゲート呼び出しは無視されます。`delegate`プロパティが`nil`でない場合、デリゲートメソッドが呼び出され、`DiceGame`インスタンスがパラメータとして渡されます。

次の例では、`DiceGame.Delegate`プロトコルを採用する`DiceGameTracker`クラスを示しています：

```swift
class DiceGameTracker: DiceGame.Delegate {
    var playerScore1 = 0
    var playerScore2 = 0
    func gameDidStart(_ game: DiceGame) {
        print("新しいゲームが始まりました")
        playerScore1 = 0
        playerScore2 = 0
    }
    func game(_ game: DiceGame, didEndRound round: Int, winner: Int?) {
        switch winner {
            case 1:
                playerScore1 += 1
                print("プレイヤー1がラウンド\(round)に勝ちました")
            case 2: playerScore2 += 1
                print("プレイヤー2がラウンド\(round)に勝ちました")
            default:
                print("ラウンドは引き分けでした")
        }
    }
    func gameDidEnd(_ game: DiceGame) {
        if playerScore1 == playerScore2 {
            print("ゲームは引き分けに終わりました。")
        } else if playerScore1 > playerScore2 {
            print("プレイヤー1が勝ちました！")
        } else {
            print("プレイヤー2が勝ちました！")
        }
    }
}
```

`DiceGameTracker`クラスは、`DiceGame.Delegate`プロトコルで要求される3つのメソッドすべてを実装しています。これらのメソッドを使用して、新しいゲームの開始時に両方のプレイヤーのスコアをゼロにし、各ラウンドの終了時にスコアを更新し、ゲームの終了時に勝者を発表します。

`DiceGame`と`DiceGameTracker`がどのように動作するかを示します：

```swift
let tracker = DiceGameTracker()
let game = DiceGame(sides: 6)
game.delegate = tracker
game.play(rounds: 3)
// 新しいゲームが始まりました
// プレイヤー2がラウンド1に勝ちました
// プレイヤー2がラウンド2に勝ちました
// プレイヤー1がラウンド3に勝ちました
// プレイヤー2が勝ちました！
```

## 拡張によるプロトコル準拠の追加

既存の型を拡張して新しいプロトコルを採用し、準拠させることができます。既存の型のソースコードにアクセスできなくても可能です。拡張は、既存の型に新しいプロパティ、メソッド、およびサブスクリプトを追加できるため、プロトコルが要求する要件を追加することができます。拡張に関する詳細は、[拡張](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)を参照してください。

> **注:** 型の既存のインスタンスは、その型に拡張でプロトコル準拠が追加されると、自動的にそのプロトコルを採用し、準拠します。

例えば、`TextRepresentable`というプロトコルは、テキストとして表現される方法を持つ任意の型によって実装できます。これは、自身の説明や現在の状態のテキストバージョンかもしれません：

```swift
protocol TextRepresentable {
    var textualDescription: String { get }
}
```

上記の`Dice`クラスは、`TextRepresentable`を採用し、準拠するように拡張できます：

```swift
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
```

この拡張は、`Dice`が元の実装で提供したのと同じ方法で新しいプロトコルを採用します。プロトコル名は型名の後にコロンで区切って提供され、プロトコルのすべての要件の実装が拡張の中括弧内に提供されます。

任意の`Dice`インスタンスは、今や`TextRepresentable`として扱うことができます：

```swift
let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())
print(d12.textualDescription)
// "A 12-sided dice"と表示されます
```

同様に、`SnakesAndLadders`ゲームクラスも`TextRepresentable`プロトコルを採用し、準拠するように拡張できます：

```swift
extension SnakesAndLadders: TextRepresentable {
    var textualDescription: String {
        return "A game of Snakes and Ladders with \(finalSquare) squares"
    }
}
print(game.textualDescription)
// "A game of Snakes and Ladders with 25 squares"と表示されます
```

## プロトコルへの条件付き準拠

ジェネリック型は、型のジェネリックパラメータがプロトコルに準拠している場合など、特定の条件下でのみプロトコルの要件を満たすことができます。ジェネリック型を条件付きでプロトコルに準拠させるには、型を拡張する際に制約をリストします。これらの制約は、採用するプロトコルの名前の後にジェネリックwhere句を書いて記述します。ジェネリックwhere句の詳細については、[ジェネリックwhere句](https://docs.swift.org/swift-book/LanguageGuide/Generics.html#ID184)を参照してください。

次の拡張は、`Array`インスタンスが`TextRepresentable`に準拠する要素を格納している場合に、`TextRepresentable`プロトコルに準拠するようにします。

```swift
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
```

```swift
let myDice = [d6, d12]
print(myDice.textualDescription)
// "[A 6-sided dice, A 12-sided dice]"と表示されます
```

## 拡張を使用したプロトコルの採用宣言

型がすでにプロトコルのすべての要件を満たしているが、まだそのプロトコルを採用していると宣言していない場合、空の拡張を使用してプロトコルを採用させることができます。

```swift
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}
extension Hamster: TextRepresentable {}
```

`Hamster`のインスタンスは、`TextRepresentable`が必要な場所で使用できるようになりました。

```swift
let simonTheHamster = Hamster(name: "Simon")
let somethingTextRepresentable: TextRepresentable = simonTheHamster
print(somethingTextRepresentable.textualDescription)
// "A hamster named Simon"と表示されます
```

> **注:** 型は、その要件を満たしているだけでは自動的にプロトコルを採用しません。常にプロトコルの採用を明示的に宣言する必要があります。

## 合成された実装を使用したプロトコルの採用

Swiftは、多くの単純なケースで`Equatable`、`Hashable`、および`Comparable`のプロトコル準拠を自動的に提供できます。この合成された実装を使用すると、プロトコルの要件を自分で実装するための繰り返しのボイラープレートコードを書く必要がなくなります。

Swiftは、次の種類のカスタム型に対して`Equatable`の合成された実装を提供します。

- `Equatable`プロトコルに準拠するストアドプロパティのみを持つ構造体
- `Equatable`プロトコルに準拠する関連型のみを持つ列挙型
- 関連型を持たない列挙型

`==`の合成された実装を受け取るには、元の宣言を含むファイルで`Equatable`に準拠することを宣言し、自分で`==`演算子を実装しないでください。`Equatable`プロトコルは`!=`のデフォルト実装を提供します。

以下の例は、`Vector2D`構造体に似た三次元位置ベクトル（`x`、`y`、`z`）の`Vector3D`構造体を定義しています。`x`、`y`、および`z`プロパティがすべて`Equatable`型であるため、`Vector3D`は等価演算子の合成された実装を受け取ります。

```swift
struct Vector3D: Equatable {
    var x = 0.0, y = 0.0, z = 0.0
}

let twoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let anotherTwoThreeFour = Vector3D(x: 2.0, y: 3.0, z: 4.0)
if twoThreeFour == anotherTwoThreeFour {
    print("これらの2つのベクトルも同等です。")
}
// "これらの2つのベクトルも同等です。"と表示されます
```

Swiftは、次の種類のカスタム型に対して`Hashable`の合成された実装を提供します。

- `Hashable`プロトコルに準拠するストアドプロパティのみを持つ構造体
- `Hashable`プロトコルに準拠する関連型のみを持つ列挙型
- 関連型を持たない列挙型

`hash(into:)`の合成された実装を受け取るには、元の宣言を含むファイルで`Hashable`に準拠することを宣言し、自分で`hash(into:)`メソッドを実装しないでください。

Swiftは、列挙型が生の値を持たない場合に`Comparable`の合成された実装を提供します。列挙型に関連型がある場合、それらはすべて`Comparable`プロトコルに準拠している必要があります。`<`の合成された実装を受け取るには、元の列挙型宣言を含むファイルで`Comparable`に準拠することを宣言し、自分で`<`演算子を実装しないでください。`Comparable`プロトコルのデフォルト実装である`<=`、`>`、および`>=`は、残りの比較演算子を提供します。

以下の例は、初心者、中級者、および専門家のケースを持つ`SkillLevel`列挙型を定義しています。専門家は、持っている星の数によってさらにランク付けされます。

```swift
enum SkillLevel: Comparable {
    case beginner
    case intermediate
    case expert(stars: Int)
}
var levels = [SkillLevel.intermediate, SkillLevel.beginner,
              SkillLevel.expert(stars: 5), SkillLevel.expert(stars: 3)]
for level in levels.sorted() {
    print(level)
}
// "beginner"と表示されます
// "intermediate"と表示されます
// "expert(stars: 3)"と表示されます
// "expert(stars: 5)"と表示されます
```

## プロトコル型のコレクション

プロトコルは、[型としてのプロトコル](#protocols-as-types)で述べたように、配列や辞書などのコレクションに格納する型として使用できます。この例では、`TextRepresentable`なものの配列を作成します。

```swift
let things: [TextRepresentable] = [game, d12, simonTheHamster]
```

配列内のアイテムを反復処理し、各アイテムのテキスト記述を印刷することができます。

```swift
for thing in things {
    print(thing.textualDescription)
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

`thing`定数は`TextRepresentable`型であることに注意してください。実際のインスタンスが`Dice`、`DiceGame`、または`Hamster`のいずれかの型であっても、`TextRepresentable`型です。それにもかかわらず、`TextRepresentable`型であるため、`TextRepresentable`なものはすべて`textualDescription`プロパティを持っていることが知られているため、ループのたびに`thing.textualDescription`に安全にアクセスできます。

## プロトコルの継承

プロトコルは他のプロトコルを1つ以上継承し、継承した要件にさらに要件を追加することができます。プロトコル継承の構文はクラス継承の構文に似ていますが、カンマで区切って複数の継承プロトコルをリストするオプションがあります。

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // プロトコルの定義がここに入ります
}
```

以下は、上記の `TextRepresentable` プロトコルを継承するプロトコルの例です。

```swift
protocol PrettyTextRepresentable: TextRepresentable {
    var prettyTextualDescription: String { get }
}
```

この例では、`PrettyTextRepresentable` という新しいプロトコルを定義しており、`TextRepresentable` を継承しています。`PrettyTextRepresentable` を採用するものはすべて、`TextRepresentable` によって強制されるすべての要件を満たす必要があり、さらに `PrettyTextRepresentable` によって強制される追加の要件も満たす必要があります。この例では、`PrettyTextRepresentable` は `prettyTextualDescription` という名前の取得可能なプロパティを提供するという単一の要件を追加しています。このプロパティは `String` を返します。

`SnakesAndLadders` クラスは拡張して `PrettyTextRepresentable` を採用し、準拠することができます。

```swift
extension SnakesAndLadders: PrettyTextRepresentable {
    var prettyTextualDescription: String {
        var output = textualDescription + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}
```

この拡張は `PrettyTextRepresentable` プロトコルを採用し、`SnakesAndLadders` 型の `prettyTextualDescription` プロパティの実装を提供することを示しています。`PrettyTextRepresentable` であるものはすべて `TextRepresentable` でもある必要があるため、`prettyTextualDescription` の実装は `TextRepresentable` プロトコルから `textualDescription` プロパティにアクセスして出力文字列を開始します。コロンと改行を追加し、これをきれいなテキスト表現の開始として使用します。その後、ボードのマス目の配列を反復処理し、各マス目の内容を表す幾何学的な形を追加します。

- マス目の値が0より大きい場合、それははしごの基部であり、`▲` で表されます。
- マス目の値が0より小さい場合、それはヘビの頭であり、`▼` で表されます。
- それ以外の場合、マス目の値は0であり、それは「自由な」マス目であり、`○` で表されます。

`prettyTextualDescription` プロパティを使用して、任意の `SnakesAndLadders` インスタンスのきれいなテキスト説明を印刷できます。

```swift
print(game.prettyTextualDescription)
// 25マスのすごろくゲーム:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○
```

## クラス専用プロトコル

プロトコルの採用をクラス型に限定し（構造体や列挙型ではなく）、プロトコルの継承リストに `AnyObject` プロトコルを追加することができます。

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // クラス専用プロトコルの定義がここに入ります
}
```

上記の例では、`SomeClassOnlyProtocol` はクラス型のみが採用できます。`SomeClassOnlyProtocol` を採用しようとする構造体や列挙型の定義を書くと、コンパイル時エラーになります。

> **注:** プロトコルの要件によって定義される動作が、準拠する型が値セマンティクスではなく参照セマンティクスを持つことを前提としている場合、クラス専用プロトコルを使用します。参照セマンティクスと値セマンティクスの詳細については、[構造体と列挙型は値型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID88)および[クラスは参照型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID89)を参照してください。

## プロトコルの合成

複数のプロトコルに同時に準拠する型を要求することが有用な場合があります。プロトコル合成を使用して、複数のプロトコルを単一の要件に結合できます。プロトコル合成は、合成内のすべてのプロトコルの結合要件を持つ一時的なローカルプロトコルを定義したかのように振る舞います。プロトコル合成は新しいプロトコル型を定義しません。

プロトコル合成は `SomeProtocol & AnotherProtocol` の形式を持ちます。必要なだけ多くのプロトコルをリストでき、アンパサンド（`&`）で区切ります。プロトコルのリストに加えて、プロトコル合成には1つのクラス型を含めることもでき、これを使用して必要なスーパークラスを指定できます。

以下は、`Named` と `Aged` という2つのプロトコルを関数パラメータの単一のプロトコル合成要件に結合する例です。

```swift
protocol Named {
    var name: String { get }
}
protocol Aged {
    var age: Int { get }
}
struct Person: Named, Aged {
    var name: String
    var age: Int
}
func wishHappyBirthday(to celebrator: Named & Aged) {
    print("お誕生日おめでとう、\(celebrator.name)さん、\(celebrator.age)歳ですね！")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(to: birthdayPerson)
// "お誕生日おめでとう、Malcolmさん、21歳ですね！"と印刷されます
```

この例では、`Named` プロトコルには `name` という名前の取得可能な `String` プロパティの単一の要件があります。`Aged` プロトコルには `age` という名前の取得可能な `Int` プロパティの単一の要件があります。両方のプロトコルは `Person` という構造体によって採用されています。

この例では、`wishHappyBirthday(to:)` 関数も定義しています。`celebrator` パラメータの型は `Named & Aged` であり、これは「`Named` と `Aged` の両方のプロトコルに準拠する任意の型」を意味します。関数に渡される具体的な型は関係なく、必要なプロトコルの両方に準拠している限り有効です。

この例では、新しい `Person` インスタンスを作成し、`birthdayPerson` と呼び、この新しいインスタンスを `wishHappyBirthday(to:)` 関数に渡します。`Person` が両方のプロトコルに準拠しているため、この呼び出しは有効であり、`wishHappyBirthday(to:)` 関数は誕生日の挨拶を印刷できます。

以下は、前の例の `Named` プロトコルと `Location` クラスを結合する例です。

```swift
class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}
class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}
func beginConcert(in location: Location & Named) {
    print("こんにちは、\(location.name)！")
}

let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
beginConcert(in: seattle)
// "こんにちは、Seattle！"と印刷されます
```

`beginConcert(in:)` 関数は `Location & Named` 型のパラメータを取ります。これは「`Location` のサブクラスであり、`Named` プロトコルに準拠する任意の型」を意味します。この場合、`City` は両方の要件を満たしています。

`birthdayPerson` を `beginConcert(in:)` 関数に渡すことは無効です。なぜなら、`Person` は `Location` のサブクラスではないからです。同様に、`Named` プロトコルに準拠しない `Location` のサブクラスを作成した場合、その型のインスタンスを `beginConcert(in:)` に渡すことも無効です。

## プロトコル準拠の確認

プロトコル準拠を確認し、特定のプロトコルにキャストするには、[型キャスト](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html)で説明されている `is` および `as` 演算子を使用できます。プロトコルの確認とキャストは、型の確認とキャストとまったく同じ構文に従います。

- `is` 演算子は、インスタンスがプロトコルに準拠している場合は `true` を返し、準拠していない場合は `false` を返します。
- ダウンキャスト演算子の `as?` バージョンは、プロトコルの型のオプショナル値を返し、この値はインスタンスがそのプロトコルに準拠していない場合は `nil` になります。
- ダウンキャスト演算子の `as!` バージョンは、プロトコル型へのダウンキャストを強制し、ダウンキャストが成功しない場合はランタイムエラーを引き起こします。

この例では、`HasArea` というプロトコルを定義し、取得可能な `Double` プロパティである `area` という単一のプロパティ要件を持ちます。

```swift
protocol HasArea {
    var area: Double { get }
}
```

ここに、`HasArea` プロトコルに準拠する `Circle` と `Country` という2つのクラスがあります。

```swift
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}
```

`Circle` クラスは、格納された `radius` プロパティに基づいて、計算プロパティとして `area` プロパティ要件を実装します。`Country` クラスは、格納プロパティとして `area` 要件を直接実装します。両方のクラスは `HasArea` プロトコルに正しく準拠しています。

ここに、`HasArea` プロトコルに準拠していない `Animal` というクラスがあります。

```swift
class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}
```

`Circle`、`Country`、および `Animal` クラスは共通の基底クラスを持っていません。それにもかかわらず、これらはすべてクラスであるため、3つのタイプすべてのインスタンスを `AnyObject` 型の値を格納する配列を初期化するために使用できます。

```swift
let objects: [AnyObject] = [
    Circle(radius: 2.0),
    Country(area: 243_610),
    Animal(legs: 4)
]
```

`objects` 配列は、半径2単位の `Circle` インスタンス、イギリスの面積を平方キロメートルで初期化した `Country` インスタンス、および4本の脚を持つ `Animal` インスタンスを含む配列リテラルで初期化されます。

`objects` 配列を反復処理し、配列内の各オブジェクトが `HasArea` プロトコルに準拠しているかどうかを確認できます。

```swift
for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
// Area is 12.5663708
// Area is 243610.0
// Something that doesn't have an area
```

配列内のオブジェクトが `HasArea` プロトコルに準拠している場合、`as?` 演算子によって返されるオプショナル値は、オプショナルバインディングを使用して `objectWithArea` という定数にアンラップされます。`objectWithArea` 定数は `HasArea` 型であることがわかっているため、その `area` プロパティに型安全な方法でアクセスして印刷できます。

キャスティングプロセスによって基になるオブジェクトは変更されないことに注意してください。これらは引き続き `Circle`、`Country`、および `Animal` です。ただし、`objectWithArea` 定数に格納される時点では、`HasArea` 型であることしか知られていないため、その `area` プロパティにのみアクセスできます。

## プロトコルのオプション要件

プロトコルにオプションの要件を定義することができます。これらの要件は、プロトコルに準拠する型によって実装される必要はありません。オプションの要件は、プロトコルの定義の一部として `optional` 修飾子を付けて定義されます。オプションの要件は、Objective-Cと相互運用するコードを書くために利用できます。プロトコルとオプションの要件の両方に `@objc` 属性を付ける必要があります。`@objc` プロトコルはクラスによってのみ採用され、構造体や列挙型によっては採用されません。

オプションの要件でメソッドやプロパティを使用する場合、その型は自動的にオプションになります。例えば、型 `(Int) -> String` のメソッドは `((Int) -> String)?` になります。メソッドの戻り値ではなく、関数型全体がオプションでラップされることに注意してください。

オプションのプロトコル要件は、プロトコルに準拠する型が要件を実装していない可能性を考慮して、オプションチェーンを使用して呼び出すことができます。オプションのメソッドの実装を確認するには、呼び出すときにメソッド名の後に疑問符を付けて `someOptionalMethod?(someArgument)` のように書きます。オプションチェーンの詳細については、[オプションチェーン](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html)を参照してください。

次の例では、`Counter` という整数カウントクラスを定義し、外部データソースを使用してインクリメント量を提供します。このデータソースは、2つのオプション要件を持つ `CounterDataSource` プロトコルによって定義されます。

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}
```

`CounterDataSource` プロトコルは、`increment(forCount:)` というオプションのメソッド要件と `fixedIncrement` というオプションのプロパティ要件を定義しています。これらの要件は、`Counter` インスタンスに適切なインクリメント量を提供するための2つの異なる方法を定義しています。

> **注:** 厳密に言えば、どちらのプロトコル要件も実装せずに `CounterDataSource` に準拠するカスタムクラスを書くことができます。どちらもオプションだからです。技術的には可能ですが、これではあまり良いデータソースにはなりません。

以下に定義された `Counter` クラスには、`CounterDataSource?` 型のオプションの `dataSource` プロパティがあります。

```swift
class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}
```

`Counter` クラスは、現在の値を `count` という変数プロパティに格納します。`Counter` クラスは、メソッドが呼び出されるたびに `count` プロパティをインクリメントする `increment` というメソッドも定義しています。

`increment()` メソッドは最初に、データソースの `increment(forCount:)` メソッドの実装を探してインクリメント量を取得しようとします。`increment()` メソッドはオプションチェーンを使用して `increment(forCount:)` を呼び出し、現在の `count` 値をメソッドの唯一の引数として渡します。

ここでは、2つのレベルのオプションチェーンが使用されています。まず、`dataSource` が `nil` である可能性があるため、`dataSource` の名前の後に疑問符が付いており、`dataSource` が `nil` でない場合にのみ `increment(forCount:)` が呼び出されることを示しています。次に、`dataSource` が存在しても、`increment(forCount:)` を実装している保証はありません。これはオプションの要件だからです。ここでは、`increment(forCount:)` が実装されていない可能性もオプションチェーンで処理されています。`increment(forCount:)` が存在する場合にのみ呼び出されます。つまり、`increment(forCount:)` が `nil` でない場合にのみ呼び出されます。

`increment(forCount:)` の呼び出しは、これらの2つの理由のいずれかで失敗する可能性があるため、呼び出しはオプションの `Int` 値を返します。これは、`increment(forCount:)` が `CounterDataSource` の定義で非オプションの `Int` 値を返すと定義されているにもかかわらずです。2つのオプションチェーン操作が連続して行われても、結果は単一のオプションでラップされます。複数のオプションチェーン操作を使用する方法の詳細については、[複数レベルのチェーンのリンク](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html#ID246)を参照してください。

`increment(forCount:)` を呼び出した後、それが返すオプションの `Int` は、オプションバインディングを使用して `amount` という定数にアンラップされます。オプションの `Int` に値が含まれている場合、つまり、デリゲートとメソッドの両方が存在し、メソッドが値を返した場合、アンラップされた `amount` が格納された `count` プロパティに追加され、インクリメントが完了します。

`increment(forCount:)` メソッドから値を取得できない場合、つまり、`dataSource` が `nil` であるか、データソースが `increment(forCount:)` を実装していない場合、`increment()` メソッドは代わりにデータソースの `fixedIncrement` プロパティから値を取得しようとします。`fixedIncrement` プロパティもオプションの要件であるため、その値はオプションの `Int` 値です。これは、`fixedIncrement` が `CounterDataSource` プロトコル定義の一部として非オプションの `Int` プロパティとして定義されているにもかかわらずです。

ここでは、データソースがクエリされるたびに一定の値3を返すシンプルな `CounterDataSource` 実装を示します。これは、オプションの `fixedIncrement` プロパティ要件を実装することで実現しています。

```swift
class ThreeSource: NSObject, CounterDataSource {
    let fixedIncrement = 3
}
```

新しい `Counter` インスタンスのデータソースとして `ThreeSource` のインスタンスを使用できます。

```swift
var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
// 3
// 6
// 9
// 12
```

上記のコードは、新しい `Counter` インスタンスを作成し、そのデータソースを新しい `ThreeSource` インスタンスに設定し、カウンターの `increment()` メソッドを4回呼び出します。予想通り、`increment()` が呼び出されるたびにカウンターの `count` プロパティは3ずつ増加します。

次に、`TowardsZeroSource` というより複雑なデータソースを示します。これは、現在のカウント値からゼロに向かってカウントアップまたはカウントダウンする `Counter` インスタンスを作成します。

```swift
class TowardsZeroSource: NSObject, CounterDataSource {
    func increment(forCount count: Int) -> Int {
        if count == 0 {
            return 0
        } else if count < 0 {
            return 1
        } else {
            return -1
        }
    }
}
```

`TowardsZeroSource` クラスは、`CounterDataSource` プロトコルのオプションの `increment(forCount:)` メソッドを実装し、`count` 引数の値を使用してどの方向にカウントするかを決定します。`count` がすでにゼロの場合、メソッドは0を返して、これ以上カウントしないことを示します。

既存の `Counter` インスタンスを使用して、-4からゼロまでカウントするために `TowardsZeroSource` のインスタンスを使用できます。カウンターがゼロに達すると、それ以上のカウントは行われません。

```swift
counter.count = -4
counter.dataSource = TowardsZeroSource()
for _ in 1...5 {
    counter.increment()
    print(counter.count)
}
// -3
// -2
// -1
// 0
// 0
```

## プロトコル拡張

プロトコルは拡張して、メソッド、イニシャライザ、サブスクリプト、および計算プロパティの実装を準拠する型に提供できます。これにより、各型の個別の準拠やグローバル関数ではなく、プロトコル自体に動作を定義できます。

例えば、`RandomNumberGenerator`プロトコルは、必須の`random()`メソッドの結果を使用してランダムな`Bool`値を返す`randomBool()`メソッドを提供するように拡張できます。

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

プロトコルに拡張を作成することで、すべての準拠する型は追加の修正なしにこのメソッド実装を自動的に取得します。

```swift
let generator = LinearCongruentialGenerator()
print("ランダムな数値: \(generator.random())")
// "ランダムな数値: 0.3746499199817101"と表示されます
print("ランダムなブール値: \(generator.randomBool())")
// "ランダムなブール値: true"と表示されます
```

プロトコル拡張は準拠する型に実装を追加できますが、プロトコルを他のプロトコルに拡張または継承させることはできません。プロトコルの継承は常にプロトコル宣言自体で指定されます。

## デフォルト実装の提供

プロトコル拡張を使用して、そのプロトコルの任意のメソッドまたは計算プロパティ要件にデフォルト実装を提供できます。準拠する型が必須のメソッドやプロパティの独自の実装を提供する場合、その実装が拡張によって提供されるものの代わりに使用されます。

> **注:** 拡張によって提供されるデフォルト実装を持つプロトコル要件は、オプションのプロトコル要件とは異なります。準拠する型はどちらの実装も提供する必要はありませんが、デフォルト実装を持つ要件はオプショナルチェーンなしで呼び出すことができます。

例えば、`TextRepresentable`プロトコルを継承する`PrettyTextRepresentable`プロトコルは、必須の`prettyTextualDescription`プロパティのデフォルト実装を提供して、単に`textualDescription`プロパティにアクセスする結果を返すことができます。

```swift
extension PrettyTextRepresentable  {
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

## プロトコル拡張に制約を追加する

プロトコル拡張を定義する際に、拡張のメソッドやプロパティが利用可能になる前に準拠する型が満たすべき制約を指定できます。これらの制約は、拡張するプロトコルの名前の後にジェネリックwhere句を書いて指定します。ジェネリックwhere句の詳細については、[ジェネリックwhere句](https://docs.swift.org/swift-book/LanguageGuide/Generics.html#ID184)を参照してください。

例えば、要素が`Equatable`プロトコルに準拠する任意のコレクションに適用される`Collection`プロトコルの拡張を定義できます。コレクションの要素をSwift標準ライブラリの一部である`Equatable`プロトコルに制約することで、`==`および`!=`演算子を使用して2つの要素の等価性と不等価性をチェックできます。

```swift
extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        for element in self {
            if element != self.first {
                return false
            }
        }
        return true
    }
}
```

`allEqual()`メソッドは、コレクション内のすべての要素が等しい場合にのみ`true`を返します。

すべての要素が同じである整数の配列と、そうでない配列を考えてみましょう。

```swift
let equalNumbers = [100, 100, 100, 100, 100]
let differentNumbers = [100, 100, 200, 100, 200]
```

配列は`Collection`に準拠し、整数は`Equatable`に準拠しているため、`equalNumbers`と`differentNumbers`は`allEqual()`メソッドを使用できます。

```swift
print(equalNumbers.allEqual())
// "true"と表示されます
print(differentNumbers.allEqual())
// "false"と表示されます
```

> **注:** 準拠する型が同じメソッドやプロパティの実装を提供する複数の制約付き拡張の要件を満たす場合、Swiftは最も専門化された制約に対応する実装を使用します。