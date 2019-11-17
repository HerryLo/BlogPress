module.exports = {
    title: '拾慧开发',
    description: '拾慧开发 不是技术的创造者，只是技术的搬运工',
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
          text: '扩展',
          items: [
            {text: '#随笔', link: '/essay/' },
            {text: '#学习之路', link: '/breach/' },
            {text: '#GitHub', link: 'https://github.com/HerryLo' }
          ]
        },
        {
          text: 'Github项目',
          items: [
            { text: 'Record', link: 'https://github.com/AttemptWeb/Record' },
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
            '../essay/2019-11-17',     /* /front/ */
            '2019-10-26',
            '../react/2019-10-06',
            '../essay/2019-09-25',
            '../essay/2019-09-20',
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
            '2019-04-01',  /* /front/closureErrorUser */
            '2018-12-27',
            
        ],
        '/react/': [
          '',     /* /front/ */
          '2019-10-06',
          '2019-08-10',
          '2019-05-13',
          '2019-05-12',
          '2019-04-25',
        ],
        '/essay/': [
          '2019-11-17',     /* /front/ */
          '2019-09-25',
          '2019-09-20',
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
  