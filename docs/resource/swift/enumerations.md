# 列挙型

型として可能な値のリストを定義するカスタムタイプをモデル化します。

列挙型は一連の関連する値に共通の型を定義し、型安全な方法でコード内でそれらの値を扱うことができるようにします。

C言語に精通している人ならご存知のように、C言語の列挙型は関連する名前を整数値に割り当てます。Swiftの列挙型ははるかに柔軟で、列挙型の各ケースに値を提供する必要はありません。値（生の値として知られる）が列挙型の各ケースに提供される場合、その値は文字列、文字、または任意の整数型または浮動小数点型の値とすることができます。

## 列挙型の構文

列挙型は `enum` キーワードで導入し、その定義全体を中括弧のペアの中に配置します：

```swift
enum SomeEnumeration {
    // 列挙型の定義をここに記述
}
```

コンパスの4つの主要な方向を示す例を示します：

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

> **Note**: Swiftの列挙型のケースは、CやObjective-Cなどの言語とは異なり、デフォルトで整数値が設定されません。上記の`CompassPoint`の例では、`north`、`south`、`east`、`west`は暗黙的に0、1、2、3と等しくなりません。代わりに、異なる列挙型のケースは明示的に定義された`CompassPoint`型の独自の値です。

複数のケースを1行にカンマで区切って記述することもできます：

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

各列挙型の定義は新しい型を定義します。Swiftの他の型と同様に、その名前（`CompassPoint`や`Planet`など）は大文字で始まります。列挙型の名前は単数形にして、自己説明的にします：

```swift
var directionToHead = CompassPoint.west
```

`directionToHead`の型は、`CompassPoint`の可能な値の1つで初期化されたときに推論されます。`directionToHead`が`CompassPoint`として宣言された後は、短いドット構文を使用して別の`CompassPoint`値に設定できます：

```swift
directionToHead = .east
```

`directionToHead`の型はすでに知られているため、その値を設定するときに型を省略できます。これにより、明示的に型指定された列挙型の値を扱うときに非常に読みやすいコードが作成されます。

## 列挙型の値をswitch文でマッチングする

個々の列挙型の値を`switch`文でマッチングできます：

```swift
directionToHead = .south
switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
// Prints "Watch out for penguins"
```

このコードは次のように読むことができます：

「`directionToHead`の値を考慮します。値が`.north`に等しい場合は"Lots of planets have a north"を出力します。値が`.south`に等しい場合は"Watch out for penguins"を出力します。」

...など。

`switch`文は列挙型のケースを考慮する際に網羅的でなければなりません。`.west`のケースが省略されている場合、このコードはコンパイルされません。なぜなら、`CompassPoint`のケースの完全なリストを考慮していないからです。網羅性を要求することで、列挙型のケースが誤って省略されないようにします。

すべての列挙型のケースに対してケースを提供するのが適切でない場合、明示的に対処されていないケースをカバーするためにデフォルトケースを提供できます：

```swift
let somePlanet = Planet.earth
switch somePlanet {
case .earth:
    print("Mostly harmless")
default:
    print("Not a safe place for humans")
}
// Prints "Mostly harmless"
```

## 列挙型のケースを反復処理する

