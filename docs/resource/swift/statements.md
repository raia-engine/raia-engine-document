# ステートメント

式をグループ化し、実行の流れを制御します。Swiftには、単純ステートメント、コンパイラ制御ステートメント、および制御フローステートメントの3種類のステートメントがあります。単純ステートメントは最も一般的で、式または宣言のいずれかで構成されます。コンパイラ制御ステートメントは、プログラムがコンパイラの動作の側面を変更できるようにし、条件付きコンパイルブロックと行制御ステートメントを含みます。

制御フローステートメントは、プログラム内の実行の流れを制御するために使用されます。Swiftには、ループステートメント、分岐ステートメント、および制御転送ステートメントなど、いくつかの種類の制御フローステートメントがあります。ループステートメントは、指定された条件に応じてコードのブロックを繰り返し実行することを可能にし、分岐ステートメントは、特定の条件が満たされた場合にのみコードのブロックを実行することを可能にし、制御転送ステートメントは、コードの実行順序を変更する方法を提供します。さらに、Swiftはスコープを導入し、エラーをキャッチして処理するためのdoステートメントと、現在のスコープが終了する直前にクリーンアップアクションを実行するためのdeferステートメントを提供します。

ステートメントの後にはオプションでセミコロン（;）を付けることができ、同じ行に複数のステートメントがある場合はそれらを区切るために使用されます。

## ステートメントの文法

```
statement → expression ;?
statement → declaration ;?
statement → loop-statement ;?
statement → branch-statement ;?
statement → labeled-statement ;?
statement → control-transfer-statement ;?
statement → defer-statement ;?
statement → do-statement ;?
statement → compiler-control-statement
statements → statement statements?
```

## ループステートメント

ループステートメントは、ループ内で指定された条件に応じてコードのブロックを繰り返し実行することを可能にします。Swiftには、for-inステートメント、whileステートメント、およびrepeat-whileステートメントの3つのループステートメントがあります。

ループステートメント内の制御フローは、breakステートメントおよびcontinueステートメントによって変更されることがあり、以下のBreak StatementおよびContinue Statementで説明されています。

### ループステートメントの文法

```
loop-statement → for-in-statement
loop-statement → while-statement
loop-statement → repeat-while-statement
```

### For-Inステートメント

for-inステートメントは、コレクション（またはSequenceプロトコルに準拠する任意の型）の各アイテムに対して一度だけコードのブロックを実行することを可能にします。

for-inステートメントは次の形式を持ちます：

```
for <#item#> in <#collection#> {
   <#statements#>
}
```

`makeIterator()`メソッドは、コレクション式で呼び出され、イテレータ型の値を取得します。プログラムは、イテレータの`next()`メソッドを呼び出すことでループの実行を開始します。返された値がnilでない場合、それはアイテムパターンに割り当てられ、プログラムはステートメントを実行し、ループの先頭に戻ります。そうでない場合、プログラムは割り当てやステートメントの実行を行わず、for-inステートメントの実行を終了します。

#### For-Inステートメントの文法

```
for-in-statement → for case? pattern in expression where-clause? code-block
```

### Whileステートメント

whileステートメントは、条件が真である限り、コードのブロックを繰り返し実行することを可能にします。

whileステートメントは次の形式を持ちます：

```
while <#condition#> {
   <#statements#>
}
```

whileステートメントは次のように実行されます：
1. 条件が評価されます。
2. 真であれば、実行はステップ2に進みます。偽であれば、プログラムはwhileステートメントの実行を終了します。
3. プログラムはステートメントを実行し、実行はステップ1に戻ります。

条件の値は、ステートメントが実行される前に評価されるため、whileステートメント内のステートメントは0回以上実行される可能性があります。

条件の値は`Bool`型または`Bool`にブリッジされた型でなければなりません。条件は、Optional Bindingで説明されているように、オプショナルバインディング宣言であることもできます。

#### Whileステートメントの文法

```
while-statement → while condition-list code-block
condition-list → condition | condition , condition-list
condition → expression | availability-condition | case-condition | optional-binding-condition
case-condition → case pattern initializer
optional-binding-condition → let pattern initializer? | var pattern initializer?
```

### Repeat-Whileステートメント

repeat-whileステートメントは、条件が真である限り、1回以上コードのブロックを実行することを可能にします。

repeat-whileステートメントは次の形式を持ちます：

```
repeat {
   <#statements#>
} while <#condition#>
```

