<template>
  <div class="blog-mask-animator"></div>
</template>

<script>
export default {
  name: "BlogMaskAnimator",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.animateMask();

    this.observer = new MutationObserver(() => {
      this.animateMask();
    });

    this.observer.observe(document.body, { childList: true, subtree: true });
  },
  beforeDestroy() {
    this.observer?.disconnect();
  },
  methods: {
    animateMask() {
      const mask = document.querySelector(".vp-blog-mask");
      if (mask && !mask.dataset.animated) {
        mask.style.backgroundSize = "200% 200%";
        mask.style.animation = "starryMove 20s ease-in-out infinite";
        mask.dataset.animated = "true";
      }
    },
  },
};
</script>

<style>
@keyframes starryMove {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 50%; }
}
</style>
