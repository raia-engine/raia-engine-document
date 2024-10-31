# Terra-Lua Equivalents for C/C++ Programmers

The semantics of Terra are very close to C/C++, but because of its close integration with Lua, the same things might be written a different way. This quick reference sheet shows C++ snippets with equivalent Lua-Terra snippets to make it easier to learn how to program in Terra. A third column shows how to meta-program constructs when applicable.

Content based on <a href="http://www.pa.msu.edu/~duxbury/courses/phy480/Cpp_refcard.pdf">C++ Quick Reference</a> Add a pull request want an additional example that isn't shown here.

## Contexts

::: code-group

```cpp [C++]
// function/global declaration context:
typedef int MyInt;
MyInt x;

int f() {
    // C++ code context:
    MyInt bar = x + 1;
//  ~~~~~ C++ type context

    return bar;
}

struct S {
    // struct definition context:
    int a;
 // ~~~ type context
    float b;
};
```

```lua [Lua/Terra]
-- Lua context (any Lua code here)
MyInt = int -- assignment to Lua variable 'MyInt'
x = global(MyInt)

terra f()
    -- Terra context
    var bar : MyInt = x + 1
    --        ~~~~~ _Lua_ context, any Lua can go here,
    --  but it needs to evaluate to a Terra type
    return bar
end

struct S {
    a : int
    --  ~~~ _Lua_ context, evaluates to a Terra type
    b : float
}

-- Meta-programming Lua-Terra creates additional places
-- where the context changes.

function g() return `4+5 end
--                  ~~~~ Terra context, a quote creates a 
--                       Terra expression from Lua

terra h()
    var baz = [ g() ]
    --        ~~~~~~~ Lua context, an escape breaks
    --  into Lua and evaluates to a Terra expression
end
```

:::

## Preprocessor

### Using multiple files

::: code-group

```cpp [C++]
#include "myfile.h"

void f() {
    myfunction();
}
```

```lua [Lua/Terra]
local myfile = require("myfile")
-- use Lua's require to load another Lua file
-- Terra functions can be stored in a table myfiles
terra f()
    myfile.myfunction()
end
```

:::

### Using C functions

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
    #include<malloc.h
]]
-- can also use terralib.includec("stdio.h") for single file
-- C is a table of functions (C.printf) and types (C.FILE)
...
terra hello()
    C.printf("hello, world\n")
end
```

:::

### Preprocessor Macro Equivalents

::: code-group

```cpp [C++]
#define X (3+3)
```