repeat-whileステートメントは次のように実行されます：
1. プログラムはステートメントを実行し、実行はステップ2に進みます。
2. 条件が評価されます。
3. 真であれば、実行はステップ1に戻ります。偽であれば、プログラムはrepeat-whileステートメントの実行を終了します。

条件の値は、ステートメントが実行された後に評価されるため、repeat-whileステートメント内のステートメントは少なくとも1回は実行されます。

条件の値は`Bool`型または`Bool`にブリッジされた型でなければなりません。

#### Repeat-Whileステートメントの文法

```
repeat-while-statement → repeat code-block while expression
```

## 分岐ステートメント

分岐ステートメントは、1つ以上の条件の値に応じて、特定のコード部分を実行することをプログラムに許可します。分岐ステートメントで指定された条件の値は、プログラムがどのように分岐するか、したがってどのコードブロックが実行されるかを制御します。Swiftには、ifステートメント、guardステートメント、およびswitchステートメントの3つの分岐ステートメントがあります。

ifステートメントまたはswitchステートメント内の制御フローは、breakステートメントによって変更されることがあり、以下のBreak Statementで説明されています。

### 分岐ステートメントの文法

```
branch-statement → if-statement
branch-statement → guard-statement
branch-statement → switch-statement
```

### If文

if文は、1つ以上の条件の評価に基づいてコードを実行するために使用されます。

if文には2つの基本的な形式があります。どちらの形式でも、開き中括弧と閉じ中括弧が必要です。

最初の形式では、条件が真の場合にのみコードを実行することができ、次の形式を持ちます。

```
if <#condition#> {
   <#statements#>
}
```

if文の2番目の形式では、追加のelse句（elseキーワードで導入される）を提供し、条件が真の場合に1つのコード部分を実行し、同じ条件が偽の場合に別のコード部分を実行するために使用されます。単一のelse句が存在する場合、if文は次の形式を持ちます。

```
if <#condition#> {
   <#statements to execute if condition is true#>
} else {
   <#statements to execute if condition is false#>
}
```

if文のelse句には、複数の条件をテストするために別のif文を含めることができます。このように連鎖したif文は次の形式を持ちます。

```
if <#condition 1#> {
   <#statements to execute if condition 1 is true#>
} else if <#condition 2#> {
   <#statements to execute if condition 2 is true#>
} else {
   <#statements to execute if both conditions are false#>
}
```

if文の条件の値は、`Bool`型または`Bool`にブリッジされた型でなければなりません。条件は、オプショナルバインディング宣言であることもできます。オプショナルバインディングについては、オプショナルバインディングで説明します。

#### if文の文法

```
if-statement → if condition-list code-block else-clause?
else-clause → else code-block | else if-statement
```

### Guard文

guard文は、1つ以上の条件が満たされない場合にプログラムの制御をスコープ外に移すために使用されます。

guard文は次の形式を持ちます。

```
guard <#condition#> else {
   <#statements#>
}
```

guard文の条件の値は、`Bool`型または`Bool`にブリッジされた型でなければなりません。条件は、オプショナルバインディング宣言であることもできます。オプショナルバインディングについては、オプショナルバインディングで説明します。

guard文の条件でオプショナルバインディング宣言から値を割り当てられた定数または変数は、guard文の囲むスコープの残りの部分で使用できます。

guard文のelse句は必須であり、`Never`戻り型の関数を呼び出すか、次のいずれかの文を使用してguard文の囲むスコープの外にプログラム制御を移さなければなりません。
- `return`
- `break`
- `continue`
- `throw`

制御転送文については、以下の制御転送文で説明します。`Never`戻り型の関数についての詳細は、戻らない関数を参照してください。

#### guard文の文法

```
guard-statement → guard condition-list else code-block
```

### Switch文

switch文は、制御式の値に応じて特定のコードブロックを実行することを可能にします。

switch文は次の形式を持ちます。

```
switch <#control expression#> {
case <#pattern 1#>:
    <#statements#>
case <#pattern 2#> where <#condition#>:
    <#statements#>
case <#pattern 3#> where <#condition#>,
    <#pattern 4#> where <#condition#>:
    <#statements#>
default:
    <#statements#>
}
```

switch文の制御式は評価され、各ケースで指定されたパターンと比較されます。一致が見つかると、プログラムはそのケースのスコープ内にリストされた文を実行します。各ケースのスコープは空であってはなりません。その結果、各ケースラベルのコロン（:）の後に少なくとも1つの文を含める必要があります。マッチしたケースの本体でコードを実行する意図がない場合は、単一のbreak文を使用してください。

