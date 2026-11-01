如果 Agent 只在收到一条指令后完成一次对话，系统的边界很清楚：输入请求，启动一次执行，再返回答案。但有些工作不会随着一次对话结束。Issue、代码评审、CI 结果和团队消息会不断到来；一项工作可能需要多个 Agent 并行推进，也可能要等外部事件后继续。系统不仅要执行任务，还要知道任务属于谁、当前走到哪一步，以及何时把进展和结果交还给人。

这类持续在线、事件驱动、能同时推进多个工作项的系统，可以先拆成两个职责层次：**业务编排层**负责接收事件、判断是否处理、关联工作项、分派任务并通知用户；**Agent 执行层**负责在持久的会话和任务状态上调用模型与工具，让执行能够跨中断继续。dsh-superagent 展示了前一类系统的原型，社区项目 pi-durable 更靠近后一类运行时能力。两者有交集，也不处在同一个抽象层。

## 1. dsh-superagent 是什么

dsh-superagent 是 DeepSeek Harness 上的一套主动式编码 Agent 原型，面向单个 GitHub 仓库，可选接入飞书。获准的请求会成为一个 Ticket；系统为它创建独立的 Agent Session 和工作目录，跟进评论、CI 和评审，再回到原会话交付结果，例如创建 Pull Request。管理面板集中展示需要人处理的工作。

