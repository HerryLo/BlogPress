# 各目录 README 准确性修正 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修正 ai/java/frontend/react/essay 五个 README 的描述准确性，并将 ai/java/react 底部语雀链接迁移到飞书，frontend/essay 飞书链接更新为带 query params 的完整 URL。

**Architecture:** 5 个独立的 markdown 文件编辑任务（每个 README 一任务）+ 最终构建验证与部署。每个任务自包含、可独立提交。

**Tech Stack:** VuePress 2 + vuepress-theme-hope，Markdown frontmatter，纯文本编辑。

---

## File Structure

5 个 README 文件，各自独立，无依赖关系：

- `src/ai/README.md` — 改 description + 主要内容（3 组）+ 底部链接
- `src/java/README.md` — 改主要内容的工程实践 + 新增其他分组 + 底部链接
- `src/frontend/README.md` — 改工程实践描述 + 底部链接 URL
- `src/react/README.md` — 改 Hooks 描述 + 底部链接
- `src/essay/README.md` — 仅改底部链接 URL

参考已准确的 `src/recommend/README.md` 与 `src/frontend/README.md` 的飞书链接写法。

---

### Task 1: 修正 src/ai/README.md

**Files:**
- Modify: `src/ai/README.md`

- [ ] **Step 1: 读取当前文件确认内容**

```bash
cat src/ai/README.md
```

确认当前 description 第 3 行、主要内容第 15-17 行、底部链接第 23 行的内容。

- [ ] **Step 2: 修改 frontmatter description**

用 Edit 工具，old_string：

```
description: AI 人工智能学习与实践，涵盖大模型概念、提示词工程、AI 编码工作流、Claude Code 使用体验
```

new_string：

```
description: AI 人工智能学习与实践，涵盖大模型概念、LangChainJS 框架、AI 编码工作流、Claude Code 使用体验
```

- [ ] **Step 3: 修改"主要内容"三组结构**

用 Edit 工具，old_string：

```
- **大模型基础** — 机器学习、神经网络、Transformer、注意力机制
- **AI 工具** — Claude Code、Cursor 等 AI 编码工具的使用体验
- **AI 工作流** — 如何利用 AI 提升开发效率，构建 AI 编码工作流
```

new_string：

```
- **大模型基础** — 大模型基础知识、名词介绍、生成式AI、RAG 原理
- **LangChainJS** — 基础模型、Prompt 提示词、Runnable、Chain 链
- **AI 实践** — AI 工作流搭建、Claude Code 使用体验
```

- [ ] **Step 4: 修改底部链接（语雀 → 飞书）**

用 Edit 工具，old_string：

```
> 整理好的目录文章，可以移步 [语雀知识库](https://www.yuque.com/yopai) 查看。
```

new_string：

```
> 整理好的目录文章，可以移步 [我的飞书知识库](https://my.feishu.cn/wiki/space/7621473012973521888) 查看。
```

- [ ] **Step 5: 验证修改**

```bash
cat src/ai/README.md
```

确认：
- description 包含 "LangChainJS 框架"
- 主要内容有 3 组：大模型基础、LangChainJS、AI 实践
- 底部链接为飞书 `https://my.feishu.cn/wiki/space/7621473012973521888`
- 文件中无 "语雀" 字样

```bash
grep -c "语雀" src/ai/README.md
```
Expected: `0`

- [ ] **Step 6: 提交**

```bash
git add src/ai/README.md
git commit -m "docs: 修正 AI README 主要内容为三组结构并迁移飞书链接"
```

---

### Task 2: 修正 src/java/README.md

**Files:**
- Modify: `src/java/README.md`

- [ ] **Step 1: 读取当前文件确认内容**

```bash
cat src/java/README.md
```

确认第 19 行工程实践列表、第 25 行底部链接。

- [ ] **Step 2: 修改"主要内容"——补充 MySQL 与新增"其他"分组**

用 Edit 工具，old_string：

```
- **工程实践** — Maven、JDBC、Redis、Servlet、Spring、SpringBoot
```

