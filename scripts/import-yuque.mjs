import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

marked.setOptions({ smartypants: false });

const root = process.cwd();
const publicDir = path.join(root, "public");
const postsDir = path.join(publicDir, "posts");
const imagesDir = path.join(publicDir, "assets", "images");
const bookId = 485843;

const posts = [
  {
    slug: "meta-harness-agent-self-composition",
    title: "DeepSeek Harness：从自反到元 Harness",
    created_at: "2026-08-15T00:00:00+08:00",
    fallback: "从 PL 里的 reflection、effect/coeffect 与 spatiotemporal composability 出发，重新理解 DeepSeek Harness 和 Agent runtime 的自反边界。",
    manualFile: "content/meta-harness-agent-self-composition.md",
  },
  {
    slug: "deepseek-v4-flash-harness",
    title: "DeepSeek-V4-Flash Agent Trace：从模型对比到 Harness 调优",
    created_at: "2026-08-04T00:00:00+08:00",
    fallback: "基于五类办公 Agent 任务 trace，对比 DeepSeek-V4-Flash 与 Claude Opus 4.8，并复盘 Harness 调优后的收敛效果。",
    manualFile: "content/deepseek-v4-flash-harness.md",
  },
  {
    slug: "tokenmaxxing-steam-engine",
    title: "Tokenmaxxing：当 AI 烧钱变成一场没有人敢停的军备竞赛",
    created_at: "2026-05-14T00:00:00+08:00",
    fallback: "从 Gary Tan、Claudeonomics 到 AI 使用文化，聊 Tokenmaxxing 如何改变工程师和组织。",
    manualFile: "content/tokenmaxxing-steam-engine.md",
  },
  {
    slug: "mid-system-vs-system-reminder",
    title: "Mid-system vs <system-reminder>",
    created_at: "2026-07-23T14:09:00+08:00",
    fallback: "在 Claude Opus 4.8 上比较 mid-system 与 <system-reminder> 在长 coding 上下文中的规则保持能力。",
    manualFile: "content/mid-system-vs-system-reminder.md",
  },
  {
    slug: "strong-planner-weak-executor",
    title: "强模型负责规划、弱模型负责执行，是伪命题吗？",
    created_at: "2026-07-28T00:00:00.000Z",
    fallback: "作为普遍规律，它是伪命题；作为有前提的成本优化策略，它成立。",
    manualFile: "content/strong-planner-weak-executor.md",
  },
  {
    slug: "ag-ui-live-share-2025",
    title: "A Quick Exploration of AG-UI",
    created_at: "2025-07-04T00:00:00.000Z",
    fallback: "AG-UI 的介绍和一些思考与实践，讨论 Agent 时代 UI 和前端该何去何从。",
    manualFile: "content/ag-ui-live-share.md",
  },
  {
    slug: "waic-2025",
    title: "WAIC 2025 摸鱼式逛展纪",
    created_at: "2025-07-31T00:00:00.000Z",
    fallback: "从机器人、具身智能、Agent 与 AI Coding 的视角，摸鱼式记录一次 WAIC 2025 逛展观察。",
    manualFile: "content/waic-2025.md",
  },
  {
    slug: "google-io-connect-shanghai-2025",
    title: "2025 Google I/O Connect Shanghai 总结：教练，我想做 Agent",
    created_at: "2025-08-08T00:00:00.000Z",
    fallback: "时隔两年再访 Google 开发者大会，聊 Gemini、Gemma、Agent、Web 与 Google 开发者生态。",
    manualFile: "content/google-io-connect-shanghai-2025.md",
  },
  {
    slug: "mcp-yuyan-2025",
    title: "给工程同学讲 MCP",
    created_at: "2025-03-27T00:00:00.000Z",
    fallback: "从信息孤岛、RAG、插件和 Function Call 谈起，整理 MCP 的价值以及它和雨燕的关系。",
    manualFile: "content/mcp-yuyan.md",
  },
  {
    slug: "glh83gd3fsd6rw78",
    title: "How to Deploy an OpenAI Streaming API on AWS Lambda Using Python.",
    created_at: "2024-04-09T00:00:00.000Z",
    manualContent: `
<p>This example shows streaming response from OpenAI completions with FastAPI on AWS Lambda.</p>
<p>Demo: <a href="https://github.com/RaoHai/aws-lambda-response-streaming">https://github.com/RaoHai/aws-lambda-response-streaming</a></p>
<p>Credit to <a href="https://github.com/awslabs/aws-lambda-web-adapter">aws-lambda-web-adapter</a></p>
<figure><img src="https://cdn.nlark.com/yuque/0/2024/png/84204/1712660214701-d812d5ec-831c-41a2-ad03-49ae7a98baf1.png" width="3120" alt="Architecture diagram" loading="lazy" /></figure>
<h2>How does it work?</h2>
<p>This example uses FastAPI provides inference API. The inference API endpoint invokes OpenAI, and streams the response. Both Lambda Web Adapter and function URL have response streaming mode enabled. So the response from OpenAI are streamed all the way back to the client.</p>
<p>This function is packaged as a Docker image. Here is the content of the Dockerfile.</p>
<pre><code class="language-dockerfile">FROM public.ecr.aws/docker/library/python:3.12.0-slim-bullseye

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter

# Copy function code
COPY . \${LAMBDA_TASK_ROOT}
# from your project folder.
COPY requirements.txt .
RUN pip3 install -r requirements.txt --target "\${LAMBDA_TASK_ROOT}" -U --no-cache-dir

CMD ["python", "main.py"]</code></pre>
<p>Notice that we only need to add the second line to install Lambda Web Adapter.</p>
<pre><code class="language-dockerfile">COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/</code></pre>
<p>In the SAM template, we use an environment variable <code>AWS_LWA_INVOKE_MODE: RESPONSE_STREAM</code> to configure Lambda Web Adapter in response streaming mode. And adding a function url with <code>InvokeMode: RESPONSE_STREAM</code>.</p>
<pre><code class="language-yaml">  FastAPIFunction:
    Type: AWS::Serverless::Function
    Properties:
      PackageType: Image
      MemorySize: 512
      Environment:
        Variables:
          AWS_LWA_INVOKE_MODE: RESPONSE_STREAM
      FunctionUrlConfig:
        AuthType: NONE
        InvokeMode: RESPONSE_STREAM
      Policies:
      - Statement:
        - Sid: BedrockInvokePolicy
          Effect: Allow
          Action:
          - bedrock:InvokeModelWithResponseStream
          Resource: '*'</code></pre>
<h2>Build and deploy</h2>
<p>Run the following commends to build and deploy this example.</p>
<pre><code class="language-bash">sam build --use-container
sam deploy --guided</code></pre>
<h2>Test the example</h2>
<p>After the deployment completes, curl the <code>FastAPIFunctionUrl</code>.</p>
<pre><code class="language-bash">curl -v -N --location '\${{FastAPIFunctionUrl}}/api/chat/stream' \\
--header 'Content-Type: application/json' \\
--header 'Transfer-Encoding: chunked' \\
--data '{"messages":[{"role":"user","content":"Count to 100, with a comma between each number and no newlines. E.g., 1, 2, 3, ..."}],"prompt":""}'</code></pre>
<figure><img src="https://cdn.nlark.com/yuque/0/2024/gif/84204/1712660221612-896ff1df-c4d5-4259-b60b-fe18113cd572.gif" width="1256" alt="Streaming response demo" loading="lazy" /></figure>
`,
    fallback: "关于在 AWS Lambda 上部署 OpenAI 流式 API 的工程实践。",
    locked: true,
  },
  {
    slug: "lbtio5z9p8gssn26",
    title: "2023 Google I/O Connect Shanghai 参会总结：云，AI 与 Web",
  },
  {
    slug: "za1pom",
    title: "[个人向] Google State of DevOps Reports 2022 解读",
  },
  { slug: "dpbum7", title: "在没有 SourceMap 的情况下反解源码" },
  { slug: "bs9tzt", title: "为自己的团队定制 CSS 框架" },
  {
    slug: "hga8n6",
    title: "How I Built A Self-Updating README by Webhooks and Netlify Functions.",
  },
  { slug: "erq3gp", title: "Webpack 模块构建时长分析及可视化" },
  {
    slug: "qqi7hq",
    title: "使用语雀 Webhooks 和 Netlify Functions 自动同步生成 Github Profile README",
  },
  { slug: "kr0rc3", title: "时间、时区与时区信息数据库" },
];