这里需要区分两件事：DeepSeek Harness 团队的《[Super-agent 设计探索：迈向更自主的 Agent 系统](https://mp.weixin.qq.com/s/zoS7GlReWPhfCjENGxXCdg)》描述的是更广的架构设想；dsh-superagent 仓库是其中部分思路的公开参考实现。仓库明确说明，它不是正式产品，也与文章中的完整设计不完全相同。[项目 README](https://github.com/deepseek-ai/dsh-superagent-prototype#readme)

文章设想的系统以常驻 Router 接收多个渠道的事件，判断它们与哪些工作相关，再把任务交给上下文隔离的 Worker 并行处理。Worker 不直接向人回复，而是把进度和结果交还 Router。Thread 订阅、上下文召回、异步工具执行、计算与状态分离、Watchdog 等设计，分别支持后续事件跟进、跨会话找回信息、长任务运行和故障监控。

## 2. dsh-superagent 要解决什么问题

它关注的瓶颈不是 Agent 能不能完成一项复杂任务，而是团队能同时推进多少项工作。任务一多，人就要在不同会话间切换，记住各自的上下文，判断哪些消息需要响应，并持续跟踪进度。人的注意力开始限制 Agent 系统的总吞吐。

Super-agent 的做法，是把任务之间的协调交给常驻系统：外部消息成为事件，Router 判断是否受理和如何分派，Worker 分头执行；只有结果可用、需要决策或工作受阻时，才把注意力交还给人。它更像团队的任务调度与交付层，不是单纯增强一个 Agent 的代码推理能力。

文章用合成消息流做了初步调度实验：每轮约 300 条群聊和 CI 消息，其中约 20 条是工作请求；编码过程由一个只模拟耗时的工具代替。Super-agent 的任务完成中位耗时为 12.4 分钟，p95 为 15.7 分钟；中性提示下的单会话加子代理方案分别为 20.4 和 29.5 分钟。前者读取的缓存 Token 更多。这个结果说明 Router/Worker 的分工值得继续验证，但实验没有测真实代码质量，每种设置也只运行五次，不能据此判断真实研发一定更快或更省钱。[实验报道](https://m.ithome.com/html/1020615.htm)

## 3. 从 dsh-superagent 的持久化需求看到 pi-durable

dsh-superagent 不只是接收请求、启动 Worker。它还要记住一项工作目前走到哪里、重启后如何接着推进，以及完成后怎样把结果送回原来的业务流程。做到这一点，既需要保存 Ticket、Assignment 和 Outbox 等业务状态，也需要依赖 DeepSeek Harness 保存 Agent Session。

社区中的 pi-durable 也在关注这类持久化与连续性问题，但它把重点放在 Agent Runtime：Conversation 保存交互条目，Submission 表示交给会话处理的输入，Task 保存可恢复的任务状态；会话条目、Document 和 Task 状态可以进入统一提交流，Task 在阶段边界保存 checkpoint。进程重启后，运行时从已提交的阶段继续，而不是恢复任意 JavaScript 调用栈。[pi-durable v1.4.0 README](https://github.com/earendil-works/pi/blob/v1.4.0/packages/durable/README.md)

pi-durable 也不局限于一个会话：它提供多个 Conversation、子任务、所有权关系、任务图、存储适配和工具重放等运行时能力。应用开发者可以用它构建长时间运行、可从中断中恢复的 Agent 产品。事件源接入、业务工作流、授权、审批和用户通知仍由宿主应用组织；pi-durable 目前标注为实验性，API 可能随版本变化。

## 4. 两者的交集与分工

两者共同关心三件事：状态能否持久保存，任务能否跨中断延续，执行结果能否回到发起或管理这项工作的上层。交集在「持久执行」这类需求，差异在它们把状态放在哪一层、围绕什么对象组织。

| | dsh-superagent | pi-durable |
| --- | --- | --- |
| 主要职责 | 业务任务的接收、关联、派工和交付 | Agent 会话与任务的持久执行和恢复 |
| 核心对象 | Ticket、Assignment、业务事件 | Conversation、Submission、Task、Document |
| 持久化关注点 | 业务流程现在是什么状态 | 这段执行提交到哪个阶段 |
| 面向的使用者 | 需要管理多项团队工作的应用或服务 | 需要恢复能力的 Agent Runtime / 宿主应用 |

<img src="../assets/images/dsh-superagent-pi-durable-overlap.png" alt="dsh-superagent 与 pi-durable 的能力交集和职责边界" loading="lazy" />

图 1　共同关注的是状态持久化、执行连续性和结果衔接；Super-agent 侧重业务任务的进入与流转，pi-durable 侧重会话和任务的提交与恢复。

恢复方式体现了这种分工。dsh-superagent 在重启时结束正在执行的 Assignment，为原 Ticket 重新派工，并提示 Worker 先检查工作目录、Git 和 GitHub 状态。pi-durable 则从已提交的 Task phase checkpoint 恢复；工具调用意图先持久化，只有符合 replay-safe 条件的调用才自动重放。[DSH 执行与恢复](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/6337fc823ce20251c8de8085948165c81aaa701e/docs/003-execution.md) · [pi 工具重放规则](https://github.com/earendil-works/pi/blob/v1.4.0/packages/durable/README.md)

因此，pi-durable 可以承接一部分上层 Agent 应用的持久执行，但不会自动接管 dsh-superagent 的事件受理、跨会话任务关联、授权和业务通知。反过来，dsh-superagent 的业务状态机也不等同于通用的 Task checkpoint 运行时。两者有交集，可以分层结合，不能直接互换。

## 5. 适用场景与结合方式

| 需求 | 更接近的选择 |
| --- | --- |
| 围绕一个 GitHub 仓库接收 Issue、PR、评审和 CI，按团队规则派工并交付 | dsh-superagent 原型提供较完整的业务流程参考 |
| 已有自己的入口、权限和工单模型，需要会话、Task 和工具调用持久化并支持重启恢复 | pi-durable 提供运行时能力 |
| 多渠道事件驱动、多工作项并发，同时要求执行状态可恢复 | 可以组合业务编排层与 pi-durable，但需要自行实现适配层 |

一种可能的组合是：业务层先接收事件并完成准入，建立 Ticket 和 Assignment；适配器再把获准的工作提交为 pi-durable 的 Conversation 输入或 Task；执行结果返回业务层，更新 Ticket 并由 Outbox 通知原渠道。

<img src="../assets/images/dsh-pi-durable-architecture.png" alt="业务编排层和 Agent 执行层的分工与集成路径" loading="lazy" />

图 2　概念集成示意，不是两个项目现成的产品功能。业务层接收和派工，适配器提交与回传，宿主应用定义权限映射和外部副作用语义。

集成时需要明确 Ticket 与 Task 的映射、两边的状态归属、取消与恢复规则，以及外部副作用的幂等和回执。若要多实例部署，还需自行定义调度、存储 owner 和故障转移方式。

## 参考资料

- DeepSeek Harness 团队，[《Super-agent 设计探索：迈向更自主的 Agent 系统》](https://mp.weixin.qq.com/s/zoS7GlReWPhfCjENGxXCdg)
- [dsh-superagent-prototype README](https://github.com/deepseek-ai/dsh-superagent-prototype#readme) 与 [Execution 文档](https://github.com/deepseek-ai/dsh-superagent-prototype/blob/6337fc823ce20251c8de8085948165c81aaa701e/docs/003-execution.md)
- [pi-durable v1.4.0 README](https://github.com/earendil-works/pi/blob/v1.4.0/packages/durable/README.md)
