# 型キャスト

値の実行時の型を判定し、より具体的な型情報を提供します。

型キャストは、インスタンスの型をチェックしたり、そのインスタンスをクラス階層内の別のスーパークラスやサブクラスとして扱ったりする方法です。

Swiftの型キャストは、`is`および`as`演算子で実装されています。これらの2つの演算子は、値の型をチェックしたり、値を別の型にキャストしたりするためのシンプルで表現力豊かな方法を提供します。

また、[プロトコル準拠の確認](#checking-for-protocol-conformance)で説明されているように、型キャストを使用して型がプロトコルに準拠しているかどうかを確認することもできます。

## 型キャストのためのクラス階層の定義

クラスとサブクラスの階層を使用して、特定のクラスインスタンスの型をチェックし、そのインスタンスを同じ階層内の別のクラスにキャストすることができます。以下の3つのコードスニペットは、型キャストの例で使用するためのクラス階層と、これらのクラスのインスタンスを含む配列を定義しています。

最初のスニペットは、`MediaItem`という新しい基本クラスを定義します。このクラスは、デジタルメディアライブラリに表示されるあらゆる種類のアイテムに基本的な機能を提供します。具体的には、`String`型の`name`プロパティと、`init(name:)`イニシャライザを宣言しています。（すべてのメディアアイテム、映画や曲を含む、には名前があると仮定します。）

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

次のスニペットは、`MediaItem`の2つのサブクラスを定義します。最初のサブクラスである`Movie`は、映画やフィルムに関する追加情報をカプセル化します。これは、基本クラス`MediaItem`の上に`director`プロパティを追加し、対応するイニシャライザを持ちます。2番目のサブクラスである`Song`は、基本クラスの上に`artist`プロパティとイニシャライザを追加します。

```swift
class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}

class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}
```

最後のスニペットは、`library`という定数配列を作成します。この配列には、2つの`Movie`インスタンスと3つの`Song`インスタンスが含まれています。`library`配列の型は、配列リテラルの内容で初期化することで推論されます。Swiftの型チェッカーは、`Movie`と`Song`が共通のスーパークラス`MediaItem`を持っていることを推論し、`library`配列の型を`[MediaItem]`と推論します。

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]
// "library"の型は[MediaItem]と推論されます
```

`library`に格納されているアイテムは、内部的には依然として`Movie`および`Song`インスタンスです。しかし、この配列の内容を反復処理すると、受け取るアイテムは`MediaItem`として型付けされ、`Movie`や`Song`としては型付けされません。これらをネイティブな型として扱うためには、型をチェックするか、別の型にダウンキャストする必要があります。以下で説明します。

## 型のチェック

型チェック演算子（`is`）を使用して、インスタンスが特定のサブクラス型であるかどうかを確認します。型チェック演算子は、インスタンスがそのサブクラス型である場合に`true`を返し、そうでない場合に`false`を返します。

以下の例では、`library`配列内の`Movie`および`Song`インスタンスの数をカウントする2つの変数、`movieCount`と`songCount`を定義します。

```swift
var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

print("メディアライブラリには\(movieCount)本の映画と\(songCount)曲の歌があります")
// "メディアライブラリには2本の映画と3曲の歌があります"と出力されます
```

この例では、`library`配列内のすべてのアイテムを反復処理します。各パスで、`for-in`ループは`item`定数を配列内の次の`MediaItem`に設定します。

`item is Movie`は、現在の`MediaItem`が`Movie`インスタンスである場合に`true`を返し、そうでない場合に`false`を返します。同様に、`item is Song`は、`item`が`Song`インスタンスであるかどうかをチェックします。`for-in`ループの最後に、`movieCount`と`songCount`の値には、それぞれの型の`MediaItem`インスタンスの数が含まれます。

## ダウンキャスト

あるクラス型の定数や変数が、実際にはその背後でサブクラスのインスタンスを参照している場合があります。このような場合には、型キャスト演算子（`as?` または `as!`）を使用してサブクラス型にダウンキャストを試みることができます。

ダウンキャストは失敗する可能性があるため、型キャスト演算子には2つの異なる形式があります。条件付き形式の `as?` は、ダウンキャストしようとしている型のオプショナル値を返します。強制形式の `as!` は、ダウンキャストを試みて結果を強制的にアンラップする単一の複合アクションです。

ダウンキャストが成功するかどうかわからない場合は、型キャスト演算子の条件付き形式（`as?`）を使用します。この形式の演算子は常にオプショナル値を返し、ダウンキャストが不可能だった場合は値が `nil` になります。これにより、ダウンキャストが成功したかどうかを確認できます。

ダウンキャストが常に成功することが確実な場合のみ、型キャスト演算子の強制形式（`as!`）を使用します。この形式の演算子は、誤ったクラス型にダウンキャストしようとするとランタイムエラーを引き起こします。

以下の例では、`library` 内の各 `MediaItem` を反復処理し、各アイテムに適切な説明を印刷します。これを行うためには、各アイテムを真の `Movie` または `Song` としてアクセスする必要があります。これは、説明に使用するために `Movie` または `Song` の `director` または `artist` プロパティにアクセスするために必要です。

この例では、配列内の各アイテムが `Movie` であるか、`Song` であるかもしれません。各アイテムに対してどのクラスを使用するか事前にはわからないため、ループごとにダウンキャストを確認するために型キャスト演算子の条件付き形式（`as?`）を使用するのが適切です：

```swift
for item in library {
    if let movie = item as? Movie {
        print("Movie: \(movie.name), dir. \(movie.director)")
    } else if let song = item as? Song {
        print("Song: \(song.name), by \(song.artist)")
    }
}

