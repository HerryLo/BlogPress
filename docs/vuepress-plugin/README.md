---
title: vuepress-plugin插件
description: vuepress@1.x文档tag插件 vuepress-plugin-md-tags
sidebar: auto
sidebarDepth: 3
tags: 
  - vuepress
  - plugin
---

# vuepress-plugin-md-tags


::: tip
> npm : https://www.npmjs.com/package/vuepress-plugin-md-tags
:::

## Intro

[npm vuepress@1.x文档tag插件](https://www.npmjs.com/package/vuepress-plugin-md-tags)

[文档tag插件示例](https://herrylo.github.io/vuepress-plugin/)

适用于 [vuepress@1.x](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html) 的插件，参考tag样式可以查看 [link here](https://herrylo.github.io/vuepress-plugin/)，配置代码参考[link here](https://github.com/HerryLo/BlogPress/blob/master/docs/.vuepress/config.js#L225)

当然这需要你的这个页面顶部有 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter), 本插件使用了官方预定义的 [内置搜索中的 `tags`](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%86%85%E7%BD%AE%E6%90%9C%E7%B4%A2)
来渲染。

Front Matter 对应如下

```
---
tags:
  - vuepress
  - plugin
---
```

## Install

```bash
npm install vuepress-plugin-md-tags
```

## Usage

```javascript
module.exports = {
  "plugins": [
    ["vuepress-plugin-md-tags"]
  ]
}
```

## 详细配置参数

```javascript
module.exports = {
  "plugins": [
    ["vuepress-plugin-tags", {
      type: 'default', // 标签预定义样式
      color: '#fff',  // 标签字体颜色
      borderColor: 'transparent', // 标签边框颜色
      background: 'rgb(45, 183, 245)', // 标签背景颜色
      selector: '.page .content__default h1'
    }]
  ]
}
```

上述配置中的 color、borderColor、background 只在 type=default 时生效。

type 有如下的选项：

- rainbow : 彩虹主题 目前不支持自定义
- default 默认主题，与 vuepress 官方默认主题颜色一致；
- primary : 语义主题
- success : 语义主题
- info : 语义主题
- warning : 语义主题
- danger : 语义主题