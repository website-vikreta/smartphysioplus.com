# Deploy

The site deploys on Netlify from `netlify.toml` (`pnpm build`, Node 22). `pnpm build` runs `content:check-duplication` first and fails if two P1 pages share too much text.

Before merging to the release branch, run:

```powershell
pnpm typecheck; pnpm lint; pnpm build
pnpm start            # in a second terminal
pnpm check-links      # link matrix, review gate and sitemap
```

## Publishing a reviewed page

P1 condition, rehab and sports pages live in `src/content/conditions/` and `src/content/rehabilitation/`. Each starts as a draft: `noindex`, not in the sitemap and not linked from anywhere. Publishing needs no code change.

1. Run `pnpm content:review-status` to see every page and its state.
2. Dr. Nileema Chaudhary reads the draft on a Netlify deploy preview, including the red-flag box and the FAQs. Corrections go into the `.mdx` file.
3. If the page has a `flag:` in its frontmatter, switch that flag on in `src/content/flags.ts` once the client confirms it.
4. In the page's frontmatter set:
   ```yaml
   clinicallyReviewed: true
   reviewedAt: "YYYY-MM-DD" # the sign-off date
   updatedAt: "YYYY-MM-DD"
   ```
5. Run `pnpm content-todo` to refresh `CONTENT_TODO.md`, then build, start and run `pnpm check-links`. It fails if the live page is missing a required link or links to a page that is still a draft.
6. Open a PR to `release-10-2026`, merge, and let Netlify redeploy.
7. Check the live page: it shows the "Reviewed by" line, appears in `/sitemap.xml`, and is listed in the Conditions menu, the footer, `/physiotherapy/` and `/services/`.
8. In Google Search Console, inspect the URL and request indexing.

Links from other pages switch over automatically: old `/orthopedic-physiotherapy/#...` anchors resolve to the new page once it is live (`src/content/futureRoutes.ts`).

To unpublish, set `clinicallyReviewed: false` (or switch the flag off) and redeploy.

## Publishing P2 pages

The P2 hubs, FAQs and guides publish themselves. `src/lib/publishable.ts` is the single rule set, and the sitemap, nav, footer, breadcrumbs and `pnpm check-links` all read it. A page that fails its rule still builds as `noindex`, is left out of the sitemap and is never linked.

| Page | Goes live when |
| --- | --- |
| `/conditions/` | At least 3 condition pages are live |
| `/rehabilitation/` | At least 2 rehab or sports pages are live |
| `/faqs/` | At least 8 general questions have confirmed answers (`src/content/faqs.ts`) |
| `/resources/` and `/resources/<slug>/` | The index needs 1 reviewed guide; each guide needs `clinicallyReviewed: true` and `reviewedAt` |
| `/physiotherapy-at-home/` | `homeVisits` is on in `flags.ts` **and** `clinicallyReviewed: true` in `src/content/homeVisit.ts`. With the flag off the route is a 404 and the booking form has no home option |
| `/reviews/` | Always live |
| `/review/`, `/review/print/` | Never indexed. Share the link with staff only |

Before switching on `homeVisits`: the clinic supplies `homeVisitArea` in `clinic.ts` and confirms every answer in `homeVisit.ts`. Then run the migration `supabase/migrations/0002_home_visit.sql` in Supabase **before** deploying, because the booking form writes a `home_address` column. The privacy policy mentions the address automatically once the page is live.

Curated review quotes in `src/content/reviews.ts` show only after `consentRecordedAt` is set. Neither quote there now has consent recorded.

## Go-live checklist

Run `pnpm launch-report` against `pnpm start` (and `pnpm audit:site` first for Lighthouse and axe). Read `LAUNCH_REPORT.md` and fix anything it flags.

1. **Migrations.** Run every file in `supabase/migrations/` in order on the production project.
2. **Environment.** Set the variables in `.env.example` on Netlify (Supabase, Resend, Turnstile, analytics IDs). Set `CONTEXT=production` only on the production deploy so draft banners stay off.
3. **Search Console sitemap.** Submit `https://smartphysioplus.com/sitemap.xml`. After each batch of newly published pages, resubmit it and check "Pages" for errors.
4. **Request indexing.** In URL Inspection, request indexing for each newly published page: the hubs, `/reviews/`, `/faqs/`, and each reviewed condition, rehab page and guide. Do a few per day. Do not request `/review/` or `/review/print/`.
5. **Google Business Profile.** Set the website link to `https://smartphysioplus.com/` and the appointment link to `https://smartphysioplus.com/book-appointment/`. Check the phone, address and hours match `src/content/clinic.ts`.
6. **Retire the old Grexa microsite.** Point it to the new site with a permanent redirect, or take it down. Do not leave two live sites with the same clinic details.
7. **`.in` to `.com` redirect.** Make the `.in` domain redirect permanently (301) to the matching path on `smartphysioplus.com`, including `www`. Check one deep link.
8. **Rich Results Test.** Paste each live URL into https://search.google.com/test/rich-results. Expect zero errors. There must be no Review or AggregateRating anywhere.
9. **Weekly review rhythm.** Ask for Google reviews at a steady 3 to 5 a week, never in a burst. Ask every patient in the same way, with the card or the WhatsApp template on `/review/`. No review gating, no incentives, no suggested wording. Reply to every review using `REVIEW_REPLIES.md`. Once a week, check new reviews and ask the patient's permission before adding any quote to `reviews.ts`.
10. **After launch.** In Search Console, watch Core Web Vitals field data (INP is only measured there) and indexing for two weeks.