コードが分岐できる式の値は非常に柔軟です。たとえば、整数や文字などのスカラー型の値に加えて、浮動小数点数、文字列、タプル、カスタムクラスのインスタンス、およびオプショナルの値にも分岐できます。制御式の値は、列挙型のケースの値に一致させたり、指定された範囲の値に含まれているかどうかを確認したりすることもできます。これらのさまざまな型の値をswitch文で使用する方法の例については、制御フローのswitchを参照してください。

switchケースには、各パターンの後にwhere句を含めることができます。where句はwhereキーワードに続く式で導入され、パターンが制御式に一致する前に追加の条件を提供するために使用されます。where句が存在する場合、関連するケース内の文は、制御式の値がケースのパターンの1つに一致し、where句の式が真と評価された場合にのみ実行されます。たとえば、次の例では、制御式が2つの同じ値を含むタプル（例：(1, 1)）である場合にのみ、ケースが一致します。

```
case let (x, y) where x == y:
```

上記の例が示すように、ケース内のパターンはletキーワードを使用して定数をバインドすることもできます（varキーワードを使用して変数をバインドすることもできます）。これらの定数（または変数）は、対応するwhere句およびケースのスコープ内の残りのコードで参照できます。ケースに制御式と一致する複数のパターンが含まれている場合、すべてのパターンは同じ定数または変数バインディングを含む必要があり、各バインドされた変数または定数はすべてのケースのパターンで同じ型でなければなりません。

switch文には、defaultキーワードで導入されるデフォルトケースを含めることもできます。デフォルトケース内のコードは、他のケースが制御式と一致しない場合にのみ実行されます。switch文には1つのデフォルトケースしか含めることができず、それはswitch文の最後に表示されなければなりません。

パターンマッチング操作の実際の実行順序、特にケース内のパターンの評価順序は指定されていませんが、switch文のパターンマッチングはソース順で評価されるかのように動作します。つまり、ソースコードに表示される順序です。その結果、複数のケースに同じ値に評価されるパターンが含まれている場合、プログラムはソース順で最初に一致するケース内のコードのみを実行します。

#### スイッチ文は網羅的でなければならない

Swiftでは、制御式の型のすべての可能な値が少なくとも1つのケースのパターンに一致する必要があります。これが単に実現不可能な場合（例えば、制御式の型が`Int`の場合）、要件を満たすためにデフォルトケースを含めることができます。

#### 将来の列挙ケースに対するスイッチ

非フローズン列挙は、アプリをコンパイルして出荷した後でも、新しい列挙ケースを追加できる特別な種類の列挙です。非フローズン列挙に対するスイッチは追加の考慮が必要です。ライブラリの作者が列挙を非フローズンとしてマークすると、新しい列挙ケースを追加する権利を留保し、その列挙とやり取りするコードは再コンパイルせずに将来のケースを処理できる必要があります。ライブラリ進化モードでコンパイルされたコード、Swift標準ライブラリのコード、AppleフレームワークのSwiftオーバーレイ、およびCやObjective-Cのコードは、非フローズン列挙を宣言できます。フローズンと非フローズンの列挙についての情報は、フローズンを参照してください。

非フローズン列挙値に対するスイッチでは、すべての列挙ケースに対応するスイッチケースがある場合でも、常にデフォルトケースを含める必要があります。デフォルトケースに`@unknown`属性を適用することができ、これはデフォルトケースが将来追加される列挙ケースのみに一致するべきであることを示します。Swiftは、デフォルトケースがコンパイラ時に既知の列挙ケースに一致する場合、警告を生成します。この将来の警告は、ライブラリの作者がスイッチケースに対応する新しいケースを列挙に追加したことを通知します。

次の例は、Swift標準ライブラリの`Mirror.AncestorRepresentation`列挙の既存の3つのケースすべてに対してスイッチを行います。将来追加のケースを追加した場合、コンパイラはスイッチ文を更新して新しいケースを考慮する必要があることを示す警告を生成します。

```swift
let representation: Mirror.AncestorRepresentation = .generated
switch representation {
case .customized:
    print("最も近い祖先の実装を使用します。")
case .generated:
    print("すべての祖先クラスのデフォルトミラーを生成します。")
case .suppressed:
    print("すべての祖先クラスの表現を抑制します。")
@unknown default:
    print("このコードがコンパイルされたときに未知だった表現を使用します。")
}
// "すべての祖先クラスのデフォルトミラーを生成します。"と表示されます。
```

#### 実行は暗黙的にケースを通過しない

