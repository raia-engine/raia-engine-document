# ネストされた型

別の型のスコープ内に型を定義します。

列挙型は特定のクラスや構造体の機能をサポートするために作成されることがよくあります。同様に、より複雑な型の文脈内でのみ使用するユーティリティ構造体や、通常は特定の型と組み合わせて使用されるプロトコルを定義することも便利です。これを実現するために、Swiftではネストされた型を定義することができます。これにより、サポートする型の定義内に列挙型、構造体、プロトコルなどのサポート型をネストすることができます。

ある型の中に別の型をネストするには、サポートする型の外側の中括弧内にその定義を書きます。型は必要なだけ多くのレベルにネストすることができます。

## 実際のネストされた型

以下の例では、ブラックジャックで使用されるトランプのカードをモデル化した`BlackjackCard`という構造体を定義しています。`BlackjackCard`構造体には、`Suit`と`Rank`という2つのネストされた列挙型が含まれています。

ブラックジャックでは、エースカードは1または11の値を持ちます。この機能は、`Rank`列挙型内にネストされた`Values`という構造体によって表現されています。

```swift
struct BlackjackCard {

    // ネストされたSuit列挙型
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    // ネストされたRank列挙型
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    // BlackjackCardのプロパティとメソッド
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

`Suit`列挙型は、4つの一般的なトランプのスートを記述し、それぞれのシンボルを表す生の`Character`値を持ちます。

`Rank`列挙型は、13の可能なトランプのランクを記述し、それぞれのフェイス値を表す生の`Int`値を持ちます。（この生の`Int`値はジャック、クイーン、キング、エースカードには使用されません。）

前述のように、`Rank`列挙型はさらに`Values`というネストされた構造体を定義しています。この構造体は、ほとんどのカードが1つの値を持つが、エースカードは2つの値を持つという事実をカプセル化しています。`Values`構造体は、このことを表すために2つのプロパティを定義しています。
- `first`: `Int`型
- `second`: `Int?`型、または「オプショナルなInt」

`Rank`はまた、`values`という計算プロパティを定義しており、これは`Values`構造体のインスタンスを返します。この計算プロパティはカードのランクを考慮し、そのランクに基づいて適切な値を持つ新しい`Values`インスタンスを初期化します。ジャック、クイーン、キング、エースには特別な値を使用します。数値カードにはランクの生の`Int`値を使用します。

`BlackjackCard`構造体自体には、`rank`と`suit`という2つのプロパティがあります。また、`rank`と`suit`に格納された値を使用してカードの名前と値の説明を構築する`description`という計算プロパティも定義しています。`description`プロパティはオプショナルバインディングを使用して、表示する2番目の値があるかどうかを確認し、ある場合はその2番目の値に関する追加の説明を挿入します。

`BlackjackCard`はカスタムイニシャライザを持たない構造体であるため、構造体型のメンバーワイズイニシャライザで説明されているように、暗黙のメンバーワイズイニシャライザを持ちます。このイニシャライザを使用して、`theAceOfSpades`という新しい定数を初期化できます。

```swift
let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \(theAceOfSpades.description)")
// "theAceOfSpades: suit is ♠, value is 1 or 11"と出力されます
```

`Rank`と`Suit`は`BlackjackCard`内にネストされていますが、その型は文脈から推測できるため、このインスタンスの初期化では列挙型のケース名（`.ace`と`.spades`）だけで参照することができます。上記の例では、`description`プロパティはスペードのエースが1または11の値を持つことを正しく報告しています。

## ネストされた型の参照

定義コンテキストの外でネストされた型を使用するには、その名前の前にネストされている型の名前を付けます。

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbolは"♡"です
```

上記の例では、`Suit`、`Rank`、および`Values`の名前を意図的に短く保つことができます。なぜなら、それらの名前は定義されているコンテキストによって自然に修飾されるからです。