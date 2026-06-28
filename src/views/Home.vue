<template>
  <div class="home">
    <canvas ref="glitchCanvasRef" class="glitch-canvas"></canvas>

    <!-- ==================== Header ==================== -->
    <header class="header">
      <div class="header-logo">揽星河 · 研习站</div>
      <nav class="header-nav">
        <a class="nav-link">首页</a>
        <a class="nav-link active">文章</a>
        <a class="nav-link active">项目</a>
        <a class="nav-link">知识库</a>
        <div class="nav-separator"></div>
        <div class="header-icons">
          <span class="icon-active">✉</span>
          <span class="icon-dim">⬡</span>
          <span class="icon-dim">☾</span>
          <span class="icon-dim">⚙</span>
        </div>
      </nav>
    </header>

    <!-- ==================== Hero ==================== -->
    <section class="hero">
      <div class="hero-status">&gt; SYSTEM_BOOT_OK ...</div>
      <h1 ref="heroTitleRef" class="hero-title">&gt; HELLO_WORLD</h1>
      <p class="hero-subtitle">天地一指也 · 万物一马也</p>
      <div class="hero-cursor"></div>
      <div class="hero-bottom">
        <div class="music-widget">
          <span class="music-widget-icon">♪</span>
          <div class="music-visualizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Projects ==================== -->
    <section class="projects" id="projects">
      <div class="section-label">&gt; /archives</div>
      <div class="project-grid">
        <div class="project-row">
          <div class="project-card glow-cyan">
            <div class="card-title cyan">OrbitStarraft</div>
            <div class="card-desc">Earth spacecraft data 3D visualization platform with real-time orbit tracking.</div>
            <div class="card-tags">
              <span class="tag pink">VUE3</span>
              <span class="tag pink">CESIUM</span>
              <span class="tag pink">TS</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Cultivation Realm</div>
            <div class="card-desc">UE5 open world immortal cultivation game with spherical planet exploration.</div>
            <div class="card-tags">
              <span class="tag pink">UE5</span>
              <span class="tag pink">PCG</span>
              <span class="tag pink">C++</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Tech Notes CLI</div>
            <div class="card-desc">Auto convert HTML frontend notes to clean Markdown with Python batch scripts.</div>
            <div class="card-tags">
              <span class="tag pink">PYTHON</span>
              <span class="tag pink">MARKDOWN</span>
              <span class="tag pink">CLI</span>
            </div>
          </div>
        </div>
        <div class="project-row">
          <div class="project-card glow-pink">
            <div class="card-title pink">WebGIS Toolkit</div>
            <div class="card-desc">Reusable Vue3 + Cesium component library for enterprise GIS applications.</div>
            <div class="card-tags">
              <span class="tag cyan">VUE3</span>
              <span class="tag cyan">GIS</span>
              <span class="tag cyan">3D</span>
            </div>
          </div>
          <div class="project-card glow-cyan">
            <div class="card-title cyan">Procedural World</div>
            <div class="card-desc">Experimental UE5 procedural generation for spherical planet terrain and biomes.</div>
            <div class="card-tags">
              <span class="tag pink">UE5</span>
              <span class="tag pink">PROC-GEN</span>
              <span class="tag pink">HERE</span>
            </div>
          </div>
          <div class="project-card glow-pink">
            <div class="card-title pink">AI Dev Pipeline</div>
            <div class="card-desc">WorkBuddy-powered multi-agent development workflow for solo game creation.</div>
            <div class="card-tags">
              <span class="tag cyan">AI</span>
              <span class="tag cyan">AGENT</span>
              <span class="tag cyan">DEV-OPS</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <span class="page cyan">«</span>
        <span class="page pink">1</span>
        <span class="page dim">2</span>
        <span class="page dim">3</span>
        <span class="page faint">…</span>
        <span class="page dim">8</span>
        <span class="page cyan">»</span>
      </div>
    </section>

    <!-- ==================== Articles ==================== -->
    <section class="articles" id="articles">
      <div class="section-label">&gt; /articles</div>
      <div class="tag-filter">
        <span class="tag-item active">全部 11</span>
        <span class="tag-item inactive">技术 8</span>
        <span class="tag-item inactive">闲聊 3</span>
      </div>
      <div class="article-grid">
        <div class="article-row">
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【前端】Vue3 + Cesium 三维地图实战</div>
            <div class="article-desc">从零搭建 WebGIS 可视化平台，涵盖相机控制与空间分析</div>
            <div class="article-meta">
              <span>2026-06-25</span>
              <span>8 分钟</span>
            </div>
          </div>
          <div class="article-card glow-pink">
            <div class="article-title pink">【UE5】程序化生成地形入门指南</div>
            <div class="article-desc">PCG 框架基础及球形星球地表生成技术预研</div>
            <div class="article-meta">
              <span>2026-06-22</span>
              <span>15 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【Python】HTML 批量转 Markdown 脚本</div>
            <div class="article-desc">用 BeautifulSoup 清洗技术笔记，解放双手</div>
            <div class="article-meta">
              <span>2026-06-18</span>
              <span>5 分钟</span>
            </div>
          </div>
        </div>
        <div class="article-row">
          <div class="article-card glow-pink">
            <div class="article-title pink">【游戏设计】修仙开放世界顶层设计</div>
            <div class="article-desc">球形地图、境界系统、NPC 行为树的完整规划</div>
            <div class="article-meta">
              <span>2026-06-15</span>
              <span>20 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【面试】WebGIS 前端面试核心题库</div>
            <div class="article-desc">涵盖 2D/3D GIS、Vue、TypeScript 高频考点</div>
            <div class="article-meta">
              <span>2026-06-10</span>
              <span>12 分钟</span>
            </div>
          </div>
          <div class="article-card glow-cyan">
            <div class="article-title cyan">【工具】独立开发者的 AI 工作流搭建</div>
            <div class="article-desc">多 Agent 协作 + 自动化流水线提升 solo 开发效率</div>
            <div class="article-meta">
              <span>2026-06-05</span>
              <span>10 分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <span class="page cyan">«</span>
        <span class="page pink">1</span>
        <span class="page dim">2</span>
        <span class="page cyan">»</span>
      </div>
    </section>

    <!-- ==================== Music & Today ==================== -->
    <section class="music-today" id="now-playing">
      <div class="section-label">&gt; /now-playing</div>
      <div class="mt-quote">"Live long and prosper"</div>
      <div class="mt-columns">
        <!-- Music Player -->
        <div class="music-card">
          <div class="music-top">
            <div class="album-art"></div>
            <div class="track-info">
              <div class="track-title">Water</div>
              <div class="track-artist">Kontraa · Afro Pop</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-filled"></div>
          </div>
          <div class="time-row">
            <span>1:23</span>
            <span>3:45</span>
          </div>
          <div class="controls">
            <span class="ctrl-dim">↔</span>
            <span class="ctrl-bright">⏮</span>
            <span class="ctrl-play">▶</span>
            <span class="ctrl-bright">⏭</span>
            <span class="ctrl-dim">↻</span>
          </div>
          <div class="playlist-label">// PLAYLIST</div>
          <div class="playlist-separator"></div>
          <div class="playlist">
            <div class="track current">01    No Copyright              3:24</div>
            <div class="track normal">02    Romantic                  4:12</div>
            <div class="track normal">03    Better Day                3:56</div>
            <div class="track normal">04    Once In Paris             4:33</div>
            <div class="track normal">05    Waterfall                 5:01</div>
          </div>
        </div>
        <!-- Today Card -->
        <div class="today-card">
          <div class="today-label">// TODAY</div>
          <div class="today-date">2026 / 06 / 27</div>
          <div class="today-day">星期六 · SATURDAY</div>
          <div class="today-separator"></div>
          <div class="history-label">// HISTORY_ON_THIS_DAY</div>
          <div class="history-list">
            <div class="event">1969  ·  阿波罗11号登月成功</div>
            <div class="event">1977  ·  旅行者1号发射升空</div>
            <div class="event">1998  ·  国际空间站启建</div>
            <div class="event">2021  ·  韦伯望远镜发射</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Footer ==================== -->
    <footer class="footer">
      <div class="footer-left">
        <div class="footer-tag">[揽星河] SYS:v3.7.1</div>
        <div class="footer-copyright">© 2026 揽星河 · 研习站</div>
      </div>
      <div class="footer-right">
        <div class="footer-icp">陇ICP备2026123456号 甘公网安备62072202000212号</div>
        <div class="footer-sync">LAST_SYNC: 2026-06-26 22:53:00 UTC+8</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { PowerGlitch } from 'powerglitch'