一致したケース内のコードの実行が終了すると、プログラムはスイッチ文から退出します。プログラムの実行は次のケースやデフォルトケースに続行しません。とはいえ、あるケースから次のケースに実行を続行したい場合は、`fallthrough`キーワードからなるfallthrough文をそのケースに明示的に含めます。fallthrough文の詳細については、以下のFallthrough Statementを参照してください。

#### スイッチ文の文法

```
switch-statement → switch expression { switch-cases? }
switch-cases → switch-case switch-cases?
switch-case → case-label statements
switch-case → default-label statements
switch-case → conditional-switch-case
case-label → attributes? case case-item-list :
case-item-list → pattern where-clause? | pattern where-clause? , case-item-list
default-label → attributes? default :
where-clause → where where-expression
where-expression → expression
conditional-switch-case → switch-if-directive-clause switch-elseif-directive-clauses? switch-else-directive-clause? endif-directive
switch-if-directive-clause → if-directive compilation-condition switch-cases?
switch-elseif-directive-clauses → elseif-directive-clause switch-elseif-directive-clauses?
switch-elseif-directive-clause → elseif-directive compilation-condition switch-cases?
switch-else-directive-clause → else-directive switch-cases?
```

## ラベル付き文

ループ文、if文、スイッチ文、またはdo文の前に、ラベル名の後にコロン（:）を続けた文ラベルを付けることができます。文ラベルをbreak文やcontinue文と一緒に使用して、ループ文やスイッチ文で制御フローをどのように変更するかを明示的に示します。詳細は、以下のBreak StatementおよびContinue Statementを参照してください。

ラベル付き文のスコープは、文ラベルに続く文全体です。ラベル付き文をネストすることができますが、各文ラベルの名前は一意でなければなりません。

文ラベルの使用方法と例については、Control Flowのラベル付き文を参照してください。

### ラベル付き文の文法

```
labeled-statement → statement-label loop-statement
labeled-statement → statement-label if-statement
labeled-statement → statement-label switch-statement
labeled-statement → statement-label do-statement
statement-label → label-name :
label-name → identifier
```

## 制御転送文

制御転送文は、プログラム内のコードの実行順序を無条件に別のコードに転送することで変更できます。Swiftには5つの制御転送文があります：break文、continue文、fallthrough文、return文、およびthrow文です。

### 制御転送文の文法

```
control-transfer-statement → break-statement
control-transfer-statement → continue-statement
control-transfer-statement → fallthrough-statement
control-transfer-statement → return-statement
control-transfer-statement → throw-statement
```

### Break文

break文は、ループ、if文、またはスイッチ文の実行を終了します。break文はbreakキーワードのみで構成される場合もあれば、以下のようにbreakキーワードの後に文ラベルの名前が続く場合もあります。

```
break
break <#label name#>
```

break文の後に文ラベルの名前が続く場合、そのラベルが付けられたループ、if文、またはスイッチ文の実行を終了します。

break文の後に文ラベルの名前が続かない場合、そのbreak文が含まれるスイッチ文または最も内側のループ文の実行を終了します。ラベルのないbreak文を使用してif文から抜け出すことはできません。

いずれの場合も、プログラムの制御は、囲むループまたはスイッチ文の後の最初の行に転送されます（存在する場合）。

break文の使用例については、Control FlowのBreak and Labeled Statementsを参照してください。

#### Break文の文法

```
break-statement → break label-name?
```

### continue文

continue文は、ループ文の現在の反復処理を終了しますが、ループ文の実行を停止しません。continue文は、continueキーワードのみで構成される場合と、以下のようにcontinueキーワードの後に文ラベルの名前が続く場合があります。

```
continue
continue <#label name#>
```

continue文の後に文ラベルの名前が続く場合、そのラベルで指定されたループ文の現在の反復処理を終了します。

continue文の後に文ラベルの名前が続かない場合、それが発生した最も内側の囲んでいるループ文の現在の反復処理を終了します。

いずれの場合も、プログラム制御は囲んでいるループ文の条件に移ります。

for文では、continue文が実行された後でもインクリメント式は評価されます。これは、ループの本体の実行後にインクリメント式が評価されるためです。

continue文の使用例については、制御フローのContinueおよびLabeled Statementsを参照してください。

#### continue文の文法

```
continue-statement → continue label-name?
```

### fallthrough文

fallthrough文はfallthroughキーワードで構成され、switch文のcaseブロック内でのみ発生します。fallthrough文は、switch文のあるcaseから次のcaseへのプログラム実行を継続させます。switch文の制御式の値とcaseラベルのパターンが一致しなくても、プログラム実行は次のcaseに進みます。

