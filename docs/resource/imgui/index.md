# Dear ImGui

::: info
このページおよび同じカテゴリーにあるすべてのページは[ImGuiのGitHubリポジトリ](https://github.com/ocornut/imgui)のドキュメント等を翻訳したものです。
:::

> 「状態を持たせると、いつかバグが発生する。しかし、2つの異なる場所で状態を同期させる方法を教えれば、一生涯バグに悩まされるだろう。」 [-ryg](https://twitter.com/rygorous/status/1507178315886444544)

（このライブラリは自由で許容範囲の広いライセンスで提供されていますが、今後の改善を支えるために財政的な支援が必要です。メンテナンスと安定性に加え、まだ多くの望ましい機能が追加される予定です。もし、貴社がDear ImGuiを利用している場合は、サポートをご検討ください。）

企業向け：開発とメンテナンスの継続支援は請求書ベースのスポンサー契約やサポート契約によって行われています。

- E-mail: contact @ dearimgui dot com
- 個人向け：開発とメンテナンスの継続支援については[こちら](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WGHNC6MBFLZ2S)をご覧ください。また[Funding](https://github.com/ocornut/imgui/wiki/Funding)ページも参照してください。

## 概要

### Dear ImGuiの特徴

Dear ImGuiは、**C++向けの軽量なグラフィカルユーザーインターフェイスライブラリ**です。最適化された頂点バッファを出力し、3Dパイプラインを活用したアプリケーションでいつでも描画可能です。高速でポータブル、レンダラーに依存せず、外部依存がないため自己完結しています。

Dear ImGuiは、**高速な反復作業**を可能にし、**プログラマーがツールやデバッグ機能を作成する**ことを支援するように設計されています（一般ユーザー向けのUIを提供するのではなく）。この目的に向けたシンプルさと生産性を重視し、一般的な高レベルライブラリに見られる一部の機能（全世界対応、テキストの右から左の表示や双方向テキストのサポートなど）は備えていません。

Dear ImGuiは、特にゲームエンジンへの統合（ツール用）、リアルタイム3Dアプリケーション、全画面アプリケーション、組み込みアプリケーション、またはOS機能が標準ではないコンソールプラットフォーム上のアプリケーションに適しています。

- 状態の同期を最小限にする。
- ユーザー側でのUI関連の状態ストレージを最小限にする。
- セットアップやメンテナンスを最小限にする。
- 動的データセットを反映した動的なUIを簡単に作成できる。
- コード駆動およびデータ駆動のツールを簡単に作成できる。
- 短期間用のアドホックツールや長期的なより複雑なツールの作成が簡単。
- 簡単にカスタマイズや改良が可能。
- ポータブルで依存関係が少なく、様々なターゲットデバイス（コンソール、スマートフォンなど）で動作する。
- 実行時とメモリ消費が効率的。
- ゲーム業界の[多くの主要企業](https://github.com/ocornut/imgui/wiki/Software-using-dear-imgui)で使用され、実績がある。

### 使用方法

**Dear ImGuiのコア部分はプラットフォームに依存しない少数のファイルに自己完結しています**。これらのファイルをアプリケーションやエンジンに簡単に組み込むことが可能です。リポジトリのルートフォルダにあるすべてのファイル（imgui*.cpp, imgui*.h）が該当します。**特別なビルドプロセスは必要ありません**。既存のプロジェクトにこれらの.cppファイルを追加するだけで使用できます。

**さまざまなグラフィックスAPIやレンダリングプラットフォーム向けのバックエンド**が[backends/](https://github.com/ocornut/imgui/tree/master/backends)フォルダに提供されています。また、サンプルアプリケーションは[examples/](https://github.com/ocornut/imgui/tree/master/examples)フォルダにあります。独自のバックエンドを作成することも可能です。テクスチャ付きの三角形をレンダリングできる環境であれば、どこでもDear ImGuiを使用できます。

詳細については、このドキュメントの[Getting Started & Integration](#getting-started--integration)セクションを参照してください。

Dear ImGuiをアプリケーションにセットアップした後、プログラムループ内のどこからでも利用できます。

```cpp
ImGui::Text("Hello, world %d", 123);
if (ImGui::Button("Save"))
    MySaveFunction();
ImGui::InputText("string", buf, IM_ARRAYSIZE(buf));
ImGui::SliderFloat("float", &f, 0.0f, 1.0f);
```

以下のように、ウィンドウやメニュー、色の編集、グラフ表示、スクロール領域のコンテンツ表示なども簡単に作成できます。

```cpp
// 「My First Tool」というウィンドウを作成し、メニューバーを表示する
ImGui::Begin("My First Tool", &my_tool_active, ImGuiWindowFlags_MenuBar);
if (ImGui::BeginMenuBar())
{
    if (ImGui::BeginMenu("File"))
    {
        if (ImGui::MenuItem("Open..", "Ctrl+O")) { /* 処理 */ }
        if (ImGui::MenuItem("Save", "Ctrl+S"))   { /* 処理 */ }
        if (ImGui::MenuItem("Close", "Ctrl+W"))  { my_tool_active = false; }
        ImGui::EndMenu();
    }
    ImGui::EndMenuBar();
}

// 4つのfloat値で色を編集
ImGui::ColorEdit4("Color", my_color);

// サンプルを生成してプロット
float samples[100];
for (int n = 0; n < 100; n++)
    samples[n] = sinf(n * 0.2f + ImGui::GetTime() * 1.5f);
ImGui::PlotLines("Samples", samples, 100);

// スクロール領域内にコンテンツを表示
ImGui::TextColored(ImVec4(1,1,0,1), "Important Stuff");
ImGui::BeginChild("Scrolling");
for (int n = 0; n < 50; n++)
    ImGui::Text("%04d: Some text", n);
ImGui::EndChild();
ImGui::End();
```

Dear ImGuiは、**高度なツール**から非常に短期間で使用するものまで作成できます。例えば、最新のコンパイラのEdit&Continue（ホットコードリロード）機能を利用し、アプリケーション実行中に変数を調整するためのウィジェットを追加し、数分後にコードを削除することも可能です。Dear ImGuiは単なる調整ツールではありません。アルゴリズムの実行状況をテキストコマンドで追跡したり、リフレクションデータと組み合わせてデータセットをリアルタイムで表示したり、エンジン内のサブシステムの内部構造を公開するために使用することもできます。さらに、ロガーやインスペクションツール、プロファイラー、デバッガー、あるいはゲーム制作のエディタやフレームワークを作成するのにも適しています。

### 仕組み

IMGUI（Immediate Mode GUI）パラダイムは、APIを通してユーザー側からの不要な状態の重複、同期、保持を最小限にすることを目指しています。これは従来のリテインドモードインターフェース（Retained Mode Interface）よりもエラーが発生しにくく、（コードが少なく、バグも少なく）動的なユーザーインターフェースの作成に適しています。詳細についてはWikiの[IMGUIパラダイムについて](https://github.com/ocornut/imgui/wiki#about-the-imgui-paradigm)セクションを参照してください。

Dear ImGuiは、頂点バッファとコマンドリストを出力し、これをアプリケーションで簡単にレンダリングできます。レンダリングに必要な描画呼び出しや状態変更の数は非常に少なく、Dear ImGuiは直接グラフィックス状態に触れないため、任意のコード内（例えば実行中のアルゴリズムの途中や独自のレンダリングプロセス中）で関数を呼び出すことができます。既存のコードにDear ImGuiを統合する方法については、examples/フォルダ内のサンプルアプリケーションを参照してください。

一般的な誤解として、Immediate Mode GUIが、効率の悪い描画呼び出しや状態変更を多数行う「Immediate Mode Rendering」と同じとされがちですが、これはDear ImGuiの動作ではありません。Dear ImGuiは頂点バッファと少量の描画呼び出しのバッチを出力し、直接GPUに触れることはありません。この描画バッチは適度に最適化されており、アプリケーション内、またはリモートで後からレンダリングできます。

### リリースと変更履歴

変更履歴については、[リリースページ](https://github.com/ocornut/imgui/releases)を参照してください。変更履歴を読むことで、Dear ImGuiの新機能を把握し、今まで見逃していた機能についても理解が深まるかもしれません。

### デモ

`ImGui::ShowDemoWindow()`関数を呼び出すことで、さまざまな機能とサンプルを紹介するデモウィンドウが表示されます。このコードは常に`imgui_demo.cpp`に参考用として含まれています。[こちらからデモの見た目が確認できます](https://raw.githubusercontent.com/wiki/ocornut/imgui/web/v167/v167-misc.png)。

例をソースからビルドできるはずですが、もしできない場合はお知らせください！Dear ImGuiの機能を素早く確認したい場合、以下のリンクからWindows用のデモアプリケーションバイナリをダウンロードできます。
- [imgui-demo-binaries-20240105.zip](https://www.dearimgui.com/binaries/imgui-demo-binaries-20240105.zip)（Windows, 1.90.1 WIP, ビルド日: 2024/01/05, master）または[以前のバイナリ](https://www.dearimgui.com/binaries)

デモアプリケーションはDPI対応していないため、4K画面では少しぼやけて見える場合があります。DPI対応をアプリケーションで行いたい場合、フォントを異なるスケールで読み込み/再読み込みし、`style.ScaleAllSizes()`でスタイルのスケールを調整してください（[FAQ](https://www.dearimgui.com/faq)を参照）。

### 始め方と統合方法

詳細については、[Getting Started](https://github.com/ocornut/imgui/wiki/Getting-Started)ガイドを参照してください。

ほとんどのプラットフォームでC++を使用する場合、**[imgui_impl_xxxx](https://github.com/ocornut/imgui/tree/master/backends) バックエンドを組み合わせてそのまま利用できる**はずです（例：`imgui_impl_win32.cpp` + `imgui_impl_dx11.cpp`）。エンジンが複数のプラットフォームをサポートしている場合、再作成せずにimgui_impl_xxxxファイルをさらに利用することを検討してください。これにより作業量が減り、Dear ImGuiをすぐに動作させることができます。後から必要に応じて、独自のエンジン機能を使用してカスタムバックエンドを作成することも可能です。

Dear ImGuiを独自のエンジンに統合するには、(1) マウス/キーボード/ゲームパッド入力の接続 (2) テクスチャをGPU/レンダリングエンジンにアップロード (3) テクスチャをバインドし、テクスチャ付き三角形をレンダリングする関数の提供、が必要です。これはバックエンドが実行していることと同じです。[examples/](https://github.com/ocornut/imgui/tree/master/examples)フォルダには、ウィンドウをセットアップし、バックエンドを使用するアプリケーションの例が収められています。[Getting Started](https://github.com/ocornut/imgui/wiki/Getting-Started)ガイドを参照すれば、Dear ImGuiの統合は理論的には1時間以内で完了するはずです。**FAQやコメント、サンプルアプリケーションも必ず確認してください！**

公式にメンテナンスされているバックエンド/バインディング（リポジトリ内）：
- レンダラー: DirectX9, DirectX10, DirectX11, DirectX12, Metal, OpenGL/ES/ES2, SDL_Renderer, Vulkan, WebGPU
- プラットフォーム: GLFW, SDL2/SDL3, Win32, Glut, OSX, Android
- フレームワーク: Allegro5, Emscripten

[サードパーティのバックエンド/バインディング](https://github.com/ocornut/imgui/wiki/Bindings)（Wikiページ）：
- 言語: C, C# および Beef, ChaiScript, CovScript, Crystal, D, Go, Haskell, Haxe/hxcpp, Java, JavaScript, Julia, Kotlin, Lobster, Lua, Nim, Odin, Pascal, PureBasic, Python, ReaScript, Ruby, Rust, Swift, Zig など
- フレームワーク: AGS/Adventure Game Studio, Amethyst, Blender, bsf, Cinder, Cocos2d-x, Defold, Diligent Engine, Ebiten, Flexium, GML/Game Maker Studio, GLEQ, Godot, GTK3, Irrlicht Engine, JUCE, LÖVE+LUA, Mach Engine, Magnum, Marmalade, Monogame, NanoRT, nCine, Nim Game Lib, Nintendo 3DS/Switch/WiiU（ホームブリュー）, Ogre, openFrameworks, OSG/OpenSceneGraph, Orx, Photoshop, px_render, Qt/QtDirect3D, raylib, SFML, Sokol, Unity, Unreal Engine 4/5, UWP, vtk, VulkanHpp, VulkanSceneGraph, Win32 GDI, WxWidgets
- 多くのバインディングは自動生成されています（古くからの[cimgui](https://github.com/cimgui/cimgui)や新しい実験的な[dear_bindings](https://github.com/dearimgui/dear_bindings)による）。これらのメタデータ出力を使って他の言語向けのバインディングを生成することも可能です。

[便利な拡張/ウィジェット](https://github.com/ocornut/imgui/wiki/Useful-Extensions)（Wikiページ）：
- 自動化/テスト、テキストエディタ、ノードエディタ、タイムラインエディタ、プロット、ソフトウェアレンダラー、リモートネットワークアクセス、メモリエディタ、ギズモなど。代表的でサポートが充実している拡張には、[ImPlot](https://github.com/epezent/implot)や[Dear ImGui Test Engine](https://github.com/ocornut/imgui_test_engine)があります。

さらに、リンクやアイデアについては[Wiki](https://github.com/ocornut/imgui/wiki)も参照してください。

### ギャラリー

Dear ImGuiを使用しているプロジェクトの例：

- [Tracy](https://github.com/wolfpld/tracy)（プロファイラ）
- [ImHex](https://github.com/WerWolv/ImHex)（16進エディタ/データ分析ツール）
- [RemedyBG](https://remedybg.itch.io/remedybg)（デバッガ）
- [その他多数のプロジェクト](https://github.com/ocornut/imgui/wiki/Software-using-Dear-ImGui)

Dear ImGuiを使用したプロジェクトのユーザー投稿スクリーンショットについては、[ギャラリースレッド](https://github.com/ocornut/imgui/issues?q=label%3Agallery)をチェックしてください。

サードパーティのウィジェットと拡張機能の一覧については、[Useful Extensions/Widgets](https://github.com/ocornut/imgui/wiki/Useful-Extensions) Wikiページをご覧ください。

- カスタムエンジン [erhe](https://github.com/tksuoran/erhe)（ドッキングブランチ）
- [Wonder Boy: The Dragon's Trap](http://www.TheDragonsTrap.com)（2017年）のカスタムエンジン
- Tracy Profiler（[GitHub](https://github.com/wolfpld/tracy)）

### サポートとFAQ

以下を参照してください：

- [FAQ](https://github.com/ocornut/imgui/blob/master/docs/FAQ.md) — よくある質問が回答されています。
- [Getting Started](https://github.com/ocornut/imgui/wiki/Getting-Started) および [Wiki](https://github.com/ocornut/imgui/wiki) — 参考リンク、記事など。
- [IMGUIパラダイムに関する記事](https://github.com/ocornut/imgui/wiki#about-the-imgui-paradigm) — Immediate Mode GUIパラダイムについて学べます。
- [Upcoming Changes](https://github.com/ocornut/imgui/wiki/Upcoming-Changes)
- [Dear ImGui Test Engine + Test Suite](https://github.com/ocornut/imgui_test_engine) — 自動化とテスト。

検索エンジンによるWikiのクロール用のリンク：[Crawlable Wiki](https://github-wiki-see.page/m/ocornut/imgui/wiki)（人間向けではありません。理由は[こちら](https://github-wiki-see.page/)）。

**初めて利用する方へ**

コンパイル/リンク/実行の問題やフォントの読み込みに関する問題は、[GitHub Discussions](https://github.com/ocornut/imgui/discussions)をご利用ください。その他の質問やバグ報告、リクエスト、フィードバックについては、[GitHub Issues](https://github.com/ocornut/imgui/issues)に投稿してください。新しいIssueを立てる際はテンプレートをよく読んでください。

有料ビジネス顧客向けのプライベートサポートも提供されています（E-mail: _contact @ dearimgui dot com_）。

**どのバージョンを使用すべきか？**

時折、[リリース](https://github.com/ocornut/imgui/releases)がタグ付けされていますが、最新の`master`または`docking`ブランチを同期させるのが安全かつ推奨されています。ライブラリは安定しており、報告された問題については迅速に修正される傾向があります。高度なユーザー向けには、[マルチビューポート](https://github.com/ocornut/imgui/wiki/Multi-Viewports)と[ドッキング](https://github.com/ocornut/imgui/wiki/Docking)機能を備えた`docking`ブランチを使用することも可能です。このブランチは定期的にmasterと同期されています。

**Dear ImGuiの利用者は？**

Dear ImGuiの利用者については、[Quotes](https://github.com/ocornut/imgui/wiki/Quotes)、[Funding & Sponsors](https://github.com/ocornut/imgui/wiki/Funding)、および[Dear ImGuiを使用しているソフトウェア](https://github.com/ocornut/imgui/wiki/Software-using-dear-imgui)のWikiページをご覧ください。お使いのゲームやソフトウェアを追加していただけると幸いです！また、[ギャラリースレッド](https://github.com/ocornut/imgui/issues?q=label%3Agallery)もご確認ください。

## 貢献方法

**どのように貢献できますか？**

- [GitHubフォーラム/Issue](https://github.com/ocornut/imgui/issues)を確認してください。
- 開発に協力し、プルリクエストを送信することができます！プルリクエストを提出する際には、メンテナーがコードを確認し、永続的にメンテナンスを引き継ぐことにもなる点をご理解ください。PRはエンドユーザーの利益と、メンテナーが理解しやすく受け入れやすい内容である必要があります。
- Wikiの[Help wanted](https://github.com/ocornut/imgui/wiki/Help-Wanted)セクションにもアイデアが記載されています。
- [Funding Supporter](https://github.com/ocornut/imgui/wiki/Funding)として支援する！会社によるスポンサー契約やメンテナンス契約、または[Dear ImGui Test Engine](https://github.com/ocornut/imgui_test_engine)のライセンス購入によって財政的に支援できます（お問い合わせ：omar AT dearimgui DOT com）。

## スポンサー

Dear ImGuiの開発は、ユーザーや個別スポンサーからの財政支援によって行われています。

現在および過去のDear ImGuiのサポーターとスポンサーについては、[詳細リスト](https://github.com/ocornut/imgui/wiki/Funding)を参照してください。

2014年11月から2019年12月までの開発も、Patreonや個人の寄付により支援されました。

**過去と現在のサポーターの皆様、プロジェクトを支え、成長を続けさせていただき本当にありがとうございます！**

Dear ImGuiは、オープンソースプロジェクト向けに無償提供されている以下のソフトウェアおよびサービスを使用しています：
- [PVS-Studio](https://pvs-studio.com/en/pvs-studio/?utm_source=website&utm_medium=github&utm_campaign=open_source)（静的解析、C/C++/C#/Java対応）
- [GitHub actions](https://github.com/features/actions)（継続的インテグレーション）
- [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage)（コードカバレッジ分析）

## クレジット

[Omar Cornut](https://www.miracleworld.net)と、GitHub上の[貢献者](https://github.com/ocornut/imgui/graphs/contributors)によって開発されています。このライブラリの初期バージョンは[Media Molecule](https://www.mediamolecule.com)のサポートで開発され、最初にPS Vita向けゲーム[Tearaway](https://tearaway.mediamolecule.com)の内部で使用されました。

継続的な貢献者にはRokas Kupstys [@rokups](https://github.com/rokups)（2020-2022）が含まれ、[Dear ImGui Test Engine](https://github.com/ocornut/imgui_test_engine)にある自動化システムと回帰テストの多くの作業を担当しました。

メンテナンス/サポート契約、スポンサー契約、その他のB2B取引は[Disco Hello](https://www.discohello.com)がホストおよび管理しています。

Omar: 「IMGUIパラダイムは、[Q-Games](https://www.q-games.com)でAtman Binstockが独自に簡易実装をコードベースに追加した際に初めて知りました。その後、私が改善と改良を行い、多くの時間を費やしました。AtmanはCaseyと直接協働することでこのコンセプトを知ったとのことです。Media Moleculeに移った際、最初に取り組んだものの欠点や制限を克服するため、新たなライブラリを作成しました。これが現在のライブラリとなり、以来、この改善に膨大な時間を費やしています。」

フォントはTristan Grimmer（MITライセンス）の[ProggyClean.ttf](https://www.proggyfonts.net)を埋め込んでいます。

[stb_textedit.h, stb_truetype.h, stb_rect_pack.h](https://github.com/nothings/stb/)はSean Barrettによるもので、パブリックドメインです。

初期バージョンのインスピレーション、フィードバック、テストに関わってくださった方々：Casey Muratori, Atman Binstock, Mikko Mononen, Emmanuel Briney, Stefan Kamoda, Anton Mikhailov, Matt Willis。また、GitHubでフィードバック、質問、パッチを投稿してくださった皆様にも感謝いたします。

## ライセンス

Dear ImGuiはMITライセンスのもとで提供されています。詳細については[LICENSE.txt](https://github.com/ocornut/imgui/blob/master/LICENSE.txt)をご覧ください。