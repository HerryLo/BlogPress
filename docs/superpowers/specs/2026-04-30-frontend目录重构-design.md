# Frontend 目录重构设计

## 概述

对 `src/frontend/` 目录下文章按知识类型重新分类为：**核心原理、工程实践、专题扩展**。

## 目标结构

| 分类 | 内容 | 文章来源 |
|------|------|---------|
| **核心原理** | JavaScript核心概念、框架原理、设计模式 | 原JavaScript + 设计模式 |
| **工程实践** | GitHub Actions、Docker、部署、SQL查询 | 原Web开发部分 |
| **专题扩展** | GIS地图、可视化、问题排查 | 原GIS地图 + 可视化 + 直播流 |

## 新分类详情

### 核心原理（约11篇）

| 文章 | 原位置 |
|------|--------|
| JavaScript-图解的this指向 | JavaScript |
| JavaScript-图解原型链 | JavaScript |
| JavaScript-图解作用域 | JavaScript |
| JavaScript-图解Promise | JavaScript |
| JavaScript-Axios源码解析拦截器 | JavaScript |
| JavaScript-Promise原理解析 | JavaScript |
| JavaScript-ES6中的Iterator迭代器 | JavaScript |
| JavaScript-JS如何工作：垃圾回收 | JavaScript |
| JavaScript-闭包的错误使用 | JavaScript |
| JavaScript-async/await应用和原理 | JavaScript |
| 设计模式-项目中使用订阅发布 | Web开发 |

### 工程实践（约8篇）

| 文章 | 原位置 |
|------|--------|
| 如何使用Github Actions发布npm包 | 技术文章 |
| GitHub-GitHub Action一键部署 | 技术文章 |
| 知道前端工程部署有哪些方式嘛？ | 技术文章 |
| 知识扩展-Docker构建前端项目 | Web开发 |
| 知识扩展-Rancher前端服务发布 | Web开发 |
| 知识扩展-SQL查询基础 | Web开发 |
| 如何全方位提升博客站点 | Web开发 |
| 腾讯云对象存储COS搭建个人网站 | Web开发 |

### 专题扩展（约9篇）

| 文章 | 原位置 |
|------|--------|
| 关于Web GIS基础知识 | 技术文章/GIS地图 |
| OpenLayers之基础入门 | GIS |
| OpenLayers之地图控件 | GIS |
| OpenLayers之图层 | GIS |
| OpenLayers之点标记 | GIS |
| OpenLayers之信息窗体 | GIS |
| OpenLayers之矢量图形 | GIS |
| 知识扩展-AntV G2可视化 | Web开发 |
| 直播流IOS无法播放问题排查 | 技术文章 |

### 归档（不调整）

留在 `/archive/` 目录的小程序文章保持不变。

## 实施步骤

1. 更新 `src/.vuepress/sidebar/zh.ts` 中 `/frontend/` 的 sidebar 配置
2. 如有需要，创建子目录结构（如 `frontend/核心原理/`）
3. 检查并处理重复文章（Web GIS基础知识）
4. 验证所有文章链接正确

## 注意事项

- Web GIS基础知识 只保留一份，避免重复
- 2022非面试季前端知识整理总结 可考虑移入或保留在当前分类
- 所有文章文件本身不需要移动，只需调整 sidebar 导航配置
