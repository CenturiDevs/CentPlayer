import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayerEvents, PlayerView, Segment } from "./config";

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

type WebkitVideo = HTMLVideoElement & {
    webkitSetPresentationMode?: (mode: "picture-in-picture" | "inline") => void;
};

type WebkitContainer = HTMLDivElement & {
    webkitRequestFullscreen?: () => Promise<void>;
};

function supportsPictureInPicture(video: HTMLVideoElement) {
    if (video.disablePictureInPicture) return false;
    const webkit = video as WebkitVideo;
    return (
        typeof video.requestPictureInPicture === "function" ||
        typeof webkit.webkitSetPresentationMode === "function"
    );
}

export interface UsePlayerOptions extends PlayerEvents {
    src: string;
    view?: PlayerView;
    autoPlay?: boolean;
    muted?: boolean;
    startAt?: number;
    intro?: Segment;
    outro?: Segment;
}

export function usePlayer(options: UsePlayerOptions) {
    const { src, view = "default", autoPlay = false, muted = false, startAt = 0, intro, outro } =
        options;
    const {
        onPlay,
        onPause,
        onEnded,
        onTimeUpdate,
        onSeek,
        onVolumeChange,
        onSkipIntro,
        onSkipOutro,
    } = options;

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTheater, setIsTheater] = useState(view === "expanded");
    const [isPip, setIsPip] = useState(false);
    const [pipSupported, setPipSupported] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(muted);
    const [skippedIntro, setSkippedIntro] = useState(false);
    const [skippedOutro, setSkippedOutro] = useState(false);

    // `view` owns expanded mode, but the toolbar can flip it locally too. The
    // compare happens during render on purpose: doing it in an effect lands a
    // frame late and the layout visibly snaps between modes.
    const [lastView, setLastView] = useState(view);
    if (lastView !== view) {
        setLastView(view);
        setIsTheater(view === "expanded");
    }

    const scrubbingRef = useRef(false);
    const resumeAfterScrubRef = useRef(false);
    const lastEmitRef = useRef(0);
    const eventsRef = useRef<PlayerEvents>({});
    // the load effect is keyed on src alone, so it reads these through a ref
    // rather than listing them as deps — otherwise a parent re-render that
    // changes muted would reload the video
    const loadOptionsRef = useRef({ autoPlay, muted, startAt });

    useEffect(() => {
        eventsRef.current = {
            onPlay,
            onPause,
            onEnded,
            onTimeUpdate,
            onSeek,
            onVolumeChange,
            onSkipIntro,
            onSkipOutro,
        };
    });

    const emitTime = useCallback(() => {
        const video = videoRef.current;
        if (video) eventsRef.current.onTimeUpdate?.(video.currentTime, video.duration);
    }, []);

    const readBuffered = useCallback(() => {
        const video = videoRef.current;
        if (!video || video.buffered.length === 0 || !video.duration) {
            setBuffered(0);
            return;
        }
        setBuffered(video.buffered.end(video.buffered.length - 1) / video.duration);
    }, []);

    const play = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        void video.play().catch(() => setIsPlaying(false));
    }, []);

    const pause = useCallback(() => {
        videoRef.current?.pause();
    }, []);

    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) play();
        else pause();
    }, [play, pause]);

    const seek = useCallback(
        (time: number) => {
            const video = videoRef.current;
            if (!video) return;
            const max = Number.isFinite(video.duration) ? video.duration : time;
            const next = clamp(time, 0, max);
            video.currentTime = next;
            setCurrentTime(next);
            eventsRef.current.onSeek?.(next);
            emitTime();
        },
        [emitTime],
    );

    const seekBy = useCallback(
        (delta: number) => {
            const video = videoRef.current;
            if (!video) return;
            seek(video.currentTime + delta);
        },
        [seek],
    );

    const changeVolume = useCallback((value: number) => {
        const video = videoRef.current;
        if (!video) return;
        const next = clamp(value, 0, 1);
        video.volume = next;
        video.muted = next === 0;
        setVolume(next);
        setIsMuted(next === 0);
        eventsRef.current.onVolumeChange?.(next);
    }, []);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
        eventsRef.current.onVolumeChange?.(video.muted ? 0 : video.volume);
    }, []);

    const requestFullscreen = useCallback(() => {
        const element = containerRef.current;
        if (!element || document.fullscreenElement) return;

        const target = element as WebkitContainer;
        if (target.requestFullscreen) {
            void target.requestFullscreen().catch(() => {});
        } else {
            void target.webkitRequestFullscreen?.().catch(() => {});
        }
    }, []);

    const exitFullscreen = useCallback(() => {
        if (!document.fullscreenElement) return;
        void document.exitFullscreen().catch(() => {});
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (document.fullscreenElement) {
            exitFullscreen();
            return;
        }
        requestFullscreen();
    }, [requestFullscreen, exitFullscreen]);

    const toggleTheater = useCallback(() => {
        setIsTheater((prev) => !prev);
    }, []);

    const togglePip = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (document.pictureInPictureElement === video) {
            void document.exitPictureInPicture().catch(() => {});
            return;
        }

        if (typeof video.requestPictureInPicture === "function") {
            void video.requestPictureInPicture().catch(() => {});
            return;
        }

        const webkit = video as WebkitVideo;
        if (webkit.webkitSetPresentationMode && video.readyState > 0) {
            webkit.webkitSetPresentationMode("picture-in-picture");
        }
    }, []);

    const beginScrub = useCallback(() => {
        const video = videoRef.current;
        scrubbingRef.current = true;
        setIsScrubbing(true);
        resumeAfterScrubRef.current = !!video && !video.paused;
    }, []);

    const scrubTo = useCallback((time: number) => {
        setCurrentTime(time);
    }, []);

    const endScrub = useCallback(
        (time: number) => {
            const video = videoRef.current;
            scrubbingRef.current = false;
            setIsScrubbing(false);
            if (video) {
                const max = Number.isFinite(video.duration) ? video.duration : time;
                video.currentTime = clamp(time, 0, max);
                if (resumeAfterScrubRef.current) void video.play().catch(() => {});
            }
            emitTime();
        },
        [emitTime],
    );

    const skipIntro = useCallback(() => {
        if (!intro) return;
        setSkippedIntro(true);
        seek(intro.end);
        eventsRef.current.onSkipIntro?.();
    }, [intro, seek]);

    const skipOutro = useCallback(() => {
        if (!outro) return;
        setSkippedOutro(true);
        seek(outro.end);
        eventsRef.current.onSkipOutro?.();
    }, [outro, seek]);

    useEffect(() => {
        if (!isPlaying) return;
        let frame = 0;
        const loop = () => {
            const video = videoRef.current;
            if (video) {
                if (!scrubbingRef.current) setCurrentTime(video.currentTime);
                const now = performance.now();
                if (now - lastEmitRef.current >= 250) {
                    lastEmitRef.current = now;
                    eventsRef.current.onTimeUpdate?.(video.currentTime, video.duration);
                }
            }
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, [isPlaying]);

    useEffect(() => {
        if (view === "fullscreen") requestFullscreen();
        else exitFullscreen();
    }, [view, requestFullscreen, exitFullscreen]);

    useEffect(() => {
        const handle = () => setIsFullscreen(document.fullscreenElement !== null);
        document.addEventListener("fullscreenchange", handle);
        return () => document.removeEventListener("fullscreenchange", handle);
    }, []);

    useEffect(() => {
        loadOptionsRef.current = { autoPlay, muted, startAt };
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        setIsReady(false);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setBuffered(0);
        setSkippedIntro(false);
        setSkippedOutro(false);
        lastEmitRef.current = 0;

        const { autoPlay: shouldAutoPlay, muted: startMuted, startAt: initialTime } =
            loadOptionsRef.current;

        const handleLoaded = () => {
            const total = Number.isFinite(video.duration) ? video.duration : 0;
            setDuration(total);
            setIsReady(true);
            setVolume(video.volume);
            setIsMuted(video.muted);
            if (initialTime > 0) video.currentTime = clamp(initialTime, 0, total || initialTime);
            if (shouldAutoPlay) void video.play().catch(() => setIsPlaying(false));
            readBuffered();
        };
        const handlePlay = () => {
            setIsPlaying(true);
            eventsRef.current.onPlay?.();
        };
        const handlePause = () => {
            setIsPlaying(false);
            eventsRef.current.onTimeUpdate?.(video.currentTime, video.duration);
        };
        const handleEnded = () => {
            setIsPlaying(false);
            eventsRef.current.onEnded?.();
        };
        const handleProgress = () => readBuffered();
        const handleSeeked = () => {
            if (!scrubbingRef.current) setCurrentTime(video.currentTime);
        };
        const handlePipEnter = () => setIsPip(true);
        const handlePipLeave = () => setIsPip(false);

        video.addEventListener("loadedmetadata", handleLoaded);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("progress", handleProgress);
        video.addEventListener("seeked", handleSeeked);
        video.addEventListener("enterpictureinpicture", handlePipEnter);
        video.addEventListener("leavepictureinpicture", handlePipLeave);

        video.muted = startMuted;
        setPipSupported(supportsPictureInPicture(video));

        // A cached or reused element can already have metadata, in which case
        // loadedmetadata will never fire again.
        if (video.readyState >= 1) handleLoaded();

        return () => {
            video.removeEventListener("loadedmetadata", handleLoaded);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("progress", handleProgress);
            video.removeEventListener("seeked", handleSeeked);
            video.removeEventListener("enterpictureinpicture", handlePipEnter);
            video.removeEventListener("leavepictureinpicture", handlePipLeave);
        };
    }, [src, readBuffered]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) video.muted = muted;
    }, [muted]);

    const inIntro =
        intro !== undefined && !skippedIntro && currentTime >= intro.start && currentTime < intro.end;
    const inOutro =
        outro !== undefined && !skippedOutro && currentTime >= outro.start && currentTime < outro.end;

    return {
        videoRef,
        containerRef,
        isPlaying,
        isReady,
        isScrubbing,
        isFullscreen,
        isTheater,
        isPip,
        pipSupported,
        currentTime,
        duration,
        buffered,
        volume,
        isMuted,
        inIntro,
        inOutro,
        play,
        pause,
        togglePlay,
        seek,
        seekBy,
        changeVolume,
        toggleMute,
        toggleFullscreen,
        toggleTheater,
        togglePip,
        beginScrub,
        scrubTo,
        endScrub,
        skipIntro,
        skipOutro,
    };
}

export type PlayerController = ReturnType<typeof usePlayer>;