fallthrough文は、caseブロックの最後の文としてだけでなく、switch文の任意の場所に現れることができますが、最後のcaseブロックでは使用できません。また、値バインディングパターンを含むパターンのcaseブロックに制御を移すこともできません。

switch文でfallthrough文を使用する例については、制御フローのControl Transfer Statementsを参照してください。

#### fallthrough文の文法

```
fallthrough-statement → fallthrough
```

### return文

return文は関数またはメソッド定義の本体内で発生し、プログラム実行を呼び出し元の関数またはメソッドに戻します。プログラム実行は、関数またはメソッド呼び出しの直後のポイントで続行されます。

return文は、returnキーワードのみで構成される場合と、以下のようにreturnキーワードの後に式が続く場合があります。

```
return
return <#expression#>
```

return文の後に式が続く場合、その式の値が呼び出し元の関数またはメソッドに返されます。式の値が関数またはメソッド宣言で宣言された戻り値の型と一致しない場合、式の値は戻り値の型に変換されてから呼び出し元の関数またはメソッドに返されます。

> 注: Failable Initializersで説明されているように、return文の特別な形式（return nil）は、初期化の失敗を示すために失敗可能なイニシャライザで使用できます。

return文の後に式が続かない場合、それは値を返さない関数またはメソッドからのみ戻るために使用できます（つまり、関数またはメソッドの戻り値の型がVoidまたは()の場合）。

#### return文の文法

```
return-statement → return expression?
```

### throw文

throw文は、throwing関数またはメソッドの本体内、またはthrowsキーワードでマークされたクロージャ式の本体内で発生します。

throw文は、現在のスコープのプログラム実行を終了し、その囲んでいるスコープにエラー伝播を開始させます。スローされたエラーは、do文のcatch句で処理されるまで伝播し続けます。

throw文は、以下のようにthrowキーワードの後に式が続く形で構成されます。

```
throw <#expression#>
```

式の値はErrorプロトコルに準拠する型でなければなりません。throw文を含むdo文または関数がスローするエラーの型を宣言している場合、式の値はその型のインスタンスでなければなりません。

throw文の使用例については、エラーハンドリングのThrowing Functionsを参照してください。

#### throw文の文法

```
throw-statement → throw expression
```

### defer文

defer文は、defer文が現れるスコープの外にプログラム制御を移す直前にコードを実行するために使用されます。

defer文は次の形式を持ちます：

```
defer {
    <#statements#>
}
```

defer文内の文は、プログラム制御がどのように移されても実行されます。これは、たとえばファイルディスクリプタを閉じるなどの手動リソース管理や、エラーがスローされた場合でも実行する必要があるアクションを実行するためにdefer文を使用できることを意味します。

defer文内の文は、defer文を囲むスコープの終わりに実行されます。

```
func f(x: Int) {
  defer { print("First defer") }

  if (x < 10) {
    defer { print("Second defer") }
    print("End of if")
  }

  print("End of function")
}
f(x: 5)
// Prints "End of if"
// Prints "Second defer"
// Prints "End of function"
// Prints "First defer"
```

上記のコードでは、if文内のdeferは関数f内で宣言されたdeferよりも先に実行されます。これは、if文のスコープが関数のスコープよりも先に終了するためです。

同じスコープ内に複数のdefer文が現れる場合、それらが現れる順序は実行される順序の逆になります。特定のスコープ内で最後のdefer文を最初に実行することは、その最後のdefer文内の文が他のdefer文によってクリーンアップされるリソースを参照できることを意味します。

```
func f() {
    defer { print("First defer") }
    defer { print("Second defer") }
    print("End of function")
}
f()
// Prints "End of function"
// Prints "Second defer"
// Prints "First defer"
```

defer文内の文は、defer文の外にプログラム制御を移すことはできません。

#### defer文の文法

```
defer-statement → defer code-block
```

### Do文

do文は新しいスコープを導入するために使用され、オプションで1つ以上のcatch節を含むことができます。catch節には定義されたエラー条件に一致するパターンが含まれます。do文のスコープ内で宣言された変数や定数は、そのスコープ内でのみアクセスできます。

Swiftのdo文は、C言語でコードブロックを区切るために使用される中括弧({})に似ており、実行時にパフォーマンスコストは発生しません。

do文の形式は次の通りです：

```
do {
    try <#expression#>
    <#statements#>
} catch <#pattern 1#> {
    <#statements#>
} catch <#pattern 2#> where <#condition#> {
    <#statements#>
} catch <#pattern 3#>, <#pattern 4#> where <#condition#> {
    <#statements#>
} catch {
    <#statements#>
}
```

