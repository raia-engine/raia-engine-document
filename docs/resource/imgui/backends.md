# Dear ImGui: バックエンド

## バックエンドの統合

**[Getting Started](https://github.com/ocornut/imgui/wiki/Getting-Started) のWikiガイド**に、既存のアプリケーションにDear ImGuiを統合する例が記載されています。

また、[EXAMPLES.MD](https://github.com/ocornut/imgui/blob/master/docs/EXAMPLES.md) のドキュメントも参考になるでしょう。

## バックエンドとは？

Dear ImGuiは非常に移植性が高く、基本的には次のような要素だけで実行およびレンダリングが可能です。

- 必須: マウスとキーボードの入力を提供する（`ImGuiIO`構造体に入力を渡す）。
- 必須: フォントアトラステクスチャをグラフィックメモリにアップロードする。
- 必須: クリッピング矩形を使用して、インデックス付きのテクスチャ付き三角形をレンダリングする。

追加の機能はオプションで、各バックエンドは可能な限り多くの機能をサポートしようとしています。

- オプション: カスタムテクスチャのバインディングサポート
- オプション: クリップボードのサポート
- オプション: ゲームパッドのサポート
- オプション: マウスカーソルの形状のサポート
- オプション: IME（インプットメソッドエディタ）のサポート
- オプション: マルチビューポートのサポート
  など

このように、バックエンドはDear ImGuiを移植しやすくするための機能を提供しています。標準的なバックエンドを使用することで、マルチビューポートサポートのように自前で実装するのが難しい機能も含め、さまざまな機能を簡単に利用できるようになります。

Dear ImGuiのコアライブラリ（ルートフォルダ内のファイル）と、このセクションで説明しているバックエンド（backends/フォルダ内のファイル）の違いを理解することは重要です。

- 一部の問題は特定のバックエンドやプラットフォームに限定されて発生する可能性があります。
- 基本的にはどのプラットフォームや3DグラフィックスAPIでもバックエンドを作成できるようになっています。たとえば、ソフトウェアレンダリングを使用したり、別のマシンでリモートレンダリングを行ったりすることも可能です。

## 標準的なバックエンド

**[backends/](https://github.com/ocornut/imgui/blob/master/backends) フォルダには、人気のあるプラットフォームやグラフィックスAPI用のバックエンドが含まれており、これを使用するとDear ImGuiをアプリケーションやエンジンに簡単に統合できます。** 各バックエンドは通常、imgui_impl_XXXX.cppとimgui_impl_XXXX.hという2つのファイルで構成されています。

- 「プラットフォーム」バックエンドは、マウスやキーボード、ゲームパッドの入力、カーソルの形状、タイミング、ウィンドウ管理を担当します。例:
  - Windows ([imgui_impl_win32.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_win32.cpp))
  - GLFW ([imgui_impl_glfw.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_glfw.cpp))
  - SDL2 ([imgui_impl_sdl2.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_sdl2.cpp))など。

- 「レンダラー」バックエンドは、アトラステクスチャの生成やImGuiの描画データのレンダリングを担当します。例:
  - DirectX11 ([imgui_impl_dx11.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_dx11.cpp))
  - OpenGL/WebGL ([imgui_impl_opengl3.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_opengl3.cpp))
  - Vulkan ([imgui_impl_vulkan.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_vulkan.cpp))など。

- 一部の高レベルなフレームワークでは、通常1つのバックエンドが「プラットフォーム」と「レンダラー」の両方を担当します。例:
  - Allegro 5 ([imgui_impl_allegro5.cpp](https://github.com/ocornut/imgui/blob/master/backends/imgui_impl_allegro5.cpp))

# バックエンドの一覧

[backends/](https://github.com/ocornut/imgui/blob/master/backends) フォルダ内にあるバックエンドの一覧です。

### プラットフォームバックエンド一覧

| ファイル名 | 説明 |
|------------|------|
| `imgui_impl_android.cpp` | Android ネイティブアプリAPI |
| `imgui_impl_glfw.cpp` | GLFW (Windows, macOS, Linuxなど) [GLFW公式サイト](http://www.glfw.org/) |
| `imgui_impl_osx.mm` | macOSネイティブAPI (GLFWやSDLに比べて機能が少ない) |
| `imgui_impl_sdl2.cpp` | SDL2 (Windows, macOS, Linux, iOS, Android) [SDL公式サイト](https://www.libsdl.org) |
| `imgui_impl_sdl3.cpp` | SDL3 (Windows, macOS, Linux, iOS, Android) [SDL公式サイト](https://www.libsdl.org) （SDL3の正式リリースまでは試験的に提供） |
| `imgui_impl_win32.cpp` | Win32 ネイティブAPI (Windows) |
| `imgui_impl_glut.cpp` | GLUT/FreeGLUT (非常に古いソフトウェアで、推奨されません) |

### レンダラーバックエンド一覧

| ファイル名 | 説明 |
|------------|------|
| `imgui_impl_dx9.cpp` | DirectX9 |
| `imgui_impl_dx10.cpp` | DirectX10 |
| `imgui_impl_dx11.cpp` | DirectX11 |
| `imgui_impl_dx12.cpp` | DirectX12 |
| `imgui_impl_metal.mm` | Metal (ObjCを使用) |
| `imgui_impl_opengl2.cpp` | OpenGL 2（古い固定機能パイプライン、最新のOpenGLコンテキストでは非推奨） |
| `imgui_impl_opengl3.cpp` | OpenGL 3/4、OpenGL ES 2、OpenGL ES 3（最新のプログラム可能なパイプライン） |
| `imgui_impl_sdlrenderer2.cpp` | SDL_Renderer (SDL2のオプションコンポーネント、SDL 2.0.18以降で利用可能) |
| `imgui_impl_sdlrenderer3.cpp` | SDL_Renderer (SDL3のオプションコンポーネント、SDL 3.0.0以降で利用可能) |
| `imgui_impl_vulkan.cpp` | Vulkan |
| `imgui_impl_wgpu.cpp` | WebGPU（Webとデスクトップで利用可能） |

### 高レベルフレームワークのバックエンド一覧（プラットフォーム＋レンダラー）

| ファイル名 | 説明 |
|------------|------|
| `imgui_impl_allegro5.cpp` | Allegro 5を使用する際のバックエンド |

**Emscriptenもサポートされています！**  
SDL+GL、GLFW+GL、およびGLFW+WebGPUの例はすべて、Emscriptenでビルドして実行する準備ができています。

### サードパーティ製フレームワーク、グラフィックスAPI、その他の言語向けバックエンド

サードパーティのフレームワークや言語のサポートについては、[こちらのWikiページ](https://github.com/ocornut/imgui/wiki/Bindings)に詳細なリストがあります（例: Adventure Game Studio, Cinder, Cocos2d-x, Game Maker Studio2, Godot, LÖVE+LUA, Magnum, Monogame, Ogre, openFrameworks, OpenSceneGraph, SFML, Sokol, Unity, Unreal Engineなど多数）。

### 推奨バックエンド

どのバックエンドを使用すべきか迷った場合、移植性のあるアプリケーションに推奨されるプラットフォームやフレームワークは以下の通りです。

| ライブラリ | Webサイト | バックエンド | 備考 |
|------------|-----------|-------------|------|
| GLFW       | [GLFW公式サイト](https://github.com/glfw/glfw) | `imgui_impl_glfw.cpp` | |
| SDL2       | [SDL公式サイト](https://www.libsdl.org) | `imgui_impl_sdl2.cpp` | |
| Sokol      | [Sokol公式サイト](https://github.com/floooh/sokol) | [util/sokol_imgui.h](https://github.com/floooh/sokol/blob/master/util/sokol_imgui.h) | GLFWやSDLに比べて低レベル |

## カスタムエンジンを使用する場合

独自の高レベルAPIを活用して、最初から自分のバックエンドを作り直したくなるかもしれませんが、**ちょっと待ってください！**

Dear ImGuiを初めて使用する場合は、まず既存のバックエンドをそのまま使ってみることをおすすめします。これにより、ライブラリの統合にかかる時間を大幅に節約できます。本当に必要になったときに、後からカスタムバックエンドを書くことを検討しても遅くはありません。多くの場合、カスタムバックエンドは標準バックエンドに比べて機能が少なく、バグも多くなりがちです。移植性が必要な場合は、複数のバックエンドを使い、コンパイル時または実行時に選択できるようにすると良いでしょう。

### 例

**例A**: エンジンがWindows＋DirectX11で構築されており、DirectX11上に独自の高レベルなレンダリングシステムがある場合。  
- **提案**: まず`imgui_impl_win32.cpp`と`imgui_impl_dx11.cpp`を使ってみてください。うまく動作したら、本当に必要であれば`imgui_impl_dx11.cpp`のコードを独自のレンダリング関数を使ったカスタムレンダラーに置き換え、標準のWin32コードはそのまま使用するなどの方法を検討してください。

**例B**: エンジンがWindows、Mac、Linuxで動作し、それぞれDirectX11、Metal、Vulkanを使用している場合。  
- **提案**: 複数の汎用バックエンドを使用してください。うまく動作したら、必要に応じてバックエンドの一部を独自の抽象化に置き換えていくと良いでしょう。

**例C**: エンジンがPS4/PS5やSwitchなどの公開できないプラットフォームで動作し、すべての環境で独自の高レベルシステムを使用している場合。  
- **提案**: まず非移植性のバックエンド（例: win32＋ベースとなるグラフィックスAPI）を使用して、デスクトップビルドを先に動作させてみてください。これにより、Dear ImGuiがどのように動作するかを理解しやすくなり、導入も迅速に行えます。その後、自分のエンジンAPIを使用してカスタムバックエンドを再構築することができます。

### 一般的に
カスタムバックエンドを作成することでプロジェクトに付加価値を加えられる可能性は低いと考えられます。

### また、マルチビューポート機能について
「Docking」ブランチの[マルチビューポート機能](https://github.com/ocornut/imgui/wiki/Multi-Viewports)を使うと、Dear ImGuiのウィンドウをメインアプリケーションウィンドウからシームレスに分離できます。これには、プラットフォームやレンダラーのバックエンドに追加のレイヤーを使用し、Dear ImGuiがプラットフォーム固有のリクエスト（例: 「追加のOSウィンドウを作成する」、「レンダーコンテキストを作成する」、「このウィンドウのOS位置を取得する」など）を伝えることが可能です。詳細は「ImGuiPlatformIO」を参照してください。

独自の抽象化でマルチビューポート機能を完全にサポートするのは、シングルビューポートのサポートよりも困難です。`imgui_impl_XXXX.cpp`ファイルを改変せずに使用すれば、ビューポートやプラットフォームウィンドウに関連する改良や修正を自分で手を加えることなく、自動的に受けることができます。