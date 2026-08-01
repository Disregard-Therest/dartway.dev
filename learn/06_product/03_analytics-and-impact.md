---
title: Analytics and Impact
description: Knowing whether what you shipped actually helped
---

# Analytics and Impact

Instrumenting a product so you can tell whether a feature worked, and reading
the result without fooling yourself.

**Why it matters.** Without measurement, the loudest opinion decides what to
build next. With bad measurement, a number decides — which is worse, because it
looks objective. Engineers are usually the ones implementing the tracking, which
makes them the last line of defence against measuring the wrong thing.

## What to understand

- What question this measurement answers, decided before it is added
- What would change depending on the answer
- Whether the number means what it appears to
- What is not visible in the data
- What you are collecting about people, and whether you should be

## Core topics

### Events

- Naming and structure agreed before instrumenting, not after
- Properties that make an event answerable later
- Instrumenting the flow, not just the success
- Versioning, and comparing across releases without lying
- Validating that events actually arrive

### Metrics

- Funnels, retention and cohorts as the three that usually matter
- Averages hiding everything; percentiles showing it
- Vanity metrics — going up, meaning nothing
- Counter-metrics, so improving one thing does not quietly wreck another
- Leading versus lagging indicators

### Interpreting

- Correlation, causation, and the difference a release makes
- Survivorship bias: the people who left are not in your data
- Seasonality and normal variation
- Sample size, and the honest limits of a small user base
- Deciding what would falsify your belief, before you look

### Experiments

- A/B tests, and what they require to be valid
- Metric and duration fixed in advance
- Peeking, and why it invalidates the result
- When an experiment is not worth the complexity

### Responsibility

- Collecting the minimum that answers the question
- Consent, and honouring the refusal
- Anonymisation that survives being combined with other data
- Privacy declarations matching reality

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Adds the events they are asked to add and checks they fire. |
| Middle | Designs event schemas that answer questions later, builds funnels, distinguishes vanity metrics from useful ones. |
| Senior | Defines what success means before a feature is built, designs valid experiments, and pushes back on measurement that misleads. |

## Practice

### Starting out

- **Instrument a funnel**
  Take a multi-step flow and measure drop-off at each step. Find the worst one.

- **Verify the events**
  Confirm your existing events actually arrive and carry what you think.

- **Replace an average**
  Take a metric reported as a mean and look at its percentiles instead.

### Going deeper

- **Define success first**
  Before building your next feature, write the metric and the threshold that
  means it worked.

- **Run one experiment properly**
  Fix the metric and duration in advance, do not peek, and act on the result.

- **Find what you cannot see**
  Identify a question your current analytics cannot answer, and decide whether to
  fix that.

## Check yourself

- Which feature that you shipped last year actually got used?
- What would have to happen for you to conclude a feature failed?
- Which of your metrics could go up while the product got worse?
- What are you collecting that you have never looked at?
- Who is missing from your data, and what does that hide?
- Does your privacy policy match what your app actually sends?

## Resources

- **[Trustworthy Online Controlled Experiments](https://experimentguide.com/)** —
  Kohavi, Tang and Xu, from running experiments at Microsoft, Amazon and Google.
  The reference for what makes an A/B test valid.
- **[Google Analytics for Firebase: events](https://firebase.google.com/docs/analytics/events)** —
  practical event modelling for mobile, including the naming and parameter
  structure that determines what you can ask later.
- **[Lean Analytics](https://leananalyticsbook.com/)** — on choosing the one
  metric that matters at a given stage, and why tracking everything is a way of
  measuring nothing.
- **[How to Lie with Statistics](https://en.wikipedia.org/wiki/How_to_Lie_with_Statistics)** —
  short, old, and the best inoculation against a chart that looks convincing.
- **[GDPR guidance from the ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/)** —
  plain-language explanations of consent, minimisation and retention, which
  constrain what you may instrument at all.
