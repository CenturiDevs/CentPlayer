import type { SurfaceCue } from "../hooks/useSurfaceCue";
import { Icon } from "./Icon";

export function SurfaceFeedback({ cue }: { cue: SurfaceCue | null }) {
    if (!cue) return null;

    return (
        <div className={`cp-cue cp-cue--${cue}`} aria-hidden="true">
            <span className="cp-cue-badge">
                <Icon name={cue} className="cp-cue-icon" />
            </span>
            <span className="cp-cue-text">10 seconds</span>
        </div>
    );
}
