# AI 侧边栏分组与新增 LangChainJS 文章 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `src/ai/` 侧边栏从扁平 6 项列表改为三组结构（大模型基础 / LangChainJS / AI实践），纳入 4 篇新增 LangChainJS 文章，并修正一处文件名末尾空格问题。

**Architecture:** 修改 `src/.vuepress/sidebar/zh.ts` 中 `/ai/` 配置为 `sidebar()` 分组结构；用 `git mv` 重命名一个带末尾空格的 markdown 文件并修正其 frontmatter `title`。Navbar 不动。

**Tech Stack:** VuePress 2 + vuepress-theme-hope，TypeScript 配置文件，Markdown frontmatter。

---

## File Structure

- `src/.vuepress/sidebar/zh.ts` —— 修改 `/ai/` 配置块（约 223-237 行），从单层 `children: [...]` 改为三个分组对象
- `src/ai/LangChainJS之Prompt提示词 .md` → `src/ai/LangChainJS之Prompt提示词.md` —— git mv 重命名 + frontmatter title 去空格

参考已有分组写法：`src/.vuepress/sidebar/zh.ts:109-181`（`/java/` 配置）使用 `text` / `icon` / `collapsible` / `children` 结构。

---

### Task 1: 重命名带空格的 LangChainJS 文章文件

**Files:**
- Rename: `src/ai/LangChainJS之Prompt提示词 .md` → `src/ai/LangChainJS之Prompt提示词.md`
- Modify: 新文件 frontmatter `title` 字段

- [ ] **Step 1: 用 git mv 重命名文件（保留历史）**

```bash
git mv "src/ai/LangChainJS之Prompt提示词 .md" "src/ai/LangChainJS之Prompt提示词.md"
```

Expected: 命令无输出，`git status` 显示 `renamed: src/ai/LangChainJS之Prompt提示词 .md -> src/ai/LangChainJS之Prompt提示词.md`

- [ ] **Step 2: 修正 frontmatter title 末尾空格**

打开 `src/ai/LangChainJS之Prompt提示词.md`，将第 2 行：

```yaml
title: 'LangChainJs之Prompt提示词(二) '
```

改为：

```yaml
title: 'LangChainJs之Prompt提示词(二)'
```

注意 `title` 字符串末尾的空格要去掉，但前面 `LangChainJs` 中 `Js` 的拼写保留原样（与第一篇 `LangChainJS之基础模型` 不同，遵循原文不动）。

- [ ] **Step 3: 验证文件已重命名且 frontmatter 已更新**

```bash
ls "src/ai/" | grep Prompt
```

Expected: 输出 `LangChainJS之Prompt提示词.md`，无末尾空格。

```bash
head -3 "src/ai/LangChainJS之Prompt提示词.md"
```

Expected: 第 2 行显示 `title: 'LangChainJs之Prompt提示词(二)'`（无末尾空格）。

- [ ] **Step 4: 提交**

```bash
git add "src/ai/LangChainJS之Prompt提示词.md"
git commit -m "refactor: 重命名 LangChainJS Prompt 文章去掉末尾空格"
```

---

### Task 2: 重写 `/ai/` 侧边栏为三分组结构

**Files:**
- Modify: `src/.vuepress/sidebar/zh.ts:223-237`（`/ai/` 配置块）

- [ ] **Step 1: 定位当前 `/ai/` 配置**

打开 `src/.vuepress/sidebar/zh.ts`，找到约 223-237 行的 `/ai/` 配置块。当前内容：

```ts
  "/ai/": [
    {
      text: "AI",
      icon: "robot",
      collapsible: false,
      children: [
        "大模型基础知识",
        "大模型名词介绍",
        "白嫖党体验Claude Code",
        "如何使用AI搭建工作流",
        "生成式AI",
        "为什么需要RAG",
      ],
    },
  ],
```

- [ ] **Step 2: 整块替换为三分组结构**

将上面整块替换为：

