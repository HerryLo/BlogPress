---
title: 'LangChainJS之基础模型(一)'
date: 2026-07-02T10:00:00+08:00
description: LangChainJS之基础模型调用
category:
  - AI
tags:
  - 大模型
---

### 为什么需要LangChain？

LangChain 是一个专为智能体（Agent）设计的开发框架，其核心价值在于为大模型赋予“连接外部工具”的能力，从而突破其固有的“大脑”(大模型)边界。

由于大模型在预训练完成后，其参数化知识便已冻结，无法实时更新或获取私有数据。若要注入新知识，传统方式需进行成本高昂的重新训练。而 LangChain 另辟蹊径，它并不试图改变模型的“思维”，而是为其“长出手脚”——通过集成网络搜索、本地知识库检索（即 RAG）、文档编辑等外部工具，让大模型能够利用外部信息源进行推理与行动，从而极大地扩展了其应用边界。

LangChain分为Python和Javascript两个版本，下面的代码示例，我们将以Javascript版本来学习LangChain。

### 基础 LLM 调用

环境要求`NodeJs 20+`以上，Langchainjs@0.3，Windows、Mac、Linux平台均支持。

```
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  // model：指定使用的模型名称
  model: "GLM-5.1",
  // 【参数】temperature：控制回复的随机性和创造性
  //  0.0-0.3 → 确定性强，适合代码生成、事实回答
  //  0.5-0.8 → 平衡，适合日常对话
  //  0.8-1.0 → 高创造性，适合写作、头脑风暴
  temperature: 0.7,
  configuration: {
    baseURL: process.env.OPENAI_API_KEY,
    apiKey: process.env.OPENAI_BASE_URL,
  },
});

async function main() {
  const response = await model.invoke("你好");
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

代码参考：[基础llm调用](https://github.com/HerryLo/LangChainJsLearning/blob/main/src/01-setup/01-simple-llm.ts)

### 聊天模型

`new ChatOpenAI`即是对聊天模型实例初始化。`ChatOpenAI`是LangChain集成`OpenAI`聊天模型的核心类，它适配所有支持`OpenAI`接口规范的大模型：

-   智谱GLM系列：兼容OpenAI接口规范；
-   DeepSeek系列：兼容OpenAI接口规范；
-   通义千问系列：兼容OpenAI接口规范；
-   Kimi：兼容OpenAI接口规范；
-   豆包系列：兼容OpenAI接口规范；

同时LangChain集成支持`Anthropic`、`Gemini`、`DeepSeek`等接口规范，通过 `@langchain/` 开头的官方集成包，支持非常多的聊天模型。

```
// Anthropic
import { ChatAnthropic } from '@langchain/anthropic';
const model = new ChatAnthropic({ model: 'claude-3-5-sonnet' });

// DeepSeek
import { ChatDeepSeek } from '@langchain/deepseek';
const model = new ChatDeepSeek({ model: 'deepseek-reasoner' });
```

### Message

在[基础llm调用](https://github.com/HerryLo/LangChainJsLearning/blob/main/src/01-setup/01-simple-llm.ts)时，我们通常直接使用字符串提问。这种方式适用于一次性问答，但对于需要上下文连续性的多轮对话，它便显得力不从心：模型无法“记住”之前的交流，每次提问都孤立无援。

在日常开发中，多轮对话是高频场景。LangChain的**Message**正是为此而生——它作为聊天模型输入输出的**结构化对象**，通过 `role`（角色）和 `content`（内容）两个核心字段，为每条消息赋予了明确的身份和意图。这一设计让模型能够清晰区分“谁在说”、“说了什么”，从而真正理解对话的上下文，实现连贯的多轮交互。

```
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// ... 代码省略
const messages = [
    new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
    new HumanMessage("什么是 LangChain？"),
];
const response = await model.invoke(messages);
console.log("AI 回复:", response.content);
// ... 代码省略
```

代码参考：[message多轮对话](https://github.com/HerryLo/LangChainJsLearning/blob/main/src/01-setup/02-chat-model.ts)

`LangChain`中三个最常用的消息类是 `HumanMessage`、`SystemMessage` 和 `AIMessage`。

-   `SystemMessage`：在对话开始时，给模型设定一个全局指令，如定义它的角色、行为准则、输出格式等；
-   **`HumanMessage`** **：** 用户输入的任何内容，如问题、命令或需要模型处理的数据；
-   **`AIMessage`** **：** 模型对用户输入做出的响应。在需要传递历史记录时，会用到它；

### 结束

通过`ChatOpenAI`和 `Message`配合使用，即可实现一个简易的大模型问答系统。

当然，它离正式大模型问答系统还差的远，不过千里之行始于足下，加油！像常说prompt提示词，chains构建链，RAG知识库等都是缺失的，不过这些在后续的文章里面，我们会一一学到。