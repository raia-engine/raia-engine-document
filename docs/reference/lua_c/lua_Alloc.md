# lua_Alloc

Luaステートによって使用されるメモリ割り当て関数の型です。

`[-0, +0, -]`

```c
typedef void * (*lua_Alloc) (void *ud, void *ptr, size_t osize, size_t nsize);
```

## 説明

Luaステートによって使用されるメモリ割り当て関数の型です。割り当て関数は`realloc`に似た機能を提供する必要がありますが、全く同じではありません。その引数は`ud`で、`lua_newstate`に渡される不透明なポインタです。`ptr`は、割り当て/再割り当て/解放されるブロックへのポインタです。`osize`はブロックの元のサイズ、`nsize`はブロックの新しいサイズです。`ptr`は`osize`がゼロの場合、かつその場合に限りNULLです。`nsize`がゼロのとき、割り当て関数はNULLを返す必要があります。`osize`がゼロでない場合、`ptr`を指すブロックを解放する必要があります。`nsize`がゼロでないとき、割り当て関数は要求を満たせない場合にのみNULLを返します。`nsize`がゼロでなく、`osize`がゼロのとき、割り当て関数は`malloc`のように振る舞うべきです。`nsize`と`osize`がゼロでない場合、割り当て関数は`realloc`のように振る舞います。Luaは、`osize` >= `nsize`のとき割り当て関数が決して失敗しないと仮定しています。

こちらは割り当て関数のシンプルな実装です。これは補助ライブラリによって`luaL_newstate`で使用されます。

```c
static void *l_alloc (void *ud, void *ptr, size_t osize, size_t nsize) {
  (void)ud;  (void)osize;  /* 未使用 */
  if (nsize == 0) {
    free(ptr);
    return NULL;
  }
  else
    return realloc(ptr, nsize);
}
```

このコードは`free(NULL)`が効果を持たないことと、`realloc(NULL, size)`が`malloc(size)`に等しいことを前提としています。ANSI Cは両方の振る舞いを保証します。

## サンプルコード

```c
static void *l_alloc (void *ud, void *ptr, size_t osize, size_t nsize) {
  (void)ud;  (void)osize;  /* 未使用 */
  if (nsize == 0) {
    free(ptr);
    return NULL;
  }
  else
    return realloc(ptr, nsize);
}
```

このコードは、`free(NULL)`が効果を持たないことと、`realloc(NULL, size)`が`malloc(size)`に等しいことを前提としています。

## 互換性

- Lua5.1

## 関連項目

- lua_newstate