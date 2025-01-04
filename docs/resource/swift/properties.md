# プロパティ

インスタンスまたは型の一部である格納値および計算値にアクセスします。

プロパティは特定のクラス、構造体、または列挙体に値を関連付けます。格納プロパティはインスタンスの一部として定数および変数の値を格納し、計算プロパティは値を格納するのではなく計算します。計算プロパティはクラス、構造体、および列挙体によって提供されます。格納プロパティはクラスおよび構造体によってのみ提供されます。

格納プロパティと計算プロパティは通常、特定の型のインスタンスに関連付けられます。ただし、プロパティは型自体に関連付けることもできます。このようなプロパティは型プロパティと呼ばれます。

さらに、プロパティの値の変更を監視し、カスタムアクションで応答できるプロパティオブザーバを定義することもできます。プロパティオブザーバは、自分で定義した格納プロパティや、サブクラスがスーパークラスから継承したプロパティに追加できます。

また、プロパティラッパーを使用して、複数のプロパティのゲッターおよびセッターでコードを再利用することもできます。

## 格納プロパティ

最も単純な形式では、格納プロパティは特定のクラスまたは構造体のインスタンスの一部として格納される定数または変数です。格納プロパティは、変数格納プロパティ（`var`キーワードで導入）または定数格納プロパティ（`let`キーワードで導入）のいずれかです。

格納プロパティには、定義の一部としてデフォルト値を提供できます（デフォルトプロパティ値で説明）。また、初期化中に格納プロパティの初期値を設定および変更することもできます。これは、定数格納プロパティの場合でも同様です（初期化中の定数プロパティの割り当てで説明）。

以下の例では、作成後に範囲の長さを変更できない整数の範囲を記述する`FixedLengthRange`という構造体を定義しています：

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
// この範囲は整数値0、1、および2を表します
rangeOfThreeItems.firstValue = 6
// この範囲は現在、整数値6、7、および8を表します
```

`FixedLengthRange`のインスタンスには、`firstValue`という変数格納プロパティと、`length`という定数格納プロパティがあります。上記の例では、`length`は新しい範囲が作成されたときに初期化され、その後変更できません。これは定数プロパティであるためです。

### 定数構造体インスタンスの格納プロパティ

構造体のインスタンスを作成し、そのインスタンスを定数に割り当てると、そのインスタンスのプロパティを変更することはできません。たとえそれらが変数プロパティとして宣言されていても：

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// この範囲は整数値0、1、2、および3を表します
rangeOfFourItems.firstValue = 6
// これはエラーを報告します。たとえfirstValueが変数プロパティであっても
```

`rangeOfFourItems`が定数（`let`キーワードで）として宣言されているため、`firstValue`プロパティを変更することはできません。たとえ`firstValue`が変数プロパティであってもです。

この動作は、構造体が値型であるためです。値型のインスタンスが定数としてマークされると、そのすべてのプロパティも定数になります。

クラスには同じことは当てはまりません。クラスは参照型です。参照型のインスタンスを定数に割り当てても、そのインスタンスの変数プロパティを変更できます。

### 遅延格納プロパティ

遅延格納プロパティは、初めて使用されるまで初期値が計算されないプロパティです。遅延格納プロパティを示すには、宣言の前に`lazy`修飾子を記述します。

> **注記**  
> 遅延プロパティは常に変数（`var`キーワードで）として宣言する必要があります。初期値はインスタンスの初期化が完了するまで取得されない可能性があるためです。定数プロパティは初期化が完了する前に常に値を持っている必要があるため、遅延として宣言することはできません。

遅延プロパティは、プロパティの初期値がインスタンスの初期化が完了するまで不明な外部要因に依存する場合に便利です。また、プロパティの初期値が複雑または計算コストの高いセットアップを必要とし、それが必要になるまで実行されるべきでない場合にも便利です。

以下の例では、複雑なクラスの不要な初期化を避けるために遅延格納プロパティを使用しています。この例では、`DataImporter`と`DataManager`という2つのクラスを定義していますが、どちらも完全には示されていません：

```swift
class DataImporter {
    /*
    DataImporterは外部ファイルからデータをインポートするクラスです。
    このクラスは初期化にかなりの時間がかかると想定されています。
    */
    var filename = "data.txt"
    // DataImporterクラスはここでデータインポート機能を提供します
}

class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    // DataManagerクラスはここでデータ管理機能を提供します
}

let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
// importerプロパティのDataImporterインスタンスはまだ作成されていません
```

