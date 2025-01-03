# 属性

宣言や型に情報を追加します。

Swiftには2種類の属性があります。宣言に適用されるものと型に適用されるものです。属性は宣言や型に関する追加情報を提供します。例えば、関数宣言に`discardableResult`属性を付けると、その関数が値を返すにもかかわらず、戻り値が使用されなくてもコンパイラが警告を生成しないことを示します。

属性を指定するには、`@`記号の後に属性の名前と、その属性が受け取る引数を記述します：
```
@<#attribute name#>
@<#attribute name#>(<#attribute arguments#>)
```

一部の宣言属性は、特定の宣言に対して属性がどのように適用されるかについての詳細情報を指定する引数を受け取ります。これらの属性引数は括弧で囲まれ、それらが属する属性によって形式が定義されます。

アタッチされたマクロやプロパティラッパーも属性構文を使用します。マクロがどのように展開されるかについては[マクロ展開式](#)を参照してください。プロパティラッパーについては[propertyWrapper](#)を参照してください。

## 宣言属性

宣言属性は宣言にのみ適用できます。

### attached

`attached`属性をマクロ宣言に適用します。この属性の引数はマクロの役割を示します。複数の役割を持つマクロの場合、各役割ごとに`attached`マクロを複数回適用します。

この属性の最初の引数はマクロの役割を示します：

#### ピアマクロ

この属性の最初の引数として`peer`と記述します。マクロを実装する型は`PeerMacro`プロトコルに準拠します。これらのマクロは、マクロがアタッチされている宣言と同じスコープに新しい宣言を生成します。例えば、構造体のメソッドにピアマクロを適用すると、その構造体に追加のメソッドやプロパティを定義できます。

#### メンバーマクロ

この属性の最初の引数として`member`と記述します。マクロを実装する型は`MemberMacro`プロトコルに準拠します。これらのマクロは、マクロがアタッチされている型や拡張のメンバーである新しい宣言を生成します。例えば、構造体宣言にメンバーマクロを適用すると、その構造体に追加のメソッドやプロパティを定義できます。

#### メンバー属性

この属性の最初の引数として`memberAttribute`と記述します。マクロを実装する型は`MemberAttributeMacro`プロトコルに準拠します。これらのマクロは、マクロがアタッチされている型や拡張のメンバーに属性を追加します。

#### アクセサマクロ

この属性の最初の引数として`accessor`と記述します。マクロを実装する型は`AccessorMacro`プロトコルに準拠します。これらのマクロは、アタッチされているストアドプロパティにアクセサを追加し、それを計算プロパティに変えます。

#### 拡張マクロ

この属性の最初の引数として`extension`と記述します。マクロを実装する型は`ExtensionMacro`プロトコルに準拠します。これらのマクロは、マクロがアタッチされている型のメンバーであるプロトコル準拠、where句、および新しい宣言を追加できます。マクロがプロトコル準拠を追加する場合、`conformances:`引数を含め、それらのプロトコルを指定します。準拠リストにはプロトコル名、準拠リスト項目を参照する型エイリアス、または準拠リスト項目のプロトコル合成が含まれます。ネストされた型に対する拡張マクロは、そのファイルのトップレベルに拡張として展開されます。拡張マクロを拡張、型エイリアス、関数内にネストされた型に書くことはできません。また、ピアマクロを持つ拡張を追加するために拡張マクロを使用することもできません。

`peer`、`member`、および`accessor`マクロの役割には、マクロが生成するシンボルの名前をリストする`names:`引数が必要です。拡張マクロの役割も、拡張内に宣言を追加する場合は`names:`引数が必要です。マクロ宣言に`names:`引数が含まれている場合、マクロ実装はそのリストに一致する名前を持つシンボルのみを生成する必要があります。ただし、マクロはリストされたすべての名前のシンボルを生成する必要はありません。その引数の値は次のいずれか1つ以上のリストです：

- 既知の名前の場合、固定シンボル名の`named(<#name#>)`。
- 既存のシンボルと同じ名前の場合、`overloaded`。
- 固定文字列で始まる名前の場合、シンボル名にプレフィックスを付ける`prefixed(<#prefix#>)`。
- 固定文字列で終わる名前の場合、シンボル名にサフィックスを付ける`suffixed(<#suffix#>)`。
- マクロ展開まで決定できない名前の場合、`arbitrary`。

特別なケースとして、プロパティラッパーに似た動作をするマクロの場合、`prefixed($)`と記述できます。

### available

この属性を適用して、特定のSwift言語バージョンや特定のプラットフォームおよびオペレーティングシステムバージョンに対する宣言のライフサイクルを示します。

`available`属性は常に2つ以上のカンマ区切りの属性引数のリストと共に表示されます。これらの引数は次のプラットフォームまたは言語名のいずれかで始まります：

- iOS
- iOSApplicationExtension
- macOS
- macOSApplicationExtension
- macCatalyst
- macCatalystApplicationExtension
- watchOS
- watchOSApplicationExtension
- tvOS
- tvOSApplicationExtension
- visionOS
- visionOSApplicationExtension
- swift

また、上記のプラットフォーム名すべてに対する宣言の可用性を示すためにアスタリスク（`*`）を使用することもできます。Swiftバージョン番号を使用して可用性を指定する`available`属性は、アスタリスクを使用できません。

残りの引数は任意の順序で表示され、宣言のライフサイクルに関する追加情報を指定します。

- `unavailable`引数は、指定されたプラットフォームで宣言が利用できないことを示します。この引数は、Swiftバージョンの可用性を指定する場合には使用できません。
- `introduced`引数は、指定されたプラットフォームまたは言語で宣言が導入された最初のバージョンを示します。次の形式を持ちます：
  ```
  introduced: <#version number#>
  ```
  バージョン番号は、ピリオドで区切られた1〜3の正の整数で構成されます。
- `deprecated`引数は、指定されたプラットフォームまたは言語で宣言が非推奨となった最初のバージョンを示します。次の形式を持ちます：
  ```
  deprecated: <#version number#>
  ```
  オプションのバージョン番号は、ピリオドで区切られた1〜3の正の整数で構成されます。バージョン番号を省略すると、非推奨となった時期に関する情報を提供せずに、宣言が現在非推奨であることを示します。バージョン番号を省略する場合、コロン（`:`）も省略します。
- `obsoleted`引数は、指定されたプラットフォームまたは言語で宣言が廃止された最初のバージョンを示します。宣言が廃止されると、指定されたプラットフォームまたは言語から削除され、使用できなくなります。次の形式を持ちます：
  ```
  obsoleted: <#version number#>
  ```
  バージョン番号は、ピリオドで区切られた1〜3の正の整数で構成されます。
- `message`引数は、非推奨または廃止された宣言の使用に関する警告やエラーをコンパイラが表示する際に表示されるテキストメッセージを提供します。次の形式を持ちます：
  ```
  message: <#message#>
  ```
  メッセージは文字列リテラルで構成されます。
- `renamed`引数は、名前が変更された宣言の新しい名前を示すテキストメッセージを提供します。コンパイラは、名前が変更された宣言の使用に関するエラーを表示する際に新しい名前を表示します。次の形式を持ちます：
  ```
  renamed: <#new name#>
  ```
  新しい名前は文字列リテラルで構成されます。

次のように、型エイリアス宣言に`renamed`および`unavailable`引数を使用して`available`属性を適用し、フレームワークやライブラリのリリース間で宣言の名前が変更されたことを示すことができます。この組み合わせにより、宣言が名前変更されたことを示すコンパイル時エラーが発生します。

```swift
// 最初のリリース
protocol MyProtocol {
    // プロトコル定義
}

// 後のリリースでMyProtocolの名前が変更される
protocol MyRenamedProtocol {
    // プロトコル定義
}

@available(*, unavailable, renamed: "MyRenamedProtocol")
typealias MyProtocol = MyRenamedProtocol
```

複数の`available`属性を1つの宣言に適用して、異なるプラットフォームおよび異なるバージョンのSwiftに対する宣言の可用性を指定できます。`available`属性が適用される宣言は、属性が指定するプラットフォームまたは言語バージョンが現在のターゲットと一致しない場合は無視されます。複数の`available`属性を使用する場合、有効な可用性はプラットフォームとSwiftの可用性の組み合わせです。

`available`属性がプラットフォームまたは言語名引数に加えて`introduced`引数のみを指定する場合、次の省略構文を使用できます：
```
@available(<#platform name#> <#version number#>, *)
@available(swift <#version number#>)
```

複数のプラットフォームに対する可用性を簡潔に表現するために、`available`属性の省略構文を使用できます。これらの2つの形式は機能的に同等ですが、可能な限り省略形式が推奨されます。

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // クラス定義
}
```

Swiftバージョン番号を使用して可用性を指定する`available`属性は、宣言のプラットフォーム可用性を追加で指定することはできません。代わりに、Swiftバージョンの可用性と1つ以上のプラットフォーム可用性を指定するために、別々の`available`属性を使用します。

```swift
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // 構造体定義
}
```

### backDeployed

この属性を関数、メソッド、サブスクリプト、または計算プロパティに適用して、シンボルの実装のコピーをそのシンボルを呼び出すプログラムに含めます。この属性は、オペレーティングシステムに含まれるAPIのように、プラットフォームの一部として提供されるシンボルを注釈するために使用します。この属性は、シンボルの実装のコピーを含めることで、遡及的に利用可能にすることができるシンボルをマークします。実装のコピーを含めることは、クライアントへのエミッションとも呼ばれます。

この属性は`before:`引数を取り、このシンボルを提供するプラットフォームの最初のバージョンを指定します。これらのプラットフォームバージョンは、`available`属性に指定するプラットフォームバージョンと同じ意味を持ちます。`available`属性とは異なり、リストにはすべてのバージョンを指すアスタリスク（`*`）を含めることはできません。例えば、次のコードを考えてみましょう：

```swift
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```

上記の例では、iOS SDKはiOS 17から`someFunction()`を提供します。さらに、SDKはバックデプロイメントを使用してiOS 16でも`someFunction()`を利用可能にします。

この関数を呼び出すコードをコンパイルする際、Swiftは関数の実装を見つけるための間接層を挿入します。このコードがこの関数を含むSDKのバージョンを使用して実行される場合、SDKの実装が使用されます。それ以外の場合、呼び出し元に含まれるコピーが使用されます。上記の例では、iOS 17以降で実行する場合はSDKの実装が使用され、iOS 16で実行する場合は呼び出し元に含まれる`someFunction()`のコピーが使用されます。

> **注**: 呼び出し元の最小デプロイメントターゲットがシンボルを含むSDKの最初のバージョンと同じかそれ以上の場合、コンパイラはランタイムチェックを最適化してSDKの実装を直接呼び出すことができます。この場合、バックデプロイされたシンボルに直接アクセスする場合、コンパイラはクライアントからシンボルの実装のコピーを省略することもできます。

次の条件を満たす関数、メソッド、サブスクリプト、および計算プロパティはバックデプロイ可能です：

- 宣言が`public`または`@usableFromInline`である。
- クラスインスタンスメソッドおよびクラス型メソッドの場合、メソッドが`final`であり、`@objc`でマークされていない。
- 実装が[inlinable](#)で説明されているインライン可能な関数の要件を満たしている。

### discardableResult

この属性を関数またはメソッド宣言に適用して、戻り値を使用せずに関数またはメソッドが呼び出された場合にコンパイラ警告を抑制します。

### dynamicCallable

この属性をクラス、構造体、列挙型、またはプロトコルに適用して、型のインスタンスを呼び出し可能な関数として扱います。型は`dynamicallyCall(withArguments:)`メソッド、`dynamicallyCall(withKeywordArguments:)`メソッド、またはその両方を実装する必要があります。

動的に呼び出し可能な型のインスタンスを任意の数の引数を持つ関数のように呼び出すことができます。

```swift
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()

