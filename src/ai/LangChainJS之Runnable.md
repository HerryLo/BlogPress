---
title: 'LangChainJS之Runnable(三) '
date: 2026-07-02T10:00:00+08:00
description: LangChainJS之Runnable
category:
  - AI
tags:
  - 大模型
---

前面的几篇文章已经说到了使用LangChain如何调用大模型，如何使用提示词，后续我们即将聊到Chain链，Chain链是LangChain的核心，它可以让开发者便捷的构建标准化工作流，数据流转可以在不同的组件间进行，不用显示的把组件传入，方便又快捷。

但在聊Chain链之前，我们必须要先聊下`Runnable`抽象类，因为它是Chain链的基石，没有它，我们很多事情都没法干 ，下面我们来看看`Runnable`。

### Runnable是什么？

`Runnable`是一个抽象类，它定义了一套标准接口，让提示词模板、大模型、输出解析器等不同组件都能以统一的方式被调用和组合。它没办法直接使用，我们通常是使用它的实现类。

```
const transformInput = RunnableLambda.from((input: { text: string }) => ({
  text: input.text,
  wordCount: input.text.split(/\s+/).length,
  characterCount: input.text.length,
}));

// 这里是Chain链调用，下一章会聊到
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

上面我们使用到的`RunnableLambda`，就是`Runnable`的实现类。我们一起看看它干了什么，`RunnableLambda.from`接收一个普通匿名函数作为参数，然后返回一个全新的支持`Runnable`规范的函数`transformInput`，`transformInput`就可直接使用Chain链调用。（Chain链后面会说到）

如果是普通函数，肯定是不支持Chain链调用。这里之所以可以使用Chain链，就是因为`RunnableLambda.from`的转换，它将普通函数转换为支持`Runnable`接口的对象。

### 通用插头

一个 `Runnable` 对象拥有多种执行方式，使其能够灵活应对不同的应用场景。

-   **`invoke`** **/** **`ainvoke`**：最基础的**调用**方法，接收一个输入，返回一个完整的输出。这是最常用的同步/异步执行方式
-   **`batch`** **/** **`abatch`**：**批量处理**多个输入，能有效提升处理效率。`Runnable` 接口内置了优化的并行执行能力。
-   **`stream`** **/** **`astream`**：**流式处理**，在输出生成的同时逐步返回结果。这对需要快速响应的聊天应用等场景至关重要。

```
// 使用invoke 返回完整的输出
const result = await runnable.invoke({ topic: "人工智能的未来" });
console.log(result);

// 使用batch 批量处理多个输入
const runnableInput = RunnableLambda.from(text: string): string => text.toUpperCase());
const inputs = ["hello", "world", "langchain"];
const results = await runnableInput.batch(inputs);

// 使用stream 逐字输出结果 
const result = await runnable.stream({ question: "LangChain是什么" });
for await (const chunk of result) {
    process.stdout.write(chunk); // 会像打字一样，逐字输出
}
```

### Runnable组件

除了模型、提示词这些基础组件，本身就是支持`Runnable` 类规范外，LangChain 还提供了许多内置的 `Runnable` 类，来处理更复杂的逻辑。

-   **`RunnableSequence`**：按顺序执行一系列 `Runnable`，上一个的输出是下一个的输入。你用 `|` 创建的链，本质上就是它。
-   **`RunnableParallel`**：**并行执行**多个 `Runnable`，适合需要同时获取多方面信息的场景。
-   **`RunnableLambda`**：将**任意的普通函数**转换为 `Runnable`，方便在链中插入自定义逻辑。
-   **`RunnablePassthrough`**：**透传**数据，常用来在链中传递或添加额外的上下文信息。
-   **`RunnableBranch`**：实现**条件分支**逻辑，根据输入动态选择要执行的 `Runnable`。

### 总结

以上便是 关于Runnable的说明。如今日常开发中，AI 编程工具已成为得力助手。但理解这些底层原理依然有意义：当你看到 AI 生成的代码时，你能看懂它“在做什么”，更能理解它“为什么这样写”。