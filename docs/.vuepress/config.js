module.exports = {
    title: '拾慧开发',
    description: '不是技术的创造者，只是技术的搬运工',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
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
            '2019-08-10',
            '2019-08-02',
            '2019-07-22',
            '2019-05-13',
            '2019-05-12',
            '2019-04-25',
            '2019-04-01',  /* /front/closureErrorUser */
            '2018-12-27',
        ],
        '/react/': [
          '',     /* /front/ */
          '2019-08-10',
          '2019-05-13',
          '2019-05-12',
          '2019-04-25',
      ],
      }
    }
  };
  