// 動的メソッド呼び出しを使用する。
dial(4, 1, 1)
// "Get Swift help on forums.swift.org"と表示される

dial(8, 6, 7, 5, 3, 0, 9)
// "Unrecognized number"と表示される

// 基本メソッドを直接呼び出す。
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

`dynamicallyCall(withArguments:)`メソッドの宣言には、`ExpressibleByArrayLiteral`プロトコルに準拠する単一のパラメータが必要です。上記の例では`[Int]`です。戻り値の型は任意の型にすることができます。

`dynamicallyCall(withKeywordArguments:)`メソッドを実装すると、動的メソッド呼び出しにラベルを含めることができます。

```swift
@dynamicCallable
struct Repeater {
    func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
        return pairs
            .map { label, count in
                repeatElement(label, count: count).joined(separator: " ")
            }
            .joined(separator: "\n")
    }
}

let repeatLabels = Repeater()
print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
// a
// b b
// c c c
// b b
// a
```

`dynamicallyCall(withKeywordArguments:)`メソッドの宣言には、`ExpressibleByDictionaryLiteral`プロトコルに準拠する単一のパラメータが必要です。戻り値の型は任意の型にすることができます。パラメータの`Key`は`ExpressibleByStringLiteral`でなければなりません。前の例では、`KeyValuePairs`をパラメータ型として使用しているため、呼び出しに重複するパラメータラベルを含めることができます。例では`a`と`b`が複数回登場します。

両方の`dynamicallyCall`メソッドを実装すると、メソッド呼び出しにキーワード引数が含まれている場合、`dynamicallyCall(withKeywordArguments:)`が呼び出されます。それ以外の場合は、`dynamicallyCall(withArguments:)`が呼び出されます。

動的に呼び出し可能なインスタンスは、`dynamicallyCall`メソッドの実装で指定した型に一致する引数と戻り値を持つ場合にのみ呼び出すことができます。次の例では、`dynamicallyCall(withArguments:)`の実装が`KeyValuePairs<String, String>`を受け取るものではないため、コンパイルができません。

