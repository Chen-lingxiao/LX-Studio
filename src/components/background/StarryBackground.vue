<script setup>import { onMounted, onUnmounted, ref } from 'vue';
const canvasRef = ref(null);
const stars = ref([]);
const meteors = ref([]);
const animationId = ref(null);
const mouse = ref({ x: 0, y: 0 });
const targetMouse = ref({ x: 0, y: 0 });
const time = ref(0);
const frameCount = ref(0);
// 3D星星类 - 简化版本
class Star {
 constructor(canvas) {
 this.canvas = canvas;
 this.reset();
 }
 reset() {
 // 3D坐标 - 扩大分布范围覆盖整个画布
 const canvasWidth = this.canvas?.width || 1920;
 const canvasHeight = this.canvas?.height || 1080;
 // 根据画布大小调整分布范围，确保星星铺满整个画面
 this.x = (Math.random() - 0.5) * canvasWidth * 2.5;
 this.y = (Math.random() - 0.5) * canvasHeight * 2.5;
 this.z = Math.random() * 600 + 50;
 // 简化属性
 this.size = Math.random() * 2.1 + 0.5;
 this.brightness = Math.random() * 0.55 + 0.45;
 // 颜色索引，避免对象创建
 this.colorIndex = Math.random() < 0.7 ? 0 : (Math.random() < 0.85 ? 1 : 2);
 }
 project(offsetX, offsetY, canvasHalfW, canvasHalfH) {
 const scale = 300 / (this.z + 300);
 return {
 x: canvasHalfW + (this.x + offsetX) * scale,
 y: canvasHalfH + (this.y + offsetY) * scale,
 size: this.size * scale,
 alpha: this.brightness * scale
 };
 }
 update(offsetX, offsetY, t) {
 this.z -= 0.1;
 if (this.z < 10) {
 this.z = 650;
 this.x = (Math.random() - 0.5) * (this.canvas?.width || 1920) * 2.5;
 this.y = (Math.random() - 0.5) * (this.canvas?.height || 1080) * 2.5;
 }
 }
}
// 预定义颜色
const colors = [
 { r: 255, g: 255, b: 255 },
 { r: 200, g: 220, b: 255 },
 { r: 255, g: 250, b: 220 }
];

