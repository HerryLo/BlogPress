module.exports = {
    title: '前端开发',
    description: '不断提供有趣的技术博文',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      sidebarDepth: 5,
      nav:[ // 导航栏配置
        {text: '博文', link: '/front/' },
        {
          text: 'GitHub',
          items: [
            { text: '博客', link: 'https://github.com/AttemptWeb/Record' },
            { text: '小程序', link: 'https://github.com/HerryLo/wxSapp' },
            { text: 'koa2', link: 'https://github.com/AttemptWeb/koa-mongoDB' }
          ]
        },
      ],
      sidebar: {
        '/front/': [
            '',     /* /front/ */
            'closureErrorUser',  /* /front/closureErrorUser */
            'gc',
            'reacthook'
        ],
      }
    }
  };
  