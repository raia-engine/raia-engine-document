# 不透明型とボックス化されたプロトコル型

値の型に関する実装の詳細を隠します。

Swiftは、値の型に関する詳細を隠すための2つの方法を提供します: 不透明型とボックス化されたプロトコル型です。型情報を隠すことは、モジュールとそのモジュールを呼び出すコードの間の境界で有用です。なぜなら、戻り値の基礎となる型を非公開にすることができるからです。

不透明型を返す関数やメソッドは、その戻り値の型情報を隠します。関数の戻り値の型として具体的な型を提供する代わりに、戻り値はサポートするプロトコルの観点から記述されます。不透明型は型の同一性を保持します — コンパイラは型情報にアクセスできますが、モジュールのクライアントはアクセスできません。

ボックス化されたプロトコル型は、指定されたプロトコルに準拠する任意の型のインスタンスを格納できます。ボックス化されたプロトコル型は型の同一性を保持しません — 値の具体的な型は実行時までわからず、異なる値が格納されると時間とともに変わる可能性があります。

## 不透明型が解決する問題

例えば、ASCIIアートの形状を描くモジュールを作成しているとします。ASCIIアートの形状の基本的な特徴は、その形状の文字列表現を返す`draw()`関数であり、これを`Shape`プロトコルの要件として使用できます:

```swift
protocol Shape {
    func draw() -> String
}
```

```swift
struct Triangle: Shape {
    var size: Int
    func draw() -> String {
       var result: [String] = []
       for length in 1...size {
           result.append(String(repeating: "*", count: length))
       }
       return result.joined(separator: "\n")
    }
}
let smallTriangle = Triangle(size: 3)
print(smallTriangle.draw())
// *
// **
// ***
```

以下のコードのように、ジェネリックを使用して形状を垂直に反転させる操作を実装することができます。しかし、このアプローチには重要な制限があります: 反転された結果は、それを作成するために使用された正確なジェネリック型を公開します。

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
// ***
// **
// *
```

以下のコードのように、2つの形状を垂直に結合する`JoinedShape<T: Shape, U: Shape>`構造体を定義するこのアプローチは、三角形と反転した三角形を結合することから`JoinedShape<Triangle, FlippedShape<Triangle>>`のような型を生成します。

```swift
struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
       return top.draw() + "\n" + bottom.draw()
    }
}
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

形状の作成に関する詳細情報を公開することは、ASCIIアートモジュールの公開インターフェースの一部であるべきではない型が、完全な戻り値の型を記述する必要があるために漏れ出すことを意味します。モジュール内のコードはさまざまな方法で同じ形状を構築できますが、モジュール外の他のコードは変換のリストに関する実装の詳細を考慮する必要はありません。`JoinedShape`や`FlippedShape`のようなラッパー型はモジュールのユーザーにとって重要ではなく、可視化されるべきではありません。モジュールの公開インターフェースは、形状を結合したり反転させたりする操作で構成され、これらの操作は別の`Shape`値を返します。

## 不透明な型を返す

不透明な型は、ジェネリック型の逆のようなものと考えることができます。ジェネリック型は、関数の実装から抽象化された方法で、関数のパラメータと戻り値の型を呼び出し側のコードが選択できるようにします。例えば、次のコードの関数は、呼び出し側に依存する型を返します。

```swift
func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }
```

`max(_:_:)`を呼び出すコードは、`x`と`y`の値を選択し、その値の型が具体的な`T`の型を決定します。呼び出し側のコードは、`Comparable`プロトコルに準拠する任意の型を使用できます。関数内のコードは、呼び出し側が提供する任意の型を処理できるように一般的な方法で記述されています。`max(_:_:)`の実装は、すべての`Comparable`型が共有する機能のみを使用します。

