# Dear ImGui: Examples

**[examples/](https://github.com/ocornut/imgui/blob/master/examples) フォルダには、さまざまなプラットフォームやグラフィックスAPI向けのスタンドアロンでビルド可能なサンプルアプリケーションが含まれています。** これらはすべて、[backends/](https://github.com/ocornut/imgui/blob/master/backends) フォルダ内の標準的なバックエンドを使用しています（詳細は [BACKENDS.md](https://github.com/ocornut/imgui/blob/master/docs/BACKENDS.md) を参照してください）。

サンプルの目的は、バックエンドとの統合方法を示し、Dear ImGuiを試し、自分のアプリケーションやゲーム、エンジンへの統合を進めるためのガイドを提供することです。  
**Dear ImGuiのセットアップと動作が完了したら、`ImGui::ShowDemoWindow()`（imgui_demo.cpp内）を実行し、エンドユーザー向けAPIの使用方法を確認してください。**

一部のサンプルアプリケーションのWindows用バイナリは以下で入手できます：  
[https://www.dearimgui.com/binaries](https://www.dearimgui.com/binaries)

## 初めてのセットアップ

標準的なバックエンドを使用すれば、既存のアプリケーションに統合するのに20行未満で済みます。

```cpp
初期化時:
  ImGui::CreateContext() を呼び出します。
  各バックエンドに対して ImGui_ImplXXXX_Init() を呼び出します。

フレームの開始時:
  各バックエンドに対して ImGui_ImplXXXX_NewFrame() を呼び出します。
  ImGui::NewFrame() を呼び出します。

フレームの終了時:
  ImGui::Render() を呼び出します。
  レンダラーバックエンドに対して ImGui_ImplXXXX_RenderDrawData() を呼び出します。

終了時:
  各バックエンドに対して ImGui_ImplXXXX_Shutdown() を呼び出します。
  ImGui::DestroyContext() を呼び出します。
```

### 主なリソース
- **[Getting Started](https://github.com/ocornut/imgui/wiki/Getting-Started)** Wikiガイドを読んで、既存のアプリケーションにDear ImGuiを統合する詳細な例を確認してください。

### 追加リソース
- FAQ: [https://www.dearimgui.com/faq](https://www.dearimgui.com/faq) を参照してください。
- imgui.cpp の "PROGRAMMER GUIDE" セクションを読んでください。
- 各ファイルの冒頭にあるコメントや説明を読んでください。

### 注意
提供されたバックエンドを使用する場合、`backends/imgui_impl_xxxx(.cpp, .h)` ファイルをプロジェクトに追加し、そのまま使用できます。各 `imgui_impl_xxxx.cpp` ファイルには個別の変更履歴が含まれているため、後で更新する際に変更内容を把握しやすくなります。

## サンプルアプリケーション

- **[example_allegro5/](https://github.com/ocornut/imgui/blob/master/examples/example_allegro5/)**  
  Allegro 5 の例  
  **構成：** `main.cpp` + `imgui_impl_allegro5.cpp`

- **[example_android_opengl3/](https://github.com/ocornut/imgui/blob/master/examples/example_android_opengl3/)**  
  Android + OpenGL3 (ES) の例  
  **構成：** `main.cpp` + `imgui_impl_android.cpp` + `imgui_impl_opengl3.cpp`

- **[example_apple_metal/](https://github.com/ocornut/imgui/blob/master/examples/example_metal/)**  
  macOS & iOS + Metal の例  
  **構成：** `main.m` + `imgui_impl_osx.mm` + `imgui_impl_metal.mm`  
  ※この例はXcode 9以降の「クロスプラットフォーム」ゲームテンプレートに基づいています。  
  **注意：** `imgui_impl_osx.mm` は他のバックエンドほど機能が充実していません。WindowsやLinuxもサポートするGLFWやSDLのバックエンドを使用する方が良い場合があります。

- **[example_apple_opengl2/](https://github.com/ocornut/imgui/blob/master/examples/example_apple_opengl2/)**  
  macOS + OpenGL2 の例  
  **構成：** `main.mm` + `imgui_impl_osx.mm` + `imgui_impl_opengl2.cpp`  
  **注意：** 他のバックエンドと比較すると機能が制限されています。GLFWやSDLを検討してください。

- **[example_glfw_wgpu/](https://github.com/ocornut/imgui/blob/master/examples/example_glfw_wgpu/)**  
  GLFW + WebGPU の例（Emscripten（Web）やDawn（デスクトップ）をサポート）  
  **構成：** `main.cpp` + `imgui_impl_glfw.cpp` + `imgui_impl_wgpu.cpp`  
  **注記：** `example_glfw_opengl3` や `example_sdl2_opengl3` の例もEmscriptenをサポートしています。

- **[example_glfw_metal/](https://github.com/ocornut/imgui/blob/master/examples/example_glfw_metal/)**  
  GLFW（Mac）+ Metal の例  
  **構成：** `main.mm` + `imgui_impl_glfw.cpp` + `imgui_impl_metal.mm`

- **[example_glfw_opengl2/](https://github.com/ocornut/imgui/blob/master/examples/example_glfw_opengl2/)**  
  GLFW + OpenGL2 の例（旧式、固定パイプライン）。  
  **構成：** `main.cpp` + `imgui_impl_glfw.cpp` + `imgui_impl_opengl2.cpp`  
  **注意：モダンなOpenGLやWebGL（シェーダー、VBO、VAOなど）を使用している場合、このコードは使用しないでください。**  
  このコードは主にDear ImGuiの統合方法を学ぶための短い参考例として提供されています。ただし、GL3+コンテキストやモダンなOpenGL呼び出しを使用している場合、このレンダラーを使うと問題が発生しやすく、GL属性を初期状態に戻す必要があり、GPUドライバが混乱する可能性があります。評価：★1、おすすめしません。

- **[example_glfw_opengl3/](https://github.com/ocornut/imgui/blob/master/examples/example_glfw_opengl3/)**  
  GLFW（Win32、Mac、Linux）+ OpenGL3+/ES2/ES3 の例（モダン、プログラマブルパイプライン）。  
  **構成：** `main.cpp` + `imgui_impl_glfw.cpp` + `imgui_impl_opengl3.cpp`  
  モダンなOpenGL呼び出しとカスタムシェーダーを使用します。  
  この例はEmscriptenでビルドし、WebGLをターゲットにすることをサポートしています。  
  **モダンなOpenGLやWebGLを使用している場合は、この例を使用してください。**

- **[example_glfw_vulkan/](https://github.com/ocornut/imgui/blob/master/examples/example_glfw_vulkan/)**  
  GLFW（Win32、Mac、Linux）+ Vulkan の例。  
  **構成：** `main.cpp` + `imgui_impl_glfw.cpp` + `imgui_impl_vulkan.cpp`  
  この例はVulkanの特性により、コードが非常に長く、手間がかかります。`main.cpp`では例外的に `imgui_impl_vulkan.h/cpp` からヘルパー関数を使用しています。

- **[example_glut_opengl2/](https://github.com/ocornut/imgui/blob/master/examples/example_glut_opengl2/)**  
  GLUT（例：Linux/WindowsのFreeGLUT、macOSのGLUTフレームワーク）+ OpenGL2 の例。  
  **構成：** `main.cpp` + `imgui_impl_glut.cpp` + `imgui_impl_opengl2.cpp`  
  **注意：** GLUT/FreeGLUTはほぼ廃止されているため、GLFWやSDLの使用を推奨します。

- **[example_null/](https://github.com/ocornut/imgui/blob/master/examples/example_null/)**  
  Nullの例。imguiをコンパイルしてリンクし、コンテキストを作成し、入力やグラフィック出力なしでヘッドレスで実行します。  
  **構成：** `main.cpp`  
  この例は、できるだけ多くの設定でコアimguiファイルのコンパイルを迅速にテストするために使用されます。このアプリケーションはウィンドウやグラフィックコンテキストを作成しないため、グラフィック出力はありません。

- **[example_sdl2_directx11/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_directx11/)**  
  SDL2 + DirectX11 の例（Windows専用）。  
  **構成：** `main.cpp` + `imgui_impl_sdl2.cpp` + `imgui_impl_dx11.cpp`  
  この例はDirectXとSDL2の使用方法を示します。

- **[example_sdl2_metal/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_metal/)**  
  SDL2 + Metal の例（Mac専用）。  
  **構成：** `main.mm` + `imgui_impl_sdl2.cpp` + `imgui_impl_metal.mm`

- **[example_sdl2_opengl2/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_opengl2/)**  
  SDL2（Win32、Mac、Linuxなど）+ OpenGL の例（旧式、固定パイプライン）。  
  **構成：** `main.cpp` + `imgui_impl_sdl2.cpp` + `imgui_impl_opengl2.cpp`  
  **注意：モダンなOpenGLやWebGLを使用している場合、このコードは使用しないでください。**  
  このコードは主にDear ImGuiの統合方法を学ぶための短い参考例として提供されています。ただし、GL3+コンテキストやモダンなOpenGL呼び出しを使用している場合、このレンダラーは問題を引き起こしやすく、GL属性を初期状態に戻す必要があり、GPUドライバが混乱する可能性があります。評価：★1、おすすめしません。

- **[example_sdl2_opengl3/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_opengl3/)**  
  SDL2（Win32、Mac、Linuxなど）+ OpenGL3+/ES2/ES3 の例。  
  **構成：** `main.cpp` + `imgui_impl_sdl2.cpp` + `imgui_impl_opengl3.cpp`  
  モダンなOpenGL呼び出しとカスタムシェーダーを使用します。  
  この例はEmscriptenでビルドし、WebGLをターゲットにすることをサポートしています。  
  **モダンなOpenGLやWebGLを使用している場合は、この例を使用してください。**

- **[example_sdl2_sdlrenderer2/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_sdlrenderer2/)**  
  SDL2（Win32、Mac、Linuxなど）+ SDL_Rendererを使用した例（SDL2のほとんどのグラフィックスバックエンドをサポート）。  
  **構成：** `main.cpp` + `imgui_impl_sdl2.cpp` + `imgui_impl_sdlrenderer.cpp`  
  **要件：** SDL 2.0.18以降（2021年11月リリース）

- **[example_sdl2_vulkan/](https://github.com/ocornut/imgui/blob/master/examples/example_sdl2_vulkan/)**  
  SDL2（Win32、Mac、Linuxなど）+ Vulkanの例。  
  **構成：** `main.cpp` + `imgui_impl_sdl2.cpp` + `imgui_impl_vulkan.cpp`  
  Vulkanを使用するため、コードが非常に長く手間がかかります。`main.cpp`では例外的に `imgui_impl_vulkan.h/cpp` のヘルパー関数を使用しています。

- **[example_win32_directx9/](https://github.com/ocornut/imgui/blob/master/examples/example_win32_directx9/)**  
  DirectX9の例（Windows専用）。  
  **構成：** `main.cpp` + `imgui_impl_win32.cpp` + `imgui_impl_dx9.cpp`

- **[example_win32_directx10/](https://github.com/ocornut/imgui/blob/master/examples/example_win32_directx10/)**  
  DirectX10の例（Windows専用）。  
  **構成：** `main.cpp` + `imgui_impl_win32.cpp` + `imgui_impl_dx10.cpp`

- **[example_win32_directx11/](https://github.com/ocornut/imgui/blob/master/examples/example_win32_directx11/)**  
  DirectX11の例（Windows専用）。  
  **構成：** `main.cpp` + `imgui_impl_win32.cpp` + `imgui_impl_dx11.cpp`

- **[example_win32_directx12/](https://github.com/ocornut/imgui/blob/master/examples/example_win32_directx12/)**  
  DirectX12の例（Windows専用）。  
  **構成：** `main.cpp` + `imgui_impl_win32.cpp` + `imgui_impl_dx12.cpp`  
  DirectX12を使用するため、コードが非常に長く手間がかかります。

- **[example_win32_opengl3/](https://github.com/ocornut/imgui/blob/master/examples/example_win32_opengl3/)**  
  Windowsネイティブ + OpenGL3（モダンなプログラマブルパイプライン）の例。  
  **構成：** `main.cpp` + `imgui_impl_win32.cpp` + `imgui_impl_opengl3.cpp`


## その他

### ビルドについて

外部ライブラリを使用して移植性の高いビルドファイルを作成・維持するのは、現在でも手間がかかります。そのため、以下の形式で提供しています：
- Linux/OSX向けのMakefile
- Visual Studio 2008以降向けのバッチファイル
- Visual Studio 2012以降向けの`.sln`プロジェクトファイル
- Appleプラットフォーム向けのXcodeプロジェクトファイル  

これらがあなたの環境で動作しない場合はお知らせください！また、`imgui_impl_xxx.cpp/.h`ファイルを自分のコードベースにインポートするか、コマンドラインコンパイラで直接コンパイルすることもできます。

CMakeを使用して例をビルドおよびリンクする方法については、以下を参照してください：
- [Pull Request #1713](https://github.com/ocornut/imgui/pull/1713)
- [Pull Request #3027](https://github.com/ocornut/imgui/pull/3027)

### マウスカーソルの遅延について

Dear ImGuiはほとんどの動作において特別な遅延を追加していません。たとえば、`NewFrame()`の前に渡された最後の`io.AddMousePosEvent()`の値に基づいて、`EndFrame()`または`Render()`時点でウィンドウが正しい位置に移動します。60FPSで動作していれば快適な使用感が得られるはずです。

ただし、OSのマウスカーソルは特定のハードウェアアクセラレート経路で描画されるため、通常のグラフィックスAPI（Dear ImGuiウィンドウを含む）で描画されるコンテンツよりスムーズに感じられる場合があります。この違いにより、特に感覚が敏感なユーザーには違和感を与える可能性があります。

この違いを視覚化するため、`io.MouseDrawCursor`フラグを有効にしてDear ImGuiが通常のグラフィックスAPIを使用してカーソルを描画するようにすることを検討してください。ただし、60FPSでのカーソル描画は遅く感じられるため、常時有効にすることはおすすめしません。インタラクティブなドラッグ操作中のみにソフトウェアレンダリングカーソルを切り替えるのが良いかもしれません。

GPUドライバや設定により、追加の表示遅延が発生する場合があります。ウィンドウのドラッグが遅れて感じられる場合、その原因がわからない場合は、マウスカーソルの直下に単純な2D図形を描画するテストを試してみてください。
