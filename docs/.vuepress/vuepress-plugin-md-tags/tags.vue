<template>
  <div>
    <span
      v-for="(item, index) in tags"
      class="tag"
      :class="classObject(index)"
      :style="styleObject"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
/**
 * 使用预定于的变量，构建当前文章的标签列表
 * https://vuepress.vuejs.org/zh/guide/frontmatter.html#%E5%85%B6%E4%BB%96%E6%A0%BC%E5%BC%8F%E7%9A%84-front-matter
 */
export default {
  props: {
    tags: {
      type: Array,
      default: [],
    },
    config: {
      type: Object,
      default: {
        type: "rainbow", // 标签预定义颜色
        color: "#42b983", // 标签字体颜色
        borderColor: "#e2faef", // 标签边框颜色
      },
    },
  },
  created() {
    this.tag.color = this.config.color;
    this.tag.borderColor = this.config.borderColor;
    this.tag.background = this.config.background;
    this.rainbowInit();
  },
  data() {
    return {
      tag: {
        color: null,
        borderColor: null,
        background: null,
      },
      rainbows: [
        {
          color: "#1677ff",
          background: "#e6f4ff",
          borderColor: "#91caff",
        },
        {
          color: "#52c41a",
          background: "#f6ffed",
          borderColor: "#b7eb8f",
        },
        {
          color: "#faad14",
          background: "#fffbe6",
          borderColor: "#ffe58f",
        },
        {
          color: "#ff4d4f",
          background: "#fff2f0",
          borderColor: "#ffccc7",
        },
      ],
    };
  },
  methods: {
    classObject(index) {
      const type = this.tag.type;
      return {
        "not-first": index === 0,
        "tag--primary": "primary" === type,
        "tag--success": "success" === type,
        "tag--info": "info" === type,
        "tag--warning": "warning" === type,
        "tag--danger": "danger" === type,
      };
    },
    /**
     * 彩虹类型初始化
     */
    rainbowInit() {
      // 如果是彩虹类型，则随机
      if (this.config.type === "rainbow") {
        this.rainbowsRandom();
      }
    },
    /**
     * 彩虹类型随机选择
     */
    rainbowsRandom() {
      const rainbows = this.rainbows;
      let index = Math.floor(Math.random() * rainbows.length);
      let rainbow = rainbows[index];
      this.tag.color = rainbow.color;
      this.tag.borderColor = rainbow.borderColor;
      this.tag.background = rainbow.background;
    },
  },
  mounted() {},
  computed: {
    styleObject() {
      if (this.config.type === "default" || this.config.type === "rainbow") {
        return {
          color: this.tag.color,
          "border-color": this.tag.borderColor,
          "background": this.tag.background,
        };
      }
      return {};
    },
  },
  watch: {
    config(newVal) {
      this.tag.color = newVal.color;
      this.tag.borderColor = newVal.borderColor;
      this.tag.background = newVal.background;
    },
  },
};
</script>

<style scoped lang="stylus">
.tag {
  display: inline-block;
  line-height: 22px;
  font-size: 12px;
  border: 1px solid #91caff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  margin-inline-end: 8px;
  padding-inline: 7px;
  white-space: nowrap;
  border-radius: 4px;
  transition: all 0.2s;
  text-align: start;
}

.not-first {
  margin-left: 0px;
}

.tag.tag--primary {
  color: #1677ff;
  background: #e6f4ff;
  border-color: #91caff;
}

.tag.tag--success {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
}

.tag.tag--info {
  background: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}

.tag.tag--warning {
  color: #faad14;
  background: #fffbe6;
  border-color: #ffe58f;
}

.tag.tag--danger {
  color: #ff4d4f;
  background: #fff2f0;
  border-color: #ffccc7;
}
</style>