不透明な戻り値の型を持つ関数の場合、これらの役割は逆になります。不透明な型は、関数の実装が返す値の型を選択できるようにし、それを呼び出し側のコードから抽象化します。例えば、次の例の関数は、基礎となる型を公開せずに台形を返します。

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}
```

```swift
func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(
        top: top,
        bottom: JoinedShape(top: middle, bottom: bottom)
    )
    return trapezoid
}
let trapezoid = makeTrapezoid()
print(trapezoid.draw())
// *
// **
// **
// **
// **
// *
```

この例の`makeTrapezoid()`関数は、戻り値の型を`some Shape`として宣言しています。その結果、関数は特定の具体的な型を指定せずに、`Shape`プロトコルに準拠するある型の値を返します。このように`makeTrapezoid()`を記述することで、返される値が形状であるという基本的な側面を表現しつつ、形状を構成する具体的な型を公開インターフェースの一部にしないようにします。この実装では2つの三角形と1つの正方形を使用していますが、関数は戻り値の型を変更せずに、さまざまな方法で台形を描くように書き直すことができます。

この例は、不透明な戻り値の型がジェネリック型の逆のようなものであることを強調しています。`makeTrapezoid()`内のコードは、`Shape`プロトコルに準拠する任意の型を返すことができ、呼び出し側のコードはジェネリック関数の実装のように、返される任意の`Shape`値と連携できるように一般的な方法で記述する必要があります。

不透明な戻り値の型をジェネリックと組み合わせることもできます。次のコードの関数はどちらも、`Shape`プロトコルに準拠するある型の値を返します。

```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape)
}
func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}
```

```swift
let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
print(opaqueJoinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

この例の`opaqueJoinedTriangles`の値は、この章の「不透明な型が解決する問題」セクションのジェネリック例の`joinedTriangles`と同じです。しかし、その例の値とは異なり、`flip(_:)`と`join(_:_:)`は、ジェネリックな形状操作が返す基礎となる型を不透明な戻り値の型でラップし、それらの型が見えないようにします。両方の関数は、それらが依存する型がジェネリックであるため、ジェネリックです。関数への型パラメータは、`FlippedShape`と`JoinedShape`に必要な型情報を渡します。

不透明な戻り値の型を持つ関数が複数の場所から戻る場合、すべての可能な戻り値は同じ型でなければなりません。ジェネリック関数の場合、その戻り値の型は関数のジェネリック型パラメータを使用できますが、それでも単一の型でなければなりません。例えば、正方形に特別なケースを含む形状反転関数の無効なバージョンを次に示します。

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // エラー: 戻り値の型が一致しません
    }
    return FlippedShape(shape: shape) // エラー: 戻り値の型が一致しません
}
```

この関数を`Square`で呼び出すと、`Square`を返します。それ以外の場合は、`FlippedShape`を返します。これは、単一の型の値のみを返すという要件に違反し、`invalidFlip(_:)`を無効なコードにします。`invalidFlip(_:)`を修正する1つの方法は、正方形の特別なケースを`FlippedShape`の実装に移動することで、この関数が常に`FlippedShape`値を返すようにすることです。

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
           return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

常に単一の型を返すという要件は、不透明な戻り値の型でジェネリックを使用することを妨げません。次に、戻り値の値の基礎となる型に型パラメータを組み込んだ関数の例を示します。

```swift
func `repeat`<T: Shape>(shape: T, count: Int) -> some Collection {
    return Array<T>(repeating: shape, count: count)
}
```

この場合、戻り値の基礎となる型は`T`によって異なります。渡された形状が何であれ、`repeat(shape:count:)`はその形状の配列を作成して返します。それにもかかわらず、戻り値は常に`[T]`という同じ基礎となる型を持つため、不透明な戻り値の型を持つ関数が単一の型の値のみを返すという要件を満たしています。

## ボックス化されたプロトコル型

ボックス化されたプロトコル型は、存在型と呼ばれることもあります。これは「プロトコルに準拠する型Tが存在する」というフレーズに由来します。ボックス化されたプロトコル型を作成するには、プロトコル名の前に `any` を書きます。以下はその例です：

```swift
struct VerticalShapes: Shape {
    var shapes: [any Shape]
    func draw() -> String {
        return shapes.map { $0.draw() }.joined(separator: "\n\n")
    }
}
```

```swift
let largeTriangle = Triangle(size: 5)
let largeSquare = Square(size: 5)
let vertical = VerticalShapes(shapes: [largeTriangle, largeSquare])
print(vertical.draw())
```

上記の例では、`VerticalShapes` は `shapes` の型を `[any Shape]` と宣言しています。これはボックス化された `Shape` 要素の配列です。配列の各要素は異なる型であり、それぞれの型は `Shape` プロトコルに準拠している必要があります。このランタイムの柔軟性をサポートするために、Swift は必要に応じて間接参照のレベルを追加します。この間接参照はボックスと呼ばれ、パフォーマンスコストがあります。

`VerticalShapes` 型内では、コードは `Shape` プロトコルで要求されるメソッド、プロパティ、およびサブスクリプトを使用できます。例えば、`VerticalShapes` の `draw()` メソッドは配列の各要素の `draw()` メソッドを呼び出します。このメソッドは `Shape` が `draw()` メソッドを要求するため利用可能です。対照的に、三角形の `size` プロパティや、`Shape` が要求しない他のプロパティやメソッドにアクセスしようとするとエラーが発生します。

形状に使用できる3つの型を対比します：

- ジェネリクスを使用して `struct VerticalShapes<S: Shape>` と `var shapes: [S]` と書くと、特定の形状型の要素を持つ配列が作成され、その特定の型の識別子は配列とやり取りするコードに見えます。
- 不透明型を使用して `var shapes: [some Shape]` と書くと、特定の形状型の要素を持つ配列が作成され、その特定の型の識別子は隠されます。
- ボックス化されたプロトコル型を使用して `var shapes: [any Shape]` と書くと、異なる型の要素を格納できる配列が作成され、それらの型の識別子は隠されます。

この場合、`VerticalShapes` の呼び出し元が異なる種類の形状を混在させることができる唯一のアプローチはボックス化されたプロトコル型です。

ボックス化された値の基になる型を知っている場合は、`as` キャストを使用できます。例えば：

```swift
if let downcastTriangle = vertical.shapes[0] as? Triangle {
    print(downcastTriangle.size)
}
// "5" と表示されます
```

詳細については、[ダウンキャスティング](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html#ID342)を参照してください。

## 不透明型とボックス化されたプロトコル型の違い

不透明型を返すことは、関数の戻り値の型としてボックス化されたプロトコル型を使用することと非常に似ていますが、これら2つの戻り値の型は型の識別子を保持するかどうかが異なります。不透明型は特定の型を指しますが、関数の呼び出し元はその型を確認できません。ボックス化されたプロトコル型はプロトコルに準拠する任意の型を指すことができます。一般的に言えば、ボックス化されたプロトコル型は格納する値の基になる型についてより柔軟性を提供し、不透明型はその基になる型についてより強い保証を提供します。

例えば、ボックス化されたプロトコル型を戻り値の型として使用する `flip(_:)` のバージョンは次のとおりです：

```swift
func protoFlip<T: Shape>(_ shape: T) -> Shape {
    return FlippedShape(shape: shape)
}
```

この `protoFlip(_:)` のバージョンは `flip(_:)` と同じ本体を持ち、常に同じ型の値を返します。`flip(_:)` とは異なり、`protoFlip(_:)` が返す値は常に同じ型である必要はありません。それは `Shape` プロトコルに準拠している必要があるだけです。言い換えれば、`protoFlip(_:)` は `flip(_:)` よりも呼び出し元に対してはるかに緩いAPI契約を結びます。複数の型の値を返す柔軟性を保持します：

```swift
func protoFlip<T: Shape>(_ shape: T) -> Shape {
    if shape is Square {
        return shape
    }

    return FlippedShape(shape: shape)
}
```

コードの改訂版は、渡された形状に応じて `Square` のインスタンスまたは `FlippedShape` のインスタンスを返します。この関数が返す2つの反転形状は完全に異なる型を持つ可能性があります。この関数の他の有効なバージョンは、同じ形状の複数のインスタンスを反転させるときに異なる型の値を返すことができます。`protoFlip(_:)` から返される値の型情報が少ないため、型情報に依存する多くの操作が返された値で利用できません。例えば、この関数が返す結果を比較する `==` 演算子を書くことはできません。

```swift
let protoFlippedTriangle = protoFlip(smallTriangle)
let sameThing = protoFlip(smallTriangle)
protoFlippedTriangle == sameThing  // エラー
```

例の最後の行でエラーが発生する理由は複数あります。直近の問題は、`Shape` がプロトコル要件の一部として `==` 演算子を含まないことです。追加しようとすると、次の問題は `==` 演算子が左辺と右辺の引数の型を知る必要があることです。この種の演算子は通常、プロトコルを採用する具体的な型に一致する `Self` 型の引数を取りますが、プロトコルに `Self` 要件を追加すると、プロトコルを型として使用する際に発生する型消去を許可しません。

関数の戻り値の型としてボックス化されたプロトコル型を使用すると、プロトコルに準拠する任意の型を返す柔軟性が得られます。ただし、その柔軟性の代償として、返された値に対していくつかの操作が不可能になります。例では、`==` 演算子が利用できないことを示しています。これは、ボックス化されたプロトコル型を使用することで特定の型情報が保持されないためです。

このアプローチのもう一つの問題は、形状変換がネストしないことです。三角形を反転させた結果は `Shape` 型の値であり、`protoFlip(_:)` 関数は `Shape` プロトコルに準拠する型の引数を取ります。ただし、ボックス化されたプロトコル型の値はそのプロトコルに準拠しません。つまり、`protoFlip(protoFlip(smallTriangle))` のように複数の変換を適用するコードは無効です。反転された形状は `protoFlip(_:)` の有効な引数ではありません。

対照的に、不透明型は基になる型の識別子を保持します。Swift は関連型を推論できるため、不透明な戻り値を使用することで、ボックス化されたプロトコル型を戻り値として使用できない場所でも使用できます。例えば、ジェネリクスからの `Container` プロトコルのバージョンは次のとおりです：

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
extension Array: Container { }
```

