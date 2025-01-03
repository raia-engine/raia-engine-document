# クロージャ

クロージャは、一緒に実行されるコードをグループ化し、名前付き関数を作成することなく実行できます。

Closuresは、コード内で渡して使用できる自己完結型の機能ブロックです。Swiftのクロージャは、他のプログラミング言語のクロージャ、無名関数、ラムダ、ブロックに似ています。

## クロージャの値のキャプチャ

クロージャは、定義されたコンテキストから定数と変数への参照をキャプチャして保存できます。これは、それらの定数と変数を「クロージングオーバー」と呼ばれます。Swiftは、キャプチャのすべてのメモリ管理を処理します。

> **Note**  
> キャプチャの概念に馴染みがない場合でも心配ありません。以下で詳しく説明します。

グローバル関数とネストされた関数（Functionsで紹介）は、実際にはクロージャの特殊なケースです。クロージャは次の3つの形式のいずれかを取ります：

- グローバル関数 - 名前を持ち、値をキャプチャしないクロージャ
- ネストされた関数 - 名前を持ち、その包含関数から値をキャプチャできるクロージャ
- クロージャ式 - 軽量な構文で書かれた無名のクロージャで、周囲のコンテキストから値をキャプチャできる

Swiftのクロージャ式は、一般的なシナリオで簡潔で明確なスタイルを持ち、以下のような最適化が施されています：

- コンテキストからパラメータと戻り値の型を推論
- 単一式クロージャからの暗黙的な戻り
- 引数名の省略形
- 末尾クロージャ構文

## クロージャ式

ネストされた関数（Nested Functionsで紹介）は、より大きな関数の一部として自己完結型のコードブロックに名前を付けて定義する便利な手段です。しかし、関数のような構造を完全に宣言して名前を付けることなく、短いバージョンを書くことが有用な場合があります。これは、関数やメソッドが1つ以上の引数として関数を取る場合に特に当てはまります。

クロージャ式は、簡潔で焦点を絞った構文でインラインクロージャを書く方法です。クロージャ式は、明確さや意図を損なうことなく、短縮形でクロージャを書くためのいくつかの構文最適化を提供します。以下のクロージャ式の例は、sorted(by:)メソッドの単一の例をいくつかの反復で洗練し、各反復が同じ機能をより簡潔に表現する方法を示しています。

### The Sorted Method

Swiftの標準ライブラリには、sorted(by:)というメソッドがあり、指定されたソートクロージャの出力に基づいて、既知の型の値の配列をソートします。ソートプロセスが完了すると、sorted(by:)メソッドは、古い配列と同じ型とサイズの新しい配列を返し、その要素が正しい順序でソートされます。元の配列は、sorted(by:)メソッドによって変更されません。

以下のクロージャ式の例では、sorted(by:)メソッドを使用して、String値の配列を逆アルファベット順にソートします。以下はソートされる初期配列です：

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```

sorted(by:)メソッドは、配列の内容と同じ型の2つの引数を取り、最初の値がソートされた後に2番目の値の前に表示されるかどうかを示すBool値を返すクロージャを受け入れます。ソートクロージャは、最初の値が2番目の値の前に表示されるべき場合はtrueを返し、それ以外の場合はfalseを返す必要があります。

この例では、String値の配列をソートしているため、ソートクロージャは(String, String) -> Bool型の関数である必要があります。

ソートクロージャを提供する1つの方法は、正しい型の通常の関数を書き、それをsorted(by:)メソッドの引数として渡すことです：

```swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

最初の文字列(s1)が2番目の文字列(s2)よりも大きい場合、backward(_:_:)関数はtrueを返し、s1がソートされた配列でs2の前に表示されるべきであることを示します。文字列内の文字の場合、「大きい」とは「アルファベット順で後に表示される」を意味します。つまり、文字「B」は文字「A」よりも「大きい」、文字列「Tom」は文字列「Tim」よりも大きいことを意味します。これにより、「Barry」が「Alex」の前に配置される逆アルファベット順のソートが得られます。

しかし、これは本質的に単一の式関数(a > b)を書くためのかなり長ったらしい方法です。この例では、クロージャ式構文を使用してソートクロージャをインラインで書く方が望ましいです。

### Closure Expression Syntax

クロージャ式構文は、次の一般的な形式を持ちます：

