# 文字列と文字

テキストを保存し、操作します。

文字列とは、一連の文字のことです。例えば "hello, world" や "albatross" が該当します。Swift の文字列は `String` 型で表されます。`String` の内容は、`Character` 値のコレクションとしてアクセスするなど、さまざまな方法で操作できます。

Swift の `String` 型と `Character` 型は、コード内でのテキスト操作を高速かつ Unicode 準拠で行う方法を提供します。文字列の作成や操作のための構文は軽量で読みやすく、C に似た文字列リテラル構文を持っています。文字列の連結は、2 つの文字列を `+` 演算子で結合するだけで簡単に行え、文字列の可変性は他の値と同様に、定数または変数を選択することで管理されます。また、文字列補間を使用して、定数、変数、リテラル、式を長い文字列に挿入することができます。これにより、表示、保存、印刷のためのカスタム文字列値を簡単に作成できます。

このように構文がシンプルであるにもかかわらず、Swift の `String` 型は高速でモダンな文字列実装を提供します。すべての文字列は、エンコーディングに依存しない Unicode 文字で構成され、さまざまな Unicode 表現でその文字にアクセスすることができます。

::: info Note
Swift の `String` 型は、Foundation の `NSString` クラスとブリッジされています。Foundation は `String` を拡張し、`NSString` によって定義されたメソッドを公開します。そのため、Foundation をインポートすれば、キャストなしで `String` 上でこれらの `NSString` メソッドにアクセスできます。

`String` と Foundation や Cocoa の連携について詳しくは、「Bridging Between String and NSString」を参照してください。
:::

## 文字列リテラル

コード内で事前定義された `String` 値を文字列リテラルとして含めることができます。文字列リテラルは、二重引用符（"）で囲まれた一連の文字です。

文字列リテラルを定数や変数の初期値として使用できます。

```swift
let someString = "Some string literal value"
```

`someString` 定数は文字列リテラル値で初期化されているため、Swift はその型を自動的に `String` と推論します。

### 複数行文字列リテラル

複数行にまたがる文字列が必要な場合は、複数行文字列リテラルを使用します。これは、三重の二重引用符（"""）で囲まれた一連の文字です。

```swift
let quotation = """
The White Rabbit put on his spectacles.  "Where shall I begin,
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on
till you come to the end; then stop."
"""
```

複数行文字列リテラルには、開始および終了の引用符（"""）の間にあるすべての行が含まれます。文字列は、開始引用符（"""）の直後の行から始まり、終了引用符の直前の行で終わります。そのため、以下の文字列はどちらも改行で始まったり終わったりしません。

```swift
let singleLineString = "These are the same."
let multilineString = """
These are the same.
"""
```

ソースコードに複数行文字列リテラル内の改行が含まれる場合、その改行は文字列の値にも反映されます。ソースコードを読みやすくするために改行を含めたいが、その改行を文字列の値に含めたくない場合は、それらの行末にバックスラッシュ（\）を記述します。

```swift
let softWrappedQuotation = """
The White Rabbit put on his spectacles.  "Where shall I begin, \
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on \
till you come to the end; then stop."
"""
```

文字列リテラルを改行で開始または終了させたい場合は、最初または最後の行を空行にします。例えば：

```swift
let lineBreaks = """

This string starts with a line break.
It also ends with a line break.

"""
```

複数行文字列は、周囲のコードに合わせてインデントすることができます。終了引用符（"""）の前の空白が、他のすべての行の先頭で無視される空白を Swift に指示します。ただし、終了引用符の前以外に行の先頭に空白を記述すると、その空白は文字列に含まれます。

上記の例では、複数行文字列リテラル全体がインデントされていますが、文字列内の最初と最後の行は空白で始まっていません。中間の行には、終了引用符よりも多いインデントがあるため、その余分な 4 スペースのインデントが含まれています。

### 文字列リテラルの特殊文字

文字列リテラルには、以下の特殊文字を含めることができます：

- エスケープされた特殊文字: `\0`（ヌル文字）、`\\`（バックスラッシュ）、`\t`（水平タブ）、`\n`（改行）、`\r`（復帰）、`\"`（二重引用符）、`\'`（単一引用符）
- 任意の Unicode スカラー値: `\u{n}` と記述され、n は 1〜8 桁の16進数（Unicode については、以下の「Unicode」で説明）