一部の列挙型では、その列挙型のすべてのケースのコレクションを持つことが便利です。これを有効にするには、列挙型の名前の後に`: CaseIterable`と記述します。Swiftは列挙型の型の`allCases`プロパティとしてすべてのケースのコレクションを公開します。以下に例を示します：

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count
print("\(numberOfChoices) beverages available")
// Prints "3 beverages available"
```

上記の例では、`Beverage.allCases`と記述して、`Beverage`列挙型のすべてのケースを含むコレクションにアクセスします。`allCases`は他のコレクションと同様に使用できます。このコレクションの要素は列挙型のインスタンスであり、この場合は`Beverage`値です。上記の例では、ケースの数をカウントし、以下の例では`for-in`ループを使用してすべてのケースを反復処理します。

```swift
for beverage in Beverage.allCases {
    print(beverage)
}
// coffee
// tea
// juice
```

上記の例で使用されている構文は、列挙型が`CaseIterable`プロトコルに準拠していることを示しています。プロトコルに関する情報は、[Protocols](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)を参照してください。

## 関連値

前のセクションの例では、列挙型のケースが独自の（型付きの）値であることを示しています。定数や変数に`Planet.earth`を設定し、後でこの値をチェックすることができます。しかし、これらのケースの値と一緒に他の型の値を格納できると便利な場合があります。この追加情報は関連値と呼ばれ、コード内でそのケースを値として使用するたびに異なります。

Swiftの列挙型を定義して、任意の型の関連値を格納できるようにすることができます。必要に応じて、列挙型の各ケースの値の型を異なるものにすることもできます。このような列挙型は、他のプログラミング言語では識別共用体、タグ付き共用体、またはバリアントとして知られています。

たとえば、在庫追跡システムが2つの異なるタイプのバーコードで製品を追跡する必要があるとします。一部の製品にはUPC形式の1次元バーコードがラベル付けされており、0から9までの数字を使用します。各バーコードには、番号システムの数字、5つの製造元コードの数字、および5つの製品コードの数字が含まれます。これらの後に、コードが正しくスキャンされたことを確認するためのチェックデジットが続きます：

他の製品にはQRコード形式の2次元バーコードがラベル付けされており、任意のISO 8859-1文字を使用でき、最大2,953文字の文字列をエンコードできます：

在庫追跡システムがUPCバーコードを4つの整数のタプルとして、QRコードバーコードを任意の長さの文字列として格納するのが便利です。

Swiftでは、どちらのタイプの製品バーコードも定義する列挙型は次のようになります：

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

これは次のように読むことができます：

「`Barcode`という名前の列挙型を定義し、`upc`の値を持つ場合は（`Int, Int, Int, Int`型の関連値を持つ）、または`qrCode`の値を持つ場合は（`String`型の関連値を持つ）ことができます。」

この定義は、実際の`Int`や`String`の値を提供するものではなく、`Barcode`定数や変数が`Barcode.upc`または`Barcode.qrCode`と等しい場合に格納できる関連値の型を定義するだけです。

次に、どちらのタイプの新しいバーコードを作成できます：

```swift
var productBarcode = Barcode.upc(8, 85909, 51226, 3)
```

この例では、`productBarcode`という新しい変数を作成し、関連するタプル値（8, 85909, 51226, 3）を持つ`Barcode.upc`の値を割り当てます。

同じ製品に異なるタイプのバーコードを割り当てることができます：

```swift
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
```

この時点で、元の`Barcode.upc`とその整数値は、新しい`Barcode.qrCode`とその文字列値に置き換えられます。`Barcode`型の定数や変数は、`.upc`または`.qrCode`のいずれか（およびそれらの関連値）を格納できますが、任意の時点でそれらのうちの1つだけを格納できます。

`switch`文を使用して異なるバーコードタイプをチェックできます。`Matching Enumeration Values with a Switch Statement`の例と同様に、関連値は`switch`文の一部として抽出されます。関連値を定数（`let`プレフィックスを使用）または変数（`var`プレフィックスを使用）として抽出し、`switch`ケースの本体内で使用します：

```swift
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

列挙型のケースのすべての関連値が定数として抽出される場合、またはすべてが変数として抽出される場合、簡潔にするためにケース名の前に単一の`let`または`var`注釈を配置できます：

```swift
switch productBarcode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
case let .qrCode(productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

## 生の値

`Associated Values`のバーコードの例は、列挙型のケースが異なる型の関連値を格納することを宣言できる方法を示しています。関連値の代わりに、列挙型のケースはすべて同じ型のデフォルト値（生の値と呼ばれる）を持つことができます。

次の例は、名前付き列挙型のケースに生のASCII値を格納します：

```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}
```

ここで、`ASCIIControlCharacter`という名前の列挙型の生の値は`Character`型で定義され、一般的なASCII制御文字のいくつかに設定されています。文字値については、[Strings and Characters](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html)を参照してください。

生の値は文字列、文字、または任意の整数型や浮動小数点数型にすることができます。各生の値は、その列挙型の宣言内で一意でなければなりません。

> **Note**: 生の値は関連値とは異なります。生の値は、コード内で列挙型を最初に定義するときに事前に設定された値です。特定の列挙型のケースの生の値は常に同じです。関連値は、新しい定数や変数を列挙型のケースの1つに基づいて作成するときに設定され、毎回異なる場合があります。

### 暗黙的に割り当てられた生の値

整数や文字列の生の値を格納する列挙型を扱う場合、各ケースに対して明示的に生の値を割り当てる必要はありません。割り当てない場合、Swiftは自動的に値を割り当てます。

たとえば、生の値として整数が使用される場合、各ケースの暗黙的な値は前のケースよりも1多くなります。最初のケースに値が設定されていない場合、その値は0です。

以下の列挙型は、以前の`Planet`列挙型を改良し、整数の生の値を使用して各惑星の太陽からの順序を表します：

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

上記の例では、`Planet.mercury`には1の明示的な生の値があり、`Planet.venus`には2の暗黙的な生の値があります。

文字列が生の値として使用される場合、各ケースの暗黙的な値はそのケースの名前のテキストです。

以下の列挙型は、以前の`CompassPoint`列挙型を改良し、各方向の名前を表す文字列の生の値を使用します：

```swift
enum CompassPoint: String {
    case north, south, east, west
}
```

上記の例では、`CompassPoint.south`には"南"の暗黙的な生の値があります。

列挙型のケースの生の値には`rawValue`プロパティを使用してアクセスします：

```swift
let earthsOrder = Planet.earth.rawValue
// earthsOrder is 3

