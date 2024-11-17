# lua_Writer

`lua_dump`によって使用されるライター関数の型です。

```c
typedef int (*lua_Writer) (lua_State *L, const void* p, size_t sz, void* ud);
```

## 説明

`lua_dump`によって使用されるライター関数の型です。チャンクの別の部分を生成するたびに、`lua_dump`はライターを呼び出し、書き込まれるバッファ（`p`）、そのサイズ（`sz`）、および`lua_dump`に供給されたデータパラメータを渡します。

ライターはエラーコードを返します：0はエラーがないことを意味し、他の値はエラーを意味し、`lua_dump`がライターを再び呼び出すのを停止します。

## サンプルコード

```c
int writer(lua_State *L, const void* p, size_t sz, void* ud) {
    fwrite(p, sz, 1, (FILE*)ud);
    return 0;
}
```

このコードは、`lua_dump`で使用する単純なライター関数を定義します。

## 互換性

- Lua5.1

## 関連項目

- lua_dump
- lua_Reader