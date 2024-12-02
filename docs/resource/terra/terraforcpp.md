# C/C++プログラマー向けのTerra-Lua対応表

TerraのセマンティクスはC/C++に非常に近いですが、Luaとの密接な統合のために、同じ内容でも異なる方法で記述される場合があります。このクイックリファレンスシートでは、C++のコードスニペットと、それに相当するLua-Terraのスニペットを並べて表示し、Terraでのプログラミング方法を学びやすくしています。必要に応じて、メタプログラミングの構文も第3の列で示します。

この内容は、[C++クイックリファレンス](https://web.archive.org/web/20170304111933/http://www.pa.msu.edu/~duxbury/courses/phy480/Cpp_refcard.pdf)に基づいています。他に追加したい例があれば、Pull Requestを送ってください。

[[TOC]]

## 文脈

::: code-group

```cpp [C++]
// 関数/グローバル宣言の文脈:
typedef int MyInt;
MyInt x;

int f() {
    // C++コードの文脈:
    MyInt bar = x + 1;
//  ~~~~~ C++型の文脈

    return bar;
}

struct S {
    // 構造体定義の文脈:
    int a;
 // ~~~ 型の文脈
    float b;
};
```

```lua [Lua/Terra]
-- Lua文脈 (ここでは任意のLuaコードが書ける)
MyInt = int -- Lua変数 'MyInt' への代入
x = global(MyInt)

terra f()
    -- Terra文脈
    var bar : MyInt = x + 1
    --        ~~~~~ _Lua_ 文脈, ここでは任意のLuaコードが記述可能
    -- ただし、それがTerra型として評価される必要がある
    return bar
end

struct S {
    a : int
    --  ~~~ _Lua_ 文脈, Terra型として評価される
    b : float
}

-- メタプログラミングによるLua-Terraは、
-- 追加で文脈が変わる箇所を作り出します。

function g() return `4+5 end
--                  ~~~~ Terra文脈, クォートは
--                       LuaからTerra式を生成する

terra h()
    var baz = [ g() ]
    --        ~~~~~~~ Lua文脈, エスケープは
    --  Luaに入り、Terra式として評価される
end
```

::: 

## プリプロセッサ

### 複数ファイルの使用

::: code-group

```cpp [C++]
#include "myfile.h"

void f() {
    myfunction();
}
```

```lua [Lua/Terra]
local myfile = require("myfile")
-- Luaのrequireを使って他のLuaファイルを読み込む
-- Terra関数はテーブルmyfileに格納できる
terra f()
    myfile.myfunction()
end
```

:::

### C関数の使用

::: code-group

```cpp [C++]
#include <stdio.h>
#include <malloc.h>
int main() {
    printf("hello, world\n");
}
```

```lua [Lua/Terra]
local C = terralib.includecstring [[
    #include<stdio.h>
    #include<malloc.h>
]]
-- 単一のファイルには terralib.includec("stdio.h") を使用可能
-- Cは関数 (例: C.printf) や型 (例: C.FILE) を格納するテーブル
...
terra hello()
    C.printf("hello, world\n")
end
```

:::

### プリプロセッサマクロの等価

::: code-group

```cpp [C++]
#define X (3+3)
```

```lua [Lua/Terra]
local X = `3+3
-- Lua変数はTerra関数内で置き換え可能な値を保持できる
-- クォート (`) によりLuaから直接Terra式を生成
```

:::

### マクロ関数

::: code-group

```cpp [C++]
#define F(a,b) a + b
```

```lua [Lua/Terra]
local F = macro(function(a,b)
    return `a + b
end)
```

:::

### 条件付きコンパイル

::: code-group

```cpp [C++]
// #ifdef を使用して関数の定義を制御
#ifdef __WIN32
    char * getOS() { return "Windows"; }
#else
    char * getOS() { return "Linux"; }
#endif
```

```lua [Lua/Terra]
-- Luaを使用してTerra関数の定義を制御
if terralib.os == "Windows" then
    terra getOS() return "Windows" end
else
    terra getOS() return "Linux" end
end
```

:::

## リテラル

::: code-group

```cpp [C++]
255, 0377, 0xff
2147483647LL, 0x7ffffffful
123.0, 1.23e2
"strings\n"
'a'
"hello" "world"
true, false // ブーリアン
```

```lua [Lua/Terra]
255, 0377, 0xff
2147483647LL, 0x7fffffffULL -- long数値のリテラルはLuaJITに準拠
123.0, 1.23e2 
"strings\n" または 'strings\n' または [[strings\n]] -- Lua文字列に対応
("a")[0] -- char用の組み込みリテラルはないので、文字列をインデックス化する（または関数を作成）
[ "hello".."world" ] -- Luaにエスケープして文字列を連結
true, false
```

:::

## 宣言と型コンストラクタ

### 変数の宣言

::: code-group

```cpp [C++]
void f() {
    int x;
    int y = 255;
    auto z = 255;
}
```

```lua [Lua/Terra]
terra f() {
    var x
    var y : int = 255
    var z = 255
end
```

```lua [Meta-programmed]
x = symbol(int)
y = symbol(int)
z = symbol(int)
local zdeclare = quote 
  var [z] = 255
end
terra f() 
    var [x]
    var [y]
    [zdeclare]
    return x + y + z
end
```

:::

### 整数型のサイズ指定

::: code-group

```cpp [C++]
short s; long l;
```

```lua [Lua/Terra]
var s : int16, l : int64
```

:::

### 非整数の基本型

::: code-group

```cpp [C++]
char c = 'a'; 
float f; double d; 
bool b;
```

```lua [Lua/Terra]
var c : int8 = ('a')[0] 
var f : float, d : double 
var b : bool
```

:::

### 複数宣言

::: code-group

```cpp [C++]
int a = 1, b = 2, c = 3;
```

```lua [Lua/Terra]
var a : int, b : int, c : int = 1, 2, 3
```

:::

### 配列

::: code-group

```cpp [C++]
int a[10];
int a[] = {0, 1, 2};
float a[] = {0, 1, 2};
int a[2][3] = { {1, 2, 3}, {4, 5, 6} }; 
```

```lua [Lua/Terra]
var a : int[10];
var a : int[3] = array(0, 1, 2)
-- 'array' は式であり、
-- C++のような初期化子ではない
var a = arrayof([float], 0, 1, 2) 
-- arrayofを使用して、初期化に使用する式とは異なる型を指定
var a : (int[3])[2] = array(array(1, 2, 3), array(4, 5, 6)); 
```

:::

### ポインタ

::: code-group

```cpp [C++]
int* p; 
char * s = "hello";
void* p = NULL;
```

```lua [Lua/Terra]
var p : &int 
-- '&' は「アドレス」を意味し、&int は「int型のアドレス」
var s : rawstring = "hello" 
-- rawstring は &int8 と等価
var p : &opaque = nil
-- opaque はポインタ内のvoidを置き換える
```

:::

::: code-group

```cpp [C++]
Vec3& r = v;
r.x
```

```lua [Lua/Terra]
var r : &Vec3 = &v
-- 参照 (references) は存在しない
r.x
-- '.' はポインタの '->' と同じように機能
```

:::

### タイプ定義 (typedef)

::: code-group

```cpp [C++]
typedef String char*;
```

```lua [Lua/Terra]
local String = &int8 
-- typedefはLuaでは単なる代入
-- Terra型はLua値であるため
```

:::

### Const

::: code-group

```cpp [C++]
const int c = 3;
```

```lua [Lua/Terra]
var c = 3
-- constは変数に対して存在しない
```

:::

### 列挙型 (Enum)

::: code-group

```cpp [C++]
enum weekend {SAT, SUN};
weekend f() {
    return SAT;
}
```

```lua [Lua/Terra]
-- Terraには列挙型が存在しないため、メタプログラミングで再現
local function Enum(...)
    local t = { type = int }
    for i, name in ipairs({...}) do
        -- C++に合わせて0ベースに設定
        t[name] = i - 1
    end
    return t
end
weekend = Enum("SAT", "SUN")
terra f() : weekend.type
    return weekend.SAT
end
```

:::

## グローバル変数

::: code-group

```cpp [C++]
int x = 3;
const int x = 3;
int x[] = { 3, 4, 5 };
const int x[] = { 3, 4, 5 };
void f() {
}
```

```lua [Lua/Terra]
-- Lua関数はTerra定数を構築する
x = global(int)
x = constant(int, 3)
x = global(int, `array(3, 4, 5))
x = constant(int, `array(3, 4, 5))
terra f()
end
```

```lua [Meta-programmed]
-- 定数のテーブルを作成可能
sin_values = {}
N = 32
for i = 1, N do
    sin_values[i] = 
        math.sin(2 * math.pi * (i - 1) / N)
end
-- 定数テーブルをコード内に埋め込み
sin_table = constant(`arrayof(float, sin_values))
```

:::

## 記憶クラス (Storage Classes)

::: code-group

```cpp [C++]
int x;
static int y;