let sunsetDirection = CompassPoint.west.rawValue
// sunsetDirection is "west"
```

## 生の値からの初期化

生の値の型を持つ列挙型を定義すると、その列挙型は自動的に、生の値の型の値（`rawValue`というパラメータ）を受け取り、列挙型のケースまたは`nil`を返すイニシャライザを受け取ります。このイニシャライザを使用して、列挙型の新しいインスタンスを作成しようとすることができます。

次の例は、7の生の値から天王星を識別します：

```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet is of type Planet? and equals Planet.uranus
```

すべての可能な`Int`値が対応する惑星を見つけるわけではありません。このため、生の値のイニシャライザは常にオプショナルな列挙型のケースを返します。上記の例では、`possiblePlanet`は`Planet?`型、つまり「オプショナルなPlanet」です。

> **Note**: 生の値のイニシャライザは失敗可能なイニシャライザです。すべての生の値が列挙型のケースを返すわけではないためです。詳細については、[Failable Initializers](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID222)を参照してください。

位置が11の惑星を見つけようとすると、生の値のイニシャライザによって返されるオプショナルな`Planet`値は`nil`になります：

```swift
let positionToFind = 11
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .earth:
        print("Mostly harmless")
    default:
        print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
// Prints "There isn't a planet at position 11"
```

この例では、オプショナルバインディングを使用して、生の値が11の惑星にアクセスしようとします。`if let somePlanet = Planet(rawValue: 11)`という文はオプショナルな`Planet`を作成し、取得できる場合はそのオプショナルな`Planet`の値に`somePlanet`を設定します。この場合、位置が11の惑星を取得することはできないため、`else`ブランチが実行されます。

## 再帰的な列挙型

再帰的な列挙型は、1つ以上の列挙型のケースの関連値として、列挙型の別のインスタンスを持つ列挙型です。列挙型のケースが再帰的であることを示すには、その前に`indirect`と記述します。これにより、コンパイラに必要な間接層を挿入するよう指示します。

たとえば、次のように単純な算術式を格納する列挙型があります：

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

列挙型の先頭に`indirect`と記述して、関連値を持つすべての列挙型のケースに対して間接指定を有効にすることもできます：

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

この列挙型は、3種類の算術式を格納できます：単純な数値、2つの式の加算、および2つの式の乗算です。加算と乗算のケースには、算術式でもある関連値があります。これらの関連値により、式をネストすることができます。たとえば、式（5 + 4）* 2は、乗算の右側に数値があり、乗算の左側に別の式があります。データがネストされているため、データを格納するために使用される列挙型もネストをサポートする必要があります。つまり、列挙型は再帰的である必要があります。以下のコードは、（5 + 4）* 2のために作成された`ArithmeticExpression`再帰列挙型を示しています：

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

再帰関数は、再帰構造を持つデータを扱うための簡単な方法です。たとえば、算術式を評価する関数は次のようになります：

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value):
        return value
    case let .addition(left, right):
        return evaluate(left) + evaluate(right)
    case let .multiplication(left, right):
        return evaluate(left) * evaluate(right)
    }
}

print(evaluate(product))
// Prints "18"
```

この関数は、単純な数値を評価する際に関連値を返すだけです。加算や乗算を評価する際には、左側の式を評価し、右側の式を評価し、それらを加算または乗算します。