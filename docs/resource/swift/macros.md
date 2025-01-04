# マクロ

マクロを使用して、コンパイル時にコードを生成します。マクロはソースコードをコンパイル時に変換し、手作業で繰り返し書く必要がないようにします。コンパイル中に、Swiftはコード内のマクロを展開し、通常通りにコードをビルドします。

マクロの展開は常に追加操作です。マクロは新しいコードを追加しますが、既存のコードを削除または変更することはありません。

マクロへの入力とマクロ展開の出力の両方が、構文的に有効なSwiftコードであることを確認します。同様に、マクロに渡す値とマクロによって生成されたコード内の値が正しい型を持っていることを確認します。さらに、マクロの実装がそのマクロを展開する際にエラーに遭遇した場合、コンパイラはこれをコンパイルエラーとして扱います。これらの保証により、マクロを使用するコードについての推論が容易になり、マクロの誤用やバグのあるマクロ実装などの問題を特定しやすくなります。

Swiftには2種類のマクロがあります：

- **独立マクロ** は宣言に付随せずに単独で現れます。
- **付随マクロ** はそれが付随する宣言を修正します。

付随マクロと独立マクロの呼び出し方は少し異なりますが、どちらも同じマクロ展開モデルに従い、同じアプローチで実装します。以下のセクションでは、両方の種類のマクロについて詳しく説明します。

## 独立マクロ

独立マクロを呼び出すには、名前の前にナンバーサイン（`#`）を書き、名前の後に括弧内にマクロへの引数を書きます。例えば：

```swift
func myFunction() {
    print("現在実行中 \(#function)")
    #warning("何かが間違っています")
}
```

最初の行では、`#function`がSwift標準ライブラリの`function()`マクロを呼び出します。このコードをコンパイルすると、Swiftはそのマクロの実装を呼び出し、`#function`を現在の関数の名前に置き換えます。このコードを実行して`myFunction()`を呼び出すと、「現在実行中 myFunction()」と表示されます。2行目では、`#warning`がSwift標準ライブラリの`warning(_:)`マクロを呼び出して、カスタムのコンパイル時警告を生成します。

独立マクロは、`#function`のように値を生成することも、`#warning`のようにコンパイル時にアクションを実行することもできます。

## 付随マクロ

付随マクロを呼び出すには、名前の前にアットサイン（`@`）を書き、名前の後に括弧内にマクロへの引数を書きます。付随マクロはそれが付随する宣言を修正します。新しいメソッドを定義したり、プロトコルへの準拠を追加したりします。

例えば、マクロを使用しない次のコードを考えてみましょう：

```swift
struct SundaeToppings: OptionSet {
    let rawValue: Int
    static let nuts = SundaeToppings(rawValue: 1 << 0)
    static let cherry = SundaeToppings(rawValue: 1 << 1)
    static let fudge = SundaeToppings(rawValue: 1 << 2)
}
```

このコードでは、`SundaeToppings`オプションセットの各オプションにイニシャライザの呼び出しが含まれており、繰り返しで手作業です。新しいオプションを追加する際に、行の末尾に間違った番号を入力するなどのミスを犯しやすくなります。

次に、マクロを使用したこのコードのバージョンを見てみましょう：

```swift
@OptionSet<Int>
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }
}
```

このバージョンの`SundaeToppings`は`@OptionSet`マクロを呼び出します。マクロはプライベート列挙のケースのリストを読み取り、各オプションの定数のリストを生成し、`OptionSet`プロトコルへの準拠を追加します。

比較のために、`@OptionSet`マクロの展開バージョンを次に示します。このコードは書きませんが、Swiftにマクロの展開を表示するように特に要求した場合にのみ表示されます。

```swift
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }

    typealias RawValue = Int
    var rawValue: RawValue
    init() { self.rawValue = 0 }
    init(rawValue: RawValue) { self.rawValue = rawValue }
    static let nuts: Self = Self(rawValue: 1 << Options.nuts.rawValue)
    static let cherry: Self = Self(rawValue: 1 << Options.cherry.rawValue)
    static let fudge: Self = Self(rawValue: 1 << Options.fudge.rawValue)
}
extension SundaeToppings: OptionSet { }
```