`DataManager`クラスには、`data`という格納プロパティがあり、新しい空の`String`値の配列で初期化されます。その機能の残りは示されていませんが、この`DataManager`クラスの目的は、この`String`データの配列を管理し、アクセスを提供することです。

`DataManager`クラスの機能の一部は、ファイルからデータをインポートする機能です。この機能は、初期化にかなりの時間がかかると想定される`DataImporter`クラスによって提供されます。これは、`DataImporter`インスタンスが初期化されるときにファイルを開き、その内容をメモリに読み込む必要があるためかもしれません。

`DataManager`インスタンスがファイルからデータをインポートせずにデータを管理することが可能であるため、`DataManager`自体が作成されたときに新しい`DataImporter`インスタンスを作成するのは理にかなっていません。代わりに、`importer`プロパティが初めて使用される場合に`DataImporter`インスタンスを作成する方が理にかなっています。

`lazy`修飾子が付いているため、`importer`プロパティの`DataImporter`インスタンスは、`importer`プロパティが初めてアクセスされたときにのみ作成されます。たとえば、その`filename`プロパティがクエリされたときなどです：

```swift
print(manager.importer.filename)
// importerプロパティのDataImporterインスタンスが作成されました
// "data.txt"と表示されます
```

> **注記**  
> `lazy`修飾子が付いたプロパティが複数のスレッドによって同時にアクセスされ、そのプロパティがまだ初期化されていない場合、そのプロパティが一度だけ初期化される保証はありません。

### 格納プロパティとインスタンス変数

Objective-Cの経験がある場合、クラスインスタンスの一部として値や参照を格納するための2つの方法が提供されていることを知っているかもしれません。プロパティに加えて、インスタンス変数を使用してプロパティに格納される値のバックストアとして使用できます。

Swiftはこれらの概念を単一のプロパティ宣言に統合しています。Swiftプロパティには対応するインスタンス変数がなく、プロパティのバックストアに直接アクセスすることはありません。このアプローチは、異なるコンテキストで値がどのようにアクセスされるかについての混乱を避け、プロパティの宣言を単一の決定的なステートメントに簡素化します。プロパティに関するすべての情報（名前、型、メモリ管理特性など）は、型の定義の一部として単一の場所に定義されます。

## 計算プロパティ

格納プロパティに加えて、クラス、構造体、および列挙型は計算プロパティを定義できます。計算プロパティは実際には値を格納しません。代わりに、ゲッターとオプションのセッターを提供して、他のプロパティや値を間接的に取得および設定します。

```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set(newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
    size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
// initialSquareCenter は (5.0, 5.0) です
square.center = Point(x: 15.0, y: 15.0)
print("square.origin は現在 (\(square.origin.x), \(square.origin.y)) にあります")
// "square.origin は現在 (10.0, 10.0) にあります" と出力されます
```

この例では、幾何学的な形状を扱うための3つの構造体を定義しています：

- `Point` は点の x 座標と y 座標をカプセル化します。
- `Size` は幅と高さをカプセル化します。
- `Rect` は原点とサイズによって長方形を定義します。

`Rect` 構造体は `center` という計算プロパティも提供します。`Rect` の現在の中心位置は原点とサイズから常に決定できるため、中心点を明示的な `Point` 値として格納する必要はありません。代わりに、`Rect` は計算変数 `center` のカスタムゲッターとセッターを定義して、長方形の中心を実際の格納プロパティであるかのように操作できるようにします。

上記の例では、`square` という新しい `Rect` 変数を作成します。`square` 変数は原点が (0, 0) で、幅と高さが 10 の状態で初期化されます。この四角形は下図の薄緑色の四角形で表されます。

`square` 変数の `center` プロパティはドット構文 (`square.center`) を通じてアクセスされ、`center` のゲッターが呼び出されて現在のプロパティ値を取得します。既存の値を返すのではなく、ゲッターは実際に新しい `Point` を計算して四角形の中心を表します。上記のように、ゲッターは正しく (5, 5) の中心点を返します。

次に、`center` プロパティに (15, 15) の新しい値が設定され、四角形が右上に移動し、下図の濃緑色の四角形で示される新しい位置に移動します。`center` プロパティを設定すると、`center` のセッターが呼び出され、格納されている `origin` プロパティの x 値と y 値が変更され、四角形が新しい位置に移動します。