このプロトコルには関連型があるため、関数の戻り値の型として `Container` を使用することはできません。また、関数本体の外部に必要な情報がないため、ジェネリックな戻り値の型としても使用できません。

```swift
// エラー: 関連型を持つプロトコルは戻り値の型として使用できません。
func makeProtocolContainer<T>(item: T) -> Container {
    return [item]
}

// エラー: C を推論するための情報が不足しています。
func makeProtocolContainer<T, C: Container>(item: T) -> C {
    return [item]
}
```

戻り値の型として不透明型 `some Container` を使用すると、望ましいAPI契約を表現できます。関数はコンテナを返しますが、そのコンテナの型を指定しません：

```swift
func makeOpaqueContainer<T>(item: T) -> some Container {
    return [item]
}
let opaqueContainer = makeOpaqueContainer(item: 12)
let twelve = opaqueContainer[0]
print(type(of: twelve))
// "Int" と表示されます
```

`twelve` の型は `Int` と推論されます。これは型推論が不透明型で機能することを示しています。`makeOpaqueContainer(item:)` の実装では、不透明コンテナの基になる型は `[T]` です。この場合、`T` は `Int` であるため、戻り値は整数の配列であり、`Item` 関連型は `Int` と推論されます。`Container` のサブスクリプトは `Item` を返すため、`twelve` の型も `Int` と推論されます。