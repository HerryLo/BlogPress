# 各目录 README.md 准确性修正设计

## 背景

由于近期文档调整（AI 侧边栏重组为三分组、新增 4 篇 LangChainJS 文章、frontend/essay 飞书迁移等），各目录的 README.md 描述与实际内容存在偏差。同时 ai/java/react 三个 README 底部仍是语雀链接，与已迁移到飞书的 frontend/essay 不一致。

## 目标

- 修正 ai/java/frontend/react 四个 README 的"主要内容"描述，使其与实际文章目录一致
- 统一将 ai/java/react/essay 四个 README 底部知识库链接迁移到飞书
- frontend README 底部飞书链接更新为带 query params 的完整 URL

## 范围

### 修改文件

1. `src/ai/README.md` — 重写"主要内容"为三组结构、补充 description、迁移飞书链接
2. `src/java/README.md` — 补充 MySQL 与"其他"分组、迁移飞书链接
3. `src/frontend/README.md` — 修复"DOMock"拼写与"前端架构"模糊描述、更新飞书 URL
4. `src/react/README.md` — 修正 Hooks 描述、迁移飞书链接
5. `src/essay/README.md` — 仅更新飞书 URL（带 query params）

### 不修改文件

- `src/recommend/README.md` — 内容准确
- `src/README.md`、`src/zh/README.md`、`src/en/README.md` — 首页 project 链接属于另一范畴，本次不动
- 任何文章 `.md` 文件 — 仅改 README

## 设计

### 飞书 URL 清单

| 目录 | URL |
|------|-----|
| ai | `https://my.feishu.cn/wiki/space/7621473012973521888` |
| java | `https://my.feishu.cn/wiki/space/7621473012973521888` |
| react | `https://my.feishu.cn/wiki/space/7621473012973521888` |
| frontend | `https://my.feishu.cn/wiki/space/7621473012973521888?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home` |
| essay | `https://my.feishu.cn/wiki/space/7657078372899507173?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home` |

底部链接文案统一为："整理好的目录文章，可以移步 [我的飞书知识库](URL) 查看。"（essay 沿用其原文案"部分内容会同步更新到 [我的随笔知识库](URL)，同步会有延时。"）

### 各 README 具体改动

#### `src/ai/README.md`

**frontmatter description** 改为：
```
AI 人工智能学习与实践，涵盖大模型概念、LangChainJS 框架、AI 编码工作流、Claude Code 使用体验
```

**"主要内容"** 改为：
```
- **大模型基础** — 大模型基础知识、名词介绍、生成式AI、RAG 原理
- **LangChainJS** — 基础模型、Prompt 提示词、Runnable、Chain 链
- **AI 实践** — AI 工作流搭建、Claude Code 使用体验
```

**底部链接**：语雀 → `https://my.feishu.cn/wiki/space/7621473012973521888`

#### `src/java/README.md`

**"主要内容"** 改为：
```
- **Java 基础** — 数据类型、String、面向对象、修饰符、抽象类、常用API、算法
- **Java 集合** — 单列集合、双列集合、集合扩展
- **Java 新特性** — Stream流、函数式编程、日期时间、正则
- **Java 高级** — 泛型、异常、注解、反射、IO流、多线程
- **工程实践** — Maven、MySQL、JDBC、Redis、Servlet、Spring、SpringBoot
- **其他** — Spring Boot 打包部署、Java 编译运行
```

**底部链接**：语雀 → `https://my.feishu.cn/wiki/space/7621473012973521888`

#### `src/frontend/README.md`

**"主要内容"** 中的"工程实践"项改为：
```
- **工程实践** — GitHub Actions、Docker 部署、Rancher 发布、SQL 查询、博客站点搭建
```

（原"DOMock部署"是"Docker"拼写错误；"前端架构"无对应文章，替换为实际存在的主题）

**底部链接**：现有飞书 URL → `https://my.feishu.cn/wiki/space/7621473012973521888?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home`

#### `src/react/README.md`

**"主要内容"** 中的 Hooks 项改为：
```
- **Hooks** — useRef 使用范围、Hooks 功能组件
```

（原描述"useState、useEffect、useRef 等常用 Hook"夸大，实际仅 useRef 与 Hooks 功能组件两篇）

**底部链接**：语雀 → `https://my.feishu.cn/wiki/space/7621473012973521888`

#### `src/essay/README.md`

**底部链接**：现有飞书 URL → `https://my.feishu.cn/wiki/space/7657078372899507173?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home`

文案保持："部分内容会同步更新到 [我的随笔知识库](URL)，同步会有延时。"

## 验证

- `npm run docs:dev` 启动后访问各目录首页，确认：
  - ai 页"主要内容"显示三组（含 LangChainJS）
  - java 页"工程实践"包含 MySQL，并有"其他"分组
  - frontend 页"工程实践"无"DOMock"字样
  - react 页 Hooks 描述与实际文章匹配
  - 各页底部链接均指向飞书，点击可跳转
- `grep -r "yuque" src/` 确认 ai/java/react/essay/front/java 目录的 README 中无残留语雀链接（首页 project 链接除外）
