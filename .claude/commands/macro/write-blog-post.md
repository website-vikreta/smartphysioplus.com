# Command: /write-blog-post
> For after P0 only. No blog or CMS exists, and P0 doesn't include one. Don't scaffold `/blog` or
> P1 condition pages because this command exists; use it once they are in scope.

## Inputs
Topic, primary keyword (local intent, e.g. "sciatica treatment Balewadi"), 2-3 secondary keywords, goal
(local ranking / bookings).

## Process
1. **Intent:** informational or commercial; realistic for one Pune clinic (Balewadi, Baner, Pashan, Aundh).
2. **Outline:** H1 with primary keyword, meta (<=155 chars), direct 2-3 sentence answer first, H2s for
   what it is → when physiotherapy may help → how we approach it (assessment → treatment → rehab) →
   book for this. Link to the matching specialty page anchor and `/book-appointment/?concern=`.
3. **Write** under the storyteller copy rules: facts from `promptP0.md` §3 only, assessment-led wording,
   no cure claims, no prices, plain active voice, link to `/disclaimer/`. Run `humanizer` on the draft.
4. **SEO check:** keyword in H1, first paragraph, one H2, meta; descriptive alt text; `BreadcrumbList`
   + `Article`/`MedicalWebPage` schema; no `AggregateRating`.
5. Work on a `feature/blog-<topic>` branch off `release-10-2026`.

## Frontmatter
```md
---
title: ''
description: ''
publishedAt: 'YYYY-MM-DD'
updatedAt: 'YYYY-MM-DD'
category: ''
tags: []
---
```
