# オプショナルチェーン

オプショナル値をアンラップせずにメンバーにアクセスする。

オプショナルチェーンは、現在nilである可能性のあるオプショナルのプロパティ、メソッド、およびサブスクリプトを照会および呼び出すプロセスです。オプショナルに値が含まれている場合、プロパティ、メソッド、またはサブスクリプトの呼び出しは成功します。オプショナルがnilの場合、プロパティ、メソッド、またはサブスクリプトの呼び出しはnilを返します。複数のクエリをチェーンでつなげることができ、チェーン内のどのリンクがnilであっても、チェーン全体が優雅に失敗します。

> **注**: Swiftのオプショナルチェーンは、Objective-Cでnilにメッセージを送るのと似ていますが、任意の型に対して機能し、成功または失敗をチェックできる点が異なります。

## 強制アンラップの代替としてのオプショナルチェーン

オプショナルチェーンを指定するには、プロパティ、メソッド、またはサブスクリプトを呼び出したいオプショナル値の後に疑問符（`?`）を置きます。これは、オプショナル値の後に感嘆符（`!`）を置いてその値のアンラップを強制するのと非常に似ています。主な違いは、オプショナルがnilの場合、オプショナルチェーンは優雅に失敗するのに対し、強制アンラップはオプショナルがnilの場合にランタイムエラーを引き起こすことです。

オプショナルチェーンがnil値で呼び出される可能性があることを反映して、オプショナルチェーン呼び出しの結果は常にオプショナル値になります。プロパティ、メソッド、またはサブスクリプトが非オプショナル値を返す場合でも、オプショナルチェーン呼び出しの結果は常にオプショナル値になります。このオプショナルの戻り値を使用して、オプショナルチェーン呼び出しが成功したかどうか（返されたオプショナルに値が含まれているか）、またはチェーン内のnil値のために成功しなかったか（返されたオプショナル値がnilであるか）を確認できます。

具体的には、オプショナルチェーン呼び出しの結果は、期待される戻り値の型と同じですが、オプショナルでラップされています。通常`Int`を返すプロパティは、オプショナルチェーンを介してアクセスされると`Int?`を返します。

次のいくつかのコードスニペットは、オプショナルチェーンが強制アンラップとどのように異なり、成功を確認できるかを示しています。

まず、`Person`と`Residence`という2つのクラスを定義します：

```swift
class Person {
    var residence: Residence?
}

class Residence {
    var numberOfRooms = 1
}
```

`Residence`インスタンスには、デフォルト値が1の`numberOfRooms`という単一の`Int`プロパティがあります。`Person`インスタンスには、`Residence?`型のオプショナルな`residence`プロパティがあります。

新しい`Person`インスタンスを作成すると、その`residence`プロパティはオプショナルであるため、デフォルトでnilに初期化されます。以下のコードでは、`john`の`residence`プロパティ値はnilです：

```swift
let john = Person()
```

この人の`residence`の`numberOfRooms`プロパティにアクセスしようとして、感嘆符を`residence`の後に置いてその値のアンラップを強制すると、アンラップする`residence`の値がないため、ランタイムエラーが発生します：

```swift
let roomCount = john.residence!.numberOfRooms
// これはランタイムエラーを引き起こします
```

上記のコードは、`john.residence`が非nil値を持つ場合に成功し、適切な部屋数を含む`Int`値に`roomCount`を設定します。しかし、上記のように`residence`がnilの場合、このコードは常にランタイムエラーを引き起こします。

