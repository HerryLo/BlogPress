import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://herrylo.github.io",

  author: {
    name: "Herrylo",
    url: "https://github.com/HerryLo",
  },

  logo: "/image/logo.jpg",

  repo: "HerryLo/BlogPress",

  docsDir: "src",

  blog: {
    medias: {
      GitHub: "https://github.com/HerryLo",
      zhihu: "https://www.zhihu.com/people/liu-heng-88-71",
      Yuque: {
        icon: "/image/yuque.svg",
        link: "https://www.yuque.com/yopai",
      },
      Juejin: {
        link: "https://juejin.cn/user/430664289365608",
        icon: "/image/juejin.svg"
      },
      Segmentfault: {
        link: "https://segmentfault.com/u/herrylo",
        icon: "/image/sf.svg"
      } 
    },
  },

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      footer: "MIT Licensed | Copyright © 2018-present Herrylo",
      displayFooter: true,
      blog: {
        description: "一个前端开发者",
        intro: "/zh/intro.html",
      },
    },
    "/en/": {
      navbar: enNavbar,
      sidebar: enSidebar,
      footer: "MIT Licensed | Copyright © 2018-present Herrylo",
      displayFooter: true,
      blog: {
        description: "A FrontEnd programmer",
        intro: "/en/intro.html",
      },
    },
  },

  encrypt: false,

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em") {
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
          }
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
  },

  plugins: {
    blog: true,

    comment: {
      provider: "Giscus",
      repo: "HerryLo/BlogPress",
      repoId: "MDEwOlJlcG9zaXRvcnkyMDIxNTAyNjQ=",
      category: "Announcements",
      categoryId: "DIC_kwDODAyReM4CWG33",
      mapping: "pathname",
      reactionsEnabled: true,
      emitMetadata: "0",
      inputPosition: "bottom",
    },

    icon: {
      prefix: "fa6-solid:",
    },

    copyCode: true,
    copyright: true,
  },
},
{ 
  custom: true 
});