プライベート列挙の後のすべてのコードは`@OptionSet`マクロから来ています。マクロを使用してすべての静的変数を生成する`SundaeToppings`のバージョンは、前述の手動でコーディングされたバージョンよりも読みやすく、保守しやすいです。

## マクロ宣言

ほとんどのSwiftコードでは、関数や型のようなシンボルを実装する際に、別々の宣言はありません。しかし、マクロの場合、宣言と実装は別々です。マクロの宣言には、その名前、受け取るパラメータ、使用できる場所、および生成するコードの種類が含まれます。マクロの実装には、Swiftコードを生成することでマクロを展開するコードが含まれます。

`macro`キーワードを使用してマクロ宣言を導入します。たとえば、前の例で使用した`@OptionSet`マクロの宣言の一部は次のとおりです：

```swift
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

最初の行はマクロの名前とその引数を指定します。名前は`OptionSet`で、引数はありません。2行目は、Swift標準ライブラリの`externalMacro(module:type:)`マクロを使用して、マクロの実装がどこにあるかをSwiftに伝えます。この場合、`SwiftMacros`モジュールには`OptionSetMacro`という名前の型が含まれており、これが`@OptionSet`マクロを実装しています。

`OptionSet`はアタッチドマクロであるため、その名前は構造体やクラスの名前のようにアッパーキャメルケースを使用します。フリースタンディングマクロは、変数や関数の名前のようにローワーキャメルケースの名前を持ちます。

> **注記**
> マクロは常にpublicとして宣言されます。マクロを宣言するコードは、そのマクロを使用するコードとは異なるモジュールにあるため、nonpublicマクロを適用できる場所はありません。

マクロ宣言は、マクロの役割を定義します。つまり、そのマクロをソースコードのどこで呼び出せるか、およびマクロが生成できるコードの種類です。すべてのマクロには1つ以上の役割があり、これをマクロ宣言の先頭にある属性の一部として記述します。以下は、`@OptionSet`の宣言のもう少し詳細な部分で、役割の属性を含みます：

```swift
@attached(member)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

この宣言では、`@attached`属性が2回登場します。これは、それぞれのマクロの役割を示しています。最初の`@attached(member)`は、マクロが適用された型に新しいメンバーを追加することを示しています。`@OptionSet`マクロは、`OptionSet`プロトコルで必要とされる`init(rawValue:)`イニシャライザや追加のメンバーを追加します。2つ目の`@attached(extension, conformances: OptionSet)`は、`@OptionSet`が`OptionSet`プロトコルへの準拠を追加することを示しています。`@OptionSet`マクロは、適用された型を拡張して`OptionSet`プロトコルへの準拠を追加します。

フリースタンディングマクロの場合、その役割を指定するために`@freestanding`属性を記述します：

```swift
@freestanding(expression)
public macro line<T: ExpressibleByIntegerLiteral>() -> T =
        /* ... マクロ実装の場所 ... */
```

上記の`#line`マクロは、式の役割を持ちます。式マクロは値を生成するか、警告を生成するなどのコンパイル時のアクションを実行します。

マクロの役割に加えて、マクロの宣言はマクロが生成するシンボルの名前に関する情報を提供します。マクロ宣言が名前のリストを提供する場合、そのマクロはそれらの名前を使用する宣言のみを生成することが保証されており、生成されたコードの理解とデバッグに役立ちます。以下は`@OptionSet`の完全な宣言です：

