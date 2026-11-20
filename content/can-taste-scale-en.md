<img src="../assets/images/can-taste-scale-01.png" width="836" height="471" alt="One person holds a glowing orb while a line of people behind them waits with empty hands." />

> "We can know more than we can tell."
>
> — Michael Polanyi, *The Tacit Dimension*

Every team has someone like this: give a task to another person and it gets done; give it to them and it gets done well. Their code, writing, and decisions have a quality that is often apparent at a glance. We call them exceptional individual contributors. What makes them rare is often described as taste.

That creates a problem. If good work can come from only one person, that person's time becomes the bottleneck for the entire production line. A manager's response seems natural: have them lead more people and scale their abilities. Wouldn't that remove the bottleneck?

The intention is reasonable. But it assumes that an exceptional person's work can be broken apart and handed to others to reproduce. Often, what limits output is that only one person has the judgment it requires. **Actions can be copied. Taste is harder to replicate.**

## 1. Taste is hard to put into a procedure

Taste is judgment about what is good: which piece of code will become a problem later, which proposal users will respond to, which sentence feels wrong, and which request should be turned down outright.

Polanyi's observation speaks to this difficulty. Taste is knowledge that resists a complete explanation. It develops through repeated comparisons, mistakes, and reflection in real work. Someone with experience may recognize quality immediately and still struggle to explain every step of the judgment.

A standard operating procedure can specify actions: what to do first, what comes next, and which items to check. Taste guides the choices that the procedure does not cover. Those choices often determine the quality of the result.

Ikujiro Nonaka documented a classic example. In the 1980s, Matsushita was developing a home bread maker, but its bread did not taste as good as bread made by a professional baker. Engineers compared machine-kneaded and hand-kneaded dough, even using X-rays, without finding useful clues.

Then software developer Ikuko Tanaka went to a hotel in Osaka known for its bread and trained with its head baker. After considerable practice, she identified a distinctive stretching-and-twisting motion in the baker's technique. Reproducing that motion in the machine helped make the product a success. It launched in 1987 and sold a record-setting 536,000 units in its first year.

The baker's skill was real, and it mattered to the result. Yet the baker could not fully explain it, and the engineers' analysis had not uncovered it. Someone had to knead dough alongside the baker and compare the results repeatedly before the technique became clear. An exceptional contributor's taste presents a similar difficulty. It is valuable, but hard to put straight into a procedure. Even the part that can eventually be documented may first have to be discovered through shared practice.

<img src="../assets/images/can-taste-scale-02.png" width="724" height="543" alt="An experienced baker and a learner practice the same stretching-and-twisting motion side by side." />

## 2. Review requires taste too

Many managers assume that other people can produce the work and the exceptional contributor can simply check it. But deciding whether something is good also requires taste.

When "good" cannot be clearly specified, the people taking over the work can be assessed only against visible measures: how many items they completed, whether they met the deadline, and whether the format is correct. Research on multitask incentives explains how rewarding easily measured dimensions can draw effort away from dimensions that are harder to measure but equally important (Holmström and Milgrom, 1991). The arrangement can channel people's effort toward the standards that can be written down, allocated, and assessed.

The result is often that the same exceptional contributor still has to judge the quality. The person who used to make good things now spends the day finding problems in other people's work. They still break down the tasks, keep the work moving, and approve the results. There are more people executing the work, but the bottleneck remains. It has moved from production to review, with the same person at its center.

<img src="../assets/images/can-taste-scale-03.png" width="836" height="471" alt="A person overwhelmed by unfinished work becomes the reviewer at a narrow gate, with helpers queuing to submit completed work." />

## 3. The long-term cost: diluted quality and an exhausted person

As volume rises, every deliverable becomes "good enough," and the overall standard drifts toward the average. Users may notice the decline before the metrics capture it. By the time the problem is recognized, it may have been developing for a long time.

The deeper cost falls on the exceptional contributor. Taste is sustained by continuing to make judgments in real work. When teaching, reviewing, and rework fragment the day, there is less time to explore problems and develop that judgment. It can gradually lose its edge. In the worst case, the person leaves. An attempt to reduce dependence on one person ends up exhausting that person and losing them altogether.

## 4. Taste can spread through practice and tools

Difficulty transferring taste does not make its spread impossible. The Matsushita story already offers a way forward. Someone learned the baker's technique by working alongside him and comparing the results, before it could be captured in documentation. To spread taste, people need access to the situations in which judgment is exercised.

The most direct approach is to involve learners in actual decisions. Let them observe when the experienced contributor makes a judgment. When they produce work, review it together and explain why one version works and another does not. Through repeated, specific comparisons and feedback, another person can gradually develop their own standards of judgment.

