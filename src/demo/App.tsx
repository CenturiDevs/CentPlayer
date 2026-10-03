import { useState } from "react";
import { Player } from "../Player";
import type { ContentType } from "../core/config";

const TYPES: ContentType[] = ["anime", "series", "movie"];

const EPISODES = [
    "Pirates sail the Grand Line in search of the One Piece. Episode 1 - Romance Dawn.",
    "Pirates sail the Grand Line in search of the One Piece. Episode 2 - They Call Him Straw Hat Luffy.",
    "Pirates sail the Grand Line in search of the One Piece. Episode 3 - Morgan versus Luffy.",
];

export default function App() {
    const [type, setType] = useState<ContentType>("anime");
    const [episode, setEpisode] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    const push = (line: string) => setLog((prev) => [line, ...prev].slice(0, 8));
    const goTo = (index: number) =>
        setEpisode(Math.min(Math.max(index, 0), EPISODES.length - 1));

    return (
        <div style={{ background: "#0f0f0f", minHeight: "100vh", padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {TYPES.map((value) => (
                    <button
                        key={value}
                        onClick={() => setType(value)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "1px solid #444",
                            background: value === type ? "#fff" : "transparent",
                            color: value === type ? "#111" : "#fff",
                            cursor: "pointer",
                        }}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <Player
                key={`${type}-${episode}`}
                src="/test.mp4"
                type={type}
                title="One Piece"
                description={EPISODES[episode]}
                intro={{ start: 1, end: 3 }}
                outro={{ start: 7, end: 9 }}
                onBack={() => push("onBack")}
                onPrevious={() => {
                    goTo(episode - 1);
                    push("onPrevious");
                }}
                onNext={() => {
                    goTo(episode + 1);
                    push("onNext");
                }}
                onPlay={() => push("onPlay")}
                onPause={() => push("onPause")}
                onEnded={() => push("onEnded")}
                onSkipIntro={() => push("onSkipIntro")}
                onSkipOutro={() => push("onSkipOutro")}
            />

            <pre
                style={{
                    fontSize: 12,
                    background: "#1a1a1a",
                    color: "#eee",
                    padding: 12,
                    borderRadius: 8,
                    marginTop: 24,
                    display: "inline-block",
                    minWidth: 220,
                }}
            >
                {log.length ? log.join("\n") : "no events yet"}
            </pre>
        </div>
    );
}