```swift
{ (parameters) -> return type in
   statements
}
```

クロージャ式構文のパラメータはin-outパラメータにすることができますが、デフォルト値を持つことはできません。可変長パラメータは、可変長パラメータに名前を付ける場合に使用できます。タプルもパラメータ型および戻り値の型として使用できます。

以下の例は、上記のbackward(_:_:)関数のクロージャ式バージョンを示しています：

```swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

このインラインクロージャのパラメータと戻り値の型の宣言は、backward(_:_:)関数の宣言と同じです。どちらの場合も、(s1: String, s2: String) -> Boolと書かれています。ただし、インラインクロージャ式の場合、パラメータと戻り値の型は中括弧内に書かれ、外側には書かれません。

クロージャの本体の開始は、inキーワードによって導入されます。このキーワードは、クロージャのパラメータと戻り値の型の定義が終了し、クロージャの本体が始まることを示します。

クロージャの本体が非常に短いため、1行で書くこともできます：

```swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

これにより、sorted(by:)メソッドへの全体的な呼び出しが同じままであることが示されます。メソッドの引数全体を括弧で囲むペアはまだ存在します。ただし、その引数は現在インラインクロージャです。

### Inferring Type From Context

ソートクロージャがメソッドの引数として渡されるため、Swiftはそのパラメータの型と返される値の型を推論できます。sorted(by:)メソッドは文字列の配列に対して呼び出されているため、その引数は(String, String) -> Bool型の関数でなければなりません。これにより、(String, String)およびBool型をクロージャ式の定義の一部として書く必要はありません。すべての型が推論できるため、戻り矢印(->)とパラメータ名を囲む括弧も省略できます：

```swift
reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
```

クロージャを関数やメソッドにインラインクロージャ式として渡す場合、パラメータの型と戻り値の型を推論することは常に可能です。その結果、クロージャが関数やメソッドの引数として使用される場合、インラインクロージャを完全な形式で書く必要はありません。

それでも、曖昧さを避けるために型を明示的にすることは推奨されます。sorted(by:)メソッドの場合、ソートが行われているという事実からクロージャの目的は明らかであり、クロージャが文字列の配列のソートを支援しているため、文字列値を扱っていると仮定するのは安全です。

### Implicit Returns from Single-Expression Closures

単一式クロージャは、宣言からreturnキーワードを省略することで、その単一式の結果を暗黙的に返すことができます。以下の例では、前の例のバージョンを示しています：

```swift
reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
```

ここでは、sorted(by:)メソッドの引数の関数型が、クロージャによってBool値が返されることを明確にしています。クロージャの本体が単一の式(s1 > s2)を含み、Bool値を返すため、曖昧さはなく、returnキーワードを省略できます。

### Shorthand Argument Names

Swiftはインラインクロージャに対して省略形の引数名を自動的に提供し、$0、$1、$2などの名前でクロージャの引数の値を参照できます。

クロージャ式内でこれらの省略形の引数名を使用する場合、クロージャの引数リストを定義から省略できます。省略形の引数名の型は、期待される関数型から推論され、使用する省略形の引数の最大番号がクロージャが取る引数の数を決定します。inキーワードも省略できます。なぜなら、クロージャ式はその本体だけで構成されているからです：

```swift
reversedNames = names.sorted(by: { $0 > $1 } )
```

ここで、$0と$1はクロージャの最初と2番目のString引数を指します。$1が最大番号の省略形引数であるため、クロージャは2つの引数を取ると理解されます。ここでのsorted(by:)関数は、引数が両方とも文字列であるクロージャを期待しているため、省略形引数$0と$1は両方ともString型です。

### Operator Methods

実際には、上記のクロージャ式をさらに短く書く方法があります。SwiftのString型は、2つのString型のパラメータを持ち、Bool型の値を返す大なり演算子(>)の文字列固有の実装をメソッドとして定義しています。これは、sorted(by:)メソッドが必要とするメソッド型と正確に一致します。したがって、大なり演算子を単に渡すだけで、Swiftは文字列固有の実装を使用することを推論します：

```swift
reversedNames = names.sorted(by: >)
```

演算子メソッドの詳細については、Operator Methodsを参照してください。

### Trailing Closures