```swift
@attached(member, names: named(RawValue), named(rawValue),
        named(`init`), arbitrary)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

上記の宣言では、`@attached(member)`マクロには、`names:`ラベルの後に`@OptionSet`マクロが生成するシンボルの名前が引数として含まれています。マクロは`RawValue`、`rawValue`、および`init`という名前のシンボルの宣言を追加します。これらの名前は事前に知られているため、マクロ宣言で明示的にリストされています。

マクロ宣言には、名前のリストの後に`arbitrary`も含まれており、マクロが使用されるまで名前がわからない宣言を生成できるようにします。たとえば、`@OptionSet`マクロが上記の`SundaeToppings`に適用されると、列挙ケースに対応する型プロパティ（`nuts`、`cherry`、`fudge`）が生成されます。

詳細については、マクロの役割の完全なリストを含む[Attributesのattachedとfreestanding](https://developer.apple.com/documentation/swift/attributes)を参照してください。

## マクロ展開

マクロを使用するSwiftコードをビルドする際、コンパイラはマクロの実装を呼び出してそれらを展開します。

具体的には、Swiftは次のようにマクロを展開します：

1. コンパイラはコードを読み取り、構文のメモリ内表現を作成します。
2. コンパイラはメモリ内表現の一部をマクロ実装に送り、マクロを展開します。
3. コンパイラはマクロ呼び出しを展開された形式に置き換えます。
4. コンパイラは展開されたソースコードを使用してコンパイルを続行します。

具体的な手順を見てみましょう。次のコードを考えてみてください：

```swift
let magicNumber = #fourCharacterCode("ABCD")
```

`#fourCharacterCode`マクロは4文字の文字列を受け取り、その文字列のASCII値を結合したものに対応する符号なし32ビット整数を返します。いくつかのファイル形式は、デバッグ時に読みやすく、コンパクトであるため、このような整数をデータの識別に使用します。以下の[マクロの実装](#implementing-a-macro)セクションでは、このマクロの実装方法を示しています。

上記のコードのマクロを展開するために、コンパイラはSwiftファイルを読み取り、抽象構文木（AST）として知られるコードのメモリ内表現を作成します。ASTはコードの構造を明示的にし、コンパイラやマクロ実装のようにその構造と対話するコードを書くのを容易にします。以下は、いくつかの詳細を省略して簡略化した上記コードのASTの表現です：

上の図は、このコードの構造がメモリ内でどのように表現されるかを示しています。ASTの各要素はソースコードの一部に対応しています。「定数宣言」AST要素には、その下に定数宣言の2つの部分（名前と値）を表す子要素があります。「マクロ呼び出し」要素には、マクロの名前とマクロに渡される引数のリストを表す子要素があります。

このASTを構築する過程で、コンパイラはソースコードが有効なSwiftであることを確認します。例えば、`#fourCharacterCode`は1つの引数を取り、その引数は文字列でなければなりません。整数引数を渡そうとしたり、文字列リテラルの終わりの引用符（`"）を忘れたりすると、この段階でエラーが発生します。

コンパイラはコード内でマクロが呼び出される場所を見つけ、それらのマクロを実装する外部バイナリをロードします。各マクロ呼び出しに対して、コンパイラはそのマクロの実装にASTの一部を渡します。以下はその部分的なASTの表現です：

`#fourCharacterCode`マクロの実装は、この部分的なASTを入力として読み取り、マクロを展開します。マクロの実装は、受け取った部分的なASTのみに対して操作を行うため、マクロは前後のコードに関係なく常に同じ方法で展開されます。この制限により、マクロの展開が理解しやすくなり、変更されていないマクロの展開を避けることでSwiftのビルドが速くなります。

Swiftは、マクロを実装するコードが他の入力を誤って読み取らないように次の制限を設けています：

- マクロ実装に渡されるASTには、マクロを表すAST要素のみが含まれ、それ以前またはそれ以降のコードは含まれません。
- マクロ実装は、ファイルシステムやネットワークへのアクセスを防ぐサンドボックス環境で実行されます。

これらの安全策に加えて、マクロの作者はマクロの入力以外のものを読み取ったり変更したりしない責任があります。例えば、マクロの展開は現在の時刻に依存してはなりません。

`#fourCharacterCode`の実装は、展開されたコードを含む新しいASTを生成します。以下はそのコードがコンパイラに返すものです：

コンパイラがこの展開を受け取ると、マクロ呼び出しを含むAST要素をマクロの展開を含む要素に置き換えます。マクロ展開後、コンパイラはプログラムが依然として構文的に有効なSwiftであり、すべての型が正しいことを再度確認します。それにより、通常通りコンパイルできる最終的なASTが生成されます：

