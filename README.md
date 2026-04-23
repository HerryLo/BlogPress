# Herrylo's Blog

基于 VuePress 2 + vuepress-theme-hope 构建的个人博客。

## 技术栈

- VuePress 2.0.0-rc.28
- vuepress-theme-hope 2.0.0-rc.106
- @vuepress/plugin-blog 2.0.0-rc.106
- Vue 3 Composition API
- dayjs

## 开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 开发预览
npm run docs:dev

# 构建静态文件
npm run docs:build

# 清理缓存重新开发
npm run docs:clean-dev

# 部署到 GitHub Pages
bash deploy.sh
```

## 项目结构

```
src/
├── .vuepress/
│   ├── components/      # 自定义组件
│   │   ├── CursorParticle.vue   # 彩色鼠标拖尾粒子
│   │   ├── LinksComponent.vue   # 友链组件
│   │   ├── PageFooter.vue       # 页面底部
│   │   └── IframeBox.vue        # iframe 封装组件
│   ├── config.ts         # 基础配置
│   ├── theme.ts          # 主题配置
│   ├── client.ts         # 客户端配置（组件注册）
│   ├── navbar/           # 导航栏配置
│   │   ├── en.ts         # 英文导航栏
│   │   └── zh.ts         # 中文导航栏
│   └── sidebar/          # 侧边栏配置
│       ├── en.ts         # 英文侧边栏
│       └── zh.ts         # 中文侧边栏
├── ai/                   # AI 文章
├── archive/              # 归档
├── essay/                # 随笔文章
├── frontend/             # 前端技术文章
├── java/                 # Java 文章
├── react/                # React 文章
├── recommend/            # 推荐文章
└── links/                # 友链页面
```

## 目录说明

| 目录 | 说明 |
|------|------|
| `/ai/` | AI 人工智能学习与实践 |
| `/frontend/` | 前端技术文章 |
| `/react/` | React 技术文章 |
| `/java/` | Java 技术文章 |
| `/essay/` | 随笔感想 |
| `/recommend/` | 推荐文章 |
| `/archive/` | 微信小程序归档 |
| `/links/` | 友链页面 |

## 侧边栏说明

侧边栏文件约定：
- `children` 数组中，空字符串 `""` 表示该位置为页面标题而非链接
- 文件名（不带 `.md` 扩展名）直接作为链接路径
- 日期格式文件名（如 `2023-04-01`）对应同名 md 文件

## 部署

博客通过 `deploy.sh` 脚本部署到 GitHub Pages：https://herrylo.github.io

## 访问

- 中文博客: https://herrylo.github.io
- GitHub 仓库: https://github.com/HerryLo/BlogPress