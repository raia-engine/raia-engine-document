# lua_xmove

異なるスレッド間で値を移動します。

`[-?, +?, -]`

```c
void lua_xmove (lua_State *from, lua_State *to, int n);
```

## 説明

同じグローバル状態の異なるスレッド間で値を交換します。

この関数は`from`のスタックから`n`個の値をポップし、それらを`to`のスタックにプッシュします。

## サンプルコード

```c
lua_xmove(from, to, 2);
```

このコードは、`from`スレッドのスタックから`to`スレッドのスタックへ2つの値を移動します。

## 互換性

- Lua5.1

## 関連項目

- lua_yield
- lua_resume