<template>
  <canvas ref="canvas" class="van-gogh-overlay"></canvas>
</template>

<script>
import * as PIXI from "pixi.js";

export default {
  name: "VanGoghOverlay",
  data() {
    return {
      app: null,
      isDestroyed: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPixi();
    });
  },
  beforeDestroy() {
    this.isDestroyed = true;
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true });
    }
  },
  methods: {
    async initPixi() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      this.app = new PIXI.Application();
      await this.app.init({
        canvas,
        width: w,
        height: h,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      this.drawStarryNight(w, h);
      this.app.ticker.add(this.animate);
    },
    drawStarryNight(w, h) {
      const app = this.app;
      const container = new PIXI.Container();
      app.stage.addChild(container);

      // --- Stars with glow ---
      const starPositions = [
        { x: w * 0.15, y: h * 0.12, r: 12, glow: 40 },
        { x: w * 0.35, y: h * 0.08, r: 9, glow: 30 },
        { x: w * 0.55, y: h * 0.18, r: 14, glow: 50 },
        { x: w * 0.75, y: h * 0.10, r: 10, glow: 35 },
        { x: w * 0.85, y: h * 0.25, r: 8, glow: 25 },
        { x: w * 0.25, y: h * 0.28, r: 7, glow: 20 },
        { x: w * 0.65, y: h * 0.30, r: 8, glow: 22 },
        { x: w * 0.45, y: h * 0.22, r: 6, glow: 18 },
        { x: w * 0.10, y: h * 0.35, r: 5, glow: 15 },
        { x: w * 0.90, y: h * 0.40, r: 5, glow: 15 },
      ];

      this.starSprites = starPositions.map((s) => {
        const star = new PIXI.Graphics();
        // Outer glow
        star.beginFill(0xffd54f, 0.15);
        star.drawCircle(0, 0, s.glow);
        star.endFill();
        star.beginFill(0xffd54f, 0.3);
        star.drawCircle(0, 0, s.glow * 0.6);
        star.endFill();
        star.beginFill(0xffe082, 0.6);
        star.drawCircle(0, 0, s.r);
        star.endFill();
        star.beginFill(0xffffff, 0.9);
        star.drawCircle(0, 0, s.r * 0.5);
        star.endFill();
        star.x = s.x;
        star.y = s.y;
        star.alpha = 0;
        container.addChild(star);
        return star;
      });

      // --- Moon ---
      const moon = new PIXI.Graphics();
      moon.beginFill(0xffe082, 0.9);
      moon.drawCircle(0, 0, 35);
      moon.endFill();
      moon.beginFill(0xfff9c4, 0.4);
      moon.drawCircle(0, 0, 50);
      moon.endFill();
      moon.x = w * 0.8;
      moon.y = h * 0.15;
      moon.alpha = 0;
      container.addChild(moon);
      this.moon = moon;

      // --- Swirling brushstrokes (Van Gogh style sky) ---
      this.swirls = [];
      const swirlData = [
        { cx: w * 0.2, cy: h * 0.4, r: 80, color: 0x1a237e, phase: 0 },
        { cx: w * 0.5, cy: h * 0.35, r: 120, color: 0x283593, phase: Math.PI * 0.5 },
        { cx: w * 0.8, cy: h * 0.45, r: 90, color: 0x1a237e, phase: Math.PI },
        { cx: w * 0.35, cy: h * 0.55, r: 100, color: 0x0d47a1, phase: Math.PI * 1.5 },
        { cx: w * 0.65, cy: h * 0.50, r: 70, color: 0x1a237e, phase: Math.PI * 0.3 },
      ];

      swirlData.forEach((sd) => {
        const swirl = new PIXI.Graphics();
        swirl.cx = sd.cx;
        swirl.cy = sd.cy;
        swirl.r = sd.r;
        swirl.color = sd.color;
        swirl.phase = sd.phase;
        container.addChild(swirl);
        this.swirls.push(swirl);
      });

      // --- Distant small stars ---
      this.dots = [];
      for (let i = 0; i < 60; i++) {
        const dot = new PIXI.Graphics();
        const brightness = 0.3 + Math.random() * 0.5;
        dot.beginFill(0xfff9c4, brightness);
        dot.drawCircle(0, 0, 0.8 + Math.random() * 1.2);
        dot.endFill();
        dot.x = Math.random() * w;
        dot.y = Math.random() * h * 0.7;
        dot.alpha = 0;
        dot.baseAlpha = brightness;
        dot.twinkleSpeed = 0.02 + Math.random() * 0.03;
        dot.twinklePhase = Math.random() * Math.PI * 2;
        container.addChild(dot);
        this.dots.push(dot);
      }

      this.t = 0;
    },
    animate() {
      if (this.isDestroyed) return;
      this.t += 0.008;

      // Fade in all elements
      this.starSprites.forEach((s, i) => {
        s.alpha = Math.min(1, s.alpha + 0.003);
        const scale = 1 + Math.sin(this.t * 2 + i) * 0.08;
        s.scale.set(scale, scale);
      });

      if (this.moon) {
        this.moon.alpha = Math.min(1, this.moon.alpha + 0.003);
      }

      // Draw swirling strokes
      this.swirls.forEach((sw) => {
        sw.clear();
        const { cx, cy, r, color } = sw;
        const arms = 10;
        for (let a = 0; a < arms; a++) {
          const angle = (a / arms) * Math.PI * 2 + this.t * 0.3 + sw.phase;
          const outerR = r * (0.8 + Math.sin(this.t + a) * 0.2);
          const ex = cx + Math.cos(angle) * outerR;
          const ey = cy + Math.sin(angle) * outerR;
          const cp1x = cx + Math.cos(angle + 0.4) * r * 0.5;
          const cp1y = cy + Math.sin(angle + 0.4) * r * 0.5;
          const cp2x = cx + Math.cos(angle - 0.2) * r * 0.7;
          const cp2y = cy + Math.sin(angle - 0.2) * r * 0.7;
          sw.lineStyle({ width: 2.5, color, alpha: 0.18 });
          sw.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
        }
        sw.alpha = Math.min(1, sw.alpha + 0.003);
      });

      // Twinkle distant dots
      this.dots.forEach((d) => {
        d.alpha = d.baseAlpha * (0.5 + Math.sin(this.t * d.twinkleSpeed * 60 + d.twinklePhase) * 0.5);
        d.alpha = Math.max(0.05, Math.min(1, d.alpha));
      });
    },
  },
};
</script>

<style scoped>
.van-gogh-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
}
</style>