static void g() {
    return x + y;
}
void f() {
    static int z = 0;
    return g();
}
extern int w;
```

```lua [Lua/Terra]
-- 'saveobj' コールで公開/非公開シンボルを指定
x = global(int)
y = global(int)

terra g() 
    return x + y
end
terra f()
    return g()
end
-- x と f のみがシンボルとして公開される
-- ただし y と g は内部的に含まれる（使用されているため）
terralib.saveobj("out.o", { x = x, f = f}) 
```

:::

::: code-group

```cpp [C++]
void f() {
    static int z = 0;
    return z;
}
```

```lua [Lua/Terra]
-- 関数内変数の'direct static' 相当は存在しない
-- ただし Lua の 'do' と 'end' を使用して
-- グローバルの字句スコープを制御可能
do
    local z = global(int, 0)
    terra f()
        return z
    end
end
```

:::

## 文 (Statements)

### 代入

::: code-group

```cpp [C++]
x = y;
x += y;
```

```lua [Lua/Terra]
x = y
x = x + y -- Luaでは '+=’ のような演算子は存在しない
```

:::

### 宣言

::: code-group

```cpp [C++]
int x;
```

```lua [Lua/Terra]
var x : int
```

:::

### セミコロン

::: code-group

```cpp [C++]
x = y; y = z;
```

```lua [Lua/Terra]
-- 明確にするためにオプションで使用可能
x = y; y = z;
```

:::

### ブロック

::: code-group

```cpp [C++]
void f() {
    {
        printf("hi\n");
        printf("hi\n");
        printf("hi\n");
    }
}
```

```lua [Lua/Terra]
terra f()
    do
        C.printf("hi\n")
        C.printf("hi\n")
        C.printf("hi\n")
    end