```swift
repeatLabels(a: "four") // エラー
```

### dynamicMemberLookup

この属性をクラス、構造体、列挙型、またはプロトコルに適用して、メンバーを実行時に名前で検索できるようにします。型は`subscript(dynamicMember:)`サブスクリプトを実装する必要があります。

明示的なメンバー式では、指定された名前のメンバーの宣言が存在しない場合、その式は型の`subscript(dynamicMember:)`サブスクリプトへの呼び出しとして解釈され、メンバーに関する情報が引数として渡されます。サブスクリプトは、キー・パスまたはメンバー名のいずれかをパラメータとして受け取ることができます。両方のサブスクリプトを実装する場合、キー・パス引数を取るサブスクリプトが使用されます。

`subscript(dynamicMember:)`の実装は、`KeyPath`、`WritableKeyPath`、または`ReferenceWritableKeyPath`型の引数を使用してキー・パスを受け取ることができます。また、`ExpressibleByStringLiteral`プロトコルに準拠する型の引数を使用してメンバー名を受け取ることができます。ほとんどの場合、`String`です。サブスクリプトの戻り値の型は任意の型にすることができます。

メンバー名による動的メンバー検索は、コンパイル時に型チェックできないデータをラップする型を作成するために使用できます。例えば、他の言語からSwiftにデータをブリッジする場合などです。例：

```swift
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}
let s = DynamicStruct()

// 動的メンバー検索を使用する。
let dynamic = s.someDynamicMember
print(dynamic)
// "325"と表示される

// 基本サブスクリプトを直接呼び出す。
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// "true"と表示される
```

キー・パスによる動的メンバー検索は、コンパイル時に型チェックをサポートする方法でラップ型を実装するために使用できます。例：

```swift
struct Point { var x, y: Int }

@dynamicMemberLookup
struct PassthroughWrapper<Value> {
    var value: Value
    subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
        get { return value[keyPath: member] }
    }
}

let point = Point(x: 381, y: 431)
let wrapper = PassthroughWrapper(value: point)
print(wrapper.x)
```

### freestanding

この属性をフリースタンディングマクロの宣言に適用します。

### frozen

この属性を構造体または列挙型の宣言に適用して、型に対する変更の種類を制限します。この属性は、ライブラリ進化モードでコンパイルする場合にのみ許可されます。将来のバージョンのライブラリでは、列挙型のケースや構造体の格納インスタンスプロパティを追加、削除、または並べ替えることはできません。これらの変更は非フローズン型では許可されますが、フローズン型ではABI互換性が破壊されます。

> **注**: コンパイラがライブラリ進化モードでない場合、すべての構造体と列挙型は暗黙的にフローズンと見なされ、この属性は無視されます。

ライブラリ進化モードでは、非フローズン構造体と列挙型のメンバーと対話するコードは、将来のバージョンのライブラリがその型のメンバーを追加、削除、または並べ替えた場合でも、再コンパイルせずに動作し続けるようにコンパイルされます。コンパイラは、実行時に情報を検索したり、間接層を追加したりする技術を使用してこれを実現します。構造体または列挙型をフローズンとしてマークすると、この柔軟性を放棄してパフォーマンスを向上させることができます。将来のバージョンのライブラリは型に対して限られた変更しかできませんが、コンパイラは型のメンバーと対話するコードで追加の最適化を行うことができます。

フローズン型、フローズン構造体の格納プロパティの型、およびフローズン列挙型のケースの関連値は、`public`または`usableFromInline`属性でマークされている必要があります。フローズン構造体のプロパティにはプロパティオブザーバーを持つことができず、格納インスタンスプロパティの初期値を提供する式は、`inlinable`関数で説明されているのと同じ制限に従う必要があります。

コマンドラインでライブラリ進化モードを有効にするには、Swiftコンパイラに`-enable-library-evolution`オプションを渡します。Xcodeで有効にするには、Xcodeヘルプで説明されているように、「Build Libraries for Distribution」ビルド設定（`BUILD_LIBRARY_FOR_DISTRIBUTION`）を「Yes」に設定します。