このASTは次のようなSwiftコードに対応しています：

```swift
let magicNumber = 1145258561 as UInt32
```

この例では、入力ソースコードには1つのマクロしかありませんが、実際のプログラムには同じマクロの複数のインスタンスや異なるマクロの複数の呼び出しが含まれることがあります。コンパイラはマクロを1つずつ展開します。

1つのマクロが別のマクロの中に現れる場合、外側のマクロが最初に展開されます。これにより、外側のマクロが内側のマクロを展開する前に変更できるようになります。

## マクロの実装

マクロを実装するには、マクロ展開を実行するタイプと、APIとして公開するためにマクロを宣言するライブラリの2つのコンポーネントを作成します。これらの部分は、マクロを使用するコードとは別に構築されます。たとえマクロとそのクライアントを一緒に開発している場合でも、マクロの実装はマクロのクライアントを構築する一部として実行されます。

Swift Package Managerを使用して新しいマクロを作成するには、`swift package init --type macro`を実行します。これにより、マクロの実装と宣言のテンプレートを含むいくつかのファイルが作成されます。

既存のプロジェクトにマクロを追加するには、`Package.swift`ファイルの冒頭を次のように編集します。

- `swift-tools-version`コメントにSwiftツールのバージョン5.9以降を設定します。
- `CompilerPluginSupport`モジュールをインポートします。
- プラットフォームリストにmacOS 10.15を最小デプロイメントターゲットとして含めます。

以下のコードは、例としての`Package.swift`ファイルの冒頭を示しています。

```swift
// swift-tools-version: 5.9

import PackageDescription
import CompilerPluginSupport

let package = Package(
    name: "MyPackage",
    platforms: [ .iOS(.v17), .macOS(.v13)],
    // ...
)
```

次に、既存の`Package.swift`ファイルにマクロ実装のターゲットとマクロライブラリのターゲットを追加します。例えば、プロジェクトに合わせて名前を変更して、次のように追加できます。

```swift
targets: [
    // ソース変換を実行するマクロ実装。
    .macro(
        name: "MyProjectMacros",
        dependencies: [
            .product(name: "SwiftSyntaxMacros", package: "swift-syntax"),
            .product(name: "SwiftCompilerPlugin", package: "swift-syntax")
        ]
    ),

    // マクロをAPIの一部として公開するライブラリ。
    .target(name: "MyProject", dependencies: ["MyProjectMacros"]),
]
```

上記のコードは、2つのターゲットを定義しています。`MyProjectMacros`はマクロの実装を含み、`MyProject`はそれらのマクロを利用可能にします。

マクロの実装は、ASTを使用してSwiftコードと構造化された方法で対話するために`SwiftSyntax`モジュールを使用します。Swift Package Managerで新しいマクロパッケージを作成した場合、生成された`Package.swift`ファイルには自動的に`SwiftSyntax`への依存関係が含まれます。既存のプロジェクトにマクロを追加する場合は、`Package.swift`ファイルに`SwiftSyntax`への依存関係を追加します。

```swift
dependencies: [
    .package(url: "https://github.com/apple/swift-syntax", from: "509.0.0")
],
```

マクロの役割に応じて、マクロ実装が準拠する`SwiftSyntax`の対応するプロトコルがあります。例えば、前のセクションの`#fourCharacterCode`を考えてみましょう。次に示すのは、そのマクロを実装する構造体です。

```swift
import SwiftSyntax
import SwiftSyntaxMacros

public struct FourCharacterCode: ExpressionMacro {
    public static func expansion(
        of node: some FreestandingMacroExpansionSyntax,
        in context: some MacroExpansionContext
    ) throws -> ExprSyntax {
        guard let argument = node.argumentList.first?.expression,
              let segments = argument.as(StringLiteralExprSyntax.self)?.segments,
              segments.count == 1,
              case .stringSegment(let literalSegment)? = segments.first
        else {
            throw CustomError.message("Need a static string")
        }

        let string = literalSegment.content.text
        guard let result = fourCharacterCode(for: string) else {
            throw CustomError.message("Invalid four-character code")
        }

        return "\(raw: result) as UInt32"
    }
}

private func fourCharacterCode(for characters: String) -> UInt32? {
    guard characters.count == 4 else { return nil }

    var result: UInt32 = 0
    for character in characters {
        result = result << 8
        guard let asciiValue = character.asciiValue else { return nil }
        result += UInt32(asciiValue)
    }
    return result
}
```

