# vuepress-plugin-md-tags

适用于 [vuepress](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html) 插件的插件

当然这需要你的这个页面顶部有 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html#front-matter),

本插件使用了官方预定义的 [内置搜索中的 `tags`](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%86%85%E7%BD%AE%E6%90%9C%E7%B4%A2)
来渲染。

那么上图的 Front Matter 对应如下

```
---
tags:
  - 前端
  - javascript
---
```

## Install

```bash
yarn add vuepress-plugin-md-tags
# OR 
npm install vuepress-plugin-md-tags
```

> open npm : https://www.npmjs.com/package/vuepress-plugin-tags

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
      color: '#42b983',  // 标签字体颜色
      border: '1px solid #e2faef', // 标签边框颜色
      backgroundColor: '#f0faf5', // 标签背景颜色
      selector: '.page .content__default h1' // ^v1.0.1 你要将此标签渲染挂载到哪个元素后面？默认是第一个 H1 标签后面；可以提供 `document.querySelectorAll()` 支持的选择语法，将标签挂载该元素后面
    }]
  ]
}
```

上述配置中的 color、border、backgroundColor 只在 type=default 时生效。

type 有如下的选项：

- default 默认主题，与 vuepress 官方默认主题颜色一致；其他的 5 个则是不同的语义主题
- primary : 语义主题
- success : 语义主题
- info : 语义主题
- warning : 语义主题
- danger : 语义主题
- rainbow : 彩虹主题 目前不支持自定义