### セッターの省略形宣言

計算プロパティのセッターが設定される新しい値の名前を定義しない場合、デフォルトの名前 `newValue` が使用されます。以下は、この省略形を利用した `Rect` 構造体の別バージョンです：

```swift
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

### ゲッターの省略形宣言

ゲッターの本体全体が単一の式である場合、ゲッターはその式を暗黙的に返します。以下は、この省略形とセッターの省略形を利用した `Rect` 構造体の別バージョンです：

```swift
struct CompactRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                  y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

ゲッターから `return` を省略することは、関数から `return` を省略することと同じルールに従います。詳細は「暗黙的な戻り値を持つ関数」を参照してください。

### 読み取り専用の計算プロパティ

ゲッターのみを持ち、セッターを持たない計算プロパティは、読み取り専用の計算プロパティと呼ばれます。読み取り専用の計算プロパティは常に値を返し、ドット構文を通じてアクセスできますが、異なる値に設定することはできません。

> **注記**  
> 計算プロパティ（読み取り専用の計算プロパティを含む）は、`var` キーワードを使用して変数プロパティとして宣言する必要があります。これは、値が固定されていないためです。`let` キーワードは定数プロパティにのみ使用され、その値はインスタンスの初期化の一部として設定された後に変更できないことを示します。

読み取り専用の計算プロパティの宣言を簡略化するために、`get` キーワードとその中括弧を削除できます：

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("fourByFiveByTwo の体積は \(fourByFiveByTwo.volume) です")
// "fourByFiveByTwo の体積は 40.0 です" と出力されます
```

この例では、`Cuboid` という新しい構造体を定義しています。これは `width`、`height`、および `depth` プロパティを持つ3Dの直方体を表します。この構造体には `volume` という読み取り専用の計算プロパティもあり、直方体の現在の体積を計算して返します。`volume` を設定可能にすることは意味がありません。なぜなら、特定の体積値に対してどの `width`、`height`、および `depth` の値を使用すべきかが曖昧になるからです。それにもかかわらず、`Cuboid` が現在の計算された体積を外部のユーザーに提供するために読み取り専用の計算プロパティを提供することは有用です。

## プロパティオブザーバ

プロパティオブザーバは、プロパティの値の変化を監視し、応答します。プロパティオブザーバは、プロパティの値が設定されるたびに呼び出されます。たとえ新しい値が現在の値と同じであっても呼び出されます。

プロパティオブザーバを追加できる場所は次のとおりです：

- 定義したストアドプロパティ
- 継承したストアドプロパティ
- 継承した計算プロパティ

継承したプロパティの場合、サブクラスでそのプロパティをオーバーライドすることでプロパティオブザーバを追加します。定義した計算プロパティの場合、オブザーバを作成しようとするのではなく、プロパティのセッターを使用して値の変化を監視し、応答します。プロパティのオーバーライドについては、オーバーライドの説明を参照してください。

プロパティには次のいずれか、または両方のオブザーバを定義するオプションがあります：

- `willSet` は値が保存される直前に呼び出されます。
- `didSet` は新しい値が保存された直後に呼び出されます。

`willSet` オブザーバを実装する場合、新しいプロパティ値が定数パラメータとして渡されます。このパラメータの名前を `willSet` 実装の一部として指定できます。実装内でパラメータ名と括弧を書かない場合、パラメータはデフォルトのパラメータ名 `newValue` で利用可能になります。

同様に、`didSet` オブザーバを実装する場合、古いプロパティ値を含む定数パラメータが渡されます。このパラメータに名前を付けることも、デフォルトのパラメータ名 `oldValue` を使用することもできます。`didSet` オブザーバ内でプロパティに値を割り当てると、割り当てた新しい値が設定されたばかりの値を置き換えます。

> **注記**  
> スーパークラスのプロパティの `willSet` および `didSet` オブザーバは、スーパークラスのイニシャライザが呼び出された後、サブクラスのイニシャライザでプロパティが設定されたときに呼び出されます。クラスが自分のプロパティを設定している間、スーパークラスのイニシャライザが呼び出される前には呼び出されません。

イニシャライザの委譲に関する詳細は、「値型のイニシャライザの委譲」および「クラス型のイニシャライザの委譲」を参照してください。

ここに `willSet` と `didSet` の実例があります。以下の例では、歩行中に人が歩いた総歩数を追跡する新しいクラス `StepCounter` を定義しています。このクラスは、歩数計や他のステップカウンターからの入力データを使用して、日常の運動を記録するために使用されるかもしれません。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("totalSteps を \(newTotalSteps) に設定しようとしています")
        }
        didSet {
            if totalSteps > oldValue  {
                print("\(totalSteps - oldValue) ステップ追加されました")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// totalSteps を 200 に設定しようとしています
// 200 ステップ追加されました
stepCounter.totalSteps = 360
// totalSteps を 360 に設定しようとしています
// 160 ステップ追加されました
stepCounter.totalSteps = 896
// totalSteps を 896 に設定しようとしています
// 536 ステップ追加されました
```

