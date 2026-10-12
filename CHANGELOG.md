# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] — 2026-10-12

### Added

- Responsive chrome for phones: the description is hidden, the title moves next to the back
  button, and the controls and skip button use a compact size.
- A settings menu (gear) with Display fit modes and a playback Speed control.
- `fit` prop (`contain`, `cover`, `fill`, `none`) controlling how the video fills the frame,
  defaulting to `cover`.
- `layout` prop (`both`, `fullscreen`, `expand`) choosing which view control the toolbar shows.

### Changed

- Surface interaction reworked: a single click now toggles the chrome between full and
  video-only instead of seeking; a double click seeks back/forward 10 s on the left/right
  third and toggles playback in the middle.
- Fullscreen and expanded view are now mutually exclusive.
- On phones the back button lives inside the top chrome and hides with the controls, and the
  large center play button is hidden.
- Entering fullscreen requests a landscape orientation lock where the browser supports it.

## [0.1.1] — 2026-10-10

### Fixed

- The dim overlay now fades out together with the auto-hiding controls instead of
  staying on for the entire playback.

## [0.1.0] — 2026-09-26

First release.

### Added

- `Player` component with a streaming-style chrome: title, description, auto-hiding control
  row, timeline with buffered range and hover preview, and a slim progress bar that stays
  visible while the controls are hidden.
- Content presets via `type`: `anime` (intro/outro skip plus episode navigation), `series`
  (episode navigation), and `movie` (neither). Individual flags can be overridden with
  `features`.
- Intro and outro segments rendered as markers on the timeline, with a skip button that
  appears in the chrome while inside the segment.
- VLC-style surface click zones: left third seeks back 10 s, right third seeks forward
  10 s, middle toggles playback, each with a transient on-screen cue shown on the side that
  was clicked. The seams are pinned by `tests/surface.test.ts`. A double click is treated
  as one action, so it seeks once instead of twice.
- Episode navigation with pill buttons and transient feedback.
- Fullscreen, expanded view, and picture-in-picture, with `view` acting as a declarative
  source of truth and browser-API failures caught and ignored.
- Keyboard controls: `Space`/`K`, `←`/`→`, `↑`/`↓`, `M`, `F`.
- Volume button that slides a slider out to its right, closing on outside click or
  `Escape`.
- Auto-advance to the next episode on `ended`, controllable with `autoAdvance`.
- Typed props, events, and controller, plus a `usePlayer` headless hook.
- ESM and CJS builds, bundled stylesheet, and TypeScript declarations.

### Notes

- `view="fullscreen"` on mount requires a user gesture to be granted by the browser, so it
  is declined on a cold page load. Use the fullscreen button for a guaranteed path.
- Colors are hardcoded rather than exposed as CSS custom properties. Theming is done by
  overriding the `cp-`-prefixed rules.
