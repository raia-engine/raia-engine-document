# レキシカル構造

構文の最下層コンポーネントについて説明します。

## 概要

Swiftのレキシカル構造は、言語の有効なトークンを形成する文字のシーケンスを定義します。これらの有効なトークンは言語の最下層の構成要素を形成し、後の章で言語の残りの部分を説明するために使用されます。トークンは、識別子、キーワード、句読点、リテラル、または演算子で構成されます。

ほとんどの場合、トークンは以下で指定される文法の制約内で、入力テキストから可能な限り長い部分文字列を考慮してSwiftソースファイルの文字から生成されます。この動作は最長一致または最大マンチと呼ばれます。

## 空白文字とコメント

### 空白文字

空白文字には2つの用途があります：ソースファイル内のトークンを分離すること、および演算子（前置、後置、および中置）を区別することです。それ以外の場合は無視されます。

以下の文字は空白文字として扱われます：
- スペース (U+0020)
- ラインフィード (U+000A)
- キャリッジリターン (U+000D)
- 水平タブ (U+0009)
- 垂直タブ (U+000B)
- フォームフィード (U+000C)
- ヌル (U+0000)

### コメント

コメントはコンパイラによって空白文字として扱われます。1行コメントは`//`で始まり、ラインフィード(U+000A)またはキャリッジリターン(U+000D)まで続きます。複数行コメントは`/*`で始まり`*/`で終わります。複数行コメントのネストが許可されていますが、コメントマーカーはバランスが取れている必要があります。

コメントには[Markup Formatting Reference](markup-formatting-reference)で説明されているような追加のフォーマットやマークアップを含めることができます。

### 空白文字の文法
```
whitespace → whitespace-item whitespace?
whitespace-item → line-break
whitespace-item → inline-space
whitespace-item → comment
whitespace-item → multiline-comment
whitespace-item → U+0000, U+000B, or U+000C
line-break → U+000A
line-break → U+000D
line-break → U+000D followed by U+000A
inline-spaces → inline-space inline-spaces?
inline-space → U+0009 or U+0020
comment → // comment-text line-break
multiline-comment → /* multiline-comment-text */
comment-text → comment-text-item comment-text?
comment-text-item → Any Unicode scalar value except U+000A or U+000D
multiline-comment-text → multiline-comment-text-item multiline-comment-text?
multiline-comment-text-item → multiline-comment
multiline-comment-text-item → comment-text-item
multiline-comment-text-item → Any Unicode scalar value except /* or */
```

## 識別子

識別子は、AからZの大文字または小文字、アンダースコア（_）、基本多言語面の非結合英数字Unicode文字、または私用領域外の基本多言語面外の文字で始まります。最初の文字の後には、数字と結合Unicode文字も許可されます。

アンダースコアで始まる識別子、アンダースコアで始まる最初の引数ラベルを持つ添字、およびアンダースコアで始まる最初の引数ラベルを持つイニシャライザは、宣言にpublicアクセスレベル修飾子が付いていても内部として扱います。この慣例により、フレームワークの作成者は、宣言をpublicにする必要がある制限がある場合でも、クライアントが相互作用したり依存したりしてはならないAPIの一部をマークできます。さらに、2つのアンダースコアで始まる識別子は、Swiftコンパイラおよび標準ライブラリ用に予約されています。

