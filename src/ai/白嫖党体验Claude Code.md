---
title: '白嫖党体验Claude Code'
date: 2026-03-19T10:00:00+08:00
category:
  - AI
tags:
  - Claude_Code
  - AI
  - 工具
---

# 白嫖党体验Claude Code

作者：[Herrylo](https://herrylo.github.io/ai/白嫖党体验Claude%20Code.html)

本人是白嫖党，找了个免费大模型玩玩，主要是为了体验 Claude Code 的功能。

## Claude Code

> Claude Code 一个在在终端中运行的代理助手。虽然它在编码方面表现出色，但它可以帮助您完成从命令行可以做的任何事情：编写文档、运行构建、搜索文件、研究主题等。

这个是官方文档中对于 Claude Code 的说明简介，我们通俗点理解就是：Claude Code 是一个基于 AI 大模型的命令行工具，它可以做很多事情，例如编写代码、编写文档、搜索文件、运行构建等。这样解释有点抽象，我们来看看我们使用中的整个链路，这样对于它就会对它有更加清晰的认识，如下：

```
用户输入
   ↓
[1. 终端界面层] (你所在的 PowerShell/Terminal)
   ↓
[2. Claude Code 客户端] (本地命令行程序)
   ↓
[3. 上下文构建器] (收集当前项目信息)
   ↓
[4. API 调用层] (通过智谱/Anthropic API) —————————— 调用大模型的API
   ↓
[5. 大模型处理] (glm-4.6v/glm-4.5-air 等)—————————— 具体调用那个模型可以配置
   ↓
[6. 响应解析器] (解析模型返回内容)—————————————————— Claude Code 响应处理器
   ↓
[7. 工具执行层] (读取文件、运行命令、搜索代码等)—————— Claude Code执行
   ↓
[8. 结果返回] (终端显示 + 继续对话)
   ↓
回到步骤 3 (如果需要继续)
```

根据上面的调用流程，可以了解到 **Claude Code** 只是 **执行工具**，用户在命令行中输入的内容，它调用大模型 API 进行处理，然后接收结果并且进行执行。但是，调用大模型 API 是收费的，是需要消耗 token 的。目前主流的大模型 API 调用，基本都是收费，像 deepseek、kimi、豆包、千问、GPT，都是按照 `token` 使用量来收费，**1个** **token** **大概对应1.5~2个汉字**。

以 `Deepseek` 模型为例，版本 `DeepSeek-V3.2`，`输入价格2元/百万tokens`，`输出价格3元/百万tokens`。上面输入价格是未计算缓存，如果是输入缓存命中，那价格只需要 `0.2元/ 百万tokens`，DeepSeek API 缓存命中是对所有用户默认开启，所以我们直接理解为 `输入价格` 0.2元/ 百万tokens`，**大约150万个汉字只需要0.2元**，价格是相当美丽💯。

不过作为白嫖党，我还是喜欢免费体验。本次使用的模型是 [**智谱GLM**](https://open.bigmodel.cn/)，新用户注册即送2000万token。

## 安装配置

既然是体验 Claude Code，那首先需要安装它，以下是 windows 电脑配置：

```bash
# 1、安装nodejs：Node.js 18+ 以上
# Windows 用户还需安装Git

# 2、运行命令：
npm install -g @anthropic-ai/claude-code

# 3、查看版本：
claude --version
```

以上安装完成后，我们还无法直接使用 claude，因为 claude 是需要调用大模型 API，我们还需要进行配置：

```bash
# 1、访问 账号智谱开放平台 注册

# 2、登录后，在个人中心页面，点击 API Keys，创建一个新的 API Key

# 3、配置环境变量，编辑或新增 Windows 为`用户目录/.claude/settings.json`
# 新增或修改里面的 env 字段
# 注意替换里面的 `your_zhipu_api_key` 为您上一步获取到的 API Key
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
# 再编辑或新增，Windows 为`用户目录/.claude.json`
# 新增 `hasCompletedOnboarding` 参数
{
  "hasCompletedOnboarding": true
}
```

在配置完成以后，你终于可以使用 Claude Code 啦！

更多详细配置参考文档：[Claude Code - 智谱AI开放文档](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)

## 体验使用

Windows 电脑，在桌面或对应文件夹，最好新建一个文件夹，然后再按 shift+右键，选择开启 Powershell 窗口。我这边是在 D 盘目录下创建了 Claude Code Test 文件夹，作为体验 Claude Code 使用。

同时建议安装 [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?hl=zh-cn&gl=US&ocid=pdpshare)，主要是 window 默认的 Powershell 太丑了，安装好后，将 Windows Terminal 设置为默认 Powershell，你就可以和我一样拥有下面的窗口了。

![](https://cdn.nlark.com/yuque/0/2026/png/1606439/1775805529891-42f06d74-1e26-4362-a608-e465efac9333.png)

在体验使用过程中建议盯下 token 使用量，token 使用非常快，没搞下基本就几百万 token 就没了😅😅。别放飞自我，虽然没多少钱，但别忘了你只是想白嫖，智谱 token 使用量查看[智谱GLM套餐包管理](https://bigmodel.cn/finance-center/resource-package/package-mgmt)。

![](https://cdn.nlark.com/yuque/0/2026/png/1606439/1775805876443-a093072d-7245-4bcf-a2bf-183b3dec171a.png)

## 结尾

好的，以上就是本次白嫖 Claude Code 的大致细节了。其实我本来想使用 cursor 配置模型，cursor 免费送的次数体验完了，所以想拿智谱的顶上。

但是发现 "Cursor 自定义模型的收费情况，答案是：**配置和使用自定义模型本身不再额外收费，但你很可能需要先升级到付费套餐。**，首先我需要升级为付费套餐才可以自定义模型，好吧，我没钱，就想白嫖一下，那就 Claude Code 吧！

![](https://cdn.nlark.com/yuque/0/2026/png/1606439/1775806852411-9333922d-08f7-41a4-81c9-f5a876fe3752.png)