function normalizeChineseQuotes(value = "") {
  return String(value).replace(/“/g, "「").replace(/”/g, "」");
}

function escapeHtml(value = "") {
  return normalizeChineseQuotes(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDate(value, includeTime = false) {
  if (!value) return "";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}),
  };
  return new Intl.DateTimeFormat("zh-CN", options).format(new Date(value)).replaceAll("/", "-");
}

function cardData(tag) {
  const match = tag.match(/\bvalue="([^"]*)"/);
  if (!match) return {};
  const raw = match[1].replace(/^data:/, "");
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return {};
  }
}

function renderCard(tag) {
  const name = tag.match(/\bname="([^"]+)"/)?.[1] || "card";
  const data = cardData(tag);

  if (name === "image" && data.src) {
    const alt = escapeHtml(data.name || data.alt || "");
    const width = data.width ? ` width="${escapeHtml(data.width)}"` : "";
    const height = data.height ? ` height="${escapeHtml(data.height)}"` : "";
    const localSrc = imageMap.get(data.src) || data.src;
    return `<figure><img src="${escapeHtml(localSrc)}" alt="${alt}"${width}${height} loading="lazy" /></figure>`;
  }

  if (name === "codeblock") {
    const mode = data.mode ? ` class="language-${escapeHtml(data.mode)}"` : "";
    return `<pre><code${mode}>${escapeHtml(data.code || "")}</code></pre>`;
  }

  if (name === "table" && data.html) {
    let html = data.html;
    try {
      html = decodeURIComponent(data.html);
    } catch {
      html = data.html;
    }
    return `<div class="table-wrap">${cleanLakeHtml(html)}</div>`;
  }

  if (name === "hr") {
    return "<hr />";
  }

  if (name === "bookmarkInline" && data.href) {
    return `<a href="${escapeHtml(data.href)}">${escapeHtml(data.title || data.href)}</a>`;
  }

  if (name === "file" && data.url) {
    return `<p><a href="${escapeHtml(data.url)}">${escapeHtml(data.name || "附件")}</a></p>`;
  }

  if (name === "video" && data.src) {
    return `<video controls src="${escapeHtml(data.src)}"></video>`;
  }

  return `<p class="unsupported-card">此处原文包含 ${escapeHtml(name)} 内容。</p>`;
}

