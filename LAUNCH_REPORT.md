# Launch report

Generated 2026-10-18 by `pnpm launch-report` against http://localhost:3000. Facts only: every number below was measured from the build or the source.

## 1. Sitemap completeness

Checked against the route lists in promptP0.md, promptP1.md and promptP2.md (the sitemap PDF itself was not available to the build). The sitemap lists exactly the live pages.

| URL | Page | State |
| --- | --- | --- |
| `/` | Home | live |
| `/physiotherapy/` | Physiotherapy | live |
| `/physiotherapy-baner-balewadi-pune/` | Physiotherapy in Baner and Balewadi | live |
| `/services/` | Services | live |
| `/orthopedic-physiotherapy/` | Orthopedic physiotherapy | live |
| `/neuro-physiotherapy/` | Neuro physiotherapy | live |
| `/about/` | About | live |
| `/dr-nileema-chaudhary/` | Dr. Nileema Chaudhary | live |
| `/reviews/` | Reviews | live |
| `/contact/` | Contact | live |
| `/book-appointment/` | Book appointment | live |
| `/privacy-policy/` | Privacy policy | live |
| `/terms-and-conditions/` | Terms and conditions | live |
| `/disclaimer/` | Disclaimer | live |
| `/arthritis-physiotherapy/` | Arthritis physiotherapy | waiting for clinical review |
| `/back-pain-physiotherapy/` | Back pain physiotherapy | waiting for clinical review |
| `/knee-pain-physiotherapy/` | Knee pain physiotherapy | waiting for clinical review |
| `/neck-pain-physiotherapy/` | Neck pain physiotherapy | waiting for clinical review |
| `/orthopedic-physiotherapy-baner-balewadi/` | Orthopedic physiotherapy in Baner and Balewadi | waiting for client flag (orthoLocalPage) |
| `/sciatica-physiotherapy/` | Sciatica physiotherapy | waiting for clinical review |
| `/shoulder-pain-physiotherapy/` | Shoulder pain physiotherapy | waiting for clinical review |
| `/fracture-rehabilitation/` | Fracture rehabilitation | waiting for client flag (fractureRehab) |
| `/post-surgery-rehabilitation/` | Post-surgery rehabilitation | waiting for clinical review |
| `/sports-physiotherapy/` | Sports physiotherapy | waiting for clinical review |
| `/conditions/` | Conditions | built as noindex: needs 3 reviewed condition pages |
| `/rehabilitation/` | Rehabilitation | built as noindex: needs 2 reviewed rehab or sports pages |
| `/faqs/` | FAQs | live |
| `/resources/` | Resources | built as noindex: needs 1 reviewed guide |
| `/physiotherapy-at-home/` | Physiotherapy at home | waiting for client flag (homeVisits) |
| `/reviews/` | Reviews | live |
| `/resources/first-physiotherapy-assessment/` | What to expect in your first physiotherapy assessment | waiting for clinical review |
| `/resources/home-exercises-remote-assessment/` | Home exercises: what a physiotherapist can and cannot assess remotely | waiting for clinical review |
| `/resources/physiotherapy-vs-rest/` | Physiotherapy vs rest for common muscle and joint problems | waiting for clinical review |
| `/resources/post-surgery-rehabilitation-what-to-expect/` | Post-surgery rehabilitation: what patients should expect | waiting for clinical review |
| `/resources/when-to-see-a-physiotherapist/` | When to see a physiotherapist for back, knee or shoulder pain | waiting for clinical review |
| `/review/` | Review request tool | internal: noindex, not in the sitemap |
| `/review/print/` | Printable review card | internal: noindex, not in the sitemap |

Summary: 16 live, 13 waiting for clinical review, 3 waiting for client flag, 3 built as noindex, 2 internal.

## 2. NAP consistency

No phone, PIN code or opening time in the built HTML of 34 pages differs from `clinic.ts`, and no source file outside `clinic.ts` hardcodes them.

## 3. Schema inventory

Structural checks only (valid JSON, required properties, no Review or AggregateRating). Google's Rich Results Test is a web tool and was not run here: paste each live URL into https://search.google.com/test/rich-results after deploy.

