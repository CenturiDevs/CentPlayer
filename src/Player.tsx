import { useCallback, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { Chrome } from "./components/Chrome";
import { Icon } from "./components/Icon";
import { IconButton } from "./components/IconButton";
import { MiniProgress } from "./components/MiniProgress";
import { SurfaceFeedback } from "./components/SurfaceFeedback";
import { resolveFeatures } from "./core/config";
import type { CentPlayerProps } from "./core/config";
import { usePlayer } from "./core/usePlayer";
import { surfaceSeekDelta } from "./core/surface";
import { useAutoHide } from "./hooks/useAutoHide";
import { usePlayerKeyboard } from "./hooks/usePlayerKeyboard";
import type { SurfaceCue } from "./hooks/useSurfaceCue";
import { useSurfaceCue } from "./hooks/useSurfaceCue";
import "./styles/player.css";

const DOUBLE_CLICK_MS = 300;

export function Player({
    src,
    poster,
    type = "movie",
    title,
    description,
    intro,
    outro,
    features: featureOverrides,
    view = "default",
    autoPlay = false,
    autoAdvance = true,
    muted = false,
    startAt = 0,
    className = "",
    onPrevious,
    onNext,
    onBack,
    onEnded,
    ...events
}: CentPlayerProps) {
    const features = resolveFeatures(type, featureOverrides);

    const handleEnded = useCallback(() => {
        onEnded?.();
        if (autoAdvance && features.episodeNavigation) onNext?.();
    }, [onEnded, onNext, autoAdvance, features.episodeNavigation]);

    const player = usePlayer({
        src,
        view,
        autoPlay,
        muted,
        startAt,
        intro,
        outro,
        ...events,
        onEnded: handleEnded,
    });

    const { videoRef, containerRef, isPlaying, isReady, isTheater } = player;
    // these come out of usePlayer as stable useCallbacks, so pulling them
    // off the controller by name keeps the handlers below stable too
    const { togglePlay, seekBy } = player;

    const { controlsVisible, wake, sleep } = useAutoHide(isPlaying);
    const handleShortcut = usePlayerKeyboard(player);
    const { cue, nonce, show: showCue } = useSurfaceCue();

    const handleKeyDown = useCallback(
        (event: ReactKeyboardEvent<HTMLDivElement>) => {
            wake();
            handleShortcut(event);
        },
        [handleShortcut, wake],
    );

    const handleTogglePlay = useCallback(() => {
        wake();
        togglePlay();
    }, [togglePlay, wake]);

    const lastSurfaceClickRef = useRef(0);

    const handleSurfaceClick = useCallback(
        (event: ReactMouseEvent<HTMLVideoElement>) => {
            wake();

            // one seek per click, however many clicks the double-click fires
            const now = Date.now();
            if (now - lastSurfaceClickRef.current < DOUBLE_CLICK_MS) {
                lastSurfaceClickRef.current = 0;
                return;
            }
            lastSurfaceClickRef.current = now;

            const rect = event.currentTarget.getBoundingClientRect();
            if (rect.width === 0) return handleTogglePlay();

            const ratio = (event.clientX - rect.left) / rect.width;
            const delta = surfaceSeekDelta(ratio);

            if (delta === 0) {
                togglePlay();
                return;
            }

            seekBy(delta);
            showCue(delta < 0 ? "back10" : "forward10");
        },
        [handleTogglePlay, seekBy, showCue, togglePlay, wake],
    );

    const handleCueSeek = useCallback(
        (cue: SurfaceCue) => {
            wake();
            seekBy(cue === "back10" ? -10 : 10);
            showCue(cue);
        },
        [seekBy, showCue, wake],
    );

    const handleBack = useCallback(() => {
        if (onBack) onBack();
        else window.history.back();
    }, [onBack]);

    return (
        <div
            ref={containerRef}
            className={`cp-root${className ? ` ${className}` : ""}`}
            tabIndex={0}
            data-chrome={controlsVisible}
            data-theater={isTheater}
            onKeyDown={handleKeyDown}
            onMouseMove={wake}
            onMouseLeave={sleep}
        >
            <video
                ref={videoRef}
                className="cp-video"
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                onClick={handleSurfaceClick}
            />

            <div className="cp-dimmer" />

            <SurfaceFeedback key={nonce} cue={cue} />

            <div className="cp-back">
                <IconButton name="back" label="Go back" onClick={handleBack} />
            </div>

            {!isReady && (
                <div className="cp-loading">
                    <div className="cp-spinner" />
                </div>
            )}

            {isReady && !isPlaying && (
                <button className="cp-bigplay" onClick={handleTogglePlay} aria-label="Play">
                    <Icon name="play" />
                </button>
            )}

            <Chrome
                player={player}
                features={features}
                title={title}
                description={description}
                onPrevious={onPrevious}
                onNext={onNext}
                onTogglePlay={handleTogglePlay}
                onSeekCue={handleCueSeek}
                intro={intro}
                outro={outro}
            />

            {!controlsVisible && <MiniProgress player={player} />}
        </div>
    );
}