// 流星类 - 支持3D视差效果
class Meteor {
 constructor(canvas) {
 this.canvas = canvas;
 this.reset();
 }
 reset() {
 const canvasWidth = this.canvas?.width || 1920;
 const canvasHeight = this.canvas?.height || 1080;
 // 3D坐标 - 从左上角区域随机分布
 this.x = (Math.random() - 0.5) * canvasWidth * 2;
 this.y = (Math.random() - 0.5) * canvasHeight * 1.5;
 this.z = Math.random() * 400 + 100;
 // 统一向右下方向移动，角度约38-42度
 const angle = (Math.PI * 0.22) + (Math.random() * Math.PI * 0.02);
 const speed = 3 + Math.random() * 3;
 this.vx = Math.cos(angle) * speed;
 this.vy = Math.sin(angle) * speed;
 // 流星视觉长度（屏幕像素）- 加长尾巴
 this.length = 350 + Math.random() * 200;
 this.width = 1.5 + Math.random() * 1;
 // 透明度更明亮
 this.alpha = 0.42 + Math.random() * 0.35;
 this.age = 0;
 this.maxAge = 150 + Math.random() * 100;
 }
 update() {
 this.x += this.vx;
 this.y += this.vy;
 this.z -= 0.5; // 缓慢后退
 this.age++;
 if (this.age > this.maxAge || this.z < 10) {
 this.reset();
 }
 }
 project(offsetX, offsetY) {
 const scale = 300 / (this.z + 300);
 // 流星头部位置
 const headX = this.canvas.width / 2 + (this.x + offsetX) * scale;
 const headY = this.canvas.height / 2 + (this.y + offsetY) * scale;
 // 流星尾迹方向（沿移动方向的反方向）- 增加尾迹长度
 const tailOffsetX = -this.vx * this.length * 0.035;
 const tailOffsetY = -this.vy * this.length * 0.035;
 const tailX = headX + tailOffsetX * scale;
 const tailY = headY + tailOffsetY * scale;
 return {
 headX, headY,
 tailX, tailY,
 width: this.width * scale,
 alpha: this.alpha * Math.min(1, scale * 1.5)
 };
 }
 draw(ctx, offsetX = 0, offsetY = 0) {
 const proj = this.project(offsetX, offsetY);
 // 淡入淡出效果
 const progress = this.age / this.maxAge;
 const fadeAlpha = progress < 0.15 ? progress * 6.67 : (progress > 0.85 ? (1 - progress) * 6.67 : 1);
 const alpha = proj.alpha * fadeAlpha;
 // 创建渐变拖尾效果 - 增强尾部可见性
 const gradient = ctx.createLinearGradient(proj.tailX, proj.tailY, proj.headX, proj.headY);
 gradient.addColorStop(0, `rgba(100, 140, 200, ${alpha * 0.05})`);
 gradient.addColorStop(0.3, `rgba(140, 180, 230, ${alpha * 0.3})`);
 gradient.addColorStop(0.7, `rgba(200, 220, 255, ${alpha * 0.6})`);
 gradient.addColorStop(1, `rgba(240, 245, 255, ${alpha})`);
 ctx.strokeStyle = gradient;
 ctx.lineWidth = proj.width;
 ctx.lineCap = 'round';
 ctx.beginPath();
 ctx.moveTo(proj.tailX, proj.tailY);
 ctx.lineTo(proj.headX, proj.headY);
 ctx.stroke();
 // 流星头部柔和亮点
 ctx.fillStyle = `rgba(220, 230, 255, ${alpha * 0.8})`;
 ctx.beginPath();
 ctx.arc(proj.headX, proj.headY, proj.width * 0.5, 0, Math.PI * 2);
 ctx.fill();
 }
}
const init = () => {
 const canvas = canvasRef.value;
 if (!canvas)
 return;
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 // 初始化星星
 const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 4200), 240);
 stars.value = [];
 for (let i = 0; i < starCount; i++) {
 stars.value.push(new Star(canvas));
 }
 // 初始化流星（12颗）- 均匀分布避免聚集
 meteors.value = [];
 const meteorCount = 12;
 for (let i = 0; i < meteorCount; i++) {
   const meteor = new Meteor(canvas);
   // 将流星均匀分布到不同区域（网格分布）
   const gridCols = 4; // 4列
   const gridRows = 3; // 3行
   const col = i % gridCols;
   const row = Math.floor(i / gridCols);
   // 在对应网格区域内随机分布
   const cellWidth = canvas.width * 2 / gridCols;
   const cellHeight = canvas.height * 1.5 / gridRows;
   meteor.x = (col * cellWidth) + (Math.random() * cellWidth) - canvas.width;
   meteor.y = (row * cellHeight) + (Math.random() * cellHeight) - canvas.height * 0.75;
   meteor.z = 100 + Math.random() * 400;
   // 错开流星的出现时间
   meteor.age = Math.floor(Math.random() * meteor.maxAge);
   meteors.value.push(meteor);
 }
 mouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
 targetMouse.value = { x: canvas.width / 2, y: canvas.height / 2 };
};
const animate = () => {
 const canvas = canvasRef.value;
 const ctx = canvas?.getContext('2d');
 if (!canvas || !ctx)
 return;
 // 帧跳过 - 限制最大FPS为30，降低CPU/GPU负载
 frameCount.value++;
 if (frameCount.value % 2 !== 0) {
 animationId.value = requestAnimationFrame(animate);
 return;
 }
 // 简化鼠标平滑
 mouse.value.x += (targetMouse.value.x - mouse.value.x) * 0.08;
 mouse.value.y += (targetMouse.value.y - mouse.value.y) * 0.08;
 const offsetX = (mouse.value.x - canvas.width / 2) * 0.2;
 const offsetY = (mouse.value.y - canvas.height / 2) * 0.2;
 const canvasHalfW = canvas.width / 2;
 const canvasHalfH = canvas.height / 2;
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 time.value += 0.04;
 // 移除每帧排序，改为分层渲染
 // 按深度分组
 const nearStars = [];
 const farStars = [];
 for (const star of stars.value) {
 star.update(offsetX, offsetY, time.value);
 if (star.z < 200) {
 nearStars.push(star);
 }
 else {
 farStars.push(star);
 }
 }
 // 先画远处的，再画近处的
 drawStars(ctx, farStars, offsetX, offsetY, canvasHalfW, canvasHalfH);
 drawStars(ctx, nearStars, offsetX, offsetY, canvasHalfW, canvasHalfH);
 // 绘制流星（带3D视差效果）
 for (const meteor of meteors.value) {
 meteor.update();
 meteor.draw(ctx, offsetX, offsetY);
 }
 animationId.value = requestAnimationFrame(animate);
};
// 批量绘制星星
const drawStars = (ctx, starList, offsetX, offsetY, canvasHalfW, canvasHalfH) => {
 if (starList.length === 0)
 return;
 // 预先计算边界
 const boundLeft = -10;
 const boundRight = ctx.canvas.width + 10;
 const boundTop = -10;
 const boundBottom = ctx.canvas.height + 10;
 // 按深度排序，减少混合次数
 starList.sort((a, b) => a.z - b.z);
 for (const star of starList) {
 const proj = star.project(offsetX, offsetY, canvasHalfW, canvasHalfH);
 // 边界检查
 if (proj.x < boundLeft || proj.x > boundRight || proj.y < boundTop || proj.y > boundBottom) {
 continue;
 }
 const alpha = proj.alpha;
 if (alpha < 0.05)
 continue;
 const color = colors[star.colorIndex];
 ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
 ctx.beginPath();
 ctx.arc(proj.x, proj.y, proj.size, 0, Math.PI * 2);
 ctx.fill();
 }
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
  <canvas ref="canvasRef" class="dandelion-canvas"></canvas>
</template>

<style scoped>
.dandelion-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0f1628 100%);
  will-change: transform;
  transform: translateZ(0);
}
</style>