クロージャ式を関数の最後の引数として渡す必要があり、クロージャ式が長い場合、末尾クロージャとして書くと便利です。関数呼び出しの括弧の後に末尾クロージャを書きますが、末尾クロージャは関数の引数のままです。末尾クロージャ構文を使用する場合、関数呼び出しの一部として最初のクロージャの引数ラベルを書きません。関数呼び出しには複数の末尾クロージャを含めることができますが、以下の最初のいくつかの例では単一の末尾クロージャを使用しています。

```swift
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body goes here
}

// Here's how you call this function without using a trailing closure:
someFunctionThatTakesAClosure(closure: {
    // closure's body goes here
})

// Here's how you call this function with a trailing closure instead:
someFunctionThatTakesAClosure() {
    // trailing closure's body goes here
}
```

Closure Expression Syntaxセクションの文字列ソートクロージャは、sorted(by:)メソッドの括弧の外側に末尾クロージャとして書くことができます：

```swift
reversedNames = names.sorted() { $0 > $1 }
```

クロージャ式が関数やメソッドの唯一の引数として提供され、末尾クロージャとしてその式を提供する場合、関数やメソッドの名前の後に括弧()を記述する必要はありません：

```swift
reversedNames = names.sorted { $0 > $1 }
```

末尾クロージャは、クロージャが十分に長くてインラインで1行に書くことができない場合に最も便利です。例として、SwiftのArray型にはmap(_:)メソッドがあり、クロージャ式を唯一の引数として取ります。クロージャは配列内の各項目に対して1回呼び出され、その項目に対する代替のマップ値（場合によっては他の型）を返します。map(_:)メソッドに渡すクロージャでコードを書いて、マッピングの性質と返される値の型を指定します。

提供されたクロージャを各配列要素に適用した後、map(_:)メソッドは新しいマップ値を含む新しい配列を返し、元の配列の対応する値と同じ順序で返します。

以下は、map(_:)メソッドを末尾クロージャで使用して、Int値の配列をString値の配列に変換する方法を示しています。[16, 58, 510]の配列を使用して、新しい配列["OneSix", "FiveEight", "FiveOneZero"]を作成します：

```swift
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]
```

上記のコードは、整数の数字とその名前の英語版との間のマッピングの辞書を作成します。また、文字列に変換する準備ができた整数の配列を定義します。

次に、numbers配列を使用して、クロージャ式を配列のmap(_:)メソッドに末尾クロージャとして渡すことで、String値の配列を作成できます：

```swift
let strings = numbers.map { (number) -> String in
    var number = number
    var output = ""
    repeat {
        output = digitNames[number % 10]! + output
        number /= 10
    } while number > 0
    return output
}
// strings is inferred to be of type [String]
// its value is ["OneSix", "FiveEight", "FiveOneZero"]
```

map(_:)メソッドは、配列内の各項目に対してクロージャ式を1回呼び出します。クロージャの入力パラメータnumberの型を指定する必要はありません。なぜなら、マップされる配列の値から型を推論できるからです。

この例では、変数numberはクロージャのnumberパラメータの値で初期化され、その値はクロージャ本体内で変更できます。（関数やクロージャのパラメータは常に定数です。）クロージャ式は、返されるマップ出力配列に格納される型を示すために、Stringの戻り値の型も指定します。

クロージャ式は、呼び出されるたびにoutputという文字列を構築します。numberの最後の桁を剰余演算子(number % 10)を使用して計算し、この桁を使用してdigitNames辞書で適切な文字列を検索します。クロージャは、ゼロより大きい任意の整数の文字列表現を作成するために使用できます。

> **Note**  
> digitNames辞書のサブスクリプトへの呼び出しの後に感嘆符(!)が付いているのは、辞書のサブスクリプトがオプショナル値を返し、キーが存在しない場合に辞書の検索が失敗する可能性があることを示すためです。上記の例では、number % 10が常にdigitNames辞書の有効なサブスクリプトキーであることが保証されているため、感嘆符を使用してサブスクリプトのオプショナル戻り値に格納されているString値を強制的にアンラップします。

digitNames辞書から取得された文字列は、outputの先頭に追加され、実質的に数値の文字列表現を逆に構築します。（number % 10の式は、16の場合は6、58の場合は8、510の場合は0の値を与えます。）

number変数は10で割られます。整数であるため、割り算中に切り捨てられ、16は1に、58は5に、510は51になります。

