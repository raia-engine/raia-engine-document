# lua_Reader

`lua_load`で使用されるリーダー関数です。

```c
typedef const char * (*lua_Reader) (lua_State *L, void *data, size_t *size);
```

## 説明

`lua_load`によって使用されるリーダー関数です。別のチャンクの部分が必要になるたびに、`lua_load`はそのデータパラメータとともにリーダーを呼び出します。リーダーはチャンクの新しい部分を含むメモリブロックへのポインタを返し、`size`をブロックサイズに設定する必要があります。ブロックは、リーダー関数が再度呼び出されるまで存在する必要があります。チャンクの終わりを示すには、リーダーは`NULL`を返すか、`size`をゼロに設定する必要があります。リーダー関数はゼロより大きい任意のサイズの部分を返すことができます。

## サンプルコード

```c
const char *reader(lua_State *L, void *data, size_t *size) {
    const char *chunk = (const char *)data;
    *size = strlen(chunk);
    return chunk;
}
```

このコードは、`lua_load`用の単純なリーダー関数を定義しています。

## 互換性

- Lua5.1

## 関連項目

- lua_load
- lua_Writer