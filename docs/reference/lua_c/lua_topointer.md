# lua_topointer

指定されたインデックスの値を一般的なCポインタに変換します。

`[-0, +0, -]`

```c
const void *lua_topointer (lua_State *L, int index);
```

## 説明

与えられた有効なインデックスの値を一般的なCポインタ（`void*`）に変換します。値はユーザーデータ、テーブル、スレッド、または関数である可能性があります；そうでない場合、`lua_topointer`はNULLを返します。異なるオブジェクトは異なるポインタを与えます。ポインタを元の値に戻す方法はありません。

通常、この関数はデバッグ情報用にのみ使用されます。

## サンプルコード

```c
const void *ptr = lua_topointer(L, 1);
printf("ポインタ: %p\n", ptr);
```

このコードは、指定されたインデックスの値をポインタとして取得し、表示します。

## 互換性

- Lua5.1

## 関連項目

- lua_touserdata
- lua_isuserdata