# Terra/Lua ライブラリ

## リスト操作 (`list:*`)

|名前|説明|
|---|---|
|`list:sub`|リストの部分を取得する（string.subに相当）|
|`list:rev`|リストを反転する|
|`list:app`|すべての要素に指定した関数を適用する|
|`list:map`|すべての要素にmapを適用し、新しいリストを返す|
|`list:filter`|指定した関数がtrueである要素のみの新しいリストを返す|
|`list:flatmap`|すべての要素にmapを適用し、結果のリストを連結する|
|`list:find`|条件を満たす最初の要素を見つける|
|`list:partition`|k,v = fn(e)を各要素に適用し、同じkの値vをグループ化|
|`list:fold`|再帰的に初期値initとリストの各要素にfnを適用|
|`list:reduce`|リストの各要素にfnを再帰的に適用|
|`list:exists`|リストのいずれかの要素が条件を満たすか|
|`list:all`|リストのすべての要素が条件を満たすか|

## `terralib.*`

### オブジェクトの判別

|名前|説明|
|---|---|
|`terralib.israwlist`|連続する整数キーのリストならtrueを返す|
|`terralib.islist`|リストならtrueを返す|
|`terralib.isfunction`|関数ならtrueを返す|
|`terralib.types.istype`|型ならtrueを返す|
|`terralib.isquote`|引用句ならtrueを返す|
|`terralib.issymbol`|シンボルならtrueを返す|
|`terralib.isconstant`|定数ならtrueを返す|
|`terralib.ismacro`|マクロであればtrueを返す|
|`terralib.isglobalvar`|グローバル変数ならtrueを返す|
|`terralib.islabel`|ラベルならtrueを返す|
|`terralib.isoverloadedfunction`|オーバーロード関数ならtrueを返す|
|`terralib.istree`|ツリーならtrueを返す|
|`terralib.type`|データ型を文字列で返す|


|名前|説明|
|---|---|
|`terralib.memoize`|関数の結果をメモ化します|
|`terralib.externfunction`|外部で定義された関数にバインドされたTerra関数を作成します|
|`terralib.includec`|C関数をインポートする|
|`terralib.sizeof`|terratypeを完全にして、そのサイズを返す（ffi.sizeofのラッパー）|
|`terralib.offsetof`|terratypeを完全にして、terratype内のfieldのオフセット（バイト単位）を返す（ffi.offsetofのラッパー）|
|`terralib.typeof`|objのTerra型を返します。objは、以前にTerra APIを使用して割り当てられたLuaJIT ctypeである必要があります。または、Terra関数の戻り値として返されるものです。|
|`terralib.new`|LuaJITのffi.newのラッパーです。型terratypeの新しいオブジェクトを割り当てます。initはオプションの初期化子であり、Terra値とLua値の間での変換ルールに従います。このオブジェクトはLuaから到達不可能になるとガベージコレクションされます。|
|`terralib.cast`|ffi.castのラッパーです。objをterratypeに変換し、Terra値とLua値の間での変換ルールに従います。|
|`terralib.intrinsic`|指定したnameとtypeに対応するLLVMの組み込み関数を呼び出すTerra関数を返します。|
|`terralib.attrload`|addrのアドレスからattrs属性付きでデータを読み込みます。|
|`terralib.attrstore`|addrのアドレスにvalueの値をattrs属性付きで書き込みます。属性の指定方法はattrloadと同じです。|
|`terralib.types.newstruct`|新しいユーザー定義型を作成します。|
|`terralib.linklibrary`|ファイルfilenameにある動的ライブラリを読み込みます|
|`terralib.linkllvm`|LLVMビットコードファイルfilenameを.bc拡張子でリンク|

実験的機能:

|名前|説明|
|---|---|
|`terralib.types.pointer`|&typの代替で、LLVMアドレス空間を指定することが可能です。非ゼロアドレス空間の意味はターゲット固有です。|
|`terralib.fence`|フェンス操作を発行します。指定した属性によって、フェンスを境にした原子命令の順序変更を防ぎます。この操作の意味はLLVMによって決まります。|
|`terralib.cmpxchg`|アドレスaddrでの原子比較交換（cmpxchg）操作を実行します。addrの値がcmpと同じ場合、newの値が書き込まれます。違う場合、値は変更されません。addrの元の値と交換が成功したかどうかを示すブール値のタプルを返します。|
|`terralib.atomicrmw`|addrのアドレスでvalue値と演算子opを使用した原子読み書き操作（RMW）を実行します。操作は原子的に行われます。addrの元の値を返します。|

Terraコードの読み込み:

|名前|説明|
|---|---|
|`terralib.load`|C APIのterra_loadと同等のLua関数です。readerfnはLuaのload関数と同じ動作をします。|
|`terralib.loadstring`|C APIのterra_loadstringと同等のLua関数です。|
|`terralib.loadfile`|C APIのterra_loadfileと同等のLua関数です。|
|`require`|Terraコードモジュールmodulenameを読み込みます|

コンパイルAPI:

|名前|説明|
|---|---|
|`terralib.saveobj`|Terraコードを外部ファイル形式（オブジェクトファイルや実行ファイルなど）に保存します|
|`terralib.newtarget`|ターゲットオブジェクトを作成|

デバッグ:

|名前|説明|
|---|---|
|`terralib.currenttimeinseconds`|過去のある時点からの経過時間を秒で返す|
|`terralib.traceback`|Terraコードから呼び出してスタックトレースを出力する|
|`terralib.backtrace`|低レベルのインターフェースで、マシンスタックからリターンアドレスを取得します|
|`terralib.disas`|命令の逆アセンブルを出力|
|`terralib.lookupsymbol`|任意の命令のポインタipを基に、Terra関数に関する情報を検索しようと試みます|
|`terralib.lookupline`|Terra命令に関する情報を検索しようと試みます|
|`terralib.overloadedfunction`|オーバーロード関数を作成する|
|`terralib.includecstring`|文字列codeをCコードとしてインポート|

