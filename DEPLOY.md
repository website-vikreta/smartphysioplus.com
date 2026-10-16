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
