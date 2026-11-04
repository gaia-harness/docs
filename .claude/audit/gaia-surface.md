# GAIA's actual surface

Verified against gaia `86f47ad3` (v2.3.1 tag), 2026-10-30, GAIA 2.3.1. Volatile: re-check before publishing. When this file disagrees with `.gaia/release-exclude` or the source, the source wins. At each release tag, bump the SHA above and refresh the lists.

Read by the `docs-audit` agent and the `source-survey` skill at start, and by anyone checking whether something ships.

GAIA 2.0.0 is a pnpm workspace: the shared harness at the root (`.claude/`, `.gaia/`, `.githooks/`, `.github/`, `wiki/`, root `CLAUDE.md`) and the React app plus its frontend-only harness in `frontend/` (`frontend/app/`, `frontend/.claude/{rules,skills,agents}`, `frontend/CLAUDE.md`). Every 1.x `app/...` path is now `frontend/app/...`. Releases ship as `gaia-bundle-<tag>.tar.gz` with a `.sha256`.

**Layer 1: slash commands** at `gaia/.claude/commands/*.md`:

| Adopter | Contributor-only |
|---|---|
| `/gaia-init`, `/setup-gaia` (replaces `/setup-gaia-ci` and `/setup-cloned-gaia-project`), `/gaia-spec`, `/gaia-plan`, `/gaia-debt`, `/gaia-residue`, `/gaia-cleanse` (was `/gaia-audit`), `/gaia-codify` (was `/gaia-harden`), `/gaia-fitness`, `/gaia-forensics` | `/gaia-release`, `/distribution-vet` |

User-only commands set `disable-model-invocation` (`/gaia-init`, `/setup-gaia`, `/gaia-fitness`, `/gaia-forensics`, `/gaia-codify`, `/gaia-residue`). `/health-audit`, `/gaia-handoff` and `/gaia-pickup` are removed.

**Layer 2: skills.** Root `gaia/.claude/skills/*/SKILL.md`: `gaia-wiki`, `update-deps`, `update-gaia` (skill-backed slash commands), `file-tech-debt`, `naming-conventions`, `tdd`, plus the `gaia/` references folder (no slash entry). Frontend `gaia/frontend/.claude/skills/`: `a11y-fixes`, `eslint-fixes`, `gaia-react-perf`, `new-component`, `new-hook`, `new-route`, `new-service`, `playwright-cli`, `react-code`, `skeleton-loaders`, `tailwind`, `tdd-react`, `typescript`. `react-doctor` installs per machine under `frontend/.claude/skills/` (gitignored). Frontend runbooks Claude follows on request live in `gaia/frontend/.claude/instructions/` (`add-locale.md`, `remove-i18n.md`; both are deleted when i18n is removed). Contributor-only: the `release-notes` skill.

**Layer 3: workflow references** at `gaia/.claude/skills/gaia/references/`: `spec.md` (+`spec/`), `plan.md` (+`plan/`), `fitness.md`, `cleanse.md` (+`cleanse/`), `codify.md`, `debt.md` (+`debt/`), `residue.md`, `forensics.md` (+`forensics/`), `wiki.md` (+`wiki/`), `setup/`, `isolation.md`, `work-lifecycle.md`, `cost-record.md`. Contributor-only blocks inside them are marked `gaia:maintainer-only`.

spec-kit is gone: no `.specify/`, no `speckit.*` commands. The spec lifecycle lives in `.gaia/scripts/spec/`, `.gaia/templates/spec/` and `references/spec/`. Specs, plans and research live in the gitignored `.notebook/` at the main checkout.

**Layer 4: bundled CLI** at `gaia/.gaia/cli/gaia` (ships): `scaffold`, `react-perf reduce`, `wiki` (state, commit-classify, state-init, state-bump, log-prepend, page-index, orphans, near-collisions, dead-paths, frontmatter, empty-sections, broken-links, chain), `fitness`, `labels sync`, `packages sync-settings`, `migrate-csf4` (2.3.0), `codify-ledger`, `codify-tally`, `update`, `update-deps`, `init`, `setup`, `sandbox`, `ping`, `residue-tally`, `residue-cursor`, `residue-record`. `gaia --help` is authoritative. The release namespace lives only in `.gaia/cli/gaia-maintainer` (contributor-only). CLI source (`.gaia/cli/src/`, `test-fixtures/`, configs) and `.gaia/cli/health/` are contributor-only.

