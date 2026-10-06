:::info
**结论：作为普遍规律，它是伪命题；作为有前提的成本优化策略，它成立。**

现有研究支持按任务瓶颈分配模型能力。部分任务由 Planning 主导，部分任务由 Execution 主导。强 Planner 与弱 Executor 的组合，需要同时满足计划可执行、执行认知负担有限、外部反馈充分三个条件。

:::

> 整理时间：2026-07-28。本文以论文和研究数据为主，梳理讨论历史、正反证据与后续研究问题。
>

## 缘起和发展
### 这场讨论从什么时候开始
规划器与执行器的分工长期存在于经典 AI、机器人和软件工程中。LLM Agent 领域的集中讨论形成于 **2022—2023 年**。这一时期，模型开始调用搜索、浏览器、代码解释器和外部模型，系统设计随之需要处理规划、执行与反馈之间的关系。

| **时间** | **代表工作** | **讨论推进** |
| --- | --- | --- |
| 2022-10 | [ReAct](https://arxiv.org/abs/2210.03629) | 将 Reasoning 与 Acting 放在同一反馈循环中。模型根据环境观察持续更新计划，形成早期 Agent 范式。 |
| 2023-03 | [HuggingGPT](https://arxiv.org/abs/2303.17580) | ChatGPT 充当 Controller，负责拆解任务、选择 Hugging Face 专家模型、调度执行并汇总结果。这是「强通用模型规划，专用模型执行」的早期原型。 |
| 2023-05 | [Plan-and-Solve](https://arxiv.org/abs/2305.04091)、[LangChain Plan-and-Execute](https://www.blog.langchain.com/plan-and-execute-agents/)、[ReWOO](https://arxiv.org/abs/2305.18323) | Plan-and-Solve 提出先拆分子任务再求解；LangChain 将其工程化为独立 Planner 和 Executor；ReWOO 将推理与工具观察解耦，以降低重复调用和 Token 成本。 |
| 2023-12 | [LLMCompiler](https://arxiv.org/abs/2312.04511) | 系统由 Function Calling Planner、任务分发单元和并行 Executor 组成。相对 ReAct，论文报告最高 3.7× 延迟改善、6.7× 成本节省和约 9% 准确率提升。 |
| 2024 | [ADAPT](https://aclanthology.org/2024.naacl-long.264/)、[From Grounding to Planning](https://arxiv.org/abs/2409.01927) | 研究开始拆分 Planning 与 Execution、Grounding 等能力，并评估不同 Planner–Executor 组合的实际影响。 |
| 2025—2026 | [Plan-and-Act](https://arxiv.org/abs/2503.09572)、[PEAR](https://aclanthology.org/2026.findings-eacl.237/)、[Planner Matters!](https://arxiv.org/abs/2605.02168)、[AgentCARD](https://arxiv.org/abs/2606.20629) | 研究开始系统交换 Planner 与 Executor 的模型、规模和部署方式，直接评估算力分配对成本和准确率的影响。 |


### 为什么「强 Plan、弱 Execute」会流行
规划通常只调用几次，执行可能调用几十甚至几百次。昂贵模型负责低频决策，廉价模型负责高频动作，可以降低总体推理成本。

这种设计依赖四个前提：

1. 任务可以被完整地预先分解；
2. 每一步都足够原子化、明确且可执行；
3. Executor 只需要有限的补充推理和策略调整；
4. 环境、测试或验证器能够及时发现执行错误。

这些前提的成立程度决定了系统是否适合采用模型分层。

## 正方观点
正方观点认为，Planning 是主要瓶颈。更强模型和更多算力应集中给 Planner，执行阶段可以使用较弱模型、专用工具或确定性程序。

### 1. 方向错误会限制整个系统
Planner 决定目标拆解、工具选择、步骤依赖和终止条件。错误的任务分解会限制 Executor 的有效动作空间。

[PEAR](https://aclanthology.org/2026.findings-eacl.237/) 在 GPT、Gemini、Claude 和 DeepSeek 的不同规模组合中发现：

+ 弱 Planner 对总体性能的影响通常大于弱 Executor；
+ Gemini 2.0 Flash 做 Planner 时，即使搭配 Gemini 2.5 Pro Executor，效用仍约为 30%；
+ GPT-5 Nano 做 Planner 时，更强 Executor 也难以完全补偿；
+ Planner 获得记忆后可带来约 12%—30% 的提升，只给 Executor 增加记忆的收益有限。

### 2. 长程任务的关键决策集中在规划阶段
[Planner Matters!](https://arxiv.org/abs/2605.02168) 将系统拆成 Planner、Actor 和 Memory Manager，并在网页导航、操作系统控制与工具使用任务中进行评估。研究认为 Planning 是主导因素；Actor 和 Memory Manager 使用较少模型容量仍可保持竞争力；只优化 Planner、冻结其他组件，也能取得稳定改进。

### 3. 强 Planner 可以改善较弱 Executor 的表现
[ADAPT](https://aclanthology.org/2024.naacl-long.264/) 支持按需递归拆解任务，并实测不同 Planner/Executor 组合：

+ LLaMA-2-70B 单独执行成功率为 20.4%，加入 GPT-3.5 Planner 后达到 43.3%；
+ GPT-3.5 单独执行为 38.4%，加入 Planner 后达到 58.3%。

这些结果直接支持「强模型低频规划、相对便宜模型高频执行」的资源分配方式。

### 4. 可编程计划可以交给确定性运行时
[Web Agents Should Adopt the Plan-Then-Execute Paradigm](https://arxiv.org/abs/2605.14290) 分析 WebArena 后认为，全部任务都与 Plan-then-Execute 兼容，其中 80% 可以用纯程序化计划完成，无需运行时 LLM 子程序。

工具能够映射成语义清晰、效果可预测的动作时，确定性运行时可以承担执行阶段。

### 正方观点的适用条件
+ 工具接口稳定，动作语义和副作用已知；
+ 计划能写成具体步骤、DAG 或可执行程序；
+ 子任务边界清晰，Executor 只需有限的目标解释；
+ 环境变化有限，或者变化可以通过显式错误返回给 Planner；
+ 每一步有明确验收条件，失败可以重试或回滚。

## 反方观点
反方观点强调任务差异和执行复杂度。将最强模型固定用于 Planner、普遍降低 Executor 能力的配置，目前缺少跨领域证据。

### 1. 瓶颈具有领域相关性
本轮讨论的重要来源是 [AgentCARD：Specialize Roles, Mix Deployments](https://arxiv.org/abs/2606.20629)，发布于 2026-05-28。

它在工具使用、金融、医疗、数学和软件工程五类任务中交叉测试模型角色，得到三个关键结论：

+ 部分领域受 Planner 限制，部分领域受 Executor 限制；
+ 同一对模型交换角色，准确率最多可下降 36%；
+ 合理的异构组合，相比同成本同构组合最多提升 44%，或以最高 12× 更低成本达到最强同构团队的相近准确率。

医疗任务更依赖 Planner；金融、数学和开放工具调用任务更容易受到 Executor 能力制约。软件工程表现出明显的模型—角色适配，模型综合排名无法稳定预测具体角色表现。

### 2. 低阶执行包含多种认知任务
[Why Do LLM-based Web Agents Fail? A Hierarchical Planning Perspective](https://aclanthology.org/2026.acl-long.1483/) 将 Web Agent 分为高阶规划、低阶执行和重新规划。论文发现 PDDL 计划比自然语言计划更简洁、目标更明确，低阶执行仍是主要瓶颈。

Executor 需要完成：

+ 识别当前页面或环境状态；
+ 将抽象目标转换为具体元素、参数和动作；
+ 判断动作是否真正生效；
+ 处理弹窗、重渲染、工具错误和中间状态；
+ 在环境与计划不一致时恢复。

### 3. 正确策略仍可能出现执行错误
[SciTaRC](https://arxiv.org/abs/2603.08910) 在科学表格问答中发现，即使给出正确策略，当前模型仍会在复杂计算和步骤执行中失败，形成普遍的 execution bottleneck。数学、代码和数据任务中的执行阶段包含实质性推理。

### 4. 静态计划会损失环境反馈
ReAct 将 Reasoning 与 Acting 交错，以便根据每次执行结果调整后续决策。一次性规划后再连续执行，容易产生以下问题：

+ 计划依据的状态已经变化；
+ 中间失败没有及时返回 Planner；
+ Executor 需要自行补充计划空白；
+ Planner 与 Executor 之间发生上下文压缩和语义损失；
+ 早期错误影响后续步骤。

Agent 系统通常采用 **Plan → Execute → Observe → Verify → Replan** 的循环。

## 结论和研究
### 当前结论
:::success
**「强模型负责规划、弱模型负责执行」无法成为通用规律。**

它描述了一类有效的成本配置：Planner 是主要瓶颈，计划足够具体，Executor 的任务接近确定性执行，环境能够及时暴露错误。条件变化后，最优模型分配也会变化。

:::

正方研究证明了 Planning 的杠杆效应：错误分解会限制全部后续动作，强 Planner 能显著提高部分弱 Executor 的成功率，可编程计划还能交给确定性运行时。

反方研究确定了这套方法的边界：任务瓶颈具有领域差异；低阶执行包含状态识别、动作落地、错误判断和恢复；同一对模型交换角色，结果可能出现显著差距。模型的综合能力排名也无法稳定预测角色表现。

因此，标题中的命题需要拆成两个层次：

1. **作为普遍方法论**：它是伪命题。现有证据无法支持「规划总比执行重要」或「Executor 可以普遍降级」。
2. **作为条件化工程策略**：它成立。在 Planner 主导、计划可执行、执行负担较低且验证充分的任务中，强弱模型分层可以改善成本与效果。

### 编程任务中的判断
编程任务中的 Executor 需要完成代码定位、跨文件修改、测试解释和错误恢复。执行阶段包含实质性推理。弱模型能否承担 Executor，需要通过代码任务的端到端评测确认。测试、静态检查和补丁验证可以提供外部验证信号；模型分配仍需依据 Planner 与 Executor 的角色表现。

### 仍值得继续研究的问题
+ **角色瓶颈如何识别**：如何用统一指标区分 Planning、Execution、Grounding 和恢复能力造成的失败？
+ **角色能力能否迁移**：一个模型在某类任务中适合当 Executor，这一结论能否迁移到其他任务？
+ **计划如何衡量可执行性**：如何识别缺失参数、隐含依赖和超出 Executor 能力的步骤？
+ **模型如何动态路由**：如何根据任务难度、执行反馈和历史失败调整 Planner 与 Executor？
+ **总体成本如何计算**：如何统一统计 Token、延迟、重试、返工和人工审查？

### 最终判断
> **「强模型 Plan，弱模型 Execute」作为无条件方法论，是伪命题；作为经过角色评测后采用的局部优化策略，有效。**
>

研究和工程评估的核心问题是：**在特定任务和执行环境下，哪个角色构成当前的边际瓶颈？**
