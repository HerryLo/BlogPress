<template>
  <div class="iframe-box" :style="containerStyle">
    <iframe
      :src="src"
      :height="height"
      width="100%"
      frameborder="no"
      loading="lazy"
      :style="iframeStyle"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  height: {
    type: [Number, String],
    default: 600,
  },
  borderRadius: {
    type: [Number, String],
    default: 12,
  },
  borderWidth: {
    type: String,
    default: "2px",
  },
  borderColor: {
    type: String,
    default: "#e5e7eb",
  },
  shadow: {
    type: String,
    default: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  padding: {
    type: [Number, String],
    default: 0,
  },
});

const containerStyle = computed(() => ({
  border: `${props.borderWidth} solid ${props.borderColor}`,
  borderRadius: typeof props.borderRadius === "number" ? `${props.borderRadius}px` : props.borderRadius,
  boxShadow: props.shadow,
  padding: typeof props.padding === "number" ? `${props.padding}px` : props.padding,
  overflow: "hidden",
}));

const iframeStyle = computed(() => ({
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
  display: "block",
}));
</script>

<style scoped>
.iframe-box {
  margin: 1rem 0;
  background: var(--bg-color, #fff);
  transition: box-shadow 0.3s ease;
}

.iframe-box:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

iframe {
  border: none;
  background: var(--bg-color, #fff);
}
</style>
