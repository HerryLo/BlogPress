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

      // === LEFT SIDE: Large Cypress + Person ===
      // Left cypress
      this.elements.push({
        type: "cypress",
        x: w * 0.04,
        y: h,
        baseX: w * 0.04,
        height: h * 0.55,
        width: 18,
        color: "#1a1a2e",
        phase: 0,
        driftX: 0,
      });
      // Left person (silhouette)
      this.elements.push({
        type: "person",
        x: w * 0.08,
        y: h * 0.82,
        baseX: w * 0.08,
        baseY: h * 0.82,
        color: "#1a1a2e",
        swayAmp: 3,
        swaySpeed: 0.8,
        phase: 0,
      });

      // === RIGHT SIDE: Houses + Small Cypress ===
      // Right small cypress
      this.elements.push({
        type: "cypress",
        x: w * 0.94,
        y: h,
        baseX: w * 0.94,
        height: h * 0.28,
        width: 12,
        color: "#1a1a2e",
        phase: 1,
        driftX: 0,
      });
      // Right houses cluster
      this.elements.push({
        type: "houses",
        x: w * 0.87,
        y: h,
        baseX: w * 0.87,
        baseY: h,
        color: "#1a1a2e",
        phase: 2,
      });

      // === SCATTERED VILLAGE elements ===
      // Small distant house left
      this.elements.push({
        type: "house",
        x: w * 0.18,
        y: h * 0.88,
        baseX: w * 0.18,
        baseY: h * 0.88,
        width: w * 0.04,
        height: h * 0.08,
        color: "#1a1a2e",
        phase: 3,
      });
      // Small distant house center-right
      this.elements.push({
        type: "house",
        x: w * 0.76,
        y: h * 0.90,
        baseX: w * 0.76,
        baseY: h * 0.90,
        width: w * 0.03,
        height: h * 0.06,
        color: "#1a1a2e",
        phase: 4,
      });
      // Distant person right
      this.elements.push({
        type: "person",
        x: w * 0.82,
        y: h * 0.85,
        baseX: w * 0.82,
        baseY: h * 0.85,
        color: "#1a1a2e",
        swayAmp: 2,
        swaySpeed: 0.6,
        phase: 1,
        scale: 0.7,
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
        } else if (el.type === "person") {
          this.drawPerson(ctx, el, t);
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
    drawPerson(ctx, el, t) {
      ctx.save();
      const sway = Math.sin(t * el.swaySpeed + el.phase) * el.swayAmp;
      const scale = el.scale || 1;
      ctx.translate(el.baseX + sway, el.baseY);
      ctx.scale(scale, scale);
      ctx.fillStyle = el.color;
      // Body
      ctx.beginPath();
      ctx.ellipse(0, -35, 7, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      // Head
      ctx.beginPath();
      ctx.arc(0, -60, 8, 0, Math.PI * 2);
      ctx.fill();
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
  z-index: 3;
  pointer-events: none;
}
</style>