do文は、スローするエラーの型をオプションで指定することができ、その形式は次の通りです：

```
do throws(<#type#>) {
    try <#expression#>
} catch <#pattern#> {
    <#statements#>
} catch {
    <#statements#>
}
```

do文にthrows句が含まれている場合、doブロックは指定された型のエラーのみをスローできます。型はErrorプロトコルに準拠する具体的な型、Errorプロトコルに準拠する不透明な型、またはボックス化されたプロトコル型any Errorでなければなりません。do文がスローするエラーの型を指定しない場合、Swiftは次のようにエラーの型を推論します：
- doコードブロック内のすべてのthrows文とtry式が網羅的なエラーハンドリングメカニズム内にネストされている場合、Swiftはdo文がエラーをスローしないと推論します。
- doコードブロックが網羅的なエラーハンドリングの外で単一の型のエラーのみをスローするコードを含む場合、Swiftはdo文がその具体的なエラー型をスローすると推論します。
- doコードブロックが網羅的なエラーハンドリングの外で複数の型のエラーをスローするコードを含む場合、Swiftはdo文がany Errorをスローすると推論します。

明示的な型を持つエラーの取り扱いについての詳細は、「エラーの型を指定する」を参照してください。

doコードブロック内の任意の文がエラーをスローした場合、プログラムの制御はそのエラーに一致する最初のcatch節に移ります。どの節も一致しない場合、エラーは周囲のスコープに伝播します。トップレベルでエラーが処理されない場合、プログラムの実行はランタイムエラーで停止します。

switch文のように、コンパイラはcatch節が網羅的かどうかを推論しようとします。そのような判断ができる場合、エラーは処理されたと見なされます。そうでない場合、エラーは含まれるスコープの外に伝播する可能性があり、その場合、エラーは囲むcatch節で処理されるか、含まれる関数がthrowsで宣言されている必要があります。

複数のパターンを持つcatch節は、そのパターンのいずれかがエラーに一致する場合、エラーに一致します。catch節に複数のパターンが含まれている場合、すべてのパターンは同じ定数または変数バインディングを含む必要があり、各バインドされた変数または定数はcatch節のすべてのパターンで同じ型を持つ必要があります。

エラーが処理されることを保証するために、ワイルドカードパターン(_)のようにすべてのエラーに一致するパターンを持つcatch節を使用します。catch節がパターンを指定しない場合、catch節は任意のエラーに一致し、エラーをerrorという名前のローカル定数にバインドします。catch節で使用できるパターンの詳細については、「パターン」を参照してください。

複数のcatch節を持つdo文の使用例については、「エラーの処理」を参照してください。

#### do文の文法

```
do-statement → do throws-clause? code-block catch-clauses?
catch-clauses → catch-clause catch-clauses?
catch-clause → catch catch-pattern-list? code-block
catch-pattern-list → catch-pattern | catch-pattern , catch-pattern-list
catch-pattern → pattern where-clause?
```

## コンパイラ制御文

コンパイラ制御文は、プログラムがコンパイラの動作の側面を変更できるようにします。Swiftには3つのコンパイラ制御文があります：条件付きコンパイルブロック、行制御文、およびコンパイル時診断文です。

### コンパイラ制御文の文法

```
compiler-control-statement → conditional-compilation-block
compiler-control-statement → line-control-statement
compiler-control-statement → diagnostic-statement
```

### 条件付きコンパイルブロック

条件付きコンパイルブロックは、1つ以上のコンパイル条件の値に応じてコードを条件付きでコンパイルすることを可能にします。

すべての条件付きコンパイルブロックは、#if コンパイルディレクティブで始まり、#endif コンパイルディレクティブで終わります。単純な条件付きコンパイルブロックは次の形式を持ちます：

```
#if <#コンパイル条件#>
    <#ステートメント#>
#endif
```

if 文の条件とは異なり、コンパイル条件はコンパイル時に評価されます。その結果、ステートメントはコンパイル条件がコンパイル時に true と評価された場合にのみコンパイルおよび実行されます。

コンパイル条件には、true および false のブールリテラル、-D コマンドラインフラグと共に使用される識別子、または以下の表に示すプラットフォーム条件のいずれかを含めることができます。