以下のコードは、これらの特殊文字の4つの例を示しています。`wiseWords` 定数には 2 つのエスケープされた二重引用符が含まれています。`dollarSign`、`blackHeart`、`sparklingHeart` の定数は、Unicode スカラー形式を示しています。

```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imagination is more important than knowledge" - Einstein
let dollarSign = "\u{24}"        // $,  Unicode scalar U+0024
let blackHeart = "\u{2665}"      // ♥,  Unicode scalar U+2665
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

複数行文字列リテラルでは、二重引用符を1つだけでなく3つ使用するため、複数行文字列リテラル内に二重引用符（"）をエスケープせずに含めることができます。`"""` を文字列内に含める場合は、少なくとも1つの引用符をエスケープする必要があります。例えば：

```swift
let threeDoubleQuotationMarks = """
Escaping the first quotation mark \"""
Escaping all three quotation marks \"\"\"
"""
```

### 拡張文字列デリミタ

拡張デリミタを使用して文字列リテラルを囲むことで、特殊文字をその効果を発動させずに文字列内に含めることができます。文字列を二重引用符（`"`）で囲み、その外側を数記号（`#`）で囲みます。例えば、文字列リテラル `#"Line 1\nLine 2"#` を出力すると、改行エスケープシーケンス（`\n`）がそのまま出力され、文字列が2行に分かれません。

文字列リテラル内の特殊文字の効果を必要とする場合は、エスケープ文字（`\`）の後にデリミタ内の数記号の数を一致させます。例えば、`#"Line 1\nLine 2"#` を改行したい場合は、`#"Line 1\#nLine 2"#` を使用します。同様に、`###"Line1\###nLine2"###` も改行します。

拡張デリミタで作成された文字列リテラルは、複数行文字列リテラルにもできます。デリミタを使用して、デフォルトではリテラルを終了する `"""` を文字列内に含めることができます。例えば：

```swift
let threeMoreDoubleQuotationMarks = #"""
Here are three more double quotes: """
"""#
```

## 空の文字列の初期化

長い文字列を作成する出発点として、空の `String` 値を作成するには、空の文字列リテラルを変数に割り当てるか、初期化子構文を使用して新しい `String` インスタンスを初期化します。

```swift
var emptyString = ""               // 空の文字列リテラル
var anotherEmptyString = String()  // 初期化子構文
// これらの文字列はどちらも空であり、互いに等価です。
```

`String` 値が空であるかどうかは、その Boolean 型の `isEmpty` プロパティを確認することで調べることができます：

```swift
if emptyString.isEmpty {
    print("Nothing to see here")
}
// "Nothing to see here" と表示されます
```

## 変更可能な文字列

特定の `String` を変更可能（または変更不可）にするかどうかを示すには、それを変数に割り当てるか（この場合、変更可能）、または定数に割り当てます（この場合、変更不可）：

```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString は現在 "Horse and carriage"

let constantString = "Highlander"
constantString += " and another Highlander"
// これはコンパイル時エラーを報告します - 定数文字列は変更できません
```

::: info Note
このアプローチは、Objective-C や Cocoa の文字列変更とは異なります。Objective-C では、文字列が変更可能かどうかを示すために、`NSString` と `NSMutableString` の 2 つのクラスから選択します。
:::

## 文字列は値型

Swift の `String` 型は値型です。新しい `String` 値を作成すると、その `String` 値は関数またはメソッドに渡されたり、定数や変数に割り当てられるときにコピーされます。いずれの場合も、既存の `String` 値の新しいコピーが作成され、新しいコピーが渡されるか割り当てられ、元のバージョンは渡されません。値型については「Structures and Enumerations Are Value Types」で説明されています。

Swift のデフォルトでのコピーによる文字列処理の動作により、関数やメソッドから渡される `String` 値がどこから来たものであっても、それが自分のものであると確信できます。そのため、自分が変更しない限り、渡された文字列が変更されることはありません。

内部的には、Swift のコンパイラは文字列の使用を最適化し、実際のコピーは絶対に必要な場合にのみ行われます。このため、値型として文字列を操作しても常に高いパフォーマンスを得られます。

## 単一文字を扱う

文字列の個々の `Character` 値には、`for-in` ループで文字列を反復処理することでアクセスできます：

```swift
for character in "Dog!🐶" {
    print(character)
}
// D
// o
// g
// !
// 🐶
```

`for-in` ループについては、「For-In Loops」で説明されています。

