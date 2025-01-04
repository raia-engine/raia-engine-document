# ジェネリックパラメータと引数

具体的な型を抽象化するために宣言を一般化します。

この章では、ジェネリック型、関数、およびイニシャライザのパラメータと引数について説明します。ジェネリック型、関数、サブスクリプト、またはイニシャライザを宣言する場合、ジェネリック型、関数、またはイニシャライザが操作できる型パラメータを指定します。これらの型パラメータは、ジェネリック型のインスタンスが作成されるか、ジェネリック関数またはイニシャライザが呼び出されるときに、実際の具体的な型引数に置き換えられるプレースホルダーとして機能します。

Swiftのジェネリクスの概要については、[ジェネリクス](link-to-generics)を参照してください。

## ジェネリックパラメータ句

ジェネリックパラメータ句は、ジェネリック型または関数の型パラメータと、それらのパラメータに対する関連する制約および要件を指定します。ジェネリックパラメータ句は山括弧（`<>`）で囲まれ、次の形式を持ちます：

```
<<#ジェネリックパラメータリスト#>>
```

ジェネリックパラメータリストは、ジェネリックパラメータのカンマ区切りのリストであり、それぞれが次の形式を持ちます：

```
<#型パラメータ#>: <#制約#>
```

ジェネリックパラメータは、型パラメータに続いてオプションの制約が付いたものです。型パラメータは単にプレースホルダー型の名前です（例えば、`T`、`U`、`V`、`Key`、`Value`など）。型、関数、またはイニシャライザの宣言の残りの部分で、型パラメータ（およびそれらの関連型）にアクセスできます。

制約は、型パラメータが特定のクラスを継承するか、プロトコルまたはプロトコルの組み合わせに準拠することを指定します。例えば、以下のジェネリック関数では、ジェネリックパラメータ `T: Comparable` は、型パラメータ `T` に代入される任意の型引数が `Comparable` プロトコルに準拠する必要があることを示しています。

```swift
func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
    if x < y {
        return y
    }
    return x
}
```

例えば、`Int` や `Double` はどちらも `Comparable` プロトコルに準拠しているため、この関数はどちらの型の引数も受け入れます。ジェネリック型とは対照的に、ジェネリック関数やイニシャライザを使用する場合、ジェネリック引数句を指定しません。型引数は、関数やイニシャライザに渡される引数の型から推論されます。

```swift
simpleMax(17, 42) // T は Int と推論される
simpleMax(3.14159, 2.71828) // T は Double と推論される
```

## ジェネリックwhere句

型パラメータおよびその関連型に追加の要件を指定するために、型または関数の本体の開き中括弧の直前にジェネリックwhere句を含めることができます。ジェネリックwhere句は `where` キーワードで始まり、カンマ区切りの1つ以上の要件のリストが続きます。

```
where <#要件#>
```

ジェネリックwhere句の要件は、型パラメータがクラスを継承するか、プロトコルまたはプロトコルの組み合わせに準拠することを指定します。ジェネリックwhere句は、型パラメータに対する単純な制約を表現するための構文糖衣を提供します（例えば、`<T: Comparable>` は `<T> where T: Comparable` と等価です）が、型パラメータおよびその関連型に対するより複雑な制約を提供するために使用できます。例えば、型パラメータの関連型がプロトコルに準拠するように制約することができます。例えば、`<S: Sequence> where S.Iterator.Element: Equatable` は、`S` が `Sequence` プロトコルに準拠し、関連型 `S.Iterator.Element` が `Equatable` プロトコルに準拠することを指定します。この制約は、シーケンスの各要素が等価であることを保証します。

また、`==` 演算子を使用して2つの型が同一であることを指定することもできます。例えば、`<S1: Sequence, S2: Sequence> where S1.Iterator.Element == S2.Iterator.Element` は、`S1` と `S2` が `Sequence` プロトコルに準拠し、両方のシーケンスの要素が同じ型である必要があることを表現します。

