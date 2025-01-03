# コレクションタイプ

配列、セット、および辞書を使用してデータを整理します。

Swiftは、値のコレクションを格納するための3つの主要なコレクションタイプ、すなわち配列、セット、および辞書を提供します。配列は値の順序付きコレクションです。セットは一意の値の順序なしコレクションです。辞書はキーと値の関連付けの順序なしコレクションです。

Swiftの配列、セット、および辞書は、格納できる値とキーのタイプが常に明確です。これにより、誤ったタイプの値をコレクションに誤って挿入することはできません。また、コレクションから取得する値のタイプについても自信を持つことができます。

> 注意: Swiftの配列、セット、および辞書タイプはジェネリックコレクションとして実装されています。ジェネリックタイプとコレクションの詳細については、Genericsを参照してください。

## コレクションの可変性

配列、セット、または辞書を作成して変数に割り当てると、作成されたコレクションは可変になります。つまり、コレクションを作成した後に、コレクションに項目を追加、削除、または変更することで、コレクションを変更（または変異）することができます。配列、セット、または辞書を定数に割り当てると、そのコレクションは不変になり、そのサイズと内容を変更することはできません。

> 注意: コレクションが変更される必要がないすべての場合に、不変のコレクションを作成することが良い習慣です。これにより、コードを理解しやすくなり、Swiftコンパイラが作成するコレクションのパフォーマンスを最適化できるようになります。

## 配列

配列は、同じタイプの値を順序付きリストに格納します。同じ値が異なる位置に複数回出現することがあります。

> 注意: SwiftのArrayタイプはFoundationのNSArrayクラスにブリッジされています。ArrayをFoundationおよびCocoaと一緒に使用する方法の詳細については、Bridging Between Array and NSArrayを参照してください。

### 配列タイプの省略記法

Swiftの配列のタイプは、`Array<Element>`と完全に書かれます。ここで、`Element`は配列が格納できる値のタイプです。配列のタイプを省略記法で`[Element]`と書くこともできます。これらの2つの形式は機能的に同一ですが、省略記法の方が好まれ、このガイド全体で配列のタイプを参照する際に使用されます。

### 空の配列の作成

初期化子構文を使用して、特定のタイプの空の配列を作成できます。

```swift
var someInts: [Int] = []
print("someIntsは[Int]タイプで、\(someInts.count)個の項目があります。")
// "someIntsは[Int]タイプで、0個の項目があります。"と表示されます。
```

`someInts`変数のタイプは、初期化子のタイプから`[Int]`と推論されます。

また、関数引数やすでに型指定された変数や定数など、コンテキストがすでに型情報を提供している場合は、空の配列リテラル（空の角括弧`[]`）を使用して空の配列を作成できます。

```swift
someInts.append(3)
// someIntsには現在、1つのIntタイプの値が含まれています
someInts = []
// someIntsは現在空の配列ですが、依然として[Int]タイプです
```

### デフォルト値を持つ配列の作成

SwiftのArrayタイプは、すべての値が同じデフォルト値に設定された特定のサイズの配列を作成するための初期化子も提供します。この初期化子には、適切なタイプのデフォルト値（`repeating`と呼ばれる）と、新しい配列でその値が繰り返される回数（`count`と呼ばれる）を渡します。

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoublesは[Double]タイプで、[0.0, 0.0, 0.0]と等しい
```

### 2つの配列を足して新しい配列を作成する

互換性のあるタイプの2つの既存の配列を足して、新しい配列を作成できます。新しい配列のタイプは、足した2つの配列のタイプから推論されます。

```swift
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
// anotherThreeDoublesは[Double]タイプで、[2.5, 2.5, 2.5]と等しい