`StepCounter` クラスは、`Int` 型の `totalSteps` プロパティを宣言しています。これは `willSet` および `didSet` オブザーバを持つストアドプロパティです。

`totalSteps` の `willSet` および `didSet` オブザーバは、プロパティに新しい値が割り当てられるたびに呼び出されます。これは、新しい値が現在の値と同じであっても当てはまります。

この例の `willSet` オブザーバは、カスタムパラメータ名 `newTotalSteps` を使用して、設定される予定の値を表示します。

`didSet` オブザーバは、`totalSteps` の値が更新された後に呼び出されます。`totalSteps` の新しい値を古い値と比較します。総歩数が増加した場合、追加された新しい歩数を示すメッセージが表示されます。`didSet` オブザーバは古い値のカスタムパラメータ名を提供せず、デフォルトの名前 `oldValue` が使用されます。

> **注記**  
> オブザーバを持つプロパティを in-out パラメータとして関数に渡す場合、`willSet` および `didSet` オブザーバは常に呼び出されます。これは、in-out パラメータのコピーイン・コピーアウトメモリモデルのためです。関数の終わりに値が常にプロパティに書き戻されるためです。in-out パラメータの動作に関する詳細な議論については、in-out パラメータを参照してください。

## プロパティラッパー

プロパティラッパーは、プロパティの保存方法を管理するコードとプロパティを定義するコードの間に分離の層を追加します。たとえば、スレッドセーフチェックを提供するプロパティや、基礎データをデータベースに保存するプロパティがある場合、そのコードをすべてのプロパティに書く必要があります。プロパティラッパーを使用すると、ラッパーを定義するときに管理コードを一度だけ書き、その管理コードを複数のプロパティに適用して再利用できます。

プロパティラッパーを定義するには、`wrappedValue` プロパティを定義する構造体、列挙型、またはクラスを作成します。以下のコードでは、`TwelveOrLess` 構造体がラップする値が常に12以下の数値を含むようにします。より大きな数値を保存しようとすると、代わりに12を保存します。

```swift
@propertyWrapper
struct TwelveOrLess {
    private var number = 0
    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, 12) }
    }
}
```

セッターは新しい値が12以下であることを保証し、ゲッターは保存された値を返します。

> **注記**  
> 上記の例で `number` の宣言は変数を `private` としてマークしています。これにより、`number` は `TwelveOrLess` の実装でのみ使用されます。他の場所で書かれたコードは、`wrappedValue` のゲッターとセッターを使用して値にアクセスし、直接 `number` を使用することはできません。`private` についての情報は、アクセス制御を参照してください。

プロパティにラッパーを適用するには、プロパティの前にラッパーの名前を属性として書きます。ここに、`TwelveOrLess` プロパティラッパーを使用して、その寸法が常に12以下であることを保証する長方形を保存する構造体があります：

```swift
struct SmallRectangle {
    @TwelveOrLess var height: Int
    @TwelveOrLess var width: Int
}

var rectangle = SmallRectangle()
print(rectangle.height)
// "0" を出力

rectangle.height = 10
print(rectangle.height)
// "10" を出力

rectangle.height = 24
print(rectangle.height)
// "12" を出力
```

`height` および `width` プロパティは、`TwelveOrLess` の定義から初期値を取得し、`TwelveOrLess.number` をゼロに設定します。`TwelveOrLess` のセッターは10を有効な値として扱うため、`rectangle.height` に10を保存することはそのまま進行します。しかし、24は `TwelveOrLess` が許可する最大値を超えているため、24を保存しようとすると、代わりに `rectangle.height` が許可される最大値の12に設定されます。