オプショナルチェーンは、`numberOfRooms`の値にアクセスする別の方法を提供します。オプショナルチェーンを使用するには、感嘆符の代わりに疑問符を使用します：

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("部屋数を取得できませんでした。")
}
// "部屋数を取得できませんでした。"と出力されます。
```

これは、Swiftにオプショナルな`residence`プロパティに「チェーン」し、`residence`が存在する場合に`numberOfRooms`の値を取得するように指示します。

`numberOfRooms`にアクセスしようとする試みが失敗する可能性があるため、オプショナルチェーンの試みは`Int?`型、つまり「オプショナルなInt」の値を返します。上記の例のように、`residence`がnilの場合、このオプショナルな`Int`もnilになり、`numberOfRooms`にアクセスできなかったことを反映します。オプショナルな`Int`は、オプショナルバインディングを通じて整数をアンラップし、非オプショナルな値を`roomCount`定数に割り当てます。

これは、`numberOfRooms`が非オプショナルな`Int`である場合でも同様です。オプショナルチェーンを介してクエリされるという事実は、`numberOfRooms`の呼び出しが常に`Int?`を返すことを意味します。

`john.residence`に`Residence`インスタンスを割り当てることができ、これによりnil値ではなくなります：

```swift
john.residence = Residence()
```

`john.residence`は現在、nilではなく実際の`Residence`インスタンスを含んでいます。以前と同じオプショナルチェーンを使用して`numberOfRooms`にアクセスしようとすると、デフォルトの`numberOfRooms`値1を含む`Int?`を返します：

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("部屋数を取得できませんでした。")
}
// "John's residence has 1 room(s)."と出力されます。
```

## オプショナルチェーンのためのモデルクラスの定義

オプショナルチェーンを使用すると、プロパティ、メソッド、およびサブスクリプトへの呼び出しが複数レベル深くても使用できます。これにより、複雑な相互関連タイプのモデル内のサブプロパティにドリルダウンし、それらのサブプロパティのプロパティ、メソッド、およびサブスクリプトにアクセスできるかどうかを確認できます。

以下のコードスニペットは、いくつかの後続の例で使用するための4つのモデルクラスを定義しており、マルチレベルのオプショナルチェーンの例も含まれています。これらのクラスは、上記の `Person` と `Residence` モデルを拡張し、関連するプロパティ、メソッド、およびサブスクリプトを持つ `Room` と `Address` クラスを追加しています。

`Person` クラスは以前と同じ方法で定義されています：

```swift
class Person {
    var residence: Residence?
}
```

`Residence` クラスは以前よりも複雑です。今回は、`Residence` クラスは `rooms` という変数プロパティを定義しており、これは `[Room]` 型の空の配列で初期化されています：

```swift
class Residence {
    var rooms: [Room] = []
    var numberOfRooms: Int {
        return rooms.count
    }
    subscript(i: Int) -> Room {
        get {
            return rooms[i]
        }
        set {
            rooms[i] = newValue
        }
    }
    func printNumberOfRooms() {
        print("The number of rooms is \(numberOfRooms)")
    }
    var address: Address?
}
```

このバージョンの `Residence` は `Room` インスタンスの配列を格納しているため、その `numberOfRooms` プロパティは格納プロパティではなく計算プロパティとして実装されています。計算プロパティ `numberOfRooms` は単に `rooms` 配列の `count` プロパティの値を返します。

`rooms` 配列にアクセスするためのショートカットとして、このバージョンの `Residence` は、`rooms` 配列の要求されたインデックスにある部屋にアクセスするための読み書き可能なサブスクリプトを提供します。

このバージョンの `Residence` は、単にレジデンスの部屋の数を印刷する `printNumberOfRooms` というメソッドも提供します。

最後に、`Residence` は `Address?` 型のオプショナルプロパティ `address` を定義しています。このプロパティの `Address` クラスタイプは以下で定義されています。

`rooms` 配列に使用される `Room` クラスは、`name` という1つのプロパティを持ち、そのプロパティを適切な部屋の名前に設定するためのイニシャライザを持つシンプルなクラスです：

```swift
class Room {
    let name: String
    init(name: String) { self.name = name }
}
```

このモデルの最後のクラスは `Address` と呼ばれます。このクラスには `String?` 型の3つのオプショナルプロパティがあります。最初の2つのプロパティ、`buildingName` と `buildingNumber` は、住所の一部として特定の建物を識別するための代替方法です。3つ目のプロパティ、`street` はその住所の通りの名前を指定するために使用されます：

