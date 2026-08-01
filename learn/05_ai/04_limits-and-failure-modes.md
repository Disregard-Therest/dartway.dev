---
title: Limits and Failure Modes
description: Where these tools reliably fail, and what that means for how you use them
---

# Limits and Failure Modes

The specific, repeatable ways AI assistance goes wrong — not as a reason to
avoid it, but because knowing where a tool fails is what lets you use it
confidently everywhere else.

**Why it matters.** The dangerous failures are the quiet ones. An assistant that
refused would be harmless; one that produces something confident and subtly
wrong costs more than not using it, because it consumed your attention as well
as your time.

## What to understand

- What the model can see, and what it is filling in
- Which categories of task it is systematically weak at
- Why fluency and correctness are unrelated here
- What it does when it does not know, which is rarely to say so
- Where your own judgement is being quietly displaced

## Core topics

### Knowledge limits

- Training cutoffs, and confident answers about libraries that have changed
- Version confusion: an API that existed two major versions ago
- Rare or in-house frameworks, where there was little to learn from
- Answers that are the average of the internet, including its outdated majority

### Context limits

- It only knows what it has been given, and infers the rest
- Large codebases where the relevant file was never read
- Losing earlier constraints over a long session
- Reading a summary of the code instead of the code

### Reasoning limits

- Long chains where an early wrong step is carried confidently forward
- Multi-file consistency, where each file is right and the whole is not
- Deep domain rules that are nowhere in the code
- Genuinely novel problems, as opposed to recombinations

### Behavioural failure modes

- Agreeing with a wrong correction because you pushed back
- Producing volume when the honest answer is a question
- Rewriting working code that was not the problem
- Optimising the stated metric while missing the point

### What it means for practice

- Verify anything version-specific against documentation
- Give context rather than expecting it to be found
- Prefer many small verified steps to one large plausible one
- Keep the skill you would need to check the work

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Knows the output can be wrong and checks whether it runs. |
| Middle | Recognises the failure categories, verifies version-specific claims, gives context deliberately. |
| Senior | Chooses tasks by where the tool is strong, designs verification into the workflow, and protects the team's ability to work without it. |

## Practice

### Starting out

- **Test the cutoff**
  Ask about a library feature released recently and check the answer against the
  changelog.

- **Push back wrongly**
  Insist on something incorrect and watch whether it agrees.

- **Withhold context**
  Ask for a change without pointing at the relevant file, and see what it assumes.

### Going deeper

- **Find your failure category**
  Track a month of assistance and classify where it went wrong. Adjust what you
  delegate.

- **Break a long chain**
  Take a task where it went confidently wrong late, and split it into verifiable
  steps.

- **Keep the skill**
  Take something you always delegate and do it by hand, to check you still can.

## Check yourself

- What did an assistant tell you recently that turned out to be out of date?
- What does it do in your experience when it does not know something?
- Which of your tasks does it reliably fail at?
- How would you notice if it had quietly agreed with a wrong assumption of yours?
- What could you no longer do unaided that you could a year ago?
- What in your codebase would it have no way of knowing?

## Resources

- **[Anthropic: reduce hallucinations](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)** —
  from people who measure it: why confident invention happens and which
  techniques actually reduce it.
- **[Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374)** —
  the Codex paper. Section 7 on limitations is written by the people who built it
  and is more specific about code-generation failure modes than any commentary
  since.
- **[Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html)** —
  Birgitta Böckeler's memos are unusually specific about where assistance failed
  on real projects and why.
- **[Sycophancy in language models](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models)** —
  research on the tendency to agree with the user, which matters directly when
  you push back on a correct answer.
- **[Stack Overflow Developer Survey](https://survey.stackoverflow.co/)** — the
  trust questions, for how working developers' confidence compares with their
  usage.
