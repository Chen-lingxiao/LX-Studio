<script setup>
  import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
  const canvasRef = ref(null);
  const animationId = ref(null);
  const bubbles = ref([]);
  const particles = ref([]);
  const mouse = ref({ x: 0, y: 0 });
  const targetMouse = ref({ x: 0, y: 0 });
  const isVisible = ref(false);
  const frameCount = ref(0);
  const props = defineProps({
    visible: { type: Boolean, default: false },
    scrollProgress: { type: Number, default: 0 },
    isDark: { type: Boolean, default: false },
  });

  const currentTheme = computed(() => props.isDark);
  watch(
    () => props.visible,
    (val) => {
      isVisible.value = val;
    }
  );
  class Bubble {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * this.canvas.width;
      this.y = initial
        ? Math.random() * this.canvas.height
        : this.canvas.height + 30;
      this.z = Math.random() * 400 + 50;
      this.size = Math.random() * 10 + 3;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.15;
      this.wobblePhase = Math.random() * Math.PI * 2;
      this.colorIndex = Math.random() < 0.7 ? 0 : Math.random() < 0.85 ? 1 : 2;
    }
    update(time) {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(time * 0.02 + this.wobblePhase) * 0.2;
      // 简化鼠标交互 - 只在可见范围内检测
      if (this.y > 0 && this.y < this.canvas.height) {
        const dx = this.x - mouse.value.x;
        const dy = this.y - mouse.value.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += dx * force * 0.02;
          this.y += dy * force * 0.02;
        }
      }
      if (this.y < -30) {
        this.reset();
      }
    }
  }
  const colors = [
    { r: 255, g: 255, b: 255, a: 0.5 },
    { r: 200, g: 230, b: 255, a: 0.4 },
    { r: 220, g: 235, b: 245, a: 0.45 },
  ];
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }
    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.size = Math.random() * 1 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.03;
      this.speedY = (Math.random() - 0.5) * 0.02;
      this.brightness = Math.random() * 0.3 + 0.25;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }
  }
  const init = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 气泡数量
    bubbles.value = [];
    const bubbleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / 8000),
      30
    );
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.value.push(new Bubble(canvas));
    }
    // 微粒数量
    particles.value = [];
    const particleCount = Math.min(Math.floor(canvas.width / 100), 12);
    for (let i = 0; i < particleCount; i++) {
      particles.value.push(new Particle(canvas));
    }
    mouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
    targetMouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
  };
  let time = 0;
  const animate = () => {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // 帧跳过 - 限制FPS为30
    frameCount.value++;
    if (frameCount.value % 2 !== 0) {
      animationId.value = requestAnimationFrame(animate);
      return;
    }
    // 简化鼠标平滑
    mouse.value.x += (targetMouse.value.x - mouse.value.x) * 0.05;
    mouse.value.y += (targetMouse.value.y - mouse.value.y) * 0.05;
    drawWaterGradient(ctx, canvas);
    drawLightBeams(ctx, canvas);
    bubbles.value.forEach((bubble) => {
      bubble.update(time);
      drawBubble(ctx, bubble);
    });
    particles.value.forEach((particle) => {
      particle.update();
      drawParticle(ctx, particle);
    });
    drawSurfaceLight(ctx, canvas);
    time += 0.04;
    animationId.value = requestAnimationFrame(animate);
  };
  const drawWaterGradient = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (currentTheme.value) {
      // 暗色模式 - 深海暗色渐变
      gradient.addColorStop(0, '#0a0a1a');
      gradient.addColorStop(0.2, '#0f1f2a');
      gradient.addColorStop(0.4, '#0a1520');
      gradient.addColorStop(0.6, '#051018');
      gradient.addColorStop(0.8, '#030a10');
      gradient.addColorStop(1, '#020508');
    } else {
      // 亮色模式 - 正常水下渐变
      gradient.addColorStop(0, '#4A90A4');
      gradient.addColorStop(0.3, '#3A7A8C');
      gradient.addColorStop(0.5, '#2A6A74');
      gradient.addColorStop(0.7, '#1A5A5C');
      gradient.addColorStop(0.9, '#0A4A44');
      gradient.addColorStop(1, '#052828');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const drawLightBeams = (ctx, canvas) => {
    ctx.save();
    const beamCount = 3;
    for (let i = 0; i < beamCount; i++) {
      const x = canvas.width * (0.2 + i * 0.3);
      const width = 25 + Math.sin(time * 0.3 + i) * 8;
      const opacity = currentTheme.value
        ? 0.015 + Math.sin(time * 0.2 + i * 0.4) * 0.006
        : 0.025 + Math.sin(time * 0.2 + i * 0.4) * 0.01;
      const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
      if (currentTheme.value) {
        gradient.addColorStop(0, `rgba(80, 120, 160, ${opacity})`);
        gradient.addColorStop(0.6, `rgba(60, 100, 130, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(40, 80, 100, 0)');
      } else {
        gradient.addColorStop(0, `rgba(140, 210, 240, ${opacity})`);
        gradient.addColorStop(0.6, `rgba(90, 170, 210, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(70, 140, 190, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(x - width, 0);
      ctx.lineTo(x + width, 0);
      ctx.lineTo(x + width * 1.3, canvas.height);
      ctx.lineTo(x - width * 1.3, canvas.height);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };
  const drawBubble = (ctx, bubble) => {
    const scale = 300 / (bubble.z + 300);
    const screenX = bubble.x;
    const screenY = bubble.y;
    const size = bubble.size * scale;
    if (
      screenX < -20 ||
      screenX > ctx.canvas.width + 20 ||
      screenY < -20 ||
      screenY > ctx.canvas.height + 20
    ) {
      return;
    }
    const color = colors[bubble.colorIndex];
    const alpha = color.a * scale;
    if (alpha < 0.05) return;
    ctx.save();
    // 简化气泡绘制
    const gradient = ctx.createRadialGradient(
      screenX - size * 0.2,
      screenY - size * 0.2,
      0,
      screenX,
      screenY,
      size
    );
    gradient.addColorStop(
      0,
      `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
    );
    gradient.addColorStop(
      0.6,
      `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.4})`
    );
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
    ctx.fill();
    // 简化高光
    if (size > 1.5) {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(
        screenX - size * 0.2,
        screenY - size * 0.2,
        size * 0.2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();
  };
  const drawParticle = (ctx, particle) => {
    ctx.fillStyle = `rgba(200, 240, 255, ${particle.brightness})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  };
  const drawSurfaceLight = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 60);
    if (currentTheme.value) {
      gradient.addColorStop(0, 'rgba(60, 90, 120, 0.08)');
      gradient.addColorStop(0.5, 'rgba(50, 75, 100, 0.04)');
      gradient.addColorStop(1, 'rgba(40, 60, 80, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(170, 230, 250, 0.12)');
      gradient.addColorStop(0.5, 'rgba(140, 210, 235, 0.06)');
      gradient.addColorStop(1, 'rgba(110, 190, 220, 0)');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 60);
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
    class="water-canvas"
    :class="{ visible: isVisible }"
  ></canvas>
</template>

<style scoped>
  .water-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    transform: translateZ(0);
  }

  .water-canvas.visible {
    opacity: 1;
  }
</style>