プロパティにラッパーを適用すると、コンパイラはラッパーのためのストレージを提供するコードと、ラッパーを通じてプロパティにアクセスするコードを合成します（プロパティラッパーはラップされた値を保存する責任があるため、そのための合成コードはありません）。以下は、`SmallRectangle` のプロパティを `TwelveOrLess` 構造体に明示的にラップし、属性として `@TwelveOrLess` を書かないバージョンです：

```swift
struct SmallRectangle {
    private var _height = TwelveOrLess()
    private var _width = TwelveOrLess()
    var height: Int {
        get { return _height.wrappedValue }
        set { _height.wrappedValue = newValue }
    }
    var width: Int {
        get { return _width.wrappedValue }
        set { _width.wrappedValue = newValue }
    }
}
```

`_height` および `_width` プロパティは、プロパティラッパー `TwelveOrLess` のインスタンスを保存します。`height` および `width` のゲッターとセッターは、`wrappedValue` プロパティへのアクセスをラップします。

### ラップされたプロパティの初期値を設定する

上記の例のコードは、`TwelveOrLess` の定義で `number` に初期値を与えることで、ラップされたプロパティの初期値を設定しています。このプロパティラッパーを使用するコードは、`TwelveOrLess` によってラップされたプロパティに対して異なる初期値を指定することはできません。例えば、`SmallRectangle` の定義では `height` や `width` に初期値を与えることはできません。初期値の設定やその他のカスタマイズをサポートするために、プロパティラッパーにイニシャライザを追加する必要があります。以下に、イニシャライザを定義してラップされた値と最大値を設定する `SmallNumber` という `TwelveOrLess` の拡張版を示します。

```swift
@propertyWrapper
struct SmallNumber {
    private var maximum: Int
    private var number: Int

    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, maximum) }
    }

    init() {
        maximum = 12
        number = 0
    }
    init(wrappedValue: Int) {
        maximum = 12
        number = min(wrappedValue, maximum)
    }
    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        number = min(wrappedValue, maximum)
    }
}
```

`SmallNumber` の定義には、`init()`, `init(wrappedValue:)`, `init(wrappedValue:maximum:)` の3つのイニシャライザが含まれており、以下の例ではこれらを使用してラップされた値と最大値を設定します。初期化とイニシャライザの構文については、初期化を参照してください。

プロパティにラッパーを適用し、初期値を指定しない場合、Swift は `init()` イニシャライザを使用してラッパーを設定します。例えば：

```swift
struct ZeroRectangle {
    @SmallNumber var height: Int
    @SmallNumber var width: Int
}

var zeroRectangle = ZeroRectangle()
print(zeroRectangle.height, zeroRectangle.width)
// Prints "0 0"
```

`height` と `width` をラップする `SmallNumber` のインスタンスは `SmallNumber()` を呼び出すことで作成されます。そのイニシャライザ内のコードは、初期ラップ値と初期最大値をデフォルト値の0と12を使用して設定します。プロパティラッパーは、`SmallRectangle` で `TwelveOrLess` を使用した以前の例と同様に、すべての初期値を提供します。この例とは異なり、`SmallNumber` はプロパティの宣言時にこれらの初期値を記述することもサポートします。

プロパティに初期値を指定すると、Swift は `init(wrappedValue:)` イニシャライザを使用してラッパーを設定します。例えば：

```swift
struct UnitRectangle {
    @SmallNumber var height: Int = 1
    @SmallNumber var width: Int = 1
}

var unitRectangle = UnitRectangle()
print(unitRectangle.height, unitRectangle.width)
// Prints "1 1"
```

プロパティに `= 1` と記述すると、それは `init(wrappedValue:)` イニシャライザの呼び出しに変換されます。`height` と `width` をラップする `SmallNumber` のインスタンスは `SmallNumber(wrappedValue: 1)` を呼び出すことで作成されます。このイニシャライザはここで指定されたラップ値を使用し、デフォルトの最大値12を使用します。

カスタム属性の後に括弧内に引数を記述すると、Swift はそれらの引数を受け取るイニシャライザを使用してラッパーを設定します。例えば、初期値と最大値を指定すると、Swift は `init(wrappedValue:maximum:)` イニシャライザを使用します。

