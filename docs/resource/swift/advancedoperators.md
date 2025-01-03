# 高度な演算子

カスタム演算子を定義し、ビット演算を実行し、ビルダー構文を使用します。

[基本的な演算子](basicoperators.md)で説明した演算子に加えて、Swiftはより複雑な値操作を実行するいくつかの高度な演算子を提供します。これには、CやObjective-Cでお馴染みのすべてのビット演算子とビットシフト演算子が含まれます。

Cの算術演算子とは異なり、Swiftの算術演算子はデフォルトではオーバーフローしません。オーバーフロー動作は捕捉され、エラーとして報告されます。オーバーフロー動作を選択するには、デフォルトでオーバーフローする2番目の算術演算子セットを使用します。例えば、オーバーフロー加算演算子（`&+`）などです。これらのオーバーフロー演算子はすべてアンパサンド（`&`）で始まります。

独自の構造体、クラス、列挙型を定義する際、これらのカスタム型に対して標準のSwift演算子の独自の実装を提供すると便利な場合があります。Swiftでは、これらの演算子に合わせた実装を簡単に提供でき、各型に対する動作を正確に決定することができます。

定義済みの演算子に限定されることはありません。Swiftでは、独自のカスタム中置、前置、後置、および代入演算子を、カスタムの優先順位と結合性の値とともに定義する自由があります。これらの演算子は、定義済みの演算子と同様にコードで使用および採用でき、既存の型を拡張して定義したカスタム演算子をサポートすることもできます。

## ビット演算子

ビット演算子を使用すると、データ構造内の個々の生データビットを操作できます。これらは、グラフィックスプログラミングやデバイスドライバの作成など、低レベルのプログラミングでよく使用されます。ビット演算子は、カスタムプロトコルを介して通信するためのデータのエンコードおよびデコードなど、外部ソースからの生データを操作する場合にも役立ちます。

Swiftは、以下で説明するCに存在するすべてのビット演算子をサポートしています。

### ビット単位のNOT演算子

ビット単位のNOT演算子（`~`）は、数値内のすべてのビットを反転させます。

ビット単位のNOT演算子は前置演算子であり、操作対象の値の直前に空白なしで表示されます。

```swift
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // equals 11110000
```

UInt8整数は8ビットを持ち、0から255までの任意の値を格納できます。この例では、最初の4ビットが0に設定され、次の4ビットが1に設定されたバイナリ値`00001111`でUInt8整数を初期化します。これは10進数の値15に相当します。

次に、ビット単位のNOT演算子を使用して、`initialBits`と等しいがすべてのビットが反転した新しい定数`invertedBits`を作成します。0は1になり、1は0になります。`invertedBits`の値は`11110000`で、これは符号なし10進数の値240に相当します。

### ビット単位のAND演算子

ビット単位のAND演算子（`&`）は、2つの数値のビットを組み合わせます。入力された両方の数値でビットが1である場合にのみビットが1に設定された新しい数値を返します。

以下の例では、`firstSixBits`と`lastSixBits`の値はどちらも4つの中間ビットが1に等しいです。ビット単位のAND演算子はそれらを組み合わせて、符号なし10進数の値60に等しい数値`00111100`を作成します。

```swift
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
```

### ビット単位のOR演算子

ビット単位のOR演算子（`|`）は、2つの数値のビットを比較します。演算子は、入力されたいずれかの数値でビットが1である場合にビットが1に設定された新しい数値を返します。

以下の例では、`someBits`と`moreBits`の値は1に設定された異なるビットを持っています。ビット単位のOR演算子はそれらを組み合わせて、符号なし10進数254に等しい数値`11111110`を作成します。

```swift
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // equals 11111110
```

### ビット単位のXOR演算子

ビット単位のXOR演算子、または「排他的OR演算子」（`^`）は、2つの数値のビットを比較します。演算子は、入力ビットが異なる場所でビットが1に設定され、入力ビットが同じ場所でビットが0に設定された新しい数値を返します。