```ts
  "/ai/": [
    {
      text: "大模型基础",
      icon: "book",
      collapsible: true,
      children: [
        { text: "大模型基础知识", link: "大模型基础知识" },
        { text: "大模型名词介绍", link: "大模型名词介绍" },
        { text: "生成式AI", link: "生成式AI" },
        { text: "为什么需要RAG", link: "为什么需要RAG" },
      ],
    },
    {
      text: "LangChainJS",
      icon: "link",
      collapsible: true,
      children: [
        { text: "LangChainJS之基础模型(一)", link: "LangChainJS之基础模型" },
        { text: "LangChainJS之Prompt提示词(二)", link: "LangChainJS之Prompt提示词" },
        { text: "LangChainJS之Runnable(三)", link: "LangChainJS之Runnable" },
        { text: "LangChainJS之Chain链(四)", link: "LangChainJS之Chain链" },
      ],
    },
    {
      text: "AI实践",
      icon: "laptop-code",
      collapsible: true,
      children: [
        { text: "如何使用AI搭建工作流", link: "如何使用AI搭建工作流" },
        { text: "白嫖党体验Claude Code", link: "白嫖党体验Claude Code" },
      ],
    },
  ],
```

要点：
- 三个分组均设置 `collapsible: true`，与 `/java/`、`/frontend/` 风格一致
- link 不带 `.md`，参考 `src/.vuepress/sidebar/zh.ts:115-122` 的 java 文章 link 写法
- 第二篇 Prompt 的 link 为 `LangChainJS之Prompt提示词`（与 Task 1 重命名后的文件名一致，无末尾空格）
- `text` 中保留 `(一)/(二)/(三)/(四)` 顺序标记，便于读者识别学习顺序

- [ ] **Step 3: 验证文件语法正确**

```bash
npx tsc --noEmit src/.vuepress/sidebar/zh.ts 2>&1 | head -20
```

Expected: 无报错输出（或仅有无关的类型告警）。如果出现类型错误，检查逗号、括号是否匹配。

- [ ] **Step 4: 启动 dev 服务，浏览器验证**

```bash
npm run docs:dev
```

打开浏览器访问 `http://localhost:8080/ai/`（端口以实际输出为准），确认：
1. 左侧侧边栏显示三个分组：大模型基础、LangChainJS、AI实践
2. 每个分组可折叠/展开
3. 点击 "LangChainJS之Prompt提示词(二)" 能正常进入文章页，URL 中无 `%20`
4. 点击其他 9 篇文章链接均能正常进入

Expected: 10 个链接全部可访问，分组显示正确。

- [ ] **Step 5: 停止 dev 服务并提交**

停止 dev 服务（Ctrl+C 或 kill 进程）。

```bash
git add src/.vuepress/sidebar/zh.ts
git commit -m "feat: AI 侧边栏改为大模型基础/LangChainJS/AI实践三分组"
```

---

### Task 3: 推送到远程并部署

**Files:** 无文件修改，仅 git 操作

- [ ] **Step 1: 推送到 GitHub**

```bash
git push origin master
```

Expected: 输出 `master -> master`，推送成功。如遇网络超时，重试该命令。

- [ ] **Step 2: 运行 deploy.sh 构建并部署**

```bash
bash deploy.sh
```

Expected: 构建过程输出大量 VuePress 渲染日志，最后输出 `To github.com:HerryLo/HerryLo.github.io.git` 和 `master -> master (forced update)` 表示部署成功。

- [ ] **Step 3: 验证线上效果**

等待 1-2 分钟让 GitHub Pages 生效，访问 `https://herrylo.github.io/ai/`，确认：
1. 侧边栏显示三个分组
2. 10 篇文章均可访问

Expected: 线上效果与本地 dev 一致。

---

## Self-Review 结果

- **Spec coverage**: 
  - 三分组结构（大模型基础含生成式AI/为什么需要RAG、LangChainJS 四篇、AI实践）→ Task 2 ✓
  - 文件重命名去末尾空格 + frontmatter 修正 → Task 1 ✓
  - Navbar 不动 → 计划中明确不修改 ✓
  - 验证步骤（dev + 线上）→ Task 2 Step 4 + Task 3 Step 3 ✓
- **Placeholder scan**: 无 TBD/TODO，所有代码块完整可执行
- **Type consistency**: 文件名 `LangChainJS之Prompt提示词.md`（无空格）在 Task 1 重命名、Task 2 link 字段中一致；title `LangChainJs之Prompt提示词(二)` 保留原 `Js` 拼写在 Task 1 Step 2 中明确说明
