# Privacy

DayTrail is designed as a local-first, metadata-first work memory app.

## Default Capture Policy

- Screenshots: off.
- Full clipboard text: off.
- Browser capture: title, domain, and redacted URL.
- Editor capture: app, workspace/project, active file metadata, and optional content hash only when enabled by the editor bridge.
- Terminal capture: current directory and redacted command metadata.
- AI capture: observed tool/provider usage and source-backed output records when detectable.
- Calendar context: event title, location, start/end time, status, and attendee
  count when a local integration/import supplies events. DayTrail does not claim
  external calendar sync unless that connector is explicitly installed.
- Idle recovery: away/resume gaps and user classifications such as meeting,
  call, lunch, errand, ignored time, or custom notes.
- Focus Mode: local foreground app/title/url metadata is compared against
  distraction rules during an active focus session. Nudges are local
  notifications; DayTrail does not block apps or send focus activity anywhere by
  default. Persisted focus timer sessions store goal/project/task labels, target
  duration, elapsed time, status, and drift summary.

## Data Location

The desktop app stores data in a local SQLite database in the OS application data directory. Browser/editor/terminal bridges write local metadata that is ingested by the desktop app.

## AI Execution

AI analysis runs only when the user asks for reports, weekly digests, or other
analysis. API keys are stored in the OS keychain where supported. Before AI
execution, DayTrail applies configured redaction to context sent to the provider.

Focus Mode does not require an AI provider. Its current distraction detection is
local and rule-based.

## What Not To Store

Do not use DayTrail to capture secrets, regulated personal data, passwords, tokens, private keys, or confidential content unless your organization has explicitly approved that capture policy.

## Exports

Exports may include app names, window titles, project paths, domains, redacted
URLs, timestamps, notes, calendar event metadata, idle classifications, focus
session summaries, generated reports, and AI usage evidence. Review exports
before sharing them outside your organization.