```swift
struct NarrowRectangle {
    @SmallNumber(wrappedValue: 2, maximum: 5) var height: Int
    @SmallNumber(wrappedValue: 3, maximum: 4) var width: Int
}

var narrowRectangle = NarrowRectangle()
print(narrowRectangle.height, narrowRectangle.width)
// Prints "2 3"

narrowRectangle.height = 100
narrowRectangle.width = 100
print(narrowRectangle.height, narrowRectangle.width)
// Prints "5 4"
```

`height` をラップする `SmallNumber` のインスタンスは `SmallNumber(wrappedValue: 2, maximum: 5)` を呼び出すことで作成され、`width` をラップするインスタンスは `SmallNumber(wrappedValue: 3, maximum: 4)` を呼び出すことで作成されます。

プロパティラッパーに引数を含めることで、ラッパーの初期状態を設定したり、作成時に他のオプションをラッパーに渡すことができます。この構文はプロパティラッパーを使用する最も一般的な方法です。必要な引数を属性に提供し、それらはイニシャライザに渡されます。

プロパティラッパーの引数を含める場合、代入を使用して初期値を指定することもできます。Swift は代入を `wrappedValue` 引数のように扱い、含めた引数を受け取るイニシャライザを使用します。例えば：

```swift
struct MixedRectangle {
    @SmallNumber var height: Int = 1
    @SmallNumber(maximum: 9) var width: Int = 2
}

var mixedRectangle = MixedRectangle()
print(mixedRectangle.height)
// Prints "1"

mixedRectangle.height = 20
print(mixedRectangle.height)
// Prints "12"
```

`height` をラップする `SmallNumber` のインスタンスは `SmallNumber(wrappedValue: 1)` を呼び出すことで作成され、デフォルトの最大値12を使用します。`width` をラップするインスタンスは `SmallNumber(wrappedValue: 2, maximum: 9)` を呼び出すことで作成されます。

### プロパティラッパーから値を投影する

ラップされた値に加えて、プロパティラッパーは投影された値を定義することで追加の機能を公開できます。例えば、データベースへのアクセスを管理するプロパティラッパーは、その投影された値に `flushDatabaseConnection()` メソッドを公開できます。投影された値の名前はラップされた値と同じですが、ドル記号 (`$`) で始まります。コードで `$` で始まるプロパティを定義することはできないため、投影された値が定義したプロパティと干渉することはありません。

上記の `SmallNumber` の例では、プロパティを大きすぎる数値に設定しようとすると、プロパティラッパーが数値を調整してから保存します。以下のコードは、プロパティラッパーが新しい値を保存する前にプロパティの値を調整したかどうかを追跡するために `projectedValue` プロパティを `SmallNumber` 構造体に追加します。

```swift
@propertyWrapper
struct SmallNumber {
    private var number: Int
    private(set) var projectedValue: Bool

    var wrappedValue: Int {
        get { return number }
        set {
            if newValue > 12 {
                number = 12
                projectedValue = true
            } else {
                number = newValue
                projectedValue = false
            }
        }
    }

    init() {
        self.number = 0
        self.projectedValue = false
    }
}
struct SomeStructure {
    @SmallNumber var someNumber: Int
}
var someStructure = SomeStructure()

someStructure.someNumber = 4
print(someStructure.$someNumber)
// "false" と表示されます

someStructure.someNumber = 55
print(someStructure.$someNumber)
// "true" と表示されます
```

`someStructure.$someNumber` と書くことで、ラッパーの投影された値にアクセスします。4のような小さな数値を保存した後、`someStructure.$someNumber` の値は `false` です。しかし、55のような大きすぎる数値を保存しようとすると、投影された値は `true` になります。

プロパティラッパーは、任意の型の値を投影された値として返すことができます。この例では、プロパティラッパーは数値が調整されたかどうかという1つの情報だけを公開しているため、そのブール値を投影された値として公開しています。より多くの情報を公開する必要があるラッパーは、他の型のインスタンスを返すか、`self` を返してラッパーのインスタンス自体を投影された値として公開することができます。

型の一部であるコード（プロパティのゲッターやインスタンスメソッドなど）から投影された値にアクセスする場合、他のプロパティにアクセスするのと同様に、プロパティ名の前に `self.` を省略できます。次の例のコードでは、`height` と `width` のラッパーの投影された値を `$height` と `$width` として参照しています。

```swift
enum Size {
    case small, large
}

struct SizedRectangle {
    @SmallNumber var height: Int
    @SmallNumber var width: Int

    mutating func resize(to size: Size) -> Bool {
        switch size {
        case .small:
            height = 10
            width = 20
        case .large:
            height = 100
            width = 100
        }
        return $height || $width
    }
}
```

