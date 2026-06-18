<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
const canvasRef = ref(null);
const animationId = ref(null);
const clouds = ref([]);
const grassLayers = ref([]);
const flowers = ref([]);
const particles = ref([]);
const stars = ref([]);
const isVisible = ref(false);
const frameCount = ref(0);
const props = defineProps({
  visible: { type: Boolean, default: false },
  scrollProgress: { type: Number, default: 0 },
  isDark: { type: Boolean, default: false },
});

const currentTheme = computed(() => props.isDark);

// 暗色模式星星类
class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height * 0.4;
    this.size = Math.random() * 1.2 + 0.3;
    this.brightness = Math.random() * 0.35 + 0.25;
    this.twinkleSpeed = Math.random() * 0.025 + 0.01;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }
}

const initStars = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  stars.value = [];
  const starCount = Math.min(Math.floor(canvas.width / 150), 25);
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
  constructor(canvas, index) {
    this.canvas = canvas;
    this.index = index;
    this.reset();
  }
  reset() {
    this.width = Math.random() * 300 + 250;
    this.height = Math.random() * 80 + 60;
    this.x = Math.random() * (this.canvas.width + this.width) - this.width;
    this.y = (this.index % 3) * 120 + 20;
    this.speed =
      (Math.random() * 0.05 + 0.015) * (Math.random() > 0.5 ? 1 : -1);
    this.opacity = Math.random() * 0.2 + 0.5;
    this.blur = Math.random() * 30 + 80;
  }
  update() {
    this.x += this.speed;
    if (this.x > this.canvas.width + this.width) {
      this.x = -this.width;
    } else if (this.x < -this.width) {
      this.x = this.canvas.width + this.width;
    }
  }
}
class GrassLayer {
  constructor(canvas, index) {
    this.canvas = canvas;
    this.index = index;
    this.offset = 0;
    this.speed = (0.02 + index * 0.008) * (index % 2 === 0 ? 1 : -1);
  }
  update(time) {
    this.offset += this.speed;
  }
}
class Flower {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height * (0.35 + Math.random() * 0.5);
    this.size = Math.random() * 1 + 0.3;
    this.brightness = Math.random() * 0.3 + 0.3;
    this.colorType = Math.random() > 0.75 ? 'yellow' : 'white';
  }
}
// 萤火虫粒子类 - 闪烁呼吸光晕效果
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    // 天空占39%，绿地占61%；萤火虫主要在绿地，少量在天空底部
    const heightRand = Math.random();
    this.y = this.canvas.height * (0.38 + heightRand * heightRand * 0.55); // 38%-93%高度，下方绿地更密集
    this.baseSize = Math.random() * 1.75 + 1.2;
    this.size = this.baseSize;
    this.speedX = (Math.random() - 0.5) * 0.25;
    this.speedY = (Math.random() - 0.5) * 0.15;
    this.brightness = Math.random() * 0.5 + 0.5;
    this.breathSpeed = Math.random() * 0.4 + 0.5; // 呼吸速度（周期约6-10秒）
    this.breathOffset = Math.random() * Math.PI * 2;
    this.glowSize = Math.random() * 7.2 + 5;
    this.colorType = Math.random() > 0.6 ? 'warm' : 'cool';
  }
  update(time) {
    this.x += this.speedX + Math.sin(time * 0.5 + this.breathOffset) * 0.15;
    this.y += this.speedY + Math.cos(time * 0.3 + this.breathOffset) * 0.1;
    const breath = Math.sin(time * this.breathSpeed + this.breathOffset);
    this.size = this.baseSize * (0.5 + breath * 0.5);
    this.currentBrightness = this.brightness * (0.2 + breath * 0.8); // 呼吸亮度范围加大
    if (
      this.y < this.canvas.height * 0.3 ||
      this.y > this.canvas.height * 0.95 ||
      this.x < -20 ||
      this.x > this.canvas.width + 20
    ) {
      this.reset();
    }
  }
}
const init = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // 减少云层数量
  clouds.value = [];
  for (let i = 0; i < 4; i++) {
    clouds.value.push(new Cloud(canvas, i));
  }
  // 减少草地层数量
  grassLayers.value = [];
  for (let i = 0; i < 2; i++) {
    grassLayers.value.push(new GrassLayer(canvas, i));
  }
  // 减少野花数量
  flowers.value = [];
  const flowerCount = Math.min(Math.floor(canvas.width / 120), 12);
  for (let i = 0; i < flowerCount; i++) {
    flowers.value.push(new Flower(canvas));
  }
  // 漂浮粒子 - 增加数量
  particles.value = [];
  const particleCount = Math.min(Math.floor(canvas.width / 50), 50);
  for (let i = 0; i < particleCount; i++) {
    particles.value.push(new Particle(canvas));
  }
  // 初始化星星（暗色模式）
  initStars();
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
  drawSkyGradient(ctx, canvas);
  clouds.value.forEach((cloud) => {
    cloud.update();
    drawCloud(ctx, cloud);
  });
  drawGrass(ctx, canvas);
  flowers.value.forEach((flower) => {
    drawFlower(ctx, flower);
  });
  // 萤火虫粒子
  particles.value.forEach((particle) => {
    particle.update(time);
    drawParticle(ctx, particle);
  });
  // 暗色模式绘制星星
  drawStars(ctx, time);
  drawWarmOverlay(ctx, canvas);
  time += 0.04;
  animationId.value = requestAnimationFrame(animate);
};
const drawSkyGradient = (ctx, canvas) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (currentTheme.value) {
    // 暗色模式 - 夜空渐变
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.4, '#1a1a3a');
    gradient.addColorStop(0.7, '#2a2a4a');
    gradient.addColorStop(1, '#1a2a3a');
  } else {
    gradient.addColorStop(0, '#E8F4F8');
    gradient.addColorStop(0.6, '#F0F8FA');
    gradient.addColorStop(1, '#F5FAF8');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
const drawCloud = (ctx, cloud) => {
  // 暗色模式下减少云层可见度
  let opacity = cloud.opacity;
  if (currentTheme.value) {
    opacity = cloud.opacity * 0.25;
  }
  ctx.save();
  ctx.filter = `blur(${cloud.blur}px)`;
  const gradient = ctx.createRadialGradient(
    cloud.x + cloud.width * 0.5,
    cloud.y + cloud.height * 0.5,
    0,
    cloud.x + cloud.width * 0.5,
    cloud.y + cloud.height * 0.5,
    cloud.width * 0.5
  );
  if (currentTheme.value) {
    gradient.addColorStop(0, `rgba(70, 70, 90, ${opacity})`);
    gradient.addColorStop(0.7, `rgba(50, 50, 70, ${opacity * 0.6})`);
    gradient.addColorStop(1, 'rgba(70, 70, 90, 0)');
  } else {
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    gradient.addColorStop(0.7, `rgba(255, 255, 254, ${opacity * 0.6})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(
    cloud.x + cloud.width * 0.5,
    cloud.y + cloud.height * 0.5,
    cloud.width * 0.5,
    cloud.height * 0.55,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.restore();
};
const drawGrass = (ctx, canvas) => {
  const grassStartY = canvas.height * 0.38;
  const grassHeight = canvas.height * 0.62;
  // 主草地渐变
  const grassGradient = ctx.createLinearGradient(
    0,
    grassStartY,
    0,
    canvas.height
  );
  if (currentTheme.value) {
    // 暗色模式 - 暗夜草地
    grassGradient.addColorStop(0, '#1a3a2a');
    grassGradient.addColorStop(0.4, '#153025');
    grassGradient.addColorStop(0.7, '#102520');
    grassGradient.addColorStop(1, '#0a1a15');
  } else {
    grassGradient.addColorStop(0, '#B8D8A8');
    grassGradient.addColorStop(0.4, '#98C888');
    grassGradient.addColorStop(0.7, '#78A868');
    grassGradient.addColorStop(1, '#588850');
  }
  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, grassStartY, canvas.width, grassHeight);
  // 动态草浪层
  grassLayers.value.forEach((layer, index) => {
    layer.update(time);
    const layerGradient = ctx.createLinearGradient(
      0,
      grassStartY,
      0,
      canvas.height
    );
    const opacity = 0.06 + index * 0.03;
    if (currentTheme.value) {
      if (index === 0) {
        layerGradient.addColorStop(0, `rgba(50, 80, 60, ${opacity})`);
        layerGradient.addColorStop(1, `rgba(30, 50, 40, ${opacity})`);
      } else {
        layerGradient.addColorStop(0, `rgba(40, 60, 50, ${opacity})`);
        layerGradient.addColorStop(1, `rgba(25, 40, 35, ${opacity})`);
      }
    } else {
      if (index === 0) {
        layerGradient.addColorStop(0, `rgba(190, 230, 170, ${opacity})`);
        layerGradient.addColorStop(1, `rgba(150, 200, 140, ${opacity})`);
      } else {
        layerGradient.addColorStop(0, `rgba(160, 210, 150, ${opacity})`);
        layerGradient.addColorStop(1, `rgba(120, 180, 120, ${opacity})`);
      }
    }
    ctx.fillStyle = layerGradient;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let x = 0; x <= canvas.width; x += 15) {
      const wave =
        Math.sin(x * 0.0015 + layer.offset) * 6 +
        Math.sin(x * 0.0025 + layer.offset * 0.8) * 3;
      ctx.lineTo(x, grassStartY + wave);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.fill();
  });
};
const drawFlower = (ctx, flower) => {
  let color;
  if (currentTheme.value) {
    color =
      flower.colorType === 'yellow'
        ? `rgba(150, 130, 60, ${flower.brightness * 0.6})`
        : `rgba(120, 120, 120, ${flower.brightness * 0.5})`;
  } else {
    color =
      flower.colorType === 'yellow'
        ? `rgba(255, 235, 140, ${flower.brightness})`
        : `rgba(255, 255, 255, ${flower.brightness})`;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(flower.x, flower.y, flower.size, 0, Math.PI * 2);
  ctx.fill();
};
const drawParticle = (ctx, particle) => {
  const alpha = particle.currentBrightness;
  const color =
    particle.colorType === 'warm'
      ? { r: 255, g: 230, b: 120 }
      : { r: 180, g: 255, b: 200 };
  ctx.save();

  // 多层渐变，让发光更自然柔和
  const glowSize = particle.glowSize * 1.5; // 扩大发光范围
  const gradient = ctx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    glowSize
  );
  // 更平滑的渐变过渡
  gradient.addColorStop(
    0,
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.8})`
  );
  gradient.addColorStop(
    0.15,
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`
  );
  gradient.addColorStop(
    0.35,
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.25})`
  );
  gradient.addColorStop(
    0.6,
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.1})`
  );
  gradient.addColorStop(
    0.85,
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.03})`
  );
  gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
  ctx.fill();

  // 核心亮点
  ctx.fillStyle = `rgba(255, 255, 240, ${alpha * 0.85})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
const drawWarmOverlay = (ctx, canvas) => {
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.7,
    canvas.height * 0.55,
    0,
    canvas.width * 0.7,
    canvas.height * 0.55,
    canvas.width * 0.7
  );
  if (currentTheme.value) {
    gradient.addColorStop(0, 'rgba(80, 100, 120, 0.08)');
    gradient.addColorStop(0.6, 'rgba(60, 80, 100, 0.04)');
    gradient.addColorStop(1, 'rgba(80, 100, 120, 0)');
  } else {
    gradient.addColorStop(0, 'rgba(255, 248, 235, 0.12)');
    gradient.addColorStop(0.6, 'rgba(255, 245, 220, 0.06)');
    gradient.addColorStop(1, 'rgba(255, 248, 235, 0)');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// 绘制星星（暗色模式）
const drawStars = (ctx, time) => {
  if (!currentTheme.value) return;
  stars.value.forEach((star) => {
    const twinkle =
      Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.25 + 0.75;
    const alpha = star.brightness * twinkle;
    if (alpha < 0.1) return;
    const gradient = ctx.createRadialGradient(
      star.x,
      star.y,
      0,
      star.x,
      star.y,
      star.size * 3
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    gradient.addColorStop(0.4, `rgba(200, 220, 255, ${alpha * 0.5})`);
    gradient.addColorStop(1, 'rgba(180, 200, 240, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
    ctx.fill();
  });
};
const handleResize = () => {
  init();
};
onMounted(() => {
  init();
  animate();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <canvas ref="canvasRef" class="field-canvas" :class="{ visible: isVisible }"></canvas>
</template>

<style scoped>
.field-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  transform: translateZ(0);
}

.field-canvas.visible {
  opacity: 1;
}
</style>
