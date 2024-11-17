# lua_Hook

デバッグフック関数のための型です。

```c
typedef void (*lua_Hook) (lua_State *L, lua_Debug *ar);
```

## 説明

デバッグフック関数のための型です。

フックが呼び出されるとき、その`ar`引数の`event`フィールドはフックをトリガーした特定のイベントに設定されます。Luaはこれらのイベントを次の定数で識別します：`LUA_HOOKCALL`, `LUA_HOOKRET`, `LUA_HOOKTAILRET`, `LUA_HOOKLINE`, `LUA_HOOKCOUNT`。さらに、行イベントの場合、`currentline`フィールドも設定されます。`ar`の他のフィールドの値を取得するには、フックは`lua_getinfo`を呼び出さなければなりません。戻りイベントの場合、`event`は`LUA_HOOKRET`（通常の値）または`LUA_HOOKTAILRET`になります。後者の場合、Luaはテールコールを行った関数からの戻りをシミュレートしています。この場合、`lua_getinfo`を呼び出すことは無意味です。

Luaがフックを実行している間、他のフックへの呼び出しは無効になります。したがって、フックがLuaを呼び出して関数やチャンクを実行する場合、この実行はフックへの呼び出しなしで行われます。

## サンプルコード

```c
void my_hook(lua_State *L, lua_Debug *ar) {
    if (ar->event == LUA_HOOKCALL) {
        printf("関数が呼び出されました\n");
    }
}
```

このコードは、関数呼び出しイベントでメッセージを表示するデバッグフックを定義します。

## 互換性

- Lua5.1

## 関連項目

- lua_sethook
- lua_gethook