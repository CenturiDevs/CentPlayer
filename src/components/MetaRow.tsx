import { formatTime } from "../core/format";
import type { PlayerController } from "../core/usePlayer";
import { IconButton } from "./IconButton";

export function MetaRow({ player }: { player: PlayerController }) {
    return (
        <div className="cp-meta">
            <span className="cp-time">{formatTime(player.currentTime)}</span>

            {player.pipSupported && (
                <IconButton
                    name="pip"
                    label={player.isPip ? "Exit picture-in-picture" : "Picture-in-picture"}
                    size="sm"
                    className={player.isPip ? "cp-btn--active" : ""}
                    onClick={player.togglePip}
                />
            )}

            <IconButton
                name={player.isFullscreen ? "exitFullscreen" : "fullscreen"}
                label={player.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                size="sm"
                onClick={player.toggleFullscreen}
            />

            <IconButton
                name={player.isTheater ? "shrink" : "expand"}
                label={player.isTheater ? "Exit expanded view" : "Expanded view"}
                size="sm"
                onClick={player.toggleTheater}
            />
        </div>
    );
}