予約語を識別子として使用するには、バックティック（`）を前後に付けます。たとえば、classは有効な識別子ではありませんが、`class`は有効です。バックティックは識別子の一部とは見なされません。`x`とxは同じ意味を持ちます。

明示的なパラメータ名のないクロージャ内では、パラメータは暗黙的に$0、$1、$2などと名付けられます。これらの名前はクロージャのスコープ内で有効な識別子です。

コンパイラは、プロパティラッパープロジェクションを持つプロパティに対してドル記号（$）で始まる識別子を合成します。コードはこれらの識別子と相互作用できますが、そのプレフィックスを持つ識別子を宣言することはできません。詳細については、Attributes章のpropertyWrapperセクションを参照してください。

### 識別子の文法
```
identifier → identifier-head identifier-characters?
identifier → ` identifier-head identifier-characters? `
identifier → implicit-parameter-name
identifier → property-wrapper-projection
identifier-list → identifier | identifier , identifier-list
identifier-head → Upper- or lowercase letter A through Z
identifier-head → _
identifier-head → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, or U+00B7–U+00BA
identifier-head → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, or U+00F8–U+00FF
identifier-head → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, or U+180F–U+1DBF
identifier-head → U+1E00–U+1FFF
identifier-head → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, or U+2060–U+206F
identifier-head → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, or U+2776–U+2793
identifier-head → U+2C00–U+2DFF or U+2E80–U+2FFF
identifier-head → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, or U+3040–U+D7FF
identifier-head → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, or U+FE30–U+FE44
identifier-head → U+FE47–U+FFFD
identifier-head → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, or U+40000–U+4FFFD
identifier-head → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, or U+80000–U+8FFFD
identifier-head → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, or U+C0000–U+CFFFD
identifier-head → U+D0000–U+DFFFD or U+E0000–U+EFFFD
identifier-character → Digit 0 through 9
identifier-character → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F
identifier-character → identifier-head
identifier-characters → identifier-character identifier-characters?
implicit-parameter-name → $ decimal-digits
property-wrapper-projection → $ identifier-characters
```

## キーワードと句読点

以下のキーワードは予約されており、バックティックでエスケープされない限り識別子として使用できません。inout、var、およびlet以外のキーワードは、関数宣言または関数呼び出しのパラメータ名としてエスケープせずに使用できます。メンバーがキーワードと同じ名前を持つ場合、そのメンバーへの参照はバックティックでエスケープする必要はありませんが、メンバーへの参照とキーワードの使用の間に曖昧さがある場合は除きます。たとえば、self、Type、およびProtocolは明示的なメンバー式で特別な意味を持つため、その文脈ではバックティックでエスケープする必要があります。

### 宣言で使用されるキーワード
```
associatedtype, borrowing, class, consuming, deinit, enum, extension, fileprivate, func, import, init, inout, internal, let, nonisolated, open, operator, private, precedencegroup, protocol, public, rethrows, static, struct, subscript, typealias, var
```

### ステートメントで使用されるキーワード
```
break, case, catch, continue, default, defer, do, else, fallthrough, for, guard, if, in, repeat, return, throw, switch, where, while
```

### 式および型で使用されるキーワード
```
Any, as, await, catch, false, is, nil, rethrows, self, Self, super, throw, throws, true, try
```

### パターンで使用されるキーワード
```
_
```

### 数字記号（#）で始まるキーワード
```
#available, #colorLiteral, #else, #elseif, #endif, #fileLiteral, #if, #imageLiteral, #keyPath, #selector, #sourceLocation, #unavailable
```

> **Note**
> 
> Swift 5.9以前では、以下のキーワードが予約されていました：#column, #dsohandle, #error, #fileID, #filePath, #file, #function, #line, #warning。これらは現在、Swift標準ライブラリのマクロとして実装されています：column, dsohandle, error(_:), fileID, filePath, file, function, line, warning(_:).

### 特定の文脈で予約されているキーワード
```
associativity, convenience, didSet, dynamic, final, get, indirect, infix, lazy, left, mutating, none, nonmutating, optional, override, package, postfix, precedence, prefix, Protocol, required, right, set, some, Type, unowned, weak, willSet
```
これらは文法で現れる文脈外では識別子として使用できます。

以下のトークンは句読点として予約されており、カスタム演算子として使用できません：
```
(, ), {, }, [, ], ., ,, :, ;, =, @, #, & (as a prefix operator), ->, `, ?, ! (as a postfix operator)
```

## リテラル

リテラルは、数値や文字列などの型の値のソースコード表現です。

以下はリテラルの例です：
```swift
42               // 整数リテラル
3.14159          // 浮動小数点リテラル
"Hello, world!"  // 文字列リテラル
/Hello, .*/      // 正規表現リテラル
true             // ブールリテラル
```

リテラル自体には型がありません。代わりに、リテラルは無限の精度を持つものとして解析され、Swiftの型推論がリテラルの型を推論しようとします。たとえば、宣言`let x: Int8 = 42`では、Swiftは明示的な型注釈（`: Int8`）を使用して、整数リテラル`42`の型が`Int8`であると推論します。適切な型情報が利用できない場合、Swiftはリテラルの型がSwift標準ライブラリで定義されているデフォルトのリテラル型のいずれかであると推論します。リテラル値の型注釈を指定する場合、注釈の型はそのリテラル値からインスタンス化できる型でなければなりません。つまり、その型は以下の表に示すSwift標準ライブラリプロトコルに準拠している必要があります。

| リテラル | デフォルト型 | プロトコル |
| --- | --- | --- |
| 整数 | Int | ExpressibleByIntegerLiteral |
| 浮動小数点 | Double | ExpressibleByFloatLiteral |
| 文字列 | String | ExpressibleByStringLiteral, ExpressibleByUnicodeScalarLiteral（単一のUnicodeスカラーのみを含む文字列リテラルの場合）, ExpressibleByExtendedGraphemeClusterLiteral（単一の拡張書記素クラスタのみを含む文字列リテラルの場合） |
| 正規表現 | Regex | なし |
| ブール | Bool | ExpressibleByBooleanLiteral |

たとえば、宣言`let str = "Hello, world"`では、文字列リテラル`"Hello, world"`のデフォルトの推論型は`String`です。また、`Int8`は`ExpressibleByIntegerLiteral`プロトコルに準拠しているため、宣言`let x: Int8 = 42`で整数リテラル`42`の型注釈として使用できます。

### リテラルの文法
```
literal → numeric-literal | string-literal | regular-expression-literal | boolean-literal | nil-literal
numeric-literal → -? integer-literal | -? floating-point-literal
boolean-literal → true | false
nil-literal → nil
```

## 整数リテラル

整数リテラルは、指定された精度の整数値を表します。デフォルトでは、整数リテラルは10進数で表されますが、プレフィックスを使用して別の基数を指定できます。2進数リテラルは`0b`で始まり、8進数リテラルは`0o`で始まり、16進数リテラルは`0x`で始まります。

10進数リテラルには0から9の数字が含まれます。2進数リテラルには0と1が含まれ、8進数リテラルには0から7が含まれ、16進数リテラルには0から9およびAからF（大文字または小文字）が含まれます。

負の整数リテラルは、整数リテラルの前にマイナス記号（-）を付けることで表されます。例：`-42`

読みやすさのために、数字の間にアンダースコア（_）を入れることができますが、無視されるためリテラルの値には影響しません。整数リテラルは先頭にゼロ（0）を付けることができますが、これも無視され、基数やリテラルの値には影響しません。

特に指定がない限り、整数リテラルのデフォルトの推論型はSwift標準ライブラリの型`Int`です。Swift標準ライブラリには、さまざまなサイズの符号付きおよび符号なし整数の型も定義されています。詳細は[整数](integers)を参照してください。

### 整数リテラルの文法
```
integer-literal → binary-literal
integer-literal → octal-literal
integer-literal → decimal-literal
integer-literal → hexadecimal-literal
binary-literal → 0b binary-digit binary-literal-characters?
binary-digit → Digit 0 or 1
binary-literal-character → binary-digit | _
binary-literal-characters → binary-literal-character binary-literal-characters?
octal-literal → 0o octal-digit octal-literal-characters?
octal-digit → Digit 0 through 7
octal-literal-character → octal-digit | _
octal-literal-characters → octal-literal-character octal-literal-characters?
decimal-literal → decimal-digit decimal-literal-characters?
decimal-digit → Digit 0 through 9
decimal-digits → decimal-digit decimal-digits?
decimal-literal-character → decimal-digit | _
decimal-literal-characters → decimal-literal-character decimal-literal-characters?
hexadecimal-literal → 0x hexadecimal-digit hexadecimal-literal-characters?
hexadecimal-digit → Digit 0 through 9, a through f, or A through F
hexadecimal-literal-character → hexadecimal-digit | _
hexadecimal-literal-characters → hexadecimal-literal-character hexadecimal-literal-characters?
```

## 浮動小数点リテラル

浮動小数点リテラルは、指定された精度の浮動小数点値を表します。

デフォルトでは、浮動小数点リテラルは10進数（プレフィックスなし）で表されますが、16進数（`0x`プレフィックス付き）でも表すことができます。

10進浮動小数点リテラルは、10進数のシーケンスに続いて10進小数、10進指数、またはその両方が続きます。10進小数は、10進数のシーケンスに続く小数点（.）で構成されます。指数は、eまたはEのプレフィックスに続く10進数のシーケンスで構成され、eの前の値が10の何乗であるかを示します。たとえば、`1.25e2`は`1.25 x 10²`を表し、125.0になります。同様に、`1.25e-2`は`1.25 x 10⁻²`を表し、0.0125になります。

16進浮動小数点リテラルは、`0x`プレフィックスに続いてオプションの16進小数、16進指数が続きます。16進小数は、小数点に続く16進数のシーケンスで構成されます。指数は、pまたはPのプレフィックスに続く10進数のシーケンスで構成され、pの前の値が2の何乗であるかを示します。たとえば、`0xFp2`は`15 x 2²`を表し、60になります。同様に、`0xFp-2`は`15 x 2⁻²`を表し、3.75になります。

負の浮動小数点リテラルは、浮動小数点リテラルの前にマイナス記号（-）を付けることで表されます。例：`-42.5`

読みやすさのために、数字の間にアンダースコア（_）を入れることができますが、無視されるためリテラルの値には影響しません。浮動小数点リテラルは先頭にゼロ（0）を付けることができますが、これも無視され、基数やリテラルの値には影響しません。

特に指定がない限り、浮動小数点リテラルのデフォルトの推論型はSwift標準ライブラリの型`Double`であり、これは64ビットの浮動小数点数を表します。Swift標準ライブラリには、32ビットの浮動小数点数を表す`Float`型も定義されています。

### 浮動小数点リテラルの文法
```
floating-point-literal → decimal-literal decimal-fraction? decimal-exponent?
floating-point-literal → hexadecimal-literal hexadecimal-fraction? hexadecimal-exponent
decimal-fraction → . decimal-literal
decimal-exponent → floating-point-e sign? decimal-literal
hexadecimal-fraction → . hexadecimal-digit hexadecimal-literal-characters?
hexadecimal-exponent → floating-point-p sign? decimal-literal
floating-point-e → e | E
floating-point-p → p | P
sign → + | -
```

## 文字列リテラル

文字列リテラルは、引用符で囲まれた文字のシーケンスです。単一行の文字列リテラルは二重引用符で囲まれ、次の形式を持ちます：
```
"<#characters#>"
```
文字列リテラルには、エスケープされていない二重引用符（"）、エスケープされていないバックスラッシュ（\）、キャリッジリターン、またはラインフィードを含めることはできません。

複数行の文字列リテラルは、三重の二重引用符で囲まれ、次の形式を持ちます：
```
"""
<#characters#>
"""
```
単一行の文字列リテラルとは異なり、複数行の文字列リテラルにはエスケープされていない二重引用符（"）、キャリッジリターン、およびラインフィードを含めることができます。ただし、連続する三つのエスケープされていない二重引用符を含めることはできません。

複数行の文字列リテラルを開始する`"""`の後の改行は文字列の一部ではありません。リテラルを終了する`"""`の前の改行も文字列の一部ではありません。複数行の文字列リテラルを改行で開始または終了するには、最初または最後の行として空行を記述します。

複数行の文字列リテラルは、スペースとタブの任意の組み合わせを使用してインデントできます。このインデントは文字列には含まれません。リテラルを終了する`"""`がインデントを決定します：リテラル内のすべての非空行は、終了する`"""`の前に現れるインデントとまったく同じインデントで始まる必要があります。タブとスペースの間に変換はありません。そのインデントの後に追加のスペースとタブを含めることができます。これらのスペースとタブは文字列に表示されます。

複数行の文字列リテラルの改行は、ラインフィード文字を使用するように正規化されます。ソースファイルにキャリッジリターンとラインフィードの混在があっても、文字列内のすべての改行は同じになります。

複数行の文字列リテラルでは、行の末尾にバックスラッシュ（\）を書くと、その行の改行が文字列から省略されます。バックスラッシュと改行の間の空白も省略されます。この構文を使用して、ソースコード内の複数行の文字列リテラルをハードラップできますが、結果の文字列の値は変更されません。

単一行および複数行の形式の文字列リテラルには、次のエスケープシーケンスを使用して特殊文字を含めることができます：
- Null character (\0)
- Backslash (\\)
- Horizontal tab (\t)
- Line feed (\n)
- Carriage return (\r)
- Double quotation mark (\")
- Single quotation mark (\')
- Unicode scalar (\u{n}), where n is a hexadecimal number that has one to eight digits

式の値を文字列リテラルに挿入するには、バックスラッシュ（\）の後に式を括弧で囲んで配置します。挿入された式には文字列リテラルを含めることができますが、エスケープされていないバックスラッシュ、キャリッジリターン、またはラインフィードを含めることはできません。

たとえば、次のすべての文字列リテラルは同じ値を持ちます：
```swift
"1 2 3"
"1 2 \("3")"
"1 2 \(3)"
"1 2 \(1 + 2)"
let x = 3; "1 2 \(x)"
```

拡張デリミタで区切られた文字列は、引用符と1つ以上の番号記号（#）のバランスの取れたセットで囲まれた文字のシーケンスです。拡張デリミタで区切られた文字列は次の形式を持ちます：
```
#"<#characters#>"#
#"""
<#characters#>
"""#
```
拡張デリミタで区切られた文字列の特殊文字は、特殊文字としてではなく通常の文字として結果の文字列に表示されます。拡張デリミタを使用して、文字列補間を生成したり、エスケープシーケンスを開始したり、文字列を終了したりするなど、通常は特別な効果を持つ文字を含む文字列を作成できます。

次の例は、同等の文字列値を生成する文字列リテラルと拡張デリミタで区切られた文字列を示しています：
```swift
let string = #"\(x) \ " \u{2603}"#
let escaped = "\\(x) \\ \" \\u{2603}"
print(string)
// Prints "\(x) \ " \u{2603}"
print(string == escaped)
// Prints "true"
```

拡張デリミタを使用して区切られた文字列を作成する場合、番号記号の間に空白を入れないでください：
```swift
print(###"Line 1\###nLine 2"###) // OK
print(# # #"Line 1\# # #nLine 2"# # #) // Error
```

拡張デリミタを使用して作成した複数行の文字列リテラルには、通常の複数行の文字列リテラルと同じインデント要件があります。

文字列リテラルのデフォルトの推論型は`String`です。`String`型の詳細については、[Strings and Characters](strings-and-characters)および[String](string)を参照してください。

`+`演算子で連結された文字列リテラルは、コンパイル時に連結されます。たとえば、以下の例では、`textA`と`textB`の値は同一であり、実行時の連結は行われません。
```swift
let textA = "Hello " + "world"
let textB = "Hello world"
```

### 文字列リテラルの文法
```
string-literal → static-string-literal | interpolated-string-literal
string-literal-opening-delimiter → extended-string-literal-delimiter? "
string-literal-closing-delimiter → " extended-string-literal-delimiter?
static-string-literal → string-literal-opening-delimiter quoted-text? string-literal-closing-delimiter
static-string-literal → multiline-string-literal-opening-delimiter multiline-quoted-text? multiline-string-literal-closing-delimiter
multiline-string-literal-opening-delimiter → extended-string-literal-delimiter? """
multiline-string-literal-closing-delimiter → """ extended-string-literal-delimiter?
extended-string-literal-delimiter → # extended-string-literal-delimiter?
quoted-text → quoted-text-item quoted-text?
quoted-text-item → escaped-character
quoted-text-item → Any Unicode scalar value except ", \, U+000A, or U+000D
multiline-quoted-text → multiline-quoted-text-item multiline-quoted-text?
multiline-quoted-text-item → escaped-character
multiline-quoted-text-item → Any Unicode scalar value except \
multiline-quoted-text-item → escaped-newline
interpolated-string-literal → string-literal-opening-delimiter interpolated-text? string-literal-closing-delimiter
interpolated-string-literal → multiline-string-literal-opening-delimiter multiline-interpolated-text? multiline-string-literal-closing-delimiter
interpolated-text → interpolated-text-item interpolated-text?
interpolated-text-item → \( expression ) | quoted-text-item
multiline-interpolated-text → multiline-interpolated-text-item multiline-interpolated-text?
multiline-interpolated-text-item → \( expression ) | multiline-quoted-text-item
escape-sequence → \ extended-string-literal-delimiter
escaped-character → escape-sequence 0 | escape-sequence \ | escape-sequence t | escape-sequence n | escape-sequence r | escape-sequence " | escape-sequence '
escaped-character → escape-sequence u { unicode-scalar-digits }
unicode-scalar-digits → Between one and eight hexadecimal digits
escaped-newline → escape-sequence inline-spaces? line-break
```

## 正規表現リテラル

正規表現リテラルは、スラッシュ（/）で囲まれた文字のシーケンスで、次の形式を持ちます：
```
/<#regular expression#>/
```
正規表現リテラルは、エスケープされていないタブまたはスペースで始まることはできず、エスケープされていないスラッシュ（/）、キャリッジリターン、またはラインフィードを含めることはできません。

正規表現リテラル内では、バックスラッシュは文字列リテラルのようなエスケープ文字としてではなく、その正規表現の一部として理解されます。これは、次の特殊文字が文字通りに解釈されるべきであること、または次の非特殊文字が特別な方法で解釈されるべきであることを示します。たとえば、`/\(/`は単一の左括弧に一致し、`/\d/`は単一の数字に一致します。

拡張デリミタで区切られた正規表現リテラルは、スラッシュ（/）と1つ以上の番号記号（#）のバランスの取れたセットで囲まれた文字のシーケンスです。拡張デリミタで区切られた正規表現リテラルは次の形式を持ちます：
```
#/<#regular expression#>/#
#/
<#regular expression#>
/#
```
拡張デリミタを使用して区切られた正規表現リテラルは、エスケープされていないスペースやタブで始まり、エスケープされていないスラッシュ（/）を含み、複数行にまたがることができます。複数行の正規表現リテラルでは、開くデリミタは行の末尾にあり、閉じるデリミタは独自の行にある必要があります。複数行の正規表現リテラル内では、拡張正規表現構文がデフォルトで有効になっており、特に空白は無視され、コメントが許可されます。

拡張デリミタを使用して正規表現リテラルを作成する場合、番号記号の間に空白を入れないでください：
```swift
let regex1 = ##/abc/##       // OK
let regex2 = # #/abc/# #     // Error
```
空の正規表現リテラルを作成する必要がある場合は、拡張デリミタ構文を使用する必要があります。

### 正規表現リテラルの文法
```
regular-expression-literal → regular-expression-literal-opening-delimiter regular-expression regular-expression-literal-closing-delimiter
regular-expression → Any regular expression
regular-expression-literal-opening-delimiter → extended-regular-expression-literal-delimiter? /
regular-expression-literal-closing-delimiter → / extended-regular-expression-literal-delimiter?
extended-regular-expression-literal-delimiter → # extended-regular-expression-literal-delimiter?
```

## 演算子

Swift標準ライブラリは、多くの演算子を定義しており、その多くは[基本演算子](basic-operators)および[高度な演算子](advanced-operators)で説明されています。本節では、カスタム演算子を定義するために使用できる文字について説明します。

カスタム演算子は、ASCII文字の`/`、`=`、`-`、`+`、`!`、`*`、`%`、`<`、`>`、`&`、`|`、`^`、`?`、`~`のいずれか、または以下の文法で定義されたUnicode文字（これには、数学記号、その他の記号、およびディンバットのUnicodeブロックの文字などが含まれます）で始まることができます。最初の文字の後には、結合Unicode文字も許可されます。

ドット（.）で始まるカスタム演算子も定義できます。これらの演算子には追加のドットを含めることができます。たとえば、`.+.`は単一の演算子として扱われます。演算子がドットで始まらない場合、他の場所にドットを含めることはできません。たとえば、`+.+`は`+`演算子と`.+`演算子として扱われます。

疑問符（?）を含むカスタム演算子を定義することもできますが、単一の疑問符文字のみで構成されることはできません。さらに、演算子には感嘆符（!）を含めることができますが、後置演算子は疑問符または感嘆符で始まることはできません。

> **Note**
> 
> トークン`=`、`->`、`//`、`/*`、`*/`、`.`、プレフィックス演算子`<`、`&`、および`?`、中置演算子`?`、および後置演算子`>`、`!`、および`?`は予約されています。これらのトークンはオーバーロードできず、カスタム演算子として使用することもできません。

演算子の周囲の空白は、演算子が前置演算子、後置演算子、または中置演算子として使用されるかどうかを判断するために使用されます。この動作には次のルールがあります：
- 演算子の両側またはどちらの側にも空白がある場合、それは中置演算子として扱われます。たとえば、`a+++b`および`a +++ b`の`+++`演算子は中置演算子として扱われます。
- 演算子の左側にのみ空白がある場合、それは前置単項演算子として扱われます。たとえば、`a +++b`の`+++`演算子は前置単項演算子として扱われます。
- 演算子の右側にのみ空白がある場合、それは後置単項演算子として扱われます。たとえば、`a+++ b`の`+++`演算子は後置単項演算子として扱われます。
- 演算子の左側に空白がなく、直後にドット（.）が続く場合、それは後置単項演算子として扱われます。たとえば、`a+++.b`の`+++`演算子は後置単項演算子として扱われます（`a+++ .b`ではなく`a +++ .b`）。

これらのルールの目的のために、演算子の前の文字`(`、`[`、および`{`、演算子の後の文字`)`、`]`、および`}`、および文字`,`、`;`、および`:`も空白と見なされます。

感嘆符（!）または疑問符（?）の定義済み演算子が左側に空白がない場合、それは後置演算子として扱われます。右側に空白があるかどうかに関係なく、後置演算子として扱われます。オプショナルチェーン演算子として疑問符を使用するには、左側に空白がない必要があります。三項条件演算子（`? :`）として使用するには、両側に空白がある必要があります。

中置演算子の引数の1つが正規表現リテラルである場合、演算子の両側に空白が必要です。

特定の構文では、先頭に`<`または`>`が付いた演算子は2つ以上のトークンに分割される場合があります。残りの部分は同じ方法で処理され、再び分割される場合があります。その結果、`Dictionary<String, Array<Int>>`のような構文で閉じる`>`文字を区別するために空白を追加する必要はありません。この例では、閉じる`>`文字はビットシフト`>>`演算子として誤解される可能性のある単一のトークンとして扱われません。

新しいカスタム演算子の定義方法については、[カスタム演算子と演算子宣言](custom-operators-and-operator-declaration)を参照してください。既存の演算子のオーバーロード方法については、[演算子メソッド](operator-methods)を参照してください。

### 演算子の文法
```
operator → operator-head operator-characters?
operator → dot-operator-head dot-operator-characters
operator-head → / | = | - | + | ! | * | % | < | > | & | | | ^ | ~ | ?
operator-head → U+00A1–U+00A7
operator-head → U+00A9 or U+00AB
operator-head → U+00AC or U+00AE
operator-head → U+00B0–U+00B1
operator-head → U+00B6, U+00BB, U+00BF, U+00D7, or U+00F7
operator-head → U+2016–U+2017
operator-head → U+2020–U+2027
operator-head → U+2030–U+203E
operator-head → U+2041–U+2053
operator-head → U+2055–U+205E
operator-head → U+2190–U+23FF
operator-head → U+2500–U+2775
operator-head → U+2794–U+2BFF
operator-head → U+2E00–U+2E7F
operator-head → U+3001–U+3003
operator-head → U+3008–U+3020
operator-head → U+3030
operator-character → operator-head
operator-character → U+0300–U+036F
operator-character → U+1DC0–U+1DFF
operator-character → U+20D0–U+20FF
operator-character → U+FE00–U+FE0F
operator-character → U+FE20–U+FE2F
operator-character → U+E0100–U+E01EF
operator-characters → operator-character operator-characters?
dot-operator-head → .
dot-operator-character → . | operator-character
dot-operator-characters → dot-operator-character dot-operator-characters?
infix-operator → operator
prefix-operator → operator
postfix-operator → operator
```