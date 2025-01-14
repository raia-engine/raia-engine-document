# メソッド

インスタンスまたは型の一部である関数を定義して呼び出します。

メソッドは特定の型に関連付けられた関数です。クラス、構造体、および列挙型はすべてインスタンスメソッドを定義でき、これらは特定の型のインスタンスを操作するための特定のタスクと機能をカプセル化します。クラス、構造体、および列挙型は、型自体に関連付けられた型メソッドも定義できます。型メソッドは、Objective-Cのクラスメソッドに似ています。

構造体や列挙型がSwiftでメソッドを定義できるという事実は、CやObjective-Cとは大きな違いです。Objective-Cでは、クラスだけがメソッドを定義できます。Swiftでは、クラス、構造体、または列挙型を定義するかどうかを選択でき、作成した型にメソッドを定義する柔軟性を持つことができます。

## インスタンスメソッド

インスタンスメソッドは、特定のクラス、構造体、または列挙型のインスタンスに属する関数です。これらのインスタンスの機能をサポートし、インスタンスプロパティへのアクセスや変更方法を提供したり、インスタンスの目的に関連する機能を提供したりします。インスタンスメソッドの構文は、関数の構文とまったく同じです（関数の説明を参照）。

インスタンスメソッドは、それが属する型の開き括弧と閉じ括弧の中に記述します。インスタンスメソッドは、その型の他のすべてのインスタンスメソッドおよびプロパティに暗黙的にアクセスできます。インスタンスメソッドは、それが属する型の特定のインスタンスでのみ呼び出すことができます。既存のインスタンスなしに単独で呼び出すことはできません。

以下は、アクションが発生した回数をカウントするために使用できるシンプルな`Counter`クラスを定義する例です：

```swift
class Counter {
    var count = 0
    func increment() {
        count += 1
    }
    func increment(by amount: Int) {
        count += amount
    }
    func reset() {
        count = 0
    }
}
```

`Counter`クラスは3つのインスタンスメソッドを定義しています：
- `increment()`はカウンターを1増やします。
- `increment(by: Int)`はカウンターを指定された整数分だけ増やします。
- `reset()`はカウンターをゼロにリセットします。

`Counter`クラスは、現在のカウンター値を追跡するための変数プロパティ`count`も宣言しています。

インスタンスメソッドはプロパティと同じドット構文で呼び出します：

```swift
let counter = Counter()
// 初期カウンター値は0です
counter.increment()
// カウンターの値は1になりました
counter.increment(by: 5)
// カウンターの値は6になりました
counter.reset()
// カウンターの値は0になりました
```

関数のパラメータには、関数の本体内で使用する名前と、関数を呼び出すときに使用する引数ラベルの両方を持つことができます（関数の引数ラベルとパラメータ名を参照）。メソッドのパラメータも同様です。メソッドは型に関連付けられた関数にすぎないためです。

## selfプロパティ

型の各インスタンスには、`self`と呼ばれる暗黙のプロパティがあり、これはインスタンス自体とまったく同じです。`self`プロパティを使用して、インスタンスメソッド内で現在のインスタンスを参照します。

上記の例の`increment()`メソッドは次のように書くこともできます：

```swift
func increment() {
    self.count += 1
}
```

実際には、コードに`self`を書く必要はあまりありません。`self`を明示的に書かない場合、Swiftはメソッド内で既知のプロパティまたはメソッド名を使用するたびに、現在のインスタンスのプロパティまたはメソッドを参照していると仮定します。この仮定は、`Counter`の3つのインスタンスメソッド内で`count`（`self.count`ではなく）を使用することで示されています。

このルールの主な例外は、インスタンスメソッドのパラメータ名がそのインスタンスのプロパティと同じ名前を持つ場合です。この場合、パラメータ名が優先され、プロパティ名をより明確に参照する必要があります。`self`プロパティを使用して、パラメータ名とプロパティ名を区別します。

ここでは、`self`がメソッドパラメータの`x`とインスタンスプロパティの`x`を区別しています：

```swift
struct Point {
    var x = 0.0, y = 0.0
    func isToTheRightOf(x: Double) -> Bool {
        return self.x > x
    }
}
let somePoint = Point(x: 4.0, y: 5.0)
if somePoint.isToTheRightOf(x: 1.0) {
    print("この点はx == 1.0の線の右側にあります")
}
// "この点はx == 1.0の線の右側にあります"と出力されます
```

`self`プレフィックスがなければ、Swiftは両方の`x`の使用がメソッドパラメータの`x`を指していると仮定します。