end
```

```lua [Meta-programmed]
local stats = { 
    `C.printf("hi\n"),
    `C.printf("hi\n"),
    `C.printf("hi\n")
}
terra f()
    do
        [stats]
    end
end
```

:::

### 条件分岐

::: code-group

```cpp [C++]
if (x) { <statements> }
else if (y) { <statements> }
else { <statement> }
```

```lua [Lua/Terra]
if x then <statements> 
elseif y then <statements>
else <statements> end
```

:::

### ループ

::: code-group

```cpp [C++]
while(x) {
    <statements>
}
```

```lua [Lua/Terra]
while x do 
    <statements>
end
```

:::

::: code-group

```cpp [C++]
for(x; y; z;) { 
    <statements>
}
```

```lua [Lua/Terra]
x; 
while y do 
    <statements>
    z; 
end
```

:::

::: code-group

```cpp [C++]
for(int i = 0; i < 100; i++) {
    <statements>
}
```

```lua [Lua/Terra]
for i = 0, 100 do 
    -- 注意: [0, 100) の範囲
    <statements>
end 
```

:::

::: code-group

```cpp [C++]
do { 
    <statements>
} while(b);
```

```lua [Lua/Terra]
repeat 
    <statements>
until ~b
```

:::



### スイッチ (Switch)

::: code-group

```cpp [C++]
switch(x) {
    case X1: a;
    case X2: b;
    default: c;
}
```

```lua [Lua/Terra]
switch x do
    case X1 then a
    case X2 then b
else
    c
end
```

:::



### 制御構造 (Control Flow)

::: code-group

```cpp [C++]
break;
return;
```

```lua [Lua/Terra]
break
return
-- 注意: break/return は
-- ブロックの終端である必要がある
```

:::



### 例外 (Exceptions)

::: code-group

```cpp [C++]
try { x; }
```

```lua [Lua/Terra]
-- Terraでは例外はサポートされていないため、複雑さを回避
```

:::



## 関数

### 関数の定義

::: code-group

```cpp [C++]
int f(int x, int y) { 
    return x + y; 
}
```

```lua [Lua/Terra]
terra f(x : int, y : int): int 
    -- :int 戻り値の型は任意
    -- 再帰しない関数では省略可能
    return x + y 
end
```

```lua [Meta-programmed]
local args = {symbol(int), symbol(int)}
terra f([args])
    var s = 0
    escape
        for _, a in ipairs(args) do
            emit quote
                s = s + a
            end
        end
    end
    return s
end
```

:::

::: code-group

```cpp [C++]
void f() {
} // 戻り値なし
```

```lua [Lua/Terra]
terra f() : {} -- 空のタプルはvoidを意味する
end
```

:::



### 関数の宣言

::: code-group

```cpp [C++]
int f(int x, int y);
void g();
```

```lua [Lua/Terra]
terra f :: {int, int} -> int
--         ~~~~~~~~~~~~~~~~ 関数の型
terra g :: {} -> {}
           ~~    ~~ 空のタプルはvoid/引数なしを意味
```

```lua [Meta-programmed]
local args = {int, int}
local ret = int
local type = args -> ret
local void = {} -> {}
terra f :: type
terra g :: void
```

:::


### インライン化 (Inlining)

::: code-group

```cpp [C++]
inline void f();
```

```lua [Lua/Terra]
f :: {} -> {}
f:setinlined(true) 
-- 実際には __alwaysinline__ と同等
```

:::



### 演算子 (Operators)

::: code-group

```cpp [C++]
struct T {};
T operator+(T x, T y) {
}
```

```lua [Lua/Terra]
struct T {}
terra T.metamethods.__add(x : T, y : T)
end 
-- 常に左辺型 'T' に関連付けられる
```

:::



### オーバーロード (Overloading)

::: code-group

```cpp [C++]
int max(int a, int b) {
    return (a > b) ? a : b;
}
float max(float a, float b) {
    return (a > b) ? a : b;
}
```

```lua [Lua/Terra]
max = terralib.overloadedfunction("max" { 
    terra(a : int, b : int) 
        return terralib.select(a > b, a, b)
    end,
    terra(a : float, b : float) 
        return terralib.select(a > b, a, b)
    end
})
```



## 式 (Expressions)

C++と基本的に同じ意味論:  
クイックリファレンスより「演算子は優先順位でグループ化され、最高優先順位から始まる。単項演算子と代入は右から左、その他は左から右に評価される。優先順位は評価の順序に影響を与えない（未定義）。配列の範囲外、無効なポインタなどのランタイムチェックは存在しない。」



### 名前空間の操作

::: code-group

```cpp [C++]
namespace N {
    void f() {}
}
void g() {
    N::f()
}
```

```lua [Lua/Terra]
local N = {}
N.f = terra() end

terra g()
    N.f()
end
-- N は単なる Lua テーブル
-- Terraコード内では N.f は N["f"] に置き換えられる
```

:::



### ポインタとメンバー

::: code-group

```cpp [C++]
&x
*p
t.x

p->x
```

```lua [Lua/Terra]
&x
@p
t.x

p.x -- '.' は '->' のように動作
```

```lua [Meta-programmed]
&[<luaexp>]
@[<luaexp>]
t.[("xyz"):sub(1,1)]
--~~~~~~~~~~~~~~~~~ 任意のLua式 (文字列を結果とする)
p.["x"]
--~~~~~ 同様
```

:::



### 配列のインデックスと関数呼び出し

::: code-group

```cpp [C++]
void g(int* a, int i, T t) {
    a[i]
    f(x, y)
    t(x, y)
}
```

```lua [Lua/Terra]
terra g(a : &int, i : int, t : T)
    a[i]
    f(a, i)
    t(a, i)
end
```

```lua [Meta-programmed]
local 
terra g(a : &int, i : int, t : T)
    a[i]
    escape
        local args = { a, i }
        emit quote
            f([args])
            t([args])
        end
    end
end
```

:::



### 更新操作 (Updates)

::: code-group

```cpp [C++]
x++, ++x
x--, --x
```

```lua [Lua/Terra]
-- 存在しない
-- ステートメントを使用
x = x + 1
```

:::



### ランタイム型情報 (RTTI)

::: code-group

```cpp [C++]
typeid(x)
dynamic_cast<T>(x)
```

```lua [Lua/Terra]
-- 組み込みの相当機能はなし、自作可能
local nextid = 0
local function addtypeid(T)
    T.entries:insert(1, { "_typeid", int })
    T.metamethods._typeid = nextid
    terra T:init()
        self._typeid = nextid
    end
    nextid = nextid + 1
end

terra typeid(v : &opaque)
    -- 最初のメンバーを抽出
    var typeid = @[&int](v)
    return typeid
end

local function dynamic_cast(T)
    local tid = T.metamethods._typeid
    return terra(v : &opaque)
        var id = typeid(v)
        if id == tid then
            return [&T](v)
        end
        return nil
    end
end
dynamic_cast = terralib.memoize(dynamic_cast)

struct A { 
    a : int
}
struct B {
    a : float
}
addtypeid(A)
addtypeid(B)

C = terralib.includec("stdio.h")

terra f(v : &opaque)
    var a = [dynamic_cast(A)](v)
    var b = [dynamic_cast(B)](v)
    if a ~= nil then
        C.printf("A\n")
    elseif b ~= nil then
        C.printf("B\n")
    end
end

terra g()
    var a : A
    var b : B
    a:init()
    b:init()
    f(&a)
    f(&b)
end
```

:::



### キャスト (Casts)

::: code-group

```cpp [C++]
(T) x
(T*) x
```

```lua [Lua/Terra]
[T](x)
[&T](x)
-- Terra型 'T' を関数のように適用している
-- '&T' のような型コンストラクタはLua式であるため
-- 一般的にエスケープ '[T]' を使用する必要がある
```

```lua [Meta-programmed]
local PT = &int
terra f(a : &opaque) : PT
    return PT(a)
end
```

:::



### サイズ取得 (Sizeof)

::: code-group

```cpp [C++]
sizeof(T)
sizeof(t)
```

```lua [Lua/Terra]
sizeof(T)
sizeof([(`t):gettype()])
```

:::



### メモリ確保 (Allocation)

::: code-group

```cpp [C++]
new T //malloc, use a std.t metatype, or build your own
```

```lua [Lua/Terra]
[&T](C.malloc(sizeof(T)))
```

:::

### 算術演算子 (Arithmetic)

::: code-group

```cpp [C++]
-x
+x //存在しない
x * y
x / y
x % y
x + y 
x - y
```

```lua [Lua/Terra]
-x
x -- '+' のプレフィックスはない
x * y
x / y
x % y
x + y -- ポインタにも対応
x - y -- ポインタにも対応
```

```lua [Meta-programmed]
local plus = "+"
terra two()
    return operator(plus, 1, 2)
