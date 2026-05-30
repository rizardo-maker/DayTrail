# DayTrail

Local-first work memory for the modern desktop.

DayTrail records lightweight metadata from your apps, browser tabs, editors,
terminal sessions, and AI tools so you can reconstruct the day without running
a timer or writing status notes from memory.

Use it to answer:

- What did I work on today?
- Which app, project, site, file, or chat took time?
- Where did AI tools help?
- What should go into my daily update, client note, or review summary?
- Is capture healthy, or did a permission / integration break?

> Status: pre-1.0. macOS has been exercised manually. Windows installers build
> in CI and pass automated checks, but a real Windows smoke test is still
> required before a signed public release.

[![Windows Build](https://github.com/varaprasadreddy9676/DayTrail/actions/workflows/windows-release.yml/badge.svg)](https://github.com/varaprasadreddy9676/DayTrail/actions/workflows/windows-release.yml)
[![macOS Build](https://github.com/varaprasadreddy9676/DayTrail/actions/workflows/macos-release.yml/badge.svg)](https://github.com/varaprasadreddy9676/DayTrail/actions/workflows/macos-release.yml)

## Why Try It

DayTrail is for people whose work moves across too many places to remember
cleanly at the end of the day: IDEs, browser tabs, terminals, Slack, meetings,
AI chats, issue trackers, documents, and internal tools.

Instead of asking you to manually start and stop timers, DayTrail builds a local
activity trail from system metadata. You can inspect a 24-hour timeline, drill
into an hour, tag meetings or offline work, review AI usage, and generate a
source-backed daily report.

The goal is not surveillance. The goal is a private work memory that helps you
write better updates, recover context faster, and notice when important work was
missed.

## Screenshots

The README expects release screenshots in `docs/screenshots/`. Before publishing
the public page, add these six PNG files at about 1400px wide.

### Today Dashboard

![Today dashboard showing current work, daily stats, selected hour, and timeline](docs/screenshots/01-today.png)

The Today view gives a quick answer to "what happened today": current capture,
time tracked, active apps, AI time, selected-hour details, and a compact
24-hour timeline.

### AI Impact

![AI Impact view showing per-tool usage and AI-assisted work](docs/screenshots/02-ai-impact.png)

AI Impact separates AI-assisted time from normal app usage, making it easier to
see when tools like ChatGPT, Claude, Codex, or editor assistants were part of
the work.

### Activity Breakdown

![Activity view showing app and context breakdown](docs/screenshots/03-activity.png)

Activity groups the day by app, project, folder, website, and tool so you can
move from a broad app total into the actual context behind it.

### Timeline And Hour Drilldown

![24-hour timeline and hour drilldown showing app-level detail](docs/screenshots/04-timeline.png)

The 24-hour timeline supports active-hour filtering, hour drilldown, manual
meeting / offline work tagging, and app-level details when you need to explain a
specific block of time.

### Daily Report

![Generated daily report with source-backed summary and export options](docs/screenshots/05-reports.png)

Reports turn captured facts into a practical daily summary that can be copied or
exported without inventing work that was not captured.

### Capture Health

![Capture health settings showing permission and integration status](docs/screenshots/06-capture-health.png)

Capture Health shows whether app tracking, browser tabs, editor projects,
terminal folders, AI tools, and privacy settings are working. When something
breaks, the app should tell you where to fix it.

## What It Captures

DayTrail is metadata-first. By default, it focuses on enough context to explain
work without storing private content unnecessarily.

- Apps: foreground app, window title, active duration.
- Browsers: supported browser tab title, domain, and redacted URL when the
  browser allows automation.
- Editors: project / workspace, active file metadata, and folder context from
  editor integrations.
- Terminals: shell working directory and commands when shell integration is
  installed.
- AI tools: detected AI apps, browser tools, editor assistants, and terminal
  agents.
- Manual context: meetings, offline work, client / project / task labels, and
  billable flags.

## What It Avoids

- Screenshots are off by default.
- Clipboard content is not stored.
- Browser URLs are redacted before storage where possible.
- API keys should be stored in the OS keychain / credential store, not committed
  to the repo.
- Generated reports are based on captured local facts and user-approved AI
  provider settings.

See [PRIVACY.md](PRIVACY.md) for the full privacy model.

## How It Works

1. The desktop app samples active work metadata.
2. Browser, editor, and terminal bridges add deeper context where installed.
3. DayTrail groups events into sessions, hours, apps, projects, sites, and AI
   usage.
4. You can tag gaps, meetings, or current work context manually.
5. Reports summarize the captured facts and keep the source trail visible.

## Setup For A Real Trial

1. Install the desktop app.
2. Grant macOS Accessibility permission or the Windows equivalent when prompted.
3. Enable browser automation / extension support if you want tab titles and
   domains.
4. Install editor and terminal integrations if you want project, file, folder,
   and command context.
5. Add an optional AI provider in Settings if you want generated reports.
6. Leave DayTrail running from startup so the day is captured automatically.

DayTrail is most useful after one full workday of capture.

## Platform Status

| Platform | Status |
| --- | --- |
| macOS | Primary development target. Manual install, permissions, tray, capture, and reporting flows have been exercised. |
| Windows | Backend support, startup registration, credential storage, terminal bridge scripts, and installer builds are implemented. CI produces NSIS and MSI installers. Real Windows smoke testing is still required before production publishing. |
| Linux | Not a release target yet. Some Tauri pieces may work, but capture behavior is not validated. |

## Repository Layout

```text
apps/desktop/              Tauri desktop app, Rust capture backend, React UI
apps/browser-extension/    Browser extension for tab context
apps/vscode-extension/     VS Code / editor bridge
scripts/                   Build, release, bridge, and verification scripts
docs/                      Supporting docs and screenshot assets
```

## Development

Requirements:

- Node.js 20+
- npm
- Rust stable
- Tauri platform prerequisites for your OS

Install desktop dependencies:

```bash
npm ci --prefix apps/desktop
```

Run the desktop app in development:

```bash
cd apps/desktop
npm run tauri dev
```

Run the main quality gate:

```bash
npm run release:check
```

Useful targeted checks:

```bash
npm run desktop:check
npm run desktop:test
npm run browser-extension:check
npm run vscode-extension:check
npm run test:scripts
```

## Build Installers

macOS unsigned local build:

```bash
npm run desktop:dmg
```

Windows installer build from Windows:

```powershell
npm run desktop:windows
```

The Windows CI workflow also builds installer artifacts. See [RELEASE.md](RELEASE.md)
for the full release checklist, signing notes, and manual verification steps.

## Documentation

- [PRIVACY.md](PRIVACY.md) explains local storage, metadata capture, redaction,
  exports, and AI provider behavior.
- [SECURITY.md](SECURITY.md) explains how to report security issues.
- [RELEASE.md](RELEASE.md) lists the release verification checklist.
- [docs/screenshots/README.md](docs/screenshots/README.md) defines the public
  screenshot set used by this README.
- `docs/functional-requirements.txt`, `docs/technical-requirements.txt`, and
  `docs/design-guide.txt` are product targets and backlog references, not a
  guarantee that every listed item has shipped.

## License

Licensed under MIT OR Apache-2.0. See [LICENSE](LICENSE),
[LICENSE-MIT](LICENSE-MIT), and [LICENSE-APACHE](LICENSE-APACHE).