型パラメータに代入される任意の型引数は、その型パラメータに課されたすべての制約および要件を満たす必要があります。

ジェネリックwhere句は、型パラメータを含む宣言の一部として、または型パラメータを含む宣言の内部にネストされた宣言の一部として現れることができます。ネストされた宣言のジェネリックwhere句は、囲む宣言の型パラメータを参照することができますが、そのwhere句の要件はそれが書かれた宣言にのみ適用されます。

囲む宣言にもwhere句がある場合、両方の句の要件が組み合わされます。以下の例では、`startsWithZero()` は `Element` が `SomeProtocol` と `Numeric` の両方に準拠している場合にのみ利用可能です。

```swift
extension Collection where Element: SomeProtocol {
    func startsWithZero() -> Bool where Element: Numeric {
        return first == .zero
    }
}
```

ジェネリック関数やイニシャライザをオーバーロードする際に、型パラメータに対する異なる制約、要件、またはその両方を提供することができます。オーバーロードされたジェネリック関数やイニシャライザを呼び出すとき、コンパイラはこれらの制約を使用して、どのオーバーロードされた関数やイニシャライザを呼び出すかを解決します。

ジェネリックwhere句についての詳細およびジェネリック関数宣言の例については、[ジェネリックwhere句](link-to-generic-where-clauses)を参照してください。

## ジェネリックパラメータ句の文法

```
generic-parameter-clause → < generic-parameter-list >
generic-parameter-list → generic-parameter | generic-parameter , generic-parameter-list
generic-parameter → type-name
generic-parameter → type-name : type-identifier
generic-parameter → type-name : protocol-composition-type
generic-where-clause → where requirement-list
requirement-list → requirement | requirement , requirement-list
requirement → conformance-requirement | same-type-requirement
conformance-requirement → type-identifier : type-identifier
conformance-requirement → type-identifier : protocol-composition-type
same-type-requirement → type-identifier == type
```

## ジェネリック引数句

ジェネリック引数句は、ジェネリック型の型引数を指定します。ジェネリック引数句は山括弧（`<>`）で囲まれ、次の形式を持ちます：

```
<<#ジェネリック引数リスト#>>
```

ジェネリック引数リストは、型引数のカンマ区切りのリストです。型引数は、ジェネリック型のジェネリックパラメータ句の対応する型パラメータを置き換える実際の具体的な型の名前です。その結果、ジェネリック型の特殊化バージョンが得られます。以下の例は、Swift標準ライブラリのジェネリック辞書型の簡略化バージョンを示しています。

```swift
struct Dictionary<Key: Hashable, Value>: Collection, ExpressibleByDictionaryLiteral {
    /* ... */
}
```

ジェネリック `Dictionary` 型の特殊化バージョン `Dictionary<String, Int>` は、ジェネリックパラメータ `Key: Hashable` と `Value` を具体的な型引数 `String` と `Int` に置き換えることで形成されます。各型引数は、それが置き換えるジェネリックパラメータのすべての制約を満たす必要があります。上記の例では、`Key` 型パラメータは `Hashable` プロトコルに準拠するように制約されているため、`String` も `Hashable` プロトコルに準拠する必要があります。

また、型パラメータを、それ自体がジェネリック型の特殊化バージョンである型引数に置き換えることもできます（適切な制約および要件を満たしている場合）。例えば、`Array<Element>` の型パラメータ `Element` を、整数の配列自体が要素である配列 `Array<Int>` の特殊化バージョンに置き換えて、要素が整数の配列である配列を形成することができます。

```swift
let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

[ジェネリックパラメータ句](#generic-parameter-clause)で述べたように、ジェネリック関数やイニシャライザの型引数を指定するためにジェネリック引数句を使用しません。

## ジェネリック引数句の文法

```
generic-argument-clause → < generic-argument-list >
generic-argument-list → generic-argument | generic-argument , generic-argument-list
generic-argument → type
```