# lua_isnumber

指定されたインデックスにある値が数値または数値に変換可能な文字列であれば1を返します。

`[-0, +0, -]`

```c
int lua_isnumber (lua_State *L, int index);
```

## 説明

指定された許容インデックスにある値が数値または数値に変換可能な文字列であれば1を返し、そうでなければ0を返します。

## サンプルコード

```c
if (lua_isnumber(L, 1)) {
    printf("値は数値または数値に変換可能です\n");
}
```

このコードは、インデックス1の値が数値または数値に変換可能かどうかを確認します。

## 互換性

- Lua5.1

## 関連項目

- lua_tonumber
- lua_isstring