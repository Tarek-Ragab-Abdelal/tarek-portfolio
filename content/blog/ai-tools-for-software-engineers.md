---
title: "How I Actually Use AI Tools as a Software Engineer"
excerpt: "A practical breakdown of where AI tools genuinely help in day-to-day engineering work, where they fall short, and how to use them without losing your edge."
date: "2026-03-01"
tags: ["AI", "Productivity", "Software Engineering", "Tools"]
---

There is a lot of noise around AI tools for developers right now. Some people treat them as the end of programming. Others dismiss them entirely. After using tools like Claude, GitHub Copilot, and ChatGPT daily across real projects for over a year, my take is more nuanced: AI tools are genuinely useful, but only if you understand what they are good at, what they are bad at, and how to integrate them without becoming dependent.

This post is not a product review. It is a practical breakdown of how I actually use these tools in my day-to-day work as a full-stack engineer, and what I have learned about doing it well.

## Where AI tools genuinely help

### Boilerplate and scaffolding

The single biggest time saver for me is generating repetitive code. Things like:

- CRUD endpoint scaffolding with proper error handling.
- TypeScript interfaces from a JSON schema or API response.
- SQL migration files from a description of schema changes.
- Unit test shells for existing functions.

These tasks are not intellectually challenging, but they consume real time. AI tools handle them in seconds with 80-90% accuracy. The remaining 10-20% is quick to fix because you know exactly what the output should look like.

When I built the reporting platform at RES-VA, I used AI to generate the initial React component shells for each dashboard view. The components needed specific props, specific data shapes, and specific Tailwind styling patterns. Describing the pattern once and having the tool generate 8 variations saved me an afternoon of copy-paste-modify work.

### Understanding unfamiliar codebases

This might be the most underrated use case. When I join a new project or work with a library I have not used before, I paste code snippets into an AI tool and ask "what does this do?" or "what pattern is this implementing?"

During the Sanad Finance project, I was working with a complex PostgreSQL setup involving materialized views and CTEs that the previous developer had written. Rather than spending hours reading PostgreSQL documentation to understand specific syntax choices, I pasted the queries into Claude and asked for explanations. It correctly identified the optimization patterns being used, explained why certain CTEs were structured the way they were, and pointed out a potential performance issue with one of the materialized view refresh strategies.

This is not about avoiding learning. It is about accelerating comprehension so you can focus your learning time on the decisions that matter, not the syntax.

### Writing documentation and commit messages

I am not proud to admit how much time I used to spend on documentation. Writing clear README files, API documentation, and technical design docs is important but tedious. AI tools are remarkably good at taking rough notes and producing clean, structured documentation.

My workflow: I write bullet-point notes about what something does and why. I feed those notes to an AI tool and ask for a structured document. Then I edit the output for accuracy and voice. The editing step is critical. AI-generated docs tend to be verbose and generic. But starting from a draft is much faster than starting from a blank page.

### Debugging and error interpretation

When I hit an error message I do not recognize, especially in environments I work with less frequently, AI tools provide faster answers than Stack Overflow. The key advantage is context: I can paste the error message along with the relevant code, and the tool provides an explanation specific to my situation rather than a generic answer from a 2019 forum post.

I have found this particularly useful for cloud infrastructure errors (Azure Function Apps, Service Bus configurations), Docker build failures, and CMake configuration issues. These are domains where error messages are often cryptic and the correct fix depends heavily on your specific setup.

## Where AI tools fall short

### Architecture and system design

AI tools are good at generating code within a defined structure. They are bad at deciding what the structure should be. When I ask an AI tool to "design the architecture for a real-time data pipeline," I get a generic, textbook answer that does not account for my specific constraints: team size, existing infrastructure, latency requirements, budget, or the fact that my client's data source sends malformed JSON 3% of the time.

Architecture decisions require context that cannot fit in a prompt. They require understanding trade-offs across multiple dimensions, accumulated experience from past failures, and judgment about what matters most in a specific business context. AI tools can be useful sounding boards here, but they should never be the decision maker.

### Security-sensitive code

I do not trust AI-generated code for authentication, encryption, or authorization logic without thorough review. AI tools will confidently generate code that looks correct but has subtle security flaws: using a weak hashing algorithm, not handling timing attacks, or implementing token validation that skips critical checks.

On the GF3 Licenser project, where hardware-bound encryption was a core requirement, every piece of security-related code was written and reviewed manually. The stakes were too high. If the licensing logic had a bypass vulnerability, the entire product's value proposition would collapse.

### Performance-critical code

AI-generated code tends to be correct but not optimized. For most application code, this is fine. For hot paths, database queries that run millions of times, or firmware running on microcontrollers with 2KB of RAM, "correct but slow" is not acceptable.

On embedded projects, I write performance-critical code manually and use AI tools only for the surrounding infrastructure: configuration parsing, logging setup, test harnesses. The inner loop of an RTOS task or a sensor read cycle needs to be hand-tuned, not generated.

## How I integrate AI tools without losing my edge

### The 70/30 rule

I aim for roughly 70% of my AI tool usage to be on tasks I already know how to do, and 30% on tasks where I am learning something new. The 70% is pure productivity gain: I know exactly what the output should look like, so I can verify it instantly. The 30% is an accelerated learning tool, but I always follow up by understanding the generated code well enough to modify it without the tool.

If I find myself using AI tools for 100% of my work in a domain, I am no longer an engineer in that domain. I am a prompt operator. There is a meaningful difference.

### Always read the output

This sounds obvious, but it is the most common mistake I see developers make. They paste a prompt, get a response, copy it into their codebase, and move on. Then they spend three hours debugging an issue that was visible in the generated code if they had spent 60 seconds reading it.

I treat AI-generated code like a pull request from a junior developer. It is probably correct, but I review it before merging. I check edge cases, I verify error handling, and I make sure it follows the patterns already established in the codebase.

### Maintain your fundamentals

The engineers who get the most value from AI tools are the ones who could do the work without them. If you understand data structures, you can verify that an AI-generated sorting implementation is correct and efficient. If you understand SQL query execution plans, you can evaluate whether an AI-generated query will perform well on your dataset.

I still solve algorithmic problems manually, read source code of libraries I depend on, and build small projects from scratch without AI assistance. These activities maintain the mental models that make AI tools useful rather than dangerous.

### Use it for exploration, not production

When I am evaluating a new approach, prototyping a feature, or exploring how a library works, AI tools are invaluable. I can try five different approaches in the time it would take to implement one manually. But when the exploration phase ends and production implementation begins, I slow down. I write critical code deliberately, test it thoroughly, and do not trust generated code in paths that affect data integrity or security.

## The honest assessment

AI tools have made me roughly 25-30% more productive on routine engineering tasks. That is significant. They have not made me a better engineer. Better engineering comes from experience, deliberate practice, and learning from failures, not from faster code generation.

The developers who will thrive alongside AI tools are the ones who use them to eliminate tedious work while doubling down on the skills AI cannot replicate: system design judgment, debugging intuition, understanding user needs, and the ability to make sound technical decisions under uncertainty.

Use the tools. Save the time. But invest that saved time back into becoming a stronger engineer, not into generating even more code.
