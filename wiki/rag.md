# RAGの文法規則

## 文字コード

- utf-8

## 拡張子

- `.rag`
- `.rags`

## 空白のトークン

- `LF`: `0x0A`
- `CR`: `0x0D`
- `EOL`: `<LF>`, `<CR>`, `<CR><LF>` のいずれか 
- `TAB_H`: `0x09`
- `TAB_V`: `0x0B`
- `TAB` = `<TAB_H>`, `<TAB_V>` のいずれか
- `FF` = `0x0C`
- `SPACE_ASCII`: `0x20`
- `SPACE_UTF8_2BYTE`: `0xC2A0`
- `SPACE_UTF8_3BYTE`: `0xE38080`
- `SPACE`: `<SPACE_ASCII>`, `<SPACE_UTF8_2BYTE>`, `<SPACE_UTF8_3BYTE>` のいずれか
- `BLANK`: `<SPACE>`, `<EOL>`, `<TAB>`, `<FF>` のいずれか

## 記号のトークン

- `DOT`: `.`
- `COMMA`: `,`
- `EQUAL`: `=`
- `SQUARE_L`: `[`
- `SQUARE_R`: `]`
- `CURLY_L`: `{`
- `CURLY_R`: `}`
- `ANGLE_L`: `<`
- `ANGLE_R`: `>`
- `ROUND_L`: `(`
- `ROUND_R`: `)`
- `PLUS`: `+`
- `HYPHEN`: `-`
- `ASTERISK`: `*`
- `SLASH`: `/`
- `BACK_SLASH`: `0x5C`
- `SEMICOLON`: `;`
- `COLON`: `:`
- `DOLLAR`: `$`
- `PERCENT`: `%`
- `SHARP`: `#`
- `QUOTE_SINGLE`: `'`
- `QUOTE_DOUBLE`: `"`
- `QUOTE_BACK`: `0x60`
- `UNDERSCORE`: `_`
- `QUESTION`: `?`
- `EXCLAMATION`: `!`
- `AND`: `&`
- `AT`: `@`
- `HAT`: `^`
- `TILDE`: `~`
- `OR`: `|`

### エスケープ文字のトークン

- `ESC_DOT`: `<BACK_SLASH><DOT>`
- `ESC_COMMA`: `<BACK_SLASH><COMMA>`
- `ESC_EQUAL`: `<BACK_SLASH><EQUAL>`
- `ESC_SQUARE_L`: `<BACK_SLASH><SQUARE_L>`
- `ESC_SQUARE_R`: `<BACK_SLASH><SQUARE_R>`
- `ESC_CURLY_L`: `<BACK_SLASH><CURLY_L>`
- `ESC_CURLY_R`: `<BACK_SLASH><CURLY_R>`
- `ESC_ANGLE_L`: `<BACK_SLASH><ANGLE_L>`
- `ESC_ANGLE_R`: `<BACK_SLASH><ANGLE_R>`
- `ESC_ROUND_L`: `<BACK_SLASH><ROUND_L>`
- `ESC_ROUND_R`: `<BACK_SLASH><ROUND_R>`
- `ESC_PLUS`: `<BACK_SLASH><PLUS>`
- `ESC_HYPHEN`: `<BACK_SLASH><HYPHEN>`
- `ESC_ASTERISK`: `<BACK_SLASH><ASTERISK>`
- `ESC_SLASH`: `<BACK_SLASH><SLASH>`
- `ESC_BACK_SLASH`: `<BACK_SLASH><BACK_SLASH>`
- `ESC_SEMICOLON`: `<BACK_SLASH><SEMICOLON>`
- `ESC_COLON`: `<BACK_SLASH><COLON>`
- `ESC_DOLLAR`: `<BACK_SLASH><DOLLAR>`
- `ESC_PERCENT`: `<BACK_SLASH><PERCENT>`
- `ESC_SHARP`: `<BACK_SLASH><SHARP>`
- `ESC_QUOTE_SINGLE`: `<BACK_SLASH><QUOTE_SINGLE>`
- `ESC_QUOTE_DOUBLE`: `<BACK_SLASH><QUOTE_DOUBLE>`
- `ESC_QUOTE_BACK`: `<BACK_SLASH><QUOTE_BACK>`
- `ESC_UNDERSCORE`: `<BACK_SLASH><UNDERSCORE>`
- `ESC_QUESTION`: `<BACK_SLASH><QUESTION>`
- `ESC_EXCLAMATION`: `<BACK_SLASH><EXCLAMATION>`
- `ESC_AND`: `<BACK_SLASH><AND>`
- `ESC_AT`: `<BACK_SLASH><AT>`
- `ESC_HAT`: `<BACK_SLASH><HAT>`
- `ESC_TILDE`: `<BACK_SLASH><TILDE>`
- `ESC_OR`: `<BACK_SLASH><OR>`

