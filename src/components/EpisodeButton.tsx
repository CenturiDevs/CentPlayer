import { Icon } from "./Icon";
import type { IconName } from "./Icon";

interface EpisodeButtonProps {
    direction: "prev" | "next";
    label: string;
    onClick?: () => void;
}

export function EpisodeButton({ direction, label, onClick }: EpisodeButtonProps) {
    const icon: IconName = direction === "prev" ? "chevronLeft" : "chevronRight";

    return (
        <button
            type="button"
            className="cp-pill"
            onClick={onClick}
            disabled={!onClick}
            aria-label={label}
        >
            {direction === "prev" && <Icon name={icon} className="cp-pill-icon" />}
            <span className="cp-pill-label">{label}</span>
            {direction === "next" && <Icon name={icon} className="cp-pill-icon" />}
        </button>
    );
}
