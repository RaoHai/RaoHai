:::success
开篇叠 Buff：

+ 本文数据均来自 Google I/O Connect 相关资料以及互联网公开资源。互联网公开资源会标注来源。
+ 本文仅代表个人立场，不构成任何商业建议。

:::

## 日程与会场
大会日程分为两天。第一天是 Mobile 和 Cloud 的话题，而第二天在讨论 AI 与 Web。除了主旨演讲，开发者大会还开设有「工作坊」，让与会者有机会按照教程上手产品体验。我主要关注 Cloud、AI 和 Web 方面。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401068533-5404f06f-78b5-463e-8fb0-b6b14109e61c.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401069721-d598b468-121b-43b1-afae-07553bedbbaa.png)

## Cloud & AI
### Google 想干嘛
先简单了解一下 Google 在 Cloud 和 AI 方面处于什么位置。

Google Cloud：

+ Leader：在 Gartner 2023 云基础设施魔力象限中，与 AWS 和 MS 一样，被放在 Leaders 部分。
+ 市场份额坐四望三：Gartner 2022 年云基础设施市场份额计算中，排名第四。与阿里云仅有 2 亿美元的差距，且有 40% 的年增长率。相比较，阿里云仅有 4% 的增长率。可以预见在 2023 年，阿里云会被夺去第三的宝座。

Google AI：

+ 积累深厚：无论是早先的 Word2Vec 还是 Transformers，都是很重要的 AI 模型。在大语言模型领域 Google 也走得比较早。~~当然后来被 OpenAI 抢在前面又是另一个故事了。~~

云基础设施

![Gartner® Magic Quadrant™ for Cloud Infrastructure and Platform Services, 19 October 2022.](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401067146-0b486dfa-9236-4ec6-86d9-b17f88a0cbf5.png)

云 AI 开发者服务

![Gartner® Magic Quadrant™ for Cloud AI Developer Services, 22 May 2023.](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401068462-108bb65d-0b9b-437c-a2d4-fc5d9a7f39fd.png)

![https://www.gartner.com/en/newsroom/press-releases/2023-07-18-gartner-says-worldwide-iaas-public-cloud-services-revenue-grew-30-percent-in-2022-exceeding-100-billion-for-the-first-time](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401068425-7bfe4454-f448-47cc-af91-484ff19f1620.png)

![Timeline of release dates of LLMs with +10B parameters, Zhao W X, Zhou K, Li J, et al. A survey of large language models[J]. arXiv preprint arXiv:2303.18223, 2023.](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401070354-7e803b9d-e5f9-473e-8019-1413497b33d6.png)

背景输入完毕后，我们就可以通过这一页 PPT 知道 Google 这次是想干嘛：

> 基于 Google Cloud，全面使用生成式 AI，赋能企业与开发者。
>

使用这样的战略来向领先者 AW$ 和 M$ 发起进攻。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401075579-b8d5d9cc-df6a-4b25-8cef-5dad6177fada.png)



### 基础模型
Vertex AI 提供了很多基础模型，比如用于分类、语义分析、总结的 text-bison，用于嵌入的 embedding，和用于代码生成的 code-bison。部分模型有 32k 版本，也就是能接受 32k 的 input token 和 8192 的 output token。  
![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401075743-328c65d7-38d2-4411-bd55-f36fc4288a3d.png)

![https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401073371-a0efcbd2-b9f3-4e51-8aed-5c743f18bd4c.png)

### Vertex AI 平台
在底模之上，Google Cloud 提供了一个 Vertex AI 的机器学习平台。让用户可以在上面部署、训练、调试大模型。甚至还提供了一个 Model Garden 模型市场供用户发布大模型和使用别人发布的大模型。

（这个玩到了。下面说）

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401075534-2f6f66a2-f460-4ba3-a009-4b43631d3636.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401073260-f89cba42-cd87-4565-9445-dafdf024939d.png)

### Gen App Builder
提供了一个通过交互式对话生成 App 的工具（这货我去展示区找了一圈，没得玩）