end
```

:::



### 比較演算子 (Comparisons)

::: code-group

```cpp [C++]
x < y
x <= y
x > y
x >= y
x == y
x != y
```

```lua [Lua/Terra]
x < y
x <= y
x > y
x >= y
x == y
x ~= y
```

:::



### 論理およびビット演算子 (Logical and Bitwise Operators)

::: code-group

```cpp [C++]
~x
```

```lua [Lua/Terra]
not x -- 整数のビット単位反転
```

:::

::: code-group

```cpp [C++]
!x
```

```lua [Lua/Terra]
not b -- ブール値の論理否定
```

:::

::: code-group

```cpp [C++]
x << y
x >> y
```

```lua [Lua/Terra]
x << y
x >> y
```

:::

::: code-group

```cpp [C++]
x && y
x || y
```

```lua [Lua/Terra]
b and d -- ブール値の論理 'and'
b or d -- 短絡評価 (short circuits)
```

:::

::: code-group

```cpp [C++]
x & y
x | y
```

```lua [Lua/Terra]
x and y -- 整数のビット単位 'and'
x or y  -- 短絡評価なし
```

:::

::: code-group

```cpp [C++]
x ^ y
```

```lua [Lua/Terra]
x ^ y
```

:::



### その他 (Other Stuff)

::: code-group

```cpp [C++]
x ? y : z
```

```lua [Lua/Terra]
terralib.select(x, y, z) -- 短絡評価なし
```

:::

::: code-group

```cpp [C++]
throw x; // 例外はない。longjmp, setjmpの使用を検討
```

```lua [Lua/Terra]
-- 例外はなし
-- longjmp, setjmp の使用を検討
```

:::



### テンプレート (Templates)

::: code-group

```cpp [C++]
// 全ての型に対して f をオーバーロード
template <class T> 
T f(T t) {
}
```

```lua [Lua/Terra]
function f(T)
    return terra(t : T) : T
    end