プロパティラッパーの構文は、ゲッターとセッターを持つプロパティのためのシンタックスシュガーに過ぎないため、`height` と `width` へのアクセスは他のプロパティへのアクセスと同じように動作します。例えば、`resize(to:)` のコードはプロパティラッパーを使用して `height` と `width` にアクセスします。`resize(to: .large)` を呼び出すと、`.large` のスイッチケースが矩形の `height` と `width` を100に設定します。ラッパーはこれらのプロパティの値が12を超えないようにし、値を調整したことを記録するために投影された値を `true` に設定します。`resize(to:)` の最後で、戻り値のステートメントは `$height` と `$width` をチェックして、プロパティラッパーが `height` または `width` のいずれかを調整したかどうかを判断します。

## グローバル変数とローカル変数

プロパティの計算と監視のための上記の機能は、グローバル変数とローカル変数にも利用できます。グローバル変数は、関数、メソッド、クロージャ、または型のコンテキスト外で定義された変数です。ローカル変数は、関数、メソッド、またはクロージャのコンテキスト内で定義された変数です。

前の章で出てきたグローバル変数とローカル変数はすべてストアド変数でした。ストアド変数は、ストアドプロパティと同様に、特定の型の値を保存し、その値を設定および取得するためのストレージを提供します。

しかし、グローバルスコープまたはローカルスコープで計算変数を定義し、ストアド変数のオブザーバを定義することもできます。計算変数は値を保存するのではなく計算し、その記述方法は計算プロパティと同じです。

> **注記**  
> グローバル定数と変数は常に遅延評価され、遅延ストアドプロパティと同様に動作します。遅延ストアドプロパティとは異なり、グローバル定数と変数は `lazy` 修飾子を付ける必要はありません。
> 
> ローカル定数と変数は決して遅延評価されません。

プロパティラッパーをローカルストアド変数に適用することはできますが、グローバル変数や計算変数には適用できません。例えば、以下のコードでは、`myNumber` がプロパティラッパーとして `SmallNumber` を使用しています。

```swift
func someFunction() {
    @SmallNumber var myNumber: Int = 0

    myNumber = 10
    // 現在、myNumber は 10 です

    myNumber = 24
    // 現在、myNumber は 12 です
}
```

プロパティに `SmallNumber` を適用する場合と同様に、`myNumber` の値を10に設定することは有効です。プロパティラッパーが12を超える値を許可しないため、`myNumber` を24ではなく12に設定します。

## 型プロパティ

インスタンスプロパティは、特定の型のインスタンスに属するプロパティです。その型の新しいインスタンスを作成するたびに、他のインスタンスとは別のプロパティ値のセットを持ちます。

また、特定の型自体に属するプロパティを定義することもできます。この型のインスタンスをいくつ作成しても、これらのプロパティのコピーは1つだけです。このようなプロパティは型プロパティと呼ばれます。

型プロパティは、特定の型のすべてのインスタンスに共通する値を定義するのに便利です。例えば、すべてのインスタンスが使用できる定数プロパティ（Cの静的定数のようなもの）や、その型のすべてのインスタンスに対してグローバルな値を保存する変数プロパティ（Cの静的変数のようなもの）です。

ストアド型プロパティは変数または定数にすることができます。計算型プロパティは常に変数プロパティとして宣言され、計算インスタンスプロパティと同じ方法で記述されます。

> **注記**  
> ストアドインスタンスプロパティとは異なり、ストアド型プロパティには常にデフォルト値を与える必要があります。これは、型自体が初期化時にストアド型プロパティに値を割り当てるイニシャライザを持たないためです。
> 
> ストアド型プロパティは最初にアクセスされたときに遅延初期化されます。複数のスレッドによって同時にアクセスされても、一度だけ初期化されることが保証されており、`lazy` 修飾子を付ける必要はありません。

### 型プロパティの構文

CやObjective-Cでは、型に関連付けられた静的定数や変数をグローバル静的変数として定義します。しかし、Swiftでは、型プロパティは型の定義の一部として書かれ、型の外側の中括弧内にあり、各型プロパティはそれがサポートする型に明示的にスコープされます。

