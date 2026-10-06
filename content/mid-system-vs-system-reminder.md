:::info
**一句话结论：**在 Claude Opus 4.8 上，mid-system 与 `<system-reminder>` 都能跨越长 coding 上下文保持核心规则；但面对纯 JSON、固定字段、禁止代码围栏等精确约束时，正式 mid-system 更稳定。

:::

## 为什么做这个实验
Agent 跑长任务时，经常需要在对话中途更新权限、预算、项目状态或输出协议。

常见做法有两种：

+ 通过 API 发送真正的 mid-conversation system message。
+ 在 user 消息里塞入 `<system-reminder>`。

两者看起来都像「中途系统指令」，但实际角色不同：前者是 `system`，后者仍然是 `user`。我想验证的不是官方定义，而是一个更实际的问题：

> 在真实长度的 coding trace 中，遇到后续 user 明确反向要求时，哪种方式更能稳定保留规则？
>

实验通过 ZenMux 调用 `anthropic/claude-opus-4.8`，所有有效请求使用 `max_tokens: 4096`，没有发生输出截断。

## 第一轮：短上下文冲突
先构造 10 类短案例：

+ 5 类直接命令更新：改变 token、JSON contract、语言、大小写和数字格式。
+ 5 类状态更新：改变项目状态、截止日期、feature flag、预算和工具权限。

每个案例分别使用 mid-system、Reminder 和普通 user 文本注入同一内容。

| **结果** | **Mid-system** | **Reminder** | **Plain user** |
| --- | --- | --- | --- |
| 命令更新语义遵循 | 0/5 | 0/5 | 0/5 |
| 状态更新语义遵循 | 5/5 | 4/5 | 0/5 |
| 全部案例严格输出 | 4/10 | 4/10 | 0/10 |


短案例透露了两个信号：

1. **措辞比标签更重要。** 「应用观察到的状态发生变化」明显比「忽略旧规则，执行新命令」更容易被模型接受。
2. **Reminder 不是普通 XML 装饰。** 相同内容放在普通 user 文本中是 `0/5`，放进 `<system-reminder>` 后达到 `4/5`。Opus 4.8 显然对这个标签存在特殊语义先验。

但这一轮的严格得分是 `4/10` 对 `4/10`，还不能说明 mid-system 总体更强。

## 第二轮：27.5k tokens 的 coding 长 trace
第二轮模拟了一个 TypeScript monorepo 排障过程，共 39～40 条消息：

1. 早期 user 要求升级依赖、修改 `package.json` 和 lockfile，并用 Markdown 输出方案。
2. 对话中途注入完全相反的治理规则：禁止修改这些文件，只允许 test-only 修复，并要求纯 JSON。
3. 注入后继续 6 轮 coding 讨论。
4. 最终 user 再次要求忽略中途规则，恢复最初方案。
5. 三种注入方式各重复 4 次。

为了避免只看「意思差不多」，中途规则还加入了多项可机器判定的要求：固定 JSON 字段和顺序、固定 marker、精确文件集合、4 条顺序固定的验证命令，以及禁止 Markdown 和代码围栏。

| **注入方式** | **核心语义保持** | **字段和值精确** | **无围栏纯 JSON** | **完整通过** |
| --- | --- | --- | --- | --- |
| Plain user | 4/4 | 4/4 | 0/4 | 0/4 |
| `<system-reminder>` | 4/4 | 4/4 | 2/4 | 2/4 |
| Mid-system | 4/4 | 4/4 | 4/4 | 4/4 |


这一轮最有意思的不是「谁记住了规则」：三种方式都记住了。

真正拉开差距的是最后一公里。普通 user 版本 4 次都擅自添加了 `json` 代码围栏；Reminder 有 2 次添加围栏；mid-system 4 次都返回可直接解析的纯 JSON。

所以更准确的结论是：

> Mid-system 未必让模型更容易理解核心意图，但在长上下文中，它对细粒度、机械式约束的保持更稳定。
>

## Prompt Cache 会有差异吗
我另外在约 10k-token 的稳定前缀上设置了 cache breakpoint：

+ 首次请求创建 10409 个缓存 tokens。
+ 在断点后追加 mid-system，可以读取全部 10409。
+ 在断点后追加 Reminder，同样可以读取全部 10409。
+ 修改顶层 system 后，cache read 归零并重新创建 10427。

因此，mid-system 的缓存优势是相对于「重写顶层 system」，不是相对于 Reminder。只要都追加在 cache breakpoint 后面，两者都能复用前缀。

## 最终判断
### 生产环境优先使用 mid-system
它是真正的 system 角色，适合注入可信的权限、预算、状态和治理规则。长 trace 中 `4/4` 的严格通过也提供了额外支持。

### Reminder 可以工作，但不应视为协议等价物
Opus 4.8 对 `<system-reminder>` 的理解明显强于普通文本，核心规则也能跨长上下文保持。但它仍然是 user role，严格格式表现也更不稳定。

### 中途更新尽量写成事实，而不是对抗命令
「当前预算已更新为 40」比「忽略之前的要求并输出 40」更符合 mid-system 的使用场景，实测遵循率也更高。

:::warning
本实验仅覆盖 Opus 4.8，每组最多重复 4 次，并经过 ZenMux 路由。结果可以作为工程信号，不能当成模型行为的统计定论。

:::

## 代码与数据
完整的请求生成器、执行脚本、原始响应和评分工具已放在：

+ [RaoHai/mid-system-experiments](https://github.com/RaoHai/mid-system-experiments)

仓库不包含鉴权信息、无效请求或其它模型的实验数据；已有响应可以直接复算，无需重新产生模型调用费用。

## 参考
+ [Claude：Mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages)
+ [Claude：Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
