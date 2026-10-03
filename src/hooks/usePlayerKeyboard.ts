import { useCallback } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import type { PlayerController } from "../core/usePlayer";

export function usePlayerKeyboard(player: PlayerController) {
    return useCallback(
        (event: ReactKeyboardEvent<HTMLElement>) => {
            // bail out for anything focusable — otherwise the volume slider
            // would seek the video when you arrow it
            if (event.target instanceof HTMLInputElement) return;

            switch (event.key) {
                case " ":
                case "k":
                    event.preventDefault();
                    player.togglePlay();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    player.seekBy(10);
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    player.seekBy(-10);
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    player.changeVolume(player.volume + 0.05);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    player.changeVolume(player.volume - 0.05);
                    break;
                case "m":
                    player.toggleMute();
                    break;
                case "f":
                    player.toggleFullscreen();
                    break;
                default:
                    break;
            }
        },
        [player],
    );
}
