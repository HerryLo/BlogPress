## BlogPress

![](https://img.shields.io/badge/-vuepress-brightgreen)
![](https://img.shields.io/badge/-vue%402.0-brightgreen)

> 博客由[vuepress cli](https://vuepress.vuejs.org/zh/guide/)构建完成

## 发布
```javscript
// 发布到个人GitHub域名下，如：https://herrylo.github.io
$ npm run deploy 

// 项目发布到个人服务器，通过Github Actions 打包发布
// 本地推送master分支即可
$ git push origin master
```
Github Actions 打包发布可以参考这边文章，[GitHub Action打包发布 一键部署](https://juejin.cn/post/6844904022239870984)

## 写法

在新建的md文件中头部设置如下内容
```javascript
---
title: '小程序开发指南之性能优化'
description: HerryLo, 微信公众号： Yopai
date: 2019-11-30
tags: 小程序，个人指南
---
<!-- 具体内容按照MarkDown格式编写 -->
# 小程序开发指南之性能优化
// ......具体内容
```
title: 文章标题；

description: 编译之后html文件描述；

date: 文章创建时间；

tags: 标签，用中文，分割。

### 链接

[个人博客地址](https://didiheng.com/)

[copy: 谷歌Web性能优化](https://developers.didiheng.com/)

### vx欢迎交流

<img width="300" height="300" center src="https://didiheng.com/image/IMG_0574.JPG" />