このプロセスは、numberが0になるまで繰り返され、その時点でoutput文字列がクロージャによって返され、map(_:)メソッドによって出力配列に追加されます。

上記の例での末尾クロージャ構文の使用は、クロージャの機能をmap(_:)メソッドの外部括弧内にラップすることなく、クロージャがサポートする関数の直後にすぐにカプセル化します。

関数が複数のクロージャを取る場合、最初の末尾クロージャの引数ラベルを省略し、残りの末尾クロージャにラベルを付けます。たとえば、以下の関数はフォトギャラリーの画像を読み込みます：

```swift
func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
    if let picture = download("photo.jpg", from: server) {
        completion(picture)
    } else {
        onFailure()
    }
}
```

この関数を呼び出して画像を読み込むとき、2つのクロージャを提供します。最初のクロージャは、ダウンロードが成功した後に画像を表示する完了ハンドラです。2番目のクロージャは、ユーザーにエラーを表示するエラーハンドラです。

```swift
loadPicture(from: someServer) { picture in
    someView.currentPicture = picture
} onFailure: {
    print("Couldn't download the next picture.")
}
```

この例では、loadPicture(from:completion:onFailure:)関数はネットワークタスクをバックグラウンドにディスパッチし、ネットワークタスクが終了したときに2つの完了ハンドラのいずれかを呼び出します。このように関数を書くことで、ネットワークの失敗を処理するコードと、ダウンロードが成功した後にユーザーインターフェイスを更新するコードを1つのクロージャで処理する代わりに、きれいに分離できます。

> **Note**  
> 完了ハンドラは、特に複数のハンドラをネストする必要がある場合、読みづらくなることがあります。代替アプローチとして、Concurrencyで説明されている非同期コードを使用することができます。

## Capturing Values

クロージャは、定義されたコンテキストから定数と変数をキャプチャできます。クロージャは、その本体内でこれらの定数と変数の値を参照および変更できます。元のスコープが存在しなくなっても、クロージャはこれらの値を参照できます。

Swiftでは、値をキャプチャできる最も単純な形式のクロージャは、別の関数の本体内に書かれたネストされた関数です。ネストされた関数は、外側の関数の引数をキャプチャでき、外側の関数内で定義された定数や変数もキャプチャできます。

以下は、makeIncrementerという関数の例で、incrementerというネストされた関数が含まれています。ネストされたincrementer()関数は、周囲のコンテキストからrunningTotalとamountの2つの値をキャプチャします。これらの値をキャプチャした後、incrementerはmakeIncrementerによってクロージャとして返され、呼び出されるたびにrunningTotalをamountだけ増加させます。

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

makeIncrementerの戻り値の型は() -> Intです。これは、単純な値ではなく関数を返すことを意味します。返される関数はパラメータを持たず、呼び出されるたびにInt値を返します。関数が他の関数を返す方法については、Function Types as Return Typesを参照してください。

makeIncrementer(forIncrement:)関数は、インクリメンタの現在の合計を格納するためにrunningTotalという整数変数を定義します。この変数は0で初期化されます。

makeIncrementer(forIncrement:)関数には、forIncrementという引数ラベルとamountというパラメータ名を持つ単一のIntパラメータがあります。このパラメータに渡される引数値は、返されるincrementer関数が呼び出されるたびにrunningTotalがどれだけ増加するかを指定します。makeIncrementer関数は、実際のインクリメントを実行するincrementerというネストされた関数を定義します。この関数は単にamountをrunningTotalに追加し、その結果を返します。

isolatedに考えると、ネストされたincrementer()関数は異常に見えるかもしれません：

```swift
func incrementer() -> Int {
    runningTotal += amount
    return runningTotal
}
```

incrementer()関数はパラメータを持たず、その関数本体内でrunningTotalとamountを参照します。これは、周囲の関数からrunningTotalとamountへの参照をキャプチャし、それらを自身の関数本体内で使用することによって行われます。参照によるキャプチャは、makeIncrementerの呼び出しが終了したときにrunningTotalとamountが消えないことを保証し、incrementer関数が次に呼び出されたときにrunningTotalが利用可能であることを保証します。

> **Note**  
> 最適化として、Swiftは、クロージャによって値が変更されない場合、クロージャが作成された後に値が変更されない場合、その値のコピーをキャプチャして保存することがあります。

