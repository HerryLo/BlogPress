---
title: 'LangChainJS之Chain链(四)'
date: 2026-03-01T10:00:00+08:00
description: LangChainJS之Chain链
category:
  - AI
tags:
  - 大模型
---

前面几章，我们了解如何使用消息大模型，使用prompt提示词，Runnable是什么。如果你对于大模型使用、prompt提示词、Runnable不太了解，可以先看看前面几章。下面我们将继续学习讨论Chain链。

### 为什么需要Chain链？

`Chain链`的本质，就是管道。在Shell命令行中，我们通过`|`操作符串联命令，例如`cat file.txt | tr 'a-z' 'A-Z'`将文件内容转为大写——管道将左侧命令的标准输出，直接作为右侧命令的标准输入。LangChain借鉴了这一经典设计，将其命名为`Chain`（链）。

引入管道特性的目的，在于践行Unix哲学：每个组件只做一件事，并把它做好，然后通过管道将它们组合起来解决复杂问题。在LangChain.js中，Chain链正是这一理念的落地——它将模型、提示词模板、工具等异构组件串联成可执行的工作流，并统一管理组件间的数据传递与逻辑编排，让开发者能以声明式、可组合的方式构建复杂的AI应用。

```
ChatPrompt.pipe(model).pipe(new StringOutputParser())
```

如果没有`Chain链`，在使用模型、提示词、工具等组件时，开发者只能手动管理它们之间的数据传递。每一次调用都需要显式地获取前一步的输出，再作为下一步的输入。这种“胶水代码”在单次调用时尚且可控，但一旦涉及多轮对话或复杂工作流，数据结构就会变得混乱不堪，逻辑纠缠，维护成本急剧攀升。

`Chain链`正是为此而生。它不仅允许开发者反复复用一个已构建好的工作流，更重要的是，它提供了一种标准化的编排模式——将模型、提示词、工具等异构组件统一纳入同一套接口（`Runnable`）之下，由链本身统一管理组件间的数据流转与执行顺序。开发者只需关心“做什么”，而无需关心“怎么传”。

下面我们来看看，手动调用和使用Chain调用的不同之处。

### 手动调用

如果我们要生成一篇文章，不使用Chain链调用，代码的执行是什么样，可以看看下面的代码↓

```
// 初始化模型
const model = new ChatOpenAI({ model: "DeepSeek-V4-Pro" });

// 定义提示词模板（依然可以复用）
const outlinePrompt = ChatPromptTemplate.fromTemplate(
  "请为主题 '{topic}' 生成一篇文章的大纲。"
);
const articlePrompt = ChatPromptTemplate.fromTemplate(
  "根据以下大纲写一篇完整的文章：\n\n{outline}"
);

// 1️⃣ 生成大纲
const outlineMessages = await outlinePrompt.formatMessages({ 
  topic: "人工智能的未来" 
});
const outlineResponse = await model.invoke(outlineMessages);
// 从响应中提取文本内容（相当于 StringOutputParser 的功能）
const outline = outlineResponse.content;

// 2️⃣ 基于大纲生成文章
const articleMessages = await articlePrompt.formatMessages({ 
  outline: outline 
});
const articleResponse = await model.invoke(articleMessages);
const article = articleResponse.content;

console.log(article);
```

如果不使用Chain 链，开发者需要手动依次调用每个组件，并显式地传递数据，手动管理每一步的输入/输出、顺序和异常。

### Chain链调用

下面我们来看看使用Chain链调用，又是什么样子，请看下面的代码↓

```
// 初始化模型
const model = new ChatOpenAI({ model: "DeepSeek-V4-Pro" });

// 大纲提示词
const outlinePrompt = ChatPromptTemplate.fromTemplate(
  "请为主题 '{topic}' 生成一篇文章的大纲。"
);
const outlineChain = outlinePrompt
  .pipe(model)
  .pipe(new StringOutputParser()); // 输出字符串

// 文章提示词
const articlePrompt = ChatPromptTemplate.fromTemplate(
  "根据以下大纲写一篇完整的文章：\n\n{outline}"
);
const articleChain = articlePrompt
  .pipe(model)
  .pipe(new StringOutputParser()); // 输出字符串

// chain链拼接组合
const fullChain = outlineChain
   // 把上一步的字符串 outline 包成对象,再喂给 articleChain
  .pipe(RunnableLambda.from((outline: string) => ({ outline }))) 
  .pipe(articleChain);

const result = await fullChain.invoke({ topic: "人工智能的未来" });
```