| プラットフォーム条件 | 有効な引数 |
|--------------------|-----------------|
| os()               | macOS, iOS, watchOS, tvOS, visionOS, Linux, Windows |
| arch()             | i386, x86_64, arm, arm64 |
| swift()            | >= または < の後にバージョン番号 |
| compiler()         | >= または < の後にバージョン番号 |
| canImport()        | モジュール名 |
| targetEnvironment()| simulator, macCatalyst |

swift() および compiler() プラットフォーム条件のバージョン番号は、メジャー番号、オプションのマイナー番号、オプションのパッチ番号などで構成され、各部分はドット (.) で区切られます。比較演算子とバージョン番号の間に空白を入れてはいけません。compiler() のバージョンは、コンパイラのバージョンであり、コンパイラに渡される Swift バージョン設定に関係なくなります。swift() のバージョンは、現在コンパイルされている言語バージョンです。例えば、Swift 5 コンパイラを使用して Swift 4.2 モードでコードをコンパイルする場合、コンパイラのバージョンは 5 で、言語バージョンは 4.2 です。この設定で、次のコードはすべてのメッセージを出力します：

```
#if compiler(>=5)
print("Swift 5 コンパイラ以降でコンパイルされました")
#endif
#if swift(>=4.2)
print("Swift 4.2 モード以降でコンパイルされました")
#endif
#if compiler(>=5) && swift(<5)
print("Swift 5 コンパイラ以降で、Swift 5 より前のモードでコンパイルされました")
#endif
// "Swift 5 コンパイラ以降でコンパイルされました" を出力
// "Swift 4.2 モード以降でコンパイルされました" を出力
// "Swift 5 コンパイラ以降で、Swift 5 より前のモードでコンパイルされました" を出力
```

canImport() プラットフォーム条件の引数は、すべてのプラットフォームに存在しない可能性のあるモジュールの名前です。モジュール名にはピリオド (.) を含めることができます。この条件はモジュールをインポートできるかどうかをテストしますが、実際にインポートはしません。モジュールが存在する場合、プラットフォーム条件は true を返し、存在しない場合は false を返します。

targetEnvironment() プラットフォーム条件は、指定された環境用にコードがコンパイルされている場合に true を返し、それ以外の場合は false を返します。

> 注: arch(arm) プラットフォーム条件は ARM 64 デバイスでは true を返しません。arch(i386) プラットフォーム条件は、コードが 32 ビット iOS シミュレータ用にコンパイルされる場合に true を返します。

論理演算子 &&、||、および ! を使用してコンパイル条件を組み合わせたり否定したりし、グループ化のために括弧を使用することができます。これらの演算子は、通常のブール式を組み合わせるために使用される論理演算子と同じ結合性と優先順位を持ちます。

if 文と同様に、異なるコンパイル条件をテストするために複数の条件分岐を追加することができます。#elseif 節を使用して任意の数の追加分岐を追加できます。また、#else 節を使用して最後の追加分岐を追加することもできます。複数の分岐を含む条件付きコンパイルブロックは次の形式を持ちます：

```
#if <#コンパイル条件 1#>
    <#コンパイル条件 1 が true の場合にコンパイルされるステートメント#>
#elseif <#コンパイル条件 2#>
    <#コンパイル条件 2 が true の場合にコンパイルされるステートメント#>
#else
    <#両方のコンパイル条件が false の場合にコンパイルされるステートメント#>
#endif
```

> 注: 条件付きコンパイルブロックの本体内の各ステートメントは、コンパイルされない場合でも解析されます。ただし、コンパイル条件に swift() または compiler() プラットフォーム条件が含まれている場合は例外です：ステートメントは、プラットフォーム条件で指定された言語またはコンパイラのバージョンと一致する場合にのみ解析されます。この例外は、古いコンパイラが新しいバージョンの Swift で導入された構文を解析しようとしないようにするためのものです。

明示的メンバー式を条件付きコンパイルブロックでラップする方法については、明示的メンバー式を参照してください。

#### 条件付きコンパイルブロックの文法

```
conditional-compilation-block → if-directive-clause elseif-directive-clauses? else-directive-clause? endif-directive
if-directive-clause → if-directive compilation-condition statements?
elseif-directive-clauses → elseif-directive-clause elseif-directive-clauses?
elseif-directive-clause → elseif-directive compilation-condition statements?
else-directive-clause → else-directive statements?
if-directive → #if
elseif-directive → #elseif
else-directive → #else
endif-directive → #endif
compilation-condition → platform-condition
compilation-condition → identifier
compilation-condition → boolean-literal
compilation-condition → ( compilation-condition )
compilation-condition → ! compilation-condition
compilation-condition → compilation-condition && compilation-condition
compilation-condition → compilation-condition || compilation-condition
platform-condition → os ( operating-system )
platform-condition → arch ( architecture )
platform-condition → swift ( >= swift-version ) | swift ( < swift-version )
platform-condition → compiler ( >= swift-version ) | compiler ( < swift-version )
platform-condition → canImport ( import-path )
platform-condition → targetEnvironment ( environment )
operating-system → macOS | iOS | watchOS | tvOS | visionOS | Linux | Windows
architecture → i386 | x86_64 | arm | arm64
swift-version → decimal-digits swift-version-continuation?
swift-version-continuation → . decimal-digits swift-version-continuation?
environment → simulator | macCatalyst
```

