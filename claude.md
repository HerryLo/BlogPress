# Claude Code 项目配置

## 项目概述

个人博客项目，使用 VuePress 2 + vuepress-theme-hope 构建。

## 技术栈

- VuePress 2.0.0-rc.28
- vuepress-theme-hope 2.0.0-rc.106
- @vuepress/plugin-blog 2.0.0-rc.106
- Vue 3 Composition API
- dayjs

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

### 3. 构建时 ENOTEMPTY 警告

**原因**：临时目录 `.temp` 清理失败，通常是 dev 服务器未关闭导致文件被锁定。

**解决方案**：构建前确保没有 vuepress-vite 进程运行
```bash
pkill -f vuepress-vite
npm run docs:build
```

## 文件约定

- `src/` 目录下为博客源码
- 文章使用 frontmatter 中的 `date` 字段，格式：`YYYY-MM-DDTHH:mm:ss+08:00`
- 组件放在 `src/.vuepress/components/` 目录
- 公共资源放在 `src/.vuepress/public/` 目录
- 侧边栏配置在 `src/.vuepress/sidebar/` 目录

## 组件说明

- **CursorParticle**: 彩色鼠标拖尾粒子效果，带点击 +1 浮动文字
- **LinksComponent**: 友链组件
- **PageFooter**: 页面底部组件

## npm 脚本

```bash
npm run docs:dev      # 开发预览
npm run docs:build    # 构建静态文件
npm run docs:clean-dev # 清理缓存并重新开发
bash deploy.sh        # 构建并部署到 GitHub Pages
```