以下の例では、`firstBits`と`otherBits`の値はそれぞれ、他方にはない場所に1に設定されたビットを持っています。ビット単位のXOR演算子は、これらのビットの両方を出力値で1に設定します。`firstBits`と`otherBits`の他のすべてのビットは一致し、出力値で0に設定されます。

```swift
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // equals 00010001
```

### ビット単位の左シフトおよび右シフト演算子

ビット単位の左シフト演算子（`<<`）およびビット単位の右シフト演算子（`>>`）は、以下で定義されたルールに従って、数値内のすべてのビットを左または右に特定の数だけ移動します。

ビット単位の左シフトおよび右シフトは、整数を2の倍数で乗算または除算する効果があります。整数のビットを1つ左にシフトすると、その値が2倍になり、1つ右にシフトすると、その値が半分になります。

#### 符号なし整数のシフト動作

符号なし整数のビットシフト動作は次のとおりです。

- 既存のビットは、要求された数だけ左または右に移動されます。
- 整数のストレージの範囲を超えたビットは破棄されます。
- 元のビットが左または右に移動された後に残されたスペースにはゼロが挿入されます。

このアプローチは論理シフトとして知られています。

以下の図は、`11111111 << 1`（これは1ビット左にシフトされた`11111111`）および`11111111 >> 1`（これは1ビット右にシフトされた`11111111`）の結果を示しています。緑の数字はシフトされ、灰色の数字は破棄され、ピンクのゼロが挿入されます。

Swiftコードでのビットシフトの例を以下に示します。

```swift
let shiftBits: UInt8 = 4   // 00000100 in binary
shiftBits << 1             // 00001000
shiftBits << 2             // 00010000
shiftBits << 5             // 10000000
shiftBits << 6             // 00000000
shiftBits >> 2             // 00000001
```

ビットシフトを使用して、他のデータ型内の値をエンコードおよびデコードできます。

```swift
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
```

この例では、`UInt32`定数`pink`を使用して、カスケーディングスタイルシートの色値をピンク色に格納します。CSSの色値`#CC6699`は、Swiftの16進数表記では`0xCC6699`と書かれます。この色は、ビット単位のAND演算子（`&`）およびビット単位の右シフト演算子（`>>`）によって、赤（`CC`）、緑（`66`）、および青（`99`）の成分に分解されます。

赤の成分は、`0xCC6699`と`0xFF0000`の間でビット単位のANDを実行することによって得られます。`0xFF0000`のゼロは、`0xCC6699`の2番目と3番目のバイトを効果的に「マスク」し、`6699`を無視して結果として`0xCC0000`を残します。

この数値は、16ビット右にシフトされます（`>> 16`）。16進数の数値の各ペアは8ビットを使用するため、16ビット右に移動すると`0xCC0000`が`0x0000CC`に変換されます。これは`0xCC`と同じで、10進数の値204に相当します。

同様に、緑の成分は、`0xCC6699`と`0x00FF00`の間でビット単位のANDを実行することによって得られ、出力値は`0x006600`になります。この出力値は8ビット右にシフトされ、`0x66`の値になります。これは10進数の値102に相当します。

最後に、青の成分は、`0xCC6699`と`0x0000FF`の間でビット単位のANDを実行することによって得られ、出力値は`0x000099`になります。`0x000099`はすでに`0x99`に等しく、10進数の値153に相当するため、この値は右にシフトせずに使用されます。

#### 符号付き整数のシフト動作

符号付き整数のシフト動作は、符号なし整数のシフト動作よりも複雑です。これは、符号付き整数がバイナリで表現される方法のためです。（以下の例は簡単にするために8ビットの符号付き整数に基づいていますが、同じ原則は任意のサイズの符号付き整数に適用されます。）

