module.exports = {
  title: "Herrylo`s Blog",
  description:
    "This is my personal blog site, I hope to share the content can help you",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["meta", { charset: "utf-8" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Herrylo`s Blog" }],
    ["meta", { name: "application-name", content: "Herrylo`s Blog" }],
    ["meta", { name: "twitter:title", content: "Herrylo`s Blog" }],
    ["meta", { name: "og:site_name", content: "Herrylo`s Blog" }],
    ["meta", { name: "og:url", content: "https://herrylo.github.io/" }],
    [
      "meta",
      {
        name: "description",
        content:
          "This is my personal blog site, I hope to share the content can help you",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "前端,JavaScript,ReactJs,前端开发,Nodejs,Docker,Rancher,数据结构,小程序,技术交流,技术分享",
      },
    ],
    ["meta", { property: "og:title", content: "Herrylo`s Blog" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "This is my personal blog site, I hope to share the content can help you",
      },
    ],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "meta",
      { name: "msapplication-TileImage", content: "/image/logotouchicon.jpg" },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    ["link", { rel: "icon", href: "/image/logo.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "shortcut icon", href: "/image/logo.jpg" }], // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["link", { rel: "apple-touch-icon", href: "/image/logotouchicon.jpg" }],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?03fcbc1674d5d46ad9125d7e0dbb5d51";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    [
      "script",
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "hqtyf5pdw0");`,
    ],
  ],
  base: "/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    lastUpdated: "上次更新",
    sidebarDepth: 5,
    nav: [
      // 导航栏配置
      { text: "主页", link: "/" },
      { text: "vuepress-plugin-md-tags", link: "/vuepress-plugin/" },
      { text: "😎技术", link: "/front/" },
      { text: "🙈随笔", link: "/essay/" },
      { text: "👏推荐", link: "/recommend/" },
      { text: "GitHub", link: "https://github.com/HerryLo/BlogPress" },
    ],
    sidebar: {
      "/front/": [
        {
          title: "技术博文",
          collapsable: true,
          initialOpenGroupIndex: -1,
          path: "/front/",
          children: [
            { title: "🔥 2022非面试季前端知识整理总结", path: "2021-06-23" },
            {
              title: "🔥 知道前端工程部署有哪些方式嘛？",
              path: "2023-01-08",
            },
            { title: "🔥 GitHub-GitHub Action一键部署", path: "2019-12-11" },
            { title: "🔥 React底层运行简记", path: "2022-10-27" },
            { title: "🔥 JavaScript-图解的this指向", path: "2019-09-12" },
            { title: "🔥 JavaScript-图解原型链", path: "2019-09-05" },
            { title: "🔥 JavaScript-图解作用域", path: "2023-02-20" },
            { title: "🔥 JavaScript-图解Promise", path: "2021-02-05" },
            { title: "🔥 TCP-的三次握手和四次挥手", path: "2019-08-17" },
            { title: "🔥 TCP&UDP-传输层的TCP和UDP协议", path: "2019-08-02" },
            {
              title: "🔥 JavaScript-Axios源码解析拦截器",
              path: "2020-10-21",
            },
            { title: "🔥 JavaScript-react-redux原理解析", path: "2019-12-20" },
            { title: "🔥 JavaScript-redux原理解析", path: "2019-10-26" },
            { title: "🔥 JavaScript-Promise原理解析", path: "2019-09-22" },
            {
              title: "🔥 JavaScript-ES6中的Iterator迭代器",
              path: "2020-06-04",
            },
            {
              title: "🔥 JavaScript-JS如何工作：垃圾回收",
              path: "2019-04-01",
            },
            { title: "🔥 JavaScript-闭包的错误使用", path: "2018-12-27" },
          ],
        },
        {
          title: "Web开发",
          collapsable: true,
          initialOpenGroupIndex: -1,
          sidebarDepth: 3,
          path: "/front/",
          children: [
            { title: ". 如何全方位提升博客站点", path: "2023-07-05" },
            { title: "· 腾讯云对象存储 COS搭建个人网站", path: "2023-03-03" },
            { title: ". 小程序-个人博客小程序构建", path: "2022-11-17" },
            { title: ". 小程序-个人开发指南", path: "2019-07-22" },
            { title: ". 小程序-小程序开发指南之性能优化", path: "2019-11-30" },
            { title: ". 知识扩展-Rancher前端服务发布", path: "2022-04-27" },
            { title: ". 知识扩展-SQL查询基础", path: "2022-02-11" },
            {
              title: ". 知识扩展-AntV G2可视化引擎, 有用过嘛？",
              path: "2021-11-24",
            },
            { title: ". 知识扩展-Docker构建前端项目", path: "2021-10-30" },
            { title: ". JavaScript-async/await应用和原理", path: "2020-04-05" },
            { title: ". React Hooks useRef 使用范围", path: "2022-04-22" },
            { title: ". React-Hooks的功能组件", path: "2019-04-25" },
            { title: ". React-正交React组件的好处", path: "2019-12-29" },
            { title: ". React-开发中应该规避的问题", path: "2019-11-24" },
            {
              title: ". React解析: render的中的update(四)",
              path: "2019-10-06",
            },
            { title: ". React解析 render的FiberRoot(三)", path: "2019-08-10" },
            { title: ". React解析 React.Children(二)", path: "2019-05-13" },
            {
              title: ". React解析: React.createElement(一)",
              path: "2019-05-12",
            },
            { title: ". 设计模式-项目中使用订阅发布", path: "2020-12-31" },
            { title: ". 数据结构-项目中的使用队列", path: "2021-01-01" },
            { title: ". 数据结构-二叉树的实现和遍历", path: "2020-07-01" },
            { title: ". 数据结构-栈的应用和实现", path: "2020-03-14" },
            { title: ". 数据结构-循环队列的应用和实现", path: "2020-03-02" },
            { title: ". 数据结构-链表的应用和实现", path: "2020-02-14" },
          ],
        },
      ],
      "/essay/": ["", "2023-01-06", "2022-01-21", "2021-08-29"],
      "/recommend/": [
        "",
        "2023-04-01",
        "2023-03-31",
        "2022-11-27",
        "2021-05-26",
        "2021-04-17",
        "2019-12-09",
        "2019-11-17",
        "2019-09-20",
      ]
    },
    activeHeaderLinks: false,
    search: true,
    searchMaxSuggestions: 10,
    // sidebar: 'auto'
  },
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: "./components",
      },
    ],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "New content is available.",
          buttonText: "Refresh",
        },
      },
    ],
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功",
        },
      },
    ],
    [
      "copyright",
      {
        authorName: "Herrylo", // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
      },
    ],
    [require("./vuepress-plugin-md-tags"), {
      // type: 'rainbow',
      type: 'default'
      // color: '#fff',  // 标签字体颜色
      // borderColor: 'transparent', // 标签边框颜色
      // background: 'rgb(45, 183, 245)', // 标签背景颜色
    }],
    "@vuepress/back-to-top",
  ],
};
