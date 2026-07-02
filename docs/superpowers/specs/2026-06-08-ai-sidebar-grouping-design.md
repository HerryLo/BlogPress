# AI 侧边栏分组与新增 LangChainJS 文章设计

## 背景

`src/ai/` 目录下原有 6 篇文章（大模型基础知识、大模型名词介绍、白嫖党体验Claude Code、如何使用AI搭建工作流、生成式AI、为什么需要RAG），最近新增 4 篇 LangChainJS 系列文章（基础模型→Prompt→Runnable→Chain）。当前 `sidebar/zh.ts` 中 `/ai/` 是扁平的 6 项列表，未包含新增的 4 篇，需要重组结构并纳入新文章。

## 目标

- 将 `/ai/` 侧边栏从扁平列表改为分组结构，与其他目录（java、frontend）一致
- 新增 4 篇 LangChainJS 文章，按学习顺序排列
- 修正一处文件名末尾空格问题

## 范围

### 修改文件

1. `src/.vuepress/sidebar/zh.ts` —— 重写 `/ai/` 配置为分组结构
2. `src/ai/LangChainJS之Prompt提示词 .md` → `src/ai/LangChainJS之Prompt提示词.md` —— 重命名去末尾空格
3. 上述重命名文件的 frontmatter `title` 去末尾空格

### 不修改文件

- `src/.vuepress/navbar/zh.ts` —— AI 入口已存在（`navbar/zh.ts:21-24`），无需改动
- `src/ai/README.md` —— 内容仍准确，LangChainJS 视为 AI 实践一部分
- `src/.vuepress/sidebar/en.ts` —— 英文站无 `/ai/` 配置，不涉及
- `src/.vuepress/sidebar/index.ts` —— 不涉及

## 设计

### 侧边栏分组结构

```
AI
├─ 大模型基础  (icon: book, collapsible: true)
│  ├─ 大模型基础知识
│  ├─ 大模型名词介绍
│  ├─ 生成式AI
│  └─ 为什么需要RAG
├─ LangChainJS  (icon: link, collapsible: true)
│  ├─ LangChainJS之基础模型(一)
│  ├─ LangChainJS之Prompt提示词(二)
│  ├─ LangChainJS之Runnable(三)
│  └─ LangChainJS之Chain链(四)
└─ AI实践  (icon: laptop-code, collapsible: true)
   ├─ 如何使用AI搭建工作流
   └─ 白嫖党体验Claude Code
```

分组顺序为：基础概念 → 框架学习 → 实践应用。

### 链接格式

沿用现有风格，使用文件名（不含 `.md`）作为 link。参考 `sidebar/zh.ts:223-237` 现有的 `/ai/` 配置。

### 文件重命名

- 旧名：`src/ai/LangChainJS之Prompt提示词 .md`（末尾空格）
- 新名：`src/ai/LangChainJS之Prompt提示词.md`
- frontmatter `title`：`'LangChainJs之Prompt提示词(二) '` → `'LangChainJs之Prompt提示词(二)'`（去末尾空格）

用 `git mv` 重命名以保留历史。

## 验证

- `npm run docs:dev` 启动后访问 `/ai/`，确认侧边栏显示三个分组，每组可折叠
- 三个分组共 10 篇文章链接均可点击进入
- LangChainJS 第二篇（Prompt）能正常访问，URL 中无 `%20`