### エスケープシーケンスのトークン

- `ESC_TAB`: `<BACK_SLASH>t`
- `ESC_ENTER`: `<BACK_SLASH>n`
- `ESC_NULL`: `<BACK_SLASH>0`

- `ESC_CHAR`: `<ESC_DOT>`, `<ESC_COMMA>`, `<ESC_EQUAL>`, `<ESC_SQUARE_L>`, `<ESC_SQUARE_R>`, `<ESC_CURLY_L>`, `<ESC_CURLY_R>`, `<ESC_ANGLE_L>`, `<ESC_ANGLE_R>`, `<ESC_ROUND_L>`, `<ESC_ROUND_R>`, `<ESC_PLUS>`, `<ESC_HYPHEN>`, `<ESC_ASTERISK>`, `<ESC_SLASH>`, `<ESC_BACK_SLASH>`, `<ESC_SEMICOLON>`, `<ESC_COLON>`, `<ESC_DOLLAR>`, `<ESC_PERCENT>`, `<ESC_SHARP>`, `<ESC_QUOTE_SINGLE>`, `<ESC_QUOTE_DOUBLE>`, `<ESC_QUOTE_BACK>`, `<ESC_UNDERSCORE>`, `<ESC_QUESTION>`, `<ESC_EXCLAMATION>`, `<ESC_AND>`, `<ESC_AT>`, `<ESC_HAT>`, `<ESC_TILDE>`, `<ESC_OR>`, `<ESC_TAB>`, `<ESC_ENTER>`, `<ESC_NULL>` のいずれか

### シンボル

- `QUOTE`: `<QUOTE_SINGLE>`, `<QUOTE_DOUBLE>`, `<QUOTE_BACK>`のいずれか
- `SYMBOL_NON_5C_QUOTE`: `<DOT>`, `<COMMA>`, `<EQUAL>`, `<SQUARE_L>`, `<SQUARE_R>`, `<CURLY_L>`, `<CURLY_R>`, `<ANGLE_L>`, `<ANGLE_R>`, `<ROUND_L>`, `<ROUND_R>`, `<PLUS>`, `<HYPHEN>`, `<ASTERISK>`, `<SLASH>`, `<SEMICOLON>`, `<COLON>`, `<DOLLAR>`, `<PERCENT>`, `<SHARP>`, `<UNDERSCORE>`, `<QUESTION>`, `<EXCLAMATION>`, `<AND>`, `<AT>`, `<HAT>`, `<TILDE>`, `<OR>` のいずれか
- `SYMBOL_NON_5C`: `<SYMBOL_NON_0x5C_QUOTE>`, `<QUOTE>` のいずれか
- `SYMBOL`: `<SYMBOL_NON_5C>`, `<BACK_SLASH>` のいずれか


## アルファベット

- `ALPHABET`: `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`, `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z` のいずれか

## UTF-8

- `U1`: `0x80`から`0xBF`のいずれか
- `U2`: `0xC2`から`0xDF`のいずれか
- `U3`: `0xE0`から`0xEF`のいずれか
- `U4`: `0xF0`から`0xF4`のいずれか
- `UTF8`: `<U2><U>`、`<U3><U1><U1>`、`<U4><U1><U1><U1>`のいずれか（UTF-8文字にのみマッチする）


## トークン

