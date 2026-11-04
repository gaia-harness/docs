---
paths:
  - 'src/content/docs/**'
---

# Writing Docs Pages

Read `~/Development/gaia-react/studio/branding/VOICE.md` before writing any docs copy. This rule adapts it to docs. Before committing, read every added line against VOICE.md and this rule; the `voice-check` greps are a tripwire, not the review.

## Voice: docs adaptation

Studio's `VOICE.md` covers marketing, docs, and in-app strings together. For docs specifically:

- **Reference register, not pitch register.** Procedural and declarative. "Run `/gaia-cleanse` to review memory and auto-loaded files." Not "Unleash the power of `/gaia-cleanse`."
- **Voice rules still apply.** No em dashes anywhere. No AI tells (delve, tapestry, leveraging, seamless, robust, powerful). No borrowed-field jargon (substrate, paradigm, ecosystem, fabric). No explanatory colons in drafted prose, table cells included. Grep for `—` before publishing.
- **Plain language.** Readers are engineers, but their experience varies widely. Explain in everyday words, keep jargon and internal vocabulary to a minimum, define an unavoidable term the first time a page uses it, and split long sentences. Plainer is often shorter; it never drops a fact.
- **Concrete over vague.** Real command names, real flags, real file paths, real numbers. Not "various options."
- **Code blocks are honest.** Examples should run. If a snippet won't work as written, it doesn't belong.
- **No "we" / "our team."** Either declarative ("GAIA installs…") or second-person instructional ("Run `pnpm install`…"). "Built by Steven Sacks" stays in marketing surfaces, not docs.

## Tight pages (load-bearing)

Every page says only what the reader needs, in the fewest words. Draft short, then cut again: a first "tightened" draft still carries too much.

- **GAIA only.** Say what GAIA does with a third-party tool and link to its docs for how the tool works (Claude Code auto mode, the sandbox, Corepack). Never restate them.
- **One home per explanation.** Getting-started pages stay short and link to the reference page that holds the detail. Tool installs and versions live on `reference/tools.mdx`.
- **One kind of thing per reference page.** Gates are checks that stop something. Content that is not a gate goes elsewhere; when it has no home, make a page.
- **Write for a new reader.** Never use a GAIA name (`GAIA-Audit`, "the audit") as if the reader already knows it. Say what it does for them and link the term.
- **Cut what the reader cannot see or act on.** Internal steps, exact console output, things replaced before the reader ever saw them, rare recovery paths, reassurance clauses.
- **The reader's words, not the source's.** Numbered steps, not "Phase: x". "Statusline", not "statusline left side". Say "API" when the source says "backend" but means the API.
- **Never overstate a requirement.** Recommended is not required. Present a default as a tradeoff, not a warning (the sandbox is opt-in, not "not recommended"). Check every "needs" or "requires" against the source.
- **GAIA leads.** Put what GAIA does first, then the third-party setting it replaces ("GAIA's `/update-deps` fixes vulnerable packages… Dependabot alerts stay on, but…").
- **GAIA or Claude, by who drives it.** GAIA is the subject when a GAIA rule, hook, gate, or workflow makes the step happen ("GAIA runs the checks"). Claude is the subject only for what Claude does on its own ("everything Claude writes"). Full rule in `VOICE.md`.
- **Say `main`, not "default branch".** Readers think in `main` (or `master`); "default branch" makes them translate. Name `main` and let `master` users infer it.
- **A link beats a sentence.** Point at the section that explains why instead of summarizing it.
- **Same shape across pages.** Command pages walk through numbered steps under `## The flow`.

## Prompts over terminal commands (load-bearing)

Readers work by asking Claude. They never read GAIA's source or scripts. Every page holds to these rules:

1. **Define every term the reader meets.** A config key, file, script name, or internal mechanism gets an everyday explanation the first time a page uses it, or a link to the page that owns it. If the reader does not need it to act, cut it. Example of the failure: "a file that is not listed under `unowned:`" with no word on what `unowned:` is.
2. **Give a Claude prompt, not a terminal command, whenever Claude can do the job.** Write it as a ` ```text ` block the reader pastes, with placeholders in `<angle brackets>`. A terminal command stays only when it must run outside Claude: `npx create-gaia`, `claude update`, `/clear`, a typed slash command, a typed grant line (`audit-grant`, `audit-accept`), an env var set before launching Claude, a step that asks for a sudo password, or something Claude is blocked from by design (`.env` secrets, `.gaia/local/protected/`, `git reset --hard`). The sentence says why the reader runs it themselves.
3. **Never hand the reader work Claude does or should do.** If GAIA already does it, say so ("GAIA runs the roster check after the change"). If nothing does yet, describe current behavior honestly, give a prompt, and route the product gap to `gaia/` as an issue. Never write "nothing runs it for you, run it by hand" as the end state. Never claim automation that does not exist.
4. **Frame guards as steering for Claude, not work for the reader.** Most hooks and checks exist to keep Claude on the right path: the refusal reaches Claude, which does it the right way or fixes it and retries. Lead with that ("Claude shortens the title and tries again; nothing for you to do"), then say why the guard exists if it helps. Words like refused, blocked, denied, rejected, or halted, left on their own, read as extra work for the reader. Only a few guards actually stop for the reader (a human-only grant, a credential or password, an approval prompt, something Claude is forbidden from by design); say plainly that those are the reader's and what to do.
5. **Call the reader "you".** When the point is "you, not Claude", write "you" ("Only you can answer"), not "a person", "a human", "someone", or "the user". Keep a third party only when it really is someone else (a teammate already working on an issue, a repo admin, a reviewer).

User-only commands (`disable-model-invocation`) cannot be started by asking in plain language; pages say the reader types them. No `Source: .claude/...` footers pointing readers at workflow source. The `voice-check` skill (check 11) flags violations.

## Adjacent surfaces

Name the user-visible behavior, not the mechanism. Before writing about an adopter command, hook, skill, or wiki page, check whether a name from `.claude/audit/do-not-document.yml` appears in the source you're documenting; if so, mute it at write time. The current surfaces (the usage ping, the local usage ledger, the removed mentorship layer) and how to word each are in `.claude/audit/adjacent-surfaces.md`.

## Verifying a page

1. **Identify the audience.** Adopter pages live at the top of `src/content/docs/`, contributor pages under `src/content/docs/contributors/`.
2. **Adopter pages**: verify against the adopter-shipped subset only. Read `.gaia/release-exclude` first; if the path you're about to cite is excluded, the claim is a leak; kill it. Treat content inside `<!-- gaia:maintainer-only:start --> ... <!-- gaia:maintainer-only:end -->` blocks in shipped files as nonexistent. `.claude/audit/gaia-surface.md` lists what ships.
3. **Contributor pages**: the full `gaia/` tree is fair game.
4. Find the supporting code: app code in the frontend package, root harness in `gaia/.claude/` (rules, skills, hooks, agents, commands), frontend harness in the frontend package's `.claude/` (read its `CLAUDE.md` first).
5. If `gaia/wiki/` has a page, read it for context, but treat the source as authoritative if they conflict.
6. Run-or-read the actual file to confirm behavior matches what you're about to write.
7. Cite version-specific behavior with the gaia version it was verified against where it matters.

If a claim can't be grounded in the source, don't write it. Open a question instead. Before publishing a new or substantially edited page, run the `docs-audit` agent, the `voice-check` skill and `pnpm build`.
