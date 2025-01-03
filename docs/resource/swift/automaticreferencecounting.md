# 自動参照カウント

オブジェクトのライフタイムとその関係をモデル化します。

Swiftは自動参照カウント（ARC）を使用して、アプリのメモリ使用量を追跡および管理します。ほとんどの場合、これによりメモリ管理はSwiftで「ただ動作する」ため、メモリ管理について自分で考える必要はありません。ARCは、クラスインスタンスが不要になったときにそのメモリを自動的に解放します。

ただし、いくつかのケースでは、ARCがメモリを管理するためにコードの部分間の関係についての追加情報を必要とします。この章では、これらの状況について説明し、ARCがアプリのすべてのメモリを管理できるようにする方法を示します。SwiftでARCを使用することは、Objective-CでARCを使用するためのアプローチを説明した[ARC移行リリースノート](https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/)に非常に似ています。

参照カウントはクラスのインスタンスにのみ適用されます。構造体と列挙型は値型であり、参照型ではないため、参照によって保存および渡されることはありません。

## ARCの仕組み

クラスの新しいインスタンスを作成するたびに、ARCはそのインスタンスに関する情報を格納するためのメモリのチャンクを割り当てます。このメモリには、インスタンスの型に関する情報と、そのインスタンスに関連付けられた格納プロパティの値が含まれます。

さらに、インスタンスが不要になったとき、ARCはそのインスタンスが使用していたメモリを解放し、そのメモリを他の目的に使用できるようにします。これにより、クラスインスタンスが不要になったときにメモリを占有し続けることがなくなります。

しかし、ARCがまだ使用中のインスタンスを解放してしまうと、そのインスタンスのプロパティにアクセスしたり、そのインスタンスのメソッドを呼び出したりすることができなくなります。実際に、インスタンスにアクセスしようとすると、アプリがクラッシュする可能性が高くなります。

インスタンスが必要な間は消えないようにするために、ARCは現在各クラスインスタンスを参照しているプロパティ、定数、および変数の数を追跡します。少なくとも1つのアクティブな参照が存在する限り、ARCはインスタンスを解放しません。

これを可能にするために、クラスインスタンスをプロパティ、定数、または変数に割り当てるたびに、そのプロパティ、定数、または変数はインスタンスへの強い参照を作成します。この参照は「強い」参照と呼ばれ、その強い参照が存在する限り、そのインスタンスが解放されないようにしっかりと保持します。

## ARCの動作

ここに、自動参照カウントがどのように機能するかの例があります。この例は、`Person`というシンプルなクラスから始まります。このクラスは、`name`という格納定数プロパティを定義しています：

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}
```

`Person`クラスには、インスタンスの`name`プロパティを設定し、初期化が進行中であることを示すメッセージを出力するイニシャライザがあります。また、`Person`クラスには、クラスのインスタンスが解放されるときにメッセージを出力するデイニシャライザもあります。

次のコードスニペットでは、`Person?`型の3つの変数を定義しています。これらの変数は、後続のコードスニペットで新しい`Person`インスタンスへの複数の参照を設定するために使用されます。これらの変数はオプショナル型（`Person?`、`Person`ではない）であるため、自動的に`nil`の値で初期化され、現在は`Person`インスタンスを参照していません。

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
```

これで、新しい`Person`インスタンスを作成し、それをこれらの3つの変数の1つに割り当てることができます：

```swift
reference1 = Person(name: "John Appleseed")
// Prints "John Appleseed is being initialized"
```

`Person`クラスのイニシャライザを呼び出した時点で、「John Appleseed is being initialized」というメッセージが出力されることに注意してください。これは、初期化が行われたことを確認するものです。

新しい`Person`インスタンスが`reference1`変数に割り当てられたため、`reference1`から新しい`Person`インスタンスへの強い参照が作成されました。少なくとも1つの強い参照が存在するため、ARCはこの`Person`がメモリに保持され、解放されないようにします。

同じ`Person`インスタンスをさらに2つの変数に割り当てると、そのインスタンスへの強い参照が2つ追加されます：