new_string：

```
- **工程实践** — Maven、MySQL、JDBC、Redis、Servlet、Spring、SpringBoot
- **其他** — Spring Boot 打包部署、Java 编译运行
```

注意：new_string 包含两行，第二行是新增的"其他"分组。

- [ ] **Step 3: 修改底部链接（语雀 → 飞书）**

用 Edit 工具，old_string：

```
> 整理好的目录文章，可以移步 [语雀知识库](https://www.yuque.com/yopai/pp6bv5) 查看。
```

new_string：

```
> 整理好的目录文章，可以移步 [我的飞书知识库](https://my.feishu.cn/wiki/space/7621473012973521888) 查看。
```

- [ ] **Step 4: 验证修改**

```bash
cat src/java/README.md
```

确认：
- 工程实践列表包含 MySQL
- 主要内容末尾有"其他"分组
- 底部链接为飞书

```bash
grep -c "语雀" src/java/README.md
```
Expected: `0`

- [ ] **Step 5: 提交**

```bash
git add src/java/README.md
git commit -m "docs: 修正 Java README 工程实践列表并迁移飞书链接"
```

---

### Task 3: 修正 src/frontend/README.md

**Files:**
- Modify: `src/frontend/README.md`

- [ ] **Step 1: 读取当前文件确认内容**

```bash
cat src/frontend/README.md
```

确认第 16 行工程实践描述、第 24 行底部链接。

- [ ] **Step 2: 修改"工程实践"描述**

用 Edit 工具，old_string：

```
- **工程实践** — GitHub Actions、DOMock部署、SQL查询、前端架构
```

new_string：

```
- **工程实践** — GitHub Actions、Docker 部署、Rancher 发布、SQL 查询、博客站点搭建
```

- [ ] **Step 3: 修改底部链接（更新为带 query params 的完整 URL）**

用 Edit 工具，old_string：

```
> 整理好的目录文章，可以移步 [我的飞书知识库](https://my.feishu.cn/wiki/ZoKXwsowQi71tbkRmpec2C1Wn8f) 查看。
```

new_string：

```
> 整理好的目录文章，可以移步 [我的飞书知识库](https://my.feishu.cn/wiki/space/7621473012973521888?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home) 查看。
```

- [ ] **Step 4: 验证修改**

```bash
cat src/frontend/README.md
```

确认：
- 工程实践描述无 "DOMock" 字样，包含 "Docker 部署"、"Rancher 发布"、"SQL 查询"、"博客站点搭建"
- 底部链接为带 query params 的飞书 URL

```bash
grep -c "DOMock" src/frontend/README.md
```
Expected: `0`

- [ ] **Step 5: 提交**

```bash
git add src/frontend/README.md
git commit -m "docs: 修正前端 README 工程实践描述并更新飞书链接"
```

---

### Task 4: 修正 src/react/README.md

**Files:**
- Modify: `src/react/README.md`

- [ ] **Step 1: 读取当前文件确认内容**

```bash
cat src/react/README.md
```

确认第 15 行 Hooks 描述、第 24 行底部链接。

- [ ] **Step 2: 修改 Hooks 描述**

用 Edit 工具，old_string：

```
- **Hooks** — useState、useEffect、useRef 等常用 Hook 的使用与原理
```

new_string：

```
- **Hooks** — useRef 使用范围、Hooks 功能组件
```

- [ ] **Step 3: 修改底部链接（语雀 → 飞书）**

用 Edit 工具，old_string：

```
> 整理好的目录文章，可以移步 [语雀知识库](https://www.yuque.com/yopai/pp6bv5) 查看。
```

new_string：

```
> 整理好的目录文章，可以移步 [我的飞书知识库](https://my.feishu.cn/wiki/space/7621473012973521888) 查看。
```

- [ ] **Step 4: 验证修改**

```bash
cat src/react/README.md
```

确认：
- Hooks 描述为 "useRef 使用范围、Hooks 功能组件"
- 底部链接为飞书