型プロパティは`static`キーワードで定義します。クラス型の計算型プロパティの場合、サブクラスがスーパークラスの実装をオーバーライドできるようにするために`class`キーワードを使用できます。以下の例は、格納型プロパティと計算型プロパティの構文を示しています：

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 6
    }
}
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

> **注記**  
> 上記の計算型プロパティの例は読み取り専用の計算型プロパティですが、計算インスタンスプロパティと同じ構文で読み書き可能な計算型プロパティを定義することもできます。

### 型プロパティのクエリと設定

型プロパティはインスタンスプロパティと同様にドット構文でクエリおよび設定されます。ただし、型プロパティはその型のインスタンスではなく、型自体に対してクエリおよび設定されます。例えば：

```swift
print(SomeStructure.storedTypeProperty)
// "Some value."と表示されます
SomeStructure.storedTypeProperty = "Another value."
print(SomeStructure.storedTypeProperty)
// "Another value."と表示されます
print(SomeEnumeration.computedTypeProperty)
// "6"と表示されます
print(SomeClass.computedTypeProperty)
// "27"と表示されます
```

以下の例では、複数のオーディオチャンネルのオーディオレベルメーターをモデル化する構造体の一部として2つの格納型プロパティを使用します。各チャンネルには0から10までの整数のオーディオレベルがあります。

以下の図は、これらのオーディオチャンネルの2つを組み合わせてステレオオーディオレベルメーターをモデル化する方法を示しています。チャンネルのオーディオレベルが0の場合、そのチャンネルのライトは点灯しません。オーディオレベルが10の場合、そのチャンネルのすべてのライトが点灯します。この図では、左チャンネルの現在のレベルは9で、右チャンネルの現在のレベルは7です：

上記のオーディオチャンネルは、`AudioChannel`構造体のインスタンスによって表されます：

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
        didSet {
            if currentLevel > AudioChannel.thresholdLevel {
                // 新しいオーディオレベルをしきい値レベルに制限する
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                // これを新しい全体の最大入力レベルとして保存する
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}
```

`AudioChannel`構造体は、その機能をサポートするために2つの格納型プロパティを定義しています。最初の`thresholdLevel`は、オーディオレベルが取ることができる最大しきい値を定義します。これはすべての`AudioChannel`インスタンスに対して10の定数値です。10を超える値のオーディオ信号が入ってきた場合、このしきい値に制限されます（以下で説明します）。

2つ目の型プロパティは`maxInputLevelForAllChannels`という変数格納プロパティです。これは、任意の`AudioChannel`インスタンスによって受信された最大入力値を追跡します。初期値は0です。

`AudioChannel`構造体は、0から10のスケールでチャンネルの現在のオーディオレベルを表す`currentLevel`という格納インスタンスプロパティも定義しています。

`currentLevel`プロパティには、設定されるたびに`currentLevel`の値をチェックする`didSet`プロパティオブザーバがあります。このオブザーバは2つのチェックを行います：

- `currentLevel`の新しい値が許可される`thresholdLevel`を超える場合、プロパティオブザーバは`currentLevel`を`thresholdLevel`に制限します。
- （制限後の）`currentLevel`の新しい値が、これまでに任意の`AudioChannel`インスタンスによって受信された値よりも高い場合、プロパティオブザーバは新しい`currentLevel`値を`maxInputLevelForAllChannels`型プロパティに保存します。

> **注記**  
> これら2つのチェックの最初のチェックでは、`didSet`オブザーバが`currentLevel`を異なる値に設定します。ただし、これによりオブザーバが再度呼び出されることはありません。

`AudioChannel`構造体を使用して、ステレオサウンドシステムのオーディオレベルを表す2つの新しいオーディオチャンネル`leftChannel`と`rightChannel`を作成できます：

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

左チャンネルの`currentLevel`を7に設定すると、`maxInputLevelForAllChannels`型プロパティが7に更新されることがわかります：

```swift
leftChannel.currentLevel = 7
print(leftChannel.currentLevel)
// "7"と表示されます
print(AudioChannel.maxInputLevelForAllChannels)
// "7"と表示されます
```

右チャンネルの`currentLevel`を11に設定しようとすると、右チャンネルの`currentLevel`プロパティが最大値の10に制限され、`maxInputLevelForAllChannels`型プロパティが10に更新されることがわかります：

```swift
rightChannel.currentLevel = 11
print(rightChannel.currentLevel)
// "10"と表示されます
print(AudioChannel.maxInputLevelForAllChannels)
// "10"と表示されます
```