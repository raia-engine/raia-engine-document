import{_ as s,o as a,c as n,N as l}from"./chunks/framework.0e180df0.js";const o="/assets/draw_shape.d244f6cc.png",d=JSON.parse('{"title":"図形の描画","description":"","frontmatter":{},"headers":[],"relativePath":"guide/tutorial/windows/shape.md"}'),p={name:"guide/tutorial/windows/shape.md"},e=l(`<h1 id="図形の描画" tabindex="-1">図形の描画 <a class="header-anchor" href="#図形の描画" aria-label="Permalink to &quot;図形の描画&quot;">​</a></h1><p>ウィンドウに基本となる図形を描画します。</p><h2 id="色々な図形を描く" tabindex="-1">色々な図形を描く <a class="header-anchor" href="#色々な図形を描く" aria-label="Permalink to &quot;色々な図形を描く&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-EHGdA" id="tab-cSGaqGI" checked="checked"><label for="tab-cSGaqGI">ES5</label><input type="radio" name="group-EHGdA" id="tab-aR4WdMH"><label for="tab-aR4WdMH">ES6</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> Raia </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> window </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> Raia</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Window</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">800</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawFilledRect</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawLine</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawFilledEllipse</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">500</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">150</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onUpdate</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">redraw</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">Window</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">raia</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> window </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Window</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">800</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawFilledRect</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawLine</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">255</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">drawFilledEllipse</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">500</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">150</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onUpdate</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">redraw</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div></div></div><h3 id="setcurrentcolor" tabindex="-1">setCurrentColor() <a class="header-anchor" href="#setcurrentcolor" aria-label="Permalink to &quot;setCurrentColor()&quot;">​</a></h3><p>Windowオブジェクトの現在の色を設定します。引数redが赤、greenが緑、blueが青、alphaが透明度を表し、それぞれ0から255までの整数で指定します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">setCurrentColor</span><span style="color:#A6ACCD;">(red</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> green</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> alpha)</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Windowオブジェクトは現在の色を保持しています。現在の色は図形の描画などに使われます。</p></div><h3 id="drawline" tabindex="-1">drawLine() <a class="header-anchor" href="#drawline" aria-label="Permalink to &quot;drawLine()&quot;">​</a></h3><p>ウィンドウに直線を描きます。引数x1, y1に描き始めの座標を指定し、引数x2, y2に終端の座標を指定します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">drawLine</span><span style="color:#A6ACCD;">(x1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> x2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y2)</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>drawLine関数は実際には第9まで引数がありますが、ここでは省略します。続く関数も同様です。</p></div><h3 id="drawfilledrect" tabindex="-1">drawFilledRect() <a class="header-anchor" href="#drawfilledrect" aria-label="Permalink to &quot;drawFilledRect()&quot;">​</a></h3><p>ウィンドウに塗りつぶした矩形を描画します。引数x1, y1に矩形の最初の座標を指定し、引数x2, y2に終端の座標を指定します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">drawFilledRect</span><span style="color:#A6ACCD;">(x1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> x2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y2)</span></span></code></pre></div><h3 id="drawfilledellipse" tabindex="-1">drawFilledEllipse() <a class="header-anchor" href="#drawfilledellipse" aria-label="Permalink to &quot;drawFilledEllipse()&quot;">​</a></h3><p>ウィンドウに塗りつぶした円を描画します。引数x1, y1の座標から引数x2, y2の座標を指定します。指定した座標の矩形に収まる円（または楕円）を描画します。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">drawFilledEllipse</span><span style="color:#A6ACCD;">(x1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> x2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y2)</span></span></code></pre></div><h3 id="スクリーンショット" tabindex="-1">スクリーンショット <a class="header-anchor" href="#スクリーンショット" aria-label="Permalink to &quot;スクリーンショット&quot;">​</a></h3><p><img src="`+o+'" alt=""></p>',20),t=[e];function r(c,C,D,y,F,A){return a(),n("div",null,t)}const w=s(p,[["render",r]]);export{d as __pageData,w as default};