Swiftは、不要になった変数を破棄する際のメモリ管理もすべて処理します。

以下は、makeIncrementerの動作例です：

```swift
let incrementByTen = makeIncrementer(forIncrement: 10)
```

この例では、incrementByTenという定数を設定し、呼び出されるたびにrunningTotal変数に10を追加するincrementer関数を参照します。関数を複数回呼び出すと、この動作が示されます：

```swift
incrementByTen()
// returns a value of 10
incrementByTen()
// returns a value of 20
incrementByTen()
// returns a value of 30
```

2番目のインクリメンタを作成すると、新しい、別のrunningTotal変数への格納された参照を持ちます：

```swift
let incrementBySeven = makeIncrementer(forIncrement: 7)
incrementBySeven()
// returns a value of 7
```

元のインクリメンタ(incrementByTen)を再度呼び出すと、その独自のrunningTotal変数が増加し、incrementBySevenによってキャプチャされた変数には影響しません：

```swift
incrementByTen()
// returns a value of 40
```

> **Note**  
> クロージャをクラスインスタンスのプロパティに割り当て、クロージャがインスタンスまたはそのメンバーを参照する場合、クロージャとインスタンスの間に強い参照サイクルが作成されます。Swiftは、これらの強い参照サイクルを解消するためにキャプチャリストを使用します。詳細については、Strong Reference Cycles for Closuresを参照してください。

## Closures Are Reference Types

上記の例では、incrementBySevenとincrementByTenは定数ですが、これらの定数が参照するクロージャは、キャプチャされたrunningTotal変数を増加させることができます。これは、関数とクロージャが参照型であるためです。

関数やクロージャを定数や変数に割り当てるたびに、その定数や変数を関数やクロージャへの参照として設定しています。上記の例では、incrementByTenが参照するクロージャの選択が定数であり、クロージャ自体の内容ではありません。

これは、クロージャを2つの異なる定数や変数に割り当てると、それらの定数や変数が同じクロージャを参照することも意味します。

```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// returns a value of 50

incrementByTen()
// returns a value of 60
```

上記の例は、alsoIncrementByTenを呼び出すことがincrementByTenを呼び出すことと同じであることを示しています。どちらも同じクロージャを参照しているため、同じランニングトータルを増加させて返します。

## Escaping Closures

クロージャが関数に渡されるが、関数が返された後にクロージャが呼び出される場合、クロージャは関数からエスケープすると言われます。クロージャをパラメータとして取る関数を宣言する場合、パラメータの型の前に@escapingと書いて、クロージャがエスケープすることを許可することができます。

クロージャがエスケープする1つの方法は、関数の外部で定義された変数に格納されることです。たとえば、多くの非同期操作を開始する関数は、完了ハンドラとしてクロージャ引数を取ります。関数は操作を開始した後に返されますが、操作が完了するまでクロージャは呼び出されません。クロージャは後で呼び出されるためにエスケープする必要があります。例：

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

someFunctionWithEscapingClosure(_:)関数は、引数としてクロージャを取り、それを関数の外部で宣言された配列に追加します。この関数のパラメータに@escapingを付けないと、コンパイル時エラーが発生します。

エスケープクロージャがselfを参照する場合、selfがクラスのインスタンスを参照している場合、特別な考慮が必要です。エスケープクロージャでselfをキャプチャすると、強い参照サイクルを誤って作成するのが簡単です。参照サイクルの詳細については、Automatic Reference Countingを参照してください。

通常、クロージャはクロージャの本体内で変数を使用することによって暗黙的に変数をキャプチャしますが、この場合は明示的にする必要があります。selfをキャプチャしたい場合、使用する際にselfを明示的に書くか、クロージャのキャプチャリストにselfを含めます。selfを明示的に書くことで、意図を表現し、参照サイクルがないことを確認するように促します。以下のコードでは、someFunctionWithEscapingClosure(_:)に渡されるクロージャはselfを明示的に参照しています。対照的に、someFunctionWithNonescapingClosure(_:)に渡されるクロージャはエスケープしないクロージャであり、selfを暗黙的に参照できます。

```swift
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}

class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}

let instance = SomeClass()
instance.doSomething()
print(instance.x)
// Prints "200"

completionHandlers.first?()
print(instance.x)
// Prints "100"
```