```lua [Lua/Terra]
local X = `3+3
-- Lua variables can hold values that get substituted into Terra functions
-- the quotation (`) creates a Terra expression directly from Lua
```

:::

### Macro functions

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

### Conditional Compilation

::: code-group

```cpp [C++]
// Use #ifdef to control how functions are defined
#ifdef __WIN32
    char * getOS() { return "Windows"; }
#else
    char * getOS() { return "Linux"; }
#endif
```

```lua [Lua/Terra]
-- use Lua to control how a Terra function is defined
if terralib.os == "Windows" then
    terra getOS() return "Windows" end
else
    terra getOS() return "Linux" end
end
```

:::

## Literals

::: code-group

```cpp [C++]
255, 0377, 0xff
2147483647LL, 0x7ffffffful
123.0, 1.23e2
"strings\n"
'a'
"hello" "world"
true, false // booleans
```

```lua [Lua/Terra]
255, 0377, 0xff
2147483647LL, 0x7fffffffULL -- these match LuaJIT literals for long numbers
123.0, 1.23e2 
"strings\n" or 'strings\n' or [[strings\n]] -- match Lua strings
("a")[0] -- no built in literal for char, so index a string (or make a function that )
[ "hello".."world" ] -- escape to Lua and concat the strings there
true, false
```

:::

## Declarations and Type Constructors

### Declaring variables

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

### Sizing integer types

::: code-group

```cpp [C++]
short s; long l;
```

```lua [Lua/Terra]
var s : int16, l : int64
```

:::

### Non-integer primitive types

::: code-group

```cpp [C++]
char c = 'a'; 
float f; double d; 
bool b;
```

```lua [Lua/Terra]
var c : int8 = ('a')[0] 
var f :float, d : double 
var b : bool
```

:::

### Multiple Declarations

::: code-group

```cpp [C++]
int a = 1,b = 2,c = 3;
```

```lua [Lua/Terra]
var a : int,b : int,c : int = 1,2,3
```

:::

### Arrays

::: code-group

```cpp [C++]
int a[10];
int a[]={0,1,2};
float a[]={0,1,2};
int a[2][3]={ {1,2,3},{4,5,6} }; 
```

```lua [Lua/Terra]
var a : int[10];
var a : int[3] = array(0,1,2)
-- 'array' is an expression
-- not an initializer like C++
var a = arrayof([float],0,1,2) 
-- use arrayof to specify a type different
-- from the expressions used to initialize it
var a : (int[3])[2] = array(array(1,2,3),array(4,5,6)); 
```

:::

### Pointers

::: code-group

```cpp [C++]
int* p; 
char * s ="hello";
void* p = NULL;
```

```lua [Lua/Terra]
var p : &int 
-- read & as 'address of', so &int is an 'address of int'
var s : rawstring = "hello" 
-- rawstring == &int8 
var p : &opaque = nil
-- opaque replaces void in pointers
```

:::


::: code-group

```cpp [C++]
Vec3& r = v;
r.x
```

```lua [Lua/Terra]
var r : &Vec3 = &v
-- references do not exist
r.x
-- instead '.' works like -> on pointers
```

:::

### Typedefs

::: code-group

```cpp [C++]
typedef String char*;
```

```lua [Lua/Terra]
local String = &int8 
-- typedefs are just assignments in Lua
-- because Terra types are Lua values
```

:::

### Const

::: code-group

```cpp [C++]
const int c = 3;
```

```lua [Lua/Terra]
var c = 3
-- const doesn't exist for variables
```

:::

### Enum

::: code-group

```cpp [C++]
enum weekend {SAT,SUN};
weekend f() {
    return SAT
}
```

```lua [Lua/Terra]
-- doesn't exist, replicate it with meta-programming
local function Enum(...)
    local t = { type = int }
    for i,name in ipairs({...}) do
         -- make 0-based to match C++
        t[name] = i - 1
    end
    return t
end
weekend = Enum("SAT","SUN")
terra f() : weekend.type
    return weekend.SAT
end
```

:::

## Globals

::: code-group

```cpp [C++]
int x = 3;
const int x = 3;
int x[] = { 3,4, 5};
const int x[] = { 3,4,5};
void f() {
}

```

```lua [Lua/Terra]
-- Lua functions construct
-- Terra constants
x = global(int)
x = constant(int,3)
x = global(int,`array(3,4,5))
x = constant(int,`array(3,4,5))
terra f()
end
```

```lua [Meta-programmed]
-- you can create tables of constants
sin_values = {}
N = 32
for i = 1,N do
    sin_values[i] = 
        math.sin( 2 * math.pi * (i-1)/N))
end
-- constant table of sin values embedded in code
sin_table = constant(`arrayof(float,sin_values))
```

:::

## Storage Classes

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
-- exposed/private symbols are specified 
-- by the 'saveobj' call
x = global(int)
y = global(int)

terra g() 
    return x + y
end
terra f()
    return g()
end
-- only x and f are exposed as symbols
-- but y and g will be included internally 
-- since they are used
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
-- no direct 'static' equivalent
-- for function variables
-- but you can control the
-- lexical scope of globals
-- using Lua 'do' and 'end'
do
    local z = global(int,0)
    terra f()
        return z
    end
end
```

## Statements

### Assignments

::: code-group

```cpp [C++]
x = y;
x += y;
```

```lua [Lua/Terra]
x = y
x = x + y -- no += like Lua
```

:::

### Declarations

::: code-group

```cpp [C++]
int x;
```

```lua [Lua/Terra]
var x : int
```

:::

### Semi-Colons

::: code-group

```cpp [C++]
x = y; y = z;
```

```lua [Lua/Terra]
-- Optional for clarity
x = y; y = z;
```

:::

### Blocks

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

### Conditionals

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

