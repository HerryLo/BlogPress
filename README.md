# Herrylo's Blog

基于 VuePress 2 + vuepress-theme-hope 2.0 构建的个人博客。

## 技术栈

- VuePress 2.0.0-rc.28
- vuepress-theme-hope 2.0.0-rc.106
- @vuepress/plugin-blog 2.0.0-rc.106
- Vue 3.5
- dayjs

## 开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 开发预览
npm run docs:dev

# 构建静态文件
npm run docs:build

# 部署
bash deploy.sh
```

## 项目结构

```
src/
├── .vuepress/           # VuePress 配置
│   ├── components/      # 自定义组件
│   ├── config.ts        # 基础配置
│   ├── theme.ts         # 主题配置
│   └── client.ts        # 客户端配置
├── front/               # 前端技术文章
├── react/               # React 文章
├── essay/               # 随笔
├── recommend/           # 推荐
└── zh/                  # 中文首页
```

## 部署

博客通过 GitHub Actions 自动部署到 GitHub Pages。

访问: https://herrylo.github.io
