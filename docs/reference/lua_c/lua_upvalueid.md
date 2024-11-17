# lua_upvalueid

Luaクロージャから指定されたアップバリューの一意な識別子を取得します。

```c
void *lua_upvalueid (lua_State *L, int funcindex, int n);
```

## 説明

インデックス`funcindex`のクロージャからアップバリュー番号`n`の一意な識別子を返します。パラメータ`funcindex`と`n`は`lua_getupvalue`と同様です（`lua_getupvalue`参照）（ただし、`n`はアップバリューの数を超えてはなりません）。

この一意な識別子により、プログラムは異なるクロージャがアップバリューを共有しているかどうかを確認できます。Luaクロージャがアップバリュー（同一の外部ローカル変数を参照）を共有している場合、これらのアップバリューインデックスに対して同一のIDが返されます。

## サンプルコード

```c
void *id = lua_upvalueid(L, 1, 1);
printf("アップバリューID: %p\n", id);
```

このコードは、スタックの最初の関数に関連付けられた最初のアップバリューのIDを取得して表示します。

## 互換性

- Lua5.2

## 関連項目

- lua_upvaluejoin
- lua_getupvalue