`outlineChain`和`articleChain`使用`Chain链`组装，它们是两个等待调用或复用的组件，此时它们还没被调用。而`fullChain`是这两个Chain组件的组合结果，`outlineChain`生成大纲并且输出字符串，再将生成的大纲字符串通过`RunnableLambda`转换成`{ outline: string }`对象传递给`articleChain`。直到调用`invoke`方法，整个流程才开始运行：

```
 topic 进入 outlineChain
       ↓
   大纲字符串
       ↓
RunnableLambda 包成 { outline }
       ↓
{ outline } 进入 articleChain
       ↓
 最终文章字符串
```

使用Chain链构建工作流，其中的每个子链（如 `outlineChain`）都可**独立复用，** 也可**灵活拼接**，自动**由链管理数据流转**。

### 路由链

这里的路由，类比网络路由，首先收到一个数据包，看包的目的地址，再根据路由表把包转发到正确的下一跳。"路由"的核心是：根据输入的某个属性，把请求分发到不同的处理路径。

在 `Chain链`中，是根据问题类别分发到不同专家 prompt，下面我们来看看路由链：

```
// 使用 withStructuredOutput 进行分类
const classificationSchema = z.object({
  category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
});
const classifier = model.withStructuredOutput(classificationSchema);

// 三个提示词模版
const techPrompt = ChatPromptTemplate.fromTemplate(
  "你是一个技术专家。请回答以下技术问题：\n{question}"
);
const cookingPrompt = ChatPromptTemplate.fromTemplate(
  "你是一个厨师。请回答以下烹饪问题：\n{question}"
);
const generalPrompt = ChatPromptTemplate.fromTemplate(
  "请回答以下问题：\n{question}"
);

const question = "怎么做红烧肉？";
// 分类
const classification = await classifier.invoke(
  `将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）：\n${question}`
);

let selectedPrompt;
// 根据问题分类，加载对应提示词模版
switch (classification.category) {
  case "tech":
    selectedPrompt = techPrompt;
    break;
  case "cooking":
    selectedPrompt = cookingPrompt;
    break;
  default:
    selectedPrompt = generalPrompt;
}

const answer = await selectedPrompt
  .pipe(model)
  .pipe(new StringOutputParser()).invoke({ question });
// const result = await answerChain.invoke({ question });
```

如果你只看 switch 语句，那就是普通的条件分支，没什么"路由"味道。"路由链"这个名字来自 `LangChain` 的设计模式命名 ——强调的是整个流程的模式（**分类 → 分发 → 处理**），而不是单个 switch 语句。

换句话说：switch 本身不叫路由，但 "**先分类再分发到不同链**"这种整体结构就叫**路由链**。

### 转换链

转换链的本质，是借助 `Runnable` 统一标准，对单个或多个输入数据进行灵活处理，将其转换为下游组件所需的结构。

  


```
const transformInput = RunnableLambda.from((input: { text: string }) => ({
  text: input.text,
  wordCount: input.text.split(/\s+/).length,
  characterCount: input.text.length,
}));

const promptTemplate = ChatPromptTemplate.fromTemplate(`
  分析以下文本的摘要：

  文本: {text}
  字数统计: {wordCount} 词，{characterCount} 字

  请提供摘要。
`);

const chain = transformInput
  .pipe(promptTemplate)
  .pipe(model)
  .pipe(new StringOutputParser());

const text = `
  LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
  它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
  无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
`.trim();

const result = await chain.invoke({ text });
```

在上述代码示例中，`RunnableLambda.from` 将原始的 `text` 字段转换为多个字段组成的对象。得益于 `Runnable` 的统一接口规范，经转换后的数据对象，能够无缝传递给后续的提示词模板（`promptTemplate`）使用，整个流程自然而流畅。

在实际业务场景中，原始数据格式往往是固定的，但前端展示或下游处理逻辑，对数据形态有特定要求。转换链恰好精准地解决了这一问题——它作为数据预处理/后处理的标准化“加工站”，让开发者能够以声明式、可组合的方式，将复杂的数据清洗、格式转换、字段映射等逻辑解耦出来，确保数据在进入核心大模型（LLM）环节之前，已完全就绪。

### 总结

如今日常开发中，AI 编程工具已成为得力助手。但理解这些底层原理依然有意义：当你看到 AI 生成的代码时，你能看懂它“在做什么”，更能理解它“为什么这样写”。