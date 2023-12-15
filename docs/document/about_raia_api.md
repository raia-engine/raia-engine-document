# Raiaについて

## RaiaAPIとは

RaiaAPIはRaiaプロジェクトが提供するAPIです。

## RaiaAPIの特徴

Raiaを独特なものにする最たる例がRaiaAPIです。RaiaAPIはRaiaの最大の長所であり、同時に最大の欠点でもあります。

RaiaAPIは機械設計におけるジョイントに例えられるかもしれません。ジョイントは関節のような役割を果たし、機械に柔軟性をもたらす一方で、強度や安全性の低下が懸念されます。同様にRaiaAPIはRaiaに柔軟性をもたらしますが、速度や安全性を低下させる性質を持っています。

### 共有ライブラリとして提供される

RaiaAPIは共有ライブラリの形式で提供されます。これによりABIに対応したプログラミング言語からRaiaAPIを呼び出すことが可能になります。

### インターフェースが統一されている

RaiaAPIは次のCインターフェースで統一されています。

```c
const char * func_name(const char *args)
```

提供されるAPIはすべて、C文字列を引数として1つだけ受け取り、またC文字列を戻り値として返します。

ABIに対応した共有ライブラリを作成できるプログラミング言語であれば、同等の関数を作成することができます。

Go言語の例:

```go
//export goFunc
func func_name(s *C.char) *C.char
```

インターフェースが統一されていることで、様々なプログラミング言語でRaiaAPIを提供することが容易になっています。

### JSONによる引数と戻り値のやり取り

RaiaAPIの引数と戻り値はJSON文字列を介してやり取りされます。

Go言語で文字列を出力する関数を提供する例:

```go
//export puts
func puts(args *C.char) *C.char {
	var parsed = cstr_to_json(args)
	fmt.Println(parsed["message"])
	return nil
}
```

受け取ったC文字列をGoで扱えるJSONにパースし、そこからメッセージを読み取って出力しています。

値を返す場合は値をJSON文字列にシリアライズしてから返します。

このような仕様は一定の手間とやり取りにボトルネックを発生させる反面、JSONを扱えるプログラミング言語であれば、それぞれの言語の違いを吸収して一様にAPIを扱えるようになります。

## JSONによる引数

### 標準

`{"引数名": 値, ...}` の形。

```json
{
	"param1": 0,
	"param2": "hello",
	"param3": true,
	...
}
```

戻り値。多くの言語では戻り値の名前を必要としないが、RaiAPIでは指定する。`result` といった戻り値そのものを表す名前でもよいが、`is_exist` のような戻り値が何の値であるかを端的に表す名前の方が望ましい。

```json
{
	"ret1": 0,
	"ret2": "bye",
	"ret3": false,
	...
}
```

### 拡張記法（案）

配列による省略形。

```json
[
	0,
	"hello",
	true,
]
```

頭文字が `@` の場合は拡張記法。その記号+単語が予約されていることを示す。

- 引数: `@arguments`, `@args`, `@parameters`, `@params`
- 戻り値: `@return`, `@returns`, `@results`, `@ret` , `@rets`, 
- 型: `@type`, `@types`
- 値: `@value`, `@val`

```json
{
	...
	"@args": {
		"p1": { "@type": "Number", "@value": 100 },
		"p2": { "@type": "Number", "@value": 100 },
	},
	"@rets": {
		"p1": { "@type": "boolean", "@value": true },
	},
}
```

```json
{
	...
	"@args": [
		{ "@type": "int", "@val": 100 }, // option {@name": "p1"}
	],
	"@rets": [
		{ "@type": "boolean", "@val": true }, // option {"@name": "res1"}
	],
}
```

### キーワード一覧

