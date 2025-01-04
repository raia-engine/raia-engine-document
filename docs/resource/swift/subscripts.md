# サブスクリプト

コレクションの要素にアクセスします。

クラス、構造体、および列挙型はサブスクリプトを定義できます。サブスクリプトは、コレクション、リスト、またはシーケンスのメンバー要素にアクセスするためのショートカットです。サブスクリプトを使用すると、設定と取得のための別々のメソッドを必要とせずに、インデックスで値を設定および取得できます。たとえば、`Array` インスタンスの要素には `someArray[index]` としてアクセスし、`Dictionary` インスタンスの要素には `someDictionary[key]` としてアクセスします。

1つの型に対して複数のサブスクリプトを定義でき、渡すインデックス値の型に基づいて適切なサブスクリプトのオーバーロードが選択されます。サブスクリプトは1次元に限定されず、カスタム型のニーズに合わせて複数の入力パラメータを持つサブスクリプトを定義できます。

## サブスクリプトの構文

サブスクリプトを使用すると、インスタンス名の後に角括弧で1つ以上の値を書いて型のインスタンスをクエリできます。その構文は、インスタンスメソッドの構文と計算プロパティの構文の両方に似ています。`subscript` キーワードを使用してサブスクリプト定義を書き、インスタンスメソッドと同じように1つ以上の入力パラメータと戻り値の型を指定します。インスタンスメソッドとは異なり、サブスクリプトは読み書き可能または読み取り専用にすることができます。この動作は、計算プロパティと同様にゲッターとセッターによって伝えられます：

```swift
subscript(index: Int) -> Int {
    get {
        // 適切なサブスクリプト値をここで返します。
    }
    set(newValue) {
        // 適切な設定アクションをここで実行します。
    }
}
```

`newValue` の型はサブスクリプトの戻り値の型と同じです。計算プロパティと同様に、セッターの (`newValue`) パラメータを指定しないこともできます。セッターにパラメータを指定しない場合、デフォルトのパラメータ `newValue` が提供されます。

読み取り専用の計算プロパティと同様に、`get` キーワードとその中括弧を削除して読み取り専用のサブスクリプトの宣言を簡略化できます：

```swift
subscript(index: Int) -> Int {
    // 適切なサブスクリプト値をここで返します。
}
```

ここに、整数のn倍表を表す `TimesTable` 構造体を定義する読み取り専用のサブスクリプト実装の例があります：

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
print("six times three is \(threeTimesTable[6])")
// "six times three is 18" と出力されます
```

この例では、3倍表を表す `TimesTable` の新しいインスタンスが作成されます。これは、構造体のイニシャライザに `multiplier` パラメータの値として3を渡すことで示されます。

`threeTimesTable` インスタンスを `threeTimesTable[6]` のようにサブスクリプトを呼び出してクエリできます。これは3倍表の6番目のエントリを要求し、18、つまり3×6の値を返します。

> **注**: n倍表は固定された数学的ルールに基づいています。したがって、`threeTimesTable[someIndex]` に新しい値を設定するのは適切ではありません。そのため、`TimesTable` のサブスクリプトは読み取り専用のサブスクリプトとして定義されています。

## サブスクリプトの使用

「サブスクリプト」の正確な意味は、それが使用される文脈によって異なります。サブスクリプトは通常、コレクション、リスト、またはシーケンスのメンバー要素にアクセスするためのショートカットとして使用されます。特定のクラスや構造体の機能に最も適した方法でサブスクリプトを実装することができます。

たとえば、Swiftの `Dictionary` 型は、`Dictionary` インスタンスに格納されている値を設定および取得するためのサブスクリプトを実装しています。サブスクリプトの角括弧内に辞書のキー型のキーを提供し、サブスクリプトに辞書の値型の値を割り当てることで、辞書に値を設定できます：

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

上記の例では、`numberOfLegs` という変数を定義し、3つのキーと値のペアを含む辞書リテラルで初期化します。`numberOfLegs` 辞書の型は `[String: Int]` と推論されます。辞書を作成した後、この例ではサブスクリプトの代入を使用して、`"bird"` という `String` キーと `2` という `Int` 値を辞書に追加します。

辞書のサブスクリプトの詳細については、[辞書のアクセスと変更](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html#ID113)を参照してください。

> **注**: Swiftの `Dictionary` 型は、オプショナル型を取るおよび返すサブスクリプトとしてキーと値のサブスクリプトを実装しています。上記の `numberOfLegs` 辞書の場合、キーと値のサブスクリプトは `Int?` 型、つまり「オプショナルなint」の値を取るおよび返します。`Dictionary` 型は、すべてのキーに値があるわけではないことをモデル化し、キーに `nil` 値を割り当てることでキーの値を削除する方法を提供するために、オプショナルなサブスクリプト型を使用しています。

## サブスクリプトのオプション

サブスクリプトは任意の数の入力パラメータを取ることができ、これらの入力パラメータは任意の型にすることができます。サブスクリプトは任意の型の値を返すこともできます。

関数と同様に、サブスクリプトは可変個引数を取り、パラメータにデフォルト値を提供することができます。詳細は[可変個引数](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID166)および[デフォルトパラメータ値](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID166)を参照してください。ただし、関数とは異なり、サブスクリプトはin-outパラメータを使用することはできません。

クラスや構造体は必要に応じて複数のサブスクリプト実装を提供することができ、使用される適切なサブスクリプトは、サブスクリプトが使用される時点でサブスクリプト括弧内に含まれる値の型に基づいて推測されます。この複数のサブスクリプトの定義は、サブスクリプトのオーバーロードと呼ばれます。

サブスクリプトが単一のパラメータを取ることが最も一般的ですが、型に適している場合は複数のパラメータを持つサブスクリプトを定義することもできます。次の例では、`Matrix`構造体を定義しており、これは`Double`値の2次元行列を表しています。`Matrix`構造体のサブスクリプトは2つの整数パラメータを取ります：

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
```