// Template refs
const glitchCanvasRef = ref(null)
const heroTitleRef = ref(null)

// ==================== Globals ====================
let glitchCtx = null
let glitchFragments = []
let ambientTimer = null
let ambientInterval = null
let ambientTextTimer = null
let animFrame = null
let heroGlitch = null

// ==================== Canvas Helpers ====================
function resizeCanvas() {
  const canvas = glitchCanvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function spawnFragment() {
  const canvas = glitchCanvasRef.value
  if (!canvas) return
  const neonColors = [
    { r: 0, g: 240, b: 255 },
    { r: 255, g: 46, b: 147 },
    { r: 0, g: 240, b: 255 },
    { r: 255, g: 46, b: 147 },
    { r: 255, g: 255, b: 255 },
  ]
  const color = neonColors[Math.floor(Math.random() * neonColors.length)]
  const w = canvas.width
  const h = canvas.height
  const fw = 60 + Math.random() * 200
  const fh = 3 + Math.random() * 18
  glitchFragments.push({
    x: Math.random() * (w - fw),
    y: Math.random() * (h - fh),
    w: fw,
    h: fh,
    offsetX: (Math.random() - 0.5) * 80,
    color,
    life: 0,
    maxLife: 200 + Math.random() * 300,
  })
}

function drawGlitchFragments() {
  if (!glitchCtx) return
  const canvas = glitchCanvasRef.value
  if (!canvas) return
  glitchCtx.clearRect(0, 0, canvas.width, canvas.height)
  glitchFragments = glitchFragments.filter(f => {
    f.life += 16
    if (f.life >= f.maxLife) return false
    const alpha = 1 - f.life / f.maxLife
    const { r, g, b } = f.color
    glitchCtx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.6})`
    glitchCtx.fillRect(f.x + f.offsetX, f.y, f.w, f.h)
    glitchCtx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.25})`
    glitchCtx.fillRect(f.x + f.offsetX, f.y - 2, f.w, 3)
    glitchCtx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.15})`
    glitchCtx.fillRect(f.x + f.offsetX + Math.random() * f.w, f.y, 1, f.h)
    return true
  })
  if (glitchFragments.length > 0 || ambientInterval) {
    animFrame = requestAnimationFrame(drawGlitchFragments)
  } else {
    animFrame = null
  }
}

function scheduleFragment() {
  if (!ambientInterval) return
  const n = 1 + Math.floor(Math.random() * 2)
  for (let i = 0; i < n; i++) spawnFragment()
  ambientTimer = setTimeout(scheduleFragment, 50 + Math.random() * 300)
}

function triggerAmbientTextGlitch() {
  if (!ambientInterval) return
  const candidates = document.querySelectorAll('.glitchable-text')
  if (candidates.length === 0) {
    ambientTextTimer = setTimeout(triggerAmbientTextGlitch, 600 + Math.random() * 1400)
    return
  }
  const count = 1 + Math.floor(Math.random() * 3)
  const picked = new Set()
  for (let i = 0; i < count && picked.size < candidates.length; i++) {
    let idx
    do { idx = Math.floor(Math.random() * candidates.length) } while (picked.has(idx))
    picked.add(idx)
    const el = candidates[idx]
    const wrapper = el.closest('.powerglitch') || el
    wrapper.classList.add('text-glitch-ambient')
    setTimeout(() => { wrapper.classList.remove('text-glitch-ambient') }, 500)
  }
  ambientTextTimer = setTimeout(triggerAmbientTextGlitch, 600 + Math.random() * 1400)
}

function startAmbientGlitch() {
  ambientInterval = scheduleFragment
  scheduleFragment()
  triggerAmbientTextGlitch()
  if (!animFrame) animFrame = requestAnimationFrame(drawGlitchFragments)
}

function stopAmbientGlitch() {
  ambientInterval = null
  if (ambientTimer) { clearTimeout(ambientTimer); ambientTimer = null }
  if (ambientTextTimer) { clearTimeout(ambientTextTimer); ambientTextTimer = null }
  document.querySelectorAll('.text-glitch-ambient').forEach(el => { el.classList.remove('text-glitch-ambient') })
  glitchFragments = []
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null }
  if (glitchCtx && glitchCanvasRef.value) {
    glitchCtx.clearRect(0, 0, glitchCanvasRef.value.width, glitchCanvasRef.value.height)
  }
}

// ==================== Lifecycle ====================
onMounted(() => {
  // Canvas setup
  glitchCtx = glitchCanvasRef.value?.getContext('2d') || null
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // ===== PowerGlitch Initialization =====
  // Card hover glitch
  PowerGlitch.glitch(
    '.project-card, .article-card, .music-card, .today-card',
    {
      playMode: 'hover',
      hideOverflow: false,
      timing: { duration: 600, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.12, amplitudeY: 0.12 },
      slice: {
        count: 8,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.30,
        cssFilters: 'blur(2px) brightness(1.2)',
      },
    }
  )

  // Text hover glitch
  PowerGlitch.glitch(
    '.hero-subtitle,.header-logo,.nav-link,.section-label,.card-title,.card-desc,.tag,.article-title,.article-desc,.page,.tag-item,.mt-quote,.track-title,.track-artist,.track,.today-date,.today-day,.event,.history-label,.today-label,.footer-tag,.footer-copyright,.footer-icp,.footer-sync,.playlist-label,.hero-status,.article-meta,.time-text',
    {
      playMode: 'hover',
      hideOverflow: false,
      timing: { duration: 500, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.10, amplitudeY: 0.08 },
      slice: {
        count: 6,
        velocity: 14,
        minHeight: 0.03,
        maxHeight: 0.22,
        cssFilters: 'blur(1.8px) brightness(1.18)',
      },
    }
  )

  // Mark glitchable text elements
  document.querySelectorAll('.hero-title,.hero-subtitle,.header-logo,.nav-link,.section-label,.card-title,.card-desc,.tag,.article-title,.article-desc,.page,.tag-item,.mt-quote,.track-title,.track-artist,.track,.today-date,.today-day,.event,.history-label,.today-label,.footer-tag,.footer-copyright,.footer-icp,.footer-sync,.playlist-label,.hero-status,.article-meta,.time-text')
    .forEach(el => el.classList.add('glitchable-text'))

  // Hero title — manual mode glitch
  const heroTitle = heroTitleRef.value
  if (heroTitle) {
    heroGlitch = PowerGlitch.glitch(heroTitle, {
      playMode: 'manual',
      hideOverflow: false,
      timing: { duration: 600, iterations: 1, easing: 'ease-in-out' },
      glitchTimeSpan: { start: 0, end: 0.5 },
      shake: { velocity: 20, amplitudeX: 0.12, amplitudeY: 0.12 },
      slice: {
        count: 8,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.30,
        cssFilters: 'blur(2px) brightness(1.2)',
      },
    })

    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.textContent = '你好 世界'
      heroGlitch.startGlitch()
      ambientTimer = setTimeout(() => {
        startAmbientGlitch()
      }, 2000)
    })
    heroTitle.addEventListener('mouseleave', () => {
      stopAmbientGlitch()
      heroTitle.textContent = '> HELLO_WORLD'
      heroGlitch.startGlitch()
      setTimeout(() => heroGlitch.stopGlitch(), 600)
    })
  }

  // Tag filter toggle
  document.querySelectorAll('.tag-filter .tag-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.tag-filter .tag-item').forEach(t => {
        t.classList.remove('active')
        t.classList.add('inactive')
      })
      this.classList.remove('inactive')
      this.classList.add('active')
    })
  })

  // Nav link smooth scroll
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      const text = this.textContent.trim()
      const map = { '首页': '.hero', '文章': '#articles', '项目': '#projects', '知识库': '#now-playing' }
      const target = map[text]
      if (target) {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  // Music playlist click
  document.querySelectorAll('.playlist .track').forEach(track => {
    track.addEventListener('click', function () {
      document.querySelectorAll('.playlist .track').forEach(t => {
        t.classList.remove('current')
        t.classList.add('normal')
      })
      this.classList.remove('normal')
      this.classList.add('current')
    })
  })

  // Pagination click
  document.querySelectorAll('.pagination .page').forEach(page => {
    page.addEventListener('click', function () {
      if (this.textContent === '\u00AB' || this.textContent === '\u00BB' || this.textContent === '\u2026') return
      const parent = this.closest('.pagination')
      parent.querySelectorAll('.page').forEach(p => {
        if (p.textContent !== '\u00AB' && p.textContent !== '\u00BB' && p.textContent !== '\u2026') {
          p.classList.remove('pink')
          p.classList.add('dim')
        }
      })
      this.classList.remove('dim')
      this.classList.add('pink')
    })
  })

  // Progress bar click
  document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
      this.querySelector('.progress-filled').style.width = pct + '%'
    })
  })
})

onBeforeUnmount(() => {
  stopAmbientGlitch()
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* ==================== CSS Variables ==================== */
.home {
  --bg: #000000;
  --neon-pink: #FF2E93;
  --neon-cyan: #00F0FF;
  --card-bg: #05050A;
  --white-55: rgba(255,255,255,0.55);
  --white-45: rgba(255,255,255,0.45);
  --white-40: rgba(255,255,255,0.40);
  --white-35: rgba(255,255,255,0.35);
  --white-50: rgba(255,255,255,0.50);
  --cyan-15: rgba(0,240,255,0.15);
  --cyan-25: rgba(0,240,255,0.25);
  --cyan-30: rgba(0,240,255,0.30);
  --cyan-60: rgba(0,240,255,0.60);
  --pink-12: rgba(255,46,147,0.12);
  --content-max: 1280px;
  --header-h: 72px;
}

/* ==================== Header ==================== */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-h);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--cyan-15);
}
.header-logo {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--neon-cyan);
  white-space: nowrap;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}
.nav-link {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  color: var(--white-55);
  cursor: pointer;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--neon-cyan); }
.nav-link.active { color: var(--neon-cyan); }
.nav-separator {
  width: 1px;
  height: 16px;
  background: var(--cyan-30);
}
.header-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-icons span {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s;
}
.icon-active { color: var(--neon-cyan); opacity: 1; }
.icon-dim { color: #fff; opacity: 0.5; }
.header-icons span:hover { opacity: 1; }

/* ==================== Section Base ==================== */
.section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--header-h) + 40px) 80px 40px;
  position: relative;
}
.section-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--neon-cyan);
  margin-bottom: 40px;
  align-self: center;
}

/* ==================== Hero ==================== */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-top: var(--header-h);
  position: relative;
}
.hero-status {
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
  color: var(--cyan-60);
}
.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 100px);
  color: var(--neon-pink);
  text-align: center;
  letter-spacing: -2px;
  text-shadow:
    0 0 80px rgba(255,46,147,0.15),
    0 0 40px rgba(255,46,147,0.25),
    0 0 20px rgba(255,46,147,0.50),
    0 0 10px rgba(255,46,147,0.80),
    0 0 4px rgba(255,46,147,1.0);
}
.hero-title:hover { cursor: pointer; }
.hero-subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 20px;
  color: var(--white-55);
  text-align: center;
}
.hero-cursor {
  width: 16px;
  height: 24px;
  background: var(--neon-cyan);
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.hero-bottom {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
}
.music-widget {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-25);
  border-radius: 20px;
  padding: 10px 14px;
  box-shadow: 0 4px 12px rgba(0,240,255,0.30);
}
.music-widget-icon {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: var(--neon-pink);
}
.music-visualizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 14px;
}
.music-visualizer .bar {
  width: 3px;
  background: var(--neon-cyan);
  border-radius: 1px;
  animation: visualize 0.8s ease-in-out infinite alternate;
}
.music-visualizer .bar:nth-child(1) { height: 12px; animation-delay: 0s; }
.music-visualizer .bar:nth-child(2) { height: 8px; animation-delay: 0.15s; }
.music-visualizer .bar:nth-child(3) { height: 14px; animation-delay: 0.3s; }
.music-visualizer .bar:nth-child(4) { height: 6px; animation-delay: 0.45s; }
@keyframes visualize {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

/* ==================== Projects ==================== */
.projects {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.project-grid {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.project-row {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.project-card {
  flex: 1;
  max-width: 380px;
  min-height: 260px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  border-radius: 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.project-card.glow-cyan {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.40),
    inset 0 0 12px rgba(0,240,255,0.20);
}
.project-card.glow-pink {
  border-color: var(--pink-12);
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.30),
    inset 0 0 12px rgba(255,46,147,0.15);
}
.project-card:hover {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.60),
    inset 0 0 20px rgba(0,240,255,0.30),
    0 0 20px rgba(0,240,255,0.15);
}
.project-card.glow-pink:hover {
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.50),
    inset 0 0 20px rgba(255,46,147,0.25),
    0 0 20px rgba(255,46,147,0.15);
}
.card-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 22px;
}
.card-title.cyan { color: var(--neon-cyan); }
.card-title.pink { color: var(--neon-pink); }
.card-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--white-55);
  line-height: 22px;
  flex: 1;
}
.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.card-tags .tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
}
.card-tags .tag.pink { color: var(--neon-pink); }
.card-tags .tag.cyan { color: var(--neon-cyan); }

/* ==================== Pagination ==================== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
}
.pagination .page { cursor: pointer; transition: color 0.2s; }
.pagination .page.cyan { color: var(--neon-cyan); }
.pagination .page.pink { color: var(--neon-pink); }
.pagination .page.dim { color: var(--white-45); }
.pagination .page.faint { color: var(--white-35); }
.pagination .page.dim:hover, .pagination .page.faint:hover { color: var(--neon-cyan); }

/* ==================== Articles ==================== */
.articles {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.tag-filter {
  display: flex;
  gap: 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
}
.tag-filter .tag-item { cursor: pointer; transition: color 0.2s; }
.tag-filter .tag-item.active { color: var(--neon-pink); }
.tag-filter .tag-item.inactive { color: var(--white-40); }
.tag-filter .tag-item.inactive:hover { color: var(--neon-cyan); }
.article-grid {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.article-row {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.article-card {
  flex: 1;
  max-width: 380px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.article-card.glow-cyan {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.30),
    inset 0 0 10px rgba(0,240,255,0.15);
}
.article-card.glow-pink {
  border-color: var(--pink-12);
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.25),
    inset 0 0 10px rgba(255,46,147,0.12);
}
.article-card:hover {
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.50),
    inset 0 0 16px rgba(0,240,255,0.25),
    0 0 16px rgba(0,240,255,0.12);
}
.article-card.glow-pink:hover {
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.40),
    inset 0 0 16px rgba(255,46,147,0.20),
    0 0 16px rgba(255,46,147,0.12);
}
.article-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}
.article-title.cyan { color: var(--neon-cyan); }
.article-title.pink { color: var(--neon-pink); }
.article-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--white-45);
  line-height: 20px;
  min-height: 40px;
}
.article-meta {
  display: flex;
  justify-content: space-between;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-35);
}

/* ==================== Music & Today ==================== */
.music-today {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: calc(var(--header-h) + 40px) 80px 40px;
}
.mt-quote {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--neon-pink);
  text-align: center;
}
.mt-columns {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: var(--content-max);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
/* Music Player Card */
.music-card {
  flex: 1;
  max-width: 720px;
  background: var(--card-bg);
  border: 1px solid var(--cyan-15);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  box-shadow:
    inset 0 0 4px rgba(0,240,255,0.30),
    inset 0 0 10px rgba(0,240,255,0.15);
}
.music-top {
  display: flex;
  gap: 20px;
  align-items: center;
}
.album-art {
  width: 72px;
  height: 72px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--neon-pink), var(--neon-cyan));
  box-shadow: 0 0 12px rgba(0,240,255,0.40);
  flex-shrink: 0;
}
.track-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.track-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--neon-cyan);
}
.track-artist {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--white-45);
}
.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.10);
  border-radius: 2px;
  overflow: hidden;
}
.progress-filled {
  width: 36.5%;
  height: 100%;
  background: var(--neon-pink);
  box-shadow: 0 0 6px rgba(255,46,147,0.60);
  border-radius: 2px;
}
.time-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-40);
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.controls span {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: opacity 0.2s, color 0.2s;
}
.controls .ctrl-dim { font-size: 16px; color: rgba(255,255,255,0.40); }
.controls .ctrl-bright { font-size: 16px; color: rgba(255,255,255,0.60); }
.controls .ctrl-play { font-size: 24px; color: var(--neon-cyan); }
.controls span:hover { opacity: 1; color: var(--neon-cyan); }
.playlist-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-cyan);
}
.playlist-separator {
  width: 100%;
  height: 1px;
  background: rgba(0,240,255,0.10);
}
.playlist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.playlist .track {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  line-height: 22px;
  cursor: pointer;
  transition: color 0.2s;
}
.playlist .track.current { color: var(--neon-pink); }
.playlist .track.normal { color: var(--white-40); }
.playlist .track.normal:hover { color: var(--neon-cyan); }

/* Today Card */
.today-card {
  flex: 1;
  max-width: 536px;
  background: var(--card-bg);
  border: 1px solid var(--pink-12);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow:
    inset 0 0 4px rgba(255,46,147,0.25),
    inset 0 0 10px rgba(255,46,147,0.12);
}
.today-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-pink);
}
.today-date {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--neon-pink);
}
.today-day {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: var(--white-45);
}
.today-separator {
  width: 100%;
  max-width: 472px;
  height: 1px;
  background: rgba(255,46,147,0.10);
}
.history-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--neon-cyan);
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.history-list .event {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  line-height: 20px;
  color: rgba(255,255,255,0.55);
}

/* ==================== Footer ==================== */
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  height: 140px;
  border-top: 1px solid var(--cyan-15);
}
.footer-left { display: flex; flex-direction: column; gap: 8px; }
.footer-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: var(--neon-cyan);
}
.footer-copyright {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 12px;
  color: var(--white-35);
}
.footer-right { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }
.footer-icp {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: var(--white-45);
}
.footer-sync {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: var(--white-35);
}

/* ==================== Responsive ==================== */
@media (max-width: 1280px) {
  .header, .section, .projects, .articles, .music-today, .footer { padding-left: 40px; padding-right: 40px; }
  .hero-bottom { padding: 0 40px; }
}
@media (max-width: 1024px) {
  .project-row, .article-row { flex-direction: column; align-items: center; }
  .project-card, .article-card { max-width: 100%; width: 100%; }
  .mt-columns { flex-direction: column; }
  .music-card, .today-card { max-width: 100%; }
  .header { padding: 0 24px; }
  .header-nav { gap: 16px; }
  .section, .projects, .articles, .music-today { padding-left: 24px; padding-right: 24px; }
}
@media (max-width: 768px) {
  .header-logo { font-size: 16px; }
  .header-nav { gap: 12px; }
  .nav-link { font-size: 12px; }
  .header-icons { gap: 8px; }
  .hero-title { font-size: clamp(32px, 10vw, 64px); }
  .hero-subtitle { font-size: 16px; }
  .footer { flex-direction: column; justify-content: center; gap: 12px; height: auto; padding: 24px; }
  .footer-right { align-items: center; }
}
</style>

<!-- ⚡ Non-scoped: dynamic classes applied by PowerGlitch / JS -->
<style>
/* CSS Variables — global, used by body & PowerGlitch wrappers */
:root {
  --bg: #000000;
  --neon-pink: #FF2E93;
  --neon-cyan: #00F0FF;
  --card-bg: #05050A;
  --white-55: rgba(255,255,255,0.55);
  --white-45: rgba(255,255,255,0.45);
  --white-40: rgba(255,255,255,0.40);
  --white-35: rgba(255,255,255,0.35);
  --white-50: rgba(255,255,255,0.50);
  --cyan-15: rgba(0,240,255,0.15);
  --cyan-25: rgba(0,240,255,0.25);
  --cyan-30: rgba(0,240,255,0.30);
  --cyan-60: rgba(0,240,255,0.60);
  --pink-12: rgba(255,46,147,0.12);
  --content-max: 1280px;
  --header-h: 72px;
}

/* Ambient glitch canvas overlay */
.glitch-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

/* Ambient text glitch — CSS animation for .powerglitch wrappers (dynamic) */
@keyframes ambientTextGlitch {
  0%   { transform: translate(0);     opacity: 1;    filter: none; }
  8%   { transform: translate(3px,-2px); opacity: 0.75; filter: blur(1.2px) brightness(1.18); }
  16%  { transform: translate(-2px,3px); opacity: 1;    filter: blur(0.4px) brightness(1.06); }
  24%  { transform: translate(5px,0);   opacity: 0.7;  filter: blur(1.8px) brightness(1.22); }
  35%  { transform: translate(-4px,-1px); opacity: 0.85; filter: blur(0.6px) brightness(1.1); }
  45%  { transform: translate(0,2px);   opacity: 1;    filter: none; }
  55%  { transform: translate(1px,-1px); opacity: 0.9;  filter: blur(0.3px) brightness(1.04); }
  100% { transform: translate(0);       opacity: 1;    filter: none; }
}
.text-glitch-ambient {
  animation: ambientTextGlitch 0.5s ease-out;
}
</style>