[youtube](https://www.youtube.com/embed/cIacnd_Spnk?si=3qXaxFZaegn3P9fo)



### 面向开发者的 Duet AI
![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401075950-07b2c16e-e02f-4b13-87bb-4c3cc4f74e78.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401075940-1bbdf583-3b06-4d7d-a8eb-be56b5defcb4.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401081309-dfda74d7-b629-49ce-b840-82f7e283ab64.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401081272-381baa69-2166-46c7-8f57-212d713375d0.png)



Duet AI 做出来的部分跟 codeGPT 比较相似。基于 IDE 插件做的代码补全、生成和问答等能力。产品形态上都在理解范围内（毕竟开发者服务一开始大家都能想到做这些）；画饼部分，辅助式无代码构建和辅助式运维还是很有想象力的。演讲者演示了一个用大模型辅助 K8S 运维的 Demo。很惊艳：

[此处为语雀卡片，点击链接查看](https://www.yuque.com/docs/139072642#Ck7Wq)

### 工作坊：<font style="color:#1f2328;">Vertex AI Generative AI Studio</font>
Google 开发者大会的「工作坊」环节非常给力。比如这个「生成式 AI 工作坊」，就准备了一批电脑，让参会者可以免费试用一下 Vertex AI。

跟 OpenAI 的 Playground 基本上一毛一样。该有的都有。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401077731-b97fabd5-61db-41d3-866b-bfae58dfda1b.png)

比较特色的是提供了一个「结构化模式」。比较新奇。但是能解决大模型乱说话的问题。

比如我要让 AI 帮我做一个「句子情感识别」。我只需要做一个多样本提示的结构化输入：

输入1: A Well-made and entertaining film

输出1: positive

输入2: I fell aleep after 10 mins

输出2: negative



然后在下面的 Test 部分输入希望大模型分析的语句 “这个活动办得平平无奇”。大模型输出 “negative”。非常精准，并且不会乱说话。输出都会局限在 positive / negative / netural 范围内。

![结构化模式：多样本提示](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401081071-aaf61009-df26-4c58-b73a-74756cf9c5d1.png)

调试完之后导出代码。

实际上可以看到底层还是在 prompt，只不过帮你格式化了。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401081227-0959ad8a-08fe-4624-8a45-a656e8ec1598.png)



然后还试了一下代码生成。上面说模型的时候已经说过了。谷歌的代码生成有专门的底模。我这里不是在 Playground 里跑了。是直接在 Google Cloud 上启了一个 Google Colab notebook 跑的。如图所示我在让他给我生成一个俄罗斯方块。

不带 GPU 的云服务器上只要 5 秒。非常快。并且输出很干净，就是代码。

[此处为语雀卡片，点击链接查看](https://www.yuque.com/docs/139072642#dCn9h)





### 本场总结
Google Cloud X 生成式 AI 很明确就是在服务企业。提供一系列 AI 的基础设施，让企业可以进来定制、调试和部署生成式 AI。在此之上让企业构建基于生成式 AI 的应用与服务。并且也提供了一些数据安全性承诺。

如果我现在是一个希望在产品中引入大模型能力的创业者，谷歌提供的这一系列基础设施确实给我带来很大的吸引力。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401081402-cb89fbde-75d9-4441-80b0-213178532baf.png)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401087988-9111c4fb-cbf2-413e-9207-e4f8675d525b.png)



## Web
相比之下 Web 场就比较普通了。像什么新 DevTools，PassKeys，Privacy Sandbox 的都见过了。唯一这个话题比较有意思。

### 提升 Web 用户体验，助力出海业务成长
![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401088046-34574764-ddd2-4b4a-99c8-d0b1b944d0b2.png)

主要是看怎么论述 「Web 用户体验」与「业务成长」的因果性。

主要两个案例，一个是 Cocos，主要是如何跟 Chrome 合作，上了一些例如后渲染管线，WebGPU 一类的高级功能。另外还有提供便捷的让用户在游戏里嵌入广告这些优化。

另一个就比较有意思了。是阿里旗下的 Mirvaia，一个给西班牙消费者的电商平台。

与国内巨型 App 不同。欧洲还是习惯使用 Web。像这类电商 App，Web 流量居然还占 50%+

于是「Web 用户体验」与「业务成长」的因果关系得以论述：

+ 外投类营销页面的转化率要求很高。提高性能可以直接促成营销页面转化率，从而带动业务增长
+ 使用 SSR、View Transition API 等让 Web 得到一个接近于 Native App 的体验，可以缩短下单耗时。减少成交流失率。
+ WebVitals 实时看板、基于 A/B Test 做评估后全量。

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401088228-c5652651-24ed-401d-b783-9e4812cd5ce8.png)



[此处为语雀卡片，点击链接查看](https://www.yuque.com/docs/139072642#omr9L)



### 工作坊： Media Pipe
是一个端上可以跑的机器学习库，有机器视觉、文本、音频等常用算法。这个其实已经公开并且开源了。可以玩。

[https://mediapipe-studio.webapps.google.com/studio/demo/object_detector](https://mediapipe-studio.webapps.google.com/studio/demo/object_detector)

![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401088585-c7103433-bc77-40ef-a4f5-18b1fac8ed79.png)



![](https://cdn.nlark.com/yuque/0/2023/png/84204/1694401086637-f64cd7cd-c3fa-4c70-909b-b7d14dbb700b.png)



## 总结
可能是对 Google 期望太高，Google I/O Connect Shanghai 并没有给我太超出期望的部分。Cloud & AI 很棒。大模型的输出特别稳定，LLM for developers 大家都知道往这个方向做，能做到 Google 这个程度确实不容易。但也仅此而已。没有到「惊为天人」的程度。



对开发者来说，这一套东西确实给得比较舒服。再配合向量数据库，对我们这种想在应用层玩一点东西的同学很友好（甚至比蚂蚁内部还友好。



也给到我一些输入。例如 Duet AI 辅助式开发运维和数据探索的这部分。



