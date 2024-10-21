import { defineConfig, withBase } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  srcDir: './docs',
  outDir: '../raia-engine.github.io/docs',
  ignoreDeadLinks: true,
  title: "RaiaEngine",
  description: "WebAPI-compatible framework for building apps that run in native environments.",
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/raia-engine/raia-document/edit/main/docs/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dolphilia/raia' }
    ],
    nav: [
      { text: 'ホーム', link: '/'},
      { text: 'チュートリアル', items: [
        {text: 'チュートリアル１', link: '/'},
      ]},
      { text: 'ドキュメント', items: [
        {text: 'ビルトイン関数', link: '/document/built_in/'},
      ]},
      { text: 'リファレンス', items: [
        {text: 'Lua', link: '/reference/lua/'},
        {text: 'LuaJIT', link: '/reference/luajit/'},
        {text: 'GLFW', link: '/reference/glfw/'},
        {text: 'GLES', link: '/reference/gles/'},
        {text: 'Skia', link: '/reference/skia/'},
        {text: 'ImGui', link: '/reference/imgui/'},
      ]},
      { text: 'ダウンロード', link: '/download/'},
    ],
    sidebar: {
      '/download/': [
        {
          text: 'ダウンロード',
          items: [
            { text: 'はじめに', link: '/download/' },
          ]
        }
      ],
      '/usage/':[
        {
          text: '使い方',
          collapsed: false,
          items: [
            { text: 'はじめに', link: '/usage/' },
            { text: 'インストールとセットアップ', link: '/usage/setup'}
          ]
        },
        {
          text: 'チュートリアル',
          collapsed: false,
          items: [
            { 
              text: 'Windows編', 
              collapsed: false,
              items: [
                { text:'Hello World', link:'/usage/tutorial/windows/helloworld'},
                { text:'図形を描画する', link:'/usage/tutorial/windows/shape'},
                { text:'画像を表示する', link:'/usage/tutorial/windows/image'},
                { text:'サーフェスに描画する', link:'/usage/tutorial/windows/surface'},
                { text:'メインループを使う', link:'/usage/tutorial/windows/mainloop'},
                { text:'入力を検知する', link:'/usage/tutorial/windows/input'},
              ] 
            },
            { text: 'macOS編', link: '/usage/tutorial/macos/' },
            { text: 'Linux編', link: '/usage/tutorial/linux/' }
          ]
        },
      ],
      '/document/built_in': [
        {
          text: 'はじめに',
          collapsed: false,
          items: [
            { text: 'ビルトイン関数', link: '/document/built_in/' },
          ]
        },
        {
          text: 'グローバル変数',
          collapsed: true,
          items: [
            { text: '_G', link: '/document/built_in/global/_g.md'},
            { text: '_VERSION', link: '/document/built_in/global/_version.md'},
          ]
        },
        {
          text: '基本関数',
          collapsed: true,
          items: [
            { text: 'assert', link: '/document/built_in/std/assert.md'},
            { text: 'collectgarbage', link: '/document/built_in/std/collectgarbage.md'},
            { text: 'dofile', link: '/document/built_in/std/dofile.md'},
            { text: 'error', link: '/document/built_in/std/error.md'},
            { text: 'getfenv', link: '/document/built_in/std/getfenv.md'},
            { text: 'getmetatable', link: '/document/built_in/std/getmetatable.md'},
            { text: 'ipairs', link: '/document/built_in/std/ipairs.md'},
            { text: 'load', link: '/document/built_in/std/load.md'},
            { text: 'loadfile', link: '/document/built_in/std/loadfile.md'},
            { text: 'loadstring', link: '/document/built_in/std/loadstring.md'},
            { text: 'next', link: '/document/built_in/std/next.md'},
            { text: 'pairs', link: '/document/built_in/std/pairs.md'},
            { text: 'pcall', link: '/document/built_in/std/pcall.md'},
            { text: 'print', link: '/document/built_in/std/print.md'},
            { text: 'rawequal', link: '/document/built_in/std/rawequal.md'},
            { text: 'rawget', link: '/document/built_in/std/rawget.md'},
            { text: 'rawset', link: '/document/built_in/std/rawset.md'},
            { text: 'select', link: '/document/built_in/std/select.md'},
            { text: 'setfenv', link: '/document/built_in/std/setfenv.md'},
            { text: 'setmetatable', link: '/document/built_in/std/setmetatable.md'},
            { text: 'tonumber', link: '/document/built_in/std/tonumber.md'},
            { text: 'tostring', link: '/document/built_in/std/tostring.md'},
            { text: 'type', link: '/document/built_in/std/type.md'},
            { text: 'unpack', link: '/document/built_in/std/unpack.md'},
            { text: 'xpcall', link: '/document/built_in/std/xpcall.md'},
          ]
        },
        {
          text: 'コルーチン操作',
          collapsed: true,
          items: [
            { text: 'coroutine.create', link: '/document/built_in/coroutine/create.md'},
            { text: 'coroutine.resume', link: '/document/built_in/coroutine/resume.md'},
            { text: 'coroutine.running', link: '/document/built_in/coroutine/running.md'},
            { text: 'coroutine.status', link: '/document/built_in/coroutine/status.md'},
            { text: 'coroutine.wrap', link: '/document/built_in/coroutine/wrap.md'},
            { text: 'coroutine.yield', link: '/document/built_in/coroutine/yield.md'},
            { text: 'coroutine.isyieldable', link: '/document/built_in/coroutine/isyieldable.md'},
          ]
        },
        {
          text: 'モジュール',
          collapsed: true,
          items: [
            { text: 'module', link: '/document/built_in/package/module.md'},
            { text: 'require', link: '/document/built_in/package/require.md'},
            { text: 'package.cpath', link: '/document/built_in/package/cpath.md'},
            { text: 'package.loaded', link: '/document/built_in/package/loaded.md'},
            { text: 'package.loaders', link: '/document/built_in/package/loaders.md'},
            { text: 'package.loadlib', link: '/document/built_in/package/loadlib.md'},
            { text: 'package.path', link: '/document/built_in/package/path.md'},
            { text: 'package.preload', link: '/document/built_in/package/preload.md'},
            { text: 'package.seeall', link: '/document/built_in/package/seeall.md'},
            { text: 'package.searchpath', link: '/document/built_in/package/searchpath.md'},
          ]
        },
        {
          text: '文字列操作',
          collapsed: true,
          items: [
            { text: 'string.byte', link: '/document/built_in/string/byte.md'},
            { text: 'string.char', link: '/document/built_in/string/char.md'},
            { text: 'string.dump', link: '/document/built_in/string/dump.md'},
            { text: 'string.find', link: '/document/built_in/string/find.md'},
            { text: 'string.format', link: '/document/built_in/string/format.md'},
            { text: 'string.gmatch', link: '/document/built_in/string/gmatch.md'},
            { text: 'string.gsub', link: '/document/built_in/string/gsub.md'},
            { text: 'string.len', link: '/document/built_in/string/len.md'},
            { text: 'string.lower', link: '/document/built_in/string/lower.md'},
            { text: 'string.match', link: '/document/built_in/string/match.md'},
            { text: 'string.rep', link: '/document/built_in/string/rep.md'},
            { text: 'string.reverse', link: '/document/built_in/string/reverse.md'},
            { text: 'string.sub', link: '/document/built_in/string/sub.md'},
            { text: 'string.upper', link: '/document/built_in/string/upper.md'},
          ]
        },
        {
          text: 'テーブル操作',
          collapsed: true,
          items: [
            { text: 'table.concat', link: '/document/built_in/table/concat.md'},
            { text: 'table.insert', link: '/document/built_in/table/insert.md'},
            { text: 'table.maxn', link: '/document/built_in/table/maxn.md'},
            { text: 'table.remove', link: '/document/built_in/table/remove.md'},
            { text: 'table.sort', link: '/document/built_in/table/sort.md'},
            { text: 'table.new', link: '/document/built_in/table/new.md'},
            { text: 'table.clear', link: '/document/built_in/table/clear.md'},
            { text: 'table.move', link: '/document/built_in/table/move.md'},
          ]
        },
        {
          text: '数学関数',
          collapsed: true,
          items: [
            { text: 'math.abs', link: '/document/built_in/math/abs.md'},
            { text: 'math.acos', link: '/document/built_in/math/acos.md'},
            { text: 'math.asin', link: '/document/built_in/math/asin.md'},
            { text: 'math.atan', link: '/document/built_in/math/atan.md'},
            { text: 'math.atan2', link: '/document/built_in/math/atan2.md'},
            { text: 'math.ceil', link: '/document/built_in/math/ceil.md'},
            { text: 'math.cos', link: '/document/built_in/math/cos.md'},
            { text: 'math.cosh', link: '/document/built_in/math/cosh.md'},
            { text: 'math.deg', link: '/document/built_in/math/deg.md'},
            { text: 'math.exp', link: '/document/built_in/math/exp.md'},
            { text: 'math.floor', link: '/document/built_in/math/floor.md'},
            { text: 'math.fmod', link: '/document/built_in/math/fmod.md'},
            { text: 'math.frexp', link: '/document/built_in/math/frexp.md'},
            { text: 'math.huge', link: '/document/built_in/math/huge.md'},
            { text: 'math.ldexp', link: '/document/built_in/math/ldexp.md'},
            { text: 'math.log', link: '/document/built_in/math/log.md'},
            { text: 'math.log10', link: '/document/built_in/math/log10.md'},
            { text: 'math.max', link: '/document/built_in/math/max.md'},
            { text: 'math.min', link: '/document/built_in/math/min.md'},
            { text: 'math.modf', link: '/document/built_in/math/modf.md'},
            { text: 'math.pi', link: '/document/built_in/math/pi.md'},
            { text: 'math.pow', link: '/document/built_in/math/pow.md'},
            { text: 'math.rad', link: '/document/built_in/math/rad.md'},
            { text: 'math.random', link: '/document/built_in/math/random.md'},
            { text: 'math.randomseed', link: '/document/built_in/math/randomseed.md'},
            { text: 'math.sin', link: '/document/built_in/math/sin.md'},
            { text: 'math.sinh', link: '/document/built_in/math/sinh.md'},
            { text: 'math.sqrt', link: '/document/built_in/math/sqrt.md'},
            { text: 'math.tan', link: '/document/built_in/math/tan.md'},
            { text: 'math.tanh', link: '/document/built_in/math/tanh.md'},
          ]
        },
        {
          text: '入出力機能',
          collapsed: true,
          items: [
            { text: 'io.close', link: '/document/built_in/io/close.md'},
            { text: 'io.flush', link: '/document/built_in/io/flush.md'},
            { text: 'io.input', link: '/document/built_in/io/input.md'},
            { text: 'io.lines', link: '/document/built_in/io/lines.md'},
            { text: 'io.open', link: '/document/built_in/io/open.md'},
            { text: 'io.output', link: '/document/built_in/io/output.md'},
            { text: 'io.popen', link: '/document/built_in/io/popen.md'},
            { text: 'io.read', link: '/document/built_in/io/read.md'},
            { text: 'io.tmpfile', link: '/document/built_in/io/tmpfile.md'},
            { text: 'io.type', link: '/document/built_in/io/type.md'},
            { text: 'io.write', link: '/document/built_in/io/write.md'},
            { text: 'file:close', link: '/document/built_in/io/file_close.md'},
            { text: 'file:flush', link: '/document/built_in/io/file_flush.md'},
            { text: 'file:lines', link: '/document/built_in/io/file_lines.md'},
            { text: 'file:read', link: '/document/built_in/io/file_read.md'},
            { text: 'file:seek', link: '/document/built_in/io/file_seek.md'},
            { text: 'file:setvbuf', link: '/document/built_in/io/file_setvbuf.md'},
            { text: 'file:write', link: '/document/built_in/io/file_write.md'},
          ]
        },
        {
          text: 'OSの機能',
          collapsed: true,
          items: [
            { text: 'os.clock', link: '/document/built_in/os/clock.md'},
            { text: 'os.date', link: '/document/built_in/os/date.md'},
            { text: 'os.difftime', link: '/document/built_in/os/difftime.md'},
            { text: 'os.execute', link: '/document/built_in/os/execute.md'},
            { text: 'os.exit', link: '/document/built_in/os/exit.md'},
            { text: 'os.getenv', link: '/document/built_in/os/getenv.md'},
            { text: 'os.remove', link: '/document/built_in/os/remove.md'},
            { text: 'os.rename', link: '/document/built_in/os/rename.md'},
            { text: 'os.setlocale', link: '/document/built_in/os/setlocale.md'},
            { text: 'os.time', link: '/document/built_in/os/time.md'},
            { text: 'os.tmpname', link: '/document/built_in/os/tmpname.md'},
          ]
        },
        {
          text: 'デバッグ機能',
          collapsed: true,
          items: [
            { text: 'debug.debug', link: '/document/built_in/debug/debug.md'},
            { text: 'debug.getfenv', link: '/document/built_in/debug/getfenv.md'},
            { text: 'debug.gethook', link: '/document/built_in/debug/gethook.md'},
            { text: 'debug.getinfo', link: '/document/built_in/debug/getinfo.md'},
            { text: 'debug.getlocal', link: '/document/built_in/debug/getlocal.md'},
            { text: 'debug.getmetatable', link: '/document/built_in/debug/getmetatable.md'},
            { text: 'debug.getregistry', link: '/document/built_in/debug/getregistry.md'},
            { text: 'debug.getupvalue', link: '/document/built_in/debug/getupvalue.md'},
            { text: 'debug.setfenv', link: '/document/built_in/debug/setfenv.md'},
            { text: 'debug.sethook', link: '/document/built_in/debug/sethook.md'},
            { text: 'debug.setlocal', link: '/document/built_in/debug/setlocal.md'},
            { text: 'debug.setmetatable', link: '/document/built_in/debug/setmetatable.md'},
            { text: 'debug.setupvalue', link: '/document/built_in/debug/setupvalue.md'},
            { text: 'debug.traceback', link: '/document/built_in/debug/traceback.md'},
            { text: 'debug.upvalueid', link: '/document/built_in/debug/upvalueid.md'},
            { text: 'debug.upvaluejoin', link: '/document/built_in/debug/upvaluejoin.md'},
          ]
        },
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'はじめに', link: '/api/' },
          ]
        }
      ],
      '/reference/glfw/': [
        {
          text: 'GLFW',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/reference/glfw/'},
            {text: 'イントロダクション', link: '/reference/glfw/introduction.md'},
            {text: 'チュートリアル', link: '/reference/glfw/tutorial/'},
          ]
        },
        {
          text: 'プログラミングガイド',
          collapsed: false,
          items: [
            {text: 'API入門', link: '/reference/glfw/guides/introduction_to_the_api.md'},
            {text: 'ウィンドウガイド', link: '/reference/glfw/guides/window_guide.md'},
            {text: 'コンテキストガイド', link: '/reference/glfw/guides/context_guide.md'},
            {text: 'モニターガイド', link: '/reference/glfw/guides/monitor_guide.md'},
            {text: '入力ガイド', link: '/reference/glfw/guides/input_guide.md'},
          ]
        },
        {
          text: 'リファレンス',
          collapsed: false,
          items: [
            {text: '目次', link: '/reference/glfw/reference/'},
            {text: 'コンテキスト', link: '/reference/glfw/reference/context.md'},
            {text: '初期化など', link: '/reference/glfw/reference/init.md'},
            {text: 'エラーコード', link: '/reference/glfw/reference/error.md'},
            {text: '入力', link: '/reference/glfw/reference/input.md'},
            {text: 'ゲームパッドの軸', link: '/reference/glfw/reference/gamepad_axes.md'},
            {text: 'ゲームパッドのボタン', link: '/reference/glfw/reference/gamepad_buttons.md'},
            {text: 'ジョイスティックのハット', link: '/reference/glfw/reference/joystick_hat_states.md'},
            {text: 'ジョイスティック', link: '/reference/glfw/reference/joysticks.md'},
            {text: 'キーボードのキー', link: '/reference/glfw/reference/keyboard_keys.md'},
            {text: '修飾キー', link: '/reference/glfw/reference/modifier_key_flags.md'},
            {text: 'マウスボタン', link: '/reference/glfw/reference/mouse_buttons.md'},
            {text: 'カーソルの形状', link: '/reference/glfw/reference/standard_cursor_shapes.md'},
            {text: 'モニター', link: '/reference/glfw/reference/monitor.md'},
            {text: 'ネイティブアクセス', link: '/reference/glfw/reference/native.md'},
            {text: 'Vulkanサポート', link: '/reference/glfw/reference/vulkan.md'},
            {text: 'ウィンドウ', link: '/reference/glfw/reference/window.md'},
          ]
        },
      ],
      '/reference/imgui/': [
        {
          text: 'ImGui',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/reference/imgui/'},
            {text: 'imgui.h', link: '/reference/imgui/imgui_h.md'},
          ]
        }
      ],
      '/reference/lua/': [
        {
          text: 'Lua',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/reference/lua/'},
            {text: 'contact', link: '/reference/lua/contact'},
          ]
        },
        {
          text: 'about',
          collapsed: false,
          items: [
            {text: 'news', link: '/reference/lua/news'},
            {text: 'showcase', link: '/reference/lua/showcase'},
            {text: 'uses', link: '/reference/lua/uses'},
            {text: 'quotes', link: '/reference/lua/quotes'},
            {text: 'press', link: '/reference/lua/press'},
            {text: 'authors', link: '/reference/lua/authors'},
            {text: 'thanks', link: '/reference/lua/thanks'},
          ]
        },
        {
          text: 'download',
          collapsed: false,
          items: [
            {text: 'download', link: '/reference/lua/download'},
            {text: 'license', link: '/reference/lua/license'},
            {text: 'live demo', link: '/reference/lua/demo'},
          ]
        },
        {
          text: 'ドキュメント',
          collapsed: false,
          items: [
            {text: 'documentation', link: '/reference/lua/documentation'},
            {text: 'getting started', link: '/reference/lua/getting_started'},
            {
              text: 'reference manual',
              collapsed: false,
              items: [
                {text:'reference manual', link:'/reference/lua/reference_manual'},
                {text:'5.4 manual', link:'/reference/lua/5.4_manual'},
                {text:'5.3 manual', link:'/reference/lua/5.3_manual'},
                {text:'5.2 manual', link:'/reference/lua/5.2_manual'},
                {text:'5.1 manual', link:'/reference/lua/5.1_manual'},
              ]
            },
            {text: 'faq', link: '/reference/lua/faq'},
            {text: 'versions', link: '/reference/lua/versions'},
          ]
        },
        {
          text: 'community',
          collapsed: false,
          items: [
              {text: 'community', link: '/translation/lua/community'},
          ]
        },
      ],
      '/reference/luajit/': [
        {
          text: 'LuaJIT',
          collapsed: false,
          items: [
            {text: 'ホーム', link: '/reference/luajit/'},
            {text: 'LuaJIT', link: '/reference/luajit/luajit'},
            {text: 'ダウンロード', link: '/reference/luajit/download'},
            {text: 'インストール', link: '/reference/luajit/installation'},
            {text: '実行する', link: '/reference/luajit/running'},
            {text: '拡張機能', link: '/reference/luajit/extensions'},
            {text: 'FFIライブラリ', link: '/reference/luajit/ffi_library'},
            {text: 'FFIチュートリアル', link: '/reference/luajit/ffi_tutorial'},
            {text: 'ffi.* API', link: '/reference/luajit/ffi_api'},
            {text: 'FFIセマンティクス', link: '/reference/luajit/ffi_semantics'},
            {text: 'String Buffers', link: '/reference/luajit/string_buffers'},
            {text: 'jit.* Library', link: '/reference/luajit/jit_library'},
            {text: 'Lua/C API', link: '/reference/luajit/lua_c_api'},
            {text: 'プロファイラ', link: '/reference/luajit/profiler'},
            {text: 'ステータス', link: '/reference/luajit/status'},
            {text: 'FAQ', link: '/reference/luajit/faq'},
            {text: 'メーリングリスト', link: '/reference/luajit/mailing_list'},
            {text: 'スポンサー', link: '/reference/luajit/sponsors'},
          ]
        },
      ],
      '/reference/skia/': [
        {
          text: 'Skia',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/reference/skia/'},
            {text: 'Skiaのダウンロード方法', link: '/reference/skia/how_to_download_skia.md'},
            {text: 'Skiaのビルド方法', link: '/reference/skia/how_to_build_skia.md'},
            {text: 'skia/BUILD.gn', link: '/reference/skia/skia_build_gn.md'},
            {text: 'skia/gn/BUILDCONFIG.gn', link: '/reference/skia/skia_gn_buildconfig_gn.md'},
            {text: 'skia/gn/skia.gni', link: '/reference/skia/skia_gn_skia_gni.md'},
            {text: 'skia/gn/skia/BUILD.gn', link: '/reference/skia/skia_gn_skia_build_gn.md'},
            {text: 'skia/gn/toolchain/BUILD.gn', link: '/reference/skia/skia_gn_toolchain_build_gn.md'},
          ]
        },
      ],
    },
  }
})
