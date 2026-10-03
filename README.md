# PrivacyLens

Analyzes privacy policies and renders them as structured, risk-scored
labels — modeled on nutrition labels — so non-experts can see what a
policy actually does with their data.

COMP 322 Internet Systems, Honors Contract. NC A&T, Fall 2026.

## Scoring

Each policy is scored 1–5 across five categories, where **higher means
more risk to the user**:

| Category | What it measures |
|---|---|
| Data collected | What personal information is gathered |
| Third-party sharing | Who else receives it, and whether you can opt out |
| Retention | How long it is kept |
| User rights | Access, correction, deletion, portability |
| Tracking | Cookies, pixels, fingerprinting, cross-site following |

The overall score is the mean of the five category scores.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Submit a policy by URL or pasted text |
| `results.html` | The risk label for a single policy |
| `compare.html` | Two policies scored side by side |
| `history.html` | Previously analyzed policies |
| `about.html` | How scoring works, research background |

## Running it

Static HTML and CSS with no build step. Open `index.html` in a browser.

## Roadmap

- **M1 — Static frontend.** All five screens in semantic HTML and CSS,
  with hardcoded sample data. *Complete.*
- **M2 — Interactivity.** Client-side JavaScript: form validation, DOM
  rendering of label rows from data.
- **M3 — Backend and AI.** Node/Express server, policy fetching and
  parsing, two-pass Groq pipeline (structured extraction, then
  plain-English summary), MongoDB persistence.
- **M4 — Final.** Deployment, writeup, polish.

## Notes on the markup

Category rows are a `<table>` because the data is genuinely tabular —
consistent fields across consistent records. Risk levels are carried on
`data-score` attributes and styled with CSS attribute selectors, so M2
can generate rows from JSON without touching class names. Every badge
carries a number *and* a word, never color alone.