```swift
reference2 = reference1
reference3 = reference1
```

これで、この単一の`Person`インスタンスに対して3つの強い参照が存在します。

これらの強い参照のうち2つ（元の参照を含む）を`nil`に割り当てることで解除すると、1つの強い参照が残り、`Person`インスタンスは解放されません：

```swift
reference1 = nil
reference2 = nil
```

ARCは、3つ目の最後の強い参照が解除されるまで`Person`インスタンスを解放しません。この時点で、`Person`インスタンスがもう使用されていないことが明確になります：

```swift
reference3 = nil
// Prints "John Appleseed is being deinitialized"
```

## クラスインスタンス間の強い参照サイクル

上記の例では、ARCは新しい`Person`インスタンスへの参照の数を追跡し、その`Person`インスタンスが不要になったときに解放します。

しかし、クラスインスタンスがゼロの強い参照を持つことがないコードを書くことが可能です。これは、2つのクラスインスタンスが互いに強い参照を保持し、各インスタンスが他方を生かし続ける場合に発生します。これを強い参照サイクルと呼びます。

強い参照サイクルを解決するには、クラス間の関係の一部を強い参照ではなく、弱い参照または非所有参照として定義します。このプロセスは[クラスインスタンス間の強い参照サイクルの解決](#resolving-strong-reference-cycles-between-class-instances)で説明されています。ただし、強い参照サイクルを解決する方法を学ぶ前に、そのようなサイクルがどのように引き起こされるかを理解することが役立ちます。

ここに、誤って強い参照サイクルを作成する方法の例があります。この例では、`Person`と`Apartment`という2つのクラスを定義しています。これらのクラスは、アパートのブロックとその住人をモデル化しています：

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

各`Person`インスタンスには`String`型の`name`プロパティと、最初は`nil`であるオプショナルな`apartment`プロパティがあります。`apartment`プロパティはオプショナルであり、人が常にアパートを持っているわけではないためです。

同様に、各`Apartment`インスタンスには`String`型の`unit`プロパティがあり、最初は`nil`であるオプショナルな`tenant`プロパティがあります。`tenant`プロパティはオプショナルであり、アパートが常に住人を持っているわけではないためです。

これらのクラスの両方にはデイニシャライザも定義されており、そのクラスのインスタンスが解放されるときにその事実を出力します。これにより、`Person`および`Apartment`のインスタンスが期待通りに解放されているかどうかを確認できます。

次のコードスニペットでは、特定の`Apartment`および`Person`インスタンスに設定されるオプショナル型の`john`および`unit4A`という2つの変数を定義しています。これらの変数はオプショナルであるため、初期値は`nil`です：

```swift
var john: Person?
var unit4A: Apartment?
```

これで、特定の`Person`インスタンスと`Apartment`インスタンスを作成し、これらの新しいインスタンスを`john`および`unit4A`変数に割り当てることができます：

```swift
john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
```

これらの2つのインスタンスを作成して割り当てた後の強い参照は次のようになります。`john`変数は新しい`Person`インスタンスへの強い参照を持ち、`unit4A`変数は新しい`Apartment`インスタンスへの強い参照を持っています：

これで、2つのインスタンスをリンクして、人がアパートを持ち、アパートが住人を持つようにすることができます。感嘆符（`!`）を使用して、`john`および`unit4A`オプショナル変数内に格納されているインスタンスをアンラップしてアクセスし、それらのインスタンスのプロパティを設定します：

```swift
john!.apartment = unit4A
unit4A!.tenant = john
```

これで、2つのインスタンスをリンクした後の強い参照は次のようになります：

残念ながら、これらの2つのインスタンスをリンクすると、それらの間に強い参照サイクルが作成されます。`Person`インスタンスは`Apartment`インスタンスへの強い参照を持ち、`Apartment`インスタンスは`Person`インスタンスへの強い参照を持っています。したがって、`john`および`unit4A`変数によって保持されている強い参照を解除しても、参照カウントはゼロにならず、インスタンスはARCによって解放されません：

```swift
john = nil
unit4A = nil
```

これらの2つの変数を`nil`に設定したときに、どちらのデイニシャライザも呼び出されなかったことに注意してください。強い参照サイクルにより、`Person`および`Apartment`インスタンスが解放されることはなく、アプリにメモリリークが発生します。

`john`および`unit4A`変数を`nil`に設定した後の強い参照は次のようになります：

`Person`インスタンスと`Apartment`インスタンスの間の強い参照は残り、解除することはできません。

## クラスインスタンス間の強い参照サイクルの解決

Swiftは、クラス型のプロパティを使用する場合に強い参照サイクルを解決するための2つの方法を提供します：弱い参照と非所有参照です。

弱い参照と非所有参照を使用すると、参照サイクル内の1つのインスタンスが他のインスタンスを強く保持せずに参照できます。これにより、インスタンスは強い参照サイクルを作成せずに互いに参照できます。

他のインスタンスのライフタイムが短い場合、つまり他のインスタンスが先に解放される可能性がある場合は、弱い参照を使用します。上記の`Apartment`の例では、アパートがそのライフタイムのある時点で住人を持たないことが適切であるため、この場合、弱い参照は参照サイクルを解決するための適切な方法です。対照的に、他のインスタンスのライフタイムが同じか長い場合は、非所有参照を使用します。

### 弱参照

弱参照は、参照先のインスタンスを強く保持しない参照であり、ARCが参照先のインスタンスを破棄するのを防ぎません。この動作により、参照が強参照サイクルの一部になるのを防ぎます。プロパティや変数の宣言の前に `weak` キーワードを置くことで、弱参照を示します。

弱参照は参照先のインスタンスを強く保持しないため、そのインスタンスが弱参照がまだそれを参照している間に解放される可能性があります。したがって、ARCは参照先のインスタンスが解放されると自動的に弱参照を `nil` に設定します。また、弱参照は実行時に値を `nil` に変更できる必要があるため、常に変数として宣言され、オプショナル型になります。

弱参照の値の存在を他のオプショナル値と同様に確認でき、存在しなくなった無効なインスタンスへの参照を持つことはありません。

> **注意:** ARCが弱参照を `nil` に設定するとき、プロパティオブザーバは呼び出されません。

以下の例は、上記の `Person` と `Apartment` の例と同じですが、1つ重要な違いがあります。今回は、`Apartment` 型の `tenant` プロパティが弱参照として宣言されています。

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

2つの変数 (`john` と `unit4A`) からの強参照と2つのインスタンス間のリンクは、以前と同じように作成されます。

```swift
var john: Person?
var unit4A: Apartment?

john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")

john!.apartment = unit4A
unit4A!.tenant = john
```

2つのインスタンスをリンクした後の参照は次のようになります。

`Person` インスタンスは `Apartment` インスタンスへの強参照を持っていますが、`Apartment` インスタンスは `Person` インスタンスへの弱参照を持っています。これは、`john` 変数を `nil` に設定して強参照を解除すると、`Person` インスタンスへの強参照がなくなることを意味します。

```swift
john = nil
// "John Appleseed is being deinitialized" と出力されます
```

`Person` インスタンスへの強参照がなくなったため、解放され、`tenant` プロパティは `nil` に設定されます。

`Apartment` インスタンスへの唯一の残りの強参照は `unit4A` 変数からのものです。この強参照を解除すると、`Apartment` インスタンスへの強参照がなくなります。

```swift
unit4A = nil
// "Apartment 4A is being deinitialized" と出力されます
```

`Apartment` インスタンスへの強参照がなくなったため、これも解放されます。

> **注意:** ガベージコレクションを使用するシステムでは、弱ポインタは単純なキャッシュメカニズムを実装するために使用されることがあります。なぜなら、強参照がないオブジェクトはメモリ圧迫がガベージコレクションをトリガーするまで解放されないからです。しかし、ARCでは、最後の強参照が削除されるとすぐに値が解放されるため、弱参照はそのような目的には適していません。

### 非所有参照

弱参照と同様に、非所有参照も参照先のインスタンスを強く保持しません。しかし、弱参照とは異なり、非所有参照は他のインスタンスが同じ寿命またはそれより長い寿命を持つ場合に使用されます。プロパティや変数の宣言の前に `unowned` キーワードを置くことで、非所有参照を示します。

弱参照とは異なり、非所有参照は常に値を持つと期待されます。その結果、値を非所有としてマークしてもオプショナルにはならず、ARCは非所有参照の値を `nil` に設定することはありません。

> **重要:** 非所有参照は、参照が常に解放されていないインスタンスを指していることを確信している場合にのみ使用してください。解放されたインスタンスの値にアクセスしようとすると、ランタイムエラーが発生します。

次の例では、銀行の顧客とその顧客のクレジットカードをモデル化する `Customer` と `CreditCard` の2つのクラスを定義します。これらの2つのクラスはそれぞれ、プロパティとして他のクラスのインスタンスを保持します。この関係は強参照サイクルを作成する可能性があります。

`Customer` と `CreditCard` の関係は、弱参照の例で見た `Apartment` と `Person` の関係とは少し異なります。このデータモデルでは、顧客はクレジットカードを持っている場合と持っていない場合がありますが、クレジットカードは常に顧客に関連付けられています。`CreditCard` インスタンスはそれが参照する `Customer` より長く生存することはありません。これを表すために、`Customer` クラスはオプショナルな `card` プロパティを持ちますが、`CreditCard` クラスは非所有（かつ非オプショナル）な `customer` プロパティを持ちます。

さらに、新しい `CreditCard` インスタンスは、カスタムの `CreditCard` イニシャライザに数値と顧客インスタンスを渡すことでのみ作成できます。これにより、`CreditCard` インスタンスが作成されるときに常に顧客インスタンスが関連付けられることが保証されます。

クレジットカードは常に顧客を持つため、強参照サイクルを避けるためにその `customer` プロパティを非所有参照として定義します。

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { print("\(name) is being deinitialized") }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

> **注意:** `CreditCard` クラスの `number` プロパティは `Int` ではなく `UInt64` 型で定義されています。これは、32ビットおよび64ビットシステムの両方で16桁のカード番号を格納するのに十分な容量を確保するためです。

次のコードスニペットでは、特定の顧客への参照を格納するために使用されるオプショナルな `Customer` 変数 `john` を定義します。この変数はオプショナルであるため、初期値は `nil` です。

```swift
var john: Customer?
```

次に、`Customer` インスタンスを作成し、それを使用して新しい `CreditCard` インスタンスを初期化し、その顧客の `card` プロパティとして割り当てることができます。

```swift
john = Customer(name: "John Appleseed")
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

2つのインスタンスをリンクした後の参照は次のようになります。

`Customer` インスタンスは `CreditCard` インスタンスへの強参照を持ち、`CreditCard` インスタンスは `Customer` インスタンスへの非所有参照を持っています。

非所有の `customer` 参照のため、`john` 変数が保持する強参照を解除すると、`Customer` インスタンスへの強参照がなくなります。

`Customer` インスタンスへの強参照がなくなったため、解放されます。これが発生すると、`CreditCard` インスタンスへの強参照もなくなり、これも解放されます。

```swift
john = nil
// "John Appleseed is being deinitialized" と出力されます
// "Card #1234567890123456 is being deinitialized" と出力されます
```

上記の最終コードスニペットは、`john` 変数が `nil` に設定された後、`Customer` インスタンスと `CreditCard` インスタンスのデイニシャライザがそれぞれの「deinitialized」メッセージを出力することを示しています。

> **注意:** 上記の例は、安全な非所有参照の使用方法を示しています。Swiftは、ランタイムの安全性チェックを無効にする必要がある場合（例えば、パフォーマンス上の理由で）に使用する非安全な非所有参照も提供します。すべての非安全な操作と同様に、そのコードの安全性を確認する責任はあなたにあります。非安全な非所有参照を示すには、`unowned(unsafe)` と記述します。非安全な非所有参照が参照するインスタンスが解放された後にその参照にアクセスしようとすると、プログラムはそのインスタンスが以前に存在していたメモリ位置にアクセスしようとします。これは非安全な操作です。

### 非所有のオプショナル参照

クラスへのオプショナル参照を非所有としてマークすることができます。ARCの所有権モデルにおいて、非所有のオプショナル参照と弱参照は同じコンテキストで使用できます。違いは、非所有のオプショナル参照を使用する場合、常に有効なオブジェクトを参照しているか、`nil`に設定されていることを確認する責任があるという点です。

以下は、特定の学校の学科が提供するコースを追跡する例です：

```swift
class Department {
    var name: String
    var courses: [Course]
    init(name: String) {
        self.name = name
        self.courses = []
    }
}

class Course {
    var name: String
    unowned var department: Department
    unowned var nextCourse: Course?
    init(name: String, in department: Department) {
        self.name = name
        self.department = department
        self.nextCourse = nil
    }
}
```

`Department`は、その学科が提供する各コースへの強参照を維持します。ARCの所有権モデルでは、学科はそのコースを所有します。`Course`には、学科への非所有参照と、次に受講すべきコースへの非所有参照の2つがあります。コースはこれらのオブジェクトのいずれも所有しません。すべてのコースは何らかの学科に属しているため、`department`プロパティはオプショナルではありません。しかし、一部のコースには推奨される次のコースがないため、`nextCourse`プロパティはオプショナルです。

これらのクラスを使用する例を示します：

```swift
let department = Department(name: "園芸学")

let intro = Course(name: "植物の調査", in: department)
let intermediate = Course(name: "一般的なハーブの栽培", in: department)
let advanced = Course(name: "熱帯植物のケア", in: department)

intro.nextCourse = intermediate
intermediate.nextCourse = advanced
department.courses = [intro, intermediate, advanced]
```

上記のコードは、学科とその3つのコースを作成します。`intro`と`intermediate`のコースには、次に受講すべきコースが`nextCourse`プロパティに保存されており、これは非所有のオプショナル参照を維持します。

非所有のオプショナル参照は、ラップしているクラスのインスタンスを強く保持しないため、ARCがインスタンスを解放するのを防ぎません。ARCの下では非所有参照と同じように動作しますが、非所有のオプショナル参照は`nil`になることができます。

非オプショナルの非所有参照と同様に、`nextCourse`が解放されていないコースを常に参照していることを確認する責任があります。例えば、`department.courses`からコースを削除する場合、他のコースが持っているそのコースへの参照も削除する必要があります。

> **注:** オプショナル値の基礎となる型は`Optional`であり、これはSwift標準ライブラリの列挙型です。しかし、オプショナルは値型に`unowned`をマークできないというルールの例外です。クラスをラップするオプショナルは参照カウントを使用しないため、オプショナルに強参照を維持する必要はありません。

## 非所有参照と暗黙的にアンラップされたオプショナルプロパティ

上記の弱参照と非所有参照の例は、強参照サイクルを解消する必要がある2つの一般的なシナリオをカバーしています。

`Person`と`Apartment`の例は、両方のプロパティが`nil`になる可能性があり、強参照サイクルを引き起こす可能性がある状況を示しています。このシナリオは弱参照で解決するのが最適です。

`Customer`と`CreditCard`の例は、1つのプロパティが`nil`になる可能性があり、もう1つのプロパティが`nil`になれない場合に強参照サイクルを引き起こす可能性がある状況を示しています。このシナリオは非所有参照で解決するのが最適です。

しかし、初期化が完了した後、両方のプロパティが常に値を持ち、どちらのプロパティも`nil`になるべきではないという3番目のシナリオがあります。このシナリオでは、1つのクラスに非所有プロパティを、もう1つのクラスに暗黙的にアンラップされたオプショナルプロパティを組み合わせるのが有用です。

これにより、初期化が完了した後、両方のプロパティに直接アクセスでき（オプショナルのアンラップなしで）、参照サイクルを避けることができます。このセクションでは、そのような関係を設定する方法を示します。

以下の例では、`Country`と`City`の2つのクラスを定義し、それぞれが他のクラスのインスタンスをプロパティとして保持します。このデータモデルでは、すべての国は常に首都を持ち、すべての都市は常に国に属している必要があります。これを表すために、`Country`クラスには`capitalCity`プロパティがあり、`City`クラスには`country`プロパティがあります：

```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

2つのクラス間の相互依存関係を設定するために、`City`のイニシャライザは`Country`インスタンスを受け取り、このインスタンスを`country`プロパティに保存します。

`City`のイニシャライザは`Country`のイニシャライザ内から呼び出されます。しかし、`Country`のイニシャライザは、新しい`Country`インスタンスが完全に初期化されるまで`self`を`City`のイニシャライザに渡すことができません。これは[二段階初期化](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID220)で説明されています。

この要件に対処するために、`Country`の`capitalCity`プロパティを暗黙的にアンラップされたオプショナルプロパティとして宣言します。これは、型注釈の末尾に感嘆符を付けることで示されます（`City!`）。これにより、`capitalCity`プロパティは他のオプショナルと同様にデフォルトで`nil`の値を持ちますが、その値をアンラップする必要なくアクセスできます。[暗黙的にアンラップされたオプショナル](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID334)で説明されているように。

`capitalCity`がデフォルトで`nil`の値を持つため、新しい`Country`インスタンスは、イニシャライザ内で`name`プロパティを設定するとすぐに完全に初期化されたと見なされます。これにより、`Country`のイニシャライザは、`name`プロパティが設定されるとすぐに暗黙の`self`プロパティを参照して渡すことができます。したがって、`Country`のイニシャライザは、自身の`capitalCity`プロパティを設定する際に、`City`のイニシャライザのパラメータの1つとして`self`を渡すことができます。

これにより、強参照サイクルを作成することなく、単一のステートメントで`Country`と`City`のインスタンスを作成でき、`capitalCity`プロパティはオプショナル値をアンラップする必要なく直接アクセスできます：

```swift
var country = Country(name: "カナダ", capitalName: "オタワ")
print("\(country.name)の首都は\(country.capitalCity.name)です")
// "カナダの首都はオタワです"と出力されます
```

上記の例では、暗黙的にアンラップされたオプショナルを使用することで、二段階クラスイニシャライザの要件がすべて満たされます。`capitalCity`プロパティは、初期化が完了した後、非オプショナル値のように使用およびアクセスでき、強参照サイクルを避けることができます。

## クロージャの強参照サイクル

上記で、2つのクラスインスタンスプロパティが互いに強参照を保持する場合に強参照サイクルが作成される方法を見ました。また、これらの強参照サイクルを解消するために弱参照と非所有参照を使用する方法も見ました。

クロージャをクラスインスタンスのプロパティに割り当て、そのクロージャの本体がインスタンスをキャプチャする場合にも、強参照サイクルが発生することがあります。このキャプチャは、クロージャの本体がインスタンスのプロパティ（例：`self.someProperty`）にアクセスするか、クロージャがインスタンスのメソッド（例：`self.someMethod()`）を呼び出すために発生する可能性があります。いずれの場合も、これらのアクセスによりクロージャが`self`を「キャプチャ」し、強参照サイクルが作成されます。

この強参照サイクルは、クロージャがクラスと同様に参照型であるために発生します。クロージャをプロパティに割り当てると、そのクロージャへの参照が割り当てられます。本質的には、これは上記と同じ問題です。2つの強参照が互いを生かし続けています。ただし、今回は2つのクラスインスタンスではなく、クラスインスタンスとクロージャが互いを生かし続けています。

Swiftは、この問題に対するエレガントな解決策を提供しています。これをクロージャキャプチャリストと呼びます。ただし、クロージャキャプチャリストを使用して強参照サイクルを解消する方法を学ぶ前に、そのようなサイクルがどのように引き起こされるかを理解することが役立ちます。

以下の例は、`self`を参照するクロージャを使用する際に強参照サイクルを作成する方法を示しています。この例では、HTMLドキュメント内の個々の要素の単純なモデルを提供する`HTMLElement`というクラスを定義しています：

```swift
class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name)は解放されました")
    }

}
```

`HTMLElement`クラスは、要素の名前を示す`name`プロパティを定義しています。例えば、見出し要素の場合は`"h1"`、段落要素の場合は`"p"`、改行要素の場合は`"br"`です。`HTMLElement`は、HTML要素内にレンダリングされるテキストを表す文字列に設定できるオプションの`text`プロパティも定義しています。

これらの2つの単純なプロパティに加えて、`HTMLElement`クラスは`asHTML`という名前の遅延プロパティを定義しています。このプロパティは、`name`と`text`を組み合わせてHTML文字列フラグメントにするクロージャを参照しています。`asHTML`プロパティは`() -> String`型、つまり「パラメータを取らず、`String`値を返す関数」です。

デフォルトでは、`asHTML`プロパティにはHTMLタグの文字列表現を返すクロージャが割り当てられています。このタグには、存在する場合はオプションの`text`値が含まれ、`text`が存在しない場合はテキストコンテンツが含まれません。段落要素の場合、クロージャは`"<p>some text</p>"`または`"<p />"`を返します。これは、`text`プロパティが`"some text"`または`nil`であるかどうかによります。

`asHTML`プロパティはインスタンスメソッドのように名前が付けられ、使用されます。ただし、`asHTML`はインスタンスメソッドではなくクロージャプロパティであるため、特定のHTML要素のHTMLレンダリングを変更したい場合は、`asHTML`プロパティのデフォルト値をカスタムクロージャに置き換えることができます。

例えば、`text`プロパティが`nil`の場合にデフォルトでいくつかのテキストを返すクロージャに`asHTML`プロパティを設定して、表現が空のHTMLタグを返さないようにすることができます：

```swift
let heading = HTMLElement(name: "h1")
let defaultText = "some default text"
heading.asHTML = {
    return "<\(heading.name)>\(heading.text ?? defaultText)</\(heading.name)>"
}
print(heading.asHTML())
// "<h1>some default text</h1>"と表示されます
```

> **注:** `asHTML`プロパティは遅延プロパティとして宣言されています。これは、要素が実際に文字列値としてレンダリングされる必要がある場合にのみ必要になるためです。`asHTML`が遅延プロパティであるという事実は、デフォルトのクロージャ内で`self`を参照できることを意味します。遅延プロパティは初期化が完了し、`self`が存在することが確認された後にアクセスされるためです。

`HTMLElement`クラスは、`name`引数と（必要に応じて）新しい要素を初期化するための`text`引数を取る単一のイニシャライザを提供します。このクラスは、`HTMLElement`インスタンスが解放されるときにメッセージを表示するデイニシャライザも定義しています。

`HTMLElement`クラスを使用して新しいインスタンスを作成し、印刷する方法は次のとおりです：

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// "<p>hello, world</p>"と表示されます
```

> **注:** 上記の`paragraph`変数はオプションの`HTMLElement`として定義されています。これは、強参照サイクルの存在を示すために後で`nil`に設定できるようにするためです。

残念ながら、上記のように記述された`HTMLElement`クラスは、`HTMLElement`インスタンスとそのデフォルトの`asHTML`値に使用されるクロージャの間に強参照サイクルを作成します。サイクルは次のようになります：

インスタンスの`asHTML`プロパティはそのクロージャへの強参照を保持しています。ただし、クロージャがその本体内で`self`を参照しているため（`self.name`および`self.text`を参照する方法として）、クロージャは`self`をキャプチャし、`HTMLElement`インスタンスへの強参照を保持します。これにより、両者の間に強参照サイクルが作成されます。（クロージャ内での値のキャプチャについて詳しくは、[値のキャプチャ](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID102)を参照してください。）

> **注:** クロージャが`self`を複数回参照している場合でも、`HTMLElement`インスタンスへの強参照は1つだけキャプチャされます。

`paragraph`変数を`nil`に設定して`HTMLElement`インスタンスへの強参照を解除すると、強参照サイクルにより`HTMLElement`インスタンスとそのクロージャの両方が解放されません：

```swift
paragraph = nil
```

`HTMLElement`デイニシャライザのメッセージが表示されないことに注意してください。これは、`HTMLElement`インスタンスが解放されていないことを示しています。


## クロージャの強参照サイクルの解決

クロージャとクラスインスタンス間の強参照サイクルを解決するには、クロージャの定義の一部としてキャプチャリストを定義します。キャプチャリストは、クロージャの本体内で1つ以上の参照型をキャプチャする際に使用するルールを定義します。2つのクラスインスタンス間の強参照サイクルと同様に、キャプチャされる各参照を強参照ではなく、弱参照または非所有参照として宣言します。弱参照または非所有参照の適切な選択は、コードの異なる部分間の関係によって異なります。

> **注意:** Swiftでは、クロージャ内で`self`のメンバーを参照する際に、`someProperty`や`someMethod()`ではなく、`self.someProperty`や`self.someMethod()`と書く必要があります。これは、誤って`self`をキャプチャする可能性があることを思い出させるのに役立ちます。

### キャプチャリストの定義

キャプチャリストの各項目は、`weak`または`unowned`キーワードとクラスインスタンス（例えば`self`）への参照、またはある値で初期化された変数（例えば`delegate = self.delegate`）のペアリングです。これらのペアリングは角括弧内にカンマで区切って記述します。

クロージャのパラメータリストと戻り値の型が提供されている場合は、キャプチャリストをクロージャのパラメータリストと戻り値の型の前に配置します：

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate]
    (index: Int, stringToProcess: String) -> String in
    // クロージャの本体がここに入ります
}
```

クロージャがパラメータリストや戻り値の型を指定しない場合、それらはコンテキストから推論されるため、キャプチャリストをクロージャの最初に配置し、その後に`in`キーワードを続けます：

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate] in
    // クロージャの本体がここに入ります
}
```

### 弱参照と非所有参照

クロージャ内のキャプチャを非所有参照として定義するのは、クロージャとそれがキャプチャするインスタンスが常に互いに参照し合い、常に同時に解放される場合です。

逆に、キャプチャされた参照が将来的に`nil`になる可能性がある場合は、キャプチャを弱参照として定義します。弱参照は常にオプショナル型であり、参照するインスタンスが解放されると自動的に`nil`になります。これにより、クロージャの本体内でその存在を確認できます。

> **注意:** キャプチャされた参照が決して`nil`にならない場合、それは常に弱参照ではなく非所有参照としてキャプチャされるべきです。

`HTMLElement`の例から強参照サイクルを解決するために、非所有参照が適切なキャプチャ方法です。以下は、サイクルを避けるために`HTMLElement`クラスを記述する方法です：

```swift
class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
        [unowned self] in
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name) is being deinitialized")
    }

}
```

この`HTMLElement`の実装は、`asHTML`クロージャ内にキャプチャリストを追加する以外は前の実装と同じです。この場合、キャプチャリストは`[unowned self]`であり、これは「`self`を強参照ではなく非所有参照としてキャプチャする」ことを意味します。

以前と同様に、`HTMLElement`インスタンスを作成して印刷できます：

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// "<p>hello, world</p>"と印刷されます
```

キャプチャリストがある場合の参照は次のようになります：

この場合、クロージャによる`self`のキャプチャは非所有参照であり、キャプチャされた`HTMLElement`インスタンスを強く保持しません。`paragraph`変数からの強参照を`nil`に設定すると、`HTMLElement`インスタンスは解放され、そのデイニシャライザメッセージが印刷されます：

```swift
paragraph = nil
// "p is being deinitialized"と印刷されます
```

キャプチャリストの詳細については、[キャプチャリスト](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#ID102)を参照してください。