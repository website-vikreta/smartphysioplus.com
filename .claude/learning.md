# Learning log
> Conventions and anti-patterns for Smart Physio+. Add an entry when a decision should outlive the session.

## Standing rules
- Never push to `main` or `release-10-2026`. Branch off `release-10-2026` per task: `feature/<task>` or `bug/<task>`.
- `promptP0.md` is the P0 spec. Facts only (§3); unconfirmed (§4) goes behind `TODO-CONFIRM` + a flag.
- No auth anywhere. NAP only in `src/content/clinic.ts`.
