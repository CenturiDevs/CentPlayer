import type { PlayerFeatures, Segment } from "../core/config";
import type { PlayerController } from "../core/usePlayer";
import type { SurfaceCue } from "../hooks/useSurfaceCue";
import { EpisodeButton } from "./EpisodeButton";
import { IconButton } from "./IconButton";
import { InfoPanel } from "./InfoPanel";
import { MetaRow } from "./MetaRow";
import { SkipButton } from "./SkipButton";
import { Timeline } from "./Timeline";
import { VolumeControl } from "./VolumeControl";

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

export function Chrome({
    player,
    features,
    title,
    description,
    onPrevious,
    onNext,
    onTogglePlay,
    onSeekCue,
    intro,
    outro,
}: ChromeProps) {
    const { isPlaying, inIntro, inOutro } = player;

    const showSegments = features.introSkip;
    const segments = showSegments ? [intro, outro].filter((s): s is Segment => Boolean(s)) : [];
    const showSkip = showSegments && (inIntro || inOutro);
    const showEpisodes = features.episodeNavigation;

    return (
        <div className="cp-chrome">
            <div className="cp-scrim" />

            <div className="cp-bottom">
                <InfoPanel title={title} description={description} />

                <div className="cp-row">
                    <div className="cp-row-side">
                        {showEpisodes && (
                            <EpisodeButton
                                direction="prev"
                                label="Previous Episode"
                                onClick={onPrevious}
                            />
                        )}
                    </div>

                    <div className="cp-row-center">
                        <IconButton
                            name="back10"
                            label="Back 10 seconds"
                            onClick={() => onSeekCue("back10")}
                        />
                        <IconButton
                            name={isPlaying ? "pause" : "play"}
                            label={isPlaying ? "Pause" : "Play"}
                            onClick={onTogglePlay}
                        />
                        <IconButton
                            name="forward10"
                            label="Forward 10 seconds"
                            onClick={() => onSeekCue("forward10")}
                        />
                    </div>

                    <div className="cp-row-side cp-row-side--end">
                        {showSkip && (
                            <div className="cp-skip-anchor">
                                <SkipButton
                                    label={inIntro ? "Skip intro" : "Skip outro"}
                                    onSkip={inIntro ? player.skipIntro : player.skipOutro}
                                />
                            </div>
                        )}

                        <VolumeControl player={player} />
                        {showEpisodes && (
                            <EpisodeButton direction="next" label="Next Episode" onClick={onNext} />
                        )}
                    </div>
                </div>

                <Timeline player={player} segments={segments} />

                <MetaRow player={player} />
            </div>
        </div>
    );
}