| URL | JSON-LD types | Structural check |
| --- | --- | --- |
| `/` | Physiotherapy, MedicalBusiness, WebSite | pass |
| `/physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/physiotherapy-baner-balewadi-pune/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/services/` | BreadcrumbList, ItemList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/orthopedic-physiotherapy/` | BreadcrumbList, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/neuro-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/about/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/dr-nileema-chaudhary/` | BreadcrumbList, Person, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/reviews/` | BreadcrumbList, WebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/contact/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/book-appointment/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/privacy-policy/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/terms-and-conditions/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/disclaimer/` | BreadcrumbList, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/arthritis-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/back-pain-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/knee-pain-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/neck-pain-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/sciatica-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/shoulder-pain-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/post-surgery-rehabilitation/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/sports-physiotherapy/` | BreadcrumbList, FAQPage, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/conditions/` | BreadcrumbList, CollectionPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/rehabilitation/` | BreadcrumbList, CollectionPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/faqs/` | BreadcrumbList, FAQPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/` | BreadcrumbList, CollectionPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/reviews/` | BreadcrumbList, WebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/first-physiotherapy-assessment/` | BreadcrumbList, Article, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/home-exercises-remote-assessment/` | BreadcrumbList, Article, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/physiotherapy-vs-rest/` | BreadcrumbList, Article, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/post-surgery-rehabilitation-what-to-expect/` | BreadcrumbList, Article, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/resources/when-to-see-a-physiotherapist/` | BreadcrumbList, Article, MedicalWebPage, Physiotherapy, MedicalBusiness, WebSite | pass |
| `/review/` | Physiotherapy, MedicalBusiness, WebSite | pass |
| `/review/print/` | Physiotherapy, MedicalBusiness, WebSite | pass |

## 4. Link graph

Live pages only. Links counted from the full page, header and footer included. Click depth is from Home.

| URL | Links out | Links in | Click depth |
| --- | --- | --- | --- |
| `/` | 15 | 14 | 0 |
| `/physiotherapy/` | 15 | 14 | 1 |
| `/physiotherapy-baner-balewadi-pune/` | 15 | 14 | 1 |
| `/services/` | 15 | 14 | 1 |
| `/orthopedic-physiotherapy/` | 15 | 14 | 1 |
| `/neuro-physiotherapy/` | 15 | 14 | 1 |
| `/about/` | 15 | 14 | 1 |
| `/dr-nileema-chaudhary/` | 15 | 14 | 1 |
| `/reviews/` | 16 | 14 | 1 |
| `/contact/` | 15 | 14 | 1 |
| `/book-appointment/` | 15 | 14 | 1 |
| `/privacy-policy/` | 15 | 14 | 1 |
| `/terms-and-conditions/` | 15 | 14 | 1 |
| `/disclaimer/` | 15 | 14 | 1 |
| `/faqs/` | 15 | 14 | 1 |
| `/reviews/` | 16 | 14 | 1 |

Orphans: none. Deeper than 3 clicks: none.

## 5. Content state: waiting for Dr. Nileema Chaudhary

A page goes live when its flag (if any) is on and its frontmatter has `clinicallyReviewed: true` and a `reviewedAt` date. `pnpm content:review-status` prints the same list for P1.

### Sign-off checklist (print this)

Read each draft, including the red-flag box and the FAQs, then tick, sign and date.

| Reviewed | Page | URL | State now | Signature and date |
| --- | --- | --- | --- | --- |
| [ ] | Arthritis physiotherapy | `/arthritis-physiotherapy/` | draft | &nbsp; |
| [ ] | Back pain physiotherapy | `/back-pain-physiotherapy/` | draft | &nbsp; |
| [ ] | Knee pain physiotherapy | `/knee-pain-physiotherapy/` | draft | &nbsp; |
| [ ] | Neck pain physiotherapy | `/neck-pain-physiotherapy/` | draft | &nbsp; |
| [ ] | Orthopedic physiotherapy in Baner and Balewadi | `/orthopedic-physiotherapy-baner-balewadi/` | off (flag) | &nbsp; |
| [ ] | Sciatica physiotherapy | `/sciatica-physiotherapy/` | draft | &nbsp; |
| [ ] | Shoulder pain physiotherapy | `/shoulder-pain-physiotherapy/` | draft | &nbsp; |
| [ ] | Fracture rehabilitation | `/fracture-rehabilitation/` | off (flag) | &nbsp; |
| [ ] | Post-surgery rehabilitation | `/post-surgery-rehabilitation/` | draft | &nbsp; |
| [ ] | Sports physiotherapy | `/sports-physiotherapy/` | draft | &nbsp; |
| [ ] | What to expect in your first physiotherapy assessment | `/resources/first-physiotherapy-assessment/` | draft | &nbsp; |
| [ ] | Home exercises: what a physiotherapist can and cannot assess remotely | `/resources/home-exercises-remote-assessment/` | draft | &nbsp; |
| [ ] | Physiotherapy vs rest for common muscle and joint problems | `/resources/physiotherapy-vs-rest/` | draft | &nbsp; |
| [ ] | Post-surgery rehabilitation: what patients should expect | `/resources/post-surgery-rehabilitation-what-to-expect/` | draft | &nbsp; |
| [ ] | When to see a physiotherapist for back, knee or shoulder pain | `/resources/when-to-see-a-physiotherapist/` | draft | &nbsp; |
| [ ] | Physiotherapy at home | `/physiotherapy-at-home/` | off (flag: homeVisits) | &nbsp; |

## 6. Client confirmations

Regenerate with `pnpm content-todo` before reading. Items by group, each needing the clinic's confirmation before its flag in `src/content/flags.ts` is switched on. Flags now on: none.

- `src/app/about/page.tsx:58` women-owned clinic (flag: womenOwned).
- `src/app/contact/page.tsx:23` show "Sunday: closed" only after confirmation (flag: sunday).
- `src/app/dr-nileema-chaudhary/page.tsx:57` qualifications and experience (flags: credBPTh, credDOMP, exp10y).
- `src/app/dr-nileema-chaudhary/page.tsx:119` add alumniOf / hasCredential only when credBPTh / credDOMP are confirmed.
- `src/app/neuro-physiotherapy/page.tsx:76` stroke rehabilitation programme (flag: neuroStroke).
- `src/app/neuro-physiotherapy/page.tsx:85` pediatric and cerebral palsy programme (flag: neuroCP).
- `src/app/page.tsx:82` cerebral palsy programme (flag: neuroCP).
- `src/app/page.tsx:172` "10+ years clinical experience" (flag: exp10y).
- `src/app/page.tsx:415` parking availability (flag: parking).
- `src/app/physiotherapy-baner-balewadi-pune/page.tsx:56` nearby landmarks and travel notes (flag: landmarks).
- `src/app/privacy-policy/page.tsx:17` have this draft reviewed by the clinic (and legal advice if needed) before launch.
- `src/app/privacy-policy/page.tsx:32` GSTIN / registration details (flag: legalIds).
- `src/content/clinic.ts:30` Sunday closed / not listed on Google. Show "Sunday: closed" only after confirmation (flag: sunday).
- `src/content/services.ts:151` "Inpatient" appears on Google; confirm what it means before showing (flag: inpatient).
- `src/content/services.ts:224` hydrotherapy is not confirmed (flag: hydro).

### P1 confirmations
- `src/app/terms-and-conditions/page.tsx:16` have this draft reviewed by the clinic before launch.
- `src/app/terms-and-conditions/page.tsx:53` GSTIN / registration details (flag: legalIds).
- `src/app/[slug]/page.tsx:65` machines named per page come from `technology` frontmatter (flag: technologyByCondition).
- `src/content/conditions/arthritis-physiotherapy.mdx:87` machines named for arthritis need the clinic's confirmation (flag: technologyByCondition).
- `src/content/conditions/back-pain-physiotherapy.mdx:92` robotic spine decompression and other machines are named here only once the clinic confirms the mapping (flag: technologyByCondition).
- `src/content/conditions/knee-pain-physiotherapy.mdx:83` machines named for knee pain need the clinic's confirmation (flag: technologyByCondition).
- `src/content/conditions/neck-pain-physiotherapy.mdx:93` machines named for neck pain need the clinic's confirmation (flag: technologyByCondition).
- `src/content/conditions/orthopedic-physiotherapy-baner-balewadi.mdx:41` local orthopedic page; build only if the clinic confirms it is genuinely offered as a local service (flag: orthoLocalPage).
- `src/content/conditions/sciatica-physiotherapy.mdx:85` machines named for sciatica need the clinic's confirmation (flag: technologyByCondition).
- `src/content/conditions/shoulder-pain-physiotherapy.mdx:50` frozen-shoulder section (flag: frozenShoulder).
- `src/content/conditions/shoulder-pain-physiotherapy.mdx:88` machines named for shoulder pain need the clinic's confirmation (flag: technologyByCondition).
- `src/content/flags.ts:22` fracture rehab is not on the Google services list (flag: fractureRehab).
- `src/content/flags.ts:24` frozen-shoulder section on the shoulder page (flag: frozenShoulder).
- `src/content/flags.ts:26` local orthopedic page for Baner and Balewadi, only if genuinely offered (flag: orthoLocalPage).
- `src/content/flags.ts:28` which machines are named on which condition page; see each page's `technology` frontmatter (flag: technologyByCondition).
- `src/content/rehabilitation/fracture-rehabilitation.mdx:33` fracture rehabilitation is not on the Google services list. This page builds only when the clinic confirms it (flag: fractureRehab).
- `src/content/rehabilitation/sports-physiotherapy.mdx:80` machines named for sports injuries need the clinic's confirmation (flag: technologyByCondition).
- `/arthritis-physiotherapy/` draft
- `/back-pain-physiotherapy/` draft
- `/knee-pain-physiotherapy/` draft
- `/neck-pain-physiotherapy/` draft
- `/orthopedic-physiotherapy-baner-balewadi/` off (flag) (flag: orthoLocalPage)
- `/sciatica-physiotherapy/` draft
- `/shoulder-pain-physiotherapy/` draft
- `/fracture-rehabilitation/` off (flag) (flag: fractureRehab)
- `/post-surgery-rehabilitation/` draft
- `/sports-physiotherapy/` draft

### P2 confirmations
- `src/app/actions.ts:65` home visits are offered only when the clinic confirms (flag: homeVisits).
- `src/app/physiotherapy-at-home/page.tsx:28` home visits are offered only when the clinic confirms (flag: homeVisits).
- `src/app/physiotherapy-at-home/page.tsx:65` what the clinic offers at a home visit, beyond assessment and exercises.
- `src/app/physiotherapy-at-home/page.tsx:88` how a home visit works, as the clinic runs it.
- `src/app/rehabilitation/page.tsx:33` stroke rehabilitation programme (flag: neuroStroke).
- `src/app/rehabilitation/page.tsx:43` pediatric and cerebral palsy programme (flag: neuroCP).
- `src/app/rehabilitation/page.tsx:113` first-visit checklist for rehabilitation (flag: firstVisitChecklist).
- `src/content/clinic.ts:21` area the clinic covers for home visits, in the clinic's own words. Never invent a radius (flag: homeVisits).
- `src/content/faqs.ts:44` referral policy (flag: referral).
- `src/content/faqs.ts:69` reschedule and cancellation policy (flag: reschedulePolicy).
- `src/content/faqs.ts:109` Sunday hours (flag: sunday).
- `src/content/faqs.ts:125` parking details (flag: parking).
- `src/content/faqs.ts:134` home visits and what they cover (flag: homeVisits).
- `src/content/faqs.ts:143` payment methods accepted (flag: paymentMethods).
- `src/content/flags.ts:31` payment methods accepted, for the FAQs page (flag: paymentMethods).
- `src/content/flags.ts:33` "bring these to your first visit" list on the rehabilitation hub (flag: firstVisitChecklist).
- `src/content/flags.ts:35` reschedule and cancellation policy for the FAQs page (flag: reschedulePolicy).
- `src/content/flags.ts:37` long-form patient stories, only with signed consent recorded offline (flag: patientStories).
- `src/content/homeVisit.ts:10` the clinic must confirm every answer before the flag is switched on (flag: homeVisits).
- `src/content/resources/home-exercises-remote-assessment.mdx:75` home visits (flag: homeVisits).
- `src/content/reviews.ts:15` patient permission to republish each quote; add consentRecordedAt (YYYY-MM-DD) once recorded (flag: patientStories).
- `/resources/first-physiotherapy-assessment/` draft
- `/resources/home-exercises-remote-assessment/` draft
- `/resources/physiotherapy-vs-rest/` draft
- `/resources/post-surgery-rehabilitation-what-to-expect/` draft
- `/resources/when-to-see-a-physiotherapist/` draft
- `/physiotherapy-at-home/` off (flag: homeVisits)

### Later ideas

## 7. Placeholders

Images still marked `data-placeholder="true"`. Details and replacements are in PLACEHOLDERS.md.

| URL | Placeholder images |
| --- | --- |
| `/` | 8 |
| `/physiotherapy/` | 3 |
| `/dr-nileema-chaudhary/` | 1 |
| `/arthritis-physiotherapy/` | 1 |
| `/back-pain-physiotherapy/` | 1 |
| `/knee-pain-physiotherapy/` | 1 |
| `/neck-pain-physiotherapy/` | 1 |
| `/sciatica-physiotherapy/` | 1 |
| `/shoulder-pain-physiotherapy/` | 1 |
| `/post-surgery-rehabilitation/` | 1 |
| `/sports-physiotherapy/` | 1 |
| `/rehabilitation/` | 3 |

## 8. Performance (Lighthouse)

Run on a build with every draft page and guide temporarily marked reviewed, so each template is scored as it will be once live. The shipped state keeps them as noindex drafts. SEO ignores the crawlability and robots.txt checks, which fail on localhost because every non-production host is blocked on purpose.

Lab runs on a local production build, one page per template. LCP and CLS are lab values; INP is a field metric and needs real-user data after launch (Total Blocking Time is shown instead). Budgets: LCP under 2.5s on mobile, CLS under 0.1, SEO 100 on indexable pages.

| Template | URL | Mobile perf | Mobile LCP (s) | CLS | TBT (ms) | Desktop perf | SEO | A11y |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `/` | 75 | 3.4 | 0.000 | 646 | 99 | 100 | 97 |
| Physiotherapy | `/physiotherapy/` | 92 | 3.3 | 0.000 | 70 | 100 | 100 | 96 |
| Services | `/services/` | 93 | 2.8 | 0.000 | 195 | 100 | 100 | 96 |
| Local | `/physiotherapy-baner-balewadi-pune/` | 95 | 2.7 | 0.000 | 101 | 100 | 100 | 96 |
| Ortho | `/orthopedic-physiotherapy/` | 96 | 2.6 | 0.000 | 82 | 100 | 100 | 96 |
| Neuro | `/neuro-physiotherapy/` | 95 | 2.9 | 0.000 | 56 | 100 | 100 | 96 |
| About | `/about/` | 94 | 3.1 | 0.000 | 55 | 100 | 100 | 97 |
| Doctor | `/dr-nileema-chaudhary/` | 97 | 2.7 | 0.023 | 58 | 100 | 100 | 96 |
| Contact | `/contact/` | 96 | 2.7 | 0.000 | 108 | 100 | 100 | 97 |
| Booking | `/book-appointment/` | 87 | 2.5 | 0.056 | 407 | 100 | 100 | 96 |
| Conditions hub | `/conditions/` | 83 | 2.8 | 0.000 | 512 | 100 | 100 | 96 |
| Rehabilitation hub | `/rehabilitation/` | 90 | 3.4 | 0.000 | 114 | 100 | 100 | 96 |
| Condition page | `/back-pain-physiotherapy/` | 95 | 2.8 | 0.000 | 132 | 100 | 100 | 96 |
| Rehab page | `/post-surgery-rehabilitation/` | 96 | 2.8 | 0.000 | 57 | 100 | 100 | 96 |
| Reviews | `/reviews/` | 96 | 2.6 | 0.000 | 93 | 100 | 100 | 96 |
| FAQs | `/faqs/` | 96 | 2.8 | 0.000 | 64 | 100 | 100 | 96 |
| Resources index | `/resources/` | 96 | 2.6 | 0.000 | 92 | 100 | 100 | 96 |
| Resource article | `/resources/first-physiotherapy-assessment/` | 96 | 2.6 | 0.000 | 99 | 100 | 100 | 96 |
| Privacy | `/privacy-policy/` | 97 | 2.7 | 0.000 | 58 | 100 | 100 | 96 |
| Review tool | `/review/` | 93 | 2.8 | 0.000 | 177 | 100 | noindex | 96 |

## 9. Accessibility (axe)

Zero serious or critical issues on all 20 templates.

## 10. Go-live operations

See DEPLOY.md, section "Go-live checklist": Search Console resubmission, requesting indexing, Google Business Profile links, retiring the Grexa microsite, the .in to .com redirect and the weekly review rhythm.