`Matrix`は`rows`と`columns`という2つのパラメータを取るイニシャライザを提供し、`rows * columns`の`Double`型の値を格納するのに十分な大きさの配列を作成します。行列の各位置には初期値として`0.0`が与えられます。これを実現するために、配列のサイズと初期セル値`0.0`が配列イニシャライザに渡され、正しいサイズの新しい配列が作成および初期化されます。このイニシャライザの詳細は[デフォルト値を持つ配列の作成](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html#ID108)で説明されています。

適切な行数と列数をイニシャライザに渡すことで、新しい`Matrix`インスタンスを構築できます：

```swift
var matrix = Matrix(rows: 2, columns: 2)
```

上記の例では、2行2列の新しい`Matrix`インスタンスを作成しています。この`Matrix`インスタンスのグリッド配列は、実質的に行列のフラット化バージョンであり、左上から右下まで読み取られます：

行列内の値は、行と列の値をカンマで区切ってサブスクリプトに渡すことで設定できます：

```swift
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```

これらの2つの文は、サブスクリプトのセッタを呼び出して、行が`0`で列が`1`の位置に`1.5`の値を設定し、行が`1`で列が`0`の位置に`3.2`の値を設定します：

`Matrix`サブスクリプトのゲッタとセッタの両方に、サブスクリプトの行と列の値が有効であることを確認するアサーションが含まれています。これらのアサーションを支援するために、`Matrix`には`indexIsValid(row:column:)`という便利なメソッドが含まれており、要求された行と列が行列の範囲内にあるかどうかを確認します：

```swift
func indexIsValid(row: Int, column: Int) -> Bool {
    return row >= 0 && row < rows && column >= 0 && column < columns
}
```

行列の範囲外のサブスクリプトにアクセスしようとすると、アサーションがトリガーされます：

```swift
let someValue = matrix[2, 2]
// これはアサートをトリガーします。なぜなら[2, 2]は行列の範囲外だからです。
```

## 型サブスクリプト

上記で説明したインスタンスサブスクリプトは、特定の型のインスタンスに対して呼び出すサブスクリプトです。型自体に対して呼び出されるサブスクリプトを定義することもできます。この種のサブスクリプトは型サブスクリプトと呼ばれます。型サブスクリプトを示すには、`subscript`キーワードの前に`static`キーワードを書きます。クラスは代わりに`class`キーワードを使用して、サブクラスがスーパークラスのサブスクリプトの実装をオーバーライドできるようにすることができます。以下の例は、型サブスクリプトを定義し、呼び出す方法を示しています：

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
    static subscript(n: Int) -> Planet {
        return Planet(rawValue: n)!
    }
}
let mars = Planet[4]
print(mars)
```