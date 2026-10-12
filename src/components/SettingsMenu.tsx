import { useEffect, useRef, useState } from "react";
import type { VideoFit } from "../core/config";
import type { PlayerController } from "../core/usePlayer";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

const FIT_OPTIONS: { value: VideoFit; label: string }[] = [
    { value: "contain", label: "Fit to screen" },
    { value: "cover", label: "Expand to fit" },
    { value: "fill", label: "Stretch" },
    { value: "none", label: "Original" },
];

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function SettingsMenu({
    player,
    onOpenChange,
}: {
    player: PlayerController;
    onOpenChange?: (open: boolean) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    useEffect(() => () => onOpenChange?.(false), [onOpenChange]);

    useEffect(() => {
        if (!isOpen) return;

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

    const { fit, setFit, playbackRate, changePlaybackRate } = player;

    return (
        <div className="cp-settings" ref={wrapRef} data-open={isOpen}>
            <IconButton
                name="settings"
                label={isOpen ? "Hide settings" : "Settings"}
                size="sm"
                className={isOpen ? "cp-btn--active" : ""}
                onClick={() => setIsOpen((prev) => !prev)}
            />

            {isOpen && (
                <div className="cp-settings-panel" role="menu" aria-label="Settings">
                    <div className="cp-settings-group">
                        <span className="cp-settings-heading">Display</span>
                        {FIT_OPTIONS.map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                role="menuitemradio"
                                aria-checked={fit === value}
                                className="cp-settings-option"
                                data-active={fit === value}
                                onClick={() => setFit(value)}
                            >
                                <span>{label}</span>
                                {fit === value && <Icon name="check" className="cp-settings-check" />}
                            </button>
                        ))}
                    </div>

                    <div className="cp-settings-group">
                        <span className="cp-settings-heading">Speed</span>
                        <div className="cp-settings-rates" role="group" aria-label="Playback speed">
                            {RATES.map((rate) => (
                                <button
                                    key={rate}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={playbackRate === rate}
                                    className="cp-settings-rate"
                                    data-active={playbackRate === rate}
                                    onClick={() => changePlaybackRate(rate)}
                                >
                                    {rate}x
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}