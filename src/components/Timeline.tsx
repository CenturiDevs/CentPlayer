import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { Segment } from "../core/config";
import { clamp01, formatTime } from "../core/format";
import { buildTimelineBlocks } from "../core/timeline";
import type { PlayerController } from "../core/usePlayer";

interface TimelineProps {
    player: PlayerController;
    chapters?: Segment[];
    intro?: Segment;
    outro?: Segment;
}

export function Timeline({ player, chapters, intro, outro }: TimelineProps) {
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
    const bufferTime = clamp01(buffered) * duration;
    const blocks = buildTimelineBlocks({ chapters, intro, outro, duration });
    const hoverTime = hoverRatio === null ? null : hoverRatio * duration;
    const hoverBlock =
        hoverTime === null
            ? null
            : blocks.find((block) => hoverTime >= block.start && hoverTime < block.end) ?? null;

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
                    {blocks.length === 0 ? (
                        <div className="cp-seg" data-kind="chapter" style={{ flexGrow: 1, flexBasis: 0 }} />
                    ) : (
                        blocks.map((block) => {
                            const span = block.end - block.start;
                            const played = clamp01((currentTime - block.start) / span);
                            const loaded = clamp01((bufferTime - block.start) / span);
                            return (
                                <div
                                    key={`${block.start}-${block.end}`}
                                    className="cp-seg"
                                    data-kind={block.kind}
                                    style={{ flexGrow: span, flexBasis: 0 }}
                                >
                                    {block.kind === "chapter" && (
                                        <>
                                            <div
                                                className="cp-seg-buffer"
                                                style={{ width: `${loaded * 100}%` }}
                                            />
                                            <div
                                                className="cp-seg-played"
                                                style={{ width: `${played * 100}%` }}
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                    <div className="cp-thumb" style={{ left: `${progress * 100}%` }} />
                </div>
            </div>
            {hoverRatio !== null && (
                <div className="cp-preview" style={{ left: `${hoverRatio * 100}%` }}>
                    {hoverBlock?.label && <span className="cp-preview-label">{hoverBlock.label}</span>}
                    <span className="cp-preview-time">{formatTime(hoverRatio * duration)}</span>
                </div>
            )}
        </div>
    );
}