function cleanLakeHtml(content = "") {
  return content
    .replace(/“/g, "「")
    .replace(/”/g, "」")
    .replace(/^<!doctype lake>/i, "")
    .replace(/<meta\b[^>]*>/gi, "")
    .replace(/<cursor\b[^>]*><\/cursor>/gi, "")
    .replace(/<card\b[^>]*>/gi, renderCard)
    .replace(/<\/card>/gi, "")
    .replace(/\sdata-lake-id="[^"]*"/gi, "")
    .replace(/\sid="u[a-f0-9]{6,}"/gi, "")
    .replace(/\sclass="lake-fontsize-[^"]*"/gi, "")
    .replace(/<p[^>]*>\s*(<br\s*\/?>)?\s*<\/p>/gi, "");
}

function cleanManualMarkdown(content = "") {
  return content
    .replace(/^\uFEFF/, "")
    .replace(/“/g, "「")
    .replace(/”/g, "」")
    .replace(/^:::color2\s*/m, "")
    .replace(/^:::info\s*\n([\s\S]*?)\n:::/gm, '<div class="callout callout-info">\n\n$1\n\n</div>')
    .replace(/^:::warning\s*\n([\s\S]*?)\n:::/gm, '<div class="callout callout-warning">\n\n$1\n\n</div>')
    .replace(/^:::success\s*\n([\s\S]*?)\n:::/gm, '<div class="callout callout-success">\n\n$1\n\n</div>')
    .replace(/^:::\s*$/gm, "")
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/~~([\s\S]*?)~~/g, "<del>$1</del>")
    .replace(/<font\b[^>]*>/gi, "")
    .replace(/<\/font>/gi, "");
}