### Loops

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
for i = 0,100 do 
    -- note [0,100) bounds
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

### Switch

::: code-group

```cpp [C++]
switch(x) {
    case X1: a;
    case X2 : b;
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

### Control Flow

::: code-group

```cpp [C++]
break;
return;
```

```lua [Lua/Terra]
break
return
-- note: break/return must
-- end the block
```

:::

### Exceptions

::: code-group

```cpp [C++]
try { x; }
```

```lua [Lua/Terra]
-- no exceptions, avoiding complexity    
```

:::

## Functions

### Defining functions

::: code-group

```cpp [C++]
int f(int x, int y) { 
    return x + y; 
}
```

```lua [Lua/Terra]
terra f(x : int, y : int): int 
    -- :int return is optional
    -- for non-recursive functions
    return x + y 
end
```

```lua [Meta-programmed]
local args = {symbol(int),symbol(int)}
terra f([args])
    var s = 0
    escape
      for _,a in ipairs(args) do
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
} // no returns
```

```lua [Lua/Terra]
terra f() : {} -- empty tuple means void
end
```

:::

### Declaring functions

::: code-group

```cpp [C++]
int f(int x, int y);
void g();
```

```lua [Lua/Terra]
terra f :: {int,int} -> int
--         ~~~~~~~~~~~~~~~~ function type
terra g :: {} -> {}
           ~~    ~~ empty tuple for void/no-args
```

```lua [Meta-programmed]
local args = {int,int}
local ret = int
local type = args -> reg
local void = {} -> {}
terra f :: type
terra g :: void
```

:::

### Inlining

::: code-group

```cpp [C++]
inline void f();
```

```lua [Lua/Terra]
f :: {} -> {}
f:setinlined(true) 
-- actually equivalent to __alwaysinline__
```

:::

### Operators

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
-- always associated with a lhs type
-- 'T'
```
:::

### Overloading

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
        return terralib.select( a > b, a, b)
    end,
    terra(a : float, b : float) 
        return terralib.select( a > b, a, b)
    end
})
```

## Expressions

Basically same semantics as C++: From the Quick Reference "Operators are grouped by precedence, highest first. Unary operators and assignment evaluate right to left. Allothers are left to right. Precedence does not affect order of evaluation, which is undefined. There are no run time checks for arrays out of bounds, invalid pointers, etc. "

### Working with namespaces

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
-- when N is just a Lua table
-- N.f is replaced with the value
-- N["f"] in the terra code
```

:::

### Pointers and members

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

p.x -- '.' works like ->
```

```lua [Meta-programmed]
&[<luaexp>]
@[<luaexp>]
t.[("xyz"):sub(1,1)]
--~~~~~~~~~~~~~~~~~ any lua exp resulting in a string
p.["x"]
--~~~~~ same here
```

:::

### Array index and function calls

::: code-group

```cpp [C++]
void g(int* a, int i, T t) {
    a[i]
    f(x,y)
    t(x,y)
}
```

```lua [Lua/Terra]
terra g(a : &int, i : int, t : T)
    a[i]
    f(a,i)
    t(a,i)
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

### Updates

::: code-group

```cpp [C++]
x++,++x
x--,--x
```

```lua [Lua/Terra]
-- Do not exist
-- use statements
x = x + 1
```

:::

### RTTI

::: code-group

```cpp [C++]
typeid(x)
dynamic_cast<T>(x)
```

```lua [Lua/Terra]
-- no build-in equivalents, you can build your own:
local nextid = 0
local function addtypeid(T)
    T.entries:insert(1,{"_typeid",int})
    T.metamethods._typeid = nextid
    terra T:init()
        self._typeid = nextid
    end
    nextid = nextid + 1
end
terra typeid(v : &opaque)
    -- extract first member
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

### Casts

::: code-group

```cpp [C++]
(T) x
(T*) x
```

```lua [Lua/Terra]
[T](x)
[&T](x)
-- you are applying the 
-- Terra type 'T' like a function.
-- Because type constructors like '&T'
-- are Lua expressions, you need to use
-- an escape '[T]' in general
</code></pre></div>
<div class="highlighter-rouge" style="margin: 0; display: inline-block;"><small>Meta-programmed</small><pre class="highlight"><code>local PT = &int
terra f(a : &opaque) : PT
    return PT(a)