以下は、selfをクロージャのキャプチャリストに含め、selfを暗黙的に参照するdoSomething()のバージョンです：

```swift
class SomeOtherClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { [self] in x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}
```

selfが構造体または列挙型のインスタンスである場合、selfを暗黙的に参照できます。ただし、selfが構造体または列挙型のインスタンスである場合、エスケープクロージャはselfへの可変参照をキャプチャできません。構造体と列挙型は、Structures and Enumerations Are Value Typesで説明されているように、共有の可変性を許可しません。

```swift
struct SomeStruct {
    var x = 10
    mutating func doSomething() {
        someFunctionWithNonescapingClosure { x = 200 }  // Ok
        someFunctionWithEscapingClosure { x = 100 }     // Error
    }
}
```

上記の例でのsomeFunctionWithEscapingClosure関数の呼び出しは、ミューテーティングメソッド内にあるためエラーです。したがって、selfは可変です。これは、エスケープクロージャが構造体のselfへの可変参照をキャプチャできないというルールに違反します。

## Autoclosures

オートクロージャは、関数の引数として渡される式をラップするために自動的に作成されるクロージャです。引数を取らず、呼び出されると、ラップされた式の値を返します。この構文の便利さにより、明示的なクロージャの代わりに通常の式を書くことで、関数のパラメータの周りに中括弧を省略できます。

オートクロージャを取る関数を呼び出すことは一般的ですが、そのような関数を実装することは一般的ではありません。たとえば、assert(condition:message:file:line:)関数は、conditionおよびmessageパラメータにオートクロージャを取ります。conditionパラメータはデバッグビルドでのみ評価され、messageパラメータはconditionがfalseの場合にのみ評価されます。

オートクロージャは評価を遅らせることができるため、評価を遅らせることができます。評価を遅らせることは、副作用があるコードや計算コストが高いコードに役立ちます。以下のコードは、クロージャが評価を遅らせる方法を示しています。

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// Prints "5"

let customerProvider = { customersInLine.remove(at: 0) }
print(customersInLine.count)
// Prints "5"

print("Now serving \(customerProvider())!")
// Prints "Now serving Chris!"
print(customersInLine.count)
// Prints "4"
```

customersInLine配列の最初の要素はクロージャ内のコードによって削除されますが、クロージャが実際に呼び出されるまで配列要素は削除されません。クロージャが呼び出されない場合、クロージャ内の式は評価されず、配列要素は削除されません。customerProviderの型はStringではなく() -> Stringであることに注意してください。これは、パラメータを持たず、文字列を返す関数です。

関数にクロージャを引数として渡すと、同じ遅延評価の動作が得られます。

```swift
// customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// Prints "Now serving Alex!"
```

上記のリストのserve(customer:)関数は、顧客の名前を返す明示的なクロージャを取ります。以下のserve(customer:)のバージョンは同じ操作を実行しますが、明示的なクロージャを取る代わりに、パラメータの型に@autoclosure属性を付けることでオートクロージャを取ります。これで、クロージャの代わりに文字列引数を取るかのように関数を呼び出すことができます。customerProviderパラメータの型に@autoclosure属性が付いているため、引数は自動的にクロージャに変換されます。

```swift
// customersInLine is ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
// Prints "Now serving Ewa!"
```

> **Note**  
> オートクロージャを多用すると、コードの理解が難しくなることがあります。評価が遅延されていることが明確であるべきです。

エスケープを許可するオートクロージャが必要な場合は、@autoclosureおよび@escaping属性の両方を使用します。@escaping属性については、Escaping Closuresで説明されています。

```swift
// customersInLine is ["Barry", "Daniella"]
var customerProviders: [() -> String] = []
func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}
collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))

print("Collected \(customerProviders.count) closures.")
// Prints "Collected 2 closures."
for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}
// Prints "Now serving Barry!"
// Prints "Now serving Daniella!"
```

上記のコードでは、customerProvider引数として渡されたクロージャを呼び出す代わりに、collectCustomerProviders(_:)関数はクロージャをcustomerProviders配列に追加します。配列は関数のスコープ外で宣言されているため、関数が返された後に配列内のクロージャを実行できます。その結果、customerProvider引数の値は関数のスコープをエスケープすることが許可されなければなりません。