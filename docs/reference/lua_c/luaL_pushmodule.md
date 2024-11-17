# luaL_pushmodule

指定された名前のモジュールテーブルをスタックにプッシュする

```c
void luaL_pushmodule(lua_State *L, const char *modname, int sizehint);
```

## 説明

`luaL_pushmodule` は、モジュールテーブルを操作するための便利な関数で、指定された名前のモジュールテーブルをスタックにプッシュします。モジュールがまだ作成されていない場合は、新しいテーブルを作成します。

### 引数

1. **`L`**  
   Lua ステートへのポインタ。

2. **`modname`**  
   モジュールの名前。この名前は、Lua の `_LOADED` テーブルとグローバル環境でモジュールを検索または作成するために使用されます。

3. **`sizehint`**  
   新しいモジュールテーブルを作成する際のサイズのヒント。モジュールが既に存在する場合、この値は無視されます。

### 戻り値

この関数は戻り値を持ちませんが、スタックのトップに対象のモジュールテーブルを残します。

### 動作

1. `_LOADED` テーブルを取得し、その中に `modname` に対応するエントリを探します。
2. `modname` に対応する値が存在し、それがテーブルであれば、そのテーブルをスタックにプッシュします。
3. 値が存在しないか、テーブルでない場合：
   - 新しいテーブルを作成します。
   - そのテーブルを `_LOADED` に登録します。
   - さらに、グローバル環境にも登録します。
4. 最終的に、スタックのトップには対象のモジュールテーブルが存在します。

## サンプルコード

以下は `luaL_pushmodule` を使用してモジュールを操作する例です。

```c
#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

void register_my_module(lua_State *L) {
    // "mymodule" という名前のモジュールテーブルをプッシュ
    luaL_pushmodule(L, "mymodule", 10);

    // モジュールにフィールドを設定
    lua_pushstring(L, "Hello, Lua!");
    lua_setfield(L, -2, "greeting");

    // スタックのクリーンアップは不要：luaL_pushmodule でトップに配置される
}

int main() {
    lua_State *L = luaL_newstate();
    luaL_openlibs(L);

    register_my_module(L);

    // Lua スクリプトからモジュールを使用する
    luaL_dostring(L, "print(mymodule.greeting)");  // "Hello, Lua!" と出力

    lua_close(L);
    return 0;
}
```

1. `luaL_pushmodule` は、モジュール名 `mymodule` を `_LOADED` およびグローバル環境で探します。
2. 見つからない場合、新しいテーブルを作成し、スタックのトップに配置します。
3. 作成したモジュールテーブルにフィールド `greeting` を追加します。

## 互換性

- LuaJIT

## 関連項目

- luaL_findtable
- luaL_register
- lua_setfield
- lua_getfield