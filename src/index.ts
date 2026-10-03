export { Player } from "./Player";

export { CONTENT_PRESETS, resolveFeatures } from "./core/config";
export type {
    CentPlayerProps,
    ContentType,
    PlayerEvents,
    PlayerFeatures,
    PlayerNavigation,
    PlayerView,
    Segment,
} from "./core/config";

export { surfaceSeekDelta, surfaceZone } from "./core/surface";
export type { SurfaceZone } from "./core/surface";

export { formatTime, segmentStyle } from "./core/format";

export { usePlayer } from "./core/usePlayer";
export type { UsePlayerOptions, PlayerController } from "./core/usePlayer";