符号付き整数は、その最初のビット（符号ビットとして知られています）を使用して、整数が正または負であるかを示します。符号ビットが0の場合は正を意味し、符号ビットが1の場合は負を意味します。

残りのビット（値ビットとして知られています）は、実際の値を格納します。正の数値は、0から上に向かってカウントする符号なし整数とまったく同じ方法で格納されます。以下は、数値4の`Int8`内のビットの様子です。

符号ビットは0（「正」を意味します）であり、7つの値ビットはバイナリ表記で数値4です。

ただし、負の数値は異なる方法で格納されます。これらは、絶対値から2のn乗を引くことによって格納されます。ここで、nは値ビットの数です。8ビットの数値には7つの値ビットがあるため、これは2の7乗、つまり128を意味します。

以下は、数値-4の`Int8`内のビットの様子です。

この場合、符号ビットは1（「負」を意味します）であり、7つの値ビットはバイナリ値124（128 - 4）です。

負の数値のこのエンコードは、2の補数表現として知られています。これは負の数値を表現するための異常な方法のように思えるかもしれませんが、いくつかの利点があります。

まず、-1を-4に追加することができます。これは、8ビットすべて（符号ビットを含む）の標準的なバイナリ加算を実行し、完了したら8ビットに収まらないものを破棄するだけです。

第二に、2の補数表現は、負の数値のビットを左および右にシフトしても、左にシフトするたびにそれらを2倍にし、右にシフトするたびにそれらを半分にすることができます。これを実現するために、符号付き整数が右にシフトされるときに追加のルールが適用されます。符号付き整数を右にシフトするときは、符号なし整数と同じルールを適用しますが、ゼロではなく符号ビットで左側の空のビットを埋めます。

このアクションは、符号付き整数が右にシフトされた後も同じ符号を持つことを保証し、算術シフトとして知られています。

正および負の数値が格納される特別な方法のため、どちらかを右にシフトすると、それらはゼロに近づきます。このシフト中に符号ビットを同じに保つことで、負の整数はその値がゼロに近づくにつれて負のままになります。

## オーバーフロー演算子

整数定数または変数にその値を保持できない数値を挿入しようとすると、デフォルトでSwiftは無効な値が作成されるのを許可するのではなく、エラーを報告します。この動作により、値が大きすぎたり小さすぎたりする場合に、数値を操作する際の安全性が向上します。

たとえば、`Int16`整数型は-32768から32767までの任意の符号付き整数を保持できます。`Int16`定数または変数をこの範囲外の数値に設定しようとすると、エラーが発生します。

```swift
var potentialOverflow = Int16.max
// potentialOverflow equals 32767, which is the maximum value an Int16 can hold
potentialOverflow += 1
// this causes an error
```

値が大きすぎたり小さすぎたりする場合にエラーハンドリングを提供することで、境界値条件のコーディング時に柔軟性が大幅に向上します。

ただし、オーバーフロー条件が発生して利用可能なビット数が切り捨てられることを特に望む場合は、エラーをトリガーするのではなく、この動作を選択できます。Swiftは、整数計算のオーバーフロー動作を選択する3つの算術オーバーフロー演算子を提供します。これらの演算子はすべてアンパサンド（`&`）で始まります。

- オーバーフロー加算（`&+`）
- オーバーフロー減算（`&-`）
- オーバーフロー乗算（`&*`）

### 値のオーバーフロー

数値は正方向および負方向の両方でオーバーフローする可能性があります。

以下は、符号なし整数が正方向にオーバーフローする場合の例です。オーバーフロー加算演算子（`&+`）を使用します。

```swift
var unsignedOverflow = UInt8.max
// unsignedOverflow equals 255, which is the maximum value a UInt8 can hold
unsignedOverflow = unsignedOverflow &+ 1
// unsignedOverflow is now equal to 0
```

