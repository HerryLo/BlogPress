<template>
  <canvas ref="canvas" class="cursor-particle"></canvas>
</template>

<script>
export default {
  name: "CursorParticle",
  data() {
    return {
      ctx: null,
      particles: [],
      animationId: null,
      mouse: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.initCanvas();
    window.addEventListener("resize", this.resize);
    window.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("mousemove", this.onMouseMove);
    cancelAnimationFrame(this.animationId);
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      this.ctx = canvas.getContext("2d");
      this.resize();
      this.animate();
    },
    resize() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },
    onMouseMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      for (let i = 0; i < 3; i++) {
        this.particles.push(this.createParticle());
      }
    },
    createParticle() {
      return {
        x: this.mouse.x,
        y: this.mouse.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        decay: Math.random() * 0.015 + 0.005,
        size: Math.random() * 3 + 1,
      };
    },
    animate() {
      const ctx = this.ctx;
      const canvas = this.$refs.canvas;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.particles = this.particles.filter((p) => p.life > 0);

      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62, 175, 124, ${p.life * 0.8})`;
        ctx.fill();
      });

      this.animationId = requestAnimationFrame(() => this.animate());
    },
  },
};
</script>

<style scoped>
.cursor-particle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.85;
}
</style>