このマクロを既存のSwift Package Managerプロジェクトに追加する場合、マクロターゲットのエントリーポイントとして機能し、そのターゲットが定義するマクロをリストするタイプを追加します。

```swift
import SwiftCompilerPlugin

@main
struct MyProjectMacros: CompilerPlugin {
    var providingMacros: [Macro.Type] = [FourCharacterCode.self]
}
```

`#fourCharacterCode`マクロは式を生成する独立したマクロであるため、それを実装する`FourCharacterCode`タイプは`ExpressionMacro`プロトコルに準拠しています。`ExpressionMacro`プロトコルには1つの要件があり、ASTを展開する`expansion(of:in:)`メソッドがあります。マクロの役割とそれに対応する`SwiftSyntax`プロトコルのリストについては、[Attributesの添付および独立](https://developer.apple.com/documentation/swift/attributes)を参照してください。

`#fourCharacterCode`マクロを展開するために、Swiftはこのマクロを使用するコードのASTをマクロ実装を含むライブラリに送信します。ライブラリ内で、Swiftは`FourCharacterCode.expansion(of:in:)`を呼び出し、ASTとコンテキストをメソッドの引数として渡します。`expansion(of:in:)`の実装は、`#fourCharacterCode`に引数として渡された文字列を見つけ、それに対応する32ビットの符号なし整数リテラル値を計算します。

上記の例では、最初の`guard`ブロックはASTから文字列リテラルを抽出し、そのAST要素を`literalSegment`に割り当てます。2番目の`guard`ブロックはプライベートな`fourCharacterCode(for:)`関数を呼び出します。これらのブロックはどちらも、マクロが誤って使用された場合にエラーをスローします。エラーメッセージは、誤った呼び出しサイトでコンパイラエラーになります。例えば、`#fourCharacterCode("AB" + "CD")`としてマクロを呼び出そうとすると、コンパイラは「静的な文字列が必要です」というエラーを表示します。

`expansion(of:in:)`メソッドは、AST内の式を表す`ExprSyntax`のインスタンスを返します。このタイプは`StringLiteralConvertible`プロトコルに準拠しているため、マクロ実装は結果を作成するために文字列リテラルを軽量な構文として使用します。マクロ実装から返されるすべての`SwiftSyntax`タイプは`StringLiteralConvertible`に準拠しているため、任意の種類のマクロを実装する際にこのアプローチを使用できます。

## マクロの開発とデバッグ

マクロはテストを使用した開発に非常に適しています。マクロは外部状態に依存せず、外部状態に変更を加えることなく、1つのASTを別のASTに変換します。さらに、文字列リテラルから構文ノードを作成できるため、テストの入力を設定するのが簡単です。また、ASTの`description`プロパティを読み取って、期待される値と比較する文字列を取得することもできます。例えば、前のセクションの`#fourCharacterCode`マクロのテストは次のようになります。

```swift
let source: SourceFileSyntax =
    """
    let abcd = #fourCharacterCode("ABCD")
    """

let file = BasicMacroExpansionContext.KnownSourceFile(
    moduleName: "MyModule",
    fullFilePath: "test.swift"
)

let context = BasicMacroExpansionContext(sourceFiles: [source: file])

let transformedSF = source.expand(
    macros:["fourCharacterCode": FourCharacterCode.self],
    in: context
)

let expectedDescription =
    """
    let abcd = 1145258561 as UInt32
    """

precondition(transformedSF.description == expectedDescription)
```

上記の例では、プリコンディションを使用してマクロをテストしていますが、代わりにテストフレームワークを使用することもできます。