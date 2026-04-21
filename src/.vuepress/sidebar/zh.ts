import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/frontend/": [
    {
      text: "技术文章",
      icon: "book",
      collapsible: true,
      children: [
        { text: "直播流IOS无法播放问题排查", link: "2023-09-11" },
        { text: "关于Web GIS基础知识", link: "2023-08-23" },
        { text: "如何使用Github Actions发布npm包", link: "2023-07-23" },
        { text: "GitHub-GitHub Action一键部署", link: "2019-12-11" },
        { text: "知道前端工程部署有哪些方式嘛？", link: "2023-01-08" },
        { text: "2022非面试季前端知识整理总结", link: "2021-06-23" },
      ],
    },
    {
      text: "JavaScript",
      icon: "book",
      collapsible: true,
      children: [
        { text: "JavaScript-图解的this指向", link: "2019-09-12" },
        { text: "JavaScript-图解原型链", link: "2019-09-05" },
        { text: "JavaScript-图解作用域", link: "2023-02-20" },
        { text: "JavaScript-图解Promise", link: "2021-02-05" },
        { text: "JavaScript-Axios源码解析拦截器", link: "2020-10-21" },
        { text: "JavaScript-Promise原理解析", link: "2019-09-22" },
        { text: "JavaScript-ES6中的Iterator迭代器", link: "2020-06-04" },
        { text: "JavaScript-JS如何工作：垃圾回收", link: "2019-04-01" },
        { text: "JavaScript-闭包的错误使用", link: "2018-12-27" },
        { text: "JavaScript-async/await应用和原理", link: "2020-04-05" },
      ],
    },
    {
      text: "Web开发",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "TCP的三次握手和四次挥手", link: "2019-08-17" },
        { text: "TCP&UDP-传输层的TCP和UDP协议", link: "2019-08-02" },
        { text: "设计模式-项目中使用订阅发布", link: "2020-12-31" },
        { text: "知识扩展-Rancher前端服务发布", link: "2022-04-27" },
        { text: "知识扩展-SQL查询基础", link: "2022-02-11" },
        { text: "知识扩展-AntV G2可视化", link: "2021-11-24" },
        { text: "知识扩展-Docker构建前端项目", link: "2021-10-30" },
        { text: "如何全方位提升博客站点", link: "2023-07-05" },
        { text: "腾讯云对象存储COS搭建个人网站", link: "2023-03-03" },
      ],
    },
    {
      text: "GIS地图",
      icon: "map",
      collapsible: true,
      children: [
        { text: "OpenLayers之基础入门", link: "/frontend/gis/2023-12-25" },
        { text: "OpenLayers之地图控件", link: "/frontend/gis/2023-12-26" },
        { text: "OpenLayers之图层", link: "/frontend/gis/2023-12-27" },
        { text: "OpenLayers之点标记", link: "/frontend/gis/2023-12-28" },
        { text: "OpenLayers之信息窗体", link: "/frontend/gis/2023-12-29" },
        { text: "OpenLayers之矢量图形", link: "/frontend/gis/2024-01-01" },
      ],
    },
    {
      text: "数据结构",
      icon: "book",
      collapsible: true,
      children: [
        { text: "数据结构-链表的应用和实现", link: "2020-02-14" },
        { text: "数据结构-循环队列的应用和实现", link: "2020-03-02" },
        { text: "数据结构-栈的应用和实现", link: "2020-03-14" },
        { text: "数据结构-二叉树的实现和遍历", link: "2020-07-01" },
        { text: "数据结构-项目中的使用队列", link: "2021-01-01" },
      ],
    },
    {
      text: "归档",
      icon: "archive",
      collapsible: true,
      children: [
        { text: "小程序-个人博客小程序构建", link: "/archive/2022-11-17" },
        { text: "小程序-个人开发指南", link: "/archive/2019-07-22" },
        { text: "小程序-小程序开发指南之性能优化", link: "/archive/2019-11-30" },
      ],
    },
  ],
  "/react/": [
    {
      text: "React",
      icon: "fab fa-react",
      collapsible: true,
      children: [
        { text: "React Hooks useRef 使用范围", link: "2022-04-22" },
        { text: "React-Hooks的功能组件", link: "2019-04-25" },
        { text: "React-正交React组件的好处", link: "2019-12-29" },
        { text: "React-开发中应该规避的问题", link: "2019-11-24" },
        { text: "React解析: render的中的update(四)", link: "2019-10-06" },
        { text: "React解析 render的FiberRoot(三)", link: "2019-08-10" },
        { text: "React解析 React.Children(二)", link: "2019-05-13" },
        { text: "React解析: React.createElement(一)", link: "2019-05-12" },
        { text: "JavaScript-react-redux原理解析", link: "2019-12-20" },
        { text: "JavaScript-redux原理解析", link: "2019-10-26" },
        { text: "React底层运行简记", link: "2022-10-27" },
      ],
    },
  ],
  "/java/": [
    {
      text: "Java",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "Java基础上", link: "Java基础1" },
        { text: "Java基础下", link: "Java基础2" },
        { text: "JavaWeb开发", link: "JavaWeb开发" },
        { text: "Spring Boot项目打包部署", link: "2023-10-25" },
        { text: "Java语言编译运行", link: "2023-10-24" },
      ]
    }
  ],
  "/essay/": [
    {
      text: "随笔",
      icon: "pen-to-square",
      collapsible: false,
      children: [
        "",
        "2024-05-20",
        "2023-01-06",
        "2022-01-21",
        "2021-08-29",
      ],
    },
  ],
  "/recommend/": [
    {
      text: "推荐文章",
      icon: "thumbs-up",
      collapsible: false,
      children: [
        "",
        "2023-04-01",
        "2023-03-31",
        "2022-11-27",
        "2021-05-26",
        "2021-04-17",
        "2019-12-09",
        "2019-11-17",
        "2019-09-20",
      ],
    },
  ],
  "/archive/": [
    {
      text: "微信小程序",
      icon: "book",
      collapsible: true,
      children: [
        { text: "小程序-个人博客小程序构建", link: "2022-11-17" },
        { text: "小程序-个人开发指南", link: "2019-07-22" },
        { text: "小程序-小程序开发指南之性能优化", link: "2019-11-30" },
      ],
    },
  ],
});