## 関数 (func:*)

|名前|説明|
|---|---|
|`func:isdefined`|関数に定義が存在する場合はtrueを返す|
|`func:adddefinition`||
|`func:resetdefinition`||
|`func:isextern`||
|`func:printstats`||
|`func:disas`||
|`func:printpretty`||
|`func:compile`||
|`func:gettype`||
|`func:getpointer`||
|`func:getname`||
|`func:setname`||
|`func:setinlined`||
|`func:setoptimized`||
|`func:setcallingconv`||

## オーバーロード関数

|名前|説明|
|---|---|
|`overloaded_func:adddefinition`|メソッドを追加する|
|`overloaded_func:getdefinitions`|関数の定義のリストを返す|

## 型 (type:*)

|名前|説明|
|---|---|
|`vector`||
|`struct`||
|`tuple`||
|`type:isprimitive`|プリミティブ型ならtrueを返す|
|`type:isintegral`|整数型であればtrueを返します。|
|`type:isfloat`|floatまたはdoubleであればtrueを返します。|
|`type:isarithmetic`|整数型または浮動小数点型であればtrueを返します。|
|`type:islogical`|boolであればtrueを返します（将来的に、ベクトル命令内のフラグに近いサイズのブール型をサポートする予定）。|
|`type:canbeord`|orおよびand演算に使用できる場合（つまり整数型や論理型だが浮動小数点型ではない場合）、trueを返します。|
|`type:ispointer`|ポインタであればtrueを返します。type.typeは指している型です。|
|`type:isarray`|配列であればtrueを返します。type.Nは長さを、type.typeは要素の型を表します。|
|`type:isfunction`|関数（関数ポインタではない）であればtrueを返します。type.parametersはパラメータ型のリスト、type.returntypeは戻り値の型です。複数の値を返す関数の場合、戻り値の型はその値のtupleになります。|
|`type:isstruct`|構造体であればtrueを返します。|
|`type:ispointertostruct`|構造体へのポインタであればtrueを返します。|
|`type:ispointertofunction`|関数へのポインタであればtrueを返します。|
|`type:isaggregate`|配列または構造体であればtrueを返します（任意の型を保持できる型です）。|
|`type:iscomplete`|完全に定義され、コードで使用できる状態であればtrueを返します。非集約型では常にtrueです。集約型の場合、その内部に含まれるすべての型が定義されていればtrueとなります。type:complete()を呼び出すと強制的に型が完全になります。|
|`type:isvector`|ベクトルであればtrueを返します。type.Nは長さ、type.typeは要素の型です。|
|`type:isunit`|空のタプルであればtrueを返します。空のタプルは、戻り値を持たない関数の戻り値型としても使用されます。|
|`type:complete`|型を強制的に完全にします。構造体の場合、構造体のレイアウトを計算し（定義されていれば__getentriesや__staticinitializeを呼び出します）、この型が参照するすべての型を再帰的に完全にします。|
|`type:printpretty`|型を出力し、構造体の場合はそのメンバーも含めて表示します。|

## クォート (quoteobj:*)

|名前|説明|
|---|---|
|`quoteobj:gettype`|Terra型を返します。|
|`quoteobj:astype`|Terra型オブジェクトとして解釈しようとします。通常、型を引数として受け取るマクロで使用されます（例：sizeof([&int])）。この関数は、quoteオブジェクトを型に変換します（例：&int）。|
|`quoteobj:islvalue`|代入の左辺（l-value）として使用可能であればtrueを返します。|
|`quoteobj:asvalue`|単純なLua値として解釈しようとします。通常、定数を引数として受け取るマクロで使用されます。特定の値のみで動作し、Constant式として利用可能な場合に限られます。生成コードに複雑なデータ構造を渡す場合、マクロよりもエスケープを使用することを検討してください。|
|`quoteobj:printpretty`|コードの視覚表現を出力します。引用句は関数に挿入されるまで型チェックが行われないため、関数の型なしの表現が出力されます。|

## シンボル (symbol)

|名前|説明|
|---|---|
|`symbol`|新しいシンボルを作成する|

## グローバル変数 (globalvar:*)

|名前|説明|
|---|---|
|`global`|型typeと初期値initで新しいグローバル変数を作成します|
|`globalvar:getpointer`|メモリ内でこのグローバル変数へのポインタであるctypeオブジェクトを返します（型を完了する）|
|`globalvar:get`|値をLuaJITのctypeオブジェクトとして取得します（型を完了する）|
|`globalvar:set`|指定した値をグローバル変数に設定する（型を完了する）|
|`globalvar:setname`|デバッグ名を設定する（グローバル変数の動作には影響しない）|
|`globalvar:getname`|デバッグ名を取得する（グローバル変数の動作には影響しない）|
|`globalvar:gettype`|Terra型を取得します|
|`globalvar:setinitializer`|初期化式を設定または変更します。グローバル変数がコンパイルされる前にのみ有効です。例えば、クラスのvtableを格納するグローバル変数の場合、クラスにメソッドを追加するたびに値を追加することができます。|

## 定数

|名前|説明|
|---|---|
|`constant`|新しい定数を作成する|

## ラベル

|名前|説明|
|---|---|
|`label`|新しいラベルを作成する|

## マクロ

|名前|説明|
|---|---|
|`macro`|新しいマクロを作成する|

## LLVM

|名前|説明|
|---|---|
|`llvmobj:extern`||