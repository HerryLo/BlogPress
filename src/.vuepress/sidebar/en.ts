import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/en/frontend/": [
    {
      text: "Articles",
      icon: "book",
      collapsible: true,
      children: [
        { text: "iOS Live Stream Playback Issue", link: "2023-09-11" },
        { text: "Web GIS Basics", link: "2023-08-23" },
        { text: "Publish npm Package with GitHub Actions", link: "2023-07-23" },
        { text: "GitHub Actions One-Click Deploy", link: "2019-12-11" },
        { text: "Frontend Deployment Methods", link: "2023-01-08" },
        { text: "Frontend Knowledge Summary 2022", link: "2021-06-23" },
      ],
    },
    {
      text: "JavaScript",
      icon: "book",
      collapsible: true,
      children: [
        { text: "JavaScript - Understanding 'this'", link: "2019-09-12" },
        { text: "JavaScript - Prototype Chain", link: "2019-09-05" },
        { text: "JavaScript - Scope", link: "2023-02-20" },
        { text: "JavaScript - Promise", link: "2021-02-05" },
        { text: "JavaScript - Axios Interceptor", link: "2020-10-21" },
        { text: "JavaScript - Promise Principle", link: "2019-09-22" },
        { text: "JavaScript - ES6 Iterator", link: "2020-06-04" },
        { text: "JavaScript - Garbage Collection", link: "2019-04-01" },
        { text: "JavaScript - Closure Misuse", link: "2018-12-27" },
        { text: "JavaScript - async/await", link: "2020-04-05" },
      ],
    },
    {
      text: "Web Development",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "TCP Three-Way Handshake & Four-Way Wave", link: "2019-08-17" },
        { text: "TCP & UDP Protocol", link: "2019-08-02" },
        { text: "Observer Pattern in Projects", link: "2020-12-31" },
        { text: "Rancher Frontend Deployment", link: "2022-04-27" },
        { text: "SQL Basics", link: "2022-02-11" },
        { text: "AntV G2 Visualization", link: "2021-11-24" },
        { text: "Docker for Frontend Projects", link: "2021-10-30" },
        { text: "Improve Your Blog Site", link: "2023-07-05" },
        { text: "Tencent Cloud COS for Website", link: "2023-03-03" },
      ],
    },
    {
      text: "GIS Maps",
      icon: "map",
      collapsible: true,
      children: [
        { text: "Web GIS Basics", link: "/en/frontend/2023-08-23" },
        { text: "OpenLayers Getting Started", link: "/en/frontend/gis/2023-12-25" },
        { text: "OpenLayers Map Controls", link: "/en/frontend/gis/2023-12-26" },
        { text: "OpenLayers Layers", link: "/en/frontend/gis/2023-12-27" },
        { text: "OpenLayers Markers", link: "/en/frontend/gis/2023-12-28" },
        { text: "OpenLayers Info Windows", link: "/en/frontend/gis/2023-12-29" },
        { text: "OpenLayers Vector Graphics", link: "/en/frontend/gis/2024-01-01" },
      ],
    },
    {
      text: "Data Structures",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Linked List", link: "2020-02-14" },
        { text: "Circular Queue", link: "2020-03-02" },
        { text: "Stack", link: "2020-03-14" },
        { text: "Binary Tree", link: "2020-07-01" },
        { text: "Queue in Projects", link: "2021-01-01" },
      ],
    },
    {
      text: "Archive",
      icon: "archive",
      collapsible: true,
      children: [
        { text: "Blog Mini Program", link: "/en/archive/2022-11-17" },
        { text: "Mini Program Dev Guide", link: "/en/archive/2019-07-22" },
        { text: "Mini Program Performance", link: "/en/archive/2019-11-30" },
      ],
    },
  ],
  "/en/react/": [
    {
      text: "React",
      icon: "fab fa-react",
      collapsible: true,
      children: [
        { text: "React Hooks useRef", link: "2022-04-22" },
        { text: "React Hooks Function Components", link: "2019-04-25" },
        { text: "Benefits of Orthogonal React Components", link: "2019-12-29" },
        { text: "React Development Pitfalls", link: "2019-11-24" },
        { text: "React Analysis: render update (4)", link: "2019-10-06" },
        { text: "React Analysis: FiberRoot (3)", link: "2019-08-10" },
        { text: "React Analysis: React.Children (2)", link: "2019-05-13" },
        { text: "React Analysis: createElement (1)", link: "2019-05-12" },
        { text: "react-redux Principle", link: "2019-12-20" },
        { text: "redux Principle", link: "2019-10-26" },
        { text: "React Internal Execution", link: "2022-10-27" },
      ],
    },
  ],
  "/en/java/": [
    {
      text: "Java Basics",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java Data Types", link: "Java数据类型" },
        { text: "Java String", link: "JavaString" },
        { text: "Java ArrayList", link: "JavaArrayList" },
        { text: "Java OOP", link: "Java面向对象" },
        { text: "Java Modifiers & Blocks", link: "Java修饰符与代码块" },
        { text: "Java Abstract & Interface", link: "Java抽象类与接口" },
        { text: "Java Common APIs", link: "Java常用API" },
        { text: "Java Algorithms", link: "Java算法" },
      ]
    },
    {
      text: "Java Advanced",
      icon: "book",
      collapsible: true,
      children: [
        { text: "Java Generics", link: "Java泛型" },
        { text: "Java Single Col", link: "Java单列集合" },
        { text: "Java Double Col", link: "Java双列集合" },
        { text: "Java Col Extensions", link: "Java集合扩展" },
        { text: "Java Stream流", link: "Java Stream流" },
        { text: "Java函数式编程", link: "Java函数式编程" },
        { text: "Java Exception", link: "Java异常" },
        { text: "Java Annotation", link: "Java注解" },
        { text: "Java Reflection", link: "Java反射" },
        { text: "Java IO Stream", link: "Java-IO流" },
        { text: "Java Multithreading", link: "Java多线程" },
      ]
    },
    {
      text: "JavaWeb Development",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "JavaWeb & Servlet", link: "JavaWeb与Servlet" },
        { text: "Maven Build", link: "Maven项目构建" },
        { text: "Java Database & JDBC", link: "Java数据库与JDBC" },
        { text: "Redis Cache", link: "Redis缓存实战" },
        { text: "Spring Core Concepts", link: "Spring核心概念" },
        { text: "Spring Boot Architecture", link: "SpringBoot项目架构" },
      ]
    },
    {
      text: "Others",
      icon: "file",
      collapsible: true,
      children: [
        { text: "Spring Boot Deploy", link: "2023-10-25" },
        { text: "Java Compile & Run", link: "2023-10-24" },
      ]
    }
  ],
  "/en/essay/": [
    {
      text: "Essays",
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
  "/en/recommend/": [
    {
      text: "Recommendations",
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
  "/en/links/": [
    {
      text: "Links",
      icon: "link",
      collapsible: false,
      children: [""],
    },
  ],
  "/en/ai/": [
    {
      text: "AI",
      icon: "robot",
      collapsible: false,
      children: [
        "大模型",
        "白嫖党体验Claude Code",
        "如何使用AI搭建工作流",
        "生成式AI",
        "为什么需要RAG",
      ],
    },
  ],
  "/en/archive/": [
    {
      text: "Mini Programs",
      icon: "circle-question",
      collapsible: true,
      children: [
        { text: "Blog Mini Program", link: "2022-11-17" },
        { text: "Mini Program Dev Guide", link: "2019-07-22" },
        { text: "Mini Program Performance", link: "2019-11-30" },
      ],
    },
  ],
});
