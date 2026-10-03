import { clamp01 } from "../core/format";
import type { PlayerController } from "../core/usePlayer";

export function MiniProgress({ player }: { player: PlayerController }) {
    const percent = player.duration > 0 ? clamp01(player.currentTime / player.duration) * 100 : 0;

    return (
        <div className="cp-mini" aria-hidden="true">
            <div className="cp-mini-played" style={{ width: `${percent}%` }} />
        </div>
    );
}