また、単一文字の文字列リテラルから `Character` 型注釈を付けることで、独立した `Character` 定数や変数を作成することもできます：

```swift
let exclamationMark: Character = "!"
```

文字列値は、`Character` 値の配列を引数として初期化することで構築できます：

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
print(catString)
// "Cat!🐱" と表示されます
```

## 文字列と文字の連結

文字列値は加算演算子（`+`）を使用して結合（コンキャテネーション）し、新しい文字列値を作成できます：

```swift
let string1 = "hello"
let string2 = " there"
var welcome = string1 + string2
// welcome は "hello there" になります
```

加算代入演算子（`+=`）を使用して、既存の文字列変数に文字列値を追加することもできます：

```swift
var instruction = "look over"
instruction += string2
// instruction は "look over there" になります
```

`String` 型の `append()` メソッドを使用して、`Character` 値を文字列変数に追加することもできます：

```swift
let exclamationMark: Character = "!"
welcome.append(exclamationMark)
// welcome は "hello there!" になります
```

::: info Note
`String` または `Character` を既存の `Character` 変数に追加することはできません。`Character` 値は単一の文字のみを含む必要があるためです。
:::

複数行文字列リテラルを使用して長い文字列の行を構築する場合、文字列内の各行、特に最後の行が改行で終わるようにすることをお勧めします。例えば：

```swift
let badStart = """
    one
    two
    """
let end = """
    three
    """
print(badStart + end)
// 2行の文字列を出力：
// one
// twothree

let goodStart = """
    one
    two

    """
