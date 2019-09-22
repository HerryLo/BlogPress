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
        {text: '#随笔', link: '/essay/' },
        {text: '#学习之路', link: '/breach/' },
        {text: '#GitHub', link: 'https://github.com/AttemptWeb/Record' },
        {
          text: 'Github项目',
          items: [
            { text: '资料', link: 'https://github.com/AttemptWeb/Record' },
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
            '',     /* /front/ */
            '2019-09-22',
            '2019-09-12',
            '2019-09-05',
            '2019-08-17',
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
        '/essay/': [
          '',     /* /front/ */
          '2019-09-20'
        ],
      }
    },
    plugins: [
      [
        '@vuepress/register-components',
        {
          componentsDir: './components'
        }
      ]
    ]
  };
  