import type { PlayerLayout } from "../core/config";
import { formatTime } from "../core/format";
import type { PlayerController } from "../core/usePlayer";
import { IconButton } from "./IconButton";
import { SettingsMenu } from "./SettingsMenu";

export function MetaRow({
    player,
    layout,
    onSettingsOpenChange,
}: {
    player: PlayerController;
    layout: PlayerLayout;
    onSettingsOpenChange?: (open: boolean) => void;
}) {
    const showExpand = layout !== "fullscreen";
    const showFullscreen = layout !== "expand";

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

            {showExpand && (
                <IconButton
                    name={player.isTheater ? "shrink" : "expand"}
                    label={player.isTheater ? "Exit expanded view" : "Expanded view"}
                    size="sm"
                    className={player.isTheater ? "cp-btn--active" : ""}
                    onClick={player.toggleTheater}
                />
            )}

            {showFullscreen && (
                <IconButton
                    name={player.isFullscreen ? "exitFullscreen" : "fullscreen"}
                    label={player.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    size="sm"
                    onClick={player.toggleFullscreen}
                />
            )}

            <SettingsMenu player={player} onOpenChange={onSettingsOpenChange} />
        </div>
    );
}