## インスタンスメソッド内からの値型の変更

構造体と列挙型は値型です。デフォルトでは、値型のプロパティはそのインスタンスメソッド内から変更することはできません。

ただし、特定のメソッド内で構造体や列挙型のプロパティを変更する必要がある場合、そのメソッドに対して変更可能な動作をオプトインできます。メソッドはそのメソッド内からプロパティを変更でき、そのメソッドが終了するときに行った変更が元の構造体に書き戻されます。メソッドは暗黙の`self`プロパティに完全に新しいインスタンスを割り当てることもでき、この新しいインスタンスはメソッドが終了するときに既存のインスタンスを置き換えます。

この動作にオプトインするには、そのメソッドの`func`キーワードの前に`mutating`キーワードを置きます：

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveBy(x: 2.0, y: 3.0)
print("点は現在(\(somePoint.x), \(somePoint.y))にあります")
// "点は現在(3.0, 4.0)にあります"と出力されます
```

上記の`Point`構造体は、`moveBy(x:y:)`という変更可能なメソッドを定義しており、`Point`インスタンスを特定の量だけ移動させます。このメソッドは新しい点を返すのではなく、実際に呼び出された点を変更します。この動作を有効にするために、定義に`mutating`キーワードが追加されています。

構造体型の定数に対して変更可能なメソッドを呼び出すことはできません。たとえそれが変数プロパティであっても、そのプロパティを変更することはできません（定数構造体インスタンスの格納プロパティを参照）：

```swift
let fixedPoint = Point(x: 3.0, y: 3.0)
fixedPoint.moveBy(x: 2.0, y: 3.0)
// これはエラーを報告します
```

## 変更可能なメソッド内でselfに割り当てる

変更可能なメソッドは、暗黙の`self`プロパティに完全に新しいインスタンスを割り当てることができます。上記の`Point`の例は、次のように書くこともできます：

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

このバージョンの変更可能な`moveBy(x:y:)`メソッドは、`x`と`y`の値がターゲット位置に設定された新しい構造体を作成します。このメソッドの代替バージョンを呼び出す最終結果は、以前のバージョンを呼び出す場合とまったく同じです。

列挙型の変更可能なメソッドは、暗黙の`self`パラメータを同じ列挙型の別のケースに設定できます：

```swift
enum TriStateSwitch {
    case off, low, high
    mutating func next() {
        switch self {
        case .off:
            self = .low
        case .low:
            self = .high
        case .high:
            self = .off
        }
    }
}
var ovenLight = TriStateSwitch.low
ovenLight.next()
// ovenLightは現在.highと等しい
ovenLight.next()
// ovenLightは現在.offと等しい
```

この例では、3状態のスイッチの列挙型を定義しています。このスイッチは、`next()`メソッドが呼び出されるたびに、3つの異なる電力状態（`off`、`low`、`high`）の間を循環します。

## 型メソッド

前述のインスタンスメソッドは、特定の型のインスタンスに対して呼び出すメソッドです。型自体に対して呼び出されるメソッドを定義することもできます。このようなメソッドは型メソッドと呼ばれます。型メソッドは、メソッドの `func` キーワードの前に `static` キーワードを記述することで示します。クラスは `class` キーワードを使用して、サブクラスがそのメソッドのスーパークラスの実装をオーバーライドできるようにすることができます。

> 注: Objective-Cでは、Objective-Cクラスに対してのみ型レベルのメソッドを定義できます。Swiftでは、すべてのクラス、構造体、および列挙型に対して型レベルのメソッドを定義できます。各型メソッドは、それがサポートする型に明示的にスコープされます。

型メソッドはインスタンスメソッドと同様にドット構文で呼び出されます。ただし、型メソッドはその型のインスタンスではなく、型自体に対して呼び出されます。以下は、`SomeClass` というクラスの型メソッドを呼び出す方法です：

```swift
class SomeClass {
    class func someTypeMethod() {
        // 型メソッドの実装がここに入ります
    }
}
SomeClass.someTypeMethod()
```

型メソッドの本体内では、暗黙の `self` プロパティはその型自体を参照し、その型のインスタンスではありません。これにより、インスタンスプロパティとインスタンスメソッドのパラメータと同様に、型プロパティと型メソッドのパラメータを区別するために `self` を使用できます。

より一般的には、型メソッドの本体内で使用する修飾されていないメソッドおよびプロパティ名は、他の型レベルのメソッドおよびプロパティを参照します。型メソッドは、型名のプレフィックスを付けずに他の型メソッドをそのメソッド名で呼び出すことができます。同様に、構造体および列挙型の型メソッドは、型名のプレフィックスなしで型プロパティにアクセスできます。

以下の例では、ゲームの異なるレベルやステージを通じてプレイヤーの進行状況を追跡する `LevelTracker` という構造体を定義しています。これはシングルプレイヤーゲームですが、1つのデバイスで複数のプレイヤーの情報を保存できます。

ゲームのすべてのレベル（レベル1を除く）は、ゲームが最初にプレイされたときにロックされています。プレイヤーがレベルをクリアするたびに、そのレベルはデバイス上のすべてのプレイヤーに対してアンロックされます。`LevelTracker` 構造体は、ゲームのどのレベルがアンロックされたかを追跡するために型プロパティとメソッドを使用します。また、個々のプレイヤーの現在のレベルも追跡します。

```swift
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1

    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel { highestUnlockedLevel = level }
    }

    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }

    @discardableResult
    mutating func advance(to level: Int) -> Bool {
        if LevelTracker.isUnlocked(level) {
            currentLevel = level
            return true
        } else {
            return false
        }
    }
}
```

`LevelTracker` 構造体は、任意のプレイヤーがアンロックした最高レベルを追跡します。この値は `highestUnlockedLevel` という型プロパティに保存されます。

`LevelTracker` は、`highestUnlockedLevel` プロパティを操作するために2つの型関数も定義しています。1つ目は `unlock(_)` という型関数で、新しいレベルがアンロックされるたびに `highestUnlockedLevel` の値を更新します。2つ目は `isUnlocked(_)` という便利な型関数で、特定のレベル番号がすでにアンロックされているかどうかを `true` で返します。（これらの型メソッドは、`LevelTracker.highestUnlockedLevel` と書かなくても `highestUnlockedLevel` 型プロパティにアクセスできます。）

型プロパティと型メソッドに加えて、`LevelTracker` は個々のプレイヤーのゲーム進行状況も追跡します。プレイヤーが現在プレイしているレベルを追跡するために `currentLevel` というインスタンスプロパティを使用します。

`currentLevel` プロパティを管理するために、`LevelTracker` は `advance(to:)` というインスタンスメソッドを定義しています。このメソッドは、新しいレベルがすでにアンロックされているかどうかを確認してから `currentLevel` を更新します。`advance(to:)` メソッドは、`currentLevel` を実際に設定できたかどうかを示すブール値を返します。このメソッドを呼び出すコードが戻り値を無視することが必ずしも間違いではないため、この関数には `@discardableResult` 属性が付けられています。この属性の詳細については、Attributesを参照してください。

`LevelTracker` 構造体は、以下に示す `Player` クラスと共に使用され、個々のプレイヤーの進行状況を追跡および更新します：

```swift
class Player {
    var tracker = LevelTracker()
    let playerName: String
    func complete(level: Int) {
        LevelTracker.unlock(level + 1)
        tracker.advance(to: level + 1)
    }
    init(name: String) {
        playerName = name
    }
}
```

`Player` クラスは、そのプレイヤーの進行状況を追跡するために新しい `LevelTracker` インスタンスを作成します。また、プレイヤーが特定のレベルをクリアするたびに呼び出される `complete(level:)` というメソッドも提供します。このメソッドは、すべてのプレイヤーに対して次のレベルをアンロックし、プレイヤーの進行状況を更新して次のレベルに移動させます。（`advance(to:)` のブール戻り値は無視されます。なぜなら、前の行で `LevelTracker.unlock(_:)` を呼び出すことでレベルがアンロックされたことがわかっているからです。）

新しいプレイヤーのために `Player` クラスのインスタンスを作成し、プレイヤーがレベル1をクリアしたときに何が起こるかを確認できます：

```swift
var player = Player(name: "Argyrios")
player.complete(level: 1)
print("最高アンロックレベルは現在 \(LevelTracker.highestUnlockedLevel) です")
// "最高アンロックレベルは現在 2 です" と出力されます
```

ゲーム内の他のプレイヤーによってまだアンロックされていないレベルにプレイヤーを移動させようとすると、そのプレイヤーの現在のレベルを設定しようとする試みは失敗します：

```swift
player = Player(name: "Beto")
if player.tracker.advance(to: 6) {
    print("プレイヤーは現在レベル6にいます")
} else {
    print("レベル6はまだアンロックされていません")
}
// "レベル6はまだアンロックされていません" と出力されます
```