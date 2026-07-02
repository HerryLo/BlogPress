---
title: 'LangChainJS之Prompt提示词(二)'
date: 2026-07-02T10:00:00+08:00
description: LangChainJS之Prompt提示词
category:
  - AI
tags:
  - 大模型
---

在上文中中，我们了解使用LangChainJS进行基础的消息大模型调用，如果你对于大模型基础调用不了解，可以先看看第一章。下面我们将继续学习讨论Prompt提示词。

### 为什么需要Prompt提示词？

Prompt提示词是给到大模型的消息指令。在上一章中提到Message消息，Message也是用来给大模型的消息指令，直接使用Message完全可行，而且对于固定内容的单次调用，甚至更简单，那为什么还需要Prompt提示词呢？

在LangChain中，prompt提示词的价值在于“动态构建”和“可复用”。如果使用Message消息是没办法动态构建和复用的，而prompt解决了这个问题。

提示词调用

```
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
});

async function main() {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个语言翻译专家，将 {source_lang} 翻译成 {target_lang}。"],
    ["user", "{text}"],
  ]);
  const prompt = await promptTemplate.format({
    source_lang: "中文",
    target_lang: "英文",
    text: "你好，世界！",
  });

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

代码参考：[prompt使用](https://github.com/HerryLo/LangChainJsLearning/blob/main/src/02-prompts/02-chat-prompt-template.ts)

在示例代码中，`PromptTemplate` 通过结构化模板实现了对提示词的动态调控。它就像一个预设好格式的填空文档，用 `{ }` 作为占位符，精准标记出需要动态变化的部分。每次调用时，只需传入对应的变量值，模板便会自动完成内容填充，生成一份可直接交付给模型的提示词。

动态构建：通过占位符变量标记出动态变化的部分，每次调用，只需要传入对于变量值；

可复用：`promptTemplate`提示词模板可反复使用，只需要调用`promptTemplate.format`再次给定变量值即可；

### 结构化输出

结构化输出是Prompt提示词的高阶应用场景。基础版的`PromptTemplate`通过`{ }`占位符虽然能灵活控制输入，却无法约束模型的输出。

在实际业务中，我们往往需要模型返回标准格式的JSON数据——便于前端解析、后端存储或下游系统集成。结构化输出正是为此而生：它在提示词层面明确告知模型所需的输出结构，并结合LangChain的解析器，将模型返回的文本自动转换为可用的JSON对象，从而实现对输出的精准控制。

```
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// 代码省略......
const schema = z.object({
  sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
  confidence: z.number().min(0).max(1).describe("置信度"),
  reasoning: z.string().describe("分析理由"),
});

const structuredModel = model.withStructuredOutput(schema);

const text = "这家餐厅的食物非常好吃，服务也很棒！";
const result = await structuredModel.invoke(
  `分析以下文本的情感：\n${text}`
);

console.log("解析结果:", result);
```

用 `zod` 定义你期望的输出结构，定义一个模式（Schema），然后将其传入模型的 `withStructuredOutput` 方法即可，然后调用`invoke()`方法，即会输出相应JSON结构数据：

```
解析结果: {
  sentiment: 'positive',
  confidence: 0.98,
  reasoning: "文本中使用了'非常好吃'、'很棒'等积极词汇，表达了对餐厅食物和服务的满意与赞赏，没有负面或中性表述，整体情感倾向明确为正面。"
}
```

结构化输出既包含提示词里的格式指令，又借助了LangChain的解析器或模型的底层参数（如 `response_format`）来保障输出，属于格式层面的控制。

### 少样本学习

少样本学习是一种通过向大模型提供少量示例来引导其输出的提示词技术。它不直接告诉模型“你应该怎么做”，而是给模型展示几个“输入→输出”的参考样例，让模型从中学习任务模式，并据此对新的输入生成符合预期的结果。

```
import { ChatOpenAI } from "@langchain/openai";
import { FewShotChatMessagePromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";

const examples = [
  { input: "苹果", output: "水果" },
  { input: "胡萝卜", output: "蔬菜" },
  { input: "香蕉", output: "水果" },
  { input: "菠菜", output: "蔬菜" },
];
const examplePrompt = ChatPromptTemplate.fromTemplate(
  "输入: {input}\n输出: {output}"
);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  examples,
  examplePrompt,
  prefix: "以下是食物分类的示例，请根据示例回答：",
  suffix: "输入: {input}\n输出:",
  inputVariables: ["input"],
});

const prompt = await fewShotPrompt.format({ input: "橙子" });
const response = await model.invoke(prompt);
console.log("AI: 回复：",response.content); // AI: 回复：水果
```

少样本学习是把例子直接写在提示词文本里，属于内容层面的控制。同时示例不是越多越好，3-6个高质量示例即可，如果当示例比较多时，务必要使用LangChain提供的示例选择器。

### 总结

以上便是 Prompt 提示词的基础调用与高阶应用示例。这些代码旨在帮助你理解其作用与功能——在实际开发中，你可以根据具体需求灵活选择使用何种方式。

如今日常开发中，AI 编程工具已成为得力助手。但理解这些底层原理的意义：当你看到 AI 生成的代码时，你能看懂它“在做什么”，更能理解它“为什么这样写”。