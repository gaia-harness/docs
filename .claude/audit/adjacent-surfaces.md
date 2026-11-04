# Adjacent surfaces

Some adopter-facing commands and wiki pages internally reference mechanisms listed in `do-not-document.yml` (this folder). When a docs page covers one of these surfaces, the page describes what the reader sees and does without naming the deferred or obscured mechanism behind it.

**The rule:** name the user-visible behavior, not the mechanism.

Read by the `docs-audit` agent at start, and by any writer before documenting an adopter command, hook, skill, or wiki page that touches a surface below.

## Current adjacent surfaces and how to handle them

- **The usage ping** (`gaia ping`, sent by `/gaia-init`, `/setup-gaia`, `/update-gaia` and the 2.0.0 migration). Documented as opt-out on the Telemetry page (`reference/telemetry.mdx`), which lists the three events and the categorical fields each adds: one fire-and-forget POST to telemetry.gaiaharness.com (2.2.0 on; 2.0.x and 2.1.x post to telemetry.gaiareact.com, which stays live) with a few categorical fields, a pseudonymous per-install `projectId`, the GAIA version and a coarse platform, never paths or free text, turned off with `GAIA_TELEMETRY_PING_DISABLE=1`. From 2.3.1 `projectId` is a random UUID in `.gaia/local/.install-id` (rotated once from the old path-hash `.project-id`); the page says so (maintainer decided 2026-10-30). Describe it in those terms only; do not document the server side or the payload schema beyond that.
- **The local usage ledger** (`.gaia/local/telemetry/usage.jsonl`) is documented on `reference/cost.mdx`. It is local-only and is not the ping.
- The 1.x mentorship layer (and its `gaia mentorship` verbs, display rule and opt-in step) is removed in 2.0.0. Do not describe it; mention its removal only where the CHANGELOG makes it adopter-actionable.

## Distinct from the leak rule

A leak is citing a *contributor-only path* in adopter docs (worse: out-of-bounds entirely). Adjacent-surface muting is citing an *adopter-shipped* mechanism the project has decided not to surface yet (deferred / obscurity-by-design). Both are reportable, but adjacent-surface mentions are easier to overlook because the source path is technically fair game.
