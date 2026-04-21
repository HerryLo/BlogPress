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
  ],

  markdown: {},

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/base/PageFooter": path.resolve(__dirname, "./components/PageFooter.vue"),
  },
});