### 行制御文

行制御文は、コンパイルされているソースコードの行番号やファイル名とは異なる行番号やファイル名を指定するために使用されます。行制御文を使用して、Swiftが診断およびデバッグの目的で使用するソースコードの場所を変更します。

行制御文には次の形式があります：

```
#sourceLocation(file: <#file path#>, line: <#line number#>)
#sourceLocation()
```

行制御文の最初の形式は、行制御文に続くコード行から、#line、#file、#fileID、および#filePathリテラル式の値を変更します。行番号は#lineの値を変更し、ゼロより大きい任意の整数リテラルです。ファイルパスは#file、#fileID、および#filePathの値を変更し、文字列リテラルです。指定された文字列は#filePathの値になり、文字列の最後のパスコンポーネントが#fileIDの値として使用されます。#file、#fileID、および#filePathの詳細については、リテラル式を参照してください。

行制御文の2番目の形式である#sourceLocation()は、ソースコードの場所をデフォルトの行番号とファイルパスにリセットします。

#### 行制御文の文法

```
line-control-statement → #sourceLocation ( file: file-path , line: line-number )
line-control-statement → #sourceLocation ( )
line-number → A decimal integer greater than zero
file-path → static-string-literal
```

### コンパイル時診断文

Swift 5.9以前では、#warningおよび#error文はコンパイル中に診断を発行します。この動作は現在、Swift標準ライブラリのwarning(_:)およびerror(_:)マクロによって提供されています。

## 利用可能条件

利用可能条件は、指定されたプラットフォーム引数に基づいて、ランタイムでAPIの利用可能性を照会するために、if、while、およびguard文の条件として使用されます。

利用可能条件には次の形式があります：

```
if #available(<#platform name#> <#version#>, <#...#>, *) {
    <#statements to execute if the APIs are available#>
} else {
    <#fallback statements to execute if the APIs are unavailable#>
}
```

利用可能条件を使用して、使用したいAPIがランタイムで利用可能かどうかに応じてコードブロックを実行します。コンパイラは、利用可能条件の情報を使用して、そのコードブロック内のAPIが利用可能であることを確認します。

利用可能条件は、プラットフォーム名とバージョンのカンマ区切りリストを取ります。プラットフォーム名にはiOS、macOS、watchOS、tvOS、およびvisionOSを使用し、対応するバージョン番号を含めます。*引数は必須であり、他のプラットフォームでは、利用可能条件によってガードされたコードブロックの本体がターゲットによって指定された最小デプロイメントターゲットで実行されることを指定します。

ブール条件とは異なり、&&や||のような論理演算子を使用して利用可能条件を組み合わせることはできません。!を使用して利用可能条件を否定する代わりに、次の形式の非利用可能条件を使用します：

```
if #unavailable(<#platform name#> <#version#>, <#...#>) {
    <#fallback statements to execute if the APIs are unavailable#>
} else {
    <#statements to execute if the APIs are available#>
}
```

#unavailable形式は条件を否定するための構文糖です。非利用可能条件では、*引数は暗黙的であり、含めてはなりません。これは、利用可能条件の*引数と同じ意味を持ちます。

#### 利用可能条件の文法

```
availability-condition → #available ( availability-arguments )
availability-condition → #unavailable ( availability-arguments )
availability-arguments → availability-argument | availability-argument , availability-arguments
availability-argument → platform-name platform-version
availability-argument → *
platform-name → iOS | iOSApplicationExtension
platform-name → macOS | macOSApplicationExtension
platform-name → macCatalyst | macCatalystApplicationExtension
platform-name → watchOS | watchOSApplicationExtension
platform-name → tvOS | tvOSApplicationExtension
platform-name → visionOS | visionOSApplicationExtension
platform-version → decimal-digits
platform-version → decimal-digits . decimal-digits
platform-version → decimal-digits . decimal-digits . decimal-digits
```