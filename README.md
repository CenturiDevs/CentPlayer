# centplayer

A streaming-style video player for React. No runtime dependencies beyond React itself.

- Content-aware controls — `anime`, `series`, and `movie` each get a different set
- Intro/outro segments with timeline markers and a skip button
- Click-to-focus surface with double-click seeking, like YouTube
- Fullscreen, expanded view, and picture-in-picture
- Display fit modes (fit, expand, stretch, original) and playback speed
- Auto-hiding controls with a minimal progress indicator
- Timeline scrubbing, hover preview, buffered range, keyboard seeking
- Ships ESM, CJS, and TypeScript declarations
- ~8.6 kB gzipped, stylesheet included

## Install

```sh
npm install centplayer
```

React 18 or 19 is required, along with `react-dom`, both as peer dependencies.

## Usage

```tsx
import { Player } from "centplayer";
import "centplayer/style.css";

export function Watch({ onNextEpisode }: { onNextEpisode: () => void }) {
    return (
        <Player
            src="/episode-1.mp4"
            type="anime"
            title="One Piece"
            description="Pirates sail the Grand Line in search of the One Piece."
            intro={{ start: 82, end: 172 }}
            outro={{ start: 1382, end: 1440 }}
            onNext={onNextEpisode}
        />
    );
}
```

The stylesheet ships separately so it can be cached and overridden. Import it once in your app entry.

## Content types

`type` selects a feature preset. Pass `features` to override any part of it.

| type     | intro/outro skip | episode navigation |
| -------- | ---------------- | ------------------ |
| `anime`  | yes              | yes                |
| `series` | no               | yes                |
| `movie`  | no               | no                 |

It defaults to `movie`, which is the plain player with no intro or episode controls.

```tsx
<Player src="/movie.mkv" features={{ episodeNavigation: true }} />
```

Title, description, and the back button are independent of `type` and render whenever you pass them.

## Props

