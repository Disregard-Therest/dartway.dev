---
draft: true
title: Page template
description: The shape every competency-map page follows
---

# Page template

<!--
Not published — `draft: true` keeps it out of production builds. This is the
shape every page under learn/ follows, and the reasoning behind each section.
Copy it, do not improvise a new structure: a map whose pages each have their own
layout stops being a map.
-->

## What these pages are, and are not

They are **a map, not a tutorial**. A page names a topic, frames how to think
about it, says what competence looks like at each level, and points at the best
material that already exists. It does not teach the topic — other people have
done that better and at greater length, and duplicating them badly helps nobody.

That is also what keeps the pages honest. They make few version-specific claims,
so they do not rot the way a tutorial does, and what they do assert is either
structural (how to think) or checkable (a link that resolves).

## Sections, in order

**Title and a two-to-three sentence definition.** Plain words, product terms.
What this is and where it shows up in real work.

**Why it matters.** One or two sentences on what breaks without it. Concrete
failure, not "it is important for quality".

**What to understand.** The questions a competent person asks themselves — not
facts to memorise. This is the section that makes the page worth reading even
for someone who thinks they know the topic.

**Core topics.** The sub-areas, each with a short definition and concrete
examples. Bullets, not paragraphs. This is the scannable spine of the page.

**Levels.** Three rows — Junior, Middle, Senior — describing what this specific
skill looks like at each. Not job titles: observable behaviour. This is what
makes the map usable for self-assessment, hiring and mentoring, and it is why
the map exists at all.

**Practice.** Two groups, *Starting out* and *Going deeper*, three tasks each.
Real product tasks rather than exercises — the point is to meet the topic where
it actually appears.

**Check yourself.** Six open questions. Not quiz questions with right answers:
questions a mentor would ask, whose value is in noticing you cannot answer one.

**Resources.** Where the page earns its place. See below.

## The resources section

Between three and six links. Fewer, better — a list of twenty is a list nobody
opens.

- **Authoritative first.** Official documentation and specifications, then
  material from people who built the thing, then well-known practitioners.
- **Deep, not introductory.** Skip "10 tips" posts and beginner tutorials. The
  reader arriving here already knows the topic exists; they need the material
  that goes further than the obvious.
- **Say why each one.** One line after each link explaining what it gives that
  the others do not. A bare list of URLs makes the reader open all of them.
- **Mixed formats are good.** Documentation, a long article, a conference talk, a
  book. Different people take in material differently.
- **Never invent a URL.** Every link is one that has been checked to resolve.
  `npm run check-links` verifies this, and it runs over every page here.

## Frontmatter

```yaml
---
title: Layout and Rendering
description: One line. It becomes the meta description and the llms.txt summary.
---
```

No `slug`. The URL comes from the file path, with numeric prefixes stripped —
`learn/03_flutter/02_layout-and-rendering.md` serves at
`/learn/flutter/layout-and-rendering`. Keeping the two in sync by hand is one
more thing to get wrong.
