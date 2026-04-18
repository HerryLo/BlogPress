# Claude Code 项目配置

## 项目概述

个人博客项目，使用 VuePress 2 + vuepress-theme-hope 构建。

## 技术背景

- VuePress 2.x + vuepress-theme-hope 2.0.0-rc.106
- @vuepress/plugin-blog 2.0.0-rc.106 存在 replaceAll bug，需要在 `node_modules/vuepress-theme-hope/node_modules/@vuepress/plugin-blog/dist/node/index.js` 中打补丁
- 插件降级到 rc.106 版本以避免兼容性问题
- Vue 3 Composition API

## 常见问题

### 1. @vuepress/plugin-blog 报错 `replaceAll is not a function`

**原因**：插件内部将非字符串值传给了 `replaceAll` 方法。

**解决方案**：打补丁
```bash
sed -i 's/k=e=>e\.replaceAll(/k=e=>String(e).replaceAll(/g' node_modules/vuepress-theme-hope/node_modules/@vuepress/plugin-blog/dist/node/index.js
```

### 2. 文章时间线为空

**原因**：blog 插件需要配置 `article` 选项指定文章目录，但配置会触发上面的 bug。

**解决方案**：暂不配置，使用默认文章识别。

### 3. CSS 样式

- 主题使用 SCSS，不需要也不建议引入 Tailwind CSS
- 组件使用 scoped CSS
- 深色模式通过 `prefers-color-scheme: dark` 媒体查询支持

## 文件约定

- `src/` 目录下为博客源码
- 文章使用 frontmatter 中的 `date` 字段，格式：`YYYY-MM-DDTHH:mm:ss+08:00`
- 组件放在 `src/.vuepress/components/` 目录
- 公共资源放在 `src/.vuepress/public/` 目录