// Movie: Casablanca, dir. Michael Curtiz
// Song: Blue Suede Shoes, by Elvis Presley
// Movie: Citizen Kane, dir. Orson Welles
// Song: The One And Only, by Chesney Hawkes
// Song: Never Gonna Give You Up, by Rick Astley
```

この例は、現在の `item` を `Movie` としてダウンキャストしようとすることから始まります。`item` は `MediaItem` インスタンスであるため、それが `Movie` である可能性もあれば、`Song` である可能性もあり、単なる基本の `MediaItem` である可能性もあります。この不確実性のため、型キャスト演算子の `as?` 形式は、サブクラス型にダウンキャストを試みる際にオプショナル値を返します。`item as? Movie` の結果は `Movie?` 型、つまり「オプショナルな Movie」です。

`Movie` へのダウンキャストは、`library` 配列内の `Song` インスタンスに適用されると失敗します。これに対処するために、上記の例ではオプショナルバインディングを使用して、オプショナルな `Movie` が実際に値を含んでいるかどうかを確認します（つまり、ダウンキャストが成功したかどうかを確認します）。このオプショナルバインディングは「if let movie = item as? Movie」と書かれ、次のように読むことができます：

「`item` を `Movie` としてアクセスしようとします。これが成功した場合、返されたオプショナルな `Movie` に格納されている値を新しい一時的な定数 `movie` に設定します。」

ダウンキャストが成功すると、`movie` のプロパティを使用して、その `Movie` インスタンスの説明を印刷します（監督の名前を含む）。同様の原則が `Song` インスタンスを確認するために使用され、`library` 内で `Song` が見つかった場合には適切な説明（アーティスト名を含む）を印刷します。

> **注記**
> 
> キャストは実際にはインスタンスを変更したり、その値を変更したりしません。基になるインスタンスは同じままであり、キャストされた型のインスタンスとして単に扱われ、アクセスされます。

## Any と AnyObject の型キャスト

Swift は、特定の型を扱うための2つの特別な型を提供します：

- `Any` は、関数型を含む任意の型のインスタンスを表すことができます。
- `AnyObject` は、任意のクラス型のインスタンスを表すことができます。

`Any` と `AnyObject` は、それらが提供する動作や機能が明示的に必要な場合にのみ使用してください。コードで扱う型については、できるだけ具体的にする方が常に良いです。

以下は、`Any` を使用して関数型や非クラス型を含むさまざまな型の混在を扱う例です。この例では、`things` という配列を作成し、`Any` 型の値を格納できるようにしています：

```swift
var things: [Any] = []

things.append(0)
things.append(0.0)
things.append(42)
things.append(3.14159)
things.append("hello")
things.append((3.0, 5.0))
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
things.append({ (name: String) -> String in "Hello, \(name)" })
```

`things` 配列には、2つの `Int` 値、2つの `Double` 値、1つの `String` 値、`(Double, Double)` 型のタプル、映画「ゴーストバスターズ」、および `String` 値を取り別の `String` 値を返すクロージャ式が含まれています。

`Any` または `AnyObject` 型でしか知られていない定数や変数の具体的な型を調べるには、`switch` 文のケースで `is` または `as` パターンを使用できます。以下の例では、`things` 配列内のアイテムを反復処理し、`switch` 文を使用して各アイテムの型を照会します。いくつかの `switch` 文のケースでは、指定された型の定数に一致する値をバインドして、その値を印刷できるようにしています：

```swift
for thing in things {
    switch thing {
    case 0 as Int:
        print("zero as an Int")
    case 0 as Double:
        print("zero as a Double")
    case let someInt as Int:
        print("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        print("a positive double value of \(someDouble)")
    case is Double:
        print("some other double value that I don't want to print")
    case let someString as String:
        print("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        print("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        print("a movie called \(movie.name), dir. \(movie.director)")
    case let stringConverter as (String) -> String:
        print(stringConverter("Michael"))
    default:
        print("something else")
    }
}

// zero as an Int
// zero as a Double
// an integer value of 42
// a positive double value of 3.14159
// a string value of "hello"
// an (x, y) point at 3.0, 5.0
// a movie called Ghostbusters, dir. Ivan Reitman
// Hello, Michael
```

> **注記**
> 
> `Any` 型はオプショナル型を含む任意の型の値を表します。Swift は、`Any` 型の値が期待される場所でオプショナル値を使用すると警告を出します。本当にオプショナル値を `Any` 値として使用する必要がある場合は、以下のように `as` 演算子を使用してオプショナルを明示的に `Any` にキャストできます。

```swift
let optionalNumber: Int? = 3
things.append(optionalNumber)        // 警告
things.append(optionalNumber as Any) // 警告なし
```