```swift
class Address {
    var buildingName: String?
    var buildingNumber: String?
    var street: String?
    func buildingIdentifier() -> String? {
        if let buildingNumber = buildingNumber, let street = street {
            return "\(buildingNumber) \(street)"
        } else if buildingName != nil {
            return buildingName
        } else {
            return nil
        }
    }
}
```

`Address` クラスは `String?` 型の戻り値を持つ `buildingIdentifier()` というメソッドも提供します。このメソッドは住所のプロパティをチェックし、`buildingName` に値がある場合はそれを返し、`buildingNumber` と `street` の両方に値がある場合はそれらを連結して返し、そうでない場合は nil を返します。

## オプショナルチェーンを通じたプロパティへのアクセス

[強制アンラップの代替としてのオプショナルチェーン](#optional-chaining-as-an-alternative-to-forced-unwrapping)で示したように、オプショナルチェーンを使用してオプショナル値のプロパティにアクセスし、そのプロパティアクセスが成功するかどうかを確認できます。

上記で定義されたクラスを使用して新しい `Person` インスタンスを作成し、以前と同じようにその `numberOfRooms` プロパティにアクセスしてみてください：

```swift
let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
// Prints "Unable to retrieve the number of rooms."
```

`john.residence` が nil であるため、このオプショナルチェーンの呼び出しは以前と同じように失敗します。

プロパティの値をオプショナルチェーンを通じて設定しようとすることもできます：

```swift
let someAddress = Address()
someAddress.buildingNumber = "29"
someAddress.street = "Acacia Road"
john.residence?.address = someAddress
```

この例では、`john.residence` が現在 nil であるため、`john.residence` の `address` プロパティを設定しようとする試みは失敗します。

この代入はオプショナルチェーンの一部であり、`=` 演算子の右側のコードは評価されません。前の例では、定数にアクセスすることに副作用がないため、`someAddress` が評価されないことは簡単にはわかりません。以下のリストは同じ代入を行いますが、アドレスを作成するために関数を使用します。この関数は値を返す前に「Function was called」と印刷するため、`=` 演算子の右側が評価されたかどうかを確認できます。

```swift
func createAddress() -> Address {
    print("Function was called.")

    let someAddress = Address()
    someAddress.buildingNumber = "29"
    someAddress.street = "Acacia Road"

    return someAddress
}
john.residence?.address = createAddress()
```

`createAddress()` 関数が呼び出されていないことがわかります。なぜなら、何も印刷されないからです。

## オプショナルチェーンを使ったメソッドの呼び出し

オプショナルチェーンを使用して、オプショナル値のメソッドを呼び出し、そのメソッド呼び出しが成功したかどうかを確認できます。この方法は、そのメソッドが戻り値を定義していない場合でも使用できます。

`Residence`クラスの`printNumberOfRooms()`メソッドは、`numberOfRooms`の現在の値を出力します。メソッドは次のようになります：

```swift
func printNumberOfRooms() {
    print("The number of rooms is \(numberOfRooms)")
}
```

このメソッドは戻り値の型を指定していません。しかし、戻り値のない関数やメソッドには、[戻り値のない関数](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID174)で説明されているように、暗黙の戻り値の型として`Void`が設定されています。これは、`()`または空のタプルの値を返すことを意味します。

オプショナル値に対してオプショナルチェーンを使用してこのメソッドを呼び出すと、メソッドの戻り値の型は`Void`ではなく`Void?`になります。これは、オプショナルチェーンを通じて呼び出された場合、戻り値は常にオプショナル型になるためです。これにより、`printNumberOfRooms()`メソッドを呼び出すことが可能かどうかを確認するために、`if`文を使用できます。メソッド呼び出しが成功したかどうかを確認するために、`printNumberOfRooms`呼び出しの戻り値をnilと比較します：

```swift
if john.residence?.printNumberOfRooms() != nil {
    print("部屋の数を出力することができました。")
} else {
    print("部屋の数を出力することができませんでした。")
}
// "部屋の数を出力することができませんでした。"と出力されます。
```

オプショナルチェーンを使用してプロパティを設定しようとする場合も同様です。[オプショナルチェーンを使ったプロパティのアクセス](#accessing-properties-through-optional-chaining)の上記の例では、`residence`プロパティがnilであるにもかかわらず、`john.residence`のアドレス値を設定しようとしています。オプショナルチェーンを通じてプロパティを設定しようとすると、`Void?`型の値が返され、プロパティが正常に設定されたかどうかを確認するためにnilと比較できます：

```swift
if (john.residence?.address = someAddress) != nil {
    print("アドレスを設定することができました。")
} else {
    print("アドレスを設定することができませんでした。")
}
// "アドレスを設定することができませんでした。"と出力されます。
```

## オプショナルチェーンを使ったサブスクリプトのアクセス

オプショナルチェーンを使用して、オプショナル値のサブスクリプトから値を取得および設定し、そのサブスクリプト呼び出しが成功したかどうかを確認できます。

> **注意**: オプショナル値のサブスクリプトにオプショナルチェーンを使用する場合、サブスクリプトの角括弧の後ではなく、前に疑問符を置きます。オプショナルチェーンの疑問符は、常にオプショナルである式の部分の直後に続きます。

次の例では、`john.residence`プロパティの`rooms`配列の最初の部屋の名前を、`Residence`クラスで定義されたサブスクリプトを使用して取得しようとしています。`john.residence`は現在nilであるため、サブスクリプト呼び出しは失敗します：

```swift
if let firstRoomName = john.residence?[0].name {
    print("最初の部屋の名前は\(firstRoomName)です。")
} else {
    print("最初の部屋の名前を取得できませんでした。")
}
// "最初の部屋の名前を取得できませんでした。"と出力されます。
```

このサブスクリプト呼び出しのオプショナルチェーンの疑問符は、サブスクリプトの角括弧の前に置かれています。これは、`john.residence`がオプショナル値であり、オプショナルチェーンが試みられているためです。

同様に、オプショナルチェーンを使用してサブスクリプトを介して新しい値を設定しようとすることもできます：

```swift
john.residence?[0] = Room(name: "Bathroom")
```

このサブスクリプト設定の試みも失敗します。なぜなら、`residence`は現在nilだからです。

`john.residence`に1つ以上の`Room`インスタンスを持つ実際の`Residence`インスタンスを作成して割り当てると、オプショナルチェーンを使用して`Residence`サブスクリプトを介して`rooms`配列の実際のアイテムにアクセスできます：

```swift
let johnsHouse = Residence()
johnsHouse.rooms.append(Room(name: "Living Room"))
johnsHouse.rooms.append(Room(name: "Kitchen"))
john.residence = johnsHouse

if let firstRoomName = john.residence?[0].name {
    print("最初の部屋の名前は\(firstRoomName)です。")
} else {
    print("最初の部屋の名前を取得できませんでした。")
}
// "最初の部屋の名前はLiving Roomです。"と出力されます。
```

## オプショナル型のサブスクリプトへのアクセス

サブスクリプトがオプショナル型の値を返す場合（Swiftの`Dictionary`型のキーサブスクリプトなど）、オプショナルの戻り値にチェーンするためにサブスクリプトの閉じ括弧の後に疑問符を置きます：

```swift
var testScores = ["Dave": [86, 82, 84], "Bev": [79, 94, 81]]
testScores["Dave"]?[0] = 91
testScores["Bev"]?[0] += 1
testScores["Brian"]?[0] = 72
// "Dave"の配列は現在[91, 82, 84]であり、"Bev"の配列は現在[80, 94, 81]です
```

上記の例では、`testScores`という辞書を定義しています。この辞書には、`String`キーを`Int`値の配列にマッピングする2つのキーと値のペアが含まれています。この例では、オプショナルチェーンを使用して、"Dave"配列の最初のアイテムを91に設定し、"Bev"配列の最初のアイテムを1増やし、"Brian"キーの配列の最初のアイテムを設定しようとしています。最初の2つの呼び出しは成功します。なぜなら、`testScores`辞書には"Dave"と"Bev"のキーが含まれているからです。3番目の呼び出しは失敗します。なぜなら、`testScores`辞書には"Brian"のキーが含まれていないからです。

## 複数レベルのチェーンのリンク

オプショナルチェーンを複数レベルでリンクして、モデル内のプロパティ、メソッド、およびサブスクリプトを深く掘り下げることができます。ただし、複数レベルのオプショナルチェーンは、返される値にオプショナリティのレベルを追加しません。

別の言い方をすると：

- 取得しようとしている型がオプショナルでない場合、オプショナルチェーンのためにオプショナルになります。
- 取得しようとしている型がすでにオプショナルである場合、チェーンのためにさらにオプショナルにはなりません。

したがって：

- オプショナルチェーンを通じて `Int` 値を取得しようとすると、使用されるチェーンのレベルに関係なく、常に `Int?` が返されます。
- 同様に、オプショナルチェーンを通じて `Int?` 値を取得しようとすると、使用されるチェーンのレベルに関係なく、常に `Int?` が返されます。

以下の例では、`john` の `residence` プロパティの `address` プロパティの `street` プロパティにアクセスしようとしています。ここでは、オプショナル型の `residence` および `address` プロパティをチェーンするために、2 レベルのオプショナルチェーンが使用されています：

```swift
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// "Unable to retrieve the address." と出力されます。
```

`john.residence` の値には現在、有効な `Residence` インスタンスが含まれています。ただし、`john.residence.address` の値は現在 nil です。このため、`john.residence?.address?.street` の呼び出しは失敗します。

上記の例では、`street` プロパティの値を取得しようとしています。このプロパティの型は `String?` です。したがって、`john.residence?.address?.street` の戻り値も `String?` です。これは、プロパティの基礎となるオプショナル型に加えて、2 レベルのオプショナルチェーンが適用されているためです。

`john.residence.address` の値として実際の `Address` インスタンスを設定し、アドレスの `street` プロパティに実際の値を設定すると、複数レベルのオプショナルチェーンを通じて `street` プロパティの値にアクセスできます：

```swift
let johnsAddress = Address()
johnsAddress.buildingName = "The Larches"
johnsAddress.street = "Laurel Street"
john.residence?.address = johnsAddress

if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
// "John's street name is Laurel Street." と出力されます。
```

この例では、`john.residence` の値には現在、有効な `Residence` インスタンスが含まれているため、`john.residence` の `address` プロパティを設定する試みは成功します。

## オプショナルな戻り値を持つメソッドのチェーン

前の例では、オプショナル型のプロパティの値をオプショナルチェーンを通じて取得する方法を示しました。オプショナルチェーンを使用して、オプショナル型の値を返すメソッドを呼び出し、そのメソッドの戻り値にチェーンすることもできます。

以下の例では、オプショナルチェーンを通じて `Address` クラスの `buildingIdentifier()` メソッドを呼び出しています。このメソッドは `String?` 型の値を返します。前述のように、オプショナルチェーンの後のこのメソッド呼び出しの最終的な戻り値の型も `String?` です：

```swift
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
// "John's building identifier is The Larches." と出力されます。
```

このメソッドの戻り値にさらにオプショナルチェーンを実行したい場合は、メソッドの括弧の後にオプショナルチェーンの疑問符を配置します：

```swift
if let beginsWithThe =
    john.residence?.address?.buildingIdentifier()?.hasPrefix("The") {
    if beginsWithThe {
        print("John's building identifier begins with \"The\".")
    } else {
        print("John's building identifier doesn't begin with \"The\".")
    }
}
// "John's building identifier begins with "The"." と出力されます。
```

> **注**: 上記の例では、オプショナルチェーンの疑問符を括弧の後に配置しています。これは、チェーンしているオプショナル値が `buildingIdentifier()` メソッド自体ではなく、その戻り値であるためです。