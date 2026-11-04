# GAIA Docs

Public technical documentation for GAIA. Starlight (Astro). Served at docs.gaiaharness.com. Deployed to Cloudflare Workers (static assets, `wrangler.jsonc`) on push to `main`.

## Response style

Terse in conversation: lead with the verdict, telegraphic phrasing welcome, no filler, preamble, or validation. Brevity cuts filler, never coverage. Docs pages and substantial copy stay complete.

Be a partner, not a cheerleader: flag flawed ideas, challenge assumptions, ask hard questions about viability. Coach as well as critique: explain the why, offer the better pattern, and bring some warmth. Relentless pushback wears thin. The goal is to enjoy the work and do great work together.

## What this project is (and is not)

- **Is**: public-facing technical reference: how GAIA works, how to install it, how to use rules / hooks / skills / commands / agents, configuration, troubleshooting.
- **Is not**: marketing. Hero copy, positioning, pricing, "why GAIA", landing-page narrative all belong in `~/Development/gaia-react/website/`. Don't drift into pitch mode.
- **Is not**: strategy or roadmap. Public roadmap copy lives in `website/`. Internal strategy lives in `studio/`. Don't surface either here.

## Adopter docs vs contributor docs (load-bearing)

GAIA has two audiences and the docs must keep them strictly separate:

- **Adopters**: people who ran `npx create-gaia my-app` and got a scaffolded project. They have only what shipped in the release tarball. They never run `/gaia-release`, never edit the CLI source, never see `.gaia/cli/health/`.
- **Contributors**: people working on the GAIA source repo itself, including the core maintainer (Steven) and any outside contributors. They have the full source, run releases, build the bundled CLI, run health audits, and have access to the full command and tooling surface.

**Public-facing term is "Contributors."** Internal source uses "maintainer-only" as a literal identifier (`gaia:maintainer-only` markers, `.gaia/release-exclude` comment text); keep that exact phrase when citing those mechanisms, but every user-facing surface (sidebar, URLs, page titles, prose) says "Contributors."

**Routing convention:**

- Adopter docs live at the top of `src/content/docs/`.
- Contributor docs live under `src/content/docs/contributors/`.
- The `/contributors/*` URL prefix is the audience signal. The sidebar groups them separately so adopters never wander into contributor territory.

**Source of truth for the split:** `~/Development/gaia-react/gaia/.gaia/release-exclude`. This file is the authoritative manifest of paths excluded from the adopter tarball. Read it before claiming anything ships or doesn't.

**Two exclusion mechanisms** (both stripped by `gaia release scrub` at release time):

1. **Path-level exclusion**: entire files / directories listed in `.gaia/release-exclude`.
2. **Block-level exclusion**: content between `<!-- gaia:maintainer-only:start -->` and `<!-- gaia:maintainer-only:end -->` markers inside files that DO ship. The shipped file is a subset of the source.

**The hard rule:** an adopter docs page must not reference any path, command, skill, agent, rule, or behavior that is excluded by either mechanism. A leak is a category-A failure, worse than a stale fact, because it signposts contributor-only content the adopter cannot have.

**The inverse rule (softer):** a contributor docs page should not duplicate what's already in the adopter docs. Cross-link instead.

**Never document** what `.claude/audit/do-not-document.yml` lists (obscurity by design), and mute the mechanisms `.claude/audit/adjacent-surfaces.md` names.

## Where the rest lives

| File | Holds | Loads |
|---|---|---|
| `.claude/rules/docs-writing.md` | Docs voice, tight pages, prompts over terminal commands, adjacent-surface muting, how to verify a page | When a file under `src/content/docs/` is read or edited |
| `.claude/rules/starlight.md` | Starlight conventions: sidebar, frontmatter, asides, assets, site config | When a file under `src/`, `public/`, or `astro.config.mjs` is touched |
| `.claude/rules/fenced-copy-paste-blocks.md` | How to hand the user something to paste | Always |
| `.claude/audit/gaia-surface.md` | What GAIA ships to adopters vs contributors, with the gaia SHA it was verified against (bump it at each release tag) | Read by `docs-audit`, `source-survey`, and you when checking what ships |
| `.claude/audit/adjacent-surfaces.md` | Shipped mechanisms the docs describe only by behavior (the usage ping, the usage ledger) | Read by `docs-audit` and before writing about them |

Before publishing a page: the `docs-audit` agent (facts and leaks), the `voice-check` skill (voice), and `pnpm build`.

## References

- **Brand voice**: `~/Development/gaia-react/studio/branding/VOICE.md`: read before writing any docs copy.
- **Brand identity**: `~/Development/gaia-react/studio/branding/IDENTITY.md`: read before writing copy that makes claims about what GAIA is or who it's for. Naming conventions live here.
- **Brand design**: `~/Development/gaia-react/studio/branding/DESIGN.md`: palette, typography, motion.
- **Product source**: `~/Development/gaia-react/gaia/`: **source of truth for what to document.** Verify every feature claim, command name, hook behavior, skill trigger, and config option against the actual code before publishing. Studio does not track gaia source: that's this project's job.
- **Product wiki**: `~/Development/gaia-react/gaia/wiki/`: start at `gaia/wiki/index.md`. Use it to discover what exists before reading the source; the source wins when they conflict.
- **Agentic Design audit**: `~/Development/gaia-react/studio/strategy/research/AGENTIC_DESIGN.md`: authoritative pattern-by-pattern evaluation. Consult before writing or revising any agentic-design page. Earlier "ReAct" / "four canonical patterns" framings are retired.

The `studio/` vault is the singular location for voice/branding/positioning knowledge. Don't copy any of it into this repo. Reference by path.

## Deploys

Pushes to `main` deploy via `.github/workflows/deploy.yml`. PRs from this repo upload a Cloudflare preview version; they never touch the live site.

## When in doubt

- Voice question → read `studio/branding/VOICE.md`.
- Feature-claim question → read the source in `gaia/`.
- Positioning / framing question → it probably belongs on `website/`, not here. Ask before drifting.