**Layer 5: supporting machinery**:

| Surface | Adopter-shipped | Contributor-only |
|---|---|---|
| Hooks (`.claude/hooks/*.sh`, registered in `.claude/settings.json`; `frontend/.claude/settings.json` is generated from it plus an overlay) | All shipped: guards (`block-*`, `pr-merge-audit-check`, `red-verify-commit-check`, `worthiness-presence-check`, `audit-loop-bound`), recorders and context injectors, `provision-worktree`, `usage-capture`, `wiki-session-start` | none |
| Native git hooks (`.githooks/`) | `pre-commit`, `commit-msg` | `pre-push` |
| Rules | Root `.claude/rules/` (ambient-context-resolution, bats-assertions (2.3.0), code-comments, coding-guidelines, context-discipline, fenced-copy-paste-blocks, file-placement, generated-files (2.1.0), guards-must-fail, issue-claim, issue-writing (2.3.0), no-abbreviations, pr-merge, quality-gate, shell-cwd, subagent-dispatch, user-questions, wiki-style, working-doc-ids); frontend `frontend/.claude/rules/` (accessibility, api-service, coding-guidelines-react, design-baseline, i18n, playwright, ports, react-router-docs, routes, shadcn-ui, state-pattern, storybook, tailwind) | `.claude/rules/maintainers/` |
| Agents (`.claude/agents/`) | `code-audit-frontend` (+ `frontend/.claude/agents/code-audit-frontend/` extensions), `code-audit-github-workflows`, `code-audit-shell` (2.3.0), `audit-loop-unit`, `audit-light-reviewer`, `audit-refuter`, `audit-rule-specialist`, `worthiness-evaluator`, `uat-fidelity-judge`, `fitness-judge` | `code-audit-maintainer-node`, `code-audit-maintainer-shell` |
| CI workflows (`.github/workflows/`) | `tests.yml` (from 2.3.0 also the `Shellcheck and bats` job; `"shellcheck": false` in `.gaia/project.json` turns off only its lint, bats still runs), `chromatic.yml`, `pr-conventions.yml` (advisory) | `release.yml`, `cli-tests.yml`, `audit-ci-tests.yml`, `distribution-harness.yml`, `shell-lint.yml`, `forensics-triage.yml`. No Claude-on-Actions workflow exists any more (GAIA CI is removed). |
| Wiki (`gaia/wiki/`) | most of `modules/`, `concepts/`, `decisions/` | `entities/`, `meta/`, and the individual pages `.gaia/release-exclude` lists (Release Workflow, Release-Notes, Bundle-time Scrub, CLI-Binary-Split, Folding Shell Scripts into the CLI Binary, Forensics Triage Workflow, Sharded CI Test Matrix, Shell Guard Fixture Discrimination, Local Test Runtime, Dependabot as a Data Source), plus every `gaia:maintainer-only` block |
| Governance | `.gaia/templates/README.md` (regenerated at scaffold), `.gaia/LICENSE` (GAIA's MIT notice, scoped to GAIA-provided files; from 2.2.0) | repo `README.md`, `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORTERS.md`, `.github/CODEOWNERS`, `.github/ISSUE_TEMPLATE/`, `.github/pull_request_template.md`, `.github/FUNDING.yml`, `.gaia/project.json` |

**Things that are protected by obscurity (do NOT document anywhere public):** CLI subcommand names beginning `_internal-`, and the `gaia-maintainer release*` subcommand list. The mentorship layer is removed in 2.0.0, so its old protections are moot. See `do-not-document.yml` in this folder.

When in doubt, grep `.gaia/release-exclude`. When a wiki page itself ships but contains `gaia:maintainer-only` blocks, treat those blocks as nonexistent for adopter purposes.
