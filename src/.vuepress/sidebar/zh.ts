import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/frontend/": [
  {
    text: "核心原理",
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
      { text: "设计模式-项目中使用订阅发布", link: "2020-12-31" },
      { text: "2022非面试季前端知识整理总结", link: "2021-06-23" },
    ],
  },
  {
    text: "工程实践",
    icon: "laptop-code",
    collapsible: true,
    children: [
      { text: "如何使用Github Actions发布npm包", link: "2023-07-23" },
      { text: "GitHub-GitHub Action一键部署", link: "2019-12-11" },
      { text: "知道前端工程部署有哪些方式嘛？", link: "2023-01-08" },
      { text: "知识扩展-Docker构建前端项目", link: "2021-10-30" },
      { text: "知识扩展-Rancher前端服务发布", link: "2022-04-27" },
      { text: "知识扩展-SQL查询基础", link: "2022-02-11" },
      { text: "如何全方位提升博客站点", link: "2023-07-05" },
      { text: "腾讯云对象存储COS搭建个人网站", link: "2023-03-03" },
    ],
  },
  {
    text: "专题扩展",
    icon: "map",
    collapsible: true,
    children: [
      { text: "关于Web GIS基础知识", link: "2023-08-23" },
      { text: "OpenLayers之基础入门", link: "gis/2023-12-25" },
      { text: "OpenLayers之地图控件", link: "gis/2023-12-26" },
      { text: "OpenLayers之图层", link: "gis/2023-12-27" },
      { text: "OpenLayers之点标记", link: "gis/2023-12-28" },
      { text: "OpenLayers之信息窗体", link: "gis/2023-12-29" },
      { text: "OpenLayers之矢量图形", link: "gis/2024-01-01" },
      { text: "知识扩展-AntV G2可视化", link: "2021-11-24" },
      { text: "直播流IOS无法播放问题排查", link: "2023-09-11" },
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
],
  "/react/": [
    {
      text: "Hooks",
      icon: "atom",
      collapsible: true,
      children: [
        { text: "React Hooks useRef 使用范围", link: "2022-04-22" },
        { text: "React-Hooks的功能组件", link: "2019-04-25" },
      ],
    },
    {
      text: "源码解析",
      icon: "book",
      collapsible: true,
      children: [
        { text: "React解析: React.createElement(一)", link: "2019-05-12" },
        { text: "React解析 React.Children(二)", link: "2019-05-13" },
        { text: "React解析 render的FiberRoot(三)", link: "2019-08-10" },
        { text: "React解析: render的中的update(四)", link: "2019-10-06" },
      ],
    },
    {
      text: "状态管理",
      icon: "book",
      collapsible: true,
      children: [
        { text: "JavaScript-redux原理解析", link: "2019-10-26" },
        { text: "JavaScript-react-redux原理解析", link: "2019-12-20" },
      ],
    },
    {
      text: "工程实践",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "React-正交React组件的好处", link: "2019-12-29" },
        { text: "React-开发中应该规避的问题", link: "2019-11-24" },
        { text: "React底层运行简记", link: "2022-10-27" },
      ],
    },
  ],
  "/java/": [
    {
      text: "Java基础",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java数据类型", link: "Java数据类型" },
        { text: "JavaString", link: "JavaString" },
        { text: "Java面向对象", link: "Java面向对象" },
        { text: "Java修饰符与代码块", link: "Java修饰符与代码块" },
        { text: "Java抽象类与接口与内部类", link: "Java抽象类与接口与内部类" },
        { text: "Java常用API", link: "Java常用API" },
        { text: "Java算法", link: "Java算法" },
      ]
    },
    {
      text: "Java集合",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java单列集合", link: "Java单列集合" },
        { text: "Java双列集合", link: "Java双列集合" },
        { text: "Java集合扩展", link: "Java集合扩展" },
      ]
    },
    {
      text: "Java新特性",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java Stream流", link: "Java Stream流" },
        { text: "Java函数式编程", link: "Java函数式编程" },
        { text: "Java日期时间", link: "Java日期时间" },
        { text: "Java正则", link: "Java正则" },
      ]
    },
    {
      text: "Java高级",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java泛型", link: "Java泛型" },
        { text: "Java异常", link: "Java异常" },
        { text: "Java注解", link: "Java注解" },
        { text: "Java反射", link: "Java反射" },
        { text: "Java-IO流", link: "Java-IO流" },
        { text: "Java多线程", link: "Java多线程" },
      ]
    },
    {
      text: "工程实践",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "Maven", link: "Maven" },
        { text: "MySQL", link: "MySQL" },
        { text: "JDBC", link: "JDBC" },
        { text: "Redis", link: "Redis" },
        { text: "Servlet", link: "Servlet" },
        { text: "Spring", link: "Spring" },
        { text: "SpringBoot", link: "SpringBoot" },
      ]
    },
    {
      text: "其他",
      icon: "file",
      collapsible: true,
      children: [
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
        "2025年积累等待",
        "2024年迟到的总结篇",
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
        "JavaProgrammingPrinciples",
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
  "/links/": [
    {
      text: "友链",
      icon: "link",
      collapsible: false,
      children: [""],
    },
  ],
  "/ai/": [
    {
      text: "大模型基础",
      icon: "book",
      collapsible: true,
      children: [
        { text: "大模型基础知识", link: "大模型基础知识" },
        { text: "大模型名词介绍", link: "大模型名词介绍" },
        { text: "生成式AI", link: "生成式AI" },
        { text: "为什么需要RAG", link: "为什么需要RAG" },
      ],
    },
    {
      text: "LangChainJS",
      icon: "link",
      collapsible: true,
      children: [
        { text: "LangChainJS之基础模型(一)", link: "LangChainJS之基础模型" },
        { text: "LangChainJS之Prompt提示词(二)", link: "LangChainJS之Prompt提示词" },
        { text: "LangChainJS之Runnable(三)", link: "LangChainJS之Runnable" },
        { text: "LangChainJS之Chain链(四)", link: "LangChainJS之Chain链" },
      ],
    },
    {
      text: "AI实践",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "如何使用AI搭建工作流", link: "如何使用AI搭建工作流" },
        { text: "白嫖党体验Claude Code", link: "白嫖党体验Claude Code" },
      ],
    },
  ],
  "/archive/": [
    {
      text: "微信小程序",
      icon: "circle-question",
      collapsible: true,
      children: [
        { text: "小程序-个人博客小程序构建", link: "2022-11-17" },
        { text: "小程序-个人开发指南", link: "2019-07-22" },
        { text: "小程序-小程序开发指南之性能优化", link: "2019-11-30" },
      ],
    },
  ],
});