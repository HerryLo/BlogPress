<template>
  <canvas ref="canvas" class="village-overlay"></canvas>
</template>

<script>
export default {
  name: "VillageOverlay",
  data() {
    return {
      ctx: null,
      animationId: null,
      isDestroyed: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas();
    });
  },
  beforeDestroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationId);
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      this.ctx = canvas.getContext("2d");
      this.resize();
      this.app = { t: 0 };
      this.createElements();
      this.animate();
      window.addEventListener("resize", this.resize);
    },
    resize() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.w = canvas.width;
      this.h = canvas.height;
    },
    createElements() {
      const w = this.w;
      const h = this.h;
      this.elements = [];

      // === FAR LEFT ===
      this.elements.push({
        type: "cypress",
        x: w * 0.02,
        y: h,
        baseX: w * 0.02,
        height: h * 0.32,
        width: 16,
        color: "#1a1a2e",
        phase: 0,
      });
      this.elements.push({
        type: "house",
        x: w * 0.08,
        y: h,
        baseX: w * 0.08,
        baseY: h,
        width: w * 0.028,
        height: h * 0.045,
        color: "#1a1a2e",
        phase: 1,
      });

      // === FAR RIGHT ===
      this.elements.push({
        type: "houses",
        x: w * 0.90,
        y: h,
        baseX: w * 0.90,
        baseY: h,
        color: "#1a1a2e",
        phase: 2,
      });
      this.elements.push({
        type: "cypress",
        x: w * 0.97,
        y: h,
        baseX: w * 0.97,
        height: h * 0.18,
        width: 11,
        color: "#1a1a2e",
        phase: 3,
      });
    },
    animate() {
      if (this.isDestroyed) return;
      const ctx = this.ctx;
      const canvas = this.$refs.canvas;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.app.t += 0.008;

      const t = this.app.t;

      this.elements.forEach((el) => {
        if (el.type === "cypress") {
          this.drawCypress(ctx, el, t);
        } else if (el.type === "houses") {
          this.drawHouses(ctx, el, t);
        } else if (el.type === "house") {
          this.drawHouse(ctx, el, t);
        }
      });

      this.animationId = requestAnimationFrame(() => this.animate());
    },
    drawCypress(ctx, el, t) {
      ctx.save();
      const sway = Math.sin(t * 0.4 + el.phase) * 2;
      ctx.translate(el.baseX + sway, el.y);
      ctx.fillStyle = el.color;
      // Trunk
      ctx.fillRect(-el.width / 2, 0, el.width, -el.height * 0.3);
      // Foliage body
      for (let i = 0; i < 14; i++) {
        const ly = -el.height * 0.25 - i * (el.height / 14) * 0.8;
        const lw = el.width * (1 - i * 0.05);
        const lh = el.height / 14 * 1.2;
        ctx.beginPath();
        ctx.ellipse(0, ly, lw, lh, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
    drawHouses(ctx, el, t) {
      ctx.save();
      const sway = Math.sin(t * 0.2 + el.phase) * 1.5;
      ctx.translate(el.baseX + sway, el.baseY);
      ctx.fillStyle = el.color;
      // House 1 (main)
      ctx.fillRect(-25, -60, 30, 60);
      // Roof
      ctx.beginPath();
      ctx.moveTo(-28, -60);
      ctx.lineTo(-12, -80);
      ctx.lineTo(8, -60);
      ctx.closePath();
      ctx.fill();
      // House 2 (tall)
      ctx.fillRect(8, -75, 22, 75);
      ctx.beginPath();
      ctx.moveTo(5, -75);
      ctx.lineTo(19, -95);
      ctx.lineTo(33, -75);
      ctx.closePath();
      ctx.fill();
      // House 3 (small)
      ctx.fillRect(33, -45, 18, 45);
      ctx.beginPath();
      ctx.moveTo(30, -45);
      ctx.lineTo(42, -60);
      ctx.lineTo(54, -45);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
    drawHouse(ctx, el, t) {
      ctx.save();
      const sway = Math.sin(t * 0.3 + el.phase) * 1;
      ctx.translate(el.baseX + sway, el.baseY);
      ctx.fillStyle = el.color;
      ctx.fillRect(-el.width / 2, -el.height, el.width, el.height);
      ctx.beginPath();
      ctx.moveTo(-el.width / 2 - 3, -el.height);
      ctx.lineTo(0, -el.height - el.height * 0.6);
      ctx.lineTo(el.width / 2 + 3, -el.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
  },
};
</script>

<style scoped>
.village-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}
</style>