- `BOOLEAN`: `true`、`false` のいずれか
- `DIGIT_NON_ZERO`: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` のいずれか
- `DIGIT`: `0`, `<DIGIT_NON_ZERO>` のいずれか
- `DIGITS`: `<DIGIT>`の1つ以上の連続
- `INTEGER`: `<DIGIT_NON_ZERO><DIGITS>`
- `FLOAT`: `<DIGIT><DOT><DIGITS>`
- `HEX_DIGIT`: `<DIGIT>`, `a`, `b`, `c`, `d`, `e`, `f`, `A`, `B`, `C`, `D`, `E`, `F` のいずれか
- `HEX_DIGITS`: `<HEX_DIGITS>`の1つ以上の連続
- `HEX_NUMERIAL`: `0x<HEX_DIGITS>`, `0X<HEX_DIGITS>`
- `SIGN`: `<PLUS>`, `<HYPHEN>` のいずれか
- `SIGNED_INTEGER`: `<SIGN><INTEGER>`, `<SING><FLOAT>`

## 記述文字列

- `KAG_KEYS`: `<ALPHABET>`, `<DIGIT>`, `<UNDERSCORE>`, `<UTF8>` のいずれか
- `KAG_MESSAGE_KEYS`: `<ALPHABET>`, `<DIGIT>`, `<UTF8>` のいずれか

- ASCII_KEY: `[0-9a-zA-Z_]`の正規表現で表される文字。（ASCII記述文字）
- UTF8_KEY: ASCII_KEY以外のUTF-8文字のマルチバイト文字（UTF8記述文字）
- KEY: ASCII_KEYあるいはUTF8_KEY（記述文字）
- KEYS: １つ以上のKEYで構成される文字列（記述文字列）

## ドキュメント全体

- DOCUMENT: ファイルの先頭から末尾まで（ドキュメント）

## ドキュメントを構成する要素

- `BLANK_LINE`: 空白文字のみでで構成された行（空行）
- `INDENT_LINE`: 行頭からスペースが連続して`4`以上がある行。`BLANK_LINE`は除く（インデント行）
- `NON_INDENT_LINE`: 行頭からスペースが連続して`4`以上ない行。（インデントなし行）
- `INDENT_BLOCK`: `INDENT_LINE`の１つ以上の連続です。`BLANK_LINE`は無視（インデントブロック）

## KAG

### KAGのトークン



### KAGの文法

この文書では、例えば`KAG_TAG_NAME`が`x`の`KAG_TAG`を`x`タグと呼ぶ。
行末の丸括弧は、その要素をこの文書内での呼び方を指す。

- `KAG_TAG_SQUARE_BRACKET`: `[`から`]`まで。ただし`[[`で始まる場合は除く。ネストは許可されない（大括弧タグ）
- `KAG_TAG_AT`: 行頭の`@`から行末まで。行頭の空白文字は無視すること（@タグ）
- `KAG_TAG`: `KAG_TAG_SQUARE_BRACKET`または`TAG_AT`（タグ）
- `KAG_TAG_LINE`: `KAG_TAG`のみで構成される行（タグ行）
- `KAG_TAG_NAME`: `KAG_TAG`内の最初のKEYS（タグ名）
- `KAG_TAG_ATTRIBUTE`: `KAG_TAG_NAME`の後から末尾までの`KAG_KEYS = KAG_KEYS`の等式。等式中の空白文字は無視される（タグ属性）
- `KAG_TAG_ATTRIBUTE_NAME`: `KAG_TAG_ATTRIBUTE`の等式の左辺（属性名）
- `KAG_TAG_ATTRIBUTE_VALUE`: `KAG_TAG_ATTRIBUTE`の等式の右辺（属性値）
- `KAG_STRING_SINGLE`: `'` で囲まれた範囲。`'...'`内の`"`は文字列とみなされる。ネストは許可されない。（シングル文字列）
- `KAG_STRING_DOUBLE`: `"` で囲まれた範囲。`"..."`内の`'`は文字列とみなされる。ネストは許可されない。（ダブル文字列）
- `KAG_STRING`: `KAG_STRING_SINGLE` または `KAG_STRING_DOUBLE`
- `KAG_ENTITY`: `&f.`, `&sf.`, `&tf.` `&kag.` + `KAG_KEYS`。セーブ名および文字列中に使用できる。（KAG変数呼び出し）
- `KAG_LABEL_TOP_FILE`: ファイルの先頭位置。（ファイル先頭ラベル）
- `KAG_LABEL_NORMAL`: 行頭が `*` で始まる行（行頭ラベル）
- `KAG_LABEL`: `KAG_LABEL_TOP_FILE`あるいは`KAG_LABEL_NOMAL`（ラベル）
- `KAG_LABEL_NAME`: `KAG_LABEL`内の最初の`KAG_KEYS`。`KAG_KEYS`よりも`|`が先にあった場合は`KAG_LABEL_NAME`が省略されたとみなされ、`KAG_LABEL_NAME`は直前の`KAG_LABEL_NAME` + `:` + `DIGIT`となる。この`DIGIT`は2から始まり、省略が続く場合、値が1増加した数値になる。（ラベル名）
- `KAG_SAVE_NAME`: `KAG_LABEL_NAME`の次の`KAG_KEYS`または`KAG_ENTITY`。ただし`KAG_LABEL_NAME`と`KAB_SAVE_NAME`の間には`|`が必要（セーブ名）
- `KAG_SCRIPT_BLOCK`: `iscript`タグから`endscript`まで
- `KAG_MACRO_BLOCK`: `macro`タグから`endmacro`タグまで
- `KAG_MACRO_ATTRIBUTE_VALUE`: `KAG_MACRO_BLOCK`でのみ使用できる`KAG_TAG_ATTRIBUTE`。必ず`%`で始まる（マクロ属性値）
- `KAG_MACRO_ATTRIBUTE_DEFAULT`:` KAG_MACRO_ATTRIBUTE_VALUE`の次が`|`であった場合の次の`KAG_KEYS`（マクロデフォルト値）
- `KAG_MACRO_ATTRIBUTE_ALL`: `KAG_MACRO_BLOCK`内の`KAG_TAG`の`KAG_TAG_NAME`の次の`*`（マクロ全属性）
- `KAG_LINK_BLOCK`: `link`タグから`endlink`タグまで
- `KAG_SUBROUTINE_END`: `return`タグあるいは`s`タグ、またはファイル末尾（サブルーチン終端）
- `KAG_SUBROUTINE`: `KAG_LABEL`から`KAG_SUBROUTINE_END`まで（サブルーチン）
- `KAG_IF_BLOCK`: `if`タグから`endif`タグまで。間にはラベルを挟んではいけない。（ifブロック）
- `KAG_IGNORE_BLOCK`: `ignore`から`@endignore`まで。間にはラベルを挟まないように。（ignoreブロック）
- `KAG_COMMENT`: `;`から行末まで。`KAG_SCRIPT_BLOCK`と`KAG_STRING`内の`;`は無視される（コメント）
- `KAG_MESSAGE`: `KAG_TAG`、`KAG_LABEL`、`KAG_COMMENT`、`KAG_SCRIPT_BLOCK`内以外の`KAG_KEYS`（メッセージ）
- `KAG_ELEMENT`: `KAG_TAG`、`KAG_STRING`、`KAG_LABEL`、`KAG_SCRIPT_BLOCK`、`KAG_MACRO_BLOCK`、`KAG_LINK_BLOCK`、`KAG_SUBROUNTINE`、`KAG_IF_BLOCK`、`KAG_COMMENT_KAG`、`KAG_MESSAGE`のいずれか（KAGブロックを構成する要素）
- `KAG_ELEMENTS`: `KAG_ELEMENT`または`KAG_ELEMENTS`と`KAG_ELEMENT`の連続
- `KAG_LINE`: `KAG_ELEMENS`で構成される行。行頭のスペースがある場合は、必ず4つ未満である。
- `KAG_BLOCK`: `KAG_LINE`で構成されるブロック。`BLANK_LINE`が入ることは許容される。（KAGブロック）

## 吉里吉里のKAGと違うところ

- 自動改行、手動改行の切り替え

## ティラノスクリプト拡張記法

- `#`+名前でキャラクター名を指定できる
- `#`+名前+`:`+表情など で表情を指定できる

## 拡張記法

- `@script`タグ。
- スクリプトの途中の行末に`\`を挿入ことで、スクリプトを複数行に渡って記述できる
- 終了タグに`end...`の代わりに`[/if]`を指定できる
- インデントでタグ記号を省略してスクリプトで記述できる
- `if {} macro {} ignore {}`が使える。
- `for` `while` などが使える
- `iscript`、`endscript`は無視される。
- スクリプト中はスクリプトに準拠するが基本的に、`//`,`/**/`, `#`コメントを使える
- `\{\{script\}\}`でスクリプトを呼び出せる。`@eval`と同等。
- `[?mruby ?]`
- キャラ名：行頭+KEYS+`:` + `\n | (...)` でキャラ名の指定ができる。`:`の後にKEYSが来てはいけない。
- 表情指定：キャラ名指定ののち`(...)`の間に表情指定などができる
- ボイス指定：表情指定ののちに`{...}`でボイス形式でアニメーションなどを指定できる
- キャラ名と同等の記法でメッセージとして`:`を使用したい時は`\:`を用いる。
- メッセージ行
- メッセージブロック: メッセージ行の連続、空白行またはタグ、インデントブロック、あるいは末尾まで
- メッセージ内に`$(x)`で表情差分、`${x}`でボイス、`$<x>`で特殊演出、`\{\{script\}\}`でスクリプト
- メッセージ内に指定がなければ、事前予約された表情、
- `-` リストでリンクの分岐が作れる（？）
- `[1]` タグ名の部分が数値だったばあいは予約参照

## メモ

- [eval exp="f.flag1 = 1000"]でスクリプトの式を計算できる
    - ゲーム変数であれば f. を、システム変数であれば sf. を、一時変数であれば tf. を付けます
    - kag. はKAGシステムへのアクセスに使われる
    - delete var で変数削除
    - [emb exp="f.var"]で変数の内容を表示
    - [font size="&f.fontsize"] のように& の後に書かれた属性の値の内容を、TJS2 式として実行して、その結果で属性の値を置き換える
- cond 属性には TJS式 を指定し、この式を評価した結果が真の時のみにそのタグが実行されます
    - `macro endmacro if else elsif endif ignore endignore iscript endscript` のタグをのぞく

- 音声と表情の同期。

```

先生: ()
わたしもやき{1}が回ったってことかしら？
そうでもなければだ{2}ものね。
でも、そう{3}かんがえると

それでは・・・そういうことかもしれない。

私: (face normal) {voice 0%:"78", 50%:happy, 9%:shy}
そういうことであれば、{{script}}

少女: (face) {voice}
$(1)なるほど、わかりました。
$(2)そういうことであれば、気をつけます。
$(3)あなたもがんばってください。

少女: {
    character: {

    },

}

```

## TOML

### TOMLのトークン

- `TOML_COMMENT`: `#` から行末まで
- `TOML_KEY`: `"`で囲まれた任意の文字列、またはアルファベット、数字、アンダースコア、ハイフンの連続
- `TOML_NUMBER`:  浮動小数点数または整数。数字とアンダースコアの連続で、アンダースコアは数字の間にだけ現れます。
- `TOML_BOOLEAN`: trueまたはfalse
- `TOML_DATE`: 日付
- `TOML_DOT`: `.`
- `TOML_COMMA`: `,`
- `TOML_EQ`: `=`
- `TOML_LBRACKET`: `[`
- `TOML_RBRACKET`: `]`
- `TOML_LBRACE`: `(`
- `TOML_RBRACE`: `)`

### TOMLの文法

- `TOML_VALUE`: `TOML_KEY`、`TOML_NUMBER`、`TOML_BOOLEAN`、`TOML_DATE`、`TOML_ARRAY`、`TOML_INLINE_TABLE` のいずれかです。
- `TOML_ARRAY`: `[]`で囲まれた`TOML_VALUE`のリストです。リスト内の値は`,`で区切られます。
- `TOML_INLINE_TABLE`: `{}`で囲まれた`TOML_KEY_VALUE`のリストです。リスト内の`TOML_KEY_VALUE`は`,`で区切られます。ただし、`TOML_INLINE_TABLE`は単一行に収めるべきです。
- `TOML_KEY_VALUE`: `TOML_KEY_OR_STR`、`=`、`TOML_VALUEで`で構成されます。
- `TOML_TABLE_ENTRIES`: 0つ以上の`TOML_KEY_VALUE`からなるリストです。
- `TOML_PATH`: `TOML_KEY_OR_STR`、`.`、`TOML_KEY_OR_STR`が0回以上続く形式です。
- `TOML_TABLE_HEADER`: `[]`で囲まれた`TOML_PATH`です。
- `TOML_TABLE_ARRAY_HEADER`: `[[]]`で囲まれた`TOML_PATH`です。
- `TOML_TABLE_ARRAY`: `TOML_TABLE_ARRAY_HEADER`と`TOML_TABLE_ENTRIES`で構成されます。
- `TOML_TABLE`: `TOML_TABLE_HEADER`と`TOMLE_TABLE_ENTRIES`で構成されます。
- `TOML_EXPRESSION`: `TOML_KEY_VALUE`、`TOML_TABLE`、`TOML_TABLE_ARRAY`のいずれかです。
- `TOML_CONTENT`: 0個つ以上の`TOML_EXPRESSION`で構成されます