| prop          | type                               | default     | notes                                            |
| ------------- | ---------------------------------- | ----------- | ------------------------------------------------ |
| `src`         | `string`                           | —           | Required. Changing it resets the player.          |
| `poster`      | `string`                           | —           | Shown before playback starts.                    |
| `type`        | `"anime" \| "series" \| "movie"`     | `"movie"`   | Selects the feature preset.                      |
| `title`       | `string`                           | —           | Uppercase heading; above the controls, or beside the back button on phones. |
| `description` | `string`                           | —           | Clamped to two lines; hidden on phones.           |
| `intro`       | `Segment`                          | —           | `{ start, end }`. Enables the marker and skip.    |
| `outro`       | `Segment`                          | —           | `{ start, end }`. Enables the marker and skip.    |
| `features`    | `Partial<PlayerFeatures>`          | —           | Merged over the preset for `type`.                |
| `view`        | `"default" \| "expanded" \| "fullscreen"` | `"default"` | See [View](#view).                      |
| `layout`      | `"both" \| "fullscreen" \| "expand"` | `"both"`    | Which layout control shows in the toolbar.       |
| `fit`         | `"contain" \| "cover" \| "fill" \| "none"` | `"cover"` | How the video is fitted. See [Display and settings](#display-and-settings). |
| `autoPlay`    | `boolean`                          | `false`     | Subject to browser autoplay policy.               |
| `autoAdvance` | `boolean`                          | `true`      | Calls `onNext` when playback ends.                |
| `muted`       | `boolean`                          | `false`     | Changing it does not reset playback.              |
| `startAt`     | `number`                           | `0`         | Applied once, when the source loads.              |
| `className`   | `string`                           | `""`        | Appended to the root element.                     |

### Callbacks

| callback                        | signature                     |
| ------------------------------- | ----------------------------- |
| `onPlay`                        | `() => void`                  |
| `onPause`                       | `() => void`                  |
| `onEnded`                       | `() => void`                  |
| `onTimeUpdate`                  | `(currentTime, duration) => void` |
| `onSeek`                        | `(time) => void`              |
| `onVolumeChange`                | `(volume) => void`            |
| `onSkipIntro` / `onSkipOutro`   | `() => void`                  |
| `onPrevious` / `onNext`         | `() => void`                  |
| `onBack`                        | `() => void`                  |

- `onTimeUpdate` is throttled to roughly every 250 ms during playback, and also fires on pause and seek.
- `onVolumeChange` fires on mute and unmute too, reporting `0` while muted.
- `onBack` falls back to `history.back()` when you omit it.
- `autoAdvance` needs `onNext` to do anything.

## View

`view="expanded"` switches to the taller expanded layout. It applies immediately, with no gesture required.

`view="fullscreen"` requests fullscreen. Browsers only grant this from a user gesture, so it succeeds when the player mounts as a result of a click and is silently declined on a cold page load. Rejections are caught and ignored, so nothing throws. Use the fullscreen button when you need a guaranteed path.

Expanded view and fullscreen are mutually exclusive. Entering one leaves the
other, so the two layouts never fight over the frame. Entering fullscreen on a
phone also asks the browser to lock the screen to landscape.

`layout` picks which of the two controls the toolbar shows. Leave it at `"both"`
for the default, or set `"expand"` or `"fullscreen"` to expose only one button.

```tsx
<Player src="/movie.mkv" layout="expand" />
```

`view` is the source of truth when it *changes*. Toggling expanded mode by hand still works until `view` changes again.

## Interaction

A single click anywhere on the video toggles the chrome. Tap once to hide every
control for a clean, video-only view, then tap again to bring them back. This is
the main gesture on phones, where there is no pointer to move.

Playback and seeking live on double click so a stray tap never skips. The left
third seeks back 10 seconds, the right third seeks forward 10 seconds, and the
middle pauses or plays. Each seek shows a brief on-screen cue on the side you
double-clicked.

| key           | action       |
| ------------- | ------------ |
| `Space` / `K` | play / pause |
| `←` / `→`     | seek ∓10 s   |
| `↑` / `↓`     | volume ±5 %  |
| `M`           | mute         |
| `F`           | fullscreen   |

Clicking the volume button slides a slider out to its right, pushing the rest of the control row left to make room. It closes on outside click or `Escape`.

While playing, the controls fade out after 3 seconds of inactivity and return on pointer movement or the next tap. A 3 px progress bar stays visible behind them. Pausing keeps the controls up. The back button hides and returns with the rest of the chrome. On phones the title sits beside the back button in that top bar; on desktop it stays above the controls.

## Display and settings

The gear button opens a settings sheet:

- **Display** — how the video is fitted: `Fit to screen` (letterboxed),
  `Expand to fit` (fills the frame and crops), `Stretch`, or `Original`. The
  default is `Expand to fit`; set it with the `fit` prop.
- **Speed** — playback rate from 0.5× to 2×.

On phones the sheet opens as a bottom sheet so it never runs off a short,
portrait player. The description under the controls is hidden on phones, and the
controls shrink so the whole row keeps fitting.

## Styling

The component ships one stylesheet with plain class names, all prefixed `cp-`. Colors are hardcoded, so theming means overriding rules:

```css
.cp-played {
    background: #4f8cff;
}
```

Intro and outro markers are styled separately under `.cp-marker`, so recolouring the played bar leaves them alone.

`box-sizing` is scoped to the component, so the surrounding page's reset cannot affect its layout.

## Notes

- Picture-in-picture and fullscreen are browser APIs. The PiP button is hidden when unsupported, and requests are feature-detected with a `webkitSetPresentationMode` fallback for older Safari.
- Intro and outro segments are derived from `currentTime`, so the source must be seekable with a known duration. Markers stay hidden until metadata loads.
- A single click on the surface only toggles the chrome, so a tap never seeks.
  Seeking needs a double click, which is treated as one action regardless of how
  many clicks the browser reports.
- Expanded view and fullscreen cannot be active at the same time.
- Rendering on the server is fine; the component only touches the DOM inside effects and event handlers.

## Exports

Alongside `Player`, the package exposes the pieces it is built from:

```ts
import { usePlayer } from "centplayer";
import { CONTENT_PRESETS, resolveFeatures } from "centplayer";
import { formatTime, segmentStyle } from "centplayer";
import { surfaceZone, surfaceSeekDelta } from "centplayer";
import type { PlayerController, PlayerLayout, Segment, SurfaceZone, VideoFit } from "centplayer";
```

`usePlayer` is the headless hook behind the component and is useful if you want the playback state without the UI.

## Development

```sh
npm install
npm run dev            # demo app
npm run lint           # eslint, type-aware
npm run typecheck      # tsc over the app and build configs
npm run build          # library, then demo
npm run build:lib      # dist-lib: esm, cjs, css, types
```

`prepublishOnly` runs lint, typecheck, and the library build, so a publish cannot ship a broken package.

The demo lives in `src/demo` and is excluded from the published tarball.

## License

MIT