変数`unsignedOverflow`は、`UInt8`が保持できる最大値（255、またはバイナリで`11111111`）で初期化されます。次に、オーバーフロー加算演算子（`&+`）を使用して1増加させます。これにより、そのバイナリ表現が`UInt8`が保持できるサイズを超え、以下の図に示すようにその範囲を超えてオーバーフローします。オーバーフロー加算後に`UInt8`の範囲内に残る値は`00000000`、つまりゼロです。

符号なし整数が負方向にオーバーフローする場合も同様のことが起こります。以下は、オーバーフロー減算演算子（`&-`）を使用した例です。

```swift
var unsignedOverflow = UInt8.min
// unsignedOverflow equals 0, which is the minimum value a UInt8 can hold
unsignedOverflow = unsignedOverflow &- 1
// unsignedOverflow is now equal to 255
```

`UInt8`が保持できる最小値はゼロ、つまりバイナリで`00000000`です。オーバーフロー減算演算子（`&-`）を使用して`00000000`から1を引くと、その数値はオーバーフローして`11111111`、つまり10進数で255にラップアラウンドします。

符号付き整数でもオーバーフローが発生します。符号付き整数のすべての加算および減算は、符号ビットを含む数値のビット単位で実行されます。これは[ビット単位の左シフトおよび右シフト演算子](#bitwise-left-and-right-shift-operators)で説明されています。

```swift
var signedOverflow = Int8.min
// signedOverflow equals -128, which is the minimum value an Int8 can hold
signedOverflow = signedOverflow &- 1
// signedOverflow is now equal to 127
```

`Int8`が保持できる最小値は-128、つまりバイナリで`10000000`です。このバイナリ数値からオーバーフロー演算子を使用して1を引くと、バイナリ値`01111111`が得られ、符号ビットが切り替わり、`Int8`が保持できる最大正の値である正の127が得られます。

符号付きおよび符号なし整数の両方で、正方向のオーバーフローは最大有効整数値から最小値にラップアラウンドし、負方向のオーバーフローは最小値から最大値にラップアラウンドします。

## 優先順位と結合性

演算子の優先順位は、一部の演算子に他の演算子よりも高い優先順位を与えます。これらの演算子は最初に適用されます。

演算子の結合性は、同じ優先順位の演算子がどのようにグループ化されるかを定義します。左からグループ化されるか、右からグループ化されます。これは、「左側の式と結合する」または「右側の式と結合する」という意味だと考えてください。

複合式が計算される順序を考える際には、各演算子の優先順位と結合性を考慮することが重要です。たとえば、次の式が17になる理由は、演算子の優先順位によって説明されます。

```swift
2 + 3 % 4 * 5
// this equals 17
```

左から右に厳密に読むと、次のように計算されると予想されるかもしれません。

- 2に3を足すと5になる
- 5の余り4は1になる
- 1に5を掛けると5になる

しかし、実際の答えは5ではなく17です。優先順位の高い演算子は、優先順位の低い演算子よりも先に評価されます。Swiftでは、Cと同様に、余り演算子（`%`）と乗算演算子（`*`）は加算演算子（`+`）よりも高い優先順位を持っています。その結果、加算が考慮される前に両方が評価されます。

ただし、余りと乗算は互いに同じ優先順位を持っています。使用する正確な評価順序を決定するには、結合性も考慮する必要があります。余りと乗算はどちらも左側の式と結合します。これを、左側から始まるこれらの式の部分の周りに暗黙の括弧を追加することだと考えてください。

```swift
2 + ((3 % 4) * 5)
```

`(3 % 4)`は3なので、これは次のようになります。

```swift
2 + (3 * 5)
```

`(3 * 5)`は15なので、これは次のようになります。

```swift
2 + 15
```

この計算により、最終的な答えは17になります。

Swift標準ライブラリによって提供される演算子に関する情報、演算子の優先順位グループと結合性設定の完全なリストを含む情報については、[演算子宣言](https://developer.apple.com/documentation/swift/operator-declarations)を参照してください。

> **注**: Swiftの演算子の優先順位と結合性のルールは、CやObjective-Cのものよりもシンプルで予測可能です。ただし、これはCベースの言語とはまったく同じではないことを意味します。既存のコードをSwiftに移植する際には、演算子の相互作用が意図したとおりに動作することを確認してください。

## 演算子メソッド

クラスおよび構造体は、既存の演算子の独自の実装を提供できます。これは既存の演算子のオーバーロードとして知られています。

以下の例は、カスタム構造体に対して算術加算演算子（`+`）を実装する方法を示しています。算術加算演算子は2つのターゲットに対して動作するため、二項演算子であり、これらの2つのターゲットの間に表示されるため、中置演算子です。

この例では、2次元位置ベクトル（x、y）のための`Vector2D`構造体を定義し、次に`Vector2D`構造体のインスタンスを加算するための演算子メソッドの定義を行います。

```swift
struct Vector2D {
    var x = 0.0, y = 0.0
}

extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
       return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}
```

演算子メソッドは`Vector2D`の型メソッドとして定義され、オーバーロードする演算子に一致するメソッド名（`+`）を持ちます。加算はベクトルの本質的な動作の一部ではないため、型メソッドは`Vector2D`のメイン構造体宣言ではなく、`Vector2D`の拡張で定義されています。算術加算演算子は二項演算子であるため、この演算子メソッドは2つの`Vector2D`型の入力パラメータを取り、1つの出力値も`Vector2D`型で返します。

この実装では、入力パラメータは`left`と`right`と名付けられ、`+`演算子の左側と右側にある`Vector2D`インスタンスを表します。メソッドは、新しい`Vector2D`インスタンスを返し、その`x`および`y`プロパティは、加算された2つの`Vector2D`インスタンスの`x`および`y`プロパティの合計で初期化されます。

型メソッドは、既存の`Vector2D`インスタンス間の中置演算子として使用できます。

```swift
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector is a Vector2D instance with values of (5.0, 5.0)
```

この例では、ベクトル（3.0、1.0）と（2.0、4.0）を加算して、ベクトル（5.0、5.0）を作成します。

## 前置および後置演算子

上記の例は、二項中置演算子のカスタム実装を示しています。クラスおよび構造体は、標準の単項演算子の実装も提供できます。単項演算子は1つのターゲットに対して動作します。ターゲットの前にある場合は前置演算子（`-a`など）、ターゲットの後にある場合は後置演算子（`b!`など）です。

演算子メソッドを宣言する際に、`prefix`または`postfix`修飾子を`func`キーワードの前に書くことで、前置または後置の単項演算子を実装します。

```swift
extension Vector2D {
    static prefix func - (vector: Vector2D) -> Vector2D {
        return Vector2D(x: -vector.x, y: -vector.y)
    }
}
```

上記の例は、`Vector2D`インスタンスに対して単項マイナス演算子（`-a`）を実装しています。単項マイナス演算子は前置演算子であるため、このメソッドは`prefix`修飾子で修飾する必要があります。

単純な数値の場合、単項マイナス演算子は正の数値を負の数値に変換し、その逆も同様です。`Vector2D`インスタンスに対する対応する実装は、この操作を`x`および`y`プロパティの両方に対して実行します。

```swift
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative is a Vector2D instance with values of (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive is a Vector2D instance with values of (3.0, 4.0)
```

## 複合代入演算子

複合代入演算子は、代入（`=`）と他の操作を組み合わせます。たとえば、加算代入演算子（`+=`）は加算と代入を1つの操作に組み合わせます。複合代入演算子の左入力パラメータ型を`inout`としてマークします。これは、演算子メソッド内でパラメータの値が直接変更されるためです。

以下の例は、`Vector2D`インスタンスに対する加算代入演算子メソッドを実装しています。

```swift
extension Vector2D {
    static func += (left: inout Vector2D, right: Vector2D) {
        left = left + right
    }
}
```

以前に加算演算子が定義されているため、ここで加算プロセスを再実装する必要はありません。代わりに、加算代入演算子メソッドは既存の加算演算子メソッドを利用し、左の値を左の値プラス右の値に設定します。

```swift
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original now has values of (4.0, 6.0)
```

> **注**: デフォルトの代入演算子（`=`）をオーバーロードすることはできません。複合代入演算子のみがオーバーロード可能です。同様に、三項条件演算子（`a ? b : c`）もオーバーロードできません。

## 等価演算子

デフォルトでは、カスタムクラスおよび構造体には、等価演算子、つまり等しい演算子（`==`）および等しくない演算子（`!=`）の実装がありません。通常、`==`演算子を実装し、`==`演算子の結果を否定するSwift標準ライブラリのデフォルトの`!=`演算子の実装を使用します。`==`演算子を実装する方法は2つあります。自分で実装するか、多くの型に対してSwiftに実装を合成するように依頼することができます。いずれの場合も、Swift標準ライブラリの`Equatable`プロトコルに準拠する必要があります。

他の中置演算子を実装するのと同じ方法で`==`演算子の実装を提供します。

```swift
extension Vector2D: Equatable {
    static func == (left: Vector2D, right: Vector2D) -> Bool {
       return (left.x == right.x) && (left.y == right.y)
    }
}
```

上記の例は、2つの`Vector2D`インスタンスが同等の値を持っているかどうかを確認するための`==`演算子を実装しています。`Vector2D`の文脈では、「等しい」とは「両方のインスタンスが同じx値とy値を持っている」という意味であると考えるのが理にかなっているため、これは演算子実装によって使用されるロジックです。

この演算子を使用して、2つの`Vector2D`インスタンスが同等であるかどうかを確認できます。

```swift
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
// Prints "These two vectors are equivalent."
```

多くの単純なケースでは、Swiftに等価演算子の合成実装を提供するように依頼できます。詳細については、[合成実装を使用したプロトコルの採用](https://developer.apple.com/documentation/swift/adopting-a-protocol-using-a-synthesized-implementation)を参照してください。

## カスタム演算子

Swiftが提供する標準の演算子に加えて、独自のカスタム演算子を宣言および実装できます。カスタム演算子の定義に使用できる文字のリストについては、[演算子](https://developer.apple.com/documentation/swift/operators)を参照してください。

新しい演算子は、`operator`キーワードを使用してグローバルレベルで宣言され、`prefix`、`infix`、または`postfix`修飾子でマークされます。

```swift
prefix operator +++
```

上記の例は、`+++`という新しい前置演算子を定義しています。この演算子はSwiftに既存の意味を持たないため、以下の`Vector2D`インスタンスの操作において独自のカスタム意味が与えられます。この例の目的のために、`+++`は新しい「前置倍増」演算子として扱われます。これは、加算代入演算子を使用してベクトルを自分自身に加算することによって、`Vector2D`インスタンスの`x`および`y`値を倍増させます。`+++`演算子を実装するには、次のように`Vector2D`に`+++`という型メソッドを追加します。

```swift
extension Vector2D {
    static prefix func +++ (vector: inout Vector2D) -> Vector2D {
        vector += vector
        return vector
    }
}

var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled now has values of (2.0, 8.0)
// afterDoubling also has values of (2.0, 8.0)
```

## カスタム中置演算子の優先順位

カスタム中置演算子はそれぞれ優先順位グループに属します。優先順位グループは、他の中置演算子に対する演算子の優先順位と、演算子の結合性を指定します。これらの特性が中置演算子の他の中置演算子との相互作用にどのように影響するかについての説明は、[優先順位と結合性](#precedence-and-associativity)を参照してください。

優先順位グループに明示的に配置されていないカスタム中置演算子には、三項条件演算子の優先順位よりも直ちに高い優先順位を持つデフォルトの優先順位グループが与えられます。

次の例は、`+-`という新しいカスタム中置演算子を定義しており、`AdditionPrecedence`優先順位グループに属しています。

```swift
infix operator +-: AdditionPrecedence
extension Vector2D {
    static func +- (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y - right.y)
    }
}
```

```swift
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector is a Vector2D instance with values of (4.0, -2.0)
```

この演算子は、2つのベクトルの`x`値を加算し、2番目のベクトルの`y`値を最初のベクトルから減算します。本質的に「加算的」な演算子であるため、加算中置演算子（`+`および`-`）と同じ優先順位グループが与えられています。Swift標準ライブラリによって提供される演算子に関する情報、演算子の優先順位グループと結合性設定の完全なリストを含む情報については、[演算子宣言](https://developer.apple.com/documentation/swift/operator-declarations)を参照してください。優先順位グループに関する詳細および独自の演算子と優先順位グループを定義するための構文については、[演算子宣言](https://developer.apple.com/documentation/swift/operator-declaration)を参照してください。

> **注**: 前置または後置演算子を定義する際に優先順位を指定することはありません。ただし、同じオペランドに前置および後置演算子の両方を適用する場合、後置演算子が最初に適用されます。

## 結果ビルダー

結果ビルダーは、リストやツリーのようなネストされたデータを自然で宣言的な方法で作成するための構文を追加するために定義する型です。結果ビルダーを使用するコードは、条件付きまたは繰り返しのデータ部分を処理するために`if`や`for`などの通常のSwift構文を含むことができます。

以下のコードは、星やテキストを使用して1行に描画するためのいくつかの型を定義しています。

```swift
protocol Drawable {
    func draw() -> String
}
struct Line: Drawable {
    var elements: [Drawable]
    func draw() -> String {
        return elements.map { $0.draw() }.joined(separator: "")
    }
}
struct Text: Drawable {
    var content: String
    init(_ content: String) { self.content = content }
    func draw() -> String { return content }
}
struct Space: Drawable {
    func draw() -> String { return " " }
}
struct Stars: Drawable {
    var length: Int
    func draw() -> String { return String(repeating: "*", count: length) }
}
struct AllCaps: Drawable {
    var content: Drawable
    func draw() -> String { return content.draw().uppercased() }
}
```

`Drawable`プロトコルは、行や形状のように描画できるものの要件を定義します。型は`draw()`メソッドを実装する必要があります。`Line`構造体は1行の描画を表し、ほとんどの描画のトップレベルコンテナとして機能します。`Line`を描画するには、構造体は行の各コンポーネントに対して`draw()`を呼び出し、結果の文字列を1つの文字列に連結します。`Text`構造体は文字列をラップして描画の一部にします。`AllCaps`構造体は他の描画をラップして変更し、描画内のテキストを大文字に変換します。

これらの型のイニシャライザを呼び出すことで描画を作成することができます。

```swift
let name: String? = "Ravi Patel"
let manualDrawing = Line(elements: [
     Stars(length: 3),
     Text("Hello"),
     Space(),
     AllCaps(content: Text((name ?? "World") + "!")),
     Stars(length: 2),
])
print(manualDrawing.draw())
// Prints "***Hello RAVI PATEL!**"
```

このコードは機能しますが、少し不格好です。`AllCaps`の後の深くネストされた括弧は読みづらいです。`name`が`nil`の場合に「World」を使用するフォールバックロジックは、`??`演算子を使用してインラインで行う必要があり、より複雑なものでは難しいでしょう。描画の一部を構築するためにスイッチや`for`ループを含める必要がある場合、それを行う方法はありません。結果ビルダーを使用すると、このようなコードを通常のSwiftコードのように書き直すことができます。

結果ビルダーを定義するには、型宣言に`@resultBuilder`属性を書きます。たとえば、次のコードは、描画を記述するための宣言的な構文を使用できるようにする結果ビルダー`DrawingBuilder`を定義しています。

```swift
@resultBuilder
struct DrawingBuilder {
    static func buildBlock(_ components: Drawable...) -> Drawable {
        return Line(elements: components)
    }
    static func buildEither(first: Drawable) -> Drawable {
        return first
    }
    static func buildEither(second: Drawable) -> Drawable {
        return second
    }
}
```

`DrawingBuilder`構造体は、結果ビルダー構文の一部を実装する3つのメソッドを定義しています。`buildBlock(_:)`メソッドは、コードブロック内で一連の行を書くサポートを追加します。それはそのブロック内のコンポーネントを`Line`に結合します。`buildEither(first:)`および`buildEither(second:)`メソッドは、`if-else`のサポートを追加します。

`@DrawingBuilder`属性を関数のパラメータに適用することで、関数に渡されるクロージャをそのクロージャから作成された値に変換します。たとえば：

```swift
func draw(@DrawingBuilder content: () -> Drawable) -> Drawable {
    return content()
}
func caps(@DrawingBuilder content: () -> Drawable) -> Drawable {
    return AllCaps(content: content())
}

func makeGreeting(for name: String? = nil) -> Drawable {
    let greeting = draw {
        Stars(length: 3)
        Text("Hello")
        Space()
        caps {
            if let name = name {
                Text(name + "!")
            } else {
                Text("World!")
            }
        }
        Stars(length: 2)
    }
    return greeting
}
let genericGreeting = makeGreeting()
print(genericGreeting.draw())
// Prints "***Hello WORLD!**"

let personalGreeting = makeGreeting(for: "Ravi Patel")
print(personalGreeting.draw())
// Prints "***Hello RAVI PATEL!**"
```

`makeGreeting(for:)`関数は`name`パラメータを取り、パーソナライズされた挨拶を描画するために使用します。`draw(_:)`および`caps(_:)`関数はどちらも1つのクロージャを引数として取り、そのクロージャは`@DrawingBuilder`属性でマークされています。これらの関数を呼び出すとき、`DrawingBuilder`が定義する特別な構文を使用します。Swiftは、その宣言的な描画の説明を`DrawingBuilder`のメソッドへの一連の呼び出しに変換して、関数引数として渡される値を構築します。たとえば、上記の例で`caps(_:)`の呼び出しを次のようなコードに変換します。

```swift
let capsDrawing = caps {
    let partialDrawing: Drawable
    if let name = name {
        let text = Text(name + "!")
        partialDrawing = DrawingBuilder.buildEither(first: text)
    } else {
        let text = Text("World!")
        partialDrawing = DrawingBuilder.buildEither(second: text)
    }
    return partialDrawing
}
```

Swiftは`if-else`ブロックを`buildEither(first:)`および`buildEither(second:)`メソッドへの呼び出しに変換します。これらのメソッドを自分のコードで呼び出すことはありませんが、変換の結果を示すことで、`DrawingBuilder`構文を使用するときにSwiftがコードをどのように変換するかを理解しやすくなります。

特別な描画構文で`for`ループを書くサポートを追加するには、`buildArray(_:)`メソッドを追加します。

```swift
extension DrawingBuilder {
    static func buildArray(_ components: [Drawable]) -> Drawable {
        return Line(elements: components)
    }
}
```

```swift
let manyStars = draw {
    Text("Stars:")
    for length in 1...3 {
        Space()
        Stars(length: length)
    }
}
```

上記のコードでは、`for`ループが描画の配列を作成し、`buildArray(_:)`メソッドがその配列を`Line`に変換します。

ビルダー構文がビルダー型のメソッドへの呼び出しにどのように変換されるかの完全なリストについては、[resultBuilder](https://developer.apple.com/documentation/swift/resultbuilder)を参照してください。