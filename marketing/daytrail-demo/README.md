# DayTrail Demo Video

Marketing demo built as a HyperFrames-compatible storyboard and rendered locally.

```bash
node marketing/daytrail-demo/render-demo-video.mjs
```

The checked-in public MP4 intentionally ships without synthetic narration. The default render uses a quiet audio bed because the macOS `say` preview voice sounds robotic in a marketing context.

Outputs:

- `marketing/daytrail-demo/storyboard.hyperframes.html`
- `marketing/daytrail-demo/voiceover.txt`
- `docs/videos/daytrail-demo.mp4`

For internal timing previews only, generate a temporary TTS guide track:

```bash
DAYTRAIL_DEMO_TTS=1 node marketing/daytrail-demo/render-demo-video.mjs
```

Do not ship the TTS guide track. Record a human read from `voiceover.txt` if the release needs narration.
