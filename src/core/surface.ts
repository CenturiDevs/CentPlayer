export type SurfaceZone = "back" | "toggle" | "forward";

const LEFT_EDGE = 0.34;
const RIGHT_EDGE = 0.66;

export function surfaceZone(ratio: number): SurfaceZone {
    if (ratio <= LEFT_EDGE) return "back";
    if (ratio >= RIGHT_EDGE) return "forward";
    return "toggle";
}

export function surfaceSeekDelta(ratio: number): number {
    const zone = surfaceZone(ratio);
    if (zone === "back") return -10;
    if (zone === "forward") return 10;
    return 0;
}
