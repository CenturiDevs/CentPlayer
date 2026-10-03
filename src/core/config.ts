export type ContentType = "anime" | "movie" | "series";

export type PlayerView = "default" | "expanded" | "fullscreen";

export interface Segment {
    start: number;
    end: number;
}

export interface PlayerFeatures {
    /** Shows intro/outro markers on the timeline and the skip button. */
    introSkip: boolean;
    /** Shows the previous/next episode controls. */
    episodeNavigation: boolean;
}

export const CONTENT_PRESETS: Record<ContentType, PlayerFeatures> = {
    anime: {
        introSkip: true,
        episodeNavigation: true,
    },
    series: {
        introSkip: false,
        episodeNavigation: true,
    },
    movie: {
        introSkip: false,
        episodeNavigation: false,
    },
};

export function resolveFeatures(
    type: ContentType,
    overrides?: Partial<PlayerFeatures>,
): PlayerFeatures {
    return { ...CONTENT_PRESETS[type], ...overrides };
}

export interface PlayerEvents {
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onSeek?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
    onSkipIntro?: () => void;
    onSkipOutro?: () => void;
}

export interface PlayerNavigation {
    onPrevious?: () => void;
    onNext?: () => void;
    /** Falls back to `history.back()` when omitted. */
    onBack?: () => void;
}

export interface CentPlayerProps extends PlayerEvents, PlayerNavigation {
    src: string;
    poster?: string;
    /** Defaults to `movie`, which hides intro and episode controls. */
    type?: ContentType;
    title?: string;
    description?: string;
    intro?: Segment;
    outro?: Segment;
    /** Merged over the preset for `type`. */
    features?: Partial<PlayerFeatures>;
    view?: PlayerView;
    autoPlay?: boolean;
    /** Calls `onNext` when playback ends. Requires episode navigation. */
    autoAdvance?: boolean;
    muted?: boolean;
    startAt?: number;
    className?: string;
}