フローズン列挙型に対するswitch文には、[将来の列挙型ケースの切り替え](#)で説明されているように、デフォルトケースは必要ありません。フローズン列挙型に対するswitch文に`default`または`@unknown default`ケースを含めると、そのコードは実行されないため警告が表示されます。

### GKInspectable

この属性を適用して、カスタムGameplayKitコンポーネントプロパティをSpriteKitエディタUIに公開します。この属性を適用すると、`objc`属性も暗黙的に適用されます。

### inlinable

この属性を関数、メソッド、計算プロパティ、サブスクリプト、コンビニエンスイニシャライザ、またはデイニシャライザの宣言に適用して、その宣言の実装をモジュールの公開インターフェイスの一部として公開します。コンパイラは、呼び出し元のサイトでシンボルの実装のコピーに置き換えることができます。

インライン化可能なコードは、任意のモジュールで宣言された`open`および`public`シンボルと対話でき、同じモジュールで宣言された`usableFromInline`属性でマークされた`internal`シンボルと対話できます。インライン化可能なコードは、`private`または`fileprivate`シンボルと対話することはできません。

この属性は、関数内にネストされた宣言や`fileprivate`または`private`宣言には適用できません。インライン化可能な関数内で定義された関数やクロージャは、この属性でマークできないにもかかわらず暗黙的にインライン化可能です。

### main

この属性を構造体、クラス、または列挙型の宣言に適用して、プログラムフローのトップレベルエントリポイントを含むことを示します。型は引数を取らず、`Void`を返す`main`型関数を提供する必要があります。例：

```swift
@main
struct MyTopLevel {
    static func main() {
        // トップレベルコードはここに記述します
    }
}
```

`main`属性の要件を別の方法で説明すると、この属性を記述する型は、次の仮想プロトコルに準拠する必要があります：

```swift
protocol ProvidesMain {
    static func main() throws
}
```

実行可能ファイルを作成するためにコンパイルするSwiftコードには、トップレベルエントリポイントが1つしか含まれないことができます。[トップレベルコード](#)で説明されているように。

### nonobjc

この属性をメソッド、プロパティ、サブスクリプト、またはイニシャライザの宣言に適用して、暗黙の`objc`属性を抑制します。`nonobjc`属性は、宣言をObjective-Cコードで使用できないようにコンパイラに指示します。

この属性を拡張に適用すると、その拡張のすべてのメンバーに`objc`属性が明示的にマークされていない限り、同じ効果があります。

`nonobjc`属性を使用して、`objc`属性でマークされたクラスのブリッジメソッドの循環を解決し、`objc`属性でマークされたクラスのメソッドやイニシャライザのオーバーロードを許可します。

`nonobjc`属性でマークされたメソッドは、`objc`属性でマークされたメソッドをオーバーライドすることはできません。ただし、`objc`属性でマークされたメソッドは、`nonobjc`属性でマークされたメソッドをオーバーライドできます。同様に、`nonobjc`属性でマークされたメソッドは、`objc`属性でマークされたメソッドのプロトコル要件を満たすことはできません。

### NSApplicationMain

**非推奨**

この属性は非推奨です。代わりに`main`属性を使用してください。Swift 6では、この属性を使用するとエラーになります。

この属性をクラスに適用して、そのクラスがアプリデリゲートであることを示します。この属性を使用することは、`NSApplicationMain(_:_:)`関数を呼び出すことと同等です。

この属性を使用しない場合は、次のように`NSApplicationMain(_:_:)`関数を呼び出すトップレベルコードを含む`main.swift`ファイルを提供します：

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

実行可能ファイルを作成するためにコンパイルするSwiftコードには、トップレベルエントリポイントが1つしか含まれないことができます。[トップレベルコード](#)で説明されているように。

### NSCopying

この属性をクラスの格納変数プロパティに適用します。この属性は、プロパティのセッターをプロパティ自体の値ではなく、`copyWithZone(_:)`メソッドによって返されるプロパティの値のコピーで合成します。プロパティの型は`NSCopying`プロトコルに準拠している必要があります。

`NSCopying`属性は、Objective-Cの`copy`プロパティ属性と同様に動作します。

### NSManaged

この属性を`NSManagedObject`を継承するクラスのインスタンスメソッドまたは格納変数プロパティに適用して、Core Dataが実行時に関連するエンティティ記述に基づいてその実装を動的に提供することを示します。`NSManaged`属性でマークされたプロパティには、Core Dataが実行時にストレージも提供します。この属性を適用すると、`objc`属性も暗黙的に適用されます。

### objc

このアトリビュートは、Objective-Cで表現できる任意の宣言に適用します - 例えば、ネストされていないクラス、プロトコル、非ジェネリック列挙型（整数の生の値型に制限されている）、クラスのプロパティとメソッド（ゲッターとセッターを含む）、プロトコルとプロトコルのオプションメンバー、イニシャライザ、サブスクリプトなどです。`objc`アトリビュートは、その宣言がObjective-Cコードで使用可能であることをコンパイラに伝えます。

このアトリビュートを拡張に適用すると、その拡張の各メンバーに明示的に`nonobjc`アトリビュートが付けられていない限り、すべてのメンバーに適用するのと同じ効果があります。

コンパイラは、Objective-Cで定義されたクラスのサブクラスに`objc`アトリビュートを暗黙的に追加します。ただし、サブクラスはジェネリックであってはならず、ジェネリッククラスを継承してはいけません。これらの基準を満たすサブクラスに`objc`アトリビュートを明示的に追加して、以下で説明するようにObjective-C名を指定することができます。`objc`アトリビュートが付けられたプロトコルは、このアトリビュートが付けられていないプロトコルを継承することはできません。

`objc`アトリビュートは、以下の場合にも暗黙的に追加されます：
- その宣言がサブクラスでのオーバーライドで、スーパークラスの宣言に`objc`アトリビュートがある場合
- その宣言が`objc`アトリビュートを持つプロトコルの要件を満たす場合
- その宣言に`IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable`、`IBInspectable`、`NSManaged`、または`GKInspectable`アトリビュートがある場合

列挙型に`objc`アトリビュートを適用すると、各列挙型ケースは列挙型名とケース名を連結したものとしてObjective-Cコードに公開されます。ケース名の最初の文字は大文字になります。例えば、Swift の`Planet`列挙型における`venus`という名前のケースは、Objective-Cコードでは`PlanetVenus`というケースとして公開されます。

`objc`アトリビュートは、オプションで1つのアトリビュート引数を受け取ります。この引数は識別子で構成されます。識別子は、`objc`アトリビュートが適用される実体に対してObjective-Cに公開される名前を指定します。この引数を使用して、クラス、列挙型、列挙型ケース、プロトコル、メソッド、ゲッター、セッター、イニシャライザに名前を付けることができます。クラス、プロトコル、または列挙型のObjective-C名を指定する場合は、[Objective-Cによるプログラミングの規約](#)で説明されているように、名前に3文字のプレフィックスを含めてください。以下の例では、`ExampleClass`の`enabled`プロパティのゲッターを、プロパティ名そのものではなく`isEnabled`としてObjective-Cコードに公開しています。

```swift
class ExampleClass: NSObject {
    @objc var enabled: Bool {
        @objc(isEnabled) get {
            // 適切な値を返す
        }
    }
}
```

詳細については、[SwiftをObjective-Cにインポートする](#)を参照してください。

> **注意**: `objc`アトリビュートの引数は、その宣言のランタイム名も変更できます。ランタイム名は、`NSClassFromString(_:)`のようなObjective-Cランタイムと対話する関数を呼び出すとき、およびアプリの`Info.plist`ファイルでクラス名を指定するときに使用します。引数を渡して名前を指定する場合、その名前がObjective-Cコードでの名前とランタイム名として使用されます。引数を省略した場合、Objective-Cコードでの名前はSwiftコードでの名前と一致し、ランタイム名は名前マングリングの通常のSwiftコンパイラ規約に従います。

### objcMembers

このアトリビュートをクラス宣言に適用すると、そのクラス、その拡張、そのサブクラス、およびそのサブクラスのすべての拡張のObjective-C互換のすべてのメンバーに`objc`アトリビュートが暗黙的に適用されます。

ほとんどのコードでは、必要な宣言のみを公開する`objc`アトリビュートを代わりに使用する必要があります。多くの宣言を公開する必要がある場合は、それらを`objc`アトリビュートを持つ拡張にグループ化することができます。`objcMembers`アトリビュートは、Objective-Cランタイムのイントロスペクション機能を多用するライブラリのための便利な機能です。必要のない場合に`objc`アトリビュートを適用すると、バイナリサイズが増加しパフォーマンスに悪影響を与える可能性があります。

### preconcurrency

このアトリビュートを宣言に適用して、厳密な並行性チェックを抑制します。このアトリビュートは以下の種類の宣言に適用できます：
- インポート
- 構造体、クラス、アクター
- 列挙型と列挙型ケース
- プロトコル
- 変数と定数
- サブスクリプト
- イニシャライザ
- 関数

インポート宣言では、このアトリビュートは、インポートされたモジュールの型を使用するコードの並行性チェックの厳密さを軽減します。具体的には、インポートされたモジュールからの型で、明示的に非送信可能としてマークされていないものは、送信可能な型が必要なコンテキストで使用できます。

他の宣言では、このアトリビュートは、宣言されているシンボルを使用するコードの並行性チェックの厳密さを軽減します。このシンボルを最小限の並行性チェックを持つスコープで使用する場合、そのシンボルによって指定された並行性関連の制約（例えば、`Sendable`要件やグローバルアクターなど）はチェックされません。

次のように、このアトリビュートを使用して、厳密な並行性チェックへの移行を支援できます：
1. 厳密なチェックを有効にします。
2. 厳密なチェックを有効にしていないモジュールのインポートに対して、`preconcurrency`アトリビュートを注釈します。
3. モジュールを厳密なチェックに移行した後、`preconcurrency`アトリビュートを削除します。コンパイラは、インポートに対する`preconcurrency`アトリビュートがもはや効果を持たず、削除すべき場所について警告します。
4. 他の宣言については、宣言に並行性関連の制約を追加する際に、まだ厳密なチェックに移行していないクライアントがある場合に`preconcurrency`アトリビュートを追加します。すべてのクライアントが移行した後、`preconcurrency`アトリビュートを削除します。

Objective-Cからの宣言は常に`preconcurrency`アトリビュートが付けられているかのようにインポートされます。

### propertyWrapper

このアトリビュートをクラス、構造体、または列挙型の宣言に適用して、その型をプロパティラッパーとして使用します。このアトリビュートを型に適用すると、その型と同じ名前のカスタムアトリビュートが作成されます。その新しいアトリビュートをクラス、構造体、または列挙型のプロパティに適用して、ラッパー型のインスタンスを通じてプロパティへのアクセスをラップします。同じ方法で、ローカルな格納変数宣言にアトリビュートを適用して、変数へのアクセスをラップします。計算変数、グローバル変数、および定数はプロパティラッパーを使用できません。

ラッパーは`wrappedValue`インスタンスプロパティを定義する必要があります。プロパティのラップされた値は、このプロパティのゲッターとセッターが公開する値です。ほとんどの場合、`wrappedValue`は計算値ですが、格納値であることもできます。ラッパーは、ラップされた値に必要な基礎的なストレージを定義および管理します。コンパイラは、ラップされたプロパティの名前にアンダースコア（`_`）をプレフィックスとして付けることで、ラッパー型のインスタンスのストレージを合成します。例えば、`someProperty`のラッパーは`_someProperty`として格納されます。ラッパーの合成されたストレージのアクセス制御レベルは`private`です。

プロパティラッパーを持つプロパティは、`willSet`および`didSet`ブロックを含むことができますが、コンパイラが合成した`get`または`set`ブロックをオーバーライドすることはできません。

Swiftは、プロパティラッパーの初期化に対して2つの形式の糖衣構文を提供します。ラップされた値の定義で代入構文を使用して、代入の右側の式をプロパティラッパーのイニシャライザの`wrappedValue`パラメータに渡すことができます。また、プロパティにアトリビュートを適用する際に引数を提供し、それらの引数がプロパティラッパーのイニシャライザに渡されます。例えば、以下のコードでは、`SomeStruct`は`SomeWrapper`が定義する各イニシャライザを呼び出します。

```swift
@propertyWrapper
struct SomeWrapper {
    var wrappedValue: Int
    var someValue: Double
    init() {
        self.wrappedValue = 100
        self.someValue = 12.3
    }
    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.someValue = 45.6
    }
    init(wrappedValue value: Int, custom: Double) {
        self.wrappedValue = value
        self.someValue = custom
    }
}

struct SomeStruct {
    // init()を使用
    @SomeWrapper var a: Int

    // init(wrappedValue:)を使用
    @SomeWrapper var b = 10

    // 両方ともinit(wrappedValue:custom:)を使用
    @SomeWrapper(custom: 98.7) var c = 30
    @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
}
```

ラップされたプロパティの投影値は、プロパティラッパーが追加の機能を公開するために使用できる2番目の値です。プロパティラッパー型の作成者は、その投影値の意味を決定し、投影値が公開するインターフェースを定義する責任があります。プロパティラッパーから値を投影するには、ラッパー型に`projectedValue`インスタンスプロパティを定義します。コンパイラは、ラップされたプロパティの名前にドル記号（`$`）をプレフィックスとして付けることで、投影値の識別子を合成します。例えば、`someProperty`の投影値は`$someProperty`です。投影値のアクセス制御レベルは、元のラップされたプロパティと同じです。

```swift
@propertyWrapper
struct WrapperWithProjection {
    var wrappedValue: Int
    var projectedValue: SomeProjection {
        return SomeProjection(wrapper: self)
    }
}
struct SomeProjection {
    var wrapper: WrapperWithProjection
}

struct SomeStruct {
    @WrapperWithProjection var x = 123
}
let s = SomeStruct()
s.x           // Int値
s.$x          // SomeProjection値
s.$x.wrapper  // WrapperWithProjection値
```

### resultBuilder

このアトリビュートをクラス、構造体、列挙型に適用して、その型を結果ビルダーとして使用します。結果ビルダーは、ネストされたデータ構造をステップバイステップで構築する型です。結果ビルダーを使用して、ネストされたデータ構造を自然で宣言的な方法で作成するためのドメイン固有言語（DSL）を実装します。`resultBuilder`アトリビュートの使用方法の例については、[結果ビルダー](#)を参照してください。

#### 結果構築メソッド

結果ビルダーは、以下に説明する静的メソッドを実装します。結果ビルダーのすべての機能は静的メソッドを通じて公開されるため、その型のインスタンスを初期化することはありません。結果ビルダーは、`buildBlock(_:)`メソッドまたは`buildPartialBlock(first:)`および`buildPartialBlock(accumulated:next:)`メソッドの両方を実装する必要があります。他のメソッドは、DSLで追加の機能を有効にするためのオプションです。結果ビルダー型の宣言には、実際にはプロトコル準拠を含める必要はありません。

静的メソッドの説明では、3つの型をプレースホルダーとして使用します。`Expression`型は結果ビルダーの入力の型のプレースホルダーであり、`Component`は部分結果の型のプレースホルダーであり、`FinalResult`は結果ビルダーが生成する結果の型のプレースホルダーです。これらの型を、結果ビルダーが使用する実際の型に置き換えます。結果構築メソッドが`Expression`または`FinalResult`の型を指定しない場合、それらはデフォルトで`Component`と同じになります。

ブロック構築メソッドは次のとおりです：
- `static func buildBlock(_ components: Component...) -> Component`
  - 部分結果の配列を1つの部分結果に結合します。
- `static func buildPartialBlock(first: Component) -> Component`
  - 最初のコンポーネントから部分結果コンポーネントを構築します。このメソッドと`buildPartialBlock(accumulated:next:)`の両方を実装して、コンポーネントを1つずつ構築するブロックをサポートします。`buildBlock(_:)`と比較して、このアプローチは異なる数の引数を処理するためのジェネリックオーバーロードの必要性を減らします。
- `static func buildPartialBlock(accumulated: Component, next: Component) -> Component`
  - 蓄積されたコンポーネントと新しいコンポーネントを組み合わせて部分結果コンポーネントを構築します。このメソッドと`buildPartialBlock(first:)`の両方を実装して、コンポーネントを1つずつ構築するブロックをサポートします。`buildBlock(_:)`と比較して、このアプローチは異なる数の引数を処理するためのジェネリックオーバーロードの必要性を減らします。

結果ビルダーは、上記のブロック構築メソッドのすべてを実装できます。その場合、可用性によってどのメソッドが呼び出されるかが決まります。デフォルトでは、Swiftは`buildPartialBlock(first:)`および`buildPartialBlock(accumulated:next:)`メソッドを呼び出します。Swiftが代わりに`buildBlock(_:)`を呼び出すようにするには、`buildPartialBlock(first:)`および`buildPartialBlock(accumulated:next:)`に記述した可用性の前に、囲む宣言を利用可能としてマークします。

追加の結果構築メソッドは次のとおりです：
- `static func buildOptional(_ component: Component?) -> Component`
  - nilになる可能性のある部分結果から部分結果を構築します。このメソッドを実装して、else句を含まないif文をサポートします。
- `static func buildEither(first: Component) -> Component`
  - 条件に応じて値が変わる部分結果を構築します。このメソッドと`buildEither(second:)`の両方を実装して、switch文およびelse句を含むif文をサポートします。
- `static func buildEither(second: Component) -> Component`
  - 条件に応じて値が変わる部分結果を構築します。このメソッドと`buildEither(first:)`の両方を実装して、switch文およびelse句を含むif文をサポートします。
- `static func buildArray(_ components: [Component]) -> Component`
  - 部分結果の配列から部分結果を構築します。このメソッドを実装して、forループをサポートします。
- `static func buildExpression(_ expression: Expression) -> Component`
  - 式から部分結果を構築します。このメソッドを実装して、前処理を行う（例えば、式を内部型に変換する）か、使用サイトでの型推論のための追加情報を提供します。
- `static func buildFinalResult(_ component: Component) -> FinalResult`
  - 部分結果から最終結果を構築します。部分結果と最終結果に異なる型を使用する結果ビルダーの一部としてこのメソッドを実装するか、結果を返す前に他の後処理を行います。
- `static func buildLimitedAvailability(_ component: Component) -> Component`
  - 型情報を消去する部分結果を構築します。このメソッドを実装して、可用性チェックを実行するコンパイラ制御文の外部に型情報が伝播するのを防ぎます。

例えば、以下のコードは、整数の配列を構築する単純な結果ビルダーを定義します。このコードは、上記のメソッドの例と一致させるために、`Component`および`Expression`を型エイリアスとして定義します。

```swift
@resultBuilder
struct ArrayBuilder {
    typealias Component = [Int]
    typealias Expression = Int
    static func buildExpression(_ element: Expression) -> Component {
        return [element]
    }
    static func buildOptional(_ component: Component?) -> Component {
        guard let component = component else { return [] }
        return component
    }
    static func buildEither(first component: Component) -> Component {
        return component
    }
    static func buildEither(second component: Component) -> Component {
        return component
    }
    static func buildArray(_ components: [Component]) -> Component {
        return Array(components.joined())
    }
    static func buildBlock(_ components: Component...) -> Component {
        return Array(components.joined())
    }
}
```

#### 結果の変換

結果ビルダー構文を使用するコードを結果ビルダー型の静的メソッドを呼び出すコードに変換するために、以下の構文変換が再帰的に適用されます：

- 結果ビルダーに `buildExpression(_:)` メソッドがある場合、各式はそのメソッドの呼び出しになります。この変換は常に最初に行われます。例えば、以下の宣言は同等です：

```swift
@ArrayBuilder var builderNumber: [Int] { 10 }
var manualNumber = ArrayBuilder.buildExpression(10)
```

- 代入文は式のように変換されますが、評価結果は `()` として扱われます。代入を特に処理するために、引数として `()` 型を取る `buildExpression(_:)` のオーバーロードを定義することができます。
- 利用可能性条件をチェックする分岐文は、`buildLimitedAvailability(_:)` メソッドの呼び出しに変換されます。このメソッドが実装されていない場合、利用可能性をチェックする分岐文は他の分岐文と同じ変換を使用します。この変換は `buildEither(first:)`、`buildEither(second:)`、または `buildOptional(_:)` の呼び出しに変換される前に行われます。

`buildLimitedAvailability(_:)` メソッドを使用して、どの分岐が取られるかによって変わる型情報を消去します。例えば、以下の `buildEither(first:)` と `buildEither(second:)` メソッドは、両方の分岐に関する型情報をキャプチャするジェネリック型を使用します。

```swift
protocol Drawable {
    func draw() -> String
}
struct Text: Drawable {
    var content: String
    init(_ content: String) { self.content = content }
    func draw() -> String { return content }
}
struct Line<D: Drawable>: Drawable {
    var elements: [D]
    func draw() -> String {
        return elements.map { $0.draw() }.joined(separator: "")
    }
}
struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
    var content: Drawable
    func draw() -> String { return content.draw() }
}

@resultBuilder
struct DrawingBuilder {
    static func buildBlock<D: Drawable>(_ components: D...) -> Line<D> {
        return Line(elements: components)
    }
    static func buildEither<First, Second>(first: First) -> DrawEither<First, Second> {
        return DrawEither(content: first)
    }
    static func buildEither<First, Second>(second: Second) -> DrawEither<First, Second> {
        return DrawEither(content: second)
    }
}
```

しかし、このアプローチは利用可能性チェックがあるコードで問題を引き起こします：

```swift
@available(macOS 99, *)
struct FutureText: Drawable {
    var content: String
    init(_ content: String) { self.content = content }
    func draw() -> String { return content }
}
@DrawingBuilder var brokenDrawing: Drawable {
    if #available(macOS 99, *) {
        FutureText("Inside.future")  // 問題
    } else {
        Text("Inside.present")
    }
}
// brokenDrawing の型は Line<DrawEither<Line<FutureText>, Line<Text>>> です
```

上記のコードでは、`FutureText` が `brokenDrawing` の型の一部として現れます。これは、`DrawEither` ジェネリック型の一つの型だからです。この型が明示的に使用されていない場合でも、ランタイムで `FutureText` が利用できないとプログラムがクラッシュする可能性があります。

この問題を解決するために、常に利用可能な型を返すことで型情報を消去する `buildLimitedAvailability(_:)` メソッドを実装します。例えば、以下のコードでは、利用可能性チェックから `AnyDrawable` 値を構築します。

```swift
struct AnyDrawable: Drawable {
    var content: Drawable
    func draw() -> String { return content.draw() }
}
extension DrawingBuilder {
    static func buildLimitedAvailability(_ content: some Drawable) -> AnyDrawable {
        return AnyDrawable(content: content)
    }
}

@DrawingBuilder var typeErasedDrawing: Drawable {
    if #available(macOS 99, *) {
        FutureText("Inside.future")
    } else {
        Text("Inside.present")
    }
}
// typeErasedDrawing の型は Line<DrawEither<AnyDrawable, Line<Text>>> です
```

- 分岐文は `buildEither(first:)` と `buildEither(second:)` メソッドへの一連のネストされた呼び出しに変わります。文の条件とケースは二分木のリーフノードにマッピングされ、文はそのリーフノードへのパスに従って `buildEither` メソッドへのネストされた呼び出しになります。例えば、3つのケースを持つ switch 文を書くと、コンパイラは3つのリーフノードを持つ二分木を使用します。同様に、ルートノードから2番目のケースへのパスが「2番目の子」から「1番目の子」になるため、そのケースは `buildEither(first: buildEither(second: ... ))` のようなネストされた呼び出しになります。以下の宣言は同等です：

```swift
let someNumber = 19
@ArrayBuilder var builderConditional: [Int] {
    if someNumber < 12 {
        31
    } else if someNumber == 19 {
        32
    } else {
        33
    }
}

var manualConditional: [Int]
if someNumber < 12 {
    let partialResult = ArrayBuilder.buildExpression(31)
    let outerPartialResult = ArrayBuilder.buildEither(first: partialResult)
    manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
} else if someNumber == 19 {
    let partialResult = ArrayBuilder.buildExpression(32)
    let outerPartialResult = ArrayBuilder.buildEither(second: partialResult)
    manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
} else {
    let partialResult = ArrayBuilder.buildExpression(33)
    manualConditional = ArrayBuilder.buildEither(second: partialResult)
}
```

- 値を生成しない可能性がある分岐文（else 句のない if 文など）は、`buildOptional(_:)` の呼び出しに変わります。if 文の条件が満たされると、そのコードブロックが変換されて引数として渡されます。そうでない場合、`buildOptional(_:)` が引数として nil を取って呼び出されます。例えば、以下の宣言は同等です：

```swift
@ArrayBuilder var builderOptional: [Int] {
    if (someNumber % 2) == 1 { 20 }
}

var partialResult: [Int]? = nil
if (someNumber % 2) == 1 {
    partialResult = ArrayBuilder.buildExpression(20)
}
var manualOptional = ArrayBuilder.buildOptional(partialResult)
```

- 結果ビルダーが `buildPartialBlock(first:)` と `buildPartialBlock(accumulated:next:)` メソッドを実装している場合、コードブロックや do 文はこれらのメソッドの呼び出しに変わります。ブロック内の最初の文は `buildPartialBlock(first:)` メソッドの引数になるように変換され、残りの文は `buildPartialBlock(accumulated:next:)` メソッドへのネストされた呼び出しになります。例えば、以下の宣言は同等です：

```swift
struct DrawBoth<First: Drawable, Second: Drawable>: Drawable {
    var first: First
    var second: Second
    func draw() -> String { return first.draw() + second.draw() }
}

@resultBuilder
struct DrawingPartialBlockBuilder {
    static func buildPartialBlock<D: Drawable>(first: D) -> D {
        return first
    }
    static func buildPartialBlock<Accumulated: Drawable, Next: Drawable>(
        accumulated: Accumulated, next: Next
    ) -> DrawBoth<Accumulated, Next> {
        return DrawBoth(first: accumulated, second: next)
    }
}

@DrawingPartialBlockBuilder var builderBlock: some Drawable {
    Text("First")
    Line(elements: [Text("Second"), Text("Third")])
    Text("Last")
}

let partialResult1 = DrawingPartialBlockBuilder.buildPartialBlock(first: Text("first"))
let partialResult2 = DrawingPartialBlockBuilder.buildPartialBlock(
    accumulated: partialResult1,
    next: Line(elements: [Text("Second"), Text("Third")])
)
let manualResult = DrawingPartialBlockBuilder.buildPartialBlock(
    accumulated: partialResult2,
    next: Text("Last")
)
```

- それ以外の場合、コードブロックや do 文は `buildBlock(_:)` メソッドの呼び出しに変わります。ブロック内の各文は一度に一つずつ変換され、それらは `buildBlock(_:)` メソッドの引数になります。例えば、以下の宣言は同等です：

```swift
@ArrayBuilder var builderBlock: [Int] {
    100
    200
    300
}

var manualBlock = ArrayBuilder.buildBlock(
    ArrayBuilder.buildExpression(100),
    ArrayBuilder.buildExpression(200),
    ArrayBuilder.buildExpression(300)
)
```

- for ループは一時変数、for ループ、および `buildArray(_:)` メソッドの呼び出しに変わります。新しい for ループはシーケンスを反復し、その配列に各部分結果を追加します。一時配列は `buildArray(_:)` 呼び出しの引数として渡されます。例えば、以下の宣言は同等です：

```swift
@ArrayBuilder var builderArray: [Int] {
    for i in 5...7 {
        100 + i
    }
}

var temporary: [[Int]] = []
for i in 5...7 {
    let partialResult = ArrayBuilder.buildExpression(100 + i)
    temporary.append(partialResult)
}
let manualArray = ArrayBuilder.buildArray(temporary)
```

- 結果ビルダーに `buildFinalResult(_:)` メソッドがある場合、最終結果はそのメソッドの呼び出しに変わります。この変換は常に最後に行われます。

変換の動作は一時変数の観点から説明されていますが、結果ビルダーを使用しても、コードの他の部分から見える新しい宣言は実際には作成されません。

`break`、`continue`、`defer`、`guard`、または `return` 文、`while` 文、または `do-catch` 文を結果ビルダーが変換するコード内で使用することはできません。

変換プロセスはコード内の宣言を変更しないため、式を一つずつ構築するために一時定数や変数を使用できます。また、`throw` 文、コンパイル時の診断文、または `return` 文を含むクロージャも変更されません。

可能な限り、変換は統合されます。例えば、式 `4 + 5 * 6` は複数の呼び出しではなく `buildExpression(4 + 5 * 6)` になります。同様に、ネストされた分岐文は `buildEither` メソッドへの単一の二分木の呼び出しになります。


#### カスタム結果ビルダー属性

結果ビルダー型を作成すると、同じ名前のカスタム属性が作成されます。次の場所にその属性を適用できます:
- 関数宣言に適用すると、結果ビルダーが関数の本体を構築します。
- ゲッターを含む変数またはサブスクリプト宣言に適用すると、結果ビルダーがゲッターの本体を構築します。
- 関数宣言のパラメータに適用すると、結果ビルダーが対応する引数として渡されるクロージャの本体を構築します。

結果ビルダー属性を適用してもABI互換性には影響しません。パラメータに結果ビルダー属性を適用すると、その属性が関数のインターフェースの一部となり、ソース互換性に影響を与える可能性があります。

### requires_stored_property_inits

この属性をクラス宣言に適用して、クラス内のすべての格納プロパティが定義の一部としてデフォルト値を提供することを要求します。この属性は、`NSManagedObject`を継承するクラスに対して推論されます。

### testable

この属性をインポート宣言に適用して、そのモジュールをインポートし、モジュールのコードのテストを簡素化するためにアクセス制御を変更します。インポートされたモジュール内の内部アクセスレベル修飾子でマークされたエンティティは、パブリックアクセスレベル修飾子で宣言されたかのようにインポートされます。内部またはパブリックアクセスレベル修飾子でマークされたクラスおよびクラスメンバーは、オープンアクセスレベル修飾子で宣言されたかのようにインポートされます。インポートされたモジュールは、テストが有効になっている状態でコンパイルされている必要があります。

### UIApplicationMain

**非推奨**

この属性は非推奨です。代わりに`main`属性を使用してください。Swift 6では、この属性を使用するとエラーになります。

この属性をクラスに適用して、それがアプリデリゲートであることを示します。この属性を使用することは、`UIApplicationMain`関数を呼び出し、このクラスの名前をデリゲートクラスの名前として渡すことと同等です。

この属性を使用しない場合は、トップレベルで`UIApplicationMain(_:_:_:_:)`関数を呼び出すコードを含む`main.swift`ファイルを提供してください。たとえば、アプリが`UIApplication`のカスタムサブクラスを主要クラスとして使用する場合、この属性を使用する代わりに`UIApplicationMain(_:_:_:_:)`関数を呼び出します。

コンパイルして実行可能ファイルを作成するSwiftコードには、トップレベルのエントリポイントが1つしか含まれないことができます。詳細はトップレベルコードを参照してください。

### unchecked

この属性をプロトコル型に適用して、そのプロトコルの要件の強制をオフにします。

サポートされている唯一のプロトコルは`Sendable`です。

### usableFromInline

この属性を関数、メソッド、計算プロパティ、サブスクリプト、イニシャライザ、またはデイニシャライザ宣言に適用して、そのシンボルを同じモジュール内で定義されたインライン可能なコードで使用できるようにします。宣言は内部アクセスレベル修飾子を持っている必要があります。`usableFromInline`でマークされた構造体またはクラスは、そのプロパティに対してパブリックまたは`usableFromInline`の型のみを使用できます。`usableFromInline`でマークされた列挙型は、そのケースの生値および関連値に対してパブリックまたは`usableFromInline`の型のみを使用できます。

パブリックアクセスレベル修飾子のように、この属性は宣言をモジュールのパブリックインターフェースの一部として公開します。`public`とは異なり、コンパイラは`usableFromInline`でマークされた宣言をモジュール外のコードで名前で参照することを許可しませんが、宣言のシンボルはエクスポートされます。それにもかかわらず、モジュール外のコードはランタイムの動作を使用して宣言のシンボルと相互作用することができます。

`inlinable`属性でマークされた宣言は暗黙的にインライン可能なコードで使用できます。`inlinable`または`usableFromInline`のいずれかを内部宣言に適用できますが、両方の属性を適用することはエラーです。

### warn_unqualified_access

この属性をトップレベル関数、インスタンスメソッド、またはクラスまたは静的メソッドに適用して、その関数またはメソッドが前置修飾子（モジュール名、型名、インスタンス変数または定数など）なしで使用されたときに警告をトリガーします。この属性を使用して、同じスコープからアクセス可能な同じ名前の関数間の曖昧さを減らすのに役立ちます。

たとえば、Swift標準ライブラリにはトップレベルの`min(_:_:)`関数と、比較可能な要素を持つシーケンスのための`min()`メソッドの両方が含まれています。シーケンスメソッドは`warn_unqualified_access`属性で宣言されており、`Sequence`拡張内で一方または他方を使用しようとするときの混乱を減らすのに役立ちます。

### インターフェースビルダーによって使用される宣言属性

インターフェースビルダー属性は、インターフェースビルダーがXcodeと同期するために使用する宣言属性です。Swiftは次のインターフェースビルダー属性を提供します: `IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable`、および`IBInspectable`。これらの属性は概念的にはObjective-Cの対応する属性と同じです。

`IBOutlet`および`IBInspectable`属性はクラスのプロパティ宣言に適用します。`IBAction`および`IBSegueAction`属性はクラスのメソッド宣言に適用し、`IBDesignable`属性はクラス宣言に適用します。

`IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable`、または`IBInspectable`属性を適用すると、`objc`属性も暗黙的に適用されます。

### 型属性

型属性は型にのみ適用できます。

#### autoclosure

この属性を適用して、引数のないクロージャにその式を自動的にラップすることで、式の評価を遅延させます。関数またはメソッド宣言のパラメータの型に適用し、そのパラメータの型が引数を取らず、その式の型の値を返す関数型である場合に適用します。`autoclosure`属性の使用例については、オートクロージャと関数型を参照してください。

#### convention

この属性を関数の型に適用して、その呼び出し規約を示します。

`convention`属性は常に次の引数のいずれかと共に表示されます:
- `swift`引数はSwift関数参照を示します。これはSwiftの関数値の標準的な呼び出し規約です。
- `block`引数はObjective-C互換のブロック参照を示します。関数値はブロックオブジェクトへの参照として表され、これはオブジェクト内にその呼び出し関数を埋め込んだ`id`互換のObjective-Cオブジェクトです。呼び出し関数はC呼び出し規約を使用します。
- `c`引数はC関数参照を示します。関数値はコンテキストを持たず、C呼び出し規約を使用します。

いくつかの例外を除いて、任意の呼び出し規約の関数は、他の任意の呼び出し規約の関数が必要な場合に使用できます。非ジェネリックなグローバル関数、ローカル変数をキャプチャしないローカル関数、またはローカル変数をキャプチャしないクロージャは、C呼び出し規約に変換できます。他のSwift関数はC呼び出し規約に変換できません。Objective-Cブロック呼び出し規約の関数はC呼び出し規約に変換できません。

#### escaping

この属性を関数またはメソッド宣言のパラメータの型に適用して、そのパラメータの値が後で実行するために保存できることを示します。これは、その値が呼び出しのライフタイムを超えて存続することを許可することを意味します。`escaping`型属性を持つ関数型パラメータは、プロパティまたはメソッドに対して明示的に`self.`を使用する必要があります。`escaping`属性の使用例については、エスケープクロージャを参照してください。

#### Sendable

この属性を関数の型に適用して、その関数またはクロージャが送信可能であることを示します。この属性を関数型に適用することは、非関数型を`Sendable`プロトコルに準拠させることと同じ意味を持ちます。

この属性は、関数またはクロージャが送信可能な値を期待するコンテキストで使用され、その関数またはクロージャが送信可能であるための要件を満たしている場合に推論されます。

送信可能な関数型は、対応する非送信可能な関数型のサブタイプです。

### スイッチケース属性

スイッチケース属性はスイッチケースにのみ適用できます。

#### unknown

この属性をスイッチケースに適用して、コードがコンパイルされる時点で既知の列挙型のいずれのケースにも一致しないことが予想されることを示します。`unknown`属性の使用例については、将来の列挙型ケースのスイッチングを参照してください。

### 属性の文法

```ebnf
attribute → @ attribute-name attribute-argument-clause?
attribute-name → identifier
attribute-argument-clause → ( balanced-tokens? )
attributes → attribute attributes?
balanced-tokens → balanced-token balanced-tokens?
balanced-token → ( balanced-tokens? )
balanced-token → [ balanced-tokens? ]
balanced-token → { balanced-tokens? }
balanced-token → Any identifier, keyword, literal, or operator
balanced-token → Any punctuation except (, ), [, ], {, or }
```
