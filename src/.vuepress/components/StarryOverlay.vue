<template>
  <canvas ref="canvas" class="starry-overlay"></canvas>
</template>

<script>
export default {
  name: "StarryOverlay",
  data() {
    return {
      ctx: null,
      stars: [],
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
      this.createStars();
      this.animate();
      window.addEventListener("resize", this.resize);
    },
    resize() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (this.stars.length === 0) this.createStars();
    },
    createStars() {
      this.stars = [];
      for (let i = 0; i < 100; i++) {
        this.stars.push({
          x: Math.random() * this.$refs.canvas.width,
          y: Math.random() * this.$refs.canvas.height,
          size: Math.random() * 1.5 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
          brightness: Math.random() * 0.4 + 0.4,
        });
      }
    },
    animate() {
      if (this.isDestroyed) return;
      const ctx = this.ctx;
      const canvas = this.$refs.canvas;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.stars.forEach((star) => {
        star.phase += star.speed;
        const twinkle = Math.sin(star.phase) * 0.35 + 0.65;
        const alpha = star.brightness * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      this.animationId = requestAnimationFrame(() => this.animate());
    },
  },
};
</script>

<style scoped>
.starry-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
}
</style>
