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
      { text: 'チュートリアル', link: '/tutorial/'},
      { text: 'ドキュメント', link: '/document'},
      { text: 'リファレンス', items: [
        {text: 'LuaJITライブラリ', link: '/reference/built_in/'},
        
      ]},
      { text: 'リソース', items: [
        {text: 'GLFW', link: '/resource/glfw/'},
        {text: 'ImGui', link: '/resource/imgui/'},
        {text: 'Lua', link: '/resource/lua/'},
        {text: 'LuaJIT', link: '/resource/luajit/'},
        {text: 'Skia', link: '/resource/skia/'},
        {text: 'Terra', link: '/resource/terra/'},
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
      '/reference/built_in': [
        {
          text: 'はじめに',
          collapsed: false,
          items: [
            { text: 'LuaJITライブラリ', link: '/reference/built_in/' },
          ]
        },
        {
          text: 'グローバル変数',
          collapsed: true,
          items: [
            { text: '_G', link: '/reference/built_in/global/_g.md'},
            { text: '_VERSION', link: '/reference/built_in/global/_version.md'},
          ]
        },
        {
          text: '基本関数',
          collapsed: true,
          items: [
            { text: 'assert', link: '/reference/built_in/std/assert.md'},
            { text: 'collectgarbage', link: '/reference/built_in/std/collectgarbage.md'},
            { text: 'dofile', link: '/reference/built_in/std/dofile.md'},
            { text: 'error', link: '/reference/built_in/std/error.md'},
            { text: 'getfenv', link: '/reference/built_in/std/getfenv.md'},
            { text: 'getmetatable', link: '/reference/built_in/std/getmetatable.md'},
            { text: 'ipairs', link: '/reference/built_in/std/ipairs.md'},
            { text: 'load', link: '/reference/built_in/std/load.md'},
            { text: 'loadfile', link: '/reference/built_in/std/loadfile.md'},
            { text: 'loadstring', link: '/reference/built_in/std/loadstring.md'},
            { text: 'next', link: '/reference/built_in/std/next.md'},
            { text: 'pairs', link: '/reference/built_in/std/pairs.md'},
            { text: 'pcall', link: '/reference/built_in/std/pcall.md'},
            { text: 'print', link: '/reference/built_in/std/print.md'},
            { text: 'rawequal', link: '/reference/built_in/std/rawequal.md'},
            { text: 'rawget', link: '/reference/built_in/std/rawget.md'},
            { text: 'rawset', link: '/reference/built_in/std/rawset.md'},
            { text: 'select', link: '/reference/built_in/std/select.md'},
            { text: 'setfenv', link: '/reference/built_in/std/setfenv.md'},
            { text: 'setmetatable', link: '/reference/built_in/std/setmetatable.md'},
            { text: 'tonumber', link: '/reference/built_in/std/tonumber.md'},
            { text: 'tostring', link: '/reference/built_in/std/tostring.md'},
            { text: 'type', link: '/reference/built_in/std/type.md'},
            { text: 'unpack', link: '/reference/built_in/std/unpack.md'},
            { text: 'xpcall', link: '/reference/built_in/std/xpcall.md'},
          ]
        },
        {
          text: 'コルーチン操作',
          collapsed: true,
          items: [
            { text: 'coroutine.create', link: '/reference/built_in/coroutine/create.md'},
            { text: 'coroutine.resume', link: '/reference/built_in/coroutine/resume.md'},
            { text: 'coroutine.running', link: '/reference/built_in/coroutine/running.md'},
            { text: 'coroutine.status', link: '/reference/built_in/coroutine/status.md'},
            { text: 'coroutine.wrap', link: '/reference/built_in/coroutine/wrap.md'},
            { text: 'coroutine.yield', link: '/reference/built_in/coroutine/yield.md'},
            { text: 'coroutine.isyieldable', link: '/reference/built_in/coroutine/isyieldable.md'},
          ]
        },
        {
          text: 'モジュール',
          collapsed: true,
          items: [
            { text: 'module', link: '/reference/built_in/package/module.md'},
            { text: 'require', link: '/reference/built_in/package/require.md'},
            { text: 'package.cpath', link: '/reference/built_in/package/cpath.md'},
            { text: 'package.loaded', link: '/reference/built_in/package/loaded.md'},
            { text: 'package.loaders', link: '/reference/built_in/package/loaders.md'},
            { text: 'package.loadlib', link: '/reference/built_in/package/loadlib.md'},
            { text: 'package.path', link: '/reference/built_in/package/path.md'},
            { text: 'package.preload', link: '/reference/built_in/package/preload.md'},
            { text: 'package.seeall', link: '/reference/built_in/package/seeall.md'},
            { text: 'package.searchpath', link: '/reference/built_in/package/searchpath.md'},
          ]
        },
        {
          text: '文字列操作',
          collapsed: true,
          items: [
            { text: 'string.byte', link: '/reference/built_in/string/byte.md'},
            { text: 'string.char', link: '/reference/built_in/string/char.md'},
            { text: 'string.dump', link: '/reference/built_in/string/dump.md'},
            { text: 'string.find', link: '/reference/built_in/string/find.md'},
            { text: 'string.format', link: '/reference/built_in/string/format.md'},
            { text: 'string.gmatch', link: '/reference/built_in/string/gmatch.md'},
            { text: 'string.gsub', link: '/reference/built_in/string/gsub.md'},
            { text: 'string.len', link: '/reference/built_in/string/len.md'},
            { text: 'string.lower', link: '/reference/built_in/string/lower.md'},
            { text: 'string.match', link: '/reference/built_in/string/match.md'},
            { text: 'string.rep', link: '/reference/built_in/string/rep.md'},
            { text: 'string.reverse', link: '/reference/built_in/string/reverse.md'},
            { text: 'string.sub', link: '/reference/built_in/string/sub.md'},
            { text: 'string.upper', link: '/reference/built_in/string/upper.md'},
          ]
        },
        {
          text: 'テーブル操作',
          collapsed: true,
          items: [
            { text: 'table.concat', link: '/reference/built_in/table/concat.md'},
            { text: 'table.insert', link: '/reference/built_in/table/insert.md'},
            { text: 'table.maxn', link: '/reference/built_in/table/maxn.md'},
            { text: 'table.remove', link: '/reference/built_in/table/remove.md'},
            { text: 'table.sort', link: '/reference/built_in/table/sort.md'},
            { text: 'table.new', link: '/reference/built_in/table/new.md'},
            { text: 'table.clear', link: '/reference/built_in/table/clear.md'},
            { text: 'table.move', link: '/reference/built_in/table/move.md'},
          ]
        },
        {
          text: '数学関数',
          collapsed: true,
          items: [
            { text: 'math.abs', link: '/reference/built_in/math/abs.md'},
            { text: 'math.acos', link: '/reference/built_in/math/acos.md'},
            { text: 'math.asin', link: '/reference/built_in/math/asin.md'},
            { text: 'math.atan', link: '/reference/built_in/math/atan.md'},
            { text: 'math.atan2', link: '/reference/built_in/math/atan2.md'},
            { text: 'math.ceil', link: '/reference/built_in/math/ceil.md'},
            { text: 'math.cos', link: '/reference/built_in/math/cos.md'},
            { text: 'math.cosh', link: '/reference/built_in/math/cosh.md'},
            { text: 'math.deg', link: '/reference/built_in/math/deg.md'},
            { text: 'math.exp', link: '/reference/built_in/math/exp.md'},
            { text: 'math.floor', link: '/reference/built_in/math/floor.md'},
            { text: 'math.fmod', link: '/reference/built_in/math/fmod.md'},
            { text: 'math.frexp', link: '/reference/built_in/math/frexp.md'},
            { text: 'math.huge', link: '/reference/built_in/math/huge.md'},
            { text: 'math.ldexp', link: '/reference/built_in/math/ldexp.md'},
            { text: 'math.log', link: '/reference/built_in/math/log.md'},
            { text: 'math.log10', link: '/reference/built_in/math/log10.md'},
            { text: 'math.max', link: '/reference/built_in/math/max.md'},
            { text: 'math.min', link: '/reference/built_in/math/min.md'},
            { text: 'math.modf', link: '/reference/built_in/math/modf.md'},
            { text: 'math.pi', link: '/reference/built_in/math/pi.md'},
            { text: 'math.pow', link: '/reference/built_in/math/pow.md'},
            { text: 'math.rad', link: '/reference/built_in/math/rad.md'},
            { text: 'math.random', link: '/reference/built_in/math/random.md'},
            { text: 'math.randomseed', link: '/reference/built_in/math/randomseed.md'},
            { text: 'math.sin', link: '/reference/built_in/math/sin.md'},
            { text: 'math.sinh', link: '/reference/built_in/math/sinh.md'},
            { text: 'math.sqrt', link: '/reference/built_in/math/sqrt.md'},
            { text: 'math.tan', link: '/reference/built_in/math/tan.md'},
            { text: 'math.tanh', link: '/reference/built_in/math/tanh.md'},
          ]
        },
        {
          text: '入出力機能',
          collapsed: true,
          items: [
            { text: 'io.close', link: '/reference/built_in/io/close.md'},
            { text: 'io.flush', link: '/reference/built_in/io/flush.md'},
            { text: 'io.input', link: '/reference/built_in/io/input.md'},
            { text: 'io.lines', link: '/reference/built_in/io/lines.md'},
            { text: 'io.open', link: '/reference/built_in/io/open.md'},
            { text: 'io.output', link: '/reference/built_in/io/output.md'},
            { text: 'io.popen', link: '/reference/built_in/io/popen.md'},
            { text: 'io.read', link: '/reference/built_in/io/read.md'},
            { text: 'io.tmpfile', link: '/reference/built_in/io/tmpfile.md'},
            { text: 'io.type', link: '/reference/built_in/io/type.md'},
            { text: 'io.write', link: '/reference/built_in/io/write.md'},
            { text: 'file:close', link: '/reference/built_in/io/file_close.md'},
            { text: 'file:flush', link: '/reference/built_in/io/file_flush.md'},
            { text: 'file:lines', link: '/reference/built_in/io/file_lines.md'},
            { text: 'file:read', link: '/reference/built_in/io/file_read.md'},
            { text: 'file:seek', link: '/reference/built_in/io/file_seek.md'},
            { text: 'file:setvbuf', link: '/reference/built_in/io/file_setvbuf.md'},
            { text: 'file:write', link: '/reference/built_in/io/file_write.md'},
          ]
        },
        {
          text: 'OSの機能',
          collapsed: true,
          items: [
            { text: 'os.clock', link: '/reference/built_in/os/clock.md'},
            { text: 'os.date', link: '/reference/built_in/os/date.md'},
            { text: 'os.difftime', link: '/reference/built_in/os/difftime.md'},
            { text: 'os.execute', link: '/reference/built_in/os/execute.md'},
            { text: 'os.exit', link: '/reference/built_in/os/exit.md'},
            { text: 'os.getenv', link: '/reference/built_in/os/getenv.md'},
            { text: 'os.remove', link: '/reference/built_in/os/remove.md'},
            { text: 'os.rename', link: '/reference/built_in/os/rename.md'},
            { text: 'os.setlocale', link: '/reference/built_in/os/setlocale.md'},
            { text: 'os.time', link: '/reference/built_in/os/time.md'},
            { text: 'os.tmpname', link: '/reference/built_in/os/tmpname.md'},
          ]
        },
        {
          text: 'デバッグ機能',
          collapsed: true,
          items: [
            { text: 'debug.debug', link: '/reference/built_in/debug/debug.md'},
            { text: 'debug.getfenv', link: '/reference/built_in/debug/getfenv.md'},
            { text: 'debug.gethook', link: '/reference/built_in/debug/gethook.md'},
            { text: 'debug.getinfo', link: '/reference/built_in/debug/getinfo.md'},
            { text: 'debug.getlocal', link: '/reference/built_in/debug/getlocal.md'},
            { text: 'debug.getmetatable', link: '/reference/built_in/debug/getmetatable.md'},
            { text: 'debug.getregistry', link: '/reference/built_in/debug/getregistry.md'},
            { text: 'debug.getupvalue', link: '/reference/built_in/debug/getupvalue.md'},
            { text: 'debug.setfenv', link: '/reference/built_in/debug/setfenv.md'},
            { text: 'debug.sethook', link: '/reference/built_in/debug/sethook.md'},
            { text: 'debug.setlocal', link: '/reference/built_in/debug/setlocal.md'},
            { text: 'debug.setmetatable', link: '/reference/built_in/debug/setmetatable.md'},
            { text: 'debug.setupvalue', link: '/reference/built_in/debug/setupvalue.md'},
            { text: 'debug.traceback', link: '/reference/built_in/debug/traceback.md'},
            { text: 'debug.upvalueid', link: '/reference/built_in/debug/upvalueid.md'},
            { text: 'debug.upvaluejoin', link: '/reference/built_in/debug/upvaluejoin.md'},
          ]
        },
        {
          text: 'ビット操作',
          collapsed: true,
          items: [
            { text: 'bit.tobit', link: '/reference/built_in/bit/tobit.md'},
            { text: 'bit.tohex', link: '/reference/built_in/bit/tohex.md'},
            { text: 'bit.bnot', link: '/reference/built_in/bit/bnot.md'},
            { text: 'bit.band', link: '/reference/built_in/bit/band.md'},
            { text: 'bit.bor', link: '/reference/built_in/bit/bor.md'},
            { text: 'bit.bxor', link: '/reference/built_in/bit/bxor.md'},
            { text: 'bit.lshift', link: '/reference/built_in/bit/lshift.md'},
            { text: 'bit.rshift', link: '/reference/built_in/bit/rshift.md'},
            { text: 'bit.arshift', link: '/reference/built_in/bit/arshift.md'},
            { text: 'bit.rol', link: '/reference/built_in/bit/rol.md'},
            { text: 'bit.ror', link: '/reference/built_in/bit/ror.md'},
            { text: 'bit.bswap', link: '/reference/built_in/bit/bswap.md'},
          ]
        },
        {
          text: 'FFI',
          collapsed: true,
          items: [
            { text: 'ffi.os', link: '/reference/built_in/ffi/os.md'},
            { text: 'ffi.arch', link: '/reference/built_in/ffi/arch.md'},
            { text: 'ffi.cdef', link: '/reference/built_in/ffi/cdef.md'},
            { text: 'ffi.C', link: '/reference/built_in/ffi/c.md'},
            { text: 'ffi.load', link: '/reference/built_in/ffi/load.md'},
            { text: 'ffi.new', link: '/reference/built_in/ffi/new.md'},
            { text: 'ctype', link: '/reference/built_in/ffi/ctype.md'},
            { text: 'ffi.typeof', link: '/reference/built_in/ffi/typeof.md'},
            { text: 'ffi.cast', link: '/reference/built_in/ffi/cast.md'},
            { text: 'ffi.metatype', link: '/reference/built_in/ffi/metatype.md'},
            { text: 'ffi.gc', link: '/reference/built_in/ffi/gc.md'},
            { text: 'ffi.sizeof', link: '/reference/built_in/ffi/sizeof.md'},
            { text: 'ffi.alignof', link: '/reference/built_in/ffi/alignof.md'},
            { text: 'ffi.offsetof', link: '/reference/built_in/ffi/offsetof.md'},
            { text: 'ffi.errno', link: '/reference/built_in/ffi/errno.md'},
            { text: 'ffi.string', link: '/reference/built_in/ffi/string.md'},
            { text: 'ffi.copy', link: '/reference/built_in/ffi/copy.md'},
            { text: 'ffi.fill', link: '/reference/built_in/ffi/fill.md'},
            { text: 'ffi.abi', link: '/reference/built_in/ffi/abi.md'},
            { text: 'cb:free', link: '/reference/built_in/ffi/cb_free.md'},
            { text: 'cb:set', link: '/reference/built_in/ffi/cb_set.md'},
          ]
        },
        {
          text: 'JIT',
          collapsed: true,
          items: [
            { text: 'jit.version', link: '/reference/built_in/jit/version.md'},
            { text: 'jit.version_num', link: '/reference/built_in/jit/version_num.md'},
            { text: 'jit.os', link: '/reference/built_in/jit/os.md'},
            { text: 'jit.arch', link: '/reference/built_in/jit/arch.md'},
            { text: 'jit.on', link: '/reference/built_in/jit/on.md'},
            { text: 'jit.off', link: '/reference/built_in/jit/off.md'},
            { text: 'jit.flush', link: '/reference/built_in/jit/flush.md'},
            { text: 'jit.status', link: '/reference/built_in/jit/status.md'},
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
      '/resource/glfw/': [
        {
          text: 'GLFW',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/resource/glfw/'},
            {text: 'イントロダクション', link: '/resource/glfw/introduction.md'},
            {text: 'チュートリアル', link: '/resource/glfw/tutorial/'},
          ]
        },
        {
          text: 'プログラミングガイド',
          collapsed: false,
          items: [
            {text: 'API入門', link: '/resource/glfw/guides/introduction_to_the_api.md'},
            {text: 'ウィンドウガイド', link: '/resource/glfw/guides/window_guide.md'},
            {text: 'コンテキストガイド', link: '/resource/glfw/guides/context_guide.md'},
            {text: 'モニターガイド', link: '/resource/glfw/guides/monitor_guide.md'},
            {text: '入力ガイド', link: '/resource/glfw/guides/input_guide.md'},
          ]
        },
        {
          text: 'リファレンス',
          collapsed: false,
          items: [
            {text: '目次', link: '/resource/glfw/reference/'},
            {text: 'コンテキスト', link: '/resource/glfw/reference/context.md'},
            {text: '初期化など', link: '/resource/glfw/reference/init.md'},
            {text: 'エラーコード', link: '/resource/glfw/reference/error.md'},
            {text: '入力', link: '/resource/glfw/reference/input.md'},
            {text: 'ゲームパッドの軸', link: '/resource/glfw/reference/gamepad_axes.md'},
            {text: 'ゲームパッドのボタン', link: '/resource/glfw/reference/gamepad_buttons.md'},
            {text: 'ジョイスティックのハット', link: '/resource/glfw/reference/joystick_hat_states.md'},
            {text: 'ジョイスティック', link: '/resource/glfw/reference/joysticks.md'},
            {text: 'キーボードのキー', link: '/resource/glfw/reference/keyboard_keys.md'},
            {text: '修飾キー', link: '/resource/glfw/reference/modifier_key_flags.md'},
            {text: 'マウスボタン', link: '/resource/glfw/reference/mouse_buttons.md'},
            {text: 'カーソルの形状', link: '/resource/glfw/reference/standard_cursor_shapes.md'},
            {text: 'モニター', link: '/resource/glfw/reference/monitor.md'},
            {text: 'ネイティブアクセス', link: '/resource/glfw/reference/native.md'},
            {text: 'Vulkanサポート', link: '/resource/glfw/reference/vulkan.md'},
            {text: 'ウィンドウ', link: '/resource/glfw/reference/window.md'},
          ]
        },
      ],
      '/resource/imgui/': [
        {
          text: 'ImGui',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/resource/imgui/'},
            {text: 'imgui.h', link: '/resource/imgui/imgui_h.md'},
          ]
        }
      ],
      '/resource/lua/': [
        {
          text: 'Lua',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/resource/lua/'},
            {text: 'contact', link: '/resource/lua/contact'},
          ]
        },
        {
          text: 'about',
          collapsed: false,
          items: [
            {text: 'news', link: '/resource/lua/news'},
            {text: 'showcase', link: '/resource/lua/showcase'},
            {text: 'uses', link: '/resource/lua/uses'},
            {text: 'quotes', link: '/resource/lua/quotes'},
            {text: 'press', link: '/resource/lua/press'},
            {text: 'authors', link: '/resource/lua/authors'},
            {text: 'thanks', link: '/resource/lua/thanks'},
          ]
        },
        {
          text: 'download',
          collapsed: false,
          items: [
            {text: 'download', link: '/resource/lua/download'},
            {text: 'license', link: '/resource/lua/license'},
            {text: 'live demo', link: '/resource/lua/demo'},
          ]
        },
        {
          text: 'ドキュメント',
          collapsed: false,
          items: [
            {text: 'documentation', link: '/resource/lua/documentation'},
            {text: 'getting started', link: '/resource/lua/getting_started'},
            {
              text: 'reference manual',
              collapsed: false,
              items: [
                {text:'reference manual', link:'/resource/lua/reference_manual'},
                {text:'5.4 manual', link:'/resource/lua/5.4_manual'},
                {text:'5.3 manual', link:'/resource/lua/5.3_manual'},
                {text:'5.2 manual', link:'/resource/lua/5.2_manual'},
                {text:'5.1 manual', link:'/resource/lua/5.1_manual'},
              ]
            },
            {text: 'faq', link: '/resource/lua/faq'},
            {text: 'versions', link: '/resource/lua/versions'},
          ]
        },
        {
          text: 'community',
          collapsed: false,
          items: [
              {text: 'community', link: '/resource/lua/community'},
          ]
        },
      ],
      '/resource/luajit/': [
        {
          text: 'LuaJIT',
          collapsed: false,
          items: [
            {text: 'ホーム', link: '/resource/luajit/'},
            {text: 'LuaJIT', link: '/resource/luajit/luajit'},
            {text: 'ダウンロード', link: '/resource/luajit/download'},
            {text: 'インストール', link: '/resource/luajit/installation'},
            {text: '実行する', link: '/resource/luajit/running'},
            {text: '拡張機能', link: '/resource/luajit/extensions'},
            {text: 'FFIライブラリ', link: '/resource/luajit/ffi_library'},
            {text: 'FFIチュートリアル', link: '/resource/luajit/ffi_tutorial'},
            {text: 'ffi.* API', link: '/resource/luajit/ffi_api'},
            {text: 'FFIセマンティクス', link: '/resource/luajit/ffi_semantics'},
            {text: 'String Buffers', link: '/resource/luajit/string_buffers'},
            {text: 'jit.* Library', link: '/resource/luajit/jit_library'},
            {text: 'Lua/C API', link: '/resource/luajit/lua_c_api'},
            {text: 'プロファイラ', link: '/resource/luajit/profiler'},
            {text: 'ステータス', link: '/resource/luajit/status'},
            {text: 'FAQ', link: '/resource/luajit/faq'},
            {text: 'メーリングリスト', link: '/resource/luajit/mailing_list'},
            {text: 'スポンサー', link: '/resource/luajit/sponsors'},
          ]
        },
      ],
      '/resource/skia/': [
        {
          text: 'Skia',
          collapsed: false,
          items: [
            {text: 'はじめに', link: '/resource/skia/'},
            {text: 'Skiaのダウンロード方法', link: '/resource/skia/how_to_download_skia.md'},
            {text: 'Skiaのビルド方法', link: '/resource/skia/how_to_build_skia.md'},
            {text: 'skia/BUILD.gn', link: '/resource/skia/skia_build_gn.md'},
            {text: 'skia/gn/BUILDCONFIG.gn', link: '/resource/skia/skia_gn_buildconfig_gn.md'},
            {text: 'skia/gn/skia.gni', link: '/resource/skia/skia_gn_skia_gni.md'},
            {text: 'skia/gn/skia/BUILD.gn', link: '/resource/skia/skia_gn_skia_build_gn.md'},
            {text: 'skia/gn/toolchain/BUILD.gn', link: '/resource/skia/skia_gn_toolchain_build_gn.md'},
          ]
        },
      ],
      '/resource/terra/': [
        {
          text: 'Terra',
          collapsed: false,
          items: [
            {text: 'トップ', link: '/resource/terra/'},
            {text: 'はじめに', link: '/resource/terra/getting-started.md'},
            {text: 'APIリファレンス', link: '/resource/terra/api.md'},
            {text: 'Terra for C++', link: '/resource/terra/terraforcpp.md'},
            {text: '出版物', link: '/resource/terra/publications.md'},
            {text: 'コミュニティ', link: '/resource/terra/community.md'},
          ]
        },
      ],
    },
  }
})