function wrapTables(html = "") {
  return html.replace(/<table>([\s\S]*?)<\/table>/gi, '<div class="table-wrap">$&</div>');
}

function plainTextFromHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function withArticleToc(html = "") {
  const headings = [];
  let index = 0;
  const body = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const text = plainTextFromHtml(inner);
    if (!text) return match;
    index += 1;
    const id = `section-${index}`;
    headings.push({ id, level: Number(level), text });
    const cleanAttrs = attrs.replace(/\s+id="[^"]*"/i, "");
    return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
  });

  const tocHeadings = headings.filter((heading) => heading.level === 2);

  if (tocHeadings.length < 4) {
    return { body, toc: "" };
  }

  const toc = `<aside class="article-toc" aria-label="章节目录">
        <p>目录</p>
        <nav>
          ${tocHeadings
            .map(
              (heading) =>
                `<a class="toc-depth-${heading.level}" href="#${heading.id}">${escapeHtml(heading.text)}</a>`,
            )
            .join("\n          ")}
        </nav>
      </aside>`;

  return { body, toc };
}

const imageMap = new Map();

function imageExtension(url, contentType = "") {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"].includes(ext)) return ext;
  if (contentType.includes("jpeg")) return ".jpg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("svg")) return ".svg";
  return ".img";
}