end
-- ユニークな 'T' ごとに1つの関数のみ生成
f = terralib.memoize(f)
```

:::

::: code-group

```cpp [C++]
// 型パラメータ T を持つクラス
template <class T> 
class X { 
  T myt;
  void foo(T t) {
    myt = t;
  } 
};
```

```lua [Lua/Terra]
function X(T)
    local struct X {
        myt : T
    }
    terra X:foo(t : T)
        self.myt = t
    end
    return X
end
-- ユニークな 'T' ごとに1つの構造体のみ生成
X = terralib.memoize(X)
```

:::

::: code-group

```cpp [C++]
// "int型のX" オブジェクト
X<int> x;
```

```lua [Lua/Terra]
var x : X(int)
```

:::


### 名前空間 (Namespaces)

::: code-group

```cpp [C++]
namespace N {class T {};}
```

```lua [Lua/Terra]
N = {} -- Luaテーブル
struct N.T {}

```

```lua [Meta-programmed]
N = {}
local struct mystruct {}
N["T"] = mystruct
```

:::

::: code-group

```cpp [C++]
// 名前空間N内のTを使用
N::T t;
```

```lua [Lua/Terra]
-- テーブルN内のTにアクセス
var t : N.T
```

```lua [Meta-programmed]
local key = "T"
terra f()
    var t : N[key]
