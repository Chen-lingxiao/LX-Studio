<script setup>
  import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
  const canvasRef = ref(null);
  const animationId = ref(null);
  const mouse = ref({ x: 0, y: 0 });
  const targetMouse = ref({ x: 0, y: 0 });
  const clouds = ref([]);
  const lightPoints = ref([]);
  const stars = ref([]);
  const isVisible = ref(false);
  const frameCount = ref(0);
  const props = defineProps({
    visible: { type: Boolean, default: false },
    scrollProgress: { type: Number, default: 0 },
    isDark: { type: Boolean, default: false },
  });

  const currentTheme = computed(() => props.isDark);

  // 暗色模式星星类 - 从地面仰望星空效果
  class Star {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.canvas.width;
      // 分布在整个天空，但越靠近地平线越稀疏
      const heightRand = Math.random();
      this.y = heightRand * heightRand * this.canvas.height * 0.85; // 二次分布，上半部分更密集

      // 大小层次：大部分小星星，少数大星星
      const sizeRand = Math.random();
      if (sizeRand < 0.75) {
        this.size = Math.random() * 0.6 + 0.2; // 小星星（多数）
      } else if (sizeRand < 0.92) {
        this.size = Math.random() * 0.8 + 0.6; // 中星星
      } else if (sizeRand < 0.98) {
        this.size = Math.random() * 1.0 + 1.0; // 大星星
      } else {
        this.size = Math.random() * 1.5 + 1.8; // 特亮星（极少数）
      }

      // 大气消光效果：越靠近地平线越暗
      const heightFactor = this.y / (this.canvas.height * 0.85);
      this.baseBrightness =
        (Math.random() * 0.3 + 0.15) * (0.3 + heightFactor * 0.7);

      // 特亮星更亮
      if (sizeRand >= 0.98) {
        this.baseBrightness = Math.random() * 0.3 + 0.5;
      }

      // 颜色类型：白、淡蓝、淡黄、橙色
      const colorRand = Math.random();
      if (colorRand < 0.5) {
        this.color = { r: 255, g: 255, b: 255 }; // 白色
      } else if (colorRand < 0.75) {
        this.color = { r: 200, g: 220, b: 255 }; // 淡蓝
      } else if (colorRand < 0.9) {
        this.color = { r: 255, g: 250, b: 220 }; // 淡黄
      } else {
        this.color = { r: 255, g: 200, b: 150 }; // 橙色（少数）
      }

      // 闪烁：大部分不闪或轻微闪，少数明显闪
      if (sizeRand >= 0.92) {
        this.twinkleSpeed = Math.random() * 0.08 + 0.04; // 明显闪烁
        this.twinkleAmount = 0.3;
      } else {
        this.twinkleSpeed = Math.random() * 0.04 + 0.02; // 轻微闪烁
        this.twinkleAmount = 0.15;
      }
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }
    update(time) {}
  }

  const initStars = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    stars.value = [];
    // 增加星星数量，模拟仰望星空的密集感
    const starCount = Math.min(
      Math.floor((canvas.width * canvas.height) / 8000),
      150
    );
    for (let i = 0; i < starCount; i++) {
      stars.value.push(new Star(canvas));
    }
  };
  watch(
    () => props.visible,
    (val) => {
      isVisible.value = val;
    }
  );
  class Cloud {
    constructor(canvas, layer) {
      this.canvas = canvas;
      this.layer = layer;
      this.reset();
    }
    reset() {
      const layerConfig = [
        { size: 0.6, speed: 0.1, opacity: 0.12, blur: 60 },
        { size: 0.8, speed: 0.18, opacity: 0.16, blur: 45 },
        { size: 1.0, speed: 0.28, opacity: 0.2, blur: 35 },
        { size: 1.1, speed: 0.38, opacity: 0.22, blur: 30 },
      ];
      const config = layerConfig[this.layer];
      this.width = (Math.random() * 250 + 180) * config.size;
      this.height = (Math.random() * 80 + 60) * config.size;
      this.x = Math.random() * (this.canvas.width + this.width) - this.width;
      this.y = this.layer * 150 + Math.random() * 80;
      this.speed = config.speed * (Math.random() * 0.5 + 0.75);
      this.opacity = config.opacity;
      this.blur = config.blur;
      this.direction = Math.random() > 0.5 ? 1 : -1;
    }
    update() {
      this.x += this.speed * this.direction;
      if (this.x > this.canvas.width + this.width) {
        this.x = -this.width;
      } else if (this.x < -this.width) {
        this.x = this.canvas.width + this.width;
      }
    }
  }
  class LightPoint {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * (this.canvas.height * 0.6) + 40;
      this.size = Math.random() * 1.2 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.speedY = (Math.random() - 0.5) * 0.08;
      this.brightness = Math.random() * 0.3 + 0.25;
      this.twinkleSpeed = Math.random() * 0.02 + 0.008;
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }
    update(time) {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 40) this.y = 40;
      if (this.y > this.canvas.height * 0.6) this.y = this.canvas.height * 0.6;
    }
  }
  const init = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 减少云层数量
    clouds.value = [];
    for (let layer = 0; layer < 3; layer++) {
      const cloudCount = 2 + layer;
      for (let i = 0; i < cloudCount; i++) {
        clouds.value.push(new Cloud(canvas, layer));
      }
    }
    // 减少光点数量
    lightPoints.value = [];
    const pointCount = Math.min(Math.floor(canvas.width / 200), 8);
    for (let i = 0; i < pointCount; i++) {
      lightPoints.value.push(new LightPoint(canvas));
    }
    // 初始化星星（暗色模式）
    initStars();
    mouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
    targetMouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
  };
  let time = 0;
  const animate = () => {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // 帧跳过
    frameCount.value++;
    if (frameCount.value % 2 !== 0) {
      animationId.value = requestAnimationFrame(animate);
      return;
    }
    mouse.value.x += (targetMouse.value.x - mouse.value.x) * 0.1;
    mouse.value.y += (targetMouse.value.y - mouse.value.y) * 0.1;
    const offsetX = (mouse.value.x - canvas.width / 2) * 0.1;
    drawSkyGradient(ctx, canvas);
    clouds.value.forEach((cloud) => {
      cloud.update();
      drawCloud(ctx, cloud, offsetX);
    });
    drawGround(ctx, canvas);
    time += 0.04;
    // 暗色模式绘制星星
    drawStars(ctx, time);
    lightPoints.value.forEach((point) => {
      point.update(time);
      drawLightPoint(ctx, point, offsetX, time);
    });
    animationId.value = requestAnimationFrame(animate);
  };
  const drawSkyGradient = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (currentTheme.value) {
      // 暗色模式 - 从地面仰望夜空
      gradient.addColorStop(0, '#050510'); // 天顶深邃
      gradient.addColorStop(0.2, '#0a0a20');
      gradient.addColorStop(0.5, '#0f0f2a');
      gradient.addColorStop(0.75, '#141430');
      gradient.addColorStop(0.9, '#1a1a35'); // 接近地平线稍亮
      gradient.addColorStop(1, '#15152a'); // 地平线
    } else {
      // 亮色模式 - 白天天空渐变
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(0.5, '#E8F4F8');
      gradient.addColorStop(0.85, '#F0F7F9');
      gradient.addColorStop(1, '#FFF8F0');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const drawCloud = (ctx, cloud, offsetX) => {
    const drawX = cloud.x + offsetX * (cloud.layer * 0.1);
    // 暗色模式下减少云层可见度
    if (currentTheme.value) {
      cloud.opacity = cloud.opacity * 0.3;
    }
    ctx.save();
    ctx.filter = `blur(${cloud.blur}px)`;
    const gradient = ctx.createRadialGradient(
      drawX + cloud.width * 0.5,
      cloud.y + cloud.height * 0.5,
      0,
      drawX + cloud.width * 0.5,
      cloud.y + cloud.height * 0.5,
      cloud.width * 0.5
    );
    if (currentTheme.value) {
      gradient.addColorStop(0, `rgba(80, 80, 100, ${cloud.opacity})`);
      gradient.addColorStop(0.6, `rgba(60, 60, 80, ${cloud.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(80, 80, 100, 0)');
    } else {
      gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`);
      gradient.addColorStop(0.6, `rgba(248, 252, 255, ${cloud.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    }
    ctx.fillStyle = gradient;
    // 单个椭圆绘制
    ctx.beginPath();
    ctx.ellipse(
      drawX + cloud.width * 0.5,
      cloud.y + cloud.height * 0.5,
      cloud.width * 0.45,
      cloud.height * 0.5,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  };
  const drawGround = (ctx, canvas) => {
    const groundHeight = canvas.height * 0.15;
    const groundStart = canvas.height - groundHeight;
    const gradient = ctx.createLinearGradient(0, groundStart, 0, canvas.height);
    if (currentTheme.value) {
      gradient.addColorStop(0, 'rgba(30, 40, 50, 0)');
      gradient.addColorStop(0.4, 'rgba(25, 35, 45, 0.12)');
      gradient.addColorStop(1, 'rgba(20, 30, 40, 0.25)');
    } else {
      gradient.addColorStop(0, 'rgba(180, 210, 190, 0)');
      gradient.addColorStop(0.4, 'rgba(170, 205, 185, 0.12)');
      gradient.addColorStop(1, 'rgba(140, 180, 160, 0.25)');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, groundStart, canvas.width, groundHeight);
  };

  // 绘制星星（暗色模式）- 从地面仰望星空效果
  const drawStars = (ctx, time) => {
    if (!currentTheme.value) return;

    // 按大小排序，先画小的再画大的（正确的遮挡关系）
    const sortedStars = [...stars.value].sort((a, b) => a.size - b.size);

    sortedStars.forEach((star) => {
      // 闪烁效果
      const twinkle =
        Math.sin(time * star.twinkleSpeed + star.twinkleOffset) *
          star.twinkleAmount +
        (1 - star.twinkleAmount);
      const alpha = star.baseBrightness * twinkle;
      if (alpha < 0.03) return;

      const { r, g, b } = star.color;

      // 特亮星：更大的光晕和十字光芒
      if (star.size >= 1.8) {
        // 外层大光晕
        const outerGlow = star.size * 6;
        const outerGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          outerGlow
        );
        outerGradient.addColorStop(
          0,
          `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`
        );
        outerGradient.addColorStop(
          0.5,
          `rgba(${r}, ${g}, ${b}, ${alpha * 0.05})`
        );
        outerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, outerGlow, 0, Math.PI * 2);
        ctx.fill();

        // 内层光晕
        const innerGlow = star.size * 3;
        const innerGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          innerGlow
        );
        innerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        innerGradient.addColorStop(
          0.4,
          `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`
        );
        innerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, innerGlow, 0, Math.PI * 2);
        ctx.fill();

        // 核心亮点
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // 普通星星：柔和发光
        const glowSize = star.size * 2;
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowSize
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // 核心
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };
  const drawLightPoint = (ctx, point, offsetX, time) => {
    const twinkle =
      Math.sin(time * point.twinkleSpeed + point.twinkleOffset) * 0.25 + 0.75;
    const alpha = point.brightness * twinkle;
    if (alpha < 0.1) return;
    const x = point.x + offsetX * 0.03;
    const gradient = ctx.createRadialGradient(
      x,
      point.y,
      0,
      x,
      point.y,
      point.size * 5
    );
    gradient.addColorStop(0, `rgba(255, 220, 150, ${alpha})`);
    gradient.addColorStop(0.3, `rgba(255, 200, 100, ${alpha * 0.4})`);
    gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, point.y, point.size * 5, 0, Math.PI * 2);
    ctx.fill();
  };
  const handleMouseMove = (e) => {
    const rect = canvasRef.value.getBoundingClientRect();
    targetMouse.value.x = e.clientX - rect.left;
    targetMouse.value.y = e.clientY - rect.top;
  };
  const handleResize = () => {
    init();
  };
  onMounted(() => {
    init();
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
  });
</script>

<template>
  <canvas
    ref="canvasRef"
    class="sky-canvas"
    :class="{ visible: isVisible }"
  ></canvas>
</template>

<style scoped>
  .sky-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    transform: translateZ(0);
  }

  .sky-canvas.visible {
    opacity: 1;
  }
</style>
