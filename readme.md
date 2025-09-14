## BlogPress

![](https://img.shields.io/badge/-vuepress%401.0-brightgreen)
![](https://img.shields.io/badge/-vue%402.0-brightgreen)

> 博客由[vuepress cli](https://v1.vuepress.vuejs.org/zh/guide/getting-started.html)构建完成，vuepres@1.x构建，目前vuepress已经有@2.0版本。
>
> 博客地址：[https://herrylo.github.io](https://herrylo.github.io/front/)，欢迎各位star、fork!!

此博客通过Github Pages发布，如果你也希望创建自己的博客，但是没有服务器和域名，那么Github Pages发布个人博客一定非常适合你。

## 发布
```javscript
$ npm install vuepress@1.9.7

$ npm install

// 发布到 Github Pages，如：https://herrylo.github.io
$ npm run deploy 
```

## 配置

`deploy.sh` Github Pages 发布配置

`docs/.vuepress/config.js` 网站配置

`docs/.vuepress/components` 自定义组件

`docs/.vuepress/theme` 全局样式组件

`docs/.vuepress/public` 静态资源

`docs/README.md` 网站首页

评论插件使用：[Gitalk](https://github.com/gitalk/gitalk)

更多详细内容可以参考：[vuepress官网](https://v1.vuepress.vuejs.org/zh/guide/getting-started.html)

## 写法

在新建的md文件中头部设置如下内容，例如：
```javascript
---
title: '小程序开发指南之性能优化'
date: 2019-11-30
tags: 
    - 小程序
    - 个人指南
---
<!-- 具体内容按照MarkDown格式编写 -->
# 小程序开发指南之性能优化
// ......具体内容
```

## License

[MIT](https://github.com/HerryLo/BlogPress/blob/master/LICENSE)

