# RaiaEngineの概要

### コンテキスト

コンテキスト情報の例。常に変化する。

```json
// Raia.context
{
    version: {
        core: "x.x.x",
        app: "x.x.x",
        ...
    },
    platform: {
        os: "macOS",
    }
    library: {
        count: 1,
        name: [
            "raia_app",
        ],
    }
    path: {
        current: "",
        exe: "",
        home: "",
        desktop: "",
        document: "",
    },
    arg: {
        c: 1,
        v: [
            "",
            ...
        ],
    }
    app: {
        window: {
            title: "",
            width: 1600,
            height: 900,
            pixels: Uint8Array.allocPlain(width * height * 3),
            //
            count: 1,
            active: window_id,
            current: window_id,
            windows: [
                {
                    title: "",
                    width: 1600,
                    height: 900,
                    screen: {
                        pixels: Uint8Array.allocPlain(width * height * 3),
                        density: 1,
                        width: 1600,
                        height: 900,
                    },
                },
                ...
            ],
        },
        color: {
            code: "RGB",
            current: {
                r: 0,
                g: 0,
                b: 0,
            },
        },
        point: {
            current: {
                x: 0,
                y: 0,
            },
        }
    }
}
```

## API

- Raia
  - Core
    - Context
      - init: コンテキストを返す
    - Lib
      - init:
      - open: ダイナミックライブラリを開く
      - close: ライブラリを閉じる
      - closeAll: すべてのライブラリを閉じる
      - funcGlobal: ライブラリの関数をグローバルオブジェクトに登録する
      - func: ライブラリの関数を返す
    - IO
      - loadStringFilename: テキストファイルを読み込む
  - App
    - Window
      - init: ウィンドウを生成する
      - setTitle: タイトルを設定する
      - shouldClose: クローズボタンが押されたか
      - pollEvents: イベントをプールする
    - Screen
      - redraw: スクリーンを再描画する
    - Event
      - key: キー入力のコールバックを登録する
      - error: エラーのコールバックを登録する
      - corsor: マウス移動のコールバックを登録する
      - mouse: マウスボタンのコールバックを登録する
      - char: 文字入力のコールバックを登録する
      - enter: マウスの入退出のコールバックを登録する
      - scroll: スクロールのコールバックを登録する
      - joystick: ジョイスティック接続・解除のコールバックを登録する
      - drop: ドラッグ＆ドロップのコールバックを登録する
      - update: 再描画のコールバックを登録する
      - updateEnable: 再描画のコールバックを有効にする
    - GLFW
    - GLES
  - 