print(goodStart + end)
// 3行の文字列を出力：
// one
// two
// three
```

上記のコードでは、`badStart` と `end` を連結すると、最後の行が改行で終わらないため、望ましくない結果になります。一方、`goodStart` の各行が改行で終わるため、期待通りの結果が得られます。

## 文字列補間

文字列補間を使用すると、定数、変数、リテラル、および式の値を文字列リテラルに含めることで、新しい `String` 値を構築できます。文字列補間は、単一行および複数行文字列リテラルの両方で使用できます。補間される各項目は、バックスラッシュ（`\`）を前置した括弧（`()`）で囲まれます：

```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message は "3 times 2.5 is 7.5" になります
```

上記の例では、`multiplier` の値が文字列リテラル内に `\(multiplier)` として挿入されています。このプレースホルダーは、文字列補間が評価されて実際の文字列が作成される際に、`multiplier` の実際の値に置き換えられます。

また、`multiplier` の値は文字列内でより大きな式の一部としても使用されています。この式は `Double(multiplier) * 2.5` の値を計算し、その結果（7.5）を文字列に挿入します。この場合、式は文字列リテラル内で `\(Double(multiplier) * 2.5)` として記述されています。

拡張デリミタを使用して、文字列補間として解釈される文字を含む文字列を作成することができます。例えば：

```swift
print(#"Write an interpolated string in Swift using \(multiplier)."#)
// "Write an interpolated string in Swift using \(multiplier)." と表示されます
```

拡張デリミタを使用する文字列内で文字列補間を使用する場合、バックスラッシュ後の数記号の数を文字列の開始および終了で使用された数記号の数と一致させます。例えば：

```swift
print(#"6 times 7 is \#(6 * 7)."#)
// "6 times 7 is 42." と表示されます
```

::: info Note
補間された文字列内で括弧内に記述する式には、エスケープされていないバックスラッシュ（`\`）、復帰（キャリッジリターン）、または改行を含めることはできません。ただし、他の文字列リテラルを含めることは可能です。
:::


## Unicode

Unicode は、異なる文字体系でテキストをエンコード、表現、および処理するための国際標準です。これにより、ほぼすべての言語の文字を標準化された形式で表現し、テキストファイルやウェブページなどの外部ソースからその文字を読み書きすることができます。このセクションで説明するように、Swift の `String` 型と `Character` 型は完全に Unicode 準拠です。

### Unicodeのスカラー値

Swift のネイティブな `String` 型は、内部的には Unicode スカラー値で構築されています。Unicode スカラー値は、文字や修飾子のための一意の 21 ビットの番号で、例えば、LATIN SMALL LETTER A ("a") の場合は U+0061、FRONT-FACING BABY CHICK ("🐥") の場合は U+1F425 です。

すべての 21 ビットの Unicode スカラー値が文字に割り当てられているわけではないことに注意してください。一部のスカラー値は将来の割り当てや UTF-16 エンコーディングでの使用のために予約されています。文字に割り当てられたスカラー値には、通常名前も付けられています。例として、LATIN SMALL LETTER A や FRONT-FACING BABY CHICK などです。

### 拡張書記素クラスタ

Swift の `Character` 型の各インスタンスは、1 つの拡張書記素クラスタを表します。拡張書記素クラスタは、1 つまたは複数の Unicode スカラーのシーケンスで、これらを組み合わせることで単一の人間が読める文字が生成されます。

例えば、文字 é は、単一の Unicode スカラー é（LATIN SMALL LETTER E WITH ACUTE, U+00E9）として表現できます。しかし、同じ文字は標準の文字 e（LATIN SMALL LETTER E, U+0065）と、続く COMBINING ACUTE ACCENT スカラー（U+0301）のペアとしても表現できます。COMBINING ACUTE ACCENT スカラーは、それに先行するスカラーに対してグラフィカルに適用され、Unicode に対応したテキストレンダリングシステムによって e が é に変換されます。

どちらの場合も、文字 é は拡張書記素クラスタを表す単一の Swift `Character` 値として表現されます。最初のケースではクラスタは 1 つのスカラーを含み、2 番目のケースでは 2 つのスカラーのクラスタです：

```swift
let eAcute: Character = "\u{E9}"                         // é
let combinedEAcute: Character = "\u{65}\u{301}"          // e の後に ́
// eAcute は é、combinedEAcute も é
```

拡張書記素クラスタは、複雑なスクリプト文字を単一の `Character` 値として表現する柔軟な方法を提供します。例えば、韓国語アルファベットのハングル音節は、事前結合されたシーケンスまたは分解されたシーケンスとして表現できます。これらのどちらも Swift では単一の `Character` 値として扱われます：

```swift
let precomposed: Character = "\u{D55C}"                  // 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"   // ᄒ, ᅡ, ᆫ
// precomposed は 한、decomposed も 한
```

拡張書記素クラスタにより、囲み記号（例えば、COMBINING ENCLOSING CIRCLE, U+20DD）のスカラーを他の Unicode スカラーで囲むことができ、これらを単一の `Character` 値として扱うことができます：

```swift
let enclosedEAcute: Character = "\u{E9}\u{20DD}"
// enclosedEAcute は é⃝
```

地域表示記号のスカラーはペアで結合して単一の `Character` 値を作成できます。例えば、REGIONAL INDICATOR SYMBOL LETTER U (U+1F1FA) と REGIONAL INDICATOR SYMBOL LETTER S (U+1F1F8) の組み合わせです：

```swift
let regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"
// regionalIndicatorForUS は 🇺🇸
```

## 文字のカウント

文字列内の `Character` 値の数を取得するには、文字列の `count` プロパティを使用します：

```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
print("unusualMenagerie has \(unusualMenagerie.count) characters")
// "unusualMenagerie has 40 characters" と表示されます
```

Swift が `Character` 値に拡張書記素クラスタを使用しているため、文字列の結合や変更が常に文字列の文字数に影響するとは限りません。

例えば、4文字の単語 `cafe` を新しい文字列として初期化し、その末尾に COMBINING ACUTE ACCENT (U+0301) を追加した場合、結果の文字列は依然として 4 文字の長さを持ち、4 番目の文字は `e` ではなく `é` になります：

```swift
var word = "cafe"
print("the number of characters in \(word) is \(word.count)")
// "the number of characters in cafe is 4" と表示されます

word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301

print("the number of characters in \(word) is \(word.count)")
// "the number of characters in café is 4" と表示されます
```

::: info Note
拡張書記素クラスタは複数の Unicode スカラーで構成されることがあります。このため、異なる文字や同じ文字の異なる表現は、保存するのに異なる量のメモリを必要とする場合があります。そのため、Swift の文字は文字列の表現内で同じ量のメモリを占有するとは限りません。この結果、文字列内の文字数は、拡張書記素クラスタの境界を判断するために文字列全体を反復処理しなければ計算できません。特に長い文字列を扱う場合、`count` プロパティは文字列全体の Unicode スカラーを反復処理する必要があることを意識してください。

`count` プロパティによって返される文字数は、同じ文字を含む `NSString` の `length` プロパティと必ずしも一致しません。`NSString` の長さは、文字列の UTF-16 表現内の 16 ビットコードユニットの数に基づいており、文字列内の Unicode 拡張書記素クラスタの数に基づいているわけではありません。
:::

## 文字列へのアクセスと変更

文字列へのアクセスや変更は、そのメソッドやプロパティを使用するか、添字構文を使用して行います。

### 文字列インデックス

各 `String` 値には関連付けられたインデックスタイプ `String.Index` があり、これは文字列内の各 `Character` の位置に対応しています。

前述のように、異なる文字が保存するために必要なメモリ量は異なる場合があります。そのため、特定の位置にある `Character` を判断するには、文字列の先頭または末尾から各 Unicode スカラーを反復処理する必要があります。この理由から、Swift の文字列は整数値でインデックス化することができません。

最初の `Character` の位置にアクセスするには、`startIndex` プロパティを使用します。最後の文字の後の位置には `endIndex` プロパティを使用します。そのため、`endIndex` プロパティは文字列の添字の有効な引数ではありません。文字列が空の場合、`startIndex` と `endIndex` は等しくなります。

指定されたインデックスの前後のインデックスには、`index(before:)` および `index(after:)` メソッドを使用してアクセスします。指定されたインデックスからさらに離れたインデックスにアクセスするには、これらのメソッドを複数回呼び出す代わりに、`index(_:offsetBy:)` メソッドを使用します。

添字構文を使用して、特定の文字列インデックスにある `Character` にアクセスできます：

```swift
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a
```

文字列の範囲外のインデックスにアクセスしたり、範囲外のインデックスにある `Character` にアクセスしようとすると、ランタイムエラーが発生します：

```swift
greeting[greeting.endIndex] // エラー
greeting.index(after: greeting.endIndex) // エラー
```

`indices` プロパティを使用して、文字列内の各文字のインデックスにアクセスできます：

```swift
for index in greeting.indices {
    print("\(greeting[index]) ", terminator: "")
}
// "G u t e n   T a g ! " と表示されます
```

::: info Note
`startIndex` および `endIndex` プロパティ、ならびに `index(before:)`、`index(after:)`、`index(_:offsetBy:)` メソッドは、`Collection` プロトコルに準拠する任意の型で使用できます。ここで示した `String` に加えて、`Array`、`Dictionary`、`Set` などのコレクション型も含まれます。
:::


### 挿入と取り外し

特定の位置に文字を挿入するには、`insert(_:at:)` メソッドを使用します。また、別の文字列の内容を特定の位置に挿入するには、`insert(contentsOf:at:)` メソッドを使用します。

```swift
var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome は "hello!" になります

welcome.insert(contentsOf: " there", at: welcome.index(before: welcome.endIndex))
// welcome は "hello there!" になります
```

特定の位置から文字を削除するには、`remove(at:)` メソッドを使用します。また、特定の範囲から部分文字列を削除するには、`removeSubrange(_:)` メソッドを使用します：

```swift
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome は "hello there" になります

let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome は "hello" になります
```

::: info Note
`insert(_:at:)`、`insert(contentsOf:at:)`、`remove(at:)`、および `removeSubrange(_:)` メソッドは、`RangeReplaceableCollection` プロトコルに準拠する任意の型で使用できます。ここで示した `String` のほか、`Array`、`Dictionary`、`Set` などのコレクション型にも適用されます。
:::

## 部分文字列

文字列から部分文字列を取得した場合（例えば、添字や `prefix(_:)` メソッドを使用）、結果は別の文字列ではなく `Substring` のインスタンスとなります。Swift の部分文字列は文字列とほぼ同じメソッドを持ち、文字列と同じように操作できます。ただし、文字列とは異なり、部分文字列は文字列操作中の一時的な使用に適しています。結果を長期的に保存する場合は、部分文字列を `String` のインスタンスに変換します。例えば：

```swift
let greeting = "Hello, world!"
let index = greeting.firstIndex(of: ",") ?? greeting.endIndex
let beginning = greeting[..<index]
// beginning は "Hello"

// 結果を長期保存するために String に変換します
let newString = String(beginning)
```

文字列と同様に、各部分文字列には、部分文字列を構成する文字が保存されるメモリ領域があります。文字列と部分文字列の違いは、パフォーマンス最適化のために、部分文字列が元の文字列または他の部分文字列のメモリの一部を再利用できる点です（文字列にも同様の最適化がありますが、2 つの文字列がメモリを共有している場合、それらは等価です）。この最適化により、文字列または部分文字列を変更するまで、メモリコピーのコストを支払う必要がありません。ただし、部分文字列は長期保存には適していません。元の文字列を再利用しているため、部分文字列が使用されている間は元の文字列全体をメモリに保持しておく必要があります。

上記の例では、`greeting` は文字列であり、文字列を構成する文字が保存されるメモリ領域を持っています。`beginning` は `greeting` の部分文字列であるため、`greeting` が使用するメモリを再利用します。一方、`newString` は部分文字列から作成された文字列であり、独自のメモリ領域を持っています。

::: info Note
`String` と `Substring` は両方とも `StringProtocol` プロトコルに準拠しているため、文字列操作関数が `StringProtocol` 値を受け入れる場合、`String` または `Substring` のいずれかを使用してこれらの関数を呼び出すことができます。
:::

## 文字列の比較

Swift では、テキスト値を比較する方法が 3 つ提供されています：文字列および文字の等価性、接頭辞の等価性、接尾辞の等価性。

### 文字列と文字の等価性

文字列および文字の等価性は、比較演算子「等しい（`==`）」および「等しくない（`!=`）」を使用して確認します（比較演算子については「Comparison Operators」を参照）。

```swift
let quotation = "We're a lot alike, you and I."
let sameQuotation = "We're a lot alike, you and I."
if quotation == sameQuotation {
    print("These two strings are considered equal")
}
// "These two strings are considered equal" と表示されます
```

2 つの `String` 値（または 2 つの `Character` 値）は、それらの拡張書記素クラスタが正準等価である場合、等しいと見なされます。拡張書記素クラスタが正準等価であるとは、内部的に異なる Unicode スカラーで構成されていても、同じ言語的意味と外観を持つ場合を指します。

例えば、LATIN SMALL LETTER E WITH ACUTE (U+00E9) は、LATIN SMALL LETTER E (U+0065) と COMBINING ACUTE ACCENT (U+0301) の組み合わせと正準等価です。これらのどちらも文字 é を表現する有効な方法であり、正準等価と見なされます：

```swift
// LATIN SMALL LETTER E WITH ACUTE を使用した "Voulez-vous un café?"
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"

// LATIN SMALL LETTER E と COMBINING ACUTE ACCENT を使用した "Voulez-vous un café?"
let combinedEAcuteQuestion = "Voulez-vous un caf\u{65}\u{301}?"

if eAcuteQuestion == combinedEAcuteQuestion {
    print("These two strings are considered equal")
}
// "These two strings are considered equal" と表示されます
```

一方、LATIN CAPITAL LETTER A (U+0041, "A") は英語で使用されるもので、CYRILLIC CAPITAL LETTER A (U+0410, "А") はロシア語で使用されます。これらの文字は見た目は似ていますが、言語的意味が異なるため、等価ではありません：

```swift
let latinCapitalLetterA: Character = "\u{41}"
let cyrillicCapitalLetterA: Character = "\u{0410}"

if latinCapitalLetterA != cyrillicCapitalLetterA {
    print("These two characters aren't equivalent.")
}
// "These two characters aren't equivalent." と表示されます
```

::: info Note
Swift における文字列および文字の比較は、ロケールに依存しません。
:::

### 接頭辞と接尾辞の均等性

文字列が特定の接頭辞または接尾辞を持つかどうかを確認するには、`hasPrefix(_:)` および `hasSuffix(_:)` メソッドを使用します。これらのメソッドは、`String` 型の引数を 1 つ取り、Boolean 値を返します。

以下の例は、シェイクスピアの『ロミオとジュリエット』の最初の 2 幕のシーン場所を表す文字列の配列を示しています：

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
```

`hasPrefix(_:)` メソッドを使用して、配列内の第 1 幕のシーン数を数えます：

```swift
var act1SceneCount = 0
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        act1SceneCount += 1
    }
}
print("There are \(act1SceneCount) scenes in Act 1")
// "There are 5 scenes in Act 1" と表示されます
```

同様に、`hasSuffix(_:)` メソッドを使用して、キャピュレットの館および修道士ロレンスの部屋で行われるシーン数を数えます：

```swift
var mansionCount = 0
var cellCount = 0
for scene in romeoAndJuliet {
    if scene.hasSuffix("Capulet's mansion") {
        mansionCount += 1
    } else if scene.hasSuffix("Friar Lawrence's cell") {
        cellCount += 1
    }
}
print("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
// "6 mansion scenes; 2 cell scenes" と表示されます
```

::: info Note
`hasPrefix(_:)` および `hasSuffix(_:)` メソッドは、各文字列内の拡張書記素クラスタを文字ごとに正準等価性比較を行います（詳細は「String and Character Equality」を参照）。
:::


## 文字列のUnicode表現

Unicode 文字列がテキストファイルやその他のストレージに書き込まれる際、その文字列内の Unicode スカラー値は、いくつかの Unicode 定義のエンコーディング形式のいずれかでエンコードされます。各形式は、文字列を「コードユニット」と呼ばれる小さなチャンクにエンコードします。これには以下が含まれます：

- UTF-8 エンコーディング形式（文字列を 8 ビットのコードユニットとしてエンコード）
- UTF-16 エンコーディング形式（文字列を 16 ビットのコードユニットとしてエンコード）
- UTF-32 エンコーディング形式（文字列を 32 ビットのコードユニットとしてエンコード）

Swift は、文字列の Unicode 表現にアクセスするためのいくつかの方法を提供しています。文字列を `for-in` 文で反復処理して、Unicode 拡張書記素クラスタとしてその個々の `Character` 値にアクセスできます（詳細は「Working with Characters」を参照）。

また、文字列値に以下の 3 つの Unicode 準拠の表現でアクセスすることもできます：

- UTF-8 コードユニットのコレクション（文字列の `utf8` プロパティでアクセス）
- UTF-16 コードユニットのコレクション（文字列の `utf16` プロパティでアクセス）
- 21 ビットの Unicode スカラー値のコレクション（文字列の UTF-32 エンコーディング形式に相当、`unicodeScalars` プロパティでアクセス）

以下は、それぞれ異なる表現を示す例です。この例では、文字列は D、o、g、‼（DOUBLE EXCLAMATION MARK, U+203C）、および 🐶（DOG FACE, U+1F436）の文字で構成されています：

```swift
let dogString = "Dog‼🐶"
```

### UTF-8 表現

`utf8` プロパティを反復処理して、文字列の UTF-8 表現にアクセスできます。このプロパティは `String.UTF8View` 型で、文字列の UTF-8 表現内のバイトごとに符号なし 8 ビット（`UInt8`）値のコレクションです：

```swift
for codeUnit in dogString.utf8 {
    print("\(codeUnit) ", terminator: "")
}
print("")
// 出力: "68 111 103 226 128 188 240 159 144 182"
```

最初の 3 つの値（68, 111, 103）は、D、o、g の UTF-8 表現を表します。次の 3 つの値（226, 128, 188）は、‼ の 3 バイトの UTF-8 表現です。最後の 4 つの値（240, 159, 144, 182）は、🐶 の 4 バイトの UTF-8 表現です。

### UTF-16 表現

`utf16` プロパティを反復処理して、文字列の UTF-16 表現にアクセスできます。このプロパティは `String.UTF16View` 型で、文字列の UTF-16 表現内の各 16 ビットコードユニットに符号なし 16 ビット（`UInt16`）値を持つコレクションです：

```swift
for codeUnit in dogString.utf16 {
    print("\(codeUnit) ", terminator: "")
}
print("")
// 出力: "68 111 103 8252 55357 56374"
```

最初の 3 つの値（68, 111, 103）は D、o、g の UTF-16 表現です。4 番目の値（8252）は‼ の Unicode スカラー U+203C の 16 進値を 10 進数に変換したものです。5 番目と 6 番目の値（55357, 56374）は、🐶 の UTF-16 サロゲートペア表現です。

### Unicode のスカラー表現

`unicodeScalars` プロパティを反復処理して、文字列の Unicode スカラー表現にアクセスできます。このプロパティは `UnicodeScalarView` 型で、各値は `UnicodeScalar` 型です。

`UnicodeScalar` の `value` プロパティを使用すると、スカラーの 21 ビット値が `UInt32` 値として返されます：

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar.value) ", terminator: "")
}
print("")
// 出力: "68 111 103 8252 128054"
```

または、各スカラー値を文字列として表示することもできます：

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar) ")
}
// 出力:
// D
// o
// g
// ‼
// 🐶
```

この方法で、スカラー値を新しい文字列値として構築することが可能です。