```bash
grep -c "语雀" src/react/README.md
```
Expected: `0`

- [ ] **Step 5: 提交**

```bash
git add src/react/README.md
git commit -m "docs: 修正 React README Hooks 描述并迁移飞书链接"
```

---

### Task 5: 修正 src/essay/README.md

**Files:**
- Modify: `src/essay/README.md`

- [ ] **Step 1: 读取当前文件确认内容**

```bash
cat src/essay/README.md
```

确认第 15 行底部链接。

- [ ] **Step 2: 修改底部链接（更新为带 query params 的完整 URL）**

用 Edit 工具，old_string：

```
> 部分内容会同步更新到 [我的随笔知识库](https://my.feishu.cn/wiki/DhyEwQKjHiekZKkTZRicnvQKnWh)，同步会有延时。
```

new_string：

```
> 部分内容会同步更新到 [我的随笔知识库](https://my.feishu.cn/wiki/space/7657078372899507173?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home)，同步会有延时。
```

- [ ] **Step 3: 验证修改**

```bash
tail -3 src/essay/README.md
```

确认底部链接为带 query params 的飞书 URL。

- [ ] **Step 4: 提交**

```bash
git add src/essay/README.md
git commit -m "docs: 更新随笔 README 飞书链接为完整 URL"
```

---

### Task 6: 全局验证与部署

**Files:** 无文件修改，仅验证与部署

- [ ] **Step 1: 全局检查残留语雀链接**

```bash
grep -rn "yuque\|语雀" src/ai/README.md src/java/README.md src/react/README.md src/frontend/README.md src/essay/README.md src/recommend/README.md
```

Expected: 无输出（所有 6 个目录 README 均无语雀链接）。如果首页 `src/README.md`、`src/zh/README.md`、`src/en/README.md` 仍有语雀链接，那是预期内的（本次范围外）。

- [ ] **Step 2: 构建验证**

```bash
npm run docs:build 2>&1 | tail -30
```

Expected: 构建成功，无与 README 相关的错误。可能存在的警告（Yuque 图标无效、Vue 组件告警等）属预期内的非阻塞告警。

如果构建失败，回退检查 frontmatter 格式是否正确。

- [ ] **Step 3: 推送到远程**

```bash
git push origin master
```

Expected: 推送成功。如遇网络超时，重试该命令（最多 30 次）。

- [ ] **Step 4: 运行 deploy.sh 部署**

```bash
bash deploy.sh
```

Expected: 构建过程输出 VuePress 渲染日志，最后输出 `To github.com:HerryLo/HerryLo.github.io.git` 和 `master -> master (forced update)` 表示部署成功。

- [ ] **Step 5: 线上验证**

等待 1-2 分钟让 GitHub Pages 生效，访问以下页面确认：
- `https://herrylo.github.io/ai/` — 主要内容显示三组（含 LangChainJS）
- `https://herrylo.github.io/java/` — 工程实践包含 MySQL，有"其他"分组
- `https://herrylo.github.io/frontend/` — 工程实践无 DOMock
- `https://herrylo.github.io/react/` — Hooks 描述与实际匹配
- `https://herrylo.github.io/essay/` — 底部链接 URL 更新

各页底部链接点击可跳转到对应飞书知识库。

---

## Self-Review 结果

- **Spec coverage**:
  - ai README description + 主要内容 + 链接 → Task 1 ✓
  - java README 工程实践 + 其他分组 + 链接 → Task 2 ✓
  - frontend README 工程实践描述 + 链接 URL → Task 3 ✓
  - react README Hooks 描述 + 链接 → Task 4 ✓
  - essay README 链接 URL → Task 5 ✓
  - 验证 + 部署 → Task 6 ✓
  - 不修改 recommend/首页 README → 计划中明确 ✓
- **Placeholder scan**: 无 TBD/TODO，所有 Edit 的 old_string/new_string 完整给出
- **Type consistency**: 飞书 URL 在各任务中一致（ai/java/react 共用同一 URL，frontend/essay 各自带 query params）
