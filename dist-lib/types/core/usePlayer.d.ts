import type { PlayerEvents, PlayerView, Segment } from "./config";
export interface UsePlayerOptions extends PlayerEvents {
    src: string;
    view?: PlayerView;
    autoPlay?: boolean;
    muted?: boolean;
    startAt?: number;
    intro?: Segment;
    outro?: Segment;
}
export declare function usePlayer(options: UsePlayerOptions): {
    videoRef: import("react").RefObject<HTMLVideoElement | null>;
    containerRef: import("react").RefObject<HTMLDivElement | null>;
    isPlaying: boolean;
    isReady: boolean;
    isScrubbing: boolean;
    isFullscreen: boolean;
    isTheater: boolean;
    isPip: boolean;
    pipSupported: boolean;
    currentTime: number;
    duration: number;
    buffered: number;
    volume: number;
    isMuted: boolean;
    inIntro: boolean;
    inOutro: boolean;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    seek: (time: number) => void;
    seekBy: (delta: number) => void;
    changeVolume: (value: number) => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    toggleTheater: () => void;
    togglePip: () => void;
    beginScrub: () => void;
    scrubTo: (time: number) => void;
    endScrub: (time: number) => void;
    skipIntro: () => void;
    skipOutro: () => void;
};
export type PlayerController = ReturnType<typeof usePlayer>;
//# sourceMappingURL=usePlayer.d.ts.map