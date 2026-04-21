import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

import path from "path";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Herrylo`s Blog",
      description: "这是我的个人博客网站，希望能分享有用的内容帮助到你",
    },
    "/en/": {
      lang: "en-US",
      title: "Herrylo`s Blog",
      description: "This is my personal blog site, I hope to share the content can help you",
    },
  },

  theme,

  head: [
    ["meta", { charset: "utf-8" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["link", { rel: "icon", href: "/image/logo.jpg" }],
    ["style", { id: "vp-blog-mask-animation" }, `
.vp-blog-mask {
  background-size: 200% 200%;
  animation: starryMove 20s ease-in-out infinite;
}
@keyframes starryMove {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 50%; }
}
    `],
  ],

  markdown: {},

  alias: {
    "@theme-hope/components/base/PageFooter": path.resolve(__dirname, "./components/PageFooter.vue"),
  },
});