end
```

:::

::: code-group

```cpp [C++]
using N::T;
```

```lua [Lua/Terra]
local T = N.T
```

:::

::: code-group

```cpp [C++]
using namespace N;
```

```lua [Lua/Terra]
-- グローバル環境にNをマージ
for name, value in pairs(N) do
    _G[name] = value
end
```

:::



### Cライブラリの使用

::: code-group

```cpp [C++]
int main() {
    printf("hello, world\n")
}
```

```lua [Lua/Terra]
C = terralib.includec("stdio.h")
terra main()
    C.printf("hello, world\n")
end
```

:::

::: code-group

```cpp [C++]
int * a = (int*)malloc(10*sizeof(int))
```

```lua [Lua/Terra]
var a = [&int](malloc(10 * sizeof(int)))
```

:::



### オフラインコンパイラの使用

::: code-group

```cpp [C++]
int main() {
}
-- shell
$ cc -o main.o main.cpp
```

```lua [Lua/Terra]
terra main()
end
terralib.saveobj("main.o", 
    { main = main })
--   ~~~~~~~~~~~~~~~ エクスポートされる関数のテーブル
```

:::

::: code-group

```cpp [C++]
$ cc -o main -lfoo main.cpp
```

```lua [Lua/Terra]
terralib.saveobj("main",
    { main = main }, {"-lfoo"})
--                  ~~~~~~~~~
--                  追加のリンカ引数
```

:::

::: code-group

```cpp [C++]
$ cc -shared -o libmain.so main.cpp
```

```lua [Lua/Terra]
terralib.saveobj("libmain.so",
    { main = main })
```

:::



### Cライブラリ

::: code-group

```cpp [C++]
#include <mylib.h>
int main() {
    mylib_myfunction();
}
-- shell:
$ cc -I mylibinclude main.cpp libmylib.so -o main -
```

```lua [Lua/Terra]
terralib.includepath = "mylibinclude;" .. terralib.includepath
C = terralib.includec("mylib.h")
terralib.linklibrary("libmylib.so")
terra main()
    C.mylib_myfunction()
end
-- またはオフライン用:
terralib.saveobj("main", { main = main },
    {"libmylib.so"})
--  ~~~~~~~~~~~~~~~ 追加のリンカ引数
```

:::