async function downloadImagesFor(post, content = "") {
  const urls = [];
  for (const match of content.matchAll(/<card\b[^>]*\bname="image"[^>]*>/gi)) {
    const data = cardData(match[0]);
    if (data.src && /^https?:\/\//.test(data.src)) urls.push(data.src);
  }

  const uniqueUrls = [...new Set(urls)];
  for (const [index, url] of uniqueUrls.entries()) {
    try {
      const response = await fetch(url, {
        headers: {
          referer: `https://www.yuque.com/luchen/buzhou/${post.slug}`,
          "user-agent": "Mozilla/5.0",
        },
      });
      if (!response.ok) {
        console.warn(`image skipped ${response.status} ${url}`);
        continue;
      }

      const ext = imageExtension(url, response.headers.get("content-type") || "");
      const filename = `${post.slug}-${String(index + 1).padStart(2, "0")}${ext}`;
      const filePath = path.join(imagesDir, filename);
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      imageMap.set(url, `../assets/images/${filename}`);
    } catch (error) {
      console.warn(`image skipped ${url}: ${error.message}`);
    }
  }
}

async function localizePlainImages(post, html = "") {
  let result = html;
  const urls = [
    ...new Set([...html.matchAll(/<img\b[^>]*\bsrc="(https?:\/\/[^"]+)"/gi)].map((match) => match[1])),
  ];

  for (const [index, url] of urls.entries()) {
    if (!imageMap.has(url)) {
      try {
        const response = await fetch(url, {
          headers: {
            referer: `https://www.yuque.com/luchen/buzhou/${post.slug}`,
            "user-agent": "Mozilla/5.0",
          },
        });
        if (!response.ok) continue;
        const ext = imageExtension(url, response.headers.get("content-type") || "");
        const filename = `${post.slug}-extra-${String(index + 1).padStart(2, "0")}${ext}`;
        await fs.writeFile(path.join(imagesDir, filename), Buffer.from(await response.arrayBuffer()));
        imageMap.set(url, `../assets/images/${filename}`);
      } catch (error) {
        console.warn(`image skipped ${url}: ${error.message}`);
      }
    }
    result = result.replaceAll(url, imageMap.get(url));
  }

  return normalizeChineseQuotes(result);
}

function layout({ title, description, date, body }) {
  const article = withArticleToc(body);
  const tocScript = article.toc
    ? `<script>
      (() => {
        const links = [...document.querySelectorAll(".article-toc a")];
        const headings = links
          .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
          .filter(Boolean);
        if (!links.length || !headings.length) return;
        const setActive = (id) => {
          for (const link of links) {
            link.toggleAttribute("aria-current", link.getAttribute("href") === "#" + id);
          }
        };
        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (visible) setActive(visible.target.id);
          },
          { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
        );
        headings.forEach((heading) => observer.observe(heading));
        setActive(headings[0].id);
      })();
    </script>`
    : "";

  return normalizeChineseQuotes(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description || title)}" />
    <title>${escapeHtml(title)} · 生活倒影</title>
    <link rel="stylesheet" href="../styles.css?v=20261006-reading" />
  </head>
  <body>
    <main class="article-shell">
      <a class="back-link" href="../index.html">← 首页</a>
      <div class="article-layout">
        ${article.toc}
        <article class="article-page">
          <header class="article-header">
            <h1>${escapeHtml(title)}</h1>
            ${date ? `<time datetime="${escapeHtml(date)}">${escapeHtml(date)}</time>` : ""}
          </header>
          <div class="article-content">
            ${article.body}
          </div>
        </article>
      </div>
    </main>
    ${tocScript}
  </body>
</html>
`);
}

async function fetchDoc(post) {
  const url = `https://www.yuque.com/api/docs/${post.slug}?book_id=${bookId}&include_contributors=true&include_like=true&include_hits=true`;
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      referer: `https://www.yuque.com/luchen/buzhou/${post.slug}`,
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json.data || null;
}

async function readManualFile(post) {
  if (!post.manualFile) return "";
  return fs.readFile(path.join(root, post.manualFile), "utf8");
}

function summaryFor(doc, post) {
  if (doc?.description) return normalizeChineseQuotes(doc.description.replace(/\s+/g, " ").trim());
  return normalizeChineseQuotes(post.fallback || "");
}

function metaFor(doc, post) {
  if (!doc && !post.manualContent && !post.manualFile) return "待导入";
  const date = formatDate(
    doc?.created_at || doc?.published_at || doc?.updated_at || post.created_at,
    post.showTime,
  );
  const count = doc?.word_count ? `约 ${doc.word_count} 字` : "";
  return [date, count].filter(Boolean).join(" · ");
}

function timestampFor(doc, post) {
  const value = doc?.created_at || doc?.published_at || doc?.updated_at || post.created_at || "";
  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
}

function siteNav(active = "blog") {
  return `<nav class="site-nav" aria-label="主导航">
        <a class="site-mark" href="./index.html">生活倒影</a>
        <div>
          <a ${active === "blog" ? 'aria-current="page"' : ""} href="./index.html">Blog</a>
          <a ${active === "about" ? 'aria-current="page"' : ""} href="./about.html">About</a>
        </div>
      </nav>`;
}

function indexPage(items) {
  const list = [...items]
    .sort((a, b) => timestampFor(b.doc, b.post) - timestampFor(a.doc, a.post))
    .map(
      ({ post, doc }) => `<article>
            <time>${escapeHtml(metaFor(doc, post))}</time>
            <h3><a href="./posts/${post.slug}.html">${escapeHtml(doc?.title || post.title)}</a></h3>
            ${summaryFor(doc, post) ? `<p>${escapeHtml(summaryFor(doc, post))}</p>` : ""}
          </article>`,
    )
    .join("\n");

  return normalizeChineseQuotes(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="生活倒影。关于工程、AI、Web、工作方法与日常观察的文字记录。"
    />
    <title>生活倒影</title>
    <link rel="stylesheet" href="./styles.css?v=20261006-reading" />
  </head>
  <body>
    <main id="top" class="page-shell">
      ${siteNav("blog")}
      <section class="intro" aria-labelledby="page-title">
        <h1 id="page-title">生活倒影</h1>
        <p class="lede">
          半山腰上的人<br />
          他还好吗
        </p>
      </section>

      <section id="notes" class="notes-section" aria-label="生活倒影文章列表">
        <div class="note-list">
          ${list}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>© 2026 生活倒影</span>
      <span>-半山腰上的人  他还好吗</span>
    </footer>
  </body>
</html>
`);
}

function aboutPage() {
  return normalizeChineseQuotes(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Rao Hai 的个人介绍、论文、社区参与、公开分享与最新文章。"
    />
    <title>About · 生活倒影</title>
    <link rel="stylesheet" href="./styles.css?v=20261006-reading" />
  </head>
  <body>
    <main class="page-shell about-page">
      ${siteNav("about")}
      <header class="about-hero">
        <p class="about-kicker">About me</p>
        <h1>Rao Hai</h1>
        <p>
          Full Stack / AI Engineer at
          <a href="https://afx-team.github.io/">Alipay Experience Technology Department</a>。关注 AI Agents、Accessibility
          与 Web Architecture 的交叉地带。
        </p>
        <p class="about-contact">
          <a href="mailto:surgesoft@gmail.com">surgesoft@gmail.com</a>
          <span>/</span>
          <a href="https://github.com/RaoHai">GitHub</a>
        </p>
      </header>

      <section class="about-block" aria-labelledby="publications">
        <h2 id="publications">Publications</h2>
        <ul class="about-items">
          <li>
            <a href="https://arxiv.org/abs/2606.13192">Reasoning for Mobile User Experience with Multimodal LLMs: Task, Benchmark, and Approach</a>
            <span>Ruichao Mao et al., Hai Rao · CVPR 2026 Findings · <a href="https://arxiv.org/pdf/2606.13192">PDF</a></span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2509.24361">UI-UG: A Unified MLLM for UI Understanding and Generation</a>
            <span>Hao Yang et al., Hai Rao · Preprint · <a href="https://arxiv.org/pdf/2509.24361">PDF</a> · <a href="https://github.com/afx-team/UI-UG">Code & Model</a></span>
          </li>
        </ul>
      </section>

      <section class="about-block" aria-labelledby="community">
        <h2 id="community">Community</h2>
        <ul class="about-items">
          <li>
            <a href="https://www.w3.org/community/gen-ui/">W3C Generative UI Community Group</a>
            <span>Co-chair</span>
          </li>
        </ul>
      </section>

      <section class="about-block" aria-labelledby="presentations">
        <h2 id="presentations">Conference Presentations</h2>
        <ul class="about-items">
          <li>
            <a href="https://www.w3.org/events/meetings/32b7c7e5-b0cf-42c9-94c4-9e384526f4a3/#join">W3C TPAC 2025</a>
            <span>Web AI Agent Rendering Containers · <a href="https://www.w3.org/2025/11/13-chinese-web-minutes.html#b888">Slides / English</a></span>
          </li>
          <li>
            <a href="https://www.w3.org/2024/01/webevolve-series-events/annual-2025/high-perf.en.html">WebEvolve 2025</a>
            <span>Web AI Agent Rendering Containers · <a href="https://www.w3.org/2024/01/webevolve-series-events/annual-2025/slides/hai-rao.pdf">Slides / Chinese</a></span>
          </li>
          <li>
            <a href="https://www.uxacn.com/">第十三届中国用户体验大会</a>
            <span>AI Agent for Accessibility</span>
          </li>
        </ul>
      </section>

    </main>

    <footer class="site-footer">
      <span>© 2026 生活倒影</span>
      <span>-半山腰上的人  他还好吗</span>
    </footer>
  </body>
</html>
`);
}

await fs.mkdir(postsDir, { recursive: true });
await fs.mkdir(imagesDir, { recursive: true });

const items = [];
for (const post of posts) {
  const doc = await fetchDoc(post);
  const fileContent = await readManualFile(post);
  const rawContent = doc?.content || post.manualContent || fileContent || "";
  if (rawContent) {
    await downloadImagesFor(post, rawContent);
  }
  const title = doc?.title || post.title;
  const date = formatDate(
    doc?.created_at || doc?.published_at || doc?.updated_at || post.created_at,
    post.showTime,
  );
  const body = rawContent
    ? await localizePlainImages(
        post,
        wrapTables(post.manualFile ? marked.parse(cleanManualMarkdown(rawContent)) : cleanLakeHtml(rawContent)),
      )
    : `<p>这篇旧文章目前无法从语雀公开接口读取正文，后续拿到原文后会补进站内。</p>`;

  await fs.writeFile(
    path.join(postsDir, `${post.slug}.html`),
    layout({
      title,
      description: summaryFor(doc, post),
      date,
      body,
    }),
    "utf8",
  );
  items.push({ post, doc });
  console.log(`${doc ? "imported" : rawContent ? "manual" : "placeholder"} ${post.slug}`);
}

await fs.writeFile(path.join(publicDir, "index.html"), indexPage(items), "utf8");
await fs.writeFile(path.join(publicDir, "about.html"), aboutPage(), "utf8");
