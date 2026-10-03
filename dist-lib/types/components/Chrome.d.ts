import type { PlayerFeatures, Segment } from "../core/config";
import type { PlayerController } from "../core/usePlayer";
import type { SurfaceCue } from "../hooks/useSurfaceCue";
interface ChromeProps {
    player: PlayerController;
    features: PlayerFeatures;
    title?: string;
    description?: string;
    onPrevious?: () => void;
    onNext?: () => void;
    onTogglePlay: () => void;
    onSeekCue: (cue: SurfaceCue) => void;
    intro?: Segment;
    outro?: Segment;
}
export declare function Chrome({ player, features, title, description, onPrevious, onNext, onTogglePlay, onSeekCue, intro, outro, }: ChromeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Chrome.d.ts.map