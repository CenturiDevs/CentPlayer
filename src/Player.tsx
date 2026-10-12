import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { Chrome } from "./components/Chrome";
import { Icon } from "./components/Icon";
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

// a single click waits this long before it acts, so a following click can
// cancel it and be treated as a double click instead
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
    layout = "both",
    fit,
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
        fit,
        autoPlay,
        muted,
        startAt,
        intro,
        outro,
        ...events,
        onEnded: handleEnded,
    });

    const { videoRef, containerRef, isPlaying, isReady, isTheater, fit: activeFit } = player;
    // these come out of usePlayer as stable useCallbacks, so pulling them
    // off the controller by name keeps the handlers below stable too
    const { togglePlay, seekBy } = player;

    const { controlsVisible, wake, sleep, toggle: toggleChrome } = useAutoHide(isPlaying);
    // the settings sheet is part of the chrome, so hold it open while it is up
    const [settingsOpen, setSettingsOpen] = useState(false);
    const chromeVisible = controlsVisible || settingsOpen;
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

    // a tap only touches the chrome on devices without a hovering pointer
    const handlePointerMove = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            if (event.pointerType === "mouse") wake();
        },
        [wake],
    );

    const pendingClickRef = useRef<number | null>(null);

    const clearPendingClick = useCallback(() => {
        if (pendingClickRef.current !== null) {
            window.clearTimeout(pendingClickRef.current);
            pendingClickRef.current = null;
        }
    }, []);

    useEffect(() => clearPendingClick, [clearPendingClick]);

    // single click: pull the chrome away (or bring it back) for a clean view.
    // deferred so the second click of a double click can take over instead.
    const handleSurfaceClick = useCallback(() => {
        clearPendingClick();
        pendingClickRef.current = window.setTimeout(() => {
            pendingClickRef.current = null;
            toggleChrome();
        }, DOUBLE_CLICK_MS);
    }, [clearPendingClick, toggleChrome]);

    // double click: the outer thirds seek, the middle pauses or plays
    const handleSurfaceDoubleClick = useCallback(
        (event: ReactMouseEvent<HTMLVideoElement>) => {
            clearPendingClick();
            wake();

            const rect = event.currentTarget.getBoundingClientRect();
            if (rect.width === 0) {
                togglePlay();
                return;
            }

            const ratio = (event.clientX - rect.left) / rect.width;
            const delta = surfaceSeekDelta(ratio);

            if (delta === 0) {
                togglePlay();
                return;
            }

            seekBy(delta);
            showCue(delta < 0 ? "back10" : "forward10");
        },
        [clearPendingClick, seekBy, showCue, togglePlay, wake],
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
            data-chrome={chromeVisible}
            data-theater={isTheater}
            data-fit={activeFit}
            onKeyDown={handleKeyDown}
            onPointerMove={handlePointerMove}
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
                onDoubleClick={handleSurfaceDoubleClick}
            />

            <div className="cp-dimmer" />

            <SurfaceFeedback key={nonce} cue={cue} />

            {!isReady && (
                <div className="cp-loading">
                    <div className="cp-spinner" />
                </div>
            )}

            {isReady && !isPlaying && chromeVisible && (
                <button className="cp-bigplay" onClick={handleTogglePlay} aria-label="Play">
                    <Icon name="play" />
                </button>
            )}

            <Chrome
                player={player}
                features={features}
                title={title}
                description={description}
                layout={layout}
                onBack={handleBack}
                onPrevious={onPrevious}
                onNext={onNext}
                onTogglePlay={handleTogglePlay}
                onSeekCue={handleCueSeek}
                onSettingsOpenChange={setSettingsOpen}
                intro={intro}
                outro={outro}
            />

            {!chromeVisible && <MiniProgress player={player} />}
        </div>
    );
}
