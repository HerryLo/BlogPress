import Vue from "vue";
import tags from "./tags";

export default {
  created() {
    this.pluginConfig = {
      selector,
      type, // 标签预定义样式
      color, // 标签字体颜色
      borderColor, // 标签边框颜色
      background // 标签背景颜色
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.addTagToPage();
      }, 200);
    });
  },
  watch: {
    "$page.path"(val) {
      this.$nextTick(() => {
        this.addTagToPage();
      });
    }
  },
  updated() {},
  methods: {
    addTagToPage() {
      const h1s = document.querySelectorAll(this.pluginConfig.selector);
      if (h1s.length == 0 || !this.$frontmatter.tags) return;

      let pluginConfig = this.pluginConfig;
      let h1 = h1s[0];
      let Tags = Vue.extend(tags);
      let tags1 = new Tags({
        propsData: {
          tags: this.$frontmatter.tags,
          config: pluginConfig,
        },
      });
      tags1.$mount();

      insterAfter(tags1.$el, h1);
    },
  },
};

function insterAfter(newElement, targetElement) {
  let parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
