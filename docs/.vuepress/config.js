module.exports = {
    title: "Herrylo's Blog",
    description: '不是技术的创造者，只是技术的搬运工',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/image/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
      ['link', { rel: 'manifest', href: '/manifest.json' }],
      ['meta', { name: 'theme-color', content: '#3eaf7c' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
      ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
      ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
      ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      lastUpdated: '上次更新',
      sidebarDepth: 5,
      nav:[ // 导航栏配置
        {text: '#博文', link: '/front/' },
        {text: '#react', link: '/react/' },
        {text: '#随笔', link: '/essay/' },
        {text: 'GitHub', link: 'https://github.com/HerryLo' },
        {
          text: '扩展',
          items: [
            {text: '#成长线', link: '/breach/' },
          ]
        },
        {
          text: 'Github项目',
          items: [
            { text: '小程序项目', link: 'https://github.com/HerryLo/wxSapp' },
            { text: 'react项目', link: 'https://github.com/HerryLo/react-app-16' },
            { text: 'vue多页面模版', link: 'https://github.com/AttemptWeb/vue-multipage' },
            { text: 'koa项目', link: 'https://github.com/AttemptWeb/koa-mongoDB' },
            { text: 'express项目', link: 'https://github.com/HerryLo/MongoDB_express' }
          ]
        },
      ],
      sidebar: {
        '/front/': [
            '',
            '2020-10-21',
            '2020-07-01',
            '2020-06-04',
            '2020-04-05',
            '2020-03-14',
            '2020-03-02',
            '2020-02-14',
            '2019-12-29',
            '2019-12-20',
            '2019-12-11',
            '2019-11-30',
            '../react/2019-11-24',
            '2019-10-26',
            '../react/2019-10-06',
            '2019-09-22',
            '2019-09-12',
            '2019-09-05',
            '2019-08-17',
            '../react/2019-08-10',
            '2019-08-02',
            '2019-07-22',
            '../react/2019-05-13',
            '../react/2019-05-12',
            '../react/2019-04-25',
            '2019-04-01', 
            '2018-12-27',
        ],
        '/front/': [
          {
            title: "博文",
            collapsable: false,
            path: "/front/",
            children: [
              { title: ". 图解Promise", path: "2021-02-05" },
              { title: ". 数据结构-项目中的使用队列", path: "2021-01-01" },
              { title: ". 设计模式-项目中使用订阅发布", path: "2020-12-31" },
              { title: ". JavaScript-ES6中的Iterator迭代器", path: "2020-06-04" },
              { title: ". 数据结构-二叉树的实现和遍历", path: "2020-07-01" },
              { title: ". 数据结构-栈的应用和实现", path: "2020-03-14" },
              { title: ". 数据结构-循环队列的应用和实现", path: "2020-03-02" },
              { title: ". 数据结构-链表的应用和实现", path: "2020-02-14" },
              { title: ". JavaScript-async/await应用和原理", path: "2020-04-05" },
              { title: "🔥 React-正交React组件的好处", path: "2019-12-29" },
              { title: "🔥 GitHub-GitHub Action一键部署", path: "2019-12-11" },
              { title: ". 小程序-小程序开发指南之性能优化", path: "2019-11-30" },
              { title: ". React-开发中应该规避的问题", path: "../react/2019-11-24" },
              { title: "🔥 JavaScript-图解的this指向", path: "2019-09-12" },
              { title: "🔥 JavaScript-图解原型链", path: "2019-09-05" },
              { title: "🔥 TCP-的三次握手和四次挥手", path: "2019-08-17" },
              { title: ". TCP&UDP-传输层的TCP和UDP协议", path: "2019-08-02" },
              { title: ". 小程序-个人开发指南", path: "2019-07-22" },
              { title: ". React-React Hooks的功能组件", path: "../react/2019-04-25" },
              { title: "🔥 JavaScript-JavaScript如何工作：垃圾回收", path: "2019-04-01" },
              { title: "🔥 JavaScript-闭包的错误使用", path: "2018-12-27" }
            ],
          },
          {
            title: "原理解析",
            collapsable: true,
            initialOpenGroupIndex: -1,
            sidebarDepth: 3,
            path: "/front/",
            children: [
              {title: 'Axios部分源码解析--拦截器', path: "2020-10-21" },
              {title: 'react-redux原理解析', path: "2019-12-20" },
              {title: 'redux解析', path: "2019-10-26" },
              {title: 'Promise原理解析', path: "2019-09-22" },
              {title: 'react解析: render的中的update(四)', path: "../react/2019-10-06" },
              {title: 'react解析 render的FiberRoot(三)', path: "../react/2019-08-10" },
              {title: 'react解析 React.Children(二)', path: "../react/2019-05-13" },
              {title: 'react解析: React.createElement(一)', path: "../react/2019-05-12" }
            ]
          }
        ],
        '/react/': [
          '', 
          '2019-11-24',
          '2019-10-06',
          '2019-08-10',
          '2019-05-13',
          '2019-05-12',
          '2019-04-25',
        ],
        '/essay/': [
          '',
          '2021-05-26',
          '2021-04-17',
          '2019-12-09',
          '2019-11-23',
          '2019-11-17',
          '2019-09-25',
          '2019-09-20',
        ],
      }
    },
    plugins: {
      '@vuepress/register-components': {
        componentsDir: './components'
      },
      '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
          message: "New content is available.",
          buttonText: "Refresh"
        }
      },
      // '@vuepress/last-updated': {
      //   transformer: (timestamp, lang) => {
      //     return new Date(timestamp).toLocaleString()
      //   }
      // }
    }
  }; 