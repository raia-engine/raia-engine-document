## duk_get_buffer_data() 

1.3.0 stack buffer object buffer

### プロトタイプ

```c
void *duk_get_buffer_data(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

idxにあるプレーンバッファまたはバッファオブジェクト(ArrayBuffer, Node.js Buffer, DataView, TypedArray view)の値のデータポインタを、値を変更したり強制したりすることなく取得します。値がゼロでないサイズの有効なバッファである場合、非NULLポインタを返します。サイズが0のバッファの場合、NULLまたは非NULLポインタを返すことがあります。値がバッファでない場合、値がバッファオブジェクトで、そのバッファオブジェクトの見かけのサイズを完全にカバーしない場合、またはインデックスが無効な場合、NULLを返します。out_size が非 NULL の場合、バッファのサイズが *out_size に書き込まれます。

戻り値のポインタと length が示すデータ領域は、プレーンバッファの場合はバッファ全体であり、バッファオブジェクトの場合はアクティブな「スライス」です。返される長さは(要素数ではなく)バイト数で表現され、常に ptr[0] から ptr[len - 1] にアクセスできるようにします。例えば

例えば、new Uint8Array(16) の場合、戻り値のポインタは配列の先頭を指し、長さは 16 になります。
new Uint32Array(16) の場合、リターンポインタは配列の先頭を指し、長さは64になります。
new Uint32Array(16).subarray(2, 6) の場合、リターンポインタはサブ配列の先頭（Uint32Array の先頭から 2 x 4 = 8 バイト）を指し、長さは 16 (= (6-2) x 4) になります。
バッファオブジェクトのターゲット値または基礎となるバッファ値が固定バッファの場合、返されるポインタは安定で、バッファの寿命が尽きるまで変化することはありません。動的および外部バッファの場合、ポインタはバッファのサイズ変更または再構成に伴って変更される可能性があります。呼び出し側は、この API 呼び出しから返されたポインタ値がバッファのサイズ変更/再構成後に使用されないようにする責任を負います。ECMAScript コードから new Buffer(8) などで直接作成されたバッファは、自動的に固定バッファにバックアップされるため、そのポインタは常に安定したものとなります。

特殊なケースとして、バッファオブジェクトの見かけのサイズより小さいプレーンバッファがバッファオブジェクトのバックグランドになることがあります。このような場合、NULL が返されます。これにより、返されたポインタとサイズが常に安全に使用できることが保証されます。(この動作はマイナーバージョンでも変更される可能性があります)。

サイズがゼロのバッファとそうでないバッファを、返り値だけから区別する信頼できる方法はありません。非バッファの場合、サイズ0のNULLが返されます。サイズ0のバッファの場合、同じ値が返されるかもしれません（NULLでないポインタが返される可能性もありますが）。duk_is_buffer() や duk_is_buffer_data() 、あるいはバッファやバッファ・オブジェクトの型チェックを行う際に使用してください。

### 例

```c
void *ptr;
duk_size_t sz;

duk_eval_string(ctx, "new Uint16Array(16)");
ptr = duk_get_buffer_data(ctx, -1, &sz);

/* Here 'ptr' would be non-NULL and sz would be 32 (bytes). */
```

### 参照

duk_require_buffer_data
duk_get_buffer
duk_require_buffer