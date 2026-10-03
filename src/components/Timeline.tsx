import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { Segment } from "../core/config";
import { clamp01, formatTime, segmentStyle } from "../core/format";
import type { PlayerController } from "../core/usePlayer";

interface MarkerEntry {
    start: number;
    style: { left: string; width: string };
}

interface TimelineProps {
    player: PlayerController;
    segments: Segment[];
}

export function Timeline({ player, segments }: TimelineProps) {
    const { duration, currentTime, buffered, isScrubbing } = player;
    const trackRef = useRef<HTMLDivElement>(null);
    // `isScrubbing` off the controller is React state, so it trails a commit
    // behind pointerdown and the first move of a fast drag gets dropped. This
    // one flips synchronously.
    const scrubbingRef = useRef(false);
    const [hoverRatio, setHoverRatio] = useState<number | null>(null);

    const ratioFromPointer = useCallback((clientX: number) => {
        const track = trackRef.current;
        if (!track) return 0;
        const rect = track.getBoundingClientRect();
        if (rect.width === 0) return 0;
        return clamp01((clientX - rect.left) / rect.width);
    }, []);

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        // capture keeps the drag alive when the cursor outruns the track
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
        scrubbingRef.current = true;
        player.beginScrub();
        player.scrubTo(ratioFromPointer(event.clientX) * duration);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const ratio = ratioFromPointer(event.clientX);
        setHoverRatio(ratio);
        if (scrubbingRef.current) player.scrubTo(ratio * duration);
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        scrubbingRef.current = false;
        player.endScrub(ratioFromPointer(event.clientX) * duration);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        event.stopPropagation();
        player.seekBy(event.key === "ArrowLeft" ? -10 : 10);
    };

    const progress = duration > 0 ? clamp01(currentTime / duration) : 0;
    const bufferProgress = duration > 0 ? clamp01(buffered) : 0;
    const markers = segments
        .map((segment) => ({ start: segment.start, style: segmentStyle(segment, duration) }))
        .filter((entry): entry is MarkerEntry => entry.style !== null);

    return (
        <div className="cp-timeline-wrap">
            <div
                className="cp-timeline"
                ref={trackRef}
                data-scrubbing={isScrubbing}
                role="slider"
                tabIndex={0}
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={() => setHoverRatio(null)}
            >
                <div className="cp-track">
                    <div className="cp-buffer" style={{ width: `${bufferProgress * 100}%` }} />
                    <div className="cp-played" style={{ width: `${progress * 100}%` }} />
                    {markers.map(({ start, style }) => (
                        <div key={start} className="cp-marker" style={style} />
                    ))}
                    <div className="cp-thumb" style={{ left: `${progress * 100}%` }} />
                </div>
            </div>
            {hoverRatio !== null && (
                <div className="cp-preview" style={{ left: `${hoverRatio * 100}%` }}>
                    {formatTime(hoverRatio * duration)}
                </div>
            )}
        </div>
    );
}
