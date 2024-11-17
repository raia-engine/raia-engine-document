# lua_loadx

lua チャンクをロードする

`[-0, +1, -]`

```c
int lua_loadx(lua_State *L, lua_Reader reader, void *data, const char *chunkname, const char *mode);
```

## 説明

lua_loadx は Lua チャンクをロードし、コンパイル済みチャンクを Lua 関数としてスタックにプッシュします。エラーが発生した場合には、エラーメッセージをプッシュします。この関数の追加機能として、mode 引数を使用して、ロード対象がテキストチャンクかバイナリチャンクかを明示的に制御できるようになっています。

### 引数

1. **`L`**  
   Lua ステートへのポインタ。すべての Lua API に共通する、現在の Lua ステートを指す引数。

2. **`reader`**  
   ユーザーが提供するリーダー関数。この関数は、必要に応じてチャンクを読み込みます。`lua_Reader` 型の関数で、以下のプロトタイプを持ちます：  
   ```c
   const char *reader(lua_State *L, void *data, size_t *size);
   ```
   - `data` はリーダー関数に渡される不透明な値。
   - `size` は読み取られるチャンクのサイズを受け取ります。
   - 読み取るデータが終了した場合には、`NULL` を返します。

3. **`data`**  
   リーダー関数に渡される不透明なユーザーデータ。

4. **`chunkname`**  
   チャンクの名前を指定します。この名前は、エラーメッセージやデバッグ情報で使用されます。

5. **`mode`**  
   チャンクの種類を指定します。この引数はオプションであり、`NULL` を渡すことでデフォルト動作（`lua_load` と同じ挙動）になります。  
   - `"b"`: バイナリチャンクのみを許可します。
   - `"t"`: テキストチャンクのみを許可します。
   - `"bt"` または `NULL`: テキストチャンクとバイナリチャンクの両方を許可します。

### 戻り値

`lua_loadx` は、チャンクのロード結果を示す以下のステータスコードを返します：

- `0`: 成功。チャンクが正常にロードされ、Lua 関数としてスタックにプッシュされました。
- `LUA_ERRSYNTAX`: 構文エラー。チャンクの解析中にエラーが発生しました。
- `LUA_ERRMEM`: メモリ割り当てエラー。

### 動作

`lua_loadx` は以下の手順で動作します：

1. `reader` 関数を使用してチャンクのデータを読み取ります。
2. 読み取ったデータを解析し、`mode` に従ってチャンクの種類（テキストまたはバイナリ）を検証します。
3. データが正しい形式であれば、Lua 関数としてコンパイルし、スタックにプッシュします。
4. チャンクが無効である場合やエラーが発生した場合、適切なエラーメッセージをスタックにプッシュします。

## サンプルコード

以下のコードは、`lua_loadx` を使用してテキストチャンクをロードする例です。

```c
#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

const char *reader(lua_State *L, void *data, size_t *size) {
    static const char *script = "print('Hello from lua_loadx!')";
    if (*size == 0) {
        *size = strlen(script);
        return script;
    }
    return NULL;
}

int main() {
    lua_State *L = luaL_newstate();
    luaL_openlibs(L);

    if (lua_loadx(L, reader, NULL, "example_chunk", "t") == 0) {
        lua_pcall(L, 0, LUA_MULTRET, 0);
    } else {
        fprintf(stderr, "Error loading chunk: %s\n", lua_tostring(L, -1));
        lua_pop(L, 1);
    }

    lua_close(L);
    return 0;
}
```

- `reader` 関数は固定の Lua スクリプト文字列を返します。
- `lua_loadx` を使用して、テキストモードでチャンクをロードします。
- チャンクが正常にロードされると、`lua_pcall` で実行されます。
- エラーが発生した場合には、エラーメッセージが標準エラー出力に表示されます。

## 互換性

- LuaJIT

## 関連項目

- lua_load
- lua_Reader
- lua_pcall
- lua_newstate