Some judgments can also be built into tools. In her talk ["All Code Is Slop (Except Mine),"](https://ai.engineer/code/2026/talks/lauren-tan) engineer Lauren Tan (@poteto on X) described a practice: whenever she corrects AI-generated code, she turns problems that can be checked into lint rules. Where API or architectural changes can make an entire class of mistake impossible, she changes the design. One example from her game-development posts is marking code that runs every frame with a `.hot.ts` extension, then using lint rules to prohibit memory allocations there, reducing garbage-collection stutters. A problem that once required an experienced reviewer can then be checked repeatedly by a tool.

This fits the distinction between taste and a procedure. The part that can become a rule is the part of a judgment that has already been understood and made checkable. Recognizing the next problem worth turning into a rule still requires judgment. Rules can catch known problems and leave people more time for new ones.

Either approach requires time and stable relationships. Toyota has long shared its practices with suppliers through supplier associations, specialists providing on-site support, and jishuken study groups (Dyer and Nobeoka, 2000). Such knowledge accumulates through sustained cooperation. Frequent turnover can take what has been learned out of the relationship.

Spreading taste therefore takes a substantial amount of the experienced contributor's time, and progress is often slow. If managers ask someone to teach without reducing their direct delivery commitments or recognizing their contribution to team capability, that person is stretched between two jobs. The effort to spread their judgment competes for the very capacity that was already constrained.

## Conclusion

Scaling someone's taste sounds like a way to multiply their value. But asking a person to break down their work, reproduce themselves, and take responsibility for everyone else's mistakes can turn them into a resource that is spread ever more thinly.

In *Groundwork of the Metaphysics of Morals*, Kant argues that people should always be treated also as ends, never merely as means. Taste belongs to a particular person. It reflects years of judgment developed through work, together with a commitment to doing that work well. It cannot simply be reassigned as a unit of production capacity.

Managers need to ask whether the work can be handed over, what that transfer will cost, and who will bear the cost. Respecting taste begins with respecting the person: give them time, room, and recognition to keep doing the work they do especially well, while giving those who want to learn a chance to work beside them.

Whether taste can scale ultimately depends on how we treat the people who have it.

---

<details>
<summary>References and source notes</summary>

<p><strong>1. Polanyi and tacit knowledge</strong></p>
<p>Michael Polanyi, <em>The Tacit Dimension</em>. Garden City, NY: Doubleday, 1966, chapter 1, "Tacit Knowing," p. 4. <a href="https://www.sjsu.edu/people/john.estill/courses/158-s15/The_Tacit_Dimension_Polanyi.pdf">Excerpt</a>; <a href="https://press.uchicago.edu/ucp/books/book/chicago/T/bo6035368">University of Chicago Press reissue</a>.</p>
<p>The opening quotation is an excerpt from a longer sentence. Applying it to taste is this essay's interpretation; Polanyi was not directly discussing taste in the sense used here.</p>

<p><strong>2. Matsushita's bread maker</strong></p>
<p>Ikujiro Nonaka, "The Knowledge-Creating Company," <em>Harvard Business Review</em>, 69(6), November–December 1991, pp. 96–104. <a href="https://hbr.org/1991/11/the-knowledge-creating-company-2">Article</a>.</p>
<p>For the detailed account: Ikujiro Nonaka and Hirotaka Takeuchi, <em>The Knowledge-Creating Company: How Japanese Companies Create the Dynamics of Innovation</em>. Oxford University Press, 1995, p. 63 and chapter 4, pp. 103–108. <a href="https://realkm.com/wp-content/uploads/2025/04/TKCC.pdf">Scanned edition</a>. The details below follow the 1995 book.</p>
<p>The hotel was the Osaka International Hotel. The book describes Ikuko Tanaka as a software developer and, on p. 63, as head of software development. X-ray comparisons produced no meaningful insights. The technique is described as a "twisting stretch." Page 108 records a February 1987 launch and first-year sales of 536,000 units, described as record-setting. <a href="https://holdings.panasonic/global/corporate/about/history/panasonic-museum/pdf/products_list.pdf">Panasonic's official product list</a> also dates its first bread maker to 1987.</p>
<p>The book also describes the eventual development of mechanical specifications and a manual. The example supports the role of shared practice in articulating knowledge that was initially hard to express; it does not establish that such knowledge can never be codified.</p>

<p><strong>3. Multitask incentives</strong></p>
<p>Bengt Holmström and Paul Milgrom, "Multitask Principal-Agent Analyses: Incentive Contracts, Asset Ownership, and Job Design," <em>Journal of Law, Economics, &amp; Organization</em>, 7, Special Issue, 1991, pp. 24–52. <a href="https://web.stanford.edu/~milgrom/publishedarticles/Multitask%20Principal%20Agent.pdf">Author-hosted paper</a>.</p>
<p>The analysis concerns tasks with multiple dimensions, some difficult to measure, that compete for effort or attention. Strong incentives on measurable dimensions can harm performance on others. The essay applies this mechanism; it does not claim that every metric-based evaluation necessarily has this effect.</p>

<p><strong>4. @poteto: turning lessons into executable checks</strong></p>
<p>Lauren Tan (@poteto), "All Code Is Slop (Except Mine)," AI Engineer CODE 2026, November 11, 2026. <a href="https://ai.engineer/code/2026/talks/lauren-tan">Organizer's reading edition</a>; <a href="https://www.youtube.com/watch?v=O_zcc6Xl12g">Recording</a>, particularly 5:00–9:40 on architecture, lint, and recurring corrections.</p>
<p>Tan <a href="https://x.com/poteto/status/2121673563489140863">shared the talk on X</a> on November 14. Her <a href="https://x.com/poteto/status/2117043478140276847">game-development post</a> describes <code>.hot.ts</code> and the ban on allocations. It was posted at 23:57 UTC on November 1, or November 2 in Singapore. <a href="https://github.com/poteto/plugins/blob/main/pstack/skills/principle-encode-lessons-in-structure/SKILL.md">Her public repository</a> also advocates encoding recurring corrections in executable mechanisms.</p>
<p>The talk's title is humorous. It is not evidence that only her code is good. The example illustrates making checkable judgments enforceable; it does not show that all taste can be automated. This is an account of practice, not a controlled causal experiment.</p>

<p><strong>5. Toyota's knowledge-sharing network</strong></p>
<p>Jeffrey H. Dyer and Kentaro Nobeoka, "Creating and Managing a High-Performance Knowledge-Sharing Network: The Toyota Case," <em>Strategic Management Journal</em>, 21(3), 2000, pp. 345–367. <a href="https://www.researchgate.net/publication/37592825_Creating_and_Managing_A_High-Performance_Knowledge-Sharing_Network_The_Toyota_Case">Author-uploaded full text</a>.</p>
<p>The three mechanisms mentioned in the essay correspond to the supplier association, on-site support from the Operations Management Consulting Division (OMCD), and voluntary jishuken study groups. The duration of on-site support varies. The paper also describes interfirm employee transfers, so these three mechanisms are not an exhaustive list.</p>
<p>The association began in 1943, OMCD in the mid-1960s, and the supplier study groups in 1977. The paper also reports that, at the time, no US TSSC consulting project had been completed in less than eight months, and most lasted at least eighteen months. These observations concern specific programs and do not establish a universal timetable for spreading taste.</p>

<p><strong>6. People as ends</strong></p>
<p>Immanuel Kant, <em>Grundlegung zur Metaphysik der Sitten</em> (<em>Groundwork of the Metaphysics of Morals</em>), 1785, section II, Akademie pagination 4:429. <a href="https://web.stanford.edu/~jsabol/certainty/readings/kant_groundwork.pdf">English translation</a>.</p>
<p>The essay paraphrases the formula of humanity. Its emphasis is on treating people also as ends and never merely as means; it does not prohibit cooperation, division of labor, or all instrumental relationships.</p>

<p><strong>Further reading</strong></p>
<ul>
<li><strong>Adding people need not make a project faster.</strong> Frederick P. Brooks Jr., <em>The Mythical Man-Month: Essays on Software Engineering</em>, Addison-Wesley, 1975, chapter 2; p. 25 in the 1995 anniversary edition. <a href="https://www.cs.drexel.edu/~yc349/CS451/RequiredReadings/MythicalManMonth.pdf">Anniversary edition</a>. Brooks's law concerns late software projects and the costs of training and communication. It should not be generalized to mean that adding people always delays every project.</li>
<li><strong>A bottleneck can move from production to review.</strong> Eliyahu M. Goldratt and Jeff Cox, <em>The Goal</em>, North River Press, 1984; later revised editions carry the subtitle <em>A Process of Ongoing Improvement</em>. <a href="https://northriverpress.com/30th-anniversary-edition-of-the-goal-published/">Publisher's edition note</a>; <a href="https://www.toc-goldratt.com/index.php?cont=791">Goldratt on constraints</a>. When review is already the constraint, increasing upstream output may increase queues without increasing completed delivery. Constraints may also lie in demand, policies, or other stages.</li>
<li><strong>Learning judgment through participation.</strong> Jean Lave and Etienne Wenger, <em>Situated Learning: Legitimate Peripheral Participation</em>, Cambridge University Press, 1991. <a href="https://www.cambridge.org/highereducation/books/situated-learning/6915ABD21C8E4619F750A4D4ACA616CD">Publisher's page</a>. Newcomers learn through participation in a community of practice, moving toward fuller participation. This is a framework for understanding learning, not direct experimental evidence for every form of taste transfer.</li>
</ul>
</details>