var sixDoubles = threeDoubles + anotherThreeDoubles
// sixDoublesは[Double]と推論され、[0.0, 0.0, 0.0, 2.5, 2.5, 2.5]と等しい
```

### 配列リテラルを使用して配列を作成する

配列リテラルを使用して配列を初期化することもできます。これは、1つ以上の値を配列コレクションとして書くための省略記法です。配列リテラルは、コンマで区切られた値のリストとして書かれ、角括弧のペアで囲まれます。

```swift
[<#value 1#>, <#value 2#>, <#value 3#>]
```

以下の例では、`shoppingList`という配列を作成して`String`値を格納します。

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingListは2つの初期項目で初期化されました
```

`shoppingList`変数は「文字列値の配列」として宣言され、`[String]`と書かれます。この特定の配列は`String`の値タイプを指定しているため、`String`値のみを格納できます。ここでは、`shoppingList`配列は2つの`String`値（"Eggs"と"Milk"）で初期化されています。

> 注意: `shoppingList`配列は変数（`var`導入子を使用）として宣言されており、定数（`let`導入子を使用）として宣言されていません。以下の例で買い物リストに項目が追加されるためです。

この場合、配列リテラルには2つの`String`値のみが含まれています。これは`shoppingList`変数の宣言のタイプ（`String`値のみを含むことができる配列）と一致するため、配列リテラルの割り当ては、2つの初期項目で`shoppingList`を初期化する方法として許可されます。

Swiftの型推論のおかげで、同じタイプの値を含む配列リテラルで初期化する場合、配列のタイプを記述する必要はありません。`shoppingList`の初期化は、次のように短く書くこともできます。

```swift
var shoppingList = ["Eggs", "Milk"]
```

配列リテラル内のすべての値が同じタイプであるため、Swiftは`[String]`が`shoppingList`変数に使用する正しいタイプであると推論できます。

### 配列へのアクセスと変更

配列のメソッドやプロパティを使用するか、添字構文を使用して、配列にアクセスして変更します。

配列内の項目数を確認するには、その読み取り専用の`count`プロパティを確認します。

```swift
print("買い物リストには\(shoppingList.count)個の項目があります。")
// "買い物リストには2個の項目があります。"と表示されます。
```

`count`プロパティが0に等しいかどうかを確認するためのショートカットとして、Booleanの`isEmpty`プロパティを使用します。

```swift
if shoppingList.isEmpty {
    print("買い物リストは空です。")
} else {
    print("買い物リストは空ではありません。")
}
// "買い物リストは空ではありません。"と表示されます。
```

配列の末尾に新しい項目を追加するには、配列の`append(_:)`メソッドを呼び出します。

```swift
shoppingList.append("Flour")
// shoppingListには現在3つの項目が含まれており、誰かがパンケーキを作っています
```

代わりに、追加代入演算子（`+=`）を使用して、1つ以上の互換性のある項目の配列を追加します。

```swift
shoppingList += ["Baking Powder"]
// shoppingListには現在4つの項目が含まれています
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
// shoppingListには現在7つの項目が含まれています
```

配列から値を取得するには、配列の名前の直後に角括弧内に取得したい値のインデックスを渡して、添字構文を使用します。

```swift
var firstItem = shoppingList[0]
// firstItemは"Eggs"と等しい
```

> 注意: 配列の最初の項目のインデックスは0であり、1ではありません。Swiftの配列は常にゼロインデックスです。

既存の値を指定されたインデックスで変更するには、添字構文を使用します。

```swift
shoppingList[0] = "Six eggs"
// リストの最初の項目は"Eggs"ではなく"Six eggs"と等しくなりました
```

添字構文を使用する場合、指定したインデックスが有効である必要があります。たとえば、配列の末尾に項目を追加しようとして`shoppingList[shoppingList.count] = "Salt"`と書くと、実行時エラーが発生します。

異なる長さの置換値セットであっても、一度に範囲の値を変更するために添字構文を使用することもできます。次の例では、"Chocolate Spread"、"Cheese"、および"Butter"を"Bananas"と"Apples"に置き換えます。

```swift
shoppingList[4...6] = ["Bananas", "Apples"]
// shoppingListには現在6つの項目が含まれています
```

指定されたインデックスに項目を挿入するには、配列の`insert(_:at:)`メソッドを呼び出します。

```swift
shoppingList.insert("Maple Syrup", at: 0)
// shoppingListには現在7つの項目が含まれています
// "Maple Syrup"はリストの最初の項目になりました
```

この`insert(_:at:)`メソッドの呼び出しは、インデックス0で示される買い物リストの最初に"Maple Syrup"の値を持つ新しい項目を挿入します。

同様に、`remove(at:)`メソッドを使用して配列から項目を削除します。このメソッドは、指定されたインデックスの項目を削除し、削除された項目を返します（必要ない場合は返された値を無視できます）。

```swift
let mapleSyrup = shoppingList.remove(at: 0)
// インデックス0にあった項目が削除されました
// shoppingListには現在6つの項目が含まれており、Maple Syrupはありません
// mapleSyrup定数は削除された"Maple Syrup"文字列と等しくなりました
```

> 注意: 配列の既存の範囲外のインデックスの値にアクセスまたは変更しようとすると、実行時エラーが発生します。インデックスが有効であることを確認するには、配列の`count`プロパティと比較します。配列の最大有効インデックスは`count - 1`です。配列が空の場合（`count`が0の場合）、有効なインデックスはありません。

項目が削除されると、配列のギャップが閉じられるため、インデックス0の値は再び"Six eggs"と等しくなります。

```swift
firstItem = shoppingList[0]
// firstItemは現在"Six eggs"と等しい
```

配列の最後の項目を削除する場合、`remove(at:)`メソッドの代わりに`removeLast()`メソッドを使用して、配列の`count`プロパティを照会する必要を避けます。`remove(at:)`メソッドと同様に、`removeLast()`は削除された項目を返します。

```swift
let apples = shoppingList.removeLast()
// 配列の最後の項目が削除されました
// shoppingListには現在5つの項目が含まれており、Applesはありません
// apples定数は削除された"Apples"文字列と等しくなりました
```

### 配列の反復処理

`for-in`ループを使用して、配列内のすべての値セットを反復処理できます。

```swift
for item in shoppingList {
    print(item)
}
// Six eggs
// Milk
// Flour
// Baking Powder
// Bananas
```

各項目の整数インデックスとその値の両方が必要な場合は、配列を反復処理するために`enumerated()`メソッドを使用します。配列内の各項目に対して、`enumerated()`メソッドは整数と項目で構成されるタプルを返します。整数はゼロから始まり、各項目ごとに1ずつカウントアップします。配列全体を列挙する場合、これらの整数は項目のインデックスと一致します。反復処理の一部としてタプルを一時的な定数または変数に分解できます。

```swift
for (index, value) in shoppingList.enumerated() {
    print("Item \(index + 1): \(value)")
}
// Item 1: Six eggs
// Item 2: Milk
// Item 3: Flour
// Item 4: Baking Powder
// Item 5: Bananas
```

`for-in`ループの詳細については、[For-In Loops](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121)を参照してください。

## セット

セットは、同じタイプの異なる値を順序なしのコレクションに格納します。項目の順序が重要でない場合や、項目が一度だけ出現することを保証する必要がある場合に、配列の代わりにセットを使用できます。

> 注意: SwiftのSetタイプはFoundationのNSSetクラスにブリッジされています。SetをFoundationおよびCocoaと一緒に使用する方法の詳細については、Bridging Between Set and NSSetを参照してください。

### セットタイプのハッシュ値

セットに格納されるためには、タイプはハッシュ可能でなければなりません。つまり、タイプは自分自身のハッシュ値を計算する方法を提供する必要があります。ハッシュ値は`Int`値であり、等しく比較されるすべてのオブジェクトに対して同じです。つまり、`a == b`の場合、`a`のハッシュ値は`b`のハッシュ値と等しくなります。

Swiftの基本的なすべてのタイプ（`String`、`Int`、`Double`、および`Bool`など）はデフォルトでハッシュ可能であり、セットの値タイプや辞書のキータイプとして使用できます。関連値のない列挙ケース値（[Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)で説明されているように）もデフォルトでハッシュ可能です。

> 注意: 独自のカスタムタイプをセットの値タイプや辞書のキータイプとして使用するには、Swift標準ライブラリの`Hashable`プロトコルに準拠させます。必要な`hash(into:)`メソッドの実装については、[Hashable](https://docs.swift.org/swift-book/LanguageGuide/Hashable.html)を参照してください。プロトコルへの準拠については、[Protocols](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)を参照してください。

### セットタイプの構文

Swiftのセットのタイプは`Set<Element>`と書かれます。ここで、`Element`はセットが格納できるタイプです。配列とは異なり、セットには同等の省略記法がありません。

### 空のセットの作成と初期化

初期化子構文を使用して、特定のタイプの空のセットを作成できます。

```swift
var letters = Set<Character>()
print("lettersはSet<Character>タイプで、\(letters.count)個の項目があります。")
// "lettersはSet<Character>タイプで、0個の項目があります。"と表示されます。
```

> 注意: `letters`変数のタイプは、初期化子のタイプから`Set<Character>`と推論されます。

また、関数引数やすでに型指定された変数や定数など、コンテキストがすでに型情報を提供している場合は、空の配列リテラルを使用して空のセットを作成できます。

```swift
letters.insert("a")
// lettersには現在、1つのCharacterタイプの値が含まれています
letters = []
// lettersは現在空のセットですが、依然としてSet<Character>タイプです
```

### 配列リテラルを使用してセットを作成する

配列リテラルを使用してセットを初期化することもできます。これは、1つ以上の値をセットコレクションとして書くための省略記法です。

以下の例では、`favoriteGenres`というセットを作成して`String`値を格納します。

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
// favoriteGenresは3つの初期項目で初期化されました
```

`favoriteGenres`変数は「文字列値のセット」として宣言され、`Set<String>`と書かれます。この特定のセットは`String`の値タイプを指定しているため、`String`値のみを格納できます。ここでは、`favoriteGenres`セットは3つの`String`値（"Rock"、"Classical"、および"Hip hop"）で初期化されています。

> 注意: `favoriteGenres`セットは変数（`var`導入子を使用）として宣言されており、定数（`let`導入子を使用）として宣言されていません。以下の例で項目が追加および削除されるためです。

セットタイプは配列リテラルから推論できないため、`Set`タイプを明示的に宣言する必要があります。ただし、Swiftの型推論のおかげで、同じタイプの値のみを含む配列リテラルで初期化する場合、セットの要素のタイプを記述する必要はありません。`favoriteGenres`の初期化は、次のように短く書くこともできます。

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
```

配列リテラル内のすべての値が同じタイプであるため、Swiftは`Set<String>`が`favoriteGenres`変数に使用する正しいタイプであると推論できます。

### セットへのアクセスと変更

セットのメソッドやプロパティを使用して、セットにアクセスして変更します。

セット内の項目数を確認するには、その読み取り専用の`count`プロパティを確認します。

```swift
print("私は\(favoriteGenres.count)個のお気に入りの音楽ジャンルを持っています。")
// "私は3個のお気に入りの音楽ジャンルを持っています。"と表示されます。
```

`count`プロパティが0に等しいかどうかを確認するためのショートカットとして、Booleanの`isEmpty`プロパティを使用します。

```swift
if favoriteGenres.isEmpty {
    print("音楽に関しては、私はこだわりがありません。")
} else {
    print("私は特定の音楽の好みがあります。")
}
// "私は特定の音楽の好みがあります。"と表示されます。
```

セットに新しい項目を追加するには、セットの`insert(_:)`メソッドを呼び出します。

```swift
favoriteGenres.insert("Jazz")
// favoriteGenresには現在4つの項目が含まれています
```

セットから項目を削除するには、セットの`remove(_:)`メソッドを呼び出します。このメソッドは、セットのメンバーである場合に項目を削除し、削除された値を返すか、セットに含まれていなかった場合は`nil`を返します。代わりに、セット内のすべての項目を`removeAll()`メソッドで削除できます。

```swift
if let removedGenre = favoriteGenres.remove("Rock") {
    print("\(removedGenre)? 私はそれに飽きました。")
} else {
    print("私はそれにあまり興味がありませんでした。")
}
// "Rock? 私はそれに飽きました。"と表示されます。
```

セットに特定の項目が含まれているかどうかを確認するには、`contains(_:)`メソッドを使用します。

```swift
if favoriteGenres.contains("Funk") {
    print("私は良い足で立ち上がります。")
} else {
    print("ここはあまりにもファンキーです。")
}
// "ここはあまりにもファンキーです。"と表示されます。
```

### セットの反復処理

`for-in`ループを使用して、セット内の値を反復処理できます。

```swift
for genre in favoriteGenres {
    print("\(genre)")
}
// Classical
// Jazz
// Hip hop
```

`for-in`ループの詳細については、[For-In Loops](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121)を参照してください。

Swiftの`Set`タイプには定義された順序がありません。特定の順序でセットの値を反復処理するには、`sorted()`メソッドを使用します。このメソッドは、セットの要素を`<`演算子を使用してソートされた配列として返します。

```swift
for genre in favoriteGenres.sorted() {
    print("\(genre)")
}
// Classical
// Hip hop
// Jazz
```

### セット操作の実行

2つのセットを組み合わせたり、2つのセットに共通する値を決定したり、2つのセットがすべて、いくつか、またはまったく同じ値を含むかどうかを判断するなど、基本的なセット操作を効率的に実行できます。

#### 基本的なセット操作

以下の図は、2つのセット`a`と`b`を示しており、さまざまなセット操作の結果が陰影部分で表されています。

- `intersection(_:)`メソッドを使用して、両方のセットに共通する値のみを持つ新しいセットを作成します。
- `symmetricDifference(_:)`メソッドを使用して、どちらかのセットにあるが両方にはない値を持つ新しいセットを作成します。
- `union(_:)`メソッドを使用して、両方のセットにあるすべての値を持つ新しいセットを作成します。
- `subtracting(_:)`メソッドを使用して、指定されたセットにない値を持つ新しいセットを作成します。

```swift
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

oddDigits.union(evenDigits).sorted()
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
oddDigits.intersection(evenDigits).sorted()
// []
oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
// [1, 9]
oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
// [1, 2, 9]
```

#### セットのメンバーシップと等価性

以下の図は、3つのセット`a`、`b`、および`c`を示しており、セット間で共有される要素が重なり合う領域で表されています。セット`a`はセット`b`のスーパーセットです。なぜなら、`a`には`b`のすべての要素が含まれているからです。逆に、セット`b`はセット`a`のサブセットです。なぜなら、`b`のすべての要素が`a`にも含まれているからです。セット`b`とセット`c`は互いに交差していません。なぜなら、共通の要素がないからです。

- 2つのセットがすべて同じ値を含むかどうかを判断するには、「等しい」演算子（`==`）を使用します。
- セットのすべての値が指定されたセットに含まれているかどうかを判断するには、`isSubset(of:)`メソッドを使用します。
- セットが指定されたセットのすべての値を含むかどうかを判断するには、`isSuperset(of:)`メソッドを使用します。
- セットがサブセットまたはスーパーセットであるが、指定されたセットと等しくないかどうかを判断するには、`isStrictSubset(of:)`または`isStrictSuperset(of:)`メソッドを使用します。
- 2つのセットに共通の値がないかどうかを判断するには、`isDisjoint(with:)`メソッドを使用します。

```swift
let houseAnimals: Set = ["🐶", "🐱"]
let farmAnimals: Set = ["🐮", "🐔", "🐑", "🐶", "🐱"]
let cityAnimals: Set = ["🐦", "🐭"]

houseAnimals.isSubset(of: farmAnimals)
// true
farmAnimals.isSuperset(of: houseAnimals)
// true
farmAnimals.isDisjoint(with: cityAnimals)
// true
```

## 辞書

辞書は、同じタイプのキーと同じタイプの値の関連付けを順序なしのコレクションに格納します。各値は、辞書内のその値の識別子として機能する一意のキーに関連付けられています。配列の項目とは異なり、辞書の項目には指定された順序がありません。辞書を使用して、特定の単語の定義を調べるのと同じように、識別子に基づいて値を調べる必要がある場合に辞書を使用します。

> 注意: SwiftのDictionaryタイプはFoundationのNSDictionaryクラスにブリッジされています。DictionaryをFoundationおよびCocoaと一緒に使用する方法の詳細については、Bridging Between Dictionary and NSDictionaryを参照してください。

### 辞書タイプの省略記法

Swiftの辞書のタイプは、`Dictionary<Key, Value>`と完全に書かれます。ここで、`Key`は辞書キーとして使用できる値のタイプであり、`Value`は辞書がそのキーに対して格納する値のタイプです。

> 注意: 辞書キータイプは、セットの値タイプと同様に、`Hashable`プロトコルに準拠している必要があります。

辞書のタイプを省略記法で`[Key: Value]`と書くこともできます。これらの2つの形式は機能的に同一ですが、省略記法の方が好まれ、このガイド全体で辞書のタイプを参照する際に使用されます。

### 空の辞書の作成

配列と同様に、初期化子構文を使用して特定のタイプの空の辞書を作成できます。

```swift
var namesOfIntegers: [Int: String] = [:]
// namesOfIntegersは空の[Int: String]辞書です
```

この例では、整数値の人間が読み取れる名前を格納するために、`[Int: String]`タイプの空の辞書を作成します。キーは`Int`タイプであり、値は`String`タイプです。

コンテキストがすでに型情報を提供している場合は、空の辞書リテラル（`[:]`）を使用して空の辞書を作成できます。

```swift
namesOfIntegers[16] = "sixteen"
// namesOfIntegersには現在1つのキーと値のペアが含まれています
namesOfIntegers = [:]
// namesOfIntegersは再び空の[Int: String]辞書です
```

### 辞書リテラルを使用して辞書を作成する

辞書リテラルを使用して辞書を初期化することもできます。これは、辞書コレクションとして1つ以上のキーと値のペアを記述するための省略記法です。

キーと値のペアは、キーと値の組み合わせです。辞書リテラルでは、各キーと値のペアのキーと値はコロンで区切られます。キーと値のペアはリストとして書かれ、コンマで区切られ、角括弧のペアで囲まれます。

```swift
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#key 3#>: <#value 3#>]
```

以下の例では、国際空港の名前を格納するための辞書を作成します。この辞書では、キーは3文字の国際航空運送協会（IATA）コードであり、値は空港名です。

```swift
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

`airports`辞書は`[String: String]`タイプとして宣言されており、これは「キーが`String`タイプであり、値も`String`タイプの辞書」を意味します。

> 注意: `airports`辞書は変数（`var`導入子を使用）として宣言されており、定数（`let`導入子を使用）として宣言されていません。以下の例で空港が辞書に追加されるためです。

`airports`辞書は、2つのキーと値のペアを含む辞書リテラルで初期化されます。最初のペアのキーは"YYZ"であり、値は"Toronto Pearson"です。2番目のペアのキーは"DUB"であり、値は"Dublin"です。

この辞書リテラルには2つの`String: String`ペアが含まれています。このキーと値のタイプは`airports`変数の宣言のタイプ（キーが`String`であり、値も`String`である辞書）と一致するため、辞書リテラルの割り当ては、2つの初期項目で`airports`を初期化する方法として許可されます。

配列と同様に、同じタイプのキーと値を持つ辞書リテラルで初期化する場合、辞書のタイプを記述する必要はありません。`airports`の初期化は、次のように短く書くこともできます。

```swift
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

リテラル内のすべてのキーが互いに同じタイプであり、同様にすべての値が互いに同じタイプであるため、Swiftは`[String: String]`が`airports`辞書に使用する正しいタイプであると推論できます。

### 辞書へのアクセスと変更

辞書のメソッドやプロパティを使用するか、添字構文を使用して、辞書にアクセスして変更します。

配列と同様に、辞書内の項目数を確認するには、その読み取り専用の`count`プロパティを確認します。

```swift
print("空港辞書には\(airports.count)個の項目が含まれています。")
// "空港辞書には2個の項目が含まれています。"と表示されます。
```

`count`プロパティが0に等しいかどうかを確認するためのショートカットとして、Booleanの`isEmpty`プロパティを使用します。

```swift
if airports.isEmpty {
    print("空港辞書は空です。")
} else {
    print("空港辞書は空ではありません。")
}
// "空港辞書は空ではありません。"と表示されます。
```

辞書に新しい項目を追加するには、添字構文を使用します。適切なタイプの新しいキーを添字インデックスとして使用し、適切なタイプの新しい値を割り当てます。

```swift
airports["LHR"] = "London"
// 空港辞書には現在3つの項目が含まれています
```

特定のキーに関連付けられた値を変更するために、添字構文を使用することもできます。

```swift
airports["LHR"] = "London Heathrow"
// "LHR"の値が"London Heathrow"に変更されました
```

添字の代わりに、辞書の`updateValue(_:forKey:)`メソッドを使用して、特定のキーの値を設定または更新します。上記の添字の例と同様に、`updateValue(_:forKey:)`メソッドは、キーが存在しない場合は値を設定し、キーがすでに存在する場合は値を更新します。ただし、添字とは異なり、`updateValue(_:forKey:)`メソッドは更新後に古い値を返します。これにより、更新が行われたかどうかを確認できます。

`updateValue(_:forKey:)`メソッドは、辞書の値タイプのオプション値を返します。たとえば、`String`値を格納する辞書の場合、このメソッドは`String?`タイプの値、つまり「オプションのString」を返します。このオプション値には、更新前にそのキーに対して存在していた古い値が含まれているか、値が存在しなかった場合は`nil`が含まれます。

```swift
if let oldValue = airports.updateValue("Dublin Airport", forKey: "DUB") {
    print("DUBの古い値は\(oldValue)でした。")
}
// "DUBの古い値はDublinでした。"と表示されます。
```

特定のキーの値を辞書から取得するために、添字構文を使用することもできます。値が存在しないキーを要求することが可能であるため、辞書の添字は辞書の値タイプのオプション値を返します。辞書に要求されたキーの値が含まれている場合、添字はそのキーの既存の値を含むオプション値を返します。それ以外の場合、添字は`nil`を返します。

```swift
if let airportName = airports["DUB"] {
    print("空港の名前は\(airportName)です。")
} else {
    print("その空港は空港辞書に含まれていません。")
}
// "空港の名前はDublin Airportです。"と表示されます。
```

特定のキーの値を`nil`に割り当てることで、辞書からキーと値のペアを削除できます。

```swift
airports["APL"] = "Apple International"
// "Apple International"はAPLの実際の空港ではないため、削除します
airports["APL"] = nil
// APLは辞書から削除されました
```

代わりに、`removeValue(forKey:)`メソッドを使用して辞書からキーと値のペアを削除します。このメソッドは、存在する場合はキーと値のペアを削除し、削除された値を返すか、値が存在しなかった場合は`nil`を返します。

```swift
if let removedValue = airports.removeValue(forKey: "DUB") {
    print("削除された空港の名前は\(removedValue)です。")
} else {
    print("空港辞書にはDUBの値が含まれていません。")
}
// "削除された空港の名前はDublin Airportです。"と表示されます。
```

### 辞書の反復処理

`for-in`ループを使用して、辞書内のキーと値のペアを反復処理できます。辞書内の各項目は`(key, value)`タプルとして返され、反復処理の一部としてタプルのメンバーを一時的な定数または変数に分解できます。

```swift
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// LHR: London Heathrow
// YYZ: Toronto Pearson
```

`for-in`ループの詳細については、[For-In Loops](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID121)を参照してください。

辞書の`keys`および`values`プロパティにアクセスすることで、辞書のキーまたは値の反復可能なコレクションを取得することもできます。

```swift
for airportCode in airports.keys {
    print("空港コード: \(airportCode)")
}
// 空港コード: LHR
// 空港コード: YYZ

for airportName in airports.values {
    print("空港名: \(airportName)")
}
// 空港名: London Heathrow
// 空港名: Toronto Pearson
```

`Array`インスタンスを受け取るAPIで辞書のキーまたは値を使用する必要がある場合は、`keys`または`values`プロパティを使用して新しい配列を初期化します。

```swift
let airportCodes = [String](airports.keys)
// airportCodesは["LHR", "YYZ"]

let airportNames = [String](airports.values)
// airportNamesは["London Heathrow", "Toronto Pearson"]
```

Swiftの`Dictionary`タイプには定義された順序がありません。特定の順序で辞書のキーまたは値を反復処理するには、`keys`または`values`プロパティに対して`sorted()`メソッドを使用します。