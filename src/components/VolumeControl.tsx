import { useEffect, useRef, useState } from "react";
import type { PlayerController } from "../core/usePlayer";
import { Icon } from "./Icon";

export function VolumeControl({ player }: { player: PlayerController }) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        // Escape here as well as on the button, since focus usually sits on the
        // slider once the panel is open
        const handlePointerDown = (event: PointerEvent) => {
            if (!wrapRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const { isMuted, volume } = player;

    return (
        <div className="cp-volume" ref={wrapRef} data-open={isOpen}>
            <button
                type="button"
                className="cp-btn"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Hide volume" : isMuted ? "Unmute" : "Volume"}
                aria-expanded={isOpen}
            >
                <Icon name={isMuted || volume === 0 ? "muted" : "volume"} />
            </button>

            <div className="cp-volume-panel" role="group" aria-label="Volume">
                <input
                    className="cp-volume-slider"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(event) => player.changeVolume(Number(event.target.value))}
                    aria-label="Volume"
                />
            </div>
        </div>
    );
}
