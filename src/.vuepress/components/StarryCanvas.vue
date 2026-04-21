<template>
  <canvas ref="canvas" class="starry-canvas"></canvas>
</template>

<script>
export default {
  name: "StarryCanvas",
  data() {
    return {
      ctx: null,
      stars: [],
      shootingStars: [],
      animationId: null,
    };
  },
  mounted() {
    this.initCanvas();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
    cancelAnimationFrame(this.animationId);
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      this.ctx = canvas.getContext("2d");
      this.resize();
      this.createStars();
      this.animate();
    },
    resize() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (this.stars.length === 0) this.createStars();
    },
    createStars() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      this.stars = [];
      for (let i = 0; i < 180; i++) {
        this.stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    },
    animate() {
      const ctx = this.ctx;
      const canvas = this.$refs.canvas;
      if (!ctx || !canvas) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a1a");
      gradient.addColorStop(0.5, "#0d1025");
      gradient.addColorStop(1, "#1a1a3e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.stars.forEach((star) => {
        star.phase += star.speed;
        const twinkle = Math.sin(star.phase) * 0.4 + 0.6;
        const alpha = star.brightness * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const s = this.shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.008;

        if (s.life <= 0) {
          this.shootingStars.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.tailX, s.y + s.tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.life})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.tailX, s.y + s.tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      if (Math.random() < 0.008) {
        this.shootingStars.push({
          x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
          y: Math.random() * canvas.height * 0.3,
          vx: 4 + Math.random() * 3,
          vy: 2 + Math.random() * 2,
          tailX: 80 + Math.random() * 60,
          tailY: 40 + Math.random() * 30,
          width: 1 + Math.random(),
          life: 1,
        });
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    },
  },
};
</script>

<style scoped>
.starry-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