end
```

:::

### Sizeof

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

### Allocation

::: code-group

```cpp [C++]
new T //malloc, use a std.t metatype, or build your own
```

```lua [Lua/Terra]
[&T](C.malloc(sizeof(T)))
```

:::

### Arithmetic

::: code-group

```cpp [C++]
-x
+x //DNE
x * y
x / y
x % y
x + y 
x - y
```

```lua [Lua/Terra]
-x
x -- no '+' prefix
x * y
x / y
x % y
x + y -- also pointers
x - y -- also pointers
```

```lua [Meta-programmed]
local plus = "+"
terra two()
    return operator(plus,1,2)
end
```

:::

### Comparisons

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

### Logical and Bitwise Operators

::: code-group

```cpp [C++]
~x
```

```lua [Lua/Terra]
not x -- bitwise for integers
```

:::


::: code-group

```cpp [C++]
!x
```

```lua [Lua/Terra]
not b -- logical for booleans
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
b and d -- logical 'and' for booleans
b or d -- short circuits
```

:::


::: code-group

```cpp [C++]
x & y
x | y
```

```lua [Lua/Terra]
x and y -- bitwise 'and' for integers
x or y  -- _no_ short circuit
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

### Other Stuff

::: code-group

```cpp [C++]
x ? y : z
```

```lua [Lua/Terra]
terralib.select(x,y,z) -- _no_ short circuit
```

:::


::: code-group

```cpp [C++]
throw x; // no exceptions, consider using longjmp,setjmp

```

```lua [Lua/Terra]
-- no exceptions
-- consider longjmp, setjmp
```

:::

### Templates

::: code-group

```cpp [C++]
// Overload f for all types
template <class T> 
T f(T t) {
}
```

```lua [Lua/Terra]
function f(T)
    return terra(t : T) : T
    end
end
-- only generate one function per unique 'T'
f = terralib.memoize(f)
```

:::

::: code-group

```cpp [C++]
// Class with type parameter T
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
-- only generate one struct per unique 'T'
X = terralib.memoize(X)
```

:::

::: code-group

```cpp [C++]
// An object of type "X of int"
X<int> x;
```

```lua [Lua/Terra]
var x : X(int)
```

:::

### Namespaces

::: code-group

```cpp [C++]
namespace N {class T {};}
```

```lua [Lua/Terra]
N = {} -- lua table
struct N.T {}

</code></pre></div>
<div class="highlighter-rouge" style="margin: 0; display: inline-block;"><small>Meta-programmed</small><pre class="highlight"><code>N = {}
local struct mystruct {}
N["T"] = mystruct
```

:::

::: code-group

```cpp [C++]
// Use name T in namespace N
N::T t;
```

```lua [Lua/Terra]
-- access T in the table N
var t : N.T
```

```lua [Meta-programmed]
local key = "T"
terra f()
    var t :  N[key]
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
-- merge N with global environment
for name,value in pairs(N) do
    _G[name] = value
end
```

:::

### C Library Usage

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
var a = [&int](malloc(10*sizeof(int)))
```

:::

### Offline Compiler Usage

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
--   ~~~~~~~~~~~~~~~ table of exported functions
```

:::

::: code-group

```cpp [C++]
$ cc -o main -lfoo main.cpp
```

```lua [Lua/Terra]
terralib.saveobj("main",
    { main = main}, {"-lfoo"})
--                  ~~~~~~~~~
--                  extra linker args
```

:::

::: code-group

```cpp [C++]
$ cc -shared  -o libmain.so main.cpp
```

```lua [Lua/Terra]
terralib.saveobj("libmain.so",
    { main = main })
```

:::

### C Libraries

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
terralib.includepath = "mylibinclude;"..terralib.includepath
C = terralib.includec("mylib.h")
terralib.linklibrary("libmylib.so")
terra main ()
    C.mylib_myfunction()
end
-- or, for offline use:
terralib.saveobj("main",{main = main},
    {"libmylib.so"})
--  ~~~~~~~~~~~~~~